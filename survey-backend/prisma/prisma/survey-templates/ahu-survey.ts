import { SurveyTemplate } from './types';
import { additionalBaseFields } from './additional-base-fields';

export const ahuSurvey: SurveyTemplate = {
  name: "AHU Survey",
  description: "Survey template for Air Handling Units",
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
    systemType: {
      type: "select",
      label: "System Type",
      options: [
        { value: "SZVT", label: "Single Zone Variable Temperature" },
        { value: "CVRT", label: "Constant Volume Reheat Terminal" },
        { value: "MZ", label: "Multi-Zone" },
        { value: "VAV", label: "Variable Air Volume" },
        { value: "OTHER", label: "Other" }
      ],
      validation: { required: true }
    },
    fanArrangement: {
      type: "select",
      label: "Fan Arrangement",
      options: [
        { value: "BLOW-THRU", label: "Blow-Through" },
        { value: "DRAW-THRU", label: "Draw-Through" }
      ],
      validation: { required: true }
    },
    returnAirPath: {
      type: "select",
      label: "Return Air Path",
      options: [
        { value: "DUCTED", label: "Ducted" },
        { value: "PLENUM", label: "Plenum" }
      ],
      validation: { required: true }
    },
    filterCondition: {
      type: "select",
      label: "Filter Condition",
      options: [
        { value: "CLEAN", label: "Clean" },
        { value: "FAIR", label: "Fair" },
        { value: "DIRTY", label: "Dirty" },
        { value: "MISSING", label: "Missing" }
      ],
      validation: { required: true }
    },
    supplyFanOperating: {
      type: "radio",
      label: "Supply Fan Operating",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" }
      ],
      validation: { required: true }
    },
    returnFanOperating: {
      type: "radio",
      label: "Return Fan Operating",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" },
        { value: "NA", label: "N/A" }
      ],
      validation: { required: true }
    },
    coolingCoilCondition: {
      type: "select",
      label: "Cooling Coil Condition",
      options: [
        { value: "POOR", label: "Poor" },
        { value: "FAIR", label: "Fair" },
        { value: "GOOD", label: "Good" },
        { value: "EXCELLENT", label: "Excellent" },
        { value: "NA", label: "N/A" }
      ],
      validation: { required: false }
    },
    heatingCoilCondition: {
      type: "select",
      label: "Heating Coil Condition",
      options: [
        { value: "POOR", label: "Poor" },
        { value: "FAIR", label: "Fair" },
        { value: "GOOD", label: "Good" },
        { value: "EXCELLENT", label: "Excellent" },
        { value: "NA", label: "N/A" }
      ],
      validation: { required: false }
    },
    heatingCoilData: {
      type: "object",
      label: "Heating Coil Data",
      fields: {
        coilType: {
          type: "select",
          label: "Coil Type",
          options: [
            { value: "HW", label: "Hot Water" },
            { value: "STEAM", label: "Steam" },
            { value: "ELECTRIC", label: "Electric" },
            { value: "FUEL", label: "Fuel" },
            { value: "NONE", label: "None" }
          ],
          validation: { required: false }
        },
        valveType: {
          type: "select",
          label: "Valve Type",
          options: [
            { value: "2-WAY", label: "2-Way" },
            { value: "3-WAY", label: "3-Way" },
            { value: "NONE", label: "None" }
          ],
          validation: { required: false }
        },
        inputOutput: {
          type: "text",
          label: "Input/Output",
          validation: { required: false }
        },
        pipingInsulated: {
          type: "radio",
          label: "Piping Insulated",
          options: [
            { value: "YES", label: "Yes" },
            { value: "NO", label: "No" }
          ],
          validation: { required: false }
        }
      }
    },
    coolingCoilData: {
      type: "object",
      label: "Cooling Coil Data",
      fields: {
        coilType: {
          type: "select",
          label: "Coil Type",
          options: [
            { value: "CHW", label: "Chilled Water" },
            { value: "DX", label: "Direct Expansion" },
            { value: "OTHER", label: "Other" },
            { value: "NONE", label: "None" }
          ],
          validation: { required: false }
        },
        valveType: {
          type: "select",
          label: "Valve Type",
          options: [
            { value: "2-WAY", label: "2-Way" },
            { value: "3-WAY", label: "3-Way" },
            { value: "NONE", label: "None" }
          ],
          validation: { required: false }
        },
        inputOutput: {
          type: "text",
          label: "Input/Output",
          validation: { required: false }
        },
        pipingInsulated: {
          type: "radio",
          label: "Piping Insulated",
          options: [
            { value: "YES", label: "Yes" },
            { value: "NO", label: "No" }
          ],
          validation: { required: false }
        }
      }
    },
    supplyFanData: {
      type: "object",
      label: "Supply Fan Data",
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
        cfm: {
          type: "text",
          label: "CFM",
          validation: { required: false }
        },
        motorHP: {
          type: "text",
          label: "Motor HP",
          validation: { required: false }
        }
      }
    },
    outsideAirControl: {
      type: "object",
      label: "Outside Air Control",
      fields: {
        controlType: {
          type: "select",
          label: "Control Type",
          options: [
            { value: "FIXED", label: "Fixed" },
            { value: "ECONO", label: "Economizer" },
            { value: "DEMAND CONTROLLED VENT", label: "Demand Controlled Ventilation" }
          ],
          validation: { required: false }
        },
        economizer: {
          type: "select",
          label: "Economizer Type",
          options: [
            { value: "TEMP", label: "Temperature" },
            { value: "ENTHALPY", label: "Enthalpy" },
            { value: "NONE", label: "None" }
          ],
          validation: { required: false }
        },
        oaPercentage: {
          type: "text",
          label: "OA Percentage",
          validation: { required: false }
        }
      }
    }
  }
};