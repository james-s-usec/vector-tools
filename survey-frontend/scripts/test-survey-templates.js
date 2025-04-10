// Test script to verify survey templates have been properly updated
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the survey templates
const templatesPath = path.join(__dirname, '../backend/prisma/survey-templates.ts');
let templateContent = fs.readFileSync(templatesPath, 'utf8');

console.log('=== SURVEY TEMPLATES TEST ===');
console.log('Loading survey templates from:', templatesPath);

// Extract the templates array from the file
// This is a simple approach - in a real scenario, you might want to use a TypeScript parser
const templatesMatch = templateContent.match(/export const surveyTemplates = \[([\s\S]*?)\];/);
if (!templatesMatch) {
  console.error('Could not find survey templates in the file');
  process.exit(1);
}

// Log the raw content of the templates
console.log('\n=== RAW TEMPLATE CONTENT ===');
console.log('First 500 characters of template content:');
console.log(templatesMatch[1].substring(0, 500) + '...');

// Log specific sections to check for our added fields
console.log('\n=== CHECKING FOR ADDED FIELDS ===');

// Check for AHU fields
console.log('\n--- AHU Template ---');
const ahuHeatingCoilMatch = templateContent.match(/heatingCoilData: \{([\s\S]*?)\}/);
if (ahuHeatingCoilMatch) {
  console.log('✅ Found heatingCoilData field in AHU template');
  console.log('First 200 characters:');
  console.log(ahuHeatingCoilMatch[0].substring(0, 200) + '...');
} else {
  console.log('❌ Could not find heatingCoilData field in AHU template');
}

const ahuCoolingCoilMatch = templateContent.match(/coolingCoilData: \{([\s\S]*?)\}/);
if (ahuCoolingCoilMatch) {
  console.log('✅ Found coolingCoilData field in AHU template');
} else {
  console.log('❌ Could not find coolingCoilData field in AHU template');
}

const ahuSupplyFanMatch = templateContent.match(/supplyFanData: \{([\s\S]*?)\}/);
if (ahuSupplyFanMatch) {
  console.log('✅ Found supplyFanData field in AHU template');
} else {
  console.log('❌ Could not find supplyFanData field in AHU template');
}

const ahuOutsideAirMatch = templateContent.match(/outsideAirControl: \{([\s\S]*?)\}/);
if (ahuOutsideAirMatch) {
  console.log('✅ Found outsideAirControl field in AHU template');
} else {
  console.log('❌ Could not find outsideAirControl field in AHU template');
}

// Check for Boiler fields
console.log('\n--- Boiler Template ---');
const boilerDesignMatch = templateContent.match(/designInformation: \{([\s\S]*?)\}/);
if (boilerDesignMatch) {
  console.log('✅ Found designInformation field in Boiler template');
} else {
  console.log('❌ Could not find designInformation field in Boiler template');
}

const boilerCombustionMatch = templateContent.match(/combustionInformation: \{([\s\S]*?)\}/);
if (boilerCombustionMatch) {
  console.log('✅ Found combustionInformation field in Boiler template');
} else {
  console.log('❌ Could not find combustionInformation field in Boiler template');
}

const boilerBurnerMatch = templateContent.match(/burnerNameplateData: \{([\s\S]*?)\}/);
if (boilerBurnerMatch) {
  console.log('✅ Found burnerNameplateData field in Boiler template');
} else {
  console.log('❌ Could not find burnerNameplateData field in Boiler template');
}

// Check for Chiller fields
console.log('\n--- Chiller Template ---');
const chillerTypeMatch = templateContent.match(/chillerType: \{([\s\S]*?)\}/);
if (chillerTypeMatch) {
  console.log('✅ Found chillerType field in Chiller template');
} else {
  console.log('❌ Could not find chillerType field in Chiller template');
}

const chillerVariableSpeedMatch = templateContent.match(/variableSpeed: \{([\s\S]*?)\}/);
if (chillerVariableSpeedMatch) {
  console.log('✅ Found variableSpeed field in Chiller template');
} else {
  console.log('❌ Could not find variableSpeed field in Chiller template');
}

// Check for Pump fields
console.log('\n--- Pump Template ---');
const pumpRpmMatch = templateContent.match(/rpm: \{([\s\S]*?)\}/);
if (pumpRpmMatch) {
  console.log('✅ Found rpm field in Pump template');
} else {
  console.log('❌ Could not find rpm field in Pump template');
}

const pumpControlOnMatch = templateContent.match(/controlOn: \{([\s\S]*?)\}/);
if (pumpControlOnMatch) {
  console.log('✅ Found controlOn field in Pump template');
} else {
  console.log('❌ Could not find controlOn field in Pump template');
}

const pumpDpMatch = templateContent.match(/dpSetpointReset: \{([\s\S]*?)\}/);
if (pumpDpMatch) {
  console.log('✅ Found dpSetpointReset field in Pump template');
} else {
  console.log('❌ Could not find dpSetpointReset field in Pump template');
}

// Example of how to use the templates in a form
console.log('\n\n=== EXAMPLE USAGE IN FORM ===');
console.log(`
// Example of how to render the AHU Heating Coil Data in a form component
function renderHeatingCoilData(template) {
  // Check if the template has the heatingCoilData field
  if (!template.specificFields.heatingCoilData) {
    console.log('Heating Coil Data not found in template');
    return null;
  }
  
  const heatingCoilData = template.specificFields.heatingCoilData;
  
  return (
    <div className="heating-coil-section">
      <h3>{heatingCoilData.label}</h3>
      
      <div className="form-group">
        <label>{heatingCoilData.fields.coilType.label}</label>
        <select name="heatingCoilData.coilType" required={heatingCoilData.fields.coilType.validation.required}>
          {heatingCoilData.fields.coilType.options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label>{heatingCoilData.fields.valveType.label}</label>
        <select name="heatingCoilData.valveType" required={heatingCoilData.fields.valveType.validation.required}>
          {heatingCoilData.fields.valveType.options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label>{heatingCoilData.fields.inputOutput.label}</label>
        <input 
          type="text" 
          name="heatingCoilData.inputOutput" 
          required={heatingCoilData.fields.inputOutput.validation.required} 
        />
      </div>
      
      <div className="form-group">
        <label>{heatingCoilData.fields.pipingInsulated.label}</label>
        <div className="radio-group">
          {heatingCoilData.fields.pipingInsulated.options.map(option => (
            <label key={option.value}>
              <input 
                type="radio" 
                name="heatingCoilData.pipingInsulated" 
                value={option.value} 
                required={heatingCoilData.fields.pipingInsulated.validation.required} 
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
`);

console.log('\n=== END TEST ===');