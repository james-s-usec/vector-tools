#!/usr/bin/env node

/**
 * Test Survey Submission Script
 * 
 * This script tests the survey submission functionality by making direct API calls
 * to the backend. It helps diagnose issues with the survey submission process.
 * 
 * Usage:
 *   node scripts/test-survey-submission.js
 */

import axios from 'axios';

// Configuration
const API_URL = 'http://localhost:3004/api'; // Backend API is on port 3004
const EQUIPMENT_ID = 733; // Replace with a valid equipment ID from your database
const TEMPLATE_ID = 2; // Replace with a valid template ID from your database

// Test data for survey submission
const testSurveyData = {
  preparedBy: 'Test Script',
  surveyDate: new Date().toISOString().split('T')[0],
  templateId: TEMPLATE_ID,
  surveyData: {
    tag: 'TEST-TAG',
    location: 'Test Location',
    year: '2025',
    manufacturer: 'Test Manufacturer',
    modelNumber: 'TEST-MODEL',
    serialNumber: 'TEST-SERIAL',
    generalSystemCondition: 'GOOD',
    unitOperating: 'YES',
    boilerType: 'NATURAL DRAFT',
    fuelType: 'NATURAL GAS'
  }
};

// Test variations to try
const testVariations = [
  {
    name: 'Standard submission',
    data: { ...testSurveyData }
  },
  {
    name: 'With equipmentId in data',
    data: { 
      ...testSurveyData,
      equipmentId: EQUIPMENT_ID
    }
  },
  {
    name: 'With date as ISO string',
    data: { 
      ...testSurveyData,
      surveyDate: new Date().toISOString()
    }
  },
  {
    name: 'With date as Date object',
    data: { 
      ...testSurveyData,
      surveyDate: new Date()
    }
  },
  {
    name: 'With surveyData as top-level fields',
    data: { 
      preparedBy: 'Test Script',
      surveyDate: new Date().toISOString().split('T')[0],
      templateId: TEMPLATE_ID,
      tag: 'TEST-TAG',
      location: 'Test Location',
      year: '2025',
      manufacturer: 'Test Manufacturer',
      modelNumber: 'TEST-MODEL',
      serialNumber: 'TEST-SERIAL',
      generalSystemCondition: 'GOOD',
      unitOperating: 'YES',
      boilerType: 'NATURAL DRAFT',
      fuelType: 'NATURAL GAS'
    }
  }
];

/**
 * Test a survey submission
 * @param {string} name - Test name
 * @param {object} data - Survey data to submit
 */
async function testSubmission(name, data) {
  console.log(`\n=== Testing: ${name} ===`);
  console.log('Request data:', JSON.stringify(data, null, 2));
  
  try {
    const response = await axios.post(`${API_URL}/surveys/equipment/${EQUIPMENT_ID}`, data);
    console.log('✅ SUCCESS!');
    console.log('Status:', response.status);
    console.log('Response data:', JSON.stringify(response.data, null, 2));
    return { success: true, data: response.data };
  } catch (error) {
    console.log('❌ ERROR!');
    console.log('Status:', error.response?.status || 'Unknown');
    console.log('Error message:', error.message);
    
    if (error.response?.data) {
      console.log('Response data:', JSON.stringify(error.response.data, null, 2));
      
      // Log validation errors in detail
      if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
        console.log('Validation errors:');
        error.response.data.errors.forEach((err, index) => {
          console.log(`Error ${index + 1}:`, err);
        });
      }
    }
    
    return { success: false, error };
  }
}

/**
 * Run all tests
 */
async function runTests() {
  console.log('🔍 SURVEY SUBMISSION TEST SCRIPT');
  console.log('================================');
  console.log(`API URL: ${API_URL}`);
  console.log(`Equipment ID: ${EQUIPMENT_ID}`);
  console.log(`Template ID: ${TEMPLATE_ID}`);
  console.log('================================');
  
  const results = [];
  
  for (const test of testVariations) {
    const result = await testSubmission(test.name, test.data);
    results.push({ name: test.name, result });
    
    // If we found a successful approach, we can stop
    if (result.success) {
      console.log(`\n✅ Found a working submission method: "${test.name}"`);
      console.log('Use this data structure in your application:');
      console.log(JSON.stringify(test.data, null, 2));
      break;
    }
  }
  
  // If all tests failed, provide a summary
  if (!results.some(r => r.result.success)) {
    console.log('\n❌ All test variations failed.');
    console.log('Common issues:');
    console.log('1. Backend server not running');
    console.log('2. Invalid equipment ID or template ID');
    console.log('3. Missing required fields in the survey data');
    console.log('4. Date format issues');
    console.log('5. Field name mismatches between frontend and backend');
  }
}

// Run the tests
runTests().catch(error => {
  console.error('Script error:', error);
  process.exit(1);
});