import { Router } from 'express';
import {
  getAllSurveys,
  getEquipmentSurveys,
  getSurveyById,
  createSurvey,
  updateSurvey,
  deleteSurvey
} from '../controllers/survey.controller';
import { asyncHandler } from '../src/utils/asyncHandler';
import { validateRequest } from '../src/middleware/validateRequest';
import {
  CreateSurveySchema,
  UpdateSurveySchema
} from '../schemas/survey.schema';

const router: Router = Router();

// Get all surveys
router.get('/', asyncHandler(getAllSurveys));

// Get survey by ID
router.get('/:id', asyncHandler(getSurveyById));

// Update survey
router.put('/:id', validateRequest(UpdateSurveySchema), asyncHandler(updateSurvey));

// Delete survey
router.delete('/:id', asyncHandler(deleteSurvey));

// Get all surveys for a specific equipment
router.get('/equipment/:equipmentId', asyncHandler(getEquipmentSurveys));

// Create new survey for equipment
router.post('/equipment/:equipmentId', validateRequest(CreateSurveySchema), asyncHandler(createSurvey));

export default router;