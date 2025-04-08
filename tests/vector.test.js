/**
 * Vector Tests
 * 
 * Basic tests for the Vector class functionality.
 */

const { Vector } = require('../src/index');

// Test vector creation
function testVectorCreation() {
  const v = new Vector(1, 2, 3);
  console.assert(v.x === 1, 'X coordinate should be 1');
  console.assert(v.y === 2, 'Y coordinate should be 2');
  console.assert(v.z === 3, 'Z coordinate should be 3');
  console.log('Vector creation test passed');
}

// Test vector addition
function testVectorAddition() {
  const v1 = new Vector(1, 2, 3);
  const v2 = new Vector(4, 5, 6);
  const result = v1.add(v2);
  console.assert(result.x === 5, 'X coordinate should be 5');
  console.assert(result.y === 7, 'Y coordinate should be 7');
  console.assert(result.z === 9, 'Z coordinate should be 9');
  console.log('Vector addition test passed');
}

// Test vector subtraction
function testVectorSubtraction() {
  const v1 = new Vector(4, 5, 6);
  const v2 = new Vector(1, 2, 3);
  const result = v1.subtract(v2);
  console.assert(result.x === 3, 'X coordinate should be 3');
  console.assert(result.y === 3, 'Y coordinate should be 3');
  console.assert(result.z === 3, 'Z coordinate should be 3');
  console.log('Vector subtraction test passed');
}

// Test dot product
function testDotProduct() {
  const v1 = new Vector(1, 2, 3);
  const v2 = new Vector(4, 5, 6);
  const result = v1.dot(v2);
  console.assert(result === 32, 'Dot product should be 32');
  console.log('Dot product test passed');
}

// Run all tests
function runTests() {
  testVectorCreation();
  testVectorAddition();
  testVectorSubtraction();
  testDotProduct();
  console.log('All tests passed!');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = {
  runTests
};