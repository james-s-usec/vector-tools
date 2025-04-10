/**
 * Survey Template Export Service
 * 
 * This service provides functionality to export survey templates to Excel format.
 * 
 * Usage:
 * - Import the service functions in your controller
 * - Call exportSurveyTemplateToExcel(id) to export a single template
 * - Call exportMultipleSurveyTemplatesToExcel(ids) to export multiple templates
 * 
 * Documentation:
 * - See docs/surveys/export-import-guide.md for detailed usage instructions
 * - See scripts/test-survey-template-export-import.js for example usage
 */
import { prisma } from '../lib/prisma';
import { NotFoundError } from '../lib/errors';
import * as path from 'path';
import * as os from 'os';

/**
 * Creates a template Excel file with instructions and reference sheets
 * @returns Path to the generated template file
 */
function createExcelTemplate(): string {
  // For now, just return the path to the existing template file
  return path.join(process.cwd(), 'scripts', 'survey-template-excel-template.xlsx');
}

/**
 * Exports a survey template to Excel format
 * @param id The ID of the template to export
 * @returns Path to the generated Excel file
 */
export const exportSurveyTemplateToExcel = async (id: number): Promise<string> => {
  try {
    // Fetch the template with all its data
    const template = await prisma.surveyTemplate.findUnique({
      where: { id },
      include: {
        surveys: true
      }
    });

    if (!template) {
      throw new NotFoundError(`Survey template with ID ${id} not found`);
    }

    // Dynamically import XLSX
    const XLSX = await import('xlsx');

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    // Get the template path but don't try to read it with XLSX yet
    const templatePath = createExcelTemplate();
    // Use the dynamically imported XLSX to read the file
    const templateWorkbook = XLSX.readFile(templatePath);
    
    // Copy the README and Field Types sheets
    workbook.SheetNames.push('README');
    workbook.Sheets['README'] = templateWorkbook.Sheets['README'];
    
    workbook.SheetNames.push('Field Types');
    workbook.Sheets['Field Types'] = templateWorkbook.Sheets['Field Types'];
    
    // Add template info to the workbook
    const templateInfo = [
      [`Template: ${template.name}`],
      [`ID: ${template.id}`],
      [`Description: ${template.description || 'No description'}`],
      [`Created: ${new Date(template.createdAt).toISOString().split('T')[0]} | Updated: ${new Date(template.updatedAt).toISOString().split('T')[0]}`],
      [`Exported: ${new Date().toISOString().split('T')[0]}`],
      [],
    ];
    
    // Add headers for the fields
    const headers = ['Field ID', 'Field Type', 'Field Label', 'Required', 'Parent Field', 'Options/Settings', 'Notes'];
    templateInfo.push(headers);
    
    // Process base fields
    const baseFields = processFields(template.baseFields as Record<string, any> || {}, 'BASE FIELDS');
    
    // Process specific fields
    const specificFields = processFields(template.specificFields as Record<string, any> || {}, 'SPECIFIC FIELDS');
    
    // Combine all rows
    const allRows = [...templateInfo, ...baseFields, ...specificFields];
    
    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(allRows);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, template.name);
    
    // Create a temporary file path for the Excel file
    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, `template_${template.id}_${Date.now()}.xlsx`);
    
    // Write to file
    XLSX.writeFile(workbook, filePath);
    
    return filePath;
  } catch (error) {
    console.error('Error exporting survey template to Excel:', error);
    
    // Re-throw the error if it's a NotFoundError
    if (error instanceof NotFoundError) {
      throw error;
    }
    
    // Otherwise, throw a generic error
    throw new Error(`Failed to export survey template with ID ${id}`);
  }
};

/**
 * Exports multiple survey templates to Excel format
 * @param ids Optional array of template IDs to export. If not provided, all templates will be exported.
 * @returns Path to the generated Excel file
 */
