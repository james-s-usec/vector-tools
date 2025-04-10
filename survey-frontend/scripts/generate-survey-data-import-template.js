/**
 * Script to generate a user-friendly Excel template for importing survey data
 * 
 * This script creates an Excel file with all survey templates, where each template
 * is on its own sheet. For each template, fields are organized as columns and users
 * can fill in survey data in rows. This makes it easy for non-technical users to
 * import survey data in bulk for any survey type.
 * 
 * Usage:
 * node scripts/generate-survey-data-import-template.js
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';
import { parseArgs } from 'node:util';
import * as XLSX from 'xlsx';
import * as os from 'os';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a Prisma client instance
const prisma = new PrismaClient();

/**
 * Creates a data import template with all survey templates
 * @returns {Promise<string>} Path to the generated Excel file
 */
async function generateSurveyDataImportTemplate() {
  try {
    // Fetch all templates
    const templates = await prisma.surveyTemplate.findMany({
      orderBy: { name: 'asc' }
    });
    
    if (templates.length === 0) {
      throw new Error('No survey templates found in the database');
    }
    
    console.log(`Generating data import template for ${templates.length} survey templates`);
    
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    // Add a README sheet with instructions
    addReadmeSheet(workbook);
    
    // Add a data import template sheet for each template
    for (const template of templates) {
      console.log(`Adding template: ${template.name}`);
      addDataImportSheet(workbook, template);
    }
    
    // Create a temporary file path for the combined file
    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, `survey_data_import_all_templates_${Date.now()}.xlsx`);
    
    // Write to file
    XLSX.writeFile(workbook, filePath);
    
    return filePath;
  } catch (error) {
    console.error('Error generating survey data import template:', error);
    throw new Error('Failed to generate survey data import template');
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Adds a README sheet with instructions to the workbook
 * @param {XLSX.WorkBook} workbook The workbook to add the sheet to
 */
function addReadmeSheet(workbook) {
  const readmeData = [
    ['Survey Data Import Template - Instructions'],
    [''],
    ['This Excel workbook is designed for importing survey data in bulk.'],
    [''],
    ['HOW TO USE:'],
    ['1. Go to the sheet for the survey template you want to use'],
    ['2. Each SHEET represents a different survey template (e.g., AHU Survey, Pump Survey)'],
    ['3. Each COLUMN represents a field in the survey (e.g., tag, location, status)'],
    ['4. Each ROW represents one survey submission (one piece of equipment)'],
    ['5. Fill in the data for each submission in the rows below the header information'],
    ['6. Leave a cell empty if you don\'t have data for that field (optional fields)'],
    ['7. For select/radio fields, use the exact VALUE shown in the VALID OPTIONS row (not the label)'],
    ['8. For array fields (like photos), use comma-separated values (e.g., "photo1.jpg,photo2.jpg")'],
    ['9. Pay attention to the FIELD USAGE NOTES row for specific instructions for each field'],
    [''],
    ['SPECIAL FIELD TYPES:'],
    ['- Date fields: Use YYYY-MM-DD format (e.g., 2025-04-01)'],
    ['- Select/Radio fields: Use the value, not the label (e.g., "ACTIVE" not "Active")'],
    ['- Array fields: Use comma-separated values (e.g., "item1,item2,item3")'],
    ['- Object fields: Use JSON format (e.g., {"key1":"value1","key2":"value2"})'],
    [''],
    ['EXAMPLE:'],
    ['If you have fields "equipmentTag", "status", and "installDate", your data might look like:'],
    ['equipmentTag | status  | installDate'],
    ['------------|---------|------------'],
    ['AHU-123     | ACTIVE  | 2023-01-15'],
    ['AHU-124     | INACTIVE| 2023-02-20'],
    ['AHU-125     | ACTIVE  | 2023-03-10'],
    [''],
    ['After filling in your data, save this file and import it using:'],
    ['cd backend && npm run db:import:survey-data:excel ../survey-data-import-template.xlsx'],
    ['']
  ];
  
  const readmeSheet = XLSX.utils.aoa_to_sheet(readmeData);
  
  // Set column widths
  readmeSheet['!cols'] = [{ wch: 100 }]; // Width of column A
  
  // Add the README sheet to the workbook
  XLSX.utils.book_append_sheet(workbook, readmeSheet, 'README');
}

/**
 * Adds a data import sheet to the workbook
 * @param {XLSX.WorkBook} workbook The workbook to add the sheet to
 * @param {any} template The template to create an import sheet for
 */
function addDataImportSheet(workbook, template) {
  // Extract all fields from the template
  const fields = extractFields(template);
  
  // Create the header row with field IDs
  const headerRow = fields.map(field => field.id);
  
  // Create the label row with field labels
  const labelRow = fields.map(field => field.label);
  
  // Create the type row with field types
  const typeRow = fields.map(field => field.type);
  
  // Create the usage notes row with instructions for each field
  const usageNotesRow = fields.map(field => {
    switch(field.type) {
      case 'text':
        return 'Enter plain text';
      case 'textarea':
        return 'Enter multi-line text';
      case 'number':
        return 'Enter numeric value only';
      case 'date':
        return 'Format: YYYY-MM-DD';
      case 'select':
      case 'radio':
        return 'Use exact VALUE from options (not label)';
      case 'file':
        return 'Enter filename or path';
      case 'array':
        return 'Use comma-separated values';
      case 'object':
        return 'Use JSON format: {"key":"value"}';
      default:
        return '';
    }
  });
  
  // Create the options row with field options (if any)
  const optionsRow = fields.map(field => {
    if (field.options && field.options.length > 0) {
      return field.options.map(opt => `${opt.value}=${opt.label}`).join(', ');
    }
    return '';
  });
  
  // Create the data for the sheet
  const data = [
    ['Survey Data Import Template for: ' + template.name],
    ['Template ID: ' + template.id],
    ['Description: ' + (template.description || 'No description')],
    ['Generated: ' + new Date().toISOString().split('T')[0]],
    [''],
    ['FIELD ID:', ...headerRow],
    ['FIELD LABEL:', ...labelRow],
    ['FIELD TYPE:', ...typeRow],
    ['FIELD USAGE NOTES:', ...usageNotesRow],
    ['VALID OPTIONS:', ...optionsRow],
    [''],
    ['INSTRUCTIONS: Fill in your survey data below. Each row represents one survey submission.'],
    [''],
    // Add the header row again for the actual data section
    headerRow,
    // Add 10 empty rows for data entry
    ...Array(10).fill().map(() => Array(headerRow.length).fill(''))
  ];
  
  // Add data validation for specific field types
  const validations = [];
  
  // For each field, determine if it needs validation
  for (let colIndex = 0; colIndex < fields.length; colIndex++) {
    const field = fields[colIndex];
    const dataColIndex = colIndex + 3; // Adjust for the first 3 columns
    const dataStartRow = data.length; // Where data rows start
    
    // Add validation based on field type
    switch(field.type) {
      case 'date':
        // Date validation - YYYY-MM-DD format
        validations.push({
          col: dataColIndex,
          row: dataStartRow,
          type: 'date',
          formula: 'YYYY-MM-DD'
        });
        break;
      case 'select':
      case 'radio':
        // Dropdown validation for select/radio fields
        if (field.options && field.options.length > 0) {
          const values = field.options.map(opt => opt.value);
          validations.push({
            col: dataColIndex,
            row: dataStartRow,
            type: 'list',
            formula: values.join(',')
          });
        }
        break;
    }
  }
  
  // Create worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  
  // Set column widths - make each field column a reasonable width
  const cols = [];
  
  // Add width for each field column
  for (let i = 0; i < fields.length; i++) {
    cols.push({ wch: 20 });
  }
  
  worksheet['!cols'] = cols;
  
  // Apply data validations if supported
  try {
    // This is a simplified approach - full validation would require a more advanced Excel library
    // XLSX doesn't fully support data validation, but we can try to add it
    if (!worksheet['!dataValidation']) {
      worksheet['!dataValidation'] = [];
    }
    
    for (const validation of validations) {
      worksheet['!dataValidation'].push({
        sqref: `${XLSX.utils.encode_col(validation.col)}${validation.row+1}:${XLSX.utils.encode_col(validation.col)}100`,
        type: validation.type,
        formula: validation.formula
      });
    }
  } catch (error) {
    console.warn('Could not add data validation to Excel file:', error);
  }
  
  // Add worksheet to workbook
  // Use template name as sheet name, but ensure it's valid for Excel
  const sheetName = template.name
    .replace(/[\\/\*\?\[\]]/g, '') // Remove invalid characters
    .substring(0, 31); // Excel limits sheet names to 31 chars
  
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
}

/**
 * Extracts all fields from a template
 * @param {any} template The template to extract fields from
 * @returns {Array<{id: string, label: string, type: string, options: Array<{value: string, label: string}>}>} Array of fields
 */
function extractFields(template) {
  const fields = [];
  
  // Process base fields
  processFields(template.baseFields || {}, fields);
  
  // Process specific fields
  processFields(template.specificFields || {}, fields);
  
  return fields;
}

/**
 * Processes fields from a template section
 * @param {Record<string, any>} fieldsObj The fields object to process
 * @param {Array} fields The array to add fields to
 */
function processFields(fieldsObj, fields) {
  // Process regular fields
  for (const [fieldId, fieldData] of Object.entries(fieldsObj)) {
    // Skip processing if not an object
    if (typeof fieldData !== 'object' || fieldData === null) continue;
    
    // Extract field properties
    const fieldType = fieldData.type || 'unknown';
    const fieldLabel = fieldData.label || fieldId;
    const options = fieldData.options || [];
    
    // Add the field
    fields.push({
      id: fieldId,
      label: fieldLabel,
      type: fieldType,
      options: options
    });
    
    // If this is an array field, process its item template
    if (fieldType === 'array' && fieldData.itemTemplate) {
      processArrayItemTemplate(fieldData.itemTemplate, fieldId, fields);
    }
    
    // If this is an object field, process its nested fields
    if (fieldType === 'object' && fieldData.fields) {
      processObjectFields(fieldData.fields, fieldId, fields);
    }
  }
}

/**
 * Processes array item templates
 * @param {Record<string, any>} itemTemplate The item template object
 * @param {string} parentFieldId The ID of the parent array field
 * @param {Array} fields The array to add fields to
 */
function processArrayItemTemplate(itemTemplate, parentFieldId, fields) {
  for (const [fieldId, fieldData] of Object.entries(itemTemplate)) {
    // Skip processing if not an object
    if (typeof fieldData !== 'object' || fieldData === null) continue;
    
    // Extract field properties
    const fieldType = fieldData.type || 'unknown';
    const fieldLabel = fieldData.label || fieldId;
    const options = fieldData.options || [];
    
    // Add the field with a nested naming convention
    fields.push({
      id: `${parentFieldId}.${fieldId}`,
      label: `${fieldLabel} (in ${parentFieldId})`,
      type: fieldType,
      options: options
    });
  }
}

/**
 * Processes object fields
 * @param {Record<string, any>} fieldsObj The nested fields object
 * @param {string} parentFieldId The ID of the parent object field
 * @param {Array} fields The array to add fields to
 */
function processObjectFields(fieldsObj, parentFieldId, fields) {
  for (const [fieldId, fieldData] of Object.entries(fieldsObj)) {
    // Skip processing if not an object
    if (typeof fieldData !== 'object' || fieldData === null) continue;
    
    // Extract field properties
    const fieldType = fieldData.type || 'unknown';
    const fieldLabel = fieldData.label || fieldId;
    const options = fieldData.options || [];
    
    // Add the field with a nested naming convention
    fields.push({
      id: `${parentFieldId}.${fieldId}`,
      label: `${fieldLabel} (in ${parentFieldId})`,
      type: fieldType,
      options: options
    });
  }
}

/**
 * Main function
 */
async function main(args) {
  try {
    // Parse command line arguments
    const options = {
      output: { type: 'string' }
    };
    
    const { values } = parseArgs({ args, options, allowPositionals: true });
    
    // Generate the template
    const filePath = await generateSurveyDataImportTemplate();
    
    // Copy the file to the project root
    const outputPath = values.output || path.join(process.cwd(), 'survey-data-import-template.xlsx');
    
    // Ensure the directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.copyFileSync(filePath, outputPath);
    
    // Clean up the temporary file
    fs.unlinkSync(filePath);
    
    console.log(`Survey data import template with all templates generated successfully at: ${outputPath}`);
    console.log('Fill in your survey data and import it using:');
    console.log('cd backend && npm run db:import:survey-data:excel ../survey-data-import-template.xlsx');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Execute the script
main(process.argv.slice(2)).catch((error) => {
  console.error('Unhandled promise rejection:', error);
  process.exit(1);
});