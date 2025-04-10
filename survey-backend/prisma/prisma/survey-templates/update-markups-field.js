/**
 * Script to update the markups field in all survey templates
 * 
 * This script updates all survey templates to use the markups field directly
 * instead of using the spread operator.
 * 
 * To run:
 * node --experimental-modules --experimental-specifier-resolution=node --experimental-json-modules backend/prisma/survey-templates/update-markups-field.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory containing the survey templates
const templatesDir = __dirname;

// List of template files to update (excluding the AHU template which we've already updated)
const templateFiles = [
  'boiler-survey.ts',
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

// The content to replace
const oldContent = `    // Include the markups field from additionalBaseFields
    ...additionalBaseFields.markups`;

const newContent = `    // Include the markups field directly
    markups: {
      type: "array",
      label: "Markups & Diagrams",
      itemTemplate: additionalBaseFields.markups.itemTemplate,
      validation: {
        required: false
      }
    }`;

// Process each template file
for (const file of templateFiles) {
  const filePath = path.join(templatesDir, file);
  
  try {
    // Read the file content
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the file contains the old content
    if (content.includes(oldContent)) {
      // Replace the old content with the new content
      content = content.replace(oldContent, newContent);
      
      // Write the updated content back to the file
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    } else {
      console.log(`No changes needed for ${file}`);
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error);
  }
}

console.log('All templates updated successfully!');