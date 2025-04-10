/**
 * Script to generate a user-friendly survey template Excel file
 * 
 * This script creates a custom Excel template that transposes fields to columns
 * and adds data validation dropdowns, making it easier for non-technical users
 * to edit survey templates.
 * 
 * Usage:
 * node scripts/generate-user-friendly-survey-template.js
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';
import * as os from 'os';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a Prisma client instance
const prisma = new PrismaClient();

/**
 * Exports all survey templates to a user-friendly Excel format
 * @returns Path to the generated Excel file
 */
async function exportSurveyTemplatesToUserFriendlyExcel() {
  try {
    // Fetch all templates
    const templates = await prisma.surveyTemplate.findMany({
      include: { surveys: true }
    });
    
    if (templates.length === 0) {
      throw new Error('No templates found to export');
    }
    
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    // Add a README sheet with instructions
    addReadmeSheet(workbook);
    
    // Add a Field Types reference sheet
    addFieldTypesSheet(workbook);
    
    // Process each template
    for (const template of templates) {
      addTemplateSheet(workbook, template);
    }
    
    // Create a temporary file path
    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, `survey_templates_user_friendly_${Date.now()}.xlsx`);
    
    // Write to file
    XLSX.writeFile(workbook, filePath);
    
    return filePath;
  } catch (error) {
    console.error('Error exporting survey templates to user-friendly Excel:', error);
    throw new Error('Failed to export survey templates to user-friendly Excel');
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Adds a README sheet with instructions to the workbook
 * @param workbook The workbook to add the sheet to
 */
function addReadmeSheet(workbook) {
  const readmeData = [
    ['Survey Template Editor - Instructions'],
    [''],
    ['This Excel workbook provides a user-friendly way to edit survey templates in the Data Drivers application.'],
    [''],
    ['STRUCTURE:'],
    ['- Each sheet represents one survey template'],
    ['- Fields are organized as COLUMNS (each column is a field)'],
   ['- Properties are organized as ROWS (Field Type, Field Label, Required, etc.)'],
   ['- EDIT THE CELLS in these rows to modify the template'],
    ['- The Field Types sheet provides reference information about available field types'],
    [''],
    ['EDITING GUIDELINES:'],
    ['1. DO NOT modify the Field ID column unless you\'re creating a new field'],
    ['2. EDIT THE CELLS in the "Field Type" row to change field types'],
   ['3. EDIT THE CELLS in the "Field Label" row to change field labels'],
   ['4. EDIT THE CELLS in the "Required" row to set fields as required (true/false)'],
    ['5. For options, enter each option on a new line in the format: value|label'],
    ['   Example:  GOOD|Good condition'],
    ['             FAIR|Fair condition'],
    ['             POOR|Poor condition'],
    ['6. For nested fields (arrays/objects), use the Parent Field column to reference the parent field ID'],
    [''],
    ['COLOR CODING:'],
    ['- Green: Base fields (common to all templates)'],
    ['- Blue: Specific fields (unique to this template)'],
    ['- Yellow: Array fields (collections of related items)'],
    [''],
    ['WORKFLOW:'],
    ['1. Export templates using: npm run generate:user-friendly-survey-template'],
    ['2. Edit the templates in this Excel file'],
    ['3. Import the templates back using: cd backend && npm run db:import:survey-templates:excel'],
    [''],
    ['For more detailed instructions, see the documentation at:'],
    ['docs/surveys/user-friendly-excel-templates.md'],
  ];
  
  const readmeSheet = XLSX.utils.aoa_to_sheet(readmeData);
  
  // Set column widths
  readmeSheet['!cols'] = [{ wch: 100 }]; // Width of column A
  
  // Add the README sheet to the workbook
  XLSX.utils.book_append_sheet(workbook, readmeSheet, 'README');
}

/**
 * Adds a Field Types reference sheet to the workbook
 * @param workbook The workbook to add the sheet to
 */
function addFieldTypesSheet(workbook) {
  const fieldTypesData = [
    ['Field Types Reference'],
    [''],
    ['Type', 'Description', 'Example Usage'],
    ['text', 'Single line text input', 'For short text like names, tags, or IDs'],
    ['textarea', 'Multi-line text input', 'For longer text like notes or descriptions'],
    ['number', 'Numeric input', 'For measurements, counts, or any numeric values'],
    ['date', 'Date picker', 'For dates like installation date or service date'],
    ['select', 'Dropdown selection', 'For choosing from a list of options (status, condition, etc.)'],
    ['radio', 'Radio button selection', 'For mutually exclusive options (yes/no, condition ratings)'],
    ['file', 'File upload', 'For photos, documents, or other file attachments'],
    ['object', 'Nested object with fields', 'For grouping related fields (dimensions, address)'],
    ['array', 'Collection of items', 'For multiple items of the same type (photos, readings)'],
    [''],
    ['Options Format for Select/Radio Fields:'],
    ['Enter each option on a new line in the format: value|label'],
    ['Example:'],
    ['GOOD|Good condition'],
    ['FAIR|Fair condition'],
    ['POOR|Poor condition'],
  ];
  
  const fieldTypesSheet = XLSX.utils.aoa_to_sheet(fieldTypesData);
  
  // Set column widths
  fieldTypesSheet['!cols'] = [
    { wch: 15 }, // Width of column A
    { wch: 30 }, // Width of column B
    { wch: 80 }, // Width of column C
  ];
  
  // Add the Field Types sheet to the workbook
  XLSX.utils.book_append_sheet(workbook, fieldTypesSheet, 'Field Types');
}

/**
 * Adds a template sheet to the workbook
 * @param workbook The workbook to add the sheet to
 * @param template The template to add
 */
function addTemplateSheet(workbook, template) {
  // Add template info at the top
  const templateInfo = [
    [`Template: ${template.name}`],
    [`ID: ${template.id}`],
    [`Description: ${template.description || 'No description'}`],
    [`Created: ${formatDate(template.createdAt)} | Updated: ${formatDate(template.updatedAt)}`],
    [`Exported: ${formatDate(new Date())}`],
    [],
  ];
  
  // Create the transposed headers (fields as columns)
  const headers = ['Field ID', 'Section', 'Parent Field'];
  
  // Add the field properties as rows
  const propertyRows = [
    'Field Type',
    'Field Label',
    'Required',
    'Options',
    'Notes'
  ];
  
  // Process base fields
  const baseFields = processFieldsForUserFriendly(template.baseFields || {}, 'BASE');
  
  // Process specific fields
  const specificFields = processFieldsForUserFriendly(template.specificFields || {}, 'SPECIFIC');
  
  // Combine all fields
  const allFields = [...baseFields, ...specificFields];
  
  // Create the data for the sheet
  const data = [];
  
  // Add template info
  data.push(...templateInfo);
  
  // Add the header row
  const headerRow = [...headers];
  for (const field of allFields) {
    headerRow.push(field.fieldId);
  }
  data.push(headerRow);
  
  // Add property rows
  for (const property of propertyRows) {
    const row = [property, '', ''];
    for (const field of allFields) {
      if (property === 'Field Type') {
        row.push(field.fieldType);
      } else if (property === 'Field Label') {
        row.push(field.fieldLabel);
      } else if (property === 'Required') {
        row.push(field.required);
      } else if (property === 'Options') {
        // Format options as a string with each option on a new line
        if (field.options && field.options.length > 0) {
          const optionsStr = field.options.map((opt) => `${opt.value}|${opt.label}`).join('\n');
          row.push(optionsStr);
        } else {
          row.push('');
        }
      } else if (property === 'Notes') {
        row.push(field.notes || '');
      }
    }
    data.push(row);
  }
  
  // Add section and parent field rows
  const sectionRow = ['Section', '', ''];
  const parentRow = ['Parent Field', '', ''];
  
  for (const field of allFields) {
    sectionRow.push(field.section);
    parentRow.push(field.parentField || '');
  }
  
  data.splice(data.length - propertyRows.length, 0, sectionRow);
  data.splice(data.length - propertyRows.length + 1, 0, parentRow);
  
  // Create worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  
  // Set column widths - make each field column a reasonable width
  const cols = [
    { wch: 15 }, // Field ID
    { wch: 10 }, // Section
    { wch: 15 }, // Parent Field
  ];
  
  // Add width for each field column
  for (let i = 0; i < allFields.length; i++) {
    cols.push({ wch: 20 });
  }
  
  worksheet['!cols'] = cols;
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, template.name.substring(0, 31)); // Excel limits sheet names to 31 chars
}

