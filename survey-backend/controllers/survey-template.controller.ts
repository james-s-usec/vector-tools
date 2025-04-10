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
import { CreateSurveyTemplateType, UpdateSurveyTemplateType } from '../schemas/survey.schema';
import {
  getAllSurveyTemplatesService,
  getSurveyTemplateByIdService,
  createSurveyTemplateService,
  updateSurveyTemplateService,
  deleteSurveyTemplateService
} from '../src/services/survey-template.service';
import {
  exportSurveyTemplateToExcel,
  exportMultipleSurveyTemplatesToExcel
} from '../src/services/survey-template-export.service';
import { MulterFile } from '../src/types/multer.types';
import { importSurveyTemplateFromExcel } from '../src/services/survey-template-import.service';
import { NotFoundError, ConflictError } from '../src/lib/errors';

export const getAllSurveyTemplates = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const templates = await getAllSurveyTemplatesService();
    console.log(`Found ${String(templates.length)} survey templates (via service)`);
    res.json(templates);
  } catch (error: unknown) {
    console.error('Error in getAllSurveyTemplates controller:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch survey templates';
    res.status(500).json({ error: errorMessage });
  }
};

export const getSurveyTemplateById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const template = await getSurveyTemplateByIdService(parseInt(id, 10));
    console.log('Found survey template by ID (via service):', template.id);
    res.json(template);
  } catch (error: unknown) {
    console.error('Error in getSurveyTemplateById controller:', error);
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch survey template';
      res.status(500).json({ error: errorMessage });
    }
  }
};

export const createSurveyTemplate = async (
  req: Request<Record<string, never>, unknown, CreateSurveyTemplateType>,
  res: Response
): Promise<void> => {
  try {
    console.log('Controller received data for template creation:', req.body);
    const newTemplate = await createSurveyTemplateService(req.body);
    console.log('Created survey template (via service):', newTemplate.id);
    res.status(201).json(newTemplate);
  } catch (error: unknown) {
    console.error('Error in createSurveyTemplate controller:', error);
    
    if (error instanceof ConflictError) {
      res.status(409).json({ error: error.message });
    } else {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create survey template';
      res.status(500).json({ error: errorMessage });
    }
  }
};

export const updateSurveyTemplate = async (
  req: Request<{ id: string }, unknown, UpdateSurveyTemplateType>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    console.log('Controller received data for template update:', updateData);
    const updatedTemplate = await updateSurveyTemplateService(parseInt(id, 10), updateData);
    console.log('Updated survey template (via service):', updatedTemplate.id);
    res.json(updatedTemplate);
  } catch (error: unknown) {
    console.error('Error in updateSurveyTemplate controller:', error);
    
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else if (error instanceof ConflictError) {
      res.status(409).json({ error: error.message });
    } else {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update survey template';
      res.status(500).json({ error: errorMessage });
    }
  }
};

export const deleteSurveyTemplate = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    console.log('Controller received request to delete template:', id);

    await deleteSurveyTemplateService(parseInt(id, 10));
    console.log('Deleted survey template (via service):', id);
    res.status(204).send();
  } catch (error: unknown) {
    console.error('Error in deleteSurveyTemplate controller:', error);
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete survey template';
      res.status(500).json({ error: errorMessage });
    }
  }
};

/**
 * Exports a survey template to Excel format
 */
export const exportSurveyTemplate = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    console.log(`Controller received request to export template: ${id}`);
    
    const filePath = await exportSurveyTemplateToExcel(parseInt(id, 10));
    console.log(`Template exported to: ${filePath}`);
    
    // Set headers for file download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=template_${id}.xlsx`);
    
    // Stream the file to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
    
    // Clean up the temporary file after sending
    fileStream.on('end', () => {
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Error deleting temporary file: ${filePath}`, err);
      });
    });
  } catch (error: unknown) {
    console.error('Error in exportSurveyTemplate controller:', error);
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      const errorMessage = error instanceof Error ? error.message : 'Failed to export survey template';
      res.status(500).json({ error: errorMessage });
    }
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
    const { ids } = req.body;
    console.log(`Controller received request to export templates: ${ids ? ids.join(', ') : 'all'}`);
    
    const filePath = await exportMultipleSurveyTemplatesToExcel(ids);
    console.log(`Templates exported to: ${filePath}`);
    
    // Set headers for file download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=survey_templates.xlsx`);
    
    // Stream the file to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
    
    // Clean up the temporary file after sending
    fileStream.on('end', () => {
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Error deleting temporary file: ${filePath}`, err);
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
    const filePath = (req.file as any)?.path; // Cast to any to access path property
    const updateExisting = req.body.updateExisting === 'true';
    
    if (!filePath) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
    
    console.log(`Controller received request to import template from: ${filePath}`);
    const result = await importSurveyTemplateFromExcel(filePath, updateExisting);
    
    // Clean up the temporary file
    fs.unlink(filePath, (err) => {
      if (err) console.error(`Error deleting temporary file: ${filePath}`, err);
    });
    
    if (result.success) {
      res.status(201).json({ 
        success: true, 
        templateId: result.templateId,
        message: result.message
      });
    } else {
      res.status(400).json({ 
        success: false, 
        errors: result.errors,
        message: result.message
      });
    }
  } catch (error: unknown) {
    console.error('Error in importSurveyTemplate controller:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to import survey template';
    res.status(500).json({ error: errorMessage });
  }
};