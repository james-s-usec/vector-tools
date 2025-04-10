# Survey Templates

## Boiler Survey

Survey template for Boilers

### Base Fields

#### Markups Field

```json
{
  "type": "array",
  "label": "Markups & Diagrams",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "title": {
      "type": "text",
      "label": "Title",
      "validation": {
        "required": true
      }
    },
    "markup": {
      "type": "file",
      "label": "Markup/Diagram",
      "validation": {
        "required": true
      }
    },
    "description": {
      "type": "textarea",
      "label": "Description",
      "validation": {
        "required": false
      }
    }
  }
}
```

#### Survey Photos Field

```json
{
  "type": "array",
  "label": "Survey Photos",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "photo": {
      "type": "file",
      "label": "Photo",
      "validation": {
        "required": true
      }
    },
    "location": {
      "type": "text",
      "label": "Location",
      "validation": {
        "required": false
      }
    },
    "description": {
      "type": "text",
      "label": "Description",
      "validation": {
        "required": false
      }
    }
  }
}
```

#### Survey Notes Field

```json
{
  "type": "array",
  "label": "Survey Notes",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "note": {
      "type": "textarea",
      "label": "Note",
      "validation": {
        "required": true
      }
    },
    "category": {
      "type": "select",
      "label": "Category",
      "options": [
        {
          "label": "General",
          "value": "GENERAL"
        },
        {
          "label": "Issue",
          "value": "ISSUE"
        },
        {
          "label": "Recommendation",
          "value": "RECOMMENDATION"
        },
        {
          "label": "Observation",
          "value": "OBSERVATION"
        }
      ],
      "validation": {
        "required": false
      }
    },
    "priority": {
      "type": "select",
      "label": "Priority",
      "options": [
        {
          "label": "Low",
          "value": "LOW"
        },
        {
          "label": "Medium",
          "value": "MEDIUM"
        },
        {
          "label": "High",
          "value": "HIGH"
        }
      ],
      "validation": {
        "required": false
      }
    }
  }
}
```

### Specific Fields

| Field Name | Type | Label |
|------------|------|-------|
| fuelType | select | Fuel Type |
| boilerType | select | Boiler Type |
| heatingMedium | select | Heating Medium |
| burnerCondition | select | Burner Condition |
| designInformation | object | Design Information |
| burnerNameplateData | object | Burner Nameplate Data |
| combustionInformation | object | Combustion Information |
| heatExchangerCondition | select | Heat Exchanger Condition |
| safetyControlsOperating | radio | Safety Controls Operating |

---

## Chiller Survey

Survey template for Chillers

### Base Fields

#### Markups Field

```json
{
  "type": "array",
  "label": "Markups & Diagrams",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "title": {
      "type": "text",
      "label": "Title",
      "validation": {
        "required": true
      }
    },
    "markup": {
      "type": "file",
      "label": "Markup/Diagram",
      "validation": {
        "required": true
      }
    },
    "description": {
      "type": "textarea",
      "label": "Description",
      "validation": {
        "required": false
      }
    }
  }
}
```

#### Survey Photos Field

```json
{
  "type": "array",
  "label": "Survey Photos",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "photo": {
      "type": "file",
      "label": "Photo",
      "validation": {
        "required": true
      }
    },
    "location": {
      "type": "text",
      "label": "Location",
      "validation": {
        "required": false
      }
    },
    "description": {
      "type": "text",
      "label": "Description",
      "validation": {
        "required": false
      }
    }
  }
}
```

#### Survey Notes Field

```json
{
  "type": "array",
  "label": "Survey Notes",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "note": {
      "type": "textarea",
      "label": "Note",
      "validation": {
        "required": true
      }
    },
    "category": {
      "type": "select",
      "label": "Category",
      "options": [
        {
          "label": "General",
          "value": "GENERAL"
        },
        {
          "label": "Issue",
          "value": "ISSUE"
        },
        {
          "label": "Recommendation",
          "value": "RECOMMENDATION"
        },
        {
          "label": "Observation",
          "value": "OBSERVATION"
        }
      ],
      "validation": {
        "required": false
      }
    },
    "priority": {
      "type": "select",
      "label": "Priority",
      "options": [
        {
          "label": "Low",
          "value": "LOW"
        },
        {
          "label": "Medium",
          "value": "MEDIUM"
        },
        {
          "label": "High",
          "value": "HIGH"
        }
      ],
      "validation": {
        "required": false
      }
    }
  }
}
```

