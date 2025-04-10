import { SurveyTemplate } from './types';
import { additionalBaseFields } from './additional-base-fields';

export const rtuSurvey: SurveyTemplate = {
  name: "RTU Survey",
  description: "Survey template for Rooftop Units",
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
    supplyFanData: {
      type: "object",
      label: "Supply Fan Data",
      fields: {
        fanManufacturer: {
          type: "text",
          label: "Fan Manufacturer",
          validation: { required: false }
        },
        fanModelNumber: {
          type: "text",
          label: "Fan Model Number",
          validation: { required: false }
        },
        fanCFM: {
          type: "text",
          label: "Fan CFM",
          validation: { required: false }
        },
        motorManufacturer: {
          type: "text",
          label: "Motor Manufacturer",
          validation: { required: false }
        },
        hp: {
          type: "text",
          label: "HP",
          validation: { required: false }
        },
        power: {
          type: "text",
          label: "Power (V/PH/HZ)",
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
        vfdManufacturer: {
          type: "text",
          label: "VFD Manufacturer",
          validation: { required: false }
        },
        vfdModelNumber: {
          type: "text",
          label: "VFD Model Number",
          validation: { required: false }
        },
        vfdSerialNumber: {
          type: "text",
          label: "VFD Serial Number",
          validation: { required: false }
        }
      }
    },
    compressorData: {
      type: "object",
      label: "Compressor Data",
      fields: {
        quantity: {
          type: "text",
          label: "Quantity",
          validation: { required: false }
        },
        rla: {
          type: "text",
          label: "RLA (each)",
          validation: { required: false }
        },
        power: {
          type: "text",
          label: "Power (V/PH/HZ)",
          validation: { required: false }
        },
        hpKw: {
          type: "text",
          label: "HP/KW",
          validation: { required: false }
        }
      }
    },
    condenserFanData: {
      type: "object",
      label: "Condenser Fan Data",
      fields: {
        quantity: {
          type: "text",
          label: "Quantity",
          validation: { required: false }
        },
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
        power: {
          type: "text",
          label: "Power (V/PH/HZ)",
          validation: { required: false }
        },
        fullLoadAmps: {
          type: "text",
          label: "Full Load Amps",
          validation: { required: false }
        },
        serviceFactor: {
          type: "text",
          label: "Service Factor",
          validation: { required: false }
        },
        fanControl: {
          type: "text",
          label: "Fan Control",
          validation: { required: false }
        }
      }
    },
    coolingCoilData: {
      type: "object",
      label: "Cooling Coil Data",
      fields: {
        type: {
          type: "select",
          label: "Type",
          options: [
            { value: "DX", label: "DX" },
            { value: "OTHER", label: "Other" }
          ],
          validation: { required: false }
        },
        inputOutput: {
          type: "text",
          label: "Input/Output",
          validation: { required: false }
        }
      }
    },
    heatingCoilData: {
      type: "object",
      label: "Heating Coil Data",
      fields: {
        type: {
          type: "select",
          label: "Type",
          options: [
            { value: "ELECTRIC", label: "Electric" },
            { value: "FUEL", label: "Fuel" }
          ],
          validation: { required: false }
        },
        inputOutput: {
          type: "text",
          label: "Input/Output",
          validation: { required: false }
        }
      }
    },
    controlInformation: {
      type: "object",
      label: "Control Information",
      fields: {
        rtuOnBas: {
          type: "radio",
          label: "RTU on BAS",
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
        controlPoints: {
          type: "multiselect",
          label: "Control Points",
          options: [
            { value: "SAT", label: "SAT - Supply Air Temperature" },
            { value: "MAT", label: "MAT - Mixed Air Temperature" },
            { value: "RAT", label: "RAT - Return Air Temperature" },
            { value: "CCV", label: "CCV - Cooling Coil Valve" },
            { value: "HCV", label: "HCV - Heating Coil Valve" },
            { value: "SF", label: "SF - Supply Fan" },
            { value: "RF", label: "RF - Return Fan" },
            { value: "OAT", label: "OAT - Outside Air Temperature" }
          ],
          validation: { required: false }
        },
        onOffControl: {
          type: "select",
          label: "ON/OFF Control",
          options: [
            { value: "CONTROL SYSTEM", label: "Control System" },
            { value: "TIME CLOCK", label: "Time Clock" },
            { value: "MANUAL", label: "Manual" }
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
        }
      }
    },
    fanControl: {
      type: "object",
      label: "Fan Control",
      fields: {
        type: {
          type: "select",
          label: "Type",
          options: [
            { value: "CV", label: "CV" },
            { value: "VFD", label: "VFD" },
            { value: "VIV", label: "VIV" }
          ],
          validation: { required: false }
        },
        controlOn: {
          type: "select",
          label: "Control On",
          options: [
            { value: "FIXED STATIC", label: "Fixed Static" },
            { value: "RESET STATIC", label: "Reset Static" },
            { value: "OAT RESET", label: "OAT Reset" }
          ],
          validation: { required: false }
        },
        staticSetpointReset: {
          type: "text",
          label: "Static Setpoint/Reset",
          validation: { required: false }
        }
      }
    },
    outsideAirControl: {
      type: "object",
      label: "Outside Air Control",
      fields: {
        control: {
          type: "select",
          label: "Control",
          options: [
            { value: "FIXED", label: "Fixed" },
            { value: "ECONO", label: "Economizer" },
            { value: "DEMAND CONTROLLED VENT", label: "Demand Controlled Ventilation" }
          ],
          validation: { required: false }
        },
        econoType: {
          type: "select",
          label: "Economizer Type",
          options: [
            { value: "TEMP", label: "Temperature" },
            { value: "ENTHALPY", label: "Enthalpy" }
          ],
          validation: { required: false }
        },
        controlOn: {
          type: "select",
          label: "Control On",
          options: [
            { value: "MAT", label: "MAT" },
            { value: "OAT<RAT", label: "OAT<RAT" }
          ],
          validation: { required: false }
        },
        minOaPercent: {
          type: "text",
          label: "Min. OA %",
          validation: { required: false }
        },
        maxOaPercent: {
          type: "text",
          label: "Max OA %",
          validation: { required: false }
        },
        highOatLockout: {
          type: "text",
          label: "High OAT Lockout",
          validation: { required: false }
        },
        lowOatLockout: {
          type: "text",
          label: "Low OAT Lockout",
          validation: { required: false }
        }
      }
    },
    supplyMixedAirTemperatureControl: {
      type: "object",
      label: "Supply/Mixed Air Temperature Control",
      fields: {
        satControl: {
          type: "select",
          label: "SAT Control",
          options: [
            { value: "FIXED", label: "Fixed" },
            { value: "RESET", label: "Reset" }
          ],
          validation: { required: false }
        },
        resetControl: {
          type: "select",
          label: "Reset Control",
          options: [
            { value: "ZONE INFO", label: "Zone Info" },
            { value: "OAT", label: "OAT" }
          ],
          validation: { required: false }
        },
        satSetpointReset: {
          type: "text",
          label: "SAT Setpoint/Reset",
          validation: { required: false }
        },
        matControl: {
          type: "select",
          label: "MAT Control",
          options: [
            { value: "FIXED", label: "Fixed" },
            { value: "TRACK SAT", label: "Track SAT" }
          ],
          validation: { required: false }
        },
        matSetpointReset: {
          type: "text",
          label: "MAT Setpoint/Reset",
          validation: { required: false }
        }
      }
    },
    mzuControl: {
      type: "object",
      label: "MZU Control",
      fields: {
        noZones: {
          type: "text",
          label: "No. Zones",
          validation: { required: false }
        },
        zoneSatSetpoints: {
          type: "text",
          label: "Zone SAT Setpoints",
          validation: { required: false }
        },
        hotDeckControl: {
          type: "select",
          label: "Hot Deck Control",
          options: [
            { value: "FIXED", label: "Fixed" },
            { value: "RESET", label: "Reset" }
          ],
          validation: { required: false }
        },
        hdSetpointReset: {
          type: "text",
          label: "HD Setpoint/Reset",
          validation: { required: false }
        },
        coldDeckControl: {
          type: "select",
          label: "Cold Deck Control",
          options: [
            { value: "FIXED", label: "Fixed" },
            { value: "RESET", label: "Reset" }
          ],
          validation: { required: false }
        },
        cdSetpointReset: {
          type: "text",
          label: "CD Setpoint/Reset",
          validation: { required: false }
        }
      }
    }
  }
};