/**
 * Processes fields for user-friendly format
 * @param fields The fields object to process
 * @param sectionPrefix Prefix for the section
 * @returns Array of processed fields
 */
function processFieldsForUserFriendly(fields, sectionPrefix) {
  const processedFields = [];
  
  // Process regular fields
  for (const [fieldId, fieldData] of Object.entries(fields)) {
    // Skip processing if not an object
    if (typeof fieldData !== 'object' || fieldData === null) continue;
    
    // Extract field properties
    const fieldType = fieldData.type || 'unknown';
    const fieldLabel = fieldData.label || fieldId;
    const required = fieldData.validation?.required ? 'true' : 'false';
    const parentField = ''; // Regular fields don't have a parent
    const options = fieldData.options || [];
    
    // Add the field
    processedFields.push({
      fieldId,
      section: `${sectionPrefix} FIELDS`,
      fieldType,
      fieldLabel,
      required,
      parentField,
      options,
      notes: ''
    });
    
    // If this is an array field, process its item template
    if (fieldType === 'array' && fieldData.itemTemplate) {
      processArrayItemTemplateForUserFriendly(fieldData.itemTemplate, fieldId, `${sectionPrefix} ARRAY`, processedFields);
    }
    
    // If this is an object field, process its nested fields
    if (fieldType === 'object' && fieldData.fields) {
      processObjectFieldsForUserFriendly(fieldData.fields, fieldId, `${sectionPrefix} OBJECT`, processedFields);
    }
  }
  
  return processedFields;
}

