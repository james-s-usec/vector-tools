/**
 * Survey Template Import Service
 * 
 * This service provides functionality to import survey templates from Excel format.
 * 
 * Usage:
 * - Import the service function in your controller
 * - Call importSurveyTemplateFromExcel(filePath, updateExisting) to import a template
 * 
 * Parameters:
 * - filePath: Path to the Excel file to import
 * - updateExisting: Boolean flag to update existing templates (default: false)
 * 
 * Documentation:
 * - See docs/surveys/export-import-guide.md for detailed usage instructions
 * - See scripts/test-survey-template-export-import.js for example usage
 */
import * as XLSX from 'xlsx';
import { prisma } from '../lib/prisma';
import { SurveyTemplate } from '@prisma/client';
import * as fs from 'fs';

/**
 * Type for survey template with all relations loaded
 */
type SurveyTemplateWithRelations = SurveyTemplate & {
  surveys: any[];
};

/**
 * Type for validation errors
 */
interface ValidationError {
  row: number;
  column: string;
  message: string;
}

/**
 * Type for import result
 */
interface ImportResult {
  success: boolean;
  templateId?: number;
  errors?: ValidationError[];
  message?: string;
}

/**
 * Imports a survey template from an Excel file
 * @param filePath Path to the Excel file
 * @param updateExisting Whether to update an existing template if found
 * @returns Import result with success status and errors if any
 */
export const importSurveyTemplateFromExcel = async (
  filePath: string,
  updateExisting: boolean = false
): Promise<ImportResult> => {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return {
        success: false,
        errors: [{
          row: 0,
          column: 'File',
          message: `File not found: ${filePath}`
        }]
      };
    }

    // Read the Excel file
    const workbook = XLSX.readFile(filePath);
    
    // Get the first worksheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const rows = XLSX.utils.sheet_to_json<any>(worksheet, { header: 1 });
    
    // Validate the worksheet structure
    const validationErrors = validateWorksheetStructure(rows);
    if (validationErrors.length > 0) {
      return {
        success: false,
        errors: validationErrors
      };
    }
    
    // Extract template info
    const templateName = extractTemplateInfo(rows, 'Template:');
    const templateId = extractTemplateInfo(rows, 'ID:');
    const templateDescription = extractTemplateInfo(rows, 'Description:');
    
    // Check if template already exists
    const existingTemplate = templateId 
      ? await prisma.surveyTemplate.findUnique({ where: { id: parseInt(templateId, 10) } })
      : await prisma.surveyTemplate.findFirst({ where: { name: templateName } });
    
    if (existingTemplate && !updateExisting) {
      return {
        success: false,
        message: `Template with ${templateId ? `ID ${templateId}` : `name '${templateName}'`} already exists. Set updateExisting=true to update it.`
      };
    }
    
    // Extract fields
    const { baseFields, specificFields } = extractFields(rows);
    
    // Create or update the template
    let template: SurveyTemplate;
    
    if (existingTemplate && updateExisting) {
      // Update existing template
      template = await prisma.surveyTemplate.update({
        where: { id: existingTemplate.id },
        data: {
          name: templateName,
          description: templateDescription,
          baseFields,
          specificFields,
          updatedAt: new Date()
        }
      });
      
      return {
        success: true,
        templateId: template.id,
        message: `Template updated successfully: ${template.name} (ID: ${template.id})`
      };
    } else {
      // Create new template
      template = await prisma.surveyTemplate.create({
        data: {
          name: templateName,
          description: templateDescription,
          baseFields,
          specificFields
        }
      });
      
      return {
        success: true,
        templateId: template.id,
        message: `Template created successfully: ${template.name} (ID: ${template.id})`
      };
    }
  } catch (error) {
    console.error('Error importing survey template from Excel:', error);
    return {
      success: false,
      errors: [{
        row: 0,
        column: 'General',
        message: error instanceof Error ? error.message : 'Unknown error during import'
      }]
    };
  }
};

/**
 * Validates the worksheet structure
 * @param rows The rows from the worksheet
 * @returns Array of validation errors
 */
