/**
 * Test Script for Survey Template Export/Import Functionality
 * 
 * This script demonstrates how to use the survey template export/import API endpoints.
 * 
 * How to run:
 * 1. Make sure the backend server is running
 * 2. Execute this script:
 *    node scripts/test-survey-template-export-import.js
 * 
 * What this script does:
 * - Exports a single template to Excel
 * - Exports multiple templates to Excel
 * - Demonstrates a complete export-import cycle
 * 
 * Documentation:
 * - See docs/surveys/export-import-guide.md for detailed usage instructions
 */
import fetch from 'node-fetch';
import fs from 'fs';
import FormData from 'form-data';
import path from 'path';

const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Test exporting a single survey template
 * @param {number} templateId - The ID of the template to export
 */
async function testExportTemplate(templateId) {
  try {
    console.log(`Testing export of template ID: ${templateId}`);
    
    // Make the export request
    const response = await fetch(`${API_BASE_URL}/survey-templates/${templateId}/export`, {
      method: 'GET'
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Export failed: ${errorData.error || response.statusText}`);
    }
    
    // Save the Excel file
    const buffer = await response.buffer();
    const filePath = path.join(process.cwd(), `template_${templateId}_export.xlsx`);
    fs.writeFileSync(filePath, buffer);
    
    console.log(`✅ Template exported successfully to: ${filePath}`);
    return filePath;
  } catch (error) {
    console.error('❌ Error exporting template:', error);
    throw error;
  }
}

/**
 * Test exporting multiple survey templates
 * @param {number[]} templateIds - Array of template IDs to export, or empty for all templates
 */
async function testExportMultipleTemplates(templateIds = []) {
  try {
    console.log(`Testing export of multiple templates: ${templateIds.length ? templateIds.join(', ') : 'all'}`);
    
    // Make the export request
    const response = await fetch(`${API_BASE_URL}/survey-templates/export`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids: templateIds })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Export failed: ${errorData.error || response.statusText}`);
    }
    
    // Save the Excel file
    const buffer = await response.buffer();
    const filePath = path.join(process.cwd(), `templates_export.xlsx`);
    fs.writeFileSync(filePath, buffer);
    
    console.log(`✅ Templates exported successfully to: ${filePath}`);
    return filePath;
  } catch (error) {
    console.error('❌ Error exporting templates:', error);
    throw error;
  }
}

/**
 * Test importing a survey template
 * @param {string} filePath - Path to the Excel file to import
 * @param {boolean} updateExisting - Whether to update existing templates
 */
async function testImportTemplate(filePath, updateExisting = false) {
  try {
    console.log(`Testing import of template from: ${filePath}`);
    
    // Create form data with the file
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));
    form.append('updateExisting', updateExisting.toString());
    
    // Make the import request
    const response = await fetch(`${API_BASE_URL}/survey-templates/import`, {
      method: 'POST',
      body: form
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(`Import failed: ${result.message || result.error || response.statusText}`);
    }
    
    console.log(`✅ Template imported successfully: ${result.message}`);
    return result;
  } catch (error) {
    console.error('❌ Error importing template:', error);
    throw error;
  }
}

/**
 * Run a complete export-import test cycle
 * @param {number} templateId - The ID of the template to test
 */
async function runExportImportCycle(templateId) {
  try {
    console.log('Starting export-import test cycle...');
    
    // Step 1: Export a template
    const exportedFilePath = await testExportTemplate(templateId);
    
    // Step 2: Import the template with a different name (to avoid conflicts)
    // First, modify the Excel file to change the template name
    // This would typically be done manually by the user
    console.log('Note: In a real scenario, you would modify the Excel file before importing');
    
    // Step 3: Import the template
    const importResult = await testImportTemplate(exportedFilePath, true);
    
    console.log('Export-import cycle completed successfully!');
    return { exportedFilePath, importResult };
  } catch (error) {
    console.error('Error in export-import cycle:', error);
    throw error;
  }
}

// Run the tests
async function runTests() {
  try {
    // Check if we're running in import mode
    const args = process.argv.slice(2);
    if (args.length > 0 && args[0] === 'import') {
      // Get the file path from the second argument or use the default
      const filePath = args[1] || 'templates_export.xlsx';
      // Get the updateExisting flag from the third argument or default to true
      const updateExisting = args.length > 2 ? args[2] === 'true' : true;
      
      console.log(`Importing template from ${filePath} (updateExisting: ${updateExisting})`);
      await testImportTemplate(filePath, updateExisting);
      console.log('Import completed successfully!');
      return;
    }
    
    // Replace with an actual template ID from your database
    const templateId = 1;
    
    // Test exporting a single template
    await testExportTemplate(templateId);
    
    // Test exporting all templates
    await testExportMultipleTemplates();
    
    // Test the complete export-import cycle
    // Uncomment to run the full cycle
    // await runExportImportCycle(templateId);
    
    console.log('All tests completed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the tests
runTests();