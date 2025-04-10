# Prisma Database Seeding

This directory contains scripts for seeding the database with initial data, including survey templates.

## Main Seed Script

The main seed script (`seed.js`) populates the database with all necessary data, including survey templates in Stage 6.

### Running the Main Seed Script

```bash
# Using npm script (recommended)
npm run db:seed:tsx

# Or directly with tsx
npx tsx prisma/seed.js
```

## Survey Templates Seed Script

A dedicated script (`seed-survey-templates.ts`) is available for seeding or updating just the survey templates. This is useful when you've made changes to survey templates and want to update them without running the entire seed process.

### Running the Survey Templates Seed Script

```bash
# Using npm script (recommended)
npm run db:seed:survey-templates

# Or directly with tsx
npx tsx prisma/seed-survey-templates.ts

# Or using the convenience shell script
./scripts/run-seed-survey-templates.sh
```

## Exporting Survey Templates

You can export the survey templates from the database to JSON and Markdown files for easier viewing and analysis.

### Running the Export Script

```bash
# Using npm script (recommended)
npm run db:export:survey-templates

# Or directly with tsx
npx tsx prisma/export-survey-templates.js

# Or using the convenience shell script
./scripts/run-export-survey-templates.sh
```

This will generate two files:

1. `survey-templates-export.json` - JSON file containing all templates
2. `survey-templates-export.md` - Markdown file with a more readable format

### Viewing the Templates

After exporting, you can view the templates in the following ways:

1. Open the HTML viewer:

   ```bash
   open prisma/survey-templates-viewer.html
   ```

2. View the Markdown file in a Markdown viewer or text editor

3. Examine the JSON file for programmatic access

## Exporting Survey Templates to Excel

You can also export the survey templates to Excel format, which is useful for sharing with non-technical users or for making bulk edits.

### Running the Excel Export Script

```bash
# Using npm script (recommended)
npm run db:export:survey-templates:excel

# Or using the convenience shell script
./scripts/run-export-survey-templates-to-excel.sh
```

This will generate an Excel file in the root directory:

- `templates_export.xlsx` - Excel file containing all templates (without formatting)

### Excel Export Features

The Excel export includes:

1. Template metadata (name, description, creation date)
2. Base fields with their types, labels, and validation rules
3. Specific fields with their types, labels, and validation rules
4. Nested fields for array and object types

## User-Friendly Excel Template with Actual Data

A more user-friendly Excel template that includes both instructions and your actual survey templates is available:

### Generating the Excel Template with Data

```bash
# From the root directory
npm run generate:survey-template-excel
```

This creates a file called `survey-templates-with-data.xlsx` in the root directory that includes:

1. A README sheet with detailed instructions
2. A Field Types reference sheet with examples
3. All your actual survey templates, each on its own sheet

## Importing Survey Templates from Excel

You can import survey templates from Excel files, which is useful for creating new templates or updating existing ones.

### Running the Excel Import Script

```bash
# Using npm script with default file (templates_export.xlsx)
npm run db:import:survey-templates:excel

# Or using the test script directly with a specific file
node scripts/test-survey-template-export-import.js import path/to/template.xlsx true
```

### Excel Import Features

The Excel import supports:

1. Creating new templates from Excel files
2. Updating existing templates (when the updateExisting flag is set to true)
3. Validating template data before import
4. Detailed error reporting for invalid templates

## Custom Excel Template

A custom Excel template with formatting, validation, and instructions is available to make it easier for non-technical users to edit survey templates.

### Generating the Excel Template

```bash
# Generate the custom Excel template
npm run db:generate:survey-template-excel
```

This will create a file called `survey-template-excel-template.xlsx` in the prisma directory.

### Features of the Custom Excel Template

1. **README Sheet** - Contains detailed instructions on how to use the template
2. **Field Types Sheet** - Reference for all available field types with examples
3. **Template Example Sheet** - Example template showing the correct format
4. **Color Coding** - Different sections are color-coded for easier navigation
5. **Validation** - Dropdown lists for field types and required fields

### How to Fill Out the Excel File for Importing

When editing templates in Excel:

1. **Do not modify** the header rows (1-5)
2. **Do not change** the Field ID column unless you're creating a new field
3. **Respect the field types** - valid types are:
   - text
   - number
   - date
   - select
   - radio
   - textarea
   - file
   - object
   - array
4. **Format options correctly** - use valid JSON in the Options/Settings column
5. **Maintain parent relationships** - for nested fields, ensure the Parent Field column references a valid field ID

#### Example Excel Structure

```
A1: Template: AHU Survey
A2: ID: 1
A3: Description: Survey template for Air Handling Units
A4: Created: 2025-03-15 | Updated: 2025-03-31
A5: Exported: 2025-04-01

A7: BASE FIELDS
A8: Field ID | Field Type | Field Label | Required | Parent Field | Options/Settings | Notes
A9: tag | text | Equipment Tag | true | | {} | Unique identifier
A10: location | text | Location | true | | {} | Physical location
A11: unitOperating | select | Unit Operating | true | | {"options":[{"value":"YES","label":"Yes"},{"value":"NO","label":"No"}]} | Operational status

A13: SPECIFIC FIELDS
A14: airflowCFM | number | Airflow (CFM) | false | | {} | 
A15: supplyTemp | number | Supply Temperature | false | | {} | 

A17: ARRAY FIELDS
A18: surveyPhotos | array | Survey Photos | false | | {} | 
A19: → photo | file | Photo | true | surveyPhotos | {} | Item in surveyPhotos array
A20: → description | text | Description | false | surveyPhotos | {} | Item in surveyPhotos array
A21: → location | text | Location | false | surveyPhotos | {} | Item in surveyPhotos array
```

For a complete guide on the Excel file structure and how to edit it, see the [Export/Import Guide](../docs/surveys/export-import-guide.md).

## Troubleshooting

If you encounter issues running the seed scripts:

1. Make sure you're in the correct directory (backend) when running npm scripts
2. Ensure the database is running and accessible
3. Check that all dependencies are installed (`npm install`)
4. Verify that tsx is installed (`npm install -D tsx`)

## Survey Templates Structure

Survey templates are defined in the `survey-templates` directory, with each template in its own file. The `index.ts` file exports all templates as an array.

For more information on the survey templates structure, see the [README.md](./survey-templates/README.md) in the survey-templates directory.
