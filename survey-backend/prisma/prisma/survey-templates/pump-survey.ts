import { SurveyTemplate } from './types';
import { additionalBaseFields } from './additional-base-fields';

export const pumpSurvey: SurveyTemplate = {
  name: "Pump Survey",
  description: "Survey template for Pumps",
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
    pumpType: {
      type: "select",
      label: "Pump Type",
      options: [
        { value: "CENTRIFUGAL", label: "Centrifugal" },
        { value: "POSITIVE DISPLACEMENT", label: "Positive Displacement" },
        { value: "VERTICAL TURBINE", label: "Vertical Turbine" },
        { value: "SUBMERSIBLE", label: "Submersible" }
      ],
      validation: { required: true }
    },
    serviceType: {
      type: "select",
      label: "Service Type",
      options: [
        { value: "CHILLED WATER", label: "Chilled Water" },
        { value: "HEATING WATER", label: "Heating Water" },
        { value: "CONDENSER WATER", label: "Condenser Water" },
        { value: "DOMESTIC WATER", label: "Domestic Water" },
        { value: "SEWAGE", label: "Sewage" },
        { value: "OTHER", label: "Other" }
      ],
      validation: { required: true }
    },
    gpm: {
      type: "number",
      label: "GPM (Gallons Per Minute)",
      validation: { required: false }
    },
    head: {
      type: "number",
      label: "Head (Feet)",
      validation: { required: false }
    },
    controlType: {
      type: "select",
      label: "Control Type",
      options: [
        { value: "CONSTANT SPEED", label: "Constant Speed" },
        { value: "VFD", label: "Variable Frequency Drive" },
        { value: "DISCHARGE THROTTLING", label: "Discharge Throttling" }
      ],
      validation: { required: true }
    },
    motorCondition: {
      type: "select",
      label: "Motor Condition",
      options: [
        { value: "POOR", label: "Poor" },
        { value: "FAIR", label: "Fair" },
        { value: "GOOD", label: "Good" },
        { value: "EXCELLENT", label: "Excellent" }
      ],
      validation: { required: true }
    },
    impellerCondition: {
      type: "select",
      label: "Impeller Condition",
      options: [
        { value: "POOR", label: "Poor" },
        { value: "FAIR", label: "Fair" },
        { value: "GOOD", label: "Good" },
        { value: "EXCELLENT", label: "Excellent" },
        { value: "UNKNOWN", label: "Unknown" }
      ],
      validation: { required: false }
    },
    rpm: {
      type: "number",
      label: "RPM",
      validation: { required: false }
    },
    controlOn: {
      type: "select",
      label: "Control On",
      options: [
        { value: "OAT", label: "OAT" },
        { value: "FIXED DIFFERENTIAL PRESSURE", label: "Fixed Differential Pressure" },
        { value: "RESET", label: "Reset" },
        { value: "OTHER", label: "Other" }
      ],
      validation: { required: false }
    },
    dpSetpointReset: {
      type: "object",
      label: "dP Setpoint/Reset",
      fields: {
        setpoint: {
          type: "text",
          label: "Setpoint",
          validation: { required: false }
        },
        reset: {
          type: "text",
          label: "Reset",
          validation: { required: false }
        }
      }
    }
  }
};