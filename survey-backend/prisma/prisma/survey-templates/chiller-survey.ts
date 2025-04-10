import { SurveyTemplate } from './types';
import { additionalBaseFields } from './additional-base-fields';

export const chillerSurvey: SurveyTemplate = {
  name: "Chiller Survey",
  description: "Survey template for Chillers",
  baseFields: {
    buildingNo: {
      type: "text",
      label: "Building Number",
      validation: { required: false }
    },
    tag: {
      type: "text",
      label: "Tag",
      validation: { required: true }
    },
    location: {
      type: "text",
      label: "Location",
      validation: { required: true }
    },
    serves: {
      type: "text",
      label: "Serves",
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
    manufacturer: {
      type: "text",
      label: "Manufacturer",
      validation: { required: false }
    },
    modelNo: {
      type: "text",
      label: "Model Number",
      validation: { required: false }
    },
    serialNo: {
      type: "text",
      label: "Serial Number",
      validation: { required: false }
    },
    year: {
      type: "text",
      label: "Year",
      validation: { required: false }
    },
    mechanicalDwgsAvailable: {
      type: "radio",
      label: "Mechanical Drawings Available",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" }
      ],
      validation: { required: false }
    },
    maintenanceLogAvailable: {
      type: "radio",
      label: "Maintenance Log Available",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" }
      ],
      validation: { required: false }
    },
    recommendEquipReplacement: {
      type: "radio",
      label: "Recommend Equipment Replacement",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" }
      ],
      validation: { required: false }
    },
    unitOperating: {
      type: "radio",
      label: "Unit Operating",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" }
      ],
      validation: { required: true }
    },
    generalSystemCondition: {
      type: "select",
      label: "General System Condition",
      options: [
        { value: "POOR", label: "Poor" },
        { value: "FAIR", label: "Fair" },
        { value: "GOOD", label: "Good" },
        { value: "EXCELLENT", label: "Excellent" }
      ],
      validation: { required: true }
    },
    controlDwgsAvailable: {
      type: "radio",
      label: "Control Drawings Available",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" }
      ],
      validation: { required: false }
    },
    controlSequencesAvailable: {
      type: "radio",
      label: "Control Sequences Available",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" }
      ],
      validation: { required: false }
    },
    controlSystemUsedForTesting: {
      type: "radio",
      label: "Control System Used For Testing",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" }
      ],
      validation: { required: false }
    },
    dataLoggerForInvPhase: {
      type: "radio",
      label: "Data Logger For Investigation Phase",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" }
      ],
      validation: { required: false }
    },
    controlType: {
      type: "select",
      label: "Control Type",
      options: [
        { value: "DDC", label: "DDC" },
        { value: "ELECTRONIC", label: "Electronic" },
        { value: "PNEUMATIC", label: "Pneumatic" }
      ],
      validation: { required: false }
    },
    onOffControlSchedule: {
      type: "text",
      label: "ON/OFF Control & Schedule",
      validation: { required: false }
    },
    status: {
      type: "text",
      label: "Status",
      validation: { required: false }
    },
    oatLockout: {
      type: "text",
      label: "OAT Lockout",
      validation: { required: false }
    },
    issuesLogSummary: {
      type: "textarea",
      label: "Issues Log Summary",
      validation: { required: false }
    },
    generalNotes: {
      type: "textarea",
      label: "General Notes",
      validation: { required: false }
    },
    equipmentPicture: {
      type: "file",
      label: "Equipment Photo",
      validation: { required: false }
    },

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
    
    // Include the markups field directly
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
    refrigerantType: {
      type: "select",
      label: "Refrigerant Type",
      options: [
        { value: "R-134a", label: "R-134a" },
        { value: "R-410A", label: "R-410A" },
        { value: "R-407C", label: "R-407C" },
        { value: "R-22", label: "R-22 (HCFC)" },
        { value: "R-123", label: "R-123" },
        { value: "OTHER", label: "Other" }
      ],
      validation: { required: true }
    },
    compressorType: {
      type: "select",
      label: "Compressor Type",
      options: [
        { value: "CENTRIFUGAL", label: "Centrifugal" },
        { value: "SCREW", label: "Screw" },
        { value: "SCROLL", label: "Scroll" },
        { value: "RECIPROCATING", label: "Reciprocating" },
        { value: "ABSORPTION", label: "Absorption" }
      ],
      validation: { required: true }
    },
    heatRejectionType: {
      type: "select",
      label: "Heat Rejection Type",
      options: [
        { value: "WATER-COOLED", label: "Water-Cooled" },
        { value: "AIR-COOLED", label: "Air-Cooled" },
        { value: "EVAPORATIVE", label: "Evaporative" }
      ],
      validation: { required: true }
    },
    compressorCondition: {
      type: "select",
      label: "Compressor Condition",
      options: [
        { value: "POOR", label: "Poor" },
        { value: "FAIR", label: "Fair" },
        { value: "GOOD", label: "Good" },
        { value: "EXCELLENT", label: "Excellent" }
      ],
      validation: { required: true }
    },
    condenserCondition: {
      type: "select",
      label: "Condenser Condition",
      options: [
        { value: "POOR", label: "Poor" },
        { value: "FAIR", label: "Fair" },
        { value: "GOOD", label: "Good" },
        { value: "EXCELLENT", label: "Excellent" }
      ],
      validation: { required: true }
    },
    evaporatorCondition: {
      type: "select",
      label: "Evaporator Condition",
      options: [
        { value: "POOR", label: "Poor" },
        { value: "FAIR", label: "Fair" },
        { value: "GOOD", label: "Good" },
        { value: "EXCELLENT", label: "Excellent" }
      ],
      validation: { required: true }
    },
    chillerType: {
      type: "select",
      label: "Chiller Type",
      options: [
        { value: "AIR COOLED", label: "Air Cooled" },
        { value: "WATER COOLED", label: "Water Cooled" }
      ],
      validation: { required: true }
    },
    variableSpeed: {
      type: "radio",
      label: "Variable Speed",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" }
      ],
      validation: { required: false }
    },
    designInformation: {
      type: "object",
      label: "Design Information",
      fields: {
        capacity: {
          type: "text",
          label: "Capacity (Tons)",
          validation: { required: false }
        },
        kw: {
          type: "text",
          label: "kW",
          validation: { required: false }
        },
        evaporatorDetails: {
          type: "textarea",
          label: "Evaporator Details",
          validation: { required: false }
        },
        condenserDetails: {
          type: "textarea",
          label: "Condenser Details",
          validation: { required: false }
        }
      }
    }
  }
};