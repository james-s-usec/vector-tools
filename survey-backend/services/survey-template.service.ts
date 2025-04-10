import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';
import { CreateSurveyTemplateType, UpdateSurveyTemplateType } from '../../schemas/survey.schema';
import { NotFoundError, ConflictError } from '../lib/errors';

// Type for survey template with all relations loaded
type SurveyTemplateWithRelations = Prisma.SurveyTemplateGetPayload<{
  include: {
    surveys: true;
  };
}>;

/**
 * Fetches all survey templates.
 */
export const getAllSurveyTemplatesService = async (): Promise<SurveyTemplateWithRelations[]> => {
  try {
    const templates = await prisma.surveyTemplate.findMany({
      include: {
        surveys: true
      }
    });
    return templates;
  } catch (error: unknown) {
    console.error('Error fetching survey templates in service:', error);
    throw new Error('Failed to fetch survey templates from database');
  }
};

/**
 * Fetches a single survey template by its ID.
 * Throws NotFoundError if template is not found.
 */
export const getSurveyTemplateByIdService = async (id: number): Promise<SurveyTemplateWithRelations> => {
  try {
    const template = await prisma.surveyTemplate.findUnique({
      where: { id },
      include: {
        surveys: true
      }
    });

    if (!template) {
      throw new NotFoundError(`Survey template with ID ${id} not found`);
    }

    return template;
  } catch (error: unknown) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    console.error('Error fetching survey template in service:', error);
    throw new Error(`Failed to fetch survey template with ID ${id}`);
  }
};

/**
 * Creates a new survey template.
 * Throws ConflictError if a template with the same name already exists.
 */
export const createSurveyTemplateService = async (data: CreateSurveyTemplateType): Promise<SurveyTemplateWithRelations> => {
  try {
    // Check if a template with the same name already exists
    const existingTemplate = await prisma.surveyTemplate.findFirst({
      where: { name: data.name }
    });

    if (existingTemplate) {
      throw new ConflictError(`Survey template with name '${data.name}' already exists`);
    }

    const newTemplate = await prisma.surveyTemplate.create({
      data: {
        name: data.name,
        description: data.description,
        baseFields: data.baseFields,
        specificFields: data.specificFields
      },
      include: {
        surveys: true
      }
    });

    return newTemplate;
  } catch (error: unknown) {
    if (error instanceof ConflictError) {
      throw error;
    }
    console.error('Error creating survey template in service:', error);
    throw new Error('Failed to create survey template');
  }
};

/**
 * Updates an existing survey template.
 * Throws NotFoundError if template is not found.
 * Throws ConflictError if trying to update to a name that already exists.
 */
export const updateSurveyTemplateService = async (id: number, data: UpdateSurveyTemplateType): Promise<SurveyTemplateWithRelations> => {
  try {
    // Check if the template exists
    const existingTemplate = await prisma.surveyTemplate.findUnique({
      where: { id }
    });

    if (!existingTemplate) {
      throw new NotFoundError(`Survey template with ID ${id} not found`);
    }

    // If name is being updated, check for conflicts
    if (data.name && data.name !== existingTemplate.name) {
      const nameConflict = await prisma.surveyTemplate.findFirst({
        where: {
          name: data.name,
          id: { not: id }
        }
      });

      if (nameConflict) {
        throw new ConflictError(`Survey template with name '${data.name}' already exists`);
      }
    }

    const updatedTemplate = await prisma.surveyTemplate.update({
      where: { id },
      data,
      include: {
        surveys: true
      }
    });

    return updatedTemplate;
  } catch (error: unknown) {
    if (error instanceof NotFoundError || error instanceof ConflictError) {
      throw error;
    }
    console.error('Error updating survey template in service:', error);
    throw new Error(`Failed to update survey template with ID ${id}`);
  }
};

/**
 * Deletes a survey template.
 * Throws NotFoundError if template is not found.
 */
export const deleteSurveyTemplateService = async (id: number): Promise<void> => {
  try {
    // Check if the template exists
    const existingTemplate = await prisma.surveyTemplate.findUnique({
      where: { id }
    });

    if (!existingTemplate) {
      throw new NotFoundError(`Survey template with ID ${id} not found`);
    }

    await prisma.surveyTemplate.delete({
      where: { id }
    });
  } catch (error: unknown) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    console.error('Error deleting survey template in service:', error);
    throw new Error(`Failed to delete survey template with ID ${id}`);
  }
};