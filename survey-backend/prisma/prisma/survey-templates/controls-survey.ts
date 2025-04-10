import { SurveyTemplate } from './types';
import { additionalBaseFields } from './additional-base-fields';

export const controlsSurvey: SurveyTemplate = {
  name: "Controls Survey",
  description: "Survey template for Building Control Systems",
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
    recommendEquipReplacement: {
      type: "radio",
      label: "Recommend Equipment Replacement",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" }
      ],
      validation: { required: false }
    },
    systemOperational: {
      type: "radio",
      label: "System Operational",
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
    serviceContract: {
      type: "radio",
      label: "Service Contract",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" }
      ],
      validation: { required: false }
    },
    serviceContractorName: {
      type: "text",
      label: "Service Contractor Name",
      validation: { required: false }
    },
    serviceContractorPhone: {
      type: "text",
      label: "Service Contractor Phone",
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
    nameplateData: {
      type: "object",
      label: "Nameplate Data",
      fields: {
        emcs1Manufacturer: {
          type: "text",
          label: "EMCS-1 Manufacturer",
          validation: { required: false }
        },
        emcs1ModelNumber: {
          type: "text",
          label: "EMCS-1 Model Number",
          validation: { required: false }
        },
        emcs1SerialNumber: {
          type: "text",
          label: "EMCS-1 Serial Number",
          validation: { required: false }
        },
        emcs1SoftwareVersion: {
          type: "text",
          label: "EMCS-1 Software Version",
          validation: { required: false }
        },
        emcs2Manufacturer: {
          type: "text",
          label: "EMCS-2 Manufacturer",
          validation: { required: false }
        },
        emcs2ModelNumber: {
          type: "text",
          label: "EMCS-2 Model Number",
          validation: { required: false }
        },
        emcs2SerialNumber: {
          type: "text",
          label: "EMCS-2 Serial Number",
          validation: { required: false }
        },
        emcs2SoftwareVersion: {
          type: "text",
          label: "EMCS-2 Software Version",
          validation: { required: false }
        }
      }
    },
    investigationPhaseTesting: {
      type: "object",
      label: "Investigation Phase Testing",
      fields: {
        pcFrontendAvailable: {
          type: "radio",
          label: "PC/Front-end Available",
          options: [
            { value: "YES", label: "Yes" },
            { value: "NO", label: "No" }
          ],
          validation: { required: false }
        },
        computerSoftwareNeeded: {
          type: "radio",
          label: "Computer Software Needed",
          options: [
            { value: "YES", label: "Yes" },
            { value: "NO", label: "No" }
          ],
          validation: { required: false }
        }
      }
    },
    generalControlSystem: {
      type: "object",
      label: "General Control System",
      fields: {
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
        capabilities: {
          type: "multiselect",
          label: "Capabilities",
          options: [
            { value: "SCHEDULING", label: "Scheduling" },
            { value: "START_STOP", label: "Start/Stop" },
            { value: "FAN_PUMP_SPEED_CONTROL", label: "Fan/Pump Speed Control" },
            { value: "TEMPERATURE_CONTROL", label: "Temperature Control" },
            { value: "RESET_STRATEGIES", label: "Reset Strategies" },
            { value: "DATA_TRENDING", label: "Data Trending" }
          ],
          validation: { required: false }
        },
        systemsControlled: {
          type: "multiselect",
          label: "Systems Controlled",
          options: [
            { value: "AIR_HANDLING_UNITS", label: "Air Handling Units" },
            { value: "CHILLERS", label: "Chillers" },
            { value: "BOILERS", label: "Boilers" },
            { value: "PUMPS", label: "Pumps" },
            { value: "DOMESTIC_HOT_WATER", label: "Domestic Hot Water" },
            { value: "ZONE_TERMINAL_UNITS", label: "Zone Terminal Units" },
            { value: "ZONE_TEMPERATURES", label: "Zone Temperatures" },
            { value: "OUTSIDE_AIR_TEMPERATURES", label: "Outside Air Temperatures" },
            { value: "LIGHTING", label: "Lighting" }
          ],
          validation: { required: false }
        }
      }
    }
  }
};