/**
 * Vector Pricing Seed Script
 * 
 * This script populates the vector pricing tables with data from the extracted JSON file.
 * 
 * To run:
 * npx tsx backend/prisma/seed-vector-pricing.ts
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
  console.log('Seeding vector pricing data...');
  
  // Read the extracted data
  const extractedDataPath = path.join(__dirname, '../vector-pricing/extracted-data.json');
  const extractedData = JSON.parse(fs.readFileSync(extractedDataPath, 'utf8'));
  
  // Get data from each sheet
  const projectSheet = extractedData.sheets.find(sheet => sheet.sheetName === 'project');
  const areaSheet = extractedData.sheets.find(sheet => sheet.sheetName === 'area');
  const gccowSheet = extractedData.sheets.find(sheet => sheet.sheetName === 'gccow');
  const itemSheet = extractedData.sheets.find(sheet => sheet.sheetName === 'item_breakdown');
  
  if (!projectSheet || !areaSheet || !gccowSheet || !itemSheet) {
    throw new Error('Missing required sheets in extracted data');
  }
  
  // Create a map to store project IDs by modelKey
  const projectIdsByModelKey = new Map();
  const areaIdsByModelKey = new Map();
  
  // Seed projects
  console.log(`Seeding ${projectSheet.records.length} projects...`);
  for (const record of projectSheet.records) {
    const project = await prisma.vectorProject.create({
      data: {
        modelKey: record['modelId.modelKey'] || '',
        version: record['modelId.version'] || 1,
        name: record.name || '',
        estimateDate: record.estimateDate || '',
        projectType: record.projectTypeName || '',
        plumbingFieldRate: record.plumbingFieldRate || null,
        pipefittingFieldRate: record.pipefittingFieldRate || null,
        sheetMetalShopRate: record.sheetMetalShopRate || null,
        sheetMetalFieldRate: record.sheetMetalFieldRate || null,
        salesTaxRate: record.salesTaxRate || null,
        bond: record.bond || null,
        design: record.design || null,
        contingency: record.contingency || null,
        permit: record.permit || null,
        feeRecap: record.feeRecap || null,
        overallFee: record.overallFee || null,
        milesFromFabShopToJobSite: record.milesFromFabShopToJobSite || null,
        startDate: record.startDate ? new Date(record.startDate) : null,
        endDate: record.endDate ? new Date(record.endDate) : null,
        plumbingFieldMCAFactor: record.plumbingFieldMCAFactor || null,
        pipefittingFieldMCAFactor: record.pipefittingFieldMCAFactor || null,
        sheetMetalShopMCAFactor: record.sheetMetalShopMCAFactor || null,
        sheetMetalFieldMCAFactor: record.sheetMetalFieldMCAFactor || null,
        generalContractor: record['General Contractor'] || null,
        owner: record.Owner || null,
        engineer: record.Engineer || null,
        contractType: record.contractTypeName || null,
        budgetType: record.budgetTypeName || null,
        notes: record.notes || null,
        region: record.region || null,
        escalation: record.Escalation || null,
        budgetPhase: record['Budget Phase'] || null
      }
    });
    
    // Store the project ID by modelKey for later reference
    projectIdsByModelKey.set(project.modelKey, project.id);
  }
  
  // Seed areas
  console.log(`Seeding ${areaSheet.records.length} areas...`);
  for (const record of areaSheet.records) {
    // Find the project ID for this area
    const projectId = projectIdsByModelKey.get(record['preconProject.modelKey']);
    
    const area = await prisma.vectorArea.create({
      data: {
        modelKey: record.modelKey || '',
        version: record.version || 1,
        preconProjectModelKey: record['preconProject.modelKey'] || '',
        preconProjectVersion: record['preconProject.version'] || 1,
        name: record['Area Name'] || '',
        areaNumber: record.areaNumber || '',
        squareFootage: record['Square Footage'] || null,
        areaDesignation: record['Area Designation'] || '',
        hvac: record.HVAC || null,
        cooling: record.Cooling || null,
        heating: record.Heating || null,
        terminalUnits: record.terminalUnits || null,
        centralCooling: record['Central Cooling'] || null,
        condenser: record.condenser || null,
        specialty: record.specialty || null,
        centralHeating: record['Central Heating'] || null,
        efficiency: record.efficiency || null,
        notes: record.notes || null,
        projectName: record['Project Name'] || '',
        projectArea: record['Project - Area'] || '',
        projectDesignation: record['Project Designation'] || '',
        projectType: record['Project Type'] || '',
        dateEstimated: record['Date Estimated'] ? new Date(record['Date Estimated']) : null
      }
    });
    
    // Store the area ID by modelKey for later reference
    areaIdsByModelKey.set(area.modelKey, area.id);
  }
  
  // Seed gccow items
  console.log(`Seeding ${gccowSheet.records.length} gccow items...`);
  for (const record of gccowSheet.records) {
    // Find the project ID for this gccow item
    const projectId = projectIdsByModelKey.get(record['preconProject.modelKey']);
    
    await prisma.vectorGCCOW.create({
      data: {
        modelKey: record.modelKey || '',
        version: record.version || 1,
        preconProjectModelKey: record['preconProject.modelKey'] || '',
        preconProjectVersion: record['preconProject.version'] || 1,
        subTotalCost: record.subTotalCost || null,
        trade: record.trade || '',
        category: record.category || '',
        item: record.item || '',
        rate: record.rate || null,
        rateUnit: record.rateUnit || '',
        costClass: record.costClass || '',
        quantity: record.quantity || null,
        duration: record.duration || null,
        durationUnit: record.durationUnit || '',
        cost: record.cost || null,
        // projectId field removed
      }
    });
  }
  
  // Seed items
  console.log(`Seeding ${itemSheet.records.length} items...`);
  for (const record of itemSheet.records) {
    // Find the area ID for this item
    const areaId = areaIdsByModelKey.get(record['preconArea.modelKey']);
    
    await prisma.vectorItem.create({
      data: {
        modelKey: record.modelKey || '',
        version: record.version || 1,
        preconAreaModelKey: record['preconArea.modelKey'] || '',
        preconAreaVersion: record['preconArea.version'] || 1,
        subtotal: record.Subtotal || null,
        breakoutTrade: record['Breakout Trade'] || '',
        breakoutGroup: record['Breakout Group'] || '',
        equipmentTag: record['Equipment Tag'] || '',
        item: record.Item || '',
        className: record.className || '',
        unit: record.Unit || '',
        quantity: record.Qty || null,
        materialCost: record.materialCost || null,
        fieldLabor: record['Field Labor'] || null,
        salesTax: record.salesTax || null,
        indirects: record.indirects || null,
        fieldLaborCost: record.fieldLaborCost || null,
        area: record.Area || '',
        shopLabor: record['Shop Labor'] || null,
        shopLaborCost: record.shopLaborCost || null,
        equipmentCost: record.equipmentCost || null,
        capacity: record.Capacity || null,
        contingency: record.contingency || null,
        escMaterialCost: record['Esc Material Cost'] || null,
        escEquipmentCost: record['Esc Equipment Cost'] || null,
        trade1: record.Trade1 || '',
        breakout: record.Breakout || '',
        system: record.System || '',
        tradeGroup: record['Trade (group)'] || '',
        tag: record.Tag || '',
        trade: record.Trade || '',
        // areaId field removed
      }
    });
  }
  
  console.log('Vector pricing data seeded successfully!');
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