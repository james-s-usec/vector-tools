// Define types for field configuration
export type FieldValidation = { required: boolean };
export type FieldOption = { value: string; label: string };

// Define the survey template type
export type SurveyTemplate = {
  name: string;
  description: string;
  baseFields: Record<string, any>;
  specificFields: Record<string, any>;
};

// Also export a value for Node.js to import
export const SurveyTemplate = {};