/**
 * Script to view survey templates from the database
 * 
 * This script retrieves all survey templates from the database and displays them,
 * allowing you to verify that the fields were correctly added.
 * 
 * To run:
 * node --experimental-modules --experimental-specifier-resolution=node --experimental-json-modules backend/prisma/view-survey-templates.js
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Retrieving survey templates from the database...');
  
  // Get all survey templates
  const templates = await prisma.surveyTemplate.findMany();
  
  console.log(`Found ${templates.length} survey templates.`);
  
  // Display each template
  for (const template of templates) {
    console.log(`\n=== ${template.name} ===`);
    console.log(`Description: ${template.description}`);
    
    // Display base fields
    console.log('\nBase Fields:');
    const baseFields = Object.keys(template.baseFields);
    console.log(baseFields.join(', '));

    // Show detailed information about the markups field
    console.log('\n=== MARKUPS FIELD DETAILS ===');
    if (template.baseFields.markups) {
      console.log('Field structure:');
      console.log(JSON.stringify(template.baseFields.markups, null, 2));
    } else {
      console.log('Markups field not found in this template!');
    }
    
    // Show detailed information about the surveyPhotos field
    console.log('\n=== SURVEY PHOTOS FIELD DETAILS ===');
    if (template.baseFields.surveyPhotos) {
      console.log('Field structure:');
      console.log(JSON.stringify(template.baseFields.surveyPhotos, null, 2));
    } else {
      console.log('Survey Photos field not found in this template!');
    }
    
    // Show detailed information about the surveyNotes field
    console.log('\n=== SURVEY NOTES FIELD DETAILS ===');
    if (template.baseFields.surveyNotes) {
      console.log('Field structure:');
      console.log(JSON.stringify(template.baseFields.surveyNotes, null, 2));
    } else {
      console.log('Survey Notes field not found in this template!');
    }
    
    // Show a sample of the field structures (truncated)
    console.log('\nSurvey Photos Field Structure:');
    console.log(JSON.stringify(template.baseFields.surveyPhotos, null, 2).substring(0, 200) + '...');
    console.log('\nSurvey Notes Field Structure:');
    console.log(JSON.stringify(template.baseFields.surveyNotes, null, 2).substring(0, 200) + '...');
    
    // Display specific fields
    console.log('\nSpecific Fields:');
    console.log(Object.keys(template.specificFields).join(', '));
    
    console.log('\n' + '-'.repeat(50));
  }
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