### Specific Fields

| Field Name | Type | Label |
|------------|------|-------|
| chillerType | select | Chiller Type |
| variableSpeed | radio | Variable Speed |
| compressorType | select | Compressor Type |
| refrigerantType | select | Refrigerant Type |
| designInformation | object | Design Information |
| heatRejectionType | select | Heat Rejection Type |
| condenserCondition | select | Condenser Condition |
| compressorCondition | select | Compressor Condition |
| evaporatorCondition | select | Evaporator Condition |

---

## Pump Survey

Survey template for Pumps

### Base Fields

#### Markups Field

```json
{
  "type": "array",
  "label": "Markups & Diagrams",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "title": {
      "type": "text",
      "label": "Title",
      "validation": {
        "required": true
      }
    },
    "markup": {
      "type": "file",
      "label": "Markup/Diagram",
      "validation": {
        "required": true
      }
    },
    "description": {
      "type": "textarea",
      "label": "Description",
      "validation": {
        "required": false
      }
    }
  }
}
```

#### Survey Photos Field

```json
{
  "type": "array",
  "label": "Survey Photos",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "photo": {
      "type": "file",
      "label": "Photo",
      "validation": {
        "required": true
      }
    },
    "location": {
      "type": "text",
      "label": "Location",
      "validation": {
        "required": false
      }
    },
    "description": {
      "type": "text",
      "label": "Description",
      "validation": {
        "required": false
      }
    }
  }
}
```

#### Survey Notes Field

```json
{
  "type": "array",
  "label": "Survey Notes",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "note": {
      "type": "textarea",
      "label": "Note",
      "validation": {
        "required": true
      }
    },
    "category": {
      "type": "select",
      "label": "Category",
      "options": [
        {
          "label": "General",
          "value": "GENERAL"
        },
        {
          "label": "Issue",
          "value": "ISSUE"
        },
        {
          "label": "Recommendation",
          "value": "RECOMMENDATION"
        },
        {
          "label": "Observation",
          "value": "OBSERVATION"
        }
      ],
      "validation": {
        "required": false
      }
    },
    "priority": {
      "type": "select",
      "label": "Priority",
      "options": [
        {
          "label": "Low",
          "value": "LOW"
        },
        {
          "label": "Medium",
          "value": "MEDIUM"
        },
        {
          "label": "High",
          "value": "HIGH"
        }
      ],
      "validation": {
        "required": false
      }
    }
  }
}
```

### Specific Fields

| Field Name | Type | Label |
|------------|------|-------|
| gpm | number | GPM (Gallons Per Minute) |
| rpm | number | RPM |
| head | number | Head (Feet) |
| pumpType | select | Pump Type |
| controlOn | select | Control On |
| controlType | select | Control Type |
| serviceType | select | Service Type |
| motorCondition | select | Motor Condition |
| dpSetpointReset | object | dP Setpoint/Reset |
| impellerCondition | select | Impeller Condition |

---

## Controls Survey

Survey template for Building Control Systems

### Base Fields

#### Markups Field

```json
{
  "type": "array",
  "label": "Markups & Diagrams",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "title": {
      "type": "text",
      "label": "Title",
      "validation": {
        "required": true
      }
    },
    "markup": {
      "type": "file",
      "label": "Markup/Diagram",
      "validation": {
        "required": true
      }
    },
    "description": {
      "type": "textarea",
      "label": "Description",
      "validation": {
        "required": false
      }
    }
  }
}
```

#### Survey Photos Field

```json
{
  "type": "array",
  "label": "Survey Photos",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "photo": {
      "type": "file",
      "label": "Photo",
      "validation": {
        "required": true
      }
    },
    "location": {
      "type": "text",
      "label": "Location",
      "validation": {
        "required": false
      }
    },
    "description": {
      "type": "text",
      "label": "Description",
      "validation": {
        "required": false
      }
    }
  }
}
```

#### Survey Notes Field

