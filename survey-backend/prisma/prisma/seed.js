import { PrismaClient } from '@prisma/client';
import { surveyTemplates } from './survey-templates/index.ts';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding across 6 stages...`);

  // Optional: Clear previous data for clean seeding (use with caution!)
  // await prisma.maintenanceCosts.deleteMany({});
  // await prisma.controlBoardImages.deleteMany({});
  // // ... add deletes for other tables in reverse dependency order ...
  // await prisma.equipment.deleteMany({});
  // await prisma.location.deleteMany({}); // etc.
  // console.log('Cleared previous data.');


  // --- Stage 1: Independent Reference Data ---
  console.log('Seeding Stage 1: Independent Reference Data...');

  const location1 = await prisma.location.create({
    data: { buildingName: 'HQ', floorLevel: '1', roomName: '101-A' },
  });

  const project1 = await prisma.project.create({
    data: { name: 'Phase 1 Fitout', projectNumber: 'P1-2025' },
  });

  const category1 = await prisma.equipmentCategory.create({
    data: { name: 'Fan Coil Unit' },
  });

  const omniClass1 = await prisma.omniclass.create({ // Example classification
    data: { code: '23.37.13.11', title: 'Fan Coil Units' },
  });

  const ashraeLife1 = await prisma.ashraeServiceLife.create({ // Example reference
    data: { equipmentTypeDescription: 'Fan Coil Unit, Hydronic', medianLifeExpectancyYears: 20 },
  });

  const docType1 = await prisma.documentType.create({
    data: { name: 'Submittal' },
  });
  
  const docType2 = await prisma.documentType.create({
    data: { name: 'Manual' },
  });
  
  const docType3 = await prisma.documentType.create({
    data: { name: 'Specification' },
  });
  
  const docType4 = await prisma.documentType.create({
    data: { name: 'Drawing' },
  });

  const qcType1 = await prisma.qualityControlType.create({
    data: { name: 'Installation Verification' },
  });

  console.log(` Stage 1 IDs: Loc=${location1.id}, Proj=${project1.id}, Cat=${category1.id}, Omni=${omniClass1.id}, Life=${ashraeLife1.id}`);
  console.log(` Document Types: DocT1=${docType1.id}, DocT2=${docType2.id}, DocT3=${docType3.id}, DocT4=${docType4.id}, QCT=${qcType1.id}`);


  // --- Stage 2: Category Classification Junction Tables ---
  console.log('Seeding Stage 2: Classification Junctions...');

  // Link category1 to omniClass1
  await prisma.equipmentCategoriesOmniclass.create({
    data: {
      categoryId: category1.id,
      omniclassId: omniClass1.id,
    },
  });
  console.log(` Linked Category ${category1.id} to OmniClass ${omniClass1.id}`);


  // --- Stage 3: Core Entities & Project Phases ---
  console.log('Seeding Stage 3: Core Entities & Phases...');

  const equipment1 = await prisma.equipment.create({
    data: {
      equipmentTag: 'FCU-101A', // Unique tag
      categoryId: category1.id, // From Stage 1
      locationId: location1.id, // From Stage 1
      manufacturer: 'Daikin',
      model: 'FXMQ12PBVJU',
      serialNumber: 'SN-FCU-9876',
      installDate: new Date(),
      status: 'Installed',
      attributes: { // Example JSONB attributes
        CFM: 800,
        Voltage: 208,
        ControlType: 'BACnet',
      },
    },
  });

  const phase1 = await prisma.projectPhase.create({
    data: {
      projectId: project1.id, // From Stage 1
      title: 'Rough-In',
      startDate: new Date(),
    },
  });
  console.log(` Stage 3 IDs: Equip=${equipment1.id}, Phase=${phase1.id}`);


  // --- Stage 4: Primary Detail & Association Tables ---
  console.log('Seeding Stage 4: Primary Details & Associations...');

  await prisma.equipmentCost.create({
    data: {
      equipmentId: equipment1.id, // From Stage 3
      costType: 'Purchase',
      amount: 1500.00,
    },
  });

  await prisma.equipmentTco.create({ // Example TCO entry
      data: {
          equipmentId: equipment1.id, // From Stage 3
          ashraeServiceLifeId: ashraeLife1.id, // From Stage 1
          firstCost: 1500.00,
          assetCondition: 1, // 1=Excellent
          lifecycleStatus: 'New'
      }
  });

  await prisma.equipmentProject.create({
    data: {
      equipmentId: equipment1.id, // From Stage 3
      projectId: project1.id, // From Stage 1
      roleOrStatus: 'Installed in Project',
    },
  });

  await prisma.equipmentDocument.create({
    data: {
      equipmentId: equipment1.id, // From Stage 3
      docTypeId: docType1.id, // From Stage 1
      name: 'FCU-101A Submittal Package',
      filePath: '/uploads/fcu101a_submittal.pdf',
    },
  });

  const maintenance1 = await prisma.maintenance.create({
    data: {
      equipmentId: equipment1.id, // From Stage 3
      maintenanceDate: new Date(),
      maintenanceType: 'Installation Check',
      workPerformed: 'Verified installation against submittal.',
    },
  });

  const controlItem1 = await prisma.controlBoardItem.create({
      data: {
          equipmentId: equipment1.id, // From Stage 3
          itemName: 'Thermostat Interface',
          locationOnBoard: 'Wall Mount Unit',
          units: 'Degrees F'
      }
  });

  await prisma.qualityControlRecord.create({
      data: {
          equipmentId: equipment1.id, // From Stage 3
          qcTypeId: qcType1.id, // From Stage 1
          status: 'Passed',
          verifiedBy: 'System Script'
      }
  });
  console.log(` Stage 4 IDs: Maint=${maintenance1.id}, CtrlItem=${controlItem1.id}`);


  // --- Stage 5: Secondary Detail Tables ---
  console.log('Seeding Stage 5: Secondary Details...');

  await prisma.maintenanceCost.create({
    data: {
      maintenanceId: maintenance1.id, // From Stage 4
      costType: 'Labor',
      amount: 150.00,
    },
  });

  await prisma.controlBoardImage.create({
      data: {
          controlItemId: controlItem1.id, // From Stage 4
          imagePath: '/uploads/fcu101a_thermostat.jpg',
          description: 'Photo of installed thermostat'
      }
  });
  console.log(' Stage 5 records created.');


  // --- Stage 6: Survey Templates ---
  console.log('Seeding Stage 6: Survey Templates...');
  
  for (const template of surveyTemplates) {
    await prisma.surveyTemplate.create({
      data: {
        name: template.name,
        description: template.description,
        baseFields: template.baseFields,
        specificFields: template.specificFields,
      },
    });
  }
  console.log(` Created ${surveyTemplates.length} survey templates.`);

  console.log(`Seeding finished successfully.`);
}

// Standard Prisma seed execution block
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