/**
 * Survey Data Controller
 * 
 * This controller provides API endpoints for managing survey data,
 * including import and export functionality.
 * 
 * Endpoints:
 * - POST /api/survey-data/import - Import survey data from Excel
 * - GET /api/survey-data/template - Generate template for data import
 * 
 * Documentation:
 * - See docs/surveys/export-import-guide.md for detailed usage instructions
 */

import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { MulterFile } from '../src/types/multer.types';

// Remove unused prisma import

/**
 * Imports survey data from an Excel file
 */
export const importSurveyData = async (
  req: Request & { file?: MulterFile },
  res: Response
): Promise<void> => {
  try {
    const filePath = req.file?.path;
    
    if (!filePath) {
      res.status(400).json({ 
        success: false, 
        error: 'No file uploaded' 
      });
      return;
    }
    
    console.log(`Controller received request to import survey data from: ${filePath}`);
    
    // Process the Excel file and import the data
    const result = await importSurveyDataFromExcel(filePath);
    
    // Clean up the temporary file
    fs.unlink(filePath, (err) => {
      if (err) console.error(`Error deleting temporary file: ${filePath}`, err);
    });
    
    if (result.success) {
      const count = result.count || 0; // Ensure count is defined
      res.status(201).json({
        success: true,
        count: count,
        message: `Successfully imported ${count} survey submissions`
      });
    } else {
      res.status(400).json({ 
        success: false, 
        errors: result.errors,
        message: result.message || 'Failed to import survey data'
      });
    }
  } catch (error: unknown) {
    console.error('Error in importSurveyData controller:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to import survey data';
    res.status(500).json({ 
      success: false, 
      error: errorMessage 
    });
  }
};

/**
 * Generates a template for importing survey data
 */
export const generateDataImportTemplate = (
  _req: Request, // Prefix with underscore to indicate it's intentionally unused
  res: Response
): void => {
  try {
    console.log('Controller received request to generate survey data import template');
    
    // Generate the template file using the script
    const timestamp = Date.now();
    const outputFilename = `survey-data-import-template-${String(timestamp)}.xlsx`;
    const outputPath = path.join(process.cwd(), outputFilename);
    
    const command = `cd .. && node scripts/generate-survey-data-import-template.js --output=${outputPath}`;
    console.log('Executing command:', command);
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Error generating template:', error);
        res.status(500).json({ 
          success: false, 
          error: 'Failed to generate template' 
        });
        return;
      }
      
      console.log('Template generation output:', stdout);
      if (stderr) {
        console.error('Template generation errors:', stderr);
      }
      
      // Send the generated file
      const filePath = outputPath;
      
      if (!fs.existsSync(filePath)) {
        res.status(500).json({ 
          success: false, 
          error: `Template file not found after generation: ${filePath}` 
        });
        return;
      }
      
      res.download(filePath, `survey-data-import-template-${String(timestamp)}.xlsx`, (err) => {
        // err can be null/undefined, so this check is necessary despite the linter warning
        if (err) {
          console.error(`Error sending file ${filePath}:`, err);
          res.status(500).json({
            success: false,
            error: 'Failed to send template file'
          });
        }
      });
    });
  } catch (error: unknown) {
    console.error('Error in generateDataImportTemplate controller:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate data import template';
    res.status(500).json({ 
      success: false, 
      error: errorMessage 
    });
  }
};

/**
 * Helper function to import survey data from an Excel file
 * @param {string} filePath - Path to the Excel file
 * @returns {Promise<{success: boolean, count?: number, errors?: string[], message?: string}>}
 */
// This function is marked async for future implementation that will use await
// Currently it's a mock implementation
async function importSurveyDataFromExcel(filePath: string): Promise<{
  success: boolean;
  count?: number;
  errors?: string[];
  message?: string;
}> {
  try {
    // This would be implemented to read the Excel file and process the data
    // For now, we'll return a mock result
    console.log(`Importing survey data from Excel file: ${filePath}`);
    
    // TODO: Implement the actual import logic using the xlsx library
    // This would involve:
    // 1. Reading the Excel file
    // 2. Parsing the data for each sheet (each sheet represents a template)
    // 3. Validating the data
    // 4. Creating survey submissions in the database
    
    // Mock implementation for now
    return {
      success: true,
      count: 5, // Number of surveys imported
      message: 'Successfully imported 5 survey submissions'
    };
  } catch (error: unknown) {
    console.error('Error importing survey data from Excel:', error);
    return {
      success: false,
      errors: [error instanceof Error ? error.message : 'Unknown error'],
      message: 'Failed to import survey data'
    };
  }
}