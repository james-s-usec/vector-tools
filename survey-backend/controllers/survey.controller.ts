import { Request, Response } from 'express';
import { CreateSurveyType, UpdateSurveyType } from '../schemas/survey.schema';
import {
  getAllSurveysService,
  getEquipmentSurveysService,
  getSurveyByIdService,
  createSurveyService,
  updateSurveyService,
  deleteSurveyService
} from '../src/services/survey.service';
import { NotFoundError } from '../src/lib/errors';

export const getAllSurveys = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const surveys = await getAllSurveysService();
    // eslint-disable-next-line no-console
    console.log(`Found ${String(surveys.length)} surveys (via service)`);
    res.json(surveys);
  } catch (error: unknown) {
    console.error('Error in getAllSurveys controller:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch surveys';
    res.status(500).json({ error: errorMessage });
  }
};

export const getEquipmentSurveys = async (
  req: Request<{ equipmentId: string }>,
  res: Response
): Promise<void> => {
  try {
    const { equipmentId } = req.params;
    const surveys = await getEquipmentSurveysService(parseInt(equipmentId, 10));
    console.log(`Found ${String(surveys.length)} surveys for equipment ${equipmentId} (via service)`);
    res.json(surveys);
  } catch (error: unknown) {
    console.error('Error in getEquipmentSurveys controller:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch equipment surveys';
    res.status(500).json({ error: errorMessage });
  }
};

export const getSurveyById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const survey = await getSurveyByIdService(parseInt(id, 10));
    
    res.json(survey);
  } catch (error: unknown) {
    console.error('Error in getSurveyById controller:', error);
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch survey';
      res.status(500).json({ error: errorMessage });
    }
  }
};

export const createSurvey = async (
  req: Request<{ equipmentId: string }, unknown, CreateSurveyType>,
  res: Response
): Promise<void> => {
  try {
    const { equipmentId } = req.params;
    const surveyData = {
      ...req.body,
      equipmentId: parseInt(equipmentId, 10)
    };
    
    console.log('=== SURVEY SUBMISSION DEBUG ===');
    console.log('Controller received data for survey creation:');
    console.log('equipmentId from params:', equipmentId);
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    console.log('Combined surveyData:', JSON.stringify(surveyData, null, 2));
    
    const newSurvey = await createSurveyService(surveyData);
    console.log('Survey created successfully with ID:', newSurvey.id);
    console.log('=== END SURVEY SUBMISSION DEBUG ===');
    res.status(201).json(newSurvey);
  } catch (error: unknown) {
    console.error('Error in createSurvey controller:', error);
    
    console.log('=== SURVEY SUBMISSION ERROR ===');
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    console.log('=== END SURVEY SUBMISSION ERROR ===');
    
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create survey';
      res.status(500).json({ error: errorMessage });
    }
  }
};

export const updateSurvey = async (
  req: Request<{ id: string }, unknown, UpdateSurveyType>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    console.log('Controller received data for survey update:', updateData);
    const updatedSurvey = await updateSurveyService(parseInt(id, 10), updateData);
    console.log('Updated survey (via service):', updatedSurvey.id);
    res.json(updatedSurvey);
  } catch (error: unknown) {
    console.error('Error in updateSurvey controller:', error);
    
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update survey';
      res.status(500).json({ error: errorMessage });
    }
  }
};

export const deleteSurvey = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    console.log('Controller received request to delete survey:', id);

    await deleteSurveyService(parseInt(id, 10));
    console.log('Deleted survey (via service):', id);
    res.status(204).send();
  } catch (error: unknown) {
    console.error('Error in deleteSurvey controller:', error);
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete survey';
      res.status(500).json({ error: errorMessage });
    }
  }
};