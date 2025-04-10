// Survey template definitions for different equipment types

// Define types for field configuration
type FieldValidation = { required: boolean };
type FieldOption = { value: string; label: string };

export const surveyTemplates = [
  {
    name: "AHU Survey",
    description: "Survey template for Air Handling Units",
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
    },
    specificFields: {
      buildingInformation: {
        type: "object",
        label: "Building Information",
        fields: {
          facilityTypeUse: {
            type: "text",
            label: "Facility Type/Use",
            validation: { required: false }
          },
          originalConstruction: {
            type: "text",
            label: "Original construction",
            validation: { required: false }
          },
          conditionedArea: {
            type: "text",
            label: "Conditioned area (SF)",
            validation: { required: false }
          },
          numberOfStories: {
            type: "text",
            label: "Number of stories",
            validation: { required: false }
          },
          overallCondition: {
            type: "text",
            label: "Overall condition",
            validation: { required: false }
          },
          wholeBuilding: {
            type: "text",
            label: "Whole Building",
            validation: { required: false }
          },
          specificSpaces: {
            type: "array",
            label: "Specific spaces",
            itemTemplate: {
              spaceName: {
                type: "text",
                label: "Space Name",
                validation: { required: false }
              }
            },
            validation: { required: false }
          },
          occupancy: {
            type: "text",
            label: "Occupancy",
            validation: { required: false }
          },
          renovationHistory: {
            type: "textarea",
            label: "Brief renovation history",
            validation: { required: false }
          },
          plannedImprovements: {
            type: "textarea",
            label: "Brief description of building improvements planned",
            validation: { required: false }
          },
          constructionTypes: {
            type: "object",
            label: "Construction Types",
            fields: {
              walls: {
                type: "text",
                label: "Walls",
                validation: { required: false }
              },
              windows: {
                type: "text",
                label: "Windows",
                validation: { required: false }
              }
            }
          },
          hoursOfOperation: {
            type: "text",
            label: "Hours of operation",
            validation: { required: false }
          }
        }
      }
    }
  }
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
      }
      ,
      // Add missing fields for AHU
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
  ,
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    name: "Building Information Survey",
    description: "Survey template for Building Information",
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
    },
    specificFields: {
      buildingInformation: {
        type: "object",
        label: "Building Information",
        fields: {
          facilityTypeUse: {
            type: "text",
            label: "Facility Type/Use",
            validation: { required: false }
          },
          originalConstruction: {
            type: "text",
            label: "Original construction",
            validation: { required: false }
          },
          conditionedArea: {
            type: "text",
            label: "Conditioned area (SF)",
            validation: { required: false }
          },
          numberOfStories: {
            type: "text",
            label: "Number of stories",
            validation: { required: false }
          },
          overallCondition: {
            type: "text",
            label: "Overall condition",
            validation: { required: false }
          },
          wholeBuilding: {
            type: "text",
            label: "Whole Building",
            validation: { required: false }
          },
          specificSpaces: {
            type: "array",
            label: "Specific spaces",
            itemTemplate: {
              spaceName: {
                type: "text",
                label: "Space Name",
                validation: { required: false }
              }
            },
            validation: { required: false }
          },
          occupancy: {
            type: "text",
            label: "Occupancy",
            validation: { required: false }
          },
          renovationHistory: {
            type: "textarea",
            label: "Brief renovation history",
            validation: { required: false }
          },
          plannedImprovements: {
            type: "textarea",
            label: "Brief description of building improvements planned",
            validation: { required: false }
          },
          constructionTypes: {
            type: "object",
            label: "Construction Types",
            fields: {
              walls: {
                type: "text",
                label: "Walls",
                validation: { required: false }
              },
              windows: {
                type: "text",
                label: "Windows",
                validation: { required: false }
              }
            }
          },
          hoursOfOperation: {
            type: "text",
            label: "Hours of operation",
            validation: { required: false }
          }
        }
      }
    }
  },
  {
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
      }
      ,
      // Add missing fields for Boiler
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
  },
  {
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
      }
      ,
      // Add missing fields for Chiller
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
  },
  {
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
      }
      ,
      // Add missing fields for Pump
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
  }
];