import { SurveyTemplate } from './types';
import { additionalBaseFields } from './additional-base-fields';


export const zoneTerminalSurvey: SurveyTemplate = {
  name: "Zone Terminal Survey",
  description: "Survey template for Zone Terminal Equipment",
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
    dataLoggerForInvPhase: {
      type: "radio",
      label: "Data Logger For Investigation Phase",
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
      label: "General Unit Condition",
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
    systemType: {
      type: "select",
      label: "Type",
      options: [
        { value: "VAV BOX", label: "VAV Box" },
        { value: "FCU 2-PIPE", label: "Fan Coil Unit (2-Pipe)" },
        { value: "FCU 4-PIPE", label: "Fan Coil Unit (4-Pipe)" },
        { value: "CV REHEAT COIL", label: "CV Reheat Coil" },
        { value: "BASEBOARD", label: "Baseboard" }
      ],
      validation: { required: true }
    },
    heating: {
      type: "select",
      label: "Heating",
      options: [
        { value: "HW", label: "HW" },
        { value: "ELECTRIC", label: "Electric" },
        { value: "NONE", label: "None" }
      ],
      validation: { required: true }
    },
    cooling: {
      type: "select",
      label: "Cooling",
      options: [
        { value: "CHW", label: "CHW" },
        { value: "DX", label: "DX" },
        { value: "NONE", label: "None" }
      ],
      validation: { required: true }
    },
    nameplateData: {
      type: "object",
      label: "Zone Equipment Nameplate Data",
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
        heatingCapacity: {
          type: "text",
          label: "Heating Capacity",
          validation: { required: false }
        },
        coolingCapacity: {
          type: "text",
          label: "Cooling Capacity",
          validation: { required: false }
        },
        fanSizeHP: {
          type: "text",
          label: "Fan Size (HP)",
          validation: { required: false }
        }
      }
    },
    controlInformation: {
      type: "object",
      label: "Control Information",
      fields: {
        controlDwgsAvailable: {
          type: "radio",
          label: "Control Drawings Available",
          options: [
            { value: "YES", label: "Yes" },
            { value: "NO", label: "No" }
          ],
          validation: { required: false }
        },
        recommendTstatReplacement: {
          type: "radio",
          label: "Recommend T-stat Replacement",
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
        dataLoggerForInvPhase: {
          type: "radio",
          label: "Data Logger For Investigation Phase (Sensor)",
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
        }
      }
    },
    generalZoneControl: {
      type: "object",
      label: "General Zone Control",
      fields: {
        zoneOnBas: {
          type: "radio",
          label: "Zone on BAS",
          options: [
            { value: "YES", label: "Yes" },
            { value: "NO", label: "No" }
          ],
          validation: { required: false }
        },
        thermostatType: {
          type: "select",
          label: "Thermostat Type",
          options: [
            { value: "DDC", label: "DDC" },
            { value: "ELECTRONIC", label: "Electronic" },
            { value: "PNEUMATIC", label: "Pneumatic" }
          ],
          validation: { required: false }
        },
        thermostatLocation: {
          type: "text",
          label: "Thermostat Location",
          validation: { required: false }
        },
        controlPoints: {
          type: "multiselect",
          label: "Control Points",
          options: [
            { value: "SETPOINT_HEATING", label: "Setpoint (Heating)" },
            { value: "SETPOINT_COOLING", label: "Setpoint (Cooling)" },
            { value: "ZONE_TEMP", label: "Zone Temp" },
            { value: "VAV_BOX_DAMPER", label: "VAV Box Damper" },
            { value: "VAV_BOX_AIRFLOW", label: "VAV Box Airflow" },
            { value: "REHEAT_COIL_VALVE", label: "Reheat Coil Valve" },
            { value: "FCU_CHW_VALVE", label: "FCU CHW Valve" },
            { value: "FCU_HW_VALVE", label: "FCU HW Valve" },
            { value: "FCU_FAN_STATUS", label: "FCU Fan Status" }
          ],
          validation: { required: false }
        },
        comfortIssues: {
          type: "multiselect",
          label: "Comfort Issues",
          options: [
            { value: "TOO_HOT", label: "Too Hot" },
            { value: "TOO_COLD", label: "Too Cold" },
            { value: "TOO_MUCH_AIRFLOW", label: "Too Much Airflow" },
            { value: "NO_COMPLAINTS", label: "No Complaints" }
          ],
          validation: { required: false }
        }
      }
    },
    onOffControlSchedule: {
      type: "object",
      label: "ON/OFF Control & Schedule",
      fields: {
        onOff: {
          type: "select",
          label: "ON/OFF",
          options: [
            { value: "CONTROL SYSTEM", label: "Control System" },
            { value: "TIME CLOCK", label: "Time Clock" },
            { value: "MANUAL", label: "Manual" }
          ],
          validation: { required: false }
        },
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
    zoneTemperatureControl: {
      type: "object",
      label: "Zone Temperature Control",
      fields: {
        asFoundSetpoint: {
          type: "text",
          label: "As-Found Setpoint",
          validation: { required: false }
        },
        nightSetback: {
          type: "radio",
          label: "Night Setback",
          options: [
            { value: "YES", label: "Yes" },
            { value: "NO", label: "No" }
          ],
          validation: { required: false }
        },
        occupiedCoolingSetpoint: {
          type: "text",
          label: "Occupied Cooling Setpoint",
          validation: { required: false }
        },
        occupiedHeatingSetpoint: {
          type: "text",
          label: "Occupied Heating Setpoint",
          validation: { required: false }
        },
        unoccupiedCoolingSetpoint: {
          type: "text",
          label: "Unoccupied Cooling Setpoint",
          validation: { required: false }
        },
        unoccupiedHeatingSetpoint: {
          type: "text",
          label: "Unoccupied Heating Setpoint",
          validation: { required: false }
        }
      }
    }
  }
};