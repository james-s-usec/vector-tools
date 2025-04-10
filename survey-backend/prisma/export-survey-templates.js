/**
 * Script to export survey templates from the database to a JSON file
 * 
 * This script retrieves all survey templates from the database and exports them to a JSON file,
 * making it easier to view and analyze the fields.
 * 
 * To run:
 * npx tsx backend/prisma/export-survey-templates.js
* 
* Or if you're in the backend directory:
* npx tsx prisma/export-survey-templates
* 
* Or using npm script:
* npm run db:expor:-survey-templates.js
 */

import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function main() {
  console.log('Retrieving survey templates from the database...');
  
  // Get all survey templates
  const templates = await prisma.surveyTemplate.findMany();
  
  console.log(`Found ${templates.length} survey templates.`);
  
  // Create a more readable version of the templates
  const readableTemplates = templates.map(template => {
    return {
      name: template.name,
      description: template.description,
      baseFields: {
        // Extract the special fields we're interested in
        markups: template.baseFields.markups,
        surveyPhotos: template.baseFields.surveyPhotos,
        surveyNotes: template.baseFields.surveyNotes,
        // Include other base fields
        ...Object.fromEntries(
          Object.entries(template.baseFields)
            .filter(([key]) => !['markups', 'surveyPhotos', 'surveyNotes'].includes(key))
            .map(([key, value]) => [key, { type: value.type, label: value.label }])
        )
      },
      specificFields: Object.fromEntries(
        Object.entries(template.specificFields)
          .map(([key, value]) => [key, { type: value.type, label: value.label }])
      )
    };
  });
  
  // Export to a JSON file
  const outputPath = path.join(__dirname, 'survey-templates-export.json');
  fs.writeFileSync(outputPath, JSON.stringify(readableTemplates, null, 2));
  
  console.log(`Exported templates to ${outputPath}`);
  
  // Also create a markdown file for better readability
  const markdownPath = path.join(__dirname, 'survey-templates-export.md');
  let markdown = '# Survey Templates\n\n';
  
  for (const template of templates) {
    markdown += `## ${template.name}\n\n`;
    markdown += `${template.description}\n\n`;
    
    markdown += '### Base Fields\n\n';
    
    // Special fields first
    if (template.baseFields.markups) {
      markdown += '#### Markups Field\n\n';
      markdown += '```json\n';
      markdown += JSON.stringify(template.baseFields.markups, null, 2);
      markdown += '\n```\n\n';
    }
    
    if (template.baseFields.surveyPhotos) {
      markdown += '#### Survey Photos Field\n\n';
      markdown += '```json\n';
      markdown += JSON.stringify(template.baseFields.surveyPhotos, null, 2);
      markdown += '\n```\n\n';
    }
    
    if (template.baseFields.surveyNotes) {
      markdown += '#### Survey Notes Field\n\n';
      markdown += '```json\n';
      markdown += JSON.stringify(template.baseFields.surveyNotes, null, 2);
      markdown += '\n```\n\n';
    }
    
    markdown += '### Specific Fields\n\n';
    markdown += '| Field Name | Type | Label |\n';
    markdown += '|------------|------|-------|\n';
    
    for (const [key, value] of Object.entries(template.specificFields)) {
      markdown += `| ${key} | ${value.type} | ${value.label} |\n`;
    }
    
    markdown += '\n---\n\n';
  }
  
  fs.writeFileSync(markdownPath, markdown);
  console.log(`Exported templates to ${markdownPath}`);
}

// Execute the script
main()
  .catch(async (e) => {
    console.error('Error:');
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Prisma client disconnected.');
  });