```json
{
  "type": "array",
  "label": "Survey Notes",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "note": {
      "type": "textarea",
      "label": "Note",
      "validation": {
        "required": true
      }
    },
    "category": {
      "type": "select",
      "label": "Category",
      "options": [
        {
          "label": "General",
          "value": "GENERAL"
        },
        {
          "label": "Issue",
          "value": "ISSUE"
        },
        {
          "label": "Recommendation",
          "value": "RECOMMENDATION"
        },
        {
          "label": "Observation",
          "value": "OBSERVATION"
        }
      ],
      "validation": {
        "required": false
      }
    },
    "priority": {
      "type": "select",
      "label": "Priority",
      "options": [
        {
          "label": "Low",
          "value": "LOW"
        },
        {
          "label": "Medium",
          "value": "MEDIUM"
        },
        {
          "label": "High",
          "value": "HIGH"
        }
      ],
      "validation": {
        "required": false
      }
    }
  }
}
```

### Specific Fields

| Field Name | Type | Label |
|------------|------|-------|
| nameplateData | object | Nameplate Data |
| generalControlSystem | object | General Control System |
| investigationPhaseTesting | object | Investigation Phase Testing |

---

## RTU Survey

Survey template for Rooftop Units

### Base Fields

#### Markups Field

```json
{
  "type": "array",
  "label": "Markups & Diagrams",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "title": {
      "type": "text",
      "label": "Title",
      "validation": {
        "required": true
      }
    },
    "markup": {
      "type": "file",
      "label": "Markup/Diagram",
      "validation": {
        "required": true
      }
    },
    "description": {
      "type": "textarea",
      "label": "Description",
      "validation": {
        "required": false
      }
    }
  }
}
```

#### Survey Photos Field

```json
{
  "type": "array",
  "label": "Survey Photos",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "photo": {
      "type": "file",
      "label": "Photo",
      "validation": {
        "required": true
      }
    },
    "location": {
      "type": "text",
      "label": "Location",
      "validation": {
        "required": false
      }
    },
    "description": {
      "type": "text",
      "label": "Description",
      "validation": {
        "required": false
      }
    }
  }
}
```

#### Survey Notes Field

```json
{
  "type": "array",
  "label": "Survey Notes",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "note": {
      "type": "textarea",
      "label": "Note",
      "validation": {
        "required": true
      }
    },
    "category": {
      "type": "select",
      "label": "Category",
      "options": [
        {
          "label": "General",
          "value": "GENERAL"
        },
        {
          "label": "Issue",
          "value": "ISSUE"
        },
        {
          "label": "Recommendation",
          "value": "RECOMMENDATION"
        },
        {
          "label": "Observation",
          "value": "OBSERVATION"
        }
      ],
      "validation": {
        "required": false
      }
    },
    "priority": {
      "type": "select",
      "label": "Priority",
      "options": [
        {
          "label": "Low",
          "value": "LOW"
        },
        {
          "label": "Medium",
          "value": "MEDIUM"
        },
        {
          "label": "High",
          "value": "HIGH"
        }
      ],
      "validation": {
        "required": false
      }
    }
  }
}
```

### Specific Fields

| Field Name | Type | Label |
|------------|------|-------|
| fanControl | object | Fan Control |
| mzuControl | object | MZU Control |
| systemType | select | System Type |
| returnAirPath | select | Return Air Path |
| supplyFanData | object | Supply Fan Data |
| compressorData | object | Compressor Data |
| fanArrangement | select | Fan Arrangement |
| coolingCoilData | object | Cooling Coil Data |
| filterCondition | select | Filter Condition |
| heatingCoilData | object | Heating Coil Data |
| condenserFanData | object | Condenser Fan Data |
| outsideAirControl | object | Outside Air Control |
| controlInformation | object | Control Information |
| supplyMixedAirTemperatureControl | object | Supply/Mixed Air Temperature Control |

---

## Zone Terminal Survey

Survey template for Zone Terminal Equipment

### Base Fields

#### Markups Field

```json
{
  "type": "array",
  "label": "Markups & Diagrams",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "title": {
      "type": "text",
      "label": "Title",
      "validation": {
        "required": true
      }
    },
    "markup": {
      "type": "file",
      "label": "Markup/Diagram",
      "validation": {
        "required": true
      }
    },
    "description": {
      "type": "textarea",
      "label": "Description",
      "validation": {
        "required": false
      }
    }
  }
}
```

#### Survey Photos Field

```json
{
  "type": "array",
  "label": "Survey Photos",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "photo": {
      "type": "file",
      "label": "Photo",
      "validation": {
        "required": true
      }
    },
    "location": {
      "type": "text",
      "label": "Location",
      "validation": {
        "required": false
      }
    },
    "description": {
      "type": "text",
      "label": "Description",
      "validation": {
        "required": false
      }
    }
  }
}
```

