/**
 * Script to export survey templates from the database to a JSON file
 * 
 * This script retrieves all survey templates from the database and exports them to a JSON file,
 * making it easier to view and analyze the fields.
 * 
 * To run:
 * npx tsx backend/prisma/export-survey-templates.ts
 * 
 * Or if you're in the backend directory:
 * npx tsx prisma/export-survey-templates.ts
 */

import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

interface SurveyField {
  type: string;
  label: string;
  options?: Array<{ value: string; label: string }>;
  validation?: { required: boolean };
  itemTemplate?: Record<string, SurveyField>;
  [key: string]: any;
}

interface SurveyTemplate {
  id?: number;
  name: string;
  description: string;
  baseFields: Record<string, SurveyField>;
  specificFields: Record<string, SurveyField>;
}

async function main(): Promise<void> {
  console.log('Retrieving survey templates from the database...');
  
  // Get all survey templates
  const templates = await prisma.surveyTemplate.findMany();
  
  console.log(`Found ${templates.length} survey templates.`);
  
  // Create a more readable version of the templates
  const readableTemplates = templates.map(template => {
    // Type cast the JSON fields to the expected structure
    const baseFieldsObj = template.baseFields as Record<string, any>;
    const specificFieldsObj = template.specificFields as Record<string, any>;
    
    return {
      name: template.name,
      description: template.description,
      baseFields: {
        // Extract the special fields we're interested in
        markups: baseFieldsObj.markups as any,
        surveyPhotos: baseFieldsObj.surveyPhotos as any,
        surveyNotes: baseFieldsObj.surveyNotes as any,
        // Include other base fields
        ...Object.fromEntries(
          Object.entries(baseFieldsObj)
            .filter(([key]) => !['markups', 'surveyPhotos', 'surveyNotes'].includes(key))
            .map(([key, value]) => {
              const fieldValue = value as { type: string; label: string };
              return [key, { type: fieldValue.type, label: fieldValue.label }];
            })
        )
      },
      specificFields: Object.fromEntries(
        Object.entries(specificFieldsObj)
          .map(([key, value]) => {
            const fieldValue = value as { type: string; label: string };
            return [key, { type: fieldValue.type, label: fieldValue.label }];
          })
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
    // Type cast the JSON fields to the expected structure
    const baseFieldsObj = template.baseFields as Record<string, any>;
    const specificFieldsObj = template.specificFields as Record<string, any>;
    
    markdown += `## ${template.name}\n\n`;
    markdown += `${template.description}\n\n`;
    
    markdown += '### Base Fields\n\n';
    
    // Special fields first
    if (baseFieldsObj.markups) {
      markdown += '#### Markups Field\n\n';
      markdown += '```json\n';
      markdown += JSON.stringify(baseFieldsObj.markups, null, 2);
      markdown += '\n```\n\n';
    }
    
    if (baseFieldsObj.surveyPhotos) {
      markdown += '#### Survey Photos Field\n\n';
      markdown += '```json\n';
      markdown += JSON.stringify(baseFieldsObj.surveyPhotos, null, 2);
      markdown += '\n```\n\n';
    }
    
    if (baseFieldsObj.surveyNotes) {
      markdown += '#### Survey Notes Field\n\n';
      markdown += '```json\n';
      markdown += JSON.stringify(baseFieldsObj.surveyNotes, null, 2);
      markdown += '\n```\n\n';
    }
    
    markdown += '### Specific Fields\n\n';
    markdown += '| Field Name | Type | Label |\n';
    markdown += '|------------|------|-------|\n';
    
    for (const [key, value] of Object.entries(specificFieldsObj)) {
      const fieldValue = value as { type: string; label: string };
      markdown += `| ${key} | ${fieldValue.type} | ${fieldValue.label} |\n`;
    }
    
    markdown += '\n---\n\n';
  }
  
  fs.writeFileSync(markdownPath, markdown);
  console.log(`Exported templates to ${markdownPath}`);
}

// Execute the script
main()
  .catch(async (e: unknown) => {
    console.error('Error:');
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Prisma client disconnected.');
  });