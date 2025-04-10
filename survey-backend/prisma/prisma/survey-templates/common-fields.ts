import { SurveyTemplate } from './types';

/**
 * Common base fields that should be available in all survey templates
 * This ensures consistency across all templates and makes it easier to add
 * new common fields in the future.
 */
export const commonBaseFields = {
  // Existing common fields
  buildingNo: {
    type: "text",
    label: "Building Number",
    validation: { required: false }
  },
  preparedBy: {
    type: "text",
    label: "Prepared By",
    validation: { required: true }
  },
  date: {
    type: "date",
    label: "Date",
    validation: { required: true }
  },
  
  // New fields for pictures, notes, and markups
  surveyPhotos: {
    type: "array",
    label: "Survey Photos",
    itemTemplate: {
      photo: {
        type: "file",
        label: "Photo",
        validation: { required: true }
      },
      description: {
        type: "text",
        label: "Description",
        validation: { required: false }
      },
      location: {
        type: "text",
        label: "Location",
        validation: { required: false }
      }
    },
    validation: { required: false }
  },
  
  surveyNotes: {
    type: "array",
    label: "Survey Notes",
    itemTemplate: {
      note: {
        type: "textarea",
        label: "Note",
        validation: { required: true }
      },
      category: {
        type: "select",
        label: "Category",
        options: [
          { value: "GENERAL", label: "General" },
          { value: "ISSUE", label: "Issue" },
          { value: "RECOMMENDATION", label: "Recommendation" },
          { value: "OBSERVATION", label: "Observation" }
        ],
        validation: { required: false }
      },
      priority: {
        type: "select",
        label: "Priority",
        options: [
          { value: "LOW", label: "Low" },
          { value: "MEDIUM", label: "Medium" },
          { value: "HIGH", label: "High" }
        ],
        validation: { required: false }
      }
    },
    validation: { required: false }
  },
  
  markups: {
    type: "array",
    label: "Markups & Diagrams",
    itemTemplate: {
      markup: {
        type: "file",
        label: "Markup/Diagram",
        validation: { required: true }
      },
      title: {
        type: "text",
        label: "Title",
        validation: { required: true }
      },
      description: {
        type: "textarea",
        label: "Description",
        validation: { required: false }
      }
    },
    validation: { required: false }
  },
  
  generalNotes: {
    type: "textarea",
    label: "General Notes",
    validation: { required: false }
  }
};

/**
 * Helper function to create base fields for a template
 * This allows templates to extend the common base fields with template-specific fields
 */
export function createBaseFields(additionalFields = {}) {
  return { ...commonBaseFields, ...additionalFields };
}