#### Survey Notes Field

```json
{
  "type": "array",
  "label": "Survey Notes",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "note": {
      "type": "textarea",
      "label": "Note",
      "validation": {
        "required": true
      }
    },
    "category": {
      "type": "select",
      "label": "Category",
      "options": [
        {
          "label": "General",
          "value": "GENERAL"
        },
        {
          "label": "Issue",
          "value": "ISSUE"
        },
        {
          "label": "Recommendation",
          "value": "RECOMMENDATION"
        },
        {
          "label": "Observation",
          "value": "OBSERVATION"
        }
      ],
      "validation": {
        "required": false
      }
    },
    "priority": {
      "type": "select",
      "label": "Priority",
      "options": [
        {
          "label": "Low",
          "value": "LOW"
        },
        {
          "label": "Medium",
          "value": "MEDIUM"
        },
        {
          "label": "High",
          "value": "HIGH"
        }
      ],
      "validation": {
        "required": false
      }
    }
  }
}
```

### Specific Fields

| Field Name | Type | Label |
|------------|------|-------|
| cooling | select | Cooling |
| heating | select | Heating |
| systemType | select | Type |
| nameplateData | object | Zone Equipment Nameplate Data |
| controlInformation | object | Control Information |
| generalZoneControl | object | General Zone Control |
| onOffControlSchedule | object | ON/OFF Control & Schedule |
| zoneTemperatureControl | object | Zone Temperature Control |

---

## Lighting Survey

Survey template for Lighting Systems

### Base Fields

#### Markups Field

```json
{
  "type": "array",
  "label": "Markups & Diagrams",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "title": {
      "type": "text",
      "label": "Title",
      "validation": {
        "required": true
      }
    },
    "markup": {
      "type": "file",
      "label": "Markup/Diagram",
      "validation": {
        "required": true
      }
    },
    "description": {
      "type": "textarea",
      "label": "Description",
      "validation": {
        "required": false
      }
    }
  }
}
```

#### Survey Photos Field

```json
{
  "type": "array",
  "label": "Survey Photos",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "photo": {
      "type": "file",
      "label": "Photo",
      "validation": {
        "required": true
      }
    },
    "location": {
      "type": "text",
      "label": "Location",
      "validation": {
        "required": false
      }
    },
    "description": {
      "type": "text",
      "label": "Description",
      "validation": {
        "required": false
      }
    }
  }
}
```

#### Survey Notes Field

```json
{
  "type": "array",
  "label": "Survey Notes",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "note": {
      "type": "textarea",
      "label": "Note",
      "validation": {
        "required": true
      }
    },
    "category": {
      "type": "select",
      "label": "Category",
      "options": [
        {
          "label": "General",
          "value": "GENERAL"
        },
        {
          "label": "Issue",
          "value": "ISSUE"
        },
        {
          "label": "Recommendation",
          "value": "RECOMMENDATION"
        },
        {
          "label": "Observation",
          "value": "OBSERVATION"
        }
      ],
      "validation": {
        "required": false
      }
    },
    "priority": {
      "type": "select",
      "label": "Priority",
      "options": [
        {
          "label": "Low",
          "value": "LOW"
        },
        {
          "label": "Medium",
          "value": "MEDIUM"
        },
        {
          "label": "High",
          "value": "HIGH"
        }
      ],
      "validation": {
        "required": false
      }
    }
  }
}
```

### Specific Fields

| Field Name | Type | Label |
|------------|------|-------|
| lampType | select | Lamp Type |
| ballastType | select | Ballast Type |
| fixtureType | select | Fixture Type |
| lightLevels | array | Light Levels |
| estimatedWSF | text | Estimated W/SF |
| wattsPerLamp | text | Watts per Lamp |
| lampsPerFixture | text | Lamps per Fixture |
| controlInformation | object | Control Information |
| fixtureDescription | text | Fixture Description |

---

## AHU Survey

Survey template for Air Handling Units

### Base Fields

#### Markups Field

```json
{
  "type": "array",
  "label": "Markups & Diagrams",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "title": {
      "type": "text",
      "label": "Title",
      "validation": {
        "required": true
      }
    },
    "markup": {
      "type": "file",
      "label": "Markup/Diagram",
      "validation": {
        "required": true
      }
    },
    "description": {
      "type": "textarea",
      "label": "Description",
      "validation": {
        "required": false
      }
    }
  }
}
```

