/**
 * Survey Template Routes
 * 
 * This file defines the API routes for survey template management,
 * including export and import functionality.
 * 
 * Export/Import Routes:
 * - GET /api/survey-templates/:id/export - Export a single template
 * - POST /api/survey-templates/export - Export multiple templates
 * - POST /api/survey-templates/import - Import a template from Excel
 * 
 * Documentation:
 * - See docs/surveys/export-import-guide.md for detailed usage instructions
 * - See scripts/test-survey-template-export-import.js for example usage
 */
import { Router, Request, RequestHandler } from 'express';
import {
  getAllSurveyTemplates,
  getSurveyTemplateById,
  createSurveyTemplate,
  updateSurveyTemplate,
  deleteSurveyTemplate,
  exportSurveyTemplate,
  exportMultipleSurveyTemplates,
  importSurveyTemplate
} from '../controllers/survey-template.controller';
import { asyncHandler } from '../src/utils/asyncHandler';
import { validateRequest } from '../src/middleware/validateRequest';
import multer from 'multer';
import { MulterFilterCallback } from '../src/types/multer.types';
import {
  CreateSurveyTemplateSchema,
  UpdateSurveyTemplateSchema
} from '../schemas/survey.schema';

const router: Router = Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      cb(null, 'uploads/');
    },
    filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      cb(null, `${String(Date.now())}-${file.originalname}`);
    }
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req: Request, file: Express.Multer.File, cb: MulterFilterCallback) => {
    cb(null, file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  }
});

// Get all survey templates
router.get('/', asyncHandler(getAllSurveyTemplates));

// Get survey template by ID
router.get('/:id', asyncHandler(getSurveyTemplateById));

// Create new survey template
router.post('/', validateRequest(CreateSurveyTemplateSchema), asyncHandler(createSurveyTemplate));

// Update survey template
router.put('/:id', validateRequest(UpdateSurveyTemplateSchema), asyncHandler(updateSurveyTemplate));

// Delete survey template
router.delete('/:id', asyncHandler(deleteSurveyTemplate));

// Export survey template to Excel
router.get('/:id/export', asyncHandler(exportSurveyTemplate));

// Export multiple survey templates to Excel
router.post('/export', asyncHandler(exportMultipleSurveyTemplates));
// Import survey template from Excel
// Use a type assertion to tell ESLint that the multer middleware is safe
router.post('/import', upload.single('file') as unknown as RequestHandler, asyncHandler(importSurveyTemplate));

export default router;