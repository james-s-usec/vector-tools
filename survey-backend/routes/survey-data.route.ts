/**
 * Survey Data Routes
 * 
 * This file defines the API routes for survey data management,
 * including import functionality and template generation.
 * 
 * Routes:
 * - POST /api/survey-data/import - Import survey data from Excel
 * - GET /api/survey-data/template - Generate template for data import
 * 
 * Documentation:
 * - See docs/surveys/survey-data-import.md for detailed usage instructions
 */

import { Router, Request } from 'express';
import multer from 'multer';
import { asyncHandler } from '../src/utils/asyncHandler';
import {
  importSurveyData,
  generateDataImportTemplate
} from '../controllers/surveyDataController';

const router: Router = Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      cb(null, 'uploads/');
    },
    filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      cb(null, `${Date.now().toString()}-${file.originalname}`)
;
    }
   }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req: Request, file: Express.Multer.File, cb: any) => {
    // Accept only Excel files
    const isExcel = file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    cb(null, isExcel);
  }
});

// Generate template for data import
router.get('/template', asyncHandler(generateDataImportTemplate as any));
router.post('/import', upload.single('file'), asyncHandler(importSurveyData as any));

export default router;