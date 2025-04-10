// Simple test script for survey API
import fetch from 'node-fetch';

async function testSurveyApi() {
  try {
    console.log('Starting test for survey API...');
    
    // Replace with actual IDs from your database
    const equipmentId = 1;
    const templateId = 1;
    
    // Create test data in the format expected by the API
    const data = {
      preparedBy: 'Test User',
      surveyDate: new Date().toISOString().split('T')[0],
      templateId: templateId,
      equipmentId: equipmentId,
      surveyData: {
        // Regular fields
        tag: 'TEST-001',
        location: 'Test Location',
        unitOperating: 'YES',
        generalSystemCondition: 'GOOD',
        
        // Array fields
        surveyPhotos: [
          {
            photo: 'test-image.jpg',
            description: 'Test photo description',
            location: 'Test location'
          }
        ],
        surveyNotes: [
          {
            note: 'Test note content',
            category: 'GENERAL',
            priority: 'MEDIUM'
          }
        ],
        markups: [
          {
            markup: 'test-markup.pdf',
            title: 'Test markup',
            description: 'Test markup description'
          }
        ]
      }
    };
    
    console.log('Data to submit:', JSON.stringify(data, null, 2));
    
    // Submit the data
    console.log(`Submitting to API: /api/surveys/equipment/${equipmentId}`);
    const response = await fetch(`http://localhost:3000/api/surveys/equipment/${equipmentId}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Parse and log the response
    const result = await response.json();
    console.log('API Response:', JSON.stringify(result, null, 2));
    
    if (response.ok) {
      console.log('✅ Test passed! Survey submitted successfully.');
    } else {
      console.error('❌ Test failed! Survey submission returned an error.');
    }
    
    return result;
  } catch (error) {
    console.error('Error during test:', error);
    throw error;
  }
}

// Run the test
testSurveyApi()
  .then(() => console.log('Test completed.'))
  .catch(error => console.error('Test failed with error:', error));