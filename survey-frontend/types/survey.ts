export interface SurveyTemplate {
  id: number;
  name: string;
  description: string | null;
  baseFields: Record<string, any>;
  specificFields: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  surveys?: Survey[];
}

export interface Survey {
  id: number;
  equipmentId: number;
  templateId: number;
  surveyDate: string;
  preparedBy: string;
  surveyData: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  equipment?: {
    id: number;
    equipmentTag: string;
    category?: {
      id: number;
      name: string;
    };
    location?: {
      id: number;
      buildingName: string;
      floorLevel: string;
      roomName: string;
    };
  };
  template?: SurveyTemplate;
}

/**
 * Survey Field Interface
 * 
 * This interface defines the structure of survey fields used in templates.
 * It supports various field types including:
 * - text: Simple text input
 * - number: Numeric input
 * - date: Date picker
 * - select: Dropdown selection
 * - radio: Radio button selection
 * - textarea: Multi-line text input
 * - file: File upload
 * - object: Nested object with its own fields
 * - array: Collection of items with a defined template
 */
export interface SurveyField {
  type: 'text' | 'number' | 'date' | 'select' | 'radio' | 'textarea' | 'file' | 'object' | 'array';
  label: string;
  validation: {
    required: boolean;
  };
  options?: Array<{
    value: string;
    label: string;
  }>;
  fields?: Record<string, SurveyField>; // For object type fields with nested fields
  itemTemplate?: Record<string, SurveyField>; // For array type fields with item templates
}

export interface SurveyFormData {
  preparedBy: string;
  surveyDate: string;
  [key: string]: any;
}