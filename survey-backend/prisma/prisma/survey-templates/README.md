# Survey Templates

This directory contains modular survey templates for the Data Drivers application. Each template is defined in its own file, making the codebase more maintainable and easier to work with.

> **IMPORTANT**: All survey templates include additional base fields for photos, notes, and markups. These fields use the 'array' type which requires proper handling in the frontend. Make sure the SurveyField interface in `packages/types/survey.ts` includes 'array' as a valid type and has the itemTemplate property.

## Directory Structure

- `index.ts` - Exports all survey templates
- `types.ts` - Defines common types used across templates
- `additional-base-fields.ts` - Defines additional fields for photos, notes, and markups
- Individual template files (e.g., `ahu-survey.ts`, `boiler-survey.ts`, etc.)

## Available Templates

1. **AHU Survey** - Air Handling Units survey template
2. **Boiler Survey** - Boilers survey template
3. **Chiller Survey** - Chillers survey template
4. **Pump Survey** - Pumps survey template
5. **Controls Survey** - Building Control Systems survey template
6. **Exhaust Fan Survey** - Exhaust Fans survey template
7. **RTU Survey** - Rooftop Units survey template
8. **Zone Terminal Survey** - Zone Terminal Equipment survey template
9. **Lighting Survey** - Lighting Systems survey template
10. **Equipment Summaries Survey** - Equipment Summaries survey template
11. **Building Information Survey** - Building Information survey template

## How to Use

Each template follows a consistent structure with `baseFields` (common across equipment types) and `specificFields` (unique to each equipment type).

Example:
```typescript
export const ahuSurvey: SurveyTemplate = {
  name: "AHU Survey",
  description: "Survey template for Air Handling Units",
  baseFields: {
    // Common fields like buildingNo, tag, location, etc.
  },
  specificFields: {
    // AHU-specific fields
  }
};
```

## Running the Seed Script

To seed these templates into the database, use the following command:

```bash
node --experimental-modules --experimental-specifier-resolution=node --experimental-json-modules backend/prisma/seed-survey-templates.js
```

This script uses Prisma's `upsert` operation to ensure that existing templates are updated and new ones are created.

## Benefits of This Approach

- **Modularity**: Each template is defined in its own file
- **Maintainability**: Easier to update individual templates
- **Readability**: Cleaner code structure
- **Scalability**: Simple to add new templates

## Template Field Types

Templates support various field types:
- `text` - Text input
- `textarea` - Multi-line text input
- `select` - Dropdown selection
- `multiselect` - Multiple selection
- `radio` - Radio button selection
- `date` - Date input
- `file` - File upload
- `object` - Nested object with its own fields
- `array` - Array of items with a defined template

## Validation

Each field can include validation rules:
```typescript
validation: { required: true/false }
```

## Additional Base Fields for Photos, Notes, and Markups

All survey templates now include additional fields for capturing photos, notes, and markups:

> **IMPORTANT**: These fields use the 'array' type which requires proper handling in the frontend. If these fields are not appearing in the React templates, verify that the SurveyField interface in `packages/types/survey.ts` includes 'array' as a valid type.

### Survey Photos
An array of photos with descriptions and locations, allowing surveyors to document visual evidence.

```typescript
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
}
```

### Survey Notes
Structured notes with categories and priority levels, enabling detailed documentation of issues, recommendations, and observations.

```typescript
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
}
```

### Markups & Diagrams
Support for uploading markup files and diagrams with titles and descriptions, useful for annotated drawings or sketches.

```typescript
markups: {
  type: "array",
  label: "Markups & Diagrams",
  itemTemplate: {
    markup: {
      type: "file",
      label: "Markup/Diagram",
      validation: { required: true }
    },
    title: {
      type: "text",
      label: "Title",
      validation: { required: true }
    },
    description: {
      type: "textarea",
      label: "Description",
      validation: { required: false }
    }
  },
  validation: { required: false }
}
```

## How to View These Fields

To see these fields in the database, you can:

1. Make sure the SurveyField interface in `packages/types/survey.ts` includes 'array' as a valid type:
   ```typescript
   export interface SurveyField {
     type: 'text' | 'number' | 'date' | 'select' | 'radio' | 'textarea' | 'file' | 'object' | 'array';
     // other properties...
     itemTemplate?: Record<string, SurveyField>; // For array type fields
   }
   ```

2. Run the export script to generate JSON and Markdown files:
   ```bash
   node --experimental-modules --experimental-specifier-resolution=node --experimental-json-modules backend/prisma/export-survey-templates.js
   ```

3. Open the HTML viewer to see a visual representation:
   ```bash
   open backend/prisma/survey-templates-viewer.html
   ```

4. Run the view script to see the fields in the console:
   ```bash
   node --experimental-modules --experimental-specifier-resolution=node --experimental-json-modules backend/prisma/view-survey-templates.js
   ```

### Survey Notes
Structured notes with categories and priority levels, enabling detailed documentation of issues, recommendations, and observations.

### Markups & Diagrams
Support for uploading markup files and diagrams with titles and descriptions, useful for annotated drawings or sketches.

## How to Add These Fields to Other Templates

To add these fields to other templates, you can:

> **NOTE**: These fields use the 'array' type which requires proper handling in the frontend. Make sure the SurveyField interface in `packages/types/survey.ts` includes 'array' as a valid type.

1. Import the additionalBaseFields from './additional-base-fields.ts'
2. Add the fields directly to the baseFields object
3. Use the spread operator for specific fields: `...additionalBaseFields.markups`

This approach keeps all survey data together in a single template, making it easier to manage and retrieve related information.

## Troubleshooting

### Fields Not Appearing in React Templates

If the additional base fields (surveyPhotos, surveyNotes, markups) are not appearing in the React page templates:

1. Verify that the SurveyField interface in `packages/types/survey.ts` includes 'array' as a valid type:
   ```typescript
   export interface SurveyField {
     type: 'text' | 'number' | 'date' | 'select' | 'radio' | 'textarea' | 'file' | 'object' | 'array';
     // other properties...
   }
   ```

2. Verify that the SurveyField interface includes the itemTemplate property:
   ```typescript
   export interface SurveyField {
     // existing properties...
     itemTemplate?: Record<string, SurveyField>; // For array type fields
   }
   ```

3. Restart the development server to apply the changes

4. For more information, see the documentation in `docs/surveys/array-fields-guide.md` and `docs/surveys/SURVEY-Issues.md`