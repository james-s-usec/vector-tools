import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';
import { CreateSurveyType, UpdateSurveyType } from '../../schemas/survey.schema';
import { NotFoundError } from '../lib/errors';

// Type for survey with all relations loaded
type SurveyWithRelations = Prisma.SurveyGetPayload<{
  include: {
    equipment: {
      include: {
        category: true;
        location: true;
      };
    };
    template: true;
  };
}>;

/**
 * Fetches all surveys.
 */
export const getAllSurveysService = async (): Promise<SurveyWithRelations[]> => {
  try {
    const surveys = await prisma.survey.findMany({
      include: {
        equipment: {
          include: {
            category: true,
            location: true
          }
        },
        template: true
      }
    });
    return surveys;
  } catch (error: unknown) {
    console.error('Error fetching surveys in service:', error);
    throw new Error('Failed to fetch surveys from database');
  }
};

/**
 * Fetches all surveys for a specific equipment item.
 */
export const getEquipmentSurveysService = async (equipmentId: number): Promise<SurveyWithRelations[]> => {
  try {
    const surveys = await prisma.survey.findMany({
      where: {
        equipmentId
      },
      include: {
        equipment: {
          include: {
            category: true,
            location: true
          }
        },
        template: true
      },
      orderBy: {
        surveyDate: 'desc'
      }
    });
    return surveys;
  } catch (error: unknown) {
    console.error('Error fetching equipment surveys in service:', error);
    throw new Error(`Failed to fetch surveys for equipment with ID ${equipmentId}`);
  }
};

/**
 * Fetches a single survey by its ID.
 * Throws NotFoundError if survey is not found.
 */
export const getSurveyByIdService = async (id: number): Promise<SurveyWithRelations> => {
  try {
    const survey = await prisma.survey.findUnique({
      where: { id },
      include: {
        equipment: {
          include: {
            category: true,
            location: true
          }
        },
        template: true
      }
    });

    if (!survey) {
      throw new NotFoundError(`Survey with ID ${id} not found`);
    }

    return survey;
  } catch (error: unknown) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    console.error('Error fetching survey in service:', error);
    throw new Error(`Failed to fetch survey with ID ${id}`);
  }
};

/**
 * Creates a new survey.
 */
export const createSurveyService = async (data: CreateSurveyType): Promise<SurveyWithRelations> => {
  try {
    console.log('=== SURVEY SERVICE DEBUG ===');
    console.log('Received data in service:', JSON.stringify(data, null, 2));
    
    // Check if the equipment exists
    const equipment = await prisma.equipment.findUnique({
      where: { id: data.equipmentId }
    });

    if (!equipment) {
      console.log(`Equipment with ID ${data.equipmentId} not found`);
      throw new NotFoundError(`Equipment with ID ${data.equipmentId} not found`);
    }
    console.log(`Found equipment with ID ${data.equipmentId}`);

    // Check if the template exists
    const template = await prisma.surveyTemplate.findUnique({
      where: { id: data.templateId }
    });

    if (!template) {
      console.log(`Survey template with ID ${data.templateId} not found`);
      throw new NotFoundError(`Survey template with ID ${data.templateId} not found`);
    }
    console.log(`Found template with ID ${data.templateId}`);
    
    // Log the data being sent to Prisma
    console.log('Data being sent to Prisma create:', JSON.stringify(data, null, 2));

    // Prepare data for Prisma
    const prismaData = {
      equipmentId: data.equipmentId,
      templateId: data.templateId,
      surveyDate: new Date(data.surveyDate),
      preparedBy: data.preparedBy,
      surveyData: data.surveyData || {}
    };
    
    console.log('Formatted data for Prisma:', JSON.stringify(prismaData, null, 2));

    const newSurvey = await prisma.survey.create({
      data: prismaData,
      include: {
        equipment: {
          include: {
            category: true,
            location: true
          }
        },
        template: true
      }
    });

    console.log('Survey created successfully:', newSurvey.id);
    console.log('=== END SURVEY SERVICE DEBUG ===');
    return newSurvey;
  } catch (error: unknown) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    console.error('Error creating survey in service:', error);
    console.log('=== SURVEY SERVICE ERROR ===');
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      // If it's a Prisma error, log more details
      if (error.name === 'PrismaClientKnownRequestError' || 
          error.name === 'PrismaClientValidationError') {
        console.error('Prisma error details:', error);
      }
    }
    console.log('=== END SURVEY SERVICE ERROR ===');
    throw new Error('Failed to create survey');
  }
};

/**
 * Updates an existing survey.
 * Throws NotFoundError if survey is not found.
 */
export const updateSurveyService = async (id: number, data: UpdateSurveyType): Promise<SurveyWithRelations> => {
  try {
    // Check if the survey exists
    const existingSurvey = await prisma.survey.findUnique({
      where: { id }
    });

    if (!existingSurvey) {
      throw new NotFoundError(`Survey with ID ${id} not found`);
    }

    // If equipmentId is being updated, check if the equipment exists
    if (data.equipmentId) {
      const equipment = await prisma.equipment.findUnique({
        where: { id: data.equipmentId }
      });

      if (!equipment) {
        throw new NotFoundError(`Equipment with ID ${data.equipmentId} not found`);
      }
    }

    // If templateId is being updated, check if the template exists
    if (data.templateId) {
      const template = await prisma.surveyTemplate.findUnique({
        where: { id: data.templateId }
      });

      if (!template) {
        throw new NotFoundError(`Survey template with ID ${data.templateId} not found`);
      }
    }

    const updatedSurvey = await prisma.survey.update({
      where: { id },
      data,
      include: {
        equipment: {
          include: {
            category: true,
            location: true
          }
        },
        template: true
      }
    });

    return updatedSurvey;
  } catch (error: unknown) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    console.error('Error updating survey in service:', error);
    throw new Error(`Failed to update survey with ID ${id}`);
  }
};

/**
 * Deletes a survey.
 * Throws NotFoundError if survey is not found.
 */
export const deleteSurveyService = async (id: number): Promise<void> => {
  try {
    // Check if the survey exists
    const existingSurvey = await prisma.survey.findUnique({
      where: { id }
    });

    if (!existingSurvey) {
      throw new NotFoundError(`Survey with ID ${id} not found`);
    }

    await prisma.survey.delete({
      where: { id }
    });
  } catch (error: unknown) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    console.error('Error deleting survey in service:', error);
    throw new Error(`Failed to delete survey with ID ${id}`);
  }
};