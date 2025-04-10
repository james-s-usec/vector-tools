/**
 * Survey Templates Seeding Script
 * 
 * This script seeds the survey templates into the database using the modular approach.
 * Each template is defined in its own file in the survey-templates directory,
 * making the codebase more maintainable and easier to work with.
 * 
 * The script uses the Prisma ORM to upsert the templates into the database,
 * ensuring that existing templates are updated and new ones are created.
 * 
 * To run this script:
 * npx tsx backend/prisma/seed-survey-templates.ts
 * 
 * Or if you're in the backend directory:
 * npx tsx prisma/seed-survey-templates.ts
 * 
 * This approach allows for:
 * - Better organization of survey templates
 * - Easier maintenance and updates
 * - Improved code readability
 * - Simplified template management
 */
import { PrismaClient } from '@prisma/client';
import { surveyTemplates } from './survey-templates/index';
import { SurveyTemplate } from './survey-templates/types';

const prisma = new PrismaClient();

// Import survey templates from the shared file
// This ensures we use the same templates as the main seed.js

async function main(): Promise<void> {
  console.log(`Seeding survey templates...`);
  
  for (const template of surveyTemplates) {
    await prisma.surveyTemplate.upsert({
      where: {
        name: template.name
      },
      update: {
        description: template.description,
        baseFields: template.baseFields,
        specificFields: template.specificFields,
      },
      create: {
        name: template.name,
        description: template.description,
        baseFields: template.baseFields,
        specificFields: template.specificFields,
      }
    });
    console.log(`Created survey template: ${template.name}`);
  }
  
  console.log(`Created ${surveyTemplates.length} survey templates successfully.`);
}

// Execute the script
main()
  .catch(async (e) => {
    console.error('Seeding failed:');
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Prisma client disconnected.');
  });