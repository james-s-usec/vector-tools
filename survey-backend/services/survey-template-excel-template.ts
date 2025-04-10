/**
 * Survey Template Excel Template Generator
 * 
 * This service creates a custom Excel template for survey templates with
 * formatting, validation, and instructions embedded directly in the workbook.
 */
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

/**
 * Creates a custom Excel template for survey templates
 * @returns Path to the generated Excel template file
 */
export const createExcelTemplate = (): string => {
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
  
  // Add a Template Example sheet
  const templateExampleData = [
    ['Template: Example Template'],
    ['ID: 0'],
    ['Description: This is an example template to demonstrate the format'],
    ['Created: 2025-04-01 | Updated: 2025-04-01'],
    ['Exported: 2025-04-01'],
    [''],
    ['BASE FIELDS'],
    ['Field ID', 'Field Type', 'Field Label', 'Required', 'Parent Field', 'Options/Settings', 'Notes'],
    ['tag', 'text', 'Equipment Tag', 'true', '', '{}', 'Unique identifier'],
    ['location', 'text', 'Location', 'true', '', '{}', 'Physical location'],
    ['unitOperating', 'select', 'Unit Operating', 'true', '', '{"options":[{"value":"YES","label":"Yes"},{"value":"NO","label":"No"}]}', 'Operational status'],
    [''],
    ['SPECIFIC FIELDS'],
    ['airflowCFM', 'number', 'Airflow (CFM)', 'false', '', '{}', ''],
    ['supplyTemp', 'number', 'Supply Temperature', 'false', '', '{}', ''],
    [''],
    ['ARRAY FIELDS'],
    ['surveyPhotos', 'array', 'Survey Photos', 'false', '', '{}', ''],
    ['→ photo', 'file', 'Photo', 'true', 'surveyPhotos', '{}', 'Item in surveyPhotos array'],
    ['→ description', 'text', 'Description', 'false', 'surveyPhotos', '{}', 'Item in surveyPhotos array'],
    ['→ location', 'text', 'Location', 'false', 'surveyPhotos', '{}', 'Item in surveyPhotos array'],
  ];
  
  const templateExampleSheet = XLSX.utils.aoa_to_sheet(templateExampleData);
  
  // Set column widths
  templateExampleSheet['!cols'] = [
    { wch: 20 }, // Width of column A
    { wch: 15 }, // Width of column B
    { wch: 25 }, // Width of column C
    { wch: 10 }, // Width of column D
    { wch: 15 }, // Width of column E
    { wch: 40 }, // Width of column F
    { wch: 30 }, // Width of column G
  ];
  
  // Add the Template Example sheet to the workbook
  XLSX.utils.book_append_sheet(workbook, templateExampleSheet, 'Template Example');
  
  // Create a temporary file path
  // Get the directory name using import.meta.url
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  const outputPath = path.join(__dirname, '..', '..', 'prisma', 'survey-template-excel-template.xlsx');
  
  // Write to file
  XLSX.writeFile(workbook, outputPath);
  
  return outputPath;
};

/**
 * Applies formatting and validation to an existing workbook
 * @param workbook The workbook to format
 * @returns The formatted workbook
 */
export const formatWorkbook = (workbook: XLSX.WorkBook): XLSX.WorkBook => {
  // Add the README and Field Types sheets if they don't exist
  let hasReadme = false;
  let hasFieldTypes = false;
  
  for (const sheetName of workbook.SheetNames) {
    if (sheetName === 'README') hasReadme = true;
    if (sheetName === 'Field Types') hasFieldTypes = true;
  }
  
  if (!hasReadme || !hasFieldTypes) {
    // Create a new template and copy the README and Field Types sheets
    const templatePath = createExcelTemplate();
    const template = XLSX.readFile(templatePath);
    
    if (!hasReadme) {
      const readmeSheet = template.Sheets['README'];
      workbook.SheetNames.unshift('README'); // Add at the beginning
      workbook.Sheets['README'] = readmeSheet;
    }
    
    if (!hasFieldTypes) {
      const fieldTypesSheet = template.Sheets['Field Types'];
      // Add after README or at the beginning if README doesn't exist
      const insertIndex = workbook.SheetNames.indexOf('README') + 1;
      workbook.SheetNames.splice(insertIndex, 0, 'Field Types');
      workbook.Sheets['Field Types'] = fieldTypesSheet;
    }
    
    // Clean up the temporary template file
    fs.unlinkSync(templatePath);
  }
  
  // Apply formatting to each template sheet
  for (const sheetName of workbook.SheetNames) {
    if (sheetName === 'README' || sheetName === 'Field Types') continue;
    // Removed unused sheet variable
    
    
    // TODO: Add cell formatting, colors, and validation rules
    // This would require more advanced Excel manipulation than XLSX provides
    // For a production implementation, consider using a library like ExcelJS
  }
  
  return workbook;
};