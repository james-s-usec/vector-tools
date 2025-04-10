import { SurveyTemplate } from './types';
import { additionalBaseFields } from './additional-base-fields';

export const boilerSurvey: SurveyTemplate = {
  name: "Boiler Survey",
  description: "Survey template for Boilers",
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
    boilerType: {
      type: "select",
      label: "Boiler Type",
      options: [
        { value: "NATURAL DRAFT", label: "Natural Draft" },
        { value: "FORCED DRAFT", label: "Forced Draft" },
        { value: "ELECTRIC RESISTANCE", label: "Electric Resistance" },
        { value: "CONDENSING", label: "Condensing" }
      ],
      validation: { required: true }
    },
    fuelType: {
      type: "select",
      label: "Fuel Type",
      options: [
        { value: "NATURAL GAS", label: "Natural Gas" },
        { value: "FUEL OIL #2", label: "Fuel Oil #2" },
        { value: "FUEL OIL #6", label: "Fuel Oil #6" },
        { value: "PROPANE", label: "Propane" },
        { value: "ELECTRICITY", label: "Electricity" }
      ],
      validation: { required: true }
    },
    heatingMedium: {
      type: "select",
      label: "Heating Medium",
      options: [
        { value: "WATER", label: "Water" },
        { value: "STEAM", label: "Steam" },
        { value: "OTHER", label: "Other" }
      ],
      validation: { required: true }
    },
    burnerCondition: {
      type: "select",
      label: "Burner Condition",
      options: [
        { value: "POOR", label: "Poor" },
        { value: "FAIR", label: "Fair" },
        { value: "GOOD", label: "Good" },
        { value: "EXCELLENT", label: "Excellent" },
        { value: "NA", label: "N/A" }
      ],
      validation: { required: false }
    },
    heatExchangerCondition: {
      type: "select",
      label: "Heat Exchanger Condition",
      options: [
        { value: "POOR", label: "Poor" },
        { value: "FAIR", label: "Fair" },
        { value: "GOOD", label: "Good" },
        { value: "EXCELLENT", label: "Excellent" }
      ],
      validation: { required: true }
    },
    safetyControlsOperating: {
      type: "radio",
      label: "Safety Controls Operating",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" },
        { value: "UNTESTED", label: "Untested" }
      ],
      validation: { required: true }
    },
    designInformation: {
      type: "object",
      label: "Design Information",
      fields: {
        inputMBH: {
          type: "text",
          label: "Input MBH",
          validation: { required: false }
        },
        outputMBH: {
          type: "text",
          label: "Output MBH",
          validation: { required: false }
        },
        gpm: {
          type: "text",
          label: "GPM",
          validation: { required: false }
        },
        ewtLwt: {
          type: "text",
          label: "EWT/LWT",
          validation: { required: false }
        },
        gasPressure: {
          type: "text",
          label: "Gas Pressure",
          validation: { required: false }
        }
      }
    },
    combustionInformation: {
      type: "object",
      label: "Combustion Information",
      fields: {
        combustionType: {
          type: "select",
          label: "Combustion Type",
          options: [
            { value: "DIRECT VENT", label: "Direct Vent" },
            { value: "LOUVER", label: "Louver" }
          ],
          validation: { required: false }
        },
        louverControl: {
          type: "select",
          label: "Louver Control",
          options: [
            { value: "OPEN WHEN BOILER ON", label: "Open When Boiler On" },
            { value: "ALWAYS OPEN", label: "Always Open" },
            { value: "ALWAYS CLOSED", label: "Always Closed" }
          ],
          validation: { required: false }
        }
      }
    },
    burnerNameplateData: {
      type: "object",
      label: "Burner Nameplate Data",
      fields: {
        manufacturer: {
          type: "text",
          label: "Manufacturer",
          validation: { required: false }
        },
        model: {
          type: "text",
          label: "Model",
          validation: { required: false }
        },
        turndownRatio: {
          type: "text",
          label: "Turndown Ratio",
          validation: { required: false }
        }
      }
    }
  }
};