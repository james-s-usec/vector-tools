import { SurveyTemplate } from './types';
import { additionalBaseFields } from './additional-base-fields';

export const buildingInformationSurvey: SurveyTemplate = {
  name: "Building Information Survey",
  description: "Survey template for Building Information",
  baseFields: {
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
    generalNotes: {
      type: "textarea",
      label: "Notes",
      validation: { required: false }
    }
,
    
    // Additional fields for photos, notes, and markups
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
    
    // Include the markups field from additionalBaseFields
    markups: {
      type: "array",
      label: "Markups & Diagrams",
      itemTemplate: additionalBaseFields.markups.itemTemplate,
      validation: {
        required: false
      }
    }
  },
  specificFields: {
    buildingInformation: {
      type: "object",
      label: "Building Information",
      fields: {
        facilityTypeUse: {
          type: "text",
          label: "Facility Type/Use",
          validation: { required: false }
        },
        originalConstruction: {
          type: "text",
          label: "Original construction",
          validation: { required: false }
        },
        conditionedArea: {
          type: "text",
          label: "Conditioned area (SF)",
          validation: { required: false }
        },
        numberOfStories: {
          type: "text",
          label: "Number of stories",
          validation: { required: false }
        },
        overallCondition: {
          type: "text",
          label: "Overall condition",
          validation: { required: false }
        },
        wholeBuilding: {
          type: "text",
          label: "Whole Building",
          validation: { required: false }
        },
        specificSpaces: {
          type: "array",
          label: "Specific spaces",
          itemTemplate: {
            spaceName: {
              type: "text",
              label: "Space Name",
              validation: { required: false }
            }
          },
          validation: { required: false }
        },
        occupancy: {
          type: "text",
          label: "Occupancy",
          validation: { required: false }
        },
        renovationHistory: {
          type: "textarea",
          label: "Brief renovation history",
          validation: { required: false }
        },
        plannedImprovements: {
          type: "textarea",
          label: "Brief description of building improvements planned",
          validation: { required: false }
        },
        constructionTypes: {
          type: "object",
          label: "Construction Types",
          fields: {
            walls: {
              type: "text",
              label: "Walls",
              validation: { required: false }
            },
            windows: {
              type: "text",
              label: "Windows",
              validation: { required: false }
            }
          }
        },
        hoursOfOperation: {
          type: "text",
          label: "Hours of operation",
          validation: { required: false }
        }
      }
    }
  }
};