#### Survey Photos Field

```json
{
  "type": "array",
  "label": "Survey Photos",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "photo": {
      "type": "file",
      "label": "Photo",
      "validation": {
        "required": true
      }
    },
    "location": {
      "type": "text",
      "label": "Location",
      "validation": {
        "required": false
      }
    },
    "description": {
      "type": "text",
      "label": "Description",
      "validation": {
        "required": false
      }
    }
  }
}
```

#### Survey Notes Field

```json
{
  "type": "array",
  "label": "Survey Notes",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "note": {
      "type": "textarea",
      "label": "Note",
      "validation": {
        "required": true
      }
    },
    "category": {
      "type": "select",
      "label": "Category",
      "options": [
        {
          "label": "General",
          "value": "GENERAL"
        },
        {
          "label": "Issue",
          "value": "ISSUE"
        },
        {
          "label": "Recommendation",
          "value": "RECOMMENDATION"
        },
        {
          "label": "Observation",
          "value": "OBSERVATION"
        }
      ],
      "validation": {
        "required": false
      }
    },
    "priority": {
      "type": "select",
      "label": "Priority",
      "options": [
        {
          "label": "Low",
          "value": "LOW"
        },
        {
          "label": "Medium",
          "value": "MEDIUM"
        },
        {
          "label": "High",
          "value": "HIGH"
        }
      ],
      "validation": {
        "required": false
      }
    }
  }
}
```

### Specific Fields

| Field Name | Type | Label |
|------------|------|-------|
| systemType | select | System Type |
| returnAirPath | select | Return Air Path |
| supplyFanData | object | Supply Fan Data |
| fanArrangement | select | Fan Arrangement |
| coolingCoilData | object | Cooling Coil Data |
| filterCondition | select | Filter Condition |
| heatingCoilData | object | Heating Coil Data |
| outsideAirControl | object | Outside Air Control |
| returnFanOperating | radio | Return Fan Operating |
| supplyFanOperating | radio | Supply Fan Operating |
| coolingCoilCondition | select | Cooling Coil Condition |
| heatingCoilCondition | select | Heating Coil Condition |

---

## Exhaust Fan Survey

Survey template for Exhaust Fans

### Base Fields

#### Markups Field

```json
{
  "type": "array",
  "label": "Markups & Diagrams",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "title": {
      "type": "text",
      "label": "Title",
      "validation": {
        "required": true
      }
    },
    "markup": {
      "type": "file",
      "label": "Markup/Diagram",
      "validation": {
        "required": true
      }
    },
    "description": {
      "type": "textarea",
      "label": "Description",
      "validation": {
        "required": false
      }
    }
  }
}
```

#### Survey Photos Field

```json
{
  "type": "array",
  "label": "Survey Photos",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "photo": {
      "type": "file",
      "label": "Photo",
      "validation": {
        "required": true
      }
    },
    "location": {
      "type": "text",
      "label": "Location",
      "validation": {
        "required": false
      }
    },
    "description": {
      "type": "text",
      "label": "Description",
      "validation": {
        "required": false
      }
    }
  }
}
```

#### Survey Notes Field

```json
{
  "type": "array",
  "label": "Survey Notes",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "note": {
      "type": "textarea",
      "label": "Note",
      "validation": {
        "required": true
      }
    },
    "category": {
      "type": "select",
      "label": "Category",
      "options": [
        {
          "label": "General",
          "value": "GENERAL"
        },
        {
          "label": "Issue",
          "value": "ISSUE"
        },
        {
          "label": "Recommendation",
          "value": "RECOMMENDATION"
        },
        {
          "label": "Observation",
          "value": "OBSERVATION"
        }
      ],
      "validation": {
        "required": false
      }
    },
    "priority": {
      "type": "select",
      "label": "Priority",
      "options": [
        {
          "label": "Low",
          "value": "LOW"
        },
        {
          "label": "Medium",
          "value": "MEDIUM"
        },
        {
          "label": "High",
          "value": "HIGH"
        }
      ],
      "validation": {
        "required": false
      }
    }
  }
}
```

### Specific Fields

| Field Name | Type | Label |
|------------|------|-------|
| schedule | object | Schedule Reference # or Weekly Schedule |
| measuredData | object | Measured Data |
| buildingPressure | select | Overall Building Pressure |
| fanNameplateData | object | Fan Nameplate Data |
| motorNameplateData | object | Motor Nameplate Data |

