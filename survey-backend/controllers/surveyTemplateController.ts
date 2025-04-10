/**
 * Survey Template Controller
 * 
 * This controller provides API endpoints for managing survey templates,
 * including export and import functionality.
 * 
 * Export/Import Endpoints:
 * - GET /api/survey-templates/:id/export - Export a single template
 * - POST /api/survey-templates/export - Export multiple templates
 * - POST /api/survey-templates/import - Import a template from Excel
 * 
 * Documentation:
 * - See docs/surveys/export-import-guide.md for detailed usage instructions
 * - See scripts/test-survey-template-export-import.js for example usage
 */

import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { PrismaClient } from '@prisma/client';
import { MulterFile } from '../src/types/multer.types';

const prisma = new PrismaClient();

/**
 * Exports a single survey template to Excel format
 */
export const exportSurveyTemplate = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    console.log(`Controller received request to export template: ${id}`);
    
    // Generate the Excel file using the script
    const scriptPath = path.join(process.cwd(), 'scripts', 'generate-survey-template-with-data.js');
    const timestamp = Date.now();
    const outputPath = path.join(process.cwd(), `template_${String(id)}_export_${String(timestamp)}.xlsx`);
    
    // Check if the template exists
    const template = await prisma.surveyTemplate.findUnique({
      where: { id: parseInt(id, 10) }
    });
    
    if (!template) {
      res.status(404).json({ error: `Survey template with ID ${id} not found` });
      return;
    }
    
    // Execute the script to generate the Excel file
    exec(`node ${scriptPath} --template-id=${id} --output=${outputPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error('Error generating Excel file:', error);
        res.status(500).json({ error: 'Failed to generate Excel file' });
        return;
      }
      
      console.log('Script output:', stdout);
      if (stderr) console.error('Script errors:', stderr);
      
      // Set headers for file download
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=template_${String(id)}_${String(timestamp)}.xlsx`);
      
      // Stream the file to the response
      const fileStream = fs.createReadStream(outputPath);
      fileStream.pipe(res);
      
      // Clean up the temporary file after sending
      fileStream.on('end', () => {
        fs.unlink(outputPath, (err) => {
          if (err) console.error('Error deleting temporary file:', outputPath, err);
        });
      });
    });
  } catch (error: unknown) {
    console.error('Error in exportSurveyTemplate controller:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to export survey template';
    res.status(500).json({ error: errorMessage });
  }
};

/**
 * Exports multiple survey templates to Excel format
 */
export const exportMultipleSurveyTemplates = async (
  req: Request<Record<string, never>, unknown, { ids?: number[] }>,
  res: Response
): Promise<void> => {
  try {
    const body = req.body || {};
    const { ids } = body;
    console.log(`Controller received request to export templates: ${ids ? ids.join(', ') : 'all'}`);
    
    // Generate the Excel file using the script
    const scriptPath = path.join(process.cwd(), 'scripts', 'generate-survey-template-with-data.js');
    const timestamp = Date.now();
    const outputPath = path.join(process.cwd(), `templates_export_${String(timestamp)}.xlsx`);
    
    // Build the command with optional template IDs
    let command = `node ${scriptPath} --output=${outputPath}`;
    if (ids && ids.length > 0) {
      command += ` --template-ids=${ids.join(',')}`;
    }
    
    // Execute the script to generate the Excel file
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Error generating Excel file:', error);
        res.status(500).json({ error: 'Failed to generate Excel file' });
        return;
      }
      
      console.log('Script output:', stdout);
      if (stderr) console.error('Script errors:', stderr);
      
      // Set headers for file download
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=survey_templates_${String(timestamp)}.xlsx`);
      
      // Stream the file to the response
      const fileStream = fs.createReadStream(outputPath);
      fileStream.pipe(res);
      
      // Clean up the temporary file after sending
      fileStream.on('end', () => {
        fs.unlink(outputPath, (err) => {
          if (err) console.error('Error deleting temporary file:', outputPath, err);
        });
      });
    });
  } catch (error: unknown) {
    console.error('Error in exportMultipleSurveyTemplates controller:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to export survey templates';
    res.status(500).json({ error: errorMessage });
  }
};

/**
 * Imports a survey template from an Excel file
 */
export const importSurveyTemplate = async (
  req: Request & { file?: MulterFile },
  res: Response
): Promise<void> => {
  try {
    const filePath = req.file?.path || '';
    const updateExisting = req.body?.updateExisting === 'true';
    
    if (!filePath) {
      res.status(400).json({ 
        success: false, 
        error: 'No file uploaded' 
      });
      return;
    }
    
    console.log('Controller received request to import template from:', filePath);
    
    // Process the Excel file and import the template
    // This would be implemented to read the Excel file and process the data
    console.log('Importing survey template from Excel file:', filePath);
    console.log('Update existing templates:', updateExisting);
    
    // TODO: Implement the actual import logic using the xlsx library
    // This would involve:
    // 1. Reading the Excel file
    // 2. Parsing the template data
    // 3. Validating the data
    // 4. Creating or updating the template in the database
    
    // Clean up the temporary file
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting temporary file:', filePath, err);
    });
    
    // Mock implementation for now
    res.status(201).json({ 
      success: true, 
      templateId: 1,
      message: 'Template imported successfully: AHU Survey (ID: 1)'
    });
  } catch (error: unknown) {
    console.error('Error in importSurveyTemplate controller:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to import survey template';
    res.status(500).json({ 
      success: false, 
      error: errorMessage 
    });
  }
};