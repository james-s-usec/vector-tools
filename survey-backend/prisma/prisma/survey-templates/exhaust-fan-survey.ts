import { SurveyTemplate } from './types';
import { additionalBaseFields } from './additional-base-fields';

export const exhaustFanSurvey: SurveyTemplate = {
  name: "Exhaust Fan Survey",
  description: "Survey template for Exhaust Fans",
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
    unitOperating: {
      type: "radio",
      label: "Unit Operating During Survey",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" }
      ],
      validation: { required: true }
    },
    backUp: {
      type: "radio",
      label: "Back Up",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" }
      ],
      validation: { required: false }
    },
    generalSystemCondition: {
      type: "select",
      label: "Condition",
      options: [
        { value: "POOR", label: "Poor" },
        { value: "FAIR", label: "Fair" },
        { value: "GOOD", label: "Good" },
        { value: "EXCELLENT", label: "Excellent" }
      ],
      validation: { required: true }
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
    buildingPressure: {
      type: "select",
      label: "Overall Building Pressure",
      options: [
        { value: "POSITIVE", label: "Positive" },
        { value: "NEGATIVE", label: "Negative" }
      ],
      validation: { required: false }
    },
    fanNameplateData: {
      type: "object",
      label: "Fan Nameplate Data",
      fields: {
        manufacturer: {
          type: "text",
          label: "Manufacturer",
          validation: { required: false }
        },
        modelNumber: {
          type: "text",
          label: "Model Number",
          validation: { required: false }
        },
        serialNumber: {
          type: "text",
          label: "Serial Number",
          validation: { required: false }
        },
        fanSize: {
          type: "text",
          label: "Fan Size",
          validation: { required: false }
        }
      }
    },
    motorNameplateData: {
      type: "object",
      label: "Motor Nameplate Data",
      fields: {
        manufacturer: {
          type: "text",
          label: "Manufacturer",
          validation: { required: false }
        },
        fullLoadHP: {
          type: "text",
          label: "Full Load HP",
          validation: { required: false }
        },
        phase: {
          type: "select",
          label: "Phase",
          options: [
            { value: "1", label: "1" },
            { value: "3", label: "3" }
          ],
          validation: { required: false }
        },
        volts: {
          type: "text",
          label: "Volts",
          validation: { required: false }
        },
        fullLoadAmps: {
          type: "text",
          label: "Full Load Amps",
          validation: { required: false }
        },
        fullLoadRPM: {
          type: "text",
          label: "Full Load RPM",
          validation: { required: false }
        },
        efficiency: {
          type: "text",
          label: "Efficiency",
          validation: { required: false }
        },
        powerFactor: {
          type: "text",
          label: "Power Factor",
          validation: { required: false }
        },
        frameSize: {
          type: "text",
          label: "Frame Size (Feet)",
          validation: { required: false }
        },
        serviceFactor: {
          type: "text",
          label: "Service Factor",
          validation: { required: false }
        }
      }
    },
    schedule: {
      type: "object",
      label: "Schedule Reference # or Weekly Schedule",
      fields: {
        weekday: {
          type: "text",
          label: "Weekday",
          validation: { required: false }
        },
        saturday: {
          type: "text",
          label: "Saturday",
          validation: { required: false }
        },
        sunday: {
          type: "text",
          label: "Sunday",
          validation: { required: false }
        },
        holiday: {
          type: "text",
          label: "Holiday",
          validation: { required: false }
        }
      }
    },
    measuredData: {
      type: "object",
      label: "Measured Data",
      fields: {
        volts: {
          type: "text",
          label: "Volts",
          validation: { required: false }
        },
        amps: {
          type: "text",
          label: "Amps",
          validation: { required: false }
        },
        kW: {
          type: "text",
          label: "kW",
          validation: { required: false }
        },
        powerFactor: {
          type: "text",
          label: "Power Factor",
          validation: { required: false }
        },
        totalSP: {
          type: "text",
          label: "Total S.P.",
          validation: { required: false }
        },
        cfm: {
          type: "text",
          label: "CFM",
          validation: { required: false }
        },
        fanRPM: {
          type: "text",
          label: "Fan RPM",
          validation: { required: false }
        }
      }
    }
  }
};