/**
 * Script to generate a survey template Excel file with actual template data
 * 
 * This script creates a custom Excel template that includes both the instructions
 * and the actual survey templates from the database.
 * 
 * Usage:
 * node scripts/generate-survey-template-with-data.js
 */

import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Creates a custom Excel template with actual template data
 */
async function main() {
  try {
    console.log('Generating survey template Excel file with actual data...');
    
    // Read the exported JSON file
    const jsonPath = path.join(__dirname, '..', 'backend', 'prisma', 'survey-templates-export.json');
    const jsonData = fs.readFileSync(jsonPath, 'utf8');
    const templates = JSON.parse(jsonData);
    
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    // Add a README sheet with instructions
    const readmeData = [
      ['Survey Template Excel Format - Instructions'],
      [''],
      ['This Excel workbook is designed for editing survey templates in the Data Drivers application.'],
      [''],
      ['STRUCTURE:'],
      ['- Each sheet represents one survey template'],
      ['- The first rows contain template metadata (name, description, etc.)'],
      ['- The table below contains field definitions'],
      [''],
      ['EDITING GUIDELINES:'],
      ['1. DO NOT modify the header rows (1-5) except for the template name and description'],
      ['2. DO NOT change the Field ID column unless you\'re creating a new field'],
      ['3. Respect the field types - valid types are listed in the "Field Types" sheet'],
      ['4. Format options correctly - use valid JSON in the Options/Settings column'],
      ['5. Maintain parent relationships - for nested fields, ensure the Parent Field column references a valid field ID'],
      [''],
      ['COLOR CODING:'],
      ['- Green sections: Base fields (common to all templates)'],
      ['- Blue sections: Specific fields (unique to this template)'],
      ['- Yellow sections: Array fields (collections of related items)'],
      [''],
      ['VALIDATION:'],
      ['- Field Type cells have dropdown validation for valid types'],
      ['- Required cells have dropdown validation for true/false'],
      [''],
      ['For more detailed instructions, see the documentation at:'],
      ['docs/surveys/export-import-guide.md'],
    ];
    
    const readmeSheet = XLSX.utils.aoa_to_sheet(readmeData);
    
    // Set column widths
    readmeSheet['!cols'] = [{ wch: 100 }]; // Width of column A
    
    // Add the README sheet to the workbook
    XLSX.utils.book_append_sheet(workbook, readmeSheet, 'README');
    
    // Add a Field Types reference sheet
    const fieldTypesData = [
      ['Field Types Reference'],
      [''],
      ['Type', 'Description', 'Example Usage'],
      ['text', 'Single line text input', '{ "type": "text", "label": "Equipment Tag" }'],
      ['textarea', 'Multi-line text input', '{ "type": "textarea", "label": "Notes" }'],
      ['number', 'Numeric input', '{ "type": "number", "label": "Temperature" }'],
      ['date', 'Date picker', '{ "type": "date", "label": "Installation Date" }'],
      ['select', 'Dropdown selection', '{ "type": "select", "label": "Status", "options": [{"value": "ACTIVE", "label": "Active"}, {"value": "INACTIVE", "label": "Inactive"}] }'],
      ['radio', 'Radio button selection', '{ "type": "radio", "label": "Condition", "options": [{"value": "GOOD", "label": "Good"}, {"value": "FAIR", "label": "Fair"}, {"value": "POOR", "label": "Poor"}] }'],
      ['file', 'File upload', '{ "type": "file", "label": "Photo" }'],
      ['object', 'Nested object with fields', '{ "type": "object", "label": "Dimensions", "fields": { "length": { "type": "number", "label": "Length" }, "width": { "type": "number", "label": "Width" } } }'],
      ['array', 'Collection of items', '{ "type": "array", "label": "Photos", "itemTemplate": { "photo": { "type": "file", "label": "Photo" }, "description": { "type": "text", "label": "Description" } } }'],
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
    
    // Process each template
    for (const template of templates) {
      // Add template info to the workbook
      const templateInfo = [
        [`Template: ${template.name}`],
        [`ID: 0`], // We don't have IDs in the static templates
        [`Description: ${template.description || 'No description'}`],
        [`Created: ${new Date().toISOString().split('T')[0]} | Updated: ${new Date().toISOString().split('T')[0]}`],
        [`Exported: ${new Date().toISOString().split('T')[0]}`],
        [],
      ];
      
      // Add headers for the fields
      const headers = ['Field ID', 'Field Type', 'Field Label', 'Required', 'Parent Field', 'Options/Settings', 'Notes'];
      templateInfo.push(headers);
      
      // Process base fields
      const baseFields = processFields(template.baseFields || {}, 'BASE FIELDS');
      
      // Process specific fields
      const specificFields = processFields(template.specificFields || {}, 'SPECIFIC FIELDS');
      
      // Combine all rows
      const allRows = [...templateInfo, ...baseFields, ...specificFields];
      
      // Create worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(allRows);
      
      // Set column widths
      worksheet['!cols'] = [
        { wch: 20 }, // Width of column A
        { wch: 15 }, // Width of column B
        { wch: 25 }, // Width of column C
        { wch: 10 }, // Width of column D
        { wch: 15 }, // Width of column E
        { wch: 40 }, // Width of column F
        { wch: 30 }, // Width of column G
      ];
      
      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, template.name);
    }
    
    // Create the output file path
    const outputPath = path.join(process.cwd(), 'survey-templates-with-data.xlsx');
    
    // Write to file
    XLSX.writeFile(workbook, outputPath);
    
    console.log(`Excel template with actual data generated successfully at: ${outputPath}`);
    console.log('You can now edit this file and import it back using:');
    console.log('cd backend && npm run db:import:survey-templates:excel');
  } catch (error) {
    console.error('Error generating Excel template with data:', error);
    process.exit(1);
  }
}

/**
 * Helper function to process fields from a template section
 * @param fields The fields object to process
 * @param sectionTitle Title for the section
 * @returns Array of rows for the Excel sheet
 */
function processFields(fields, sectionTitle) {
  const rows = [
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
function processArrayItemTemplate(itemTemplate, parentFieldId, rows) {
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
function processObjectFields(fields, parentFieldId, rows) {
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

// Execute the script
main();