import { SurveyTemplate } from './types';
import { additionalBaseFields } from './additional-base-fields';

export const lightingSurvey: SurveyTemplate = {
  name: "Lighting Survey",
  description: "Survey template for Lighting Systems",
  baseFields: {
    buildingNo: {
      type: "text",
      label: "Building Number",
      validation: { required: false }
    },
    location: {
      type: "text",
      label: "Location",
      validation: { required: true }
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
    lightingDwgsAvailable: {
      type: "radio",
      label: "Lighting Drawings Available",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" }
      ],
      validation: { required: false }
    },
    recommendReplacement: {
      type: "radio",
      label: "Recommend Replacement",
      options: [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" }
      ],
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
    fixtureType: {
      type: "select",
      label: "Fixture Type",
      options: [
        { value: "RECESSED", label: "Recessed" },
        { value: "SURFACE", label: "Surface" },
        { value: "HANGING", label: "Hanging" }
      ],
      validation: { required: true }
    },
    lampType: {
      type: "select",
      label: "Lamp Type",
      options: [
        { value: "INC", label: "Incandescent" },
        { value: "FL", label: "Fluorescent" },
        { value: "CFL", label: "Compact Fluorescent" },
        { value: "HID", label: "High Intensity Discharge" },
        { value: "HPS", label: "High Pressure Sodium" },
        { value: "MH", label: "Metal Halide" },
        { value: "MV", label: "Mercury Vapor" }
      ],
      validation: { required: true }
    },
    fixtureDescription: {
      type: "text",
      label: "Fixture Description",
      validation: { required: false }
    },
    lampsPerFixture: {
      type: "text",
      label: "Lamps per Fixture",
      validation: { required: false }
    },
    wattsPerLamp: {
      type: "text",
      label: "Watts per Lamp",
      validation: { required: false }
    },
    ballastType: {
      type: "select",
      label: "Ballast Type",
      options: [
        { value: "MAGNETIC", label: "Magnetic" },
        { value: "ELECTRONIC", label: "Electronic" }
      ],
      validation: { required: false }
    },
    estimatedWSF: {
      type: "text",
      label: "Estimated W/SF",
      validation: { required: false }
    },
    lightLevels: {
      type: "array",
      label: "Light Levels",
      itemTemplate: {
        spaceName: {
          type: "text",
          label: "Space Name",
          validation: { required: false }
        },
        lightLevel: {
          type: "text",
          label: "Light Level",
          validation: { required: false }
        }
      },
      validation: { required: false }
    },
    controlInformation: {
      type: "object",
      label: "Control Information",
      fields: {
        lightingControlDwgsAvailable: {
          type: "radio",
          label: "Lighting Control Drawings Available",
          options: [
            { value: "YES", label: "Yes" },
            { value: "NO", label: "No" }
          ],
          validation: { required: false }
        },
        onOffControl: {
          type: "select",
          label: "ON/OFF Control",
          options: [
            { value: "CONTROL SYSTEM", label: "Control System" },
            { value: "TIME CLOCK", label: "Time Clock" },
            { value: "MANUAL", label: "Manual" },
            { value: "OCCUPANCY SENSORS", label: "Occupancy Sensors" }
          ],
          validation: { required: false }
        },
        schedule: {
          type: "object",
          label: "Schedule",
          fields: {
            weekdays: {
              type: "text",
              label: "Weekdays",
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
            holidays: {
              type: "text",
              label: "Holidays",
              validation: { required: false }
            }
          }
        },
        additionalControl: {
          type: "multiselect",
          label: "Additional Control",
          options: [
            { value: "DIMMERS", label: "Dimmers" },
            { value: "PHOTOCELL", label: "Photocell" }
          ],
          validation: { required: false }
        }
      }
    }
  }
};