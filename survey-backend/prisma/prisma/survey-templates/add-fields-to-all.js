/**
 * Script to add the additional base fields to all survey templates
 * 
 * This script adds the photo, notes, and markup fields to all survey templates
 * Run with: node --experimental-modules --experimental-specifier-resolution=node --experimental-json-modules backend/prisma/survey-templates/add-fields-to-all.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory containing the survey templates
const templatesDir = __dirname;

// List of template files to update (excluding the ones we've already updated)
const templateFiles = [
  'chiller-survey.ts',
  'pump-survey.ts',
  'controls-survey.ts',
  'exhaust-fan-survey.ts',
  'rtu-survey.ts',
  'zone-terminal-survey.ts',
  'lighting-survey.ts',
  'equipment-summaries-survey.ts',
  'building-information-survey.ts'
];

// The content to add to each template
const importStatement = `import { additionalBaseFields } from './additional-base-fields.ts';\n`;

const fieldsToAdd = `
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
    ...additionalBaseFields.markups
`;

// Process each template file
for (const file of templateFiles) {
  const filePath = path.join(templatesDir, file);
  
  try {
    // Read the file content
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add the import statement if it doesn't exist
    if (!content.includes("import { additionalBaseFields }")) {
      const importPos = content.indexOf('import');
      const nextLinePos = content.indexOf('\n', importPos) + 1;
      content = content.substring(0, nextLinePos) + importStatement + content.substring(nextLinePos);
    }
    
    // Find the position to add the fields
    const baseFieldsEndRegex = /equipmentPicture: {[\s\S]+?validation: { required: false }[\s\S]+?}/;
    const match = content.match(baseFieldsEndRegex);
    
    if (match) {
      const endPos = match.index + match[0].length;
      const beforeFields = content.substring(0, endPos);
      const afterFields = content.substring(endPos);
      
      // Check if we need to add a comma
      const needsComma = !beforeFields.trim().endsWith(',');
      const separator = needsComma ? ',\n' : '\n';
      
      // Add the fields
      content = beforeFields + separator + fieldsToAdd + afterFields;
      
      // Write the updated content back to the file
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    } else {
      console.error(`Could not find the right position to add fields in ${file}`);
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error);
  }
}

console.log('All templates updated successfully!');