export const exportMultipleSurveyTemplatesToExcel = async (ids?: number[]): Promise<string> => {
  const tempDir = os.tmpdir();
  
  try {
    // Dynamically import XLSX
    const XLSX = await import('xlsx');
    
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    // Get the template path but don't try to read it with XLSX yet
    const templatePath = createExcelTemplate();
    // Use the dynamically imported XLSX to read the file
    const templateWorkbook = XLSX.readFile(templatePath);
    
    // Copy the README and Field Types sheets
    workbook.SheetNames.push('README');
    workbook.Sheets['README'] = templateWorkbook.Sheets['README'];
    
    workbook.SheetNames.push('Field Types');
    workbook.Sheets['Field Types'] = templateWorkbook.Sheets['Field Types'];
    
    // Fetch templates
    const templates = await prisma.surveyTemplate.findMany({
      where: ids ? { id: { in: ids } } : {},
      include: {
        surveys: true
      }
    });
    
    // Process each template
    for (const template of templates) {
      // Add template info to the workbook
      const templateInfo = [
        [`Template: ${template.name}`],
        [`ID: ${template.id}`],
        [`Description: ${template.description || 'No description'}`],
        [`Created: ${new Date(template.createdAt).toISOString().split('T')[0]} | Updated: ${new Date(template.updatedAt).toISOString().split('T')[0]}`],
        [`Exported: ${new Date().toISOString().split('T')[0]}`],
        [],
      ];
      
      // Add headers for the fields
      const headers = ['Field ID', 'Field Type', 'Field Label', 'Required', 'Parent Field', 'Options/Settings', 'Notes'];
      templateInfo.push(headers);
      
      // Process base fields
      const baseFields = processFields(template.baseFields as Record<string, any> || {}, 'BASE FIELDS');
      
      // Process specific fields
      const specificFields = processFields(template.specificFields as Record<string, any> || {}, 'SPECIFIC FIELDS');
      
      // Combine all rows
      const allRows = [...templateInfo, ...baseFields, ...specificFields];
      
      // Create worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(allRows);
      
      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, template.name.substring(0, 31)); // Excel limits sheet names to 31 chars
    }
    
    // Create a temporary file path for the combined file
    const filePath = path.join(tempDir, `survey_templates_${Date.now()}.xlsx`);
    
    // Write to file
    XLSX.writeFile(workbook, filePath);
    
    return filePath;
  } catch (error) {
    console.error('Error exporting survey templates to Excel:', error);
    throw new Error('Failed to export survey templates');
  }
};

/**
 * Helper function to process fields from a template section
 * @param fields The fields object to process
 * @param sectionTitle Title for the section
 * @returns Array of rows for the Excel sheet
 */
function processFields(fields: Record<string, any>, sectionTitle: string): string[][] {
  const rows: string[][] = [
    [], // Empty row before section
    [`--- ${sectionTitle} ---`],
    [], // Empty row after section title
  ];
  
  // Process regular fields
  for (const [fieldId, fieldData] of Object.entries(fields)) {
    // Skip processing if not an object (shouldn't happen, but just in case)
    if (typeof fieldData !== 'object' || fieldData === null) continue;
    
    // Extract field properties
    const fieldType = fieldData.type || 'unknown';
    const fieldLabel = fieldData.label || fieldId;
    const required = fieldData.validation?.required ? 'true' : 'false';
    const parentField = ''; // Regular fields don't have a parent
    
    // Format options/settings as JSON string
    let optionsSettings = '{}';
    if (fieldData.options) {
      optionsSettings = JSON.stringify({ options: fieldData.options });
    }
    
    // Add the field row
    rows.push([fieldId, fieldType, fieldLabel, required, parentField, optionsSettings, '']);
    
    // If this is an array field, process its item template
    if (fieldType === 'array' && fieldData.itemTemplate) {
      processArrayItemTemplate(fieldData.itemTemplate, fieldId, rows);
    }
    
    // If this is an object field, process its nested fields
    if (fieldType === 'object' && fieldData.fields) {
      processObjectFields(fieldData.fields, fieldId, rows);
    }
  }
  
  return rows;
}

/**
 * Helper function to process array item templates
 * @param itemTemplate The item template object
 * @param parentFieldId The ID of the parent array field
 * @param rows The rows array to append to
 */
function processArrayItemTemplate(itemTemplate: Record<string, any>, parentFieldId: string, rows: string[][]): void {
  for (const [fieldId, fieldData] of Object.entries(itemTemplate)) {
    // Skip processing if not an object
    if (typeof fieldData !== 'object' || fieldData === null) continue;
    
    // Extract field properties
    const fieldType = fieldData.type || 'unknown';
    const fieldLabel = fieldData.label || fieldId;
    const required = fieldData.validation?.required ? 'true' : 'false';
    
    // Format options/settings as JSON string
    let optionsSettings = '{}';
    if (fieldData.options) {
      optionsSettings = JSON.stringify({ options: fieldData.options });
    }
    
    // Add the field row with indentation to show it's part of an array
    rows.push([`→ ${fieldId}`, fieldType, fieldLabel, required, parentFieldId, optionsSettings, 'Item in array']);
  }
}

/**
 * Helper function to process object fields
 * @param fields The nested fields object
 * @param parentFieldId The ID of the parent object field
 * @param rows The rows array to append to
 */
function processObjectFields(fields: Record<string, any>, parentFieldId: string, rows: string[][]): void {
  for (const [fieldId, fieldData] of Object.entries(fields)) {
    // Skip processing if not an object
    if (typeof fieldData !== 'object' || fieldData === null) continue;
    
    // Extract field properties
    const fieldType = fieldData.type || 'unknown';
    const fieldLabel = fieldData.label || fieldId;
    const required = fieldData.validation?.required ? 'true' : 'false';
    
    // Format options/settings as JSON string
    let optionsSettings = '{}';
    if (fieldData.options) {
      optionsSettings = JSON.stringify({ options: fieldData.options });
    }
    
    // Add the field row with indentation to show it's part of an object
    rows.push([`→ ${fieldId}`, fieldType, fieldLabel, required, parentFieldId, optionsSettings, 'Nested field']);
  }
}