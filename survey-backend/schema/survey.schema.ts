import { z } from 'zod';

// Base schema for common fields across all survey types
export const BaseSurveyFieldsSchema = z.object({
  buildingNo: z.string().optional(),
  preparedBy: z.string(),
  date: z.string().transform(val => new Date(val)),
  tag: z.string(),
  location: z.string(),
  serves: z.string().optional(),
  equipmentPicture: z.string().optional(),
  
  // Equipment Identification
  manufacturer: z.string().optional(),
  modelNo: z.string().optional(),
  serialNo: z.string().optional(),
  year: z.string().optional(),
  
  // Status Fields
  mechanicalDwgsAvailable: z.enum(['YES', 'NO']).optional(),
  maintenanceLogAvailable: z.enum(['YES', 'NO']).optional(),
  recommendEquipReplacement: z.enum(['YES', 'NO']).optional(),
  unitOperating: z.enum(['YES', 'NO']),
  generalSystemCondition: z.enum(['POOR', 'FAIR', 'GOOD', 'EXCELLENT']),
  
  // Control Fields
  controlDwgsAvailable: z.enum(['YES', 'NO']).optional(),
  controlSequencesAvailable: z.enum(['YES', 'NO']).optional(),
  controlSystemUsedForTesting: z.enum(['YES', 'NO']).optional(),
  dataLoggerForInvPhase: z.enum(['YES', 'NO']).optional(),
  controlType: z.enum(['DDC', 'ELECTRONIC', 'PNEUMATIC']).optional(),
  
  // Operational Fields
  onOffControlSchedule: z.string().optional(),
  status: z.string().optional(),
  oatLockout: z.string().optional(),
  
  // Documentation Fields
  issuesLogSummary: z.string().optional(),
  generalNotes: z.string().optional()
});

// Schema for survey template
export const SurveyTemplateSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string().optional(),
  baseFields: z.record(z.any()),  // JSON schema for base fields
  specificFields: z.record(z.any()), // JSON schema for equipment-specific fields
});

// Schema for creating a survey template
export const CreateSurveyTemplateSchema = SurveyTemplateSchema.omit({ id: true });

// Schema for updating a survey template
export const UpdateSurveyTemplateSchema = SurveyTemplateSchema.partial();

// Schema for survey record
export const SurveySchema = z.object({
  id: z.number().optional(),
  equipmentId: z.number(), // Required in both URL and request body
  templateId: z.number(),
  surveyDate: z.union([
    z.string().transform(val => new Date(val)), // Handle string dates
    z.date()
  ]).default(() => new Date()),
  preparedBy: z.string(),
  // surveyData contains all survey-specific fields as per the template
  surveyData: z.record(z.any()) // Flexible JSON data
});

// Schema for creating a survey
export const CreateSurveySchema = SurveySchema.omit({ id: true });

// Schema for updating a survey
export const UpdateSurveySchema = SurveySchema.partial();

// Types
export type SurveyTemplateType = z.infer<typeof SurveyTemplateSchema>;
export type CreateSurveyTemplateType = z.infer<typeof CreateSurveyTemplateSchema>;
export type UpdateSurveyTemplateType = z.infer<typeof UpdateSurveyTemplateSchema>;
export type SurveyType = z.infer<typeof SurveySchema>;
export type CreateSurveyType = z.infer<typeof CreateSurveySchema>;
export type UpdateSurveyType = z.infer<typeof UpdateSurveySchema>;