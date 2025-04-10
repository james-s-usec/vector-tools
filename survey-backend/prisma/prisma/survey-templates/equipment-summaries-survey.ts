import { SurveyTemplate } from './types';
import { additionalBaseFields } from './additional-base-fields';

export const equipmentSummariesSurvey: SurveyTemplate = {
  name: "Equipment Summaries Survey",
  description: "Survey template for Equipment Summaries",
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
    equipmentSummary: {
      type: "object",
      label: "Equipment Summary",
      fields: {
        coolingSystemType: {
          type: "select",
          label: "Type of cooling system",
          options: [
            { value: "DX", label: "DX" },
            { value: "CHILLED WATER", label: "Chilled water" }
          ],
          validation: { required: false }
        },
        chillerCondenserType: {
          type: "text",
          label: "Type of chiller condenser",
          validation: { required: false }
        },
        pumps: {
          type: "text",
          label: "Pumps",
          validation: { required: false }
        },
        hvacDistributionSystems: {
          type: "multiselect",
          label: "HVAC distribution systems",
          options: [
            { value: "VAV", label: "VAV" },
            { value: "CV", label: "CV" },
            { value: "MZU", label: "MZU" },
            { value: "ZONE TERMINALS", label: "Zone terminals" }
          ],
          validation: { required: false }
        },
        systemsAge: {
          type: "text",
          label: "Age of systems",
          validation: { required: false }
        },
        heatingSystemType: {
          type: "multiselect",
          label: "Heating system type",
          options: [
            { value: "BOILER", label: "Boiler" },
            { value: "GAS FIRED", label: "Gas fired" },
            { value: "HX", label: "HX" }
          ],
          validation: { required: false }
        },
        hvacControlSystemType: {
          type: "multiselect",
          label: "HVAC control system type",
          options: [
            { value: "PNEUMATIC", label: "Pneumatic" },
            { value: "DDC", label: "DDC" },
            { value: "FRONT END", label: "Front end" },
            { value: "PROGRAMMABLE T-STATS", label: "Programmable t-stats" }
          ],
          validation: { required: false }
        },
        miscellaneous: {
          type: "text",
          label: "Miscellaneous",
          validation: { required: false }
        }
      }
    }
  }
};