/**
 * Document Types Seeding Script
 * 
 * This script seeds the document types into the database.
 * It ensures that all necessary document types are available for the document manager.
 * 
 * The script uses the Prisma ORM to upsert the document types into the database,
 * ensuring that existing types are updated and new ones are created.
 * 
 * To run this script:
 * npx tsx backend/prisma/seed-document-types.ts
 * 
 * Or if you're in the backend directory:
 * npx tsx prisma/seed-document-types.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define document types to seed
const documentTypes = [
  { name: 'Manual', description: 'Equipment operation and maintenance manuals' },
  { name: 'Specification', description: 'Technical specifications' },
  { name: 'Drawing', description: 'Technical drawings and schematics' },
  { name: 'Certificate', description: 'Certificates and compliance documents' },
  { name: 'Report', description: 'Inspection and test reports' },
  { name: 'Submittal', description: 'Submittal documents' },
  { name: 'Contract', description: 'Contract documents' },
  { name: 'Photo', description: 'Photographs' },
  { name: 'Other', description: 'Other document types' }
];

async function main(): Promise<void> {
  console.log(`Seeding document types...`);
  
  for (const docType of documentTypes) {
    await prisma.documentType.upsert({
      where: {
        name: docType.name
      },
      update: {
        description: docType.description
      },
      create: {
        name: docType.name,
        description: docType.description
      }
    });
    console.log(`Upserted document type: ${docType.name}`);
  }
  
  console.log(`Upserted ${documentTypes.length} document types successfully.`);
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