function validateWorksheetStructure(rows: any[][]): ValidationError[] {
  const errors: ValidationError[] = [];
  
  // Check if we have enough rows
  if (rows.length < 7) {
    errors.push({
      row: 0,
      column: 'General',
      message: 'Worksheet does not have enough rows. Expected at least 7 rows.'
    });
    return errors;
  }
  
  // Check for template name
  if (!rows[0] || !rows[0][0] || !String(rows[0][0]).startsWith('Template:')) {
    errors.push({
      row: 1,
      column: 'A',
      message: 'Missing template name. Expected "Template: [name]" in cell A1.'
    });
  }
  
  // Check for headers
  const expectedHeaders = ['Field ID', 'Field Type', 'Field Label', 'Required', 'Parent Field', 'Options/Settings', 'Notes'];
  const headerRow = rows.findIndex(row => 
    row && row.length >= expectedHeaders.length && 
    row[0] === expectedHeaders[0] && 
    row[1] === expectedHeaders[1]
  );
  
  if (headerRow === -1) {
    errors.push({
      row: 7,
      column: 'A-G',
      message: `Missing headers row. Expected: ${expectedHeaders.join(', ')}`
    });
  }
  
  return errors;
}

/**
 * Extracts template info from the rows
 * @param rows The rows from the worksheet
 * @param prefix The prefix to look for
 * @returns The extracted value
 */
function extractTemplateInfo(rows: any[][], prefix: string): string {
  for (let i = 0; i < 5; i++) {
    if (rows[i] && rows[i][0] && String(rows[i][0]).startsWith(prefix)) {
      return String(rows[i][0]).substring(prefix.length).trim();
    }
  }
  return '';
}

/**
 * Extracts fields from the rows
 * @param rows The rows from the worksheet
 * @returns Object with baseFields and specificFields
 */
function extractFields(rows: any[][]): { baseFields: Record<string, any>, specificFields: Record<string, any> } {
  const baseFields: Record<string, any> = {};
  const specificFields: Record<string, any> = {};
  
  let currentSection = '';
  let headerRow = -1;
  
  // Find the header row
  for (let i = 0; i < rows.length; i++) {
    if (rows[i] && rows[i][0] === 'Field ID') {
      headerRow = i;
      break;
    }
  }
  
  if (headerRow === -1) {
    return { baseFields, specificFields };
  }
  
  // Process fields
  for (let i = headerRow + 1; i < rows.length; i++) {
    const row = rows[i];
    
    // Skip empty rows
    if (!row || !row.length || !row[0]) {
      continue;
    }
    
    // Check for section markers
    if (String(row[0]).startsWith('---')) {
      currentSection = String(row[0]).replace(/---/g, '').trim();
      continue;
    }
    
    // Process field row
    const fieldId = String(row[0]).replace(/^→ /, ''); // Remove arrow prefix if present
    const fieldType = String(row[1]);
    const fieldLabel = String(row[2]);
    const required = String(row[3]).toLowerCase() === 'true';
    const parentField = row[4] ? String(row[4]) : '';
    const optionsSettings = row[5] ? parseOptionsSettings(String(row[5])) : {};
    
    // Create field object
    const field: Record<string, any> = {
      type: fieldType,
      label: fieldLabel,
      validation: { required }
    };
    
    // Add options if present
    if (optionsSettings.options) {
      field.options = optionsSettings.options;
    }
    
    // Handle nested fields
    if (parentField) {
      // This is a nested field (part of an array or object)
      const targetFields = currentSection.includes('BASE') ? baseFields : specificFields;
      
      if (!targetFields[parentField]) {
        // Parent field doesn't exist yet, create it
        targetFields[parentField] = {
          type: 'array', // Default to array, will be updated if needed
          label: parentField,
          validation: { required: false }
        };
      }
      
      if (targetFields[parentField].type === 'array') {
        // Add to item template
        if (!targetFields[parentField].itemTemplate) {
          targetFields[parentField].itemTemplate = {};
        }
        targetFields[parentField].itemTemplate[fieldId] = field;
      } else if (targetFields[parentField].type === 'object') {
        // Add to fields
        if (!targetFields[parentField].fields) {
          targetFields[parentField].fields = {};
        }
        targetFields[parentField].fields[fieldId] = field;
      }
    } else {
      // This is a top-level field
      if (currentSection.includes('BASE')) {
        baseFields[fieldId] = field;
      } else {
        specificFields[fieldId] = field;
      }
    }
  }
  
  return { baseFields, specificFields };
}

/**
 * Parses options settings from JSON string
 * @param optionsString The options string to parse
 * @returns Parsed options object
 */
function parseOptionsSettings(optionsString: string): Record<string, any> {
  try {
    return JSON.parse(optionsString);
  } catch (error) {
    console.warn('Error parsing options settings:', error);
    return {};
  }
}