---

## Equipment Summaries Survey

Survey template for Equipment Summaries

### Base Fields

#### Markups Field

```json
{
  "type": "array",
  "label": "Markups & Diagrams",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "title": {
      "type": "text",
      "label": "Title",
      "validation": {
        "required": true
      }
    },
    "markup": {
      "type": "file",
      "label": "Markup/Diagram",
      "validation": {
        "required": true
      }
    },
    "description": {
      "type": "textarea",
      "label": "Description",
      "validation": {
        "required": false
      }
    }
  }
}
```

#### Survey Photos Field

```json
{
  "type": "array",
  "label": "Survey Photos",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "photo": {
      "type": "file",
      "label": "Photo",
      "validation": {
        "required": true
      }
    },
    "location": {
      "type": "text",
      "label": "Location",
      "validation": {
        "required": false
      }
    },
    "description": {
      "type": "text",
      "label": "Description",
      "validation": {
        "required": false
      }
    }
  }
}
```

#### Survey Notes Field

```json
{
  "type": "array",
  "label": "Survey Notes",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "note": {
      "type": "textarea",
      "label": "Note",
      "validation": {
        "required": true
      }
    },
    "category": {
      "type": "select",
      "label": "Category",
      "options": [
        {
          "label": "General",
          "value": "GENERAL"
        },
        {
          "label": "Issue",
          "value": "ISSUE"
        },
        {
          "label": "Recommendation",
          "value": "RECOMMENDATION"
        },
        {
          "label": "Observation",
          "value": "OBSERVATION"
        }
      ],
      "validation": {
        "required": false
      }
    },
    "priority": {
      "type": "select",
      "label": "Priority",
      "options": [
        {
          "label": "Low",
          "value": "LOW"
        },
        {
          "label": "Medium",
          "value": "MEDIUM"
        },
        {
          "label": "High",
          "value": "HIGH"
        }
      ],
      "validation": {
        "required": false
      }
    }
  }
}
```

### Specific Fields

| Field Name | Type | Label |
|------------|------|-------|
| equipmentSummary | object | Equipment Summary |

---

## Building Information Survey

Survey template for Building Information

### Base Fields

#### Markups Field

```json
{
  "type": "array",
  "label": "Markups & Diagrams",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "title": {
      "type": "text",
      "label": "Title",
      "validation": {
        "required": true
      }
    },
    "markup": {
      "type": "file",
      "label": "Markup/Diagram",
      "validation": {
        "required": true
      }
    },
    "description": {
      "type": "textarea",
      "label": "Description",
      "validation": {
        "required": false
      }
    }
  }
}
```

#### Survey Photos Field

```json
{
  "type": "array",
  "label": "Survey Photos",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "photo": {
      "type": "file",
      "label": "Photo",
      "validation": {
        "required": true
      }
    },
    "location": {
      "type": "text",
      "label": "Location",
      "validation": {
        "required": false
      }
    },
    "description": {
      "type": "text",
      "label": "Description",
      "validation": {
        "required": false
      }
    }
  }
}
```

#### Survey Notes Field

```json
{
  "type": "array",
  "label": "Survey Notes",
  "validation": {
    "required": false
  },
  "itemTemplate": {
    "note": {
      "type": "textarea",
      "label": "Note",
      "validation": {
        "required": true
      }
    },
    "category": {
      "type": "select",
      "label": "Category",
      "options": [
        {
          "label": "General",
          "value": "GENERAL"
        },
        {
          "label": "Issue",
          "value": "ISSUE"
        },
        {
          "label": "Recommendation",
          "value": "RECOMMENDATION"
        },
        {
          "label": "Observation",
          "value": "OBSERVATION"
        }
      ],
      "validation": {
        "required": false
      }
    },
    "priority": {
      "type": "select",
      "label": "Priority",
      "options": [
        {
          "label": "Low",
          "value": "LOW"
        },
        {
          "label": "Medium",
          "value": "MEDIUM"
        },
        {
          "label": "High",
          "value": "HIGH"
        }
      ],
      "validation": {
        "required": false
      }
    }
  }
}
```

### Specific Fields

| Field Name | Type | Label |
|------------|------|-------|
| buildingInformation | object | Building Information |

---