/**
 * Processes array item templates for user-friendly format
 * @param itemTemplate The item template object
 * @param parentFieldId The ID of the parent array field
 * @param section The section name
 * @param processedFields The array to add processed fields to
 */
function processArrayItemTemplateForUserFriendly(itemTemplate, parentFieldId, section, processedFields) {
  for (const [fieldId, fieldData] of Object.entries(itemTemplate)) {
    // Skip processing if not an object
    if (typeof fieldData !== 'object' || fieldData === null) continue;
    
    // Extract field properties
    const fieldType = fieldData.type || 'unknown';
    const fieldLabel = fieldData.label || fieldId;
    const required = fieldData.validation?.required ? 'true' : 'false';
    const options = fieldData.options || [];
    
    // Add the field
    processedFields.push({
      fieldId: fieldId,
      section,
      fieldType,
      fieldLabel,
      required,
      parentField: parentFieldId,
      options,
      notes: 'Item in array'
    });
  }
}

/**
 * Processes object fields for user-friendly format
 * @param fields The nested fields object
 * @param parentFieldId The ID of the parent object field
 * @param section The section name
 * @param processedFields The array to add processed fields to
 */
function processObjectFieldsForUserFriendly(fields, parentFieldId, section, processedFields) {
  for (const [fieldId, fieldData] of Object.entries(fields)) {
    // Skip processing if not an object
    if (typeof fieldData !== 'object' || fieldData === null) continue;
    
    // Extract field properties
    const fieldType = fieldData.type || 'unknown';
    const fieldLabel = fieldData.label || fieldId;
    const required = fieldData.validation?.required ? 'true' : 'false';
    const options = fieldData.options || [];
    
    // Add the field
    processedFields.push({
      fieldId: fieldId,
      section,
      fieldType,
      fieldLabel,
      required,
      parentField: parentFieldId,
      options,
      notes: 'Nested field'
    });
  }
}

/**
 * Helper function to format dates
 * @param date The date to format
 * @returns Formatted date string
 */
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

/**
 * Creates a user-friendly Excel template with fields as columns
 */
async function main() {
  try {
    console.log('Generating user-friendly survey template Excel file...');
    
    // Export templates to user-friendly Excel format
    const filePath = await exportSurveyTemplatesToUserFriendlyExcel();
    
    // Copy the file to the project root
    const outputPath = path.join(process.cwd(), 'survey-templates-user-friendly.xlsx');
    fs.copyFileSync(filePath, outputPath);
    
    // Clean up the temporary file
    fs.unlinkSync(filePath);
    
    console.log(`User-friendly Excel template generated successfully at: ${outputPath}`);
    console.log('You can now edit this file and import it back using:');
    console.log('cd backend && npm run db:import:survey-templates:excel');
  } catch (error) {
    console.error('Error generating user-friendly Excel template:', error);
    process.exit(1);
  }
}

// Execute the script
main().catch((error) => {
  console.error('Unhandled promise rejection:', error);
  process.exit(1);
});