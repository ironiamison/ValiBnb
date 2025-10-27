/**
 * Example script to test the BNB X402 Validator endpoints
 * 
 * Usage:
 *   node examples/test-endpoints.js [baseUrl]
 * 
 * Example:
 *   node examples/test-endpoints.js http://localhost:3000
 */

const BASE_URL = process.argv[2] || 'http://localhost:3000';

async function testEndpoint(name, method, path, body = null) {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`Testing: ${method} ${path}`);
  console.log('='.repeat(50));

  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${path}`, options);
    const data = await response.json();

    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log('Response:', JSON.stringify(data, null, 2));

    return { success: response.ok, data };
  } catch (error) {
    console.error('Error:', error.message);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('BNB X402 Validator API Tests');
  console.log(`Base URL: ${BASE_URL}`);

  // Test health endpoint
  await testEndpoint('Health Check', 'GET', '/health');

  // Test supported endpoint
  await testEndpoint('Supported Payment Types', 'GET', '/supported');

  // Test root endpoint
  await testEndpoint('Root Endpoint', 'GET', '/');

  // Example: Test verification endpoint (this will fail without a real transaction)
  console.log('\n' + '='.repeat(50));
  console.log('Note: Replace with actual transaction hash to test verification');
  console.log('='.repeat(50));
  
  await testEndpoint('Verify Payment (Example)', 'POST', '/verify', {
    transactionHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    fromAddress: '0x1234567890123456789012345678901234567890',
    toAddress: '0x0987654321098765432109876543210987654321',
    expectedAmount: '0.1',
    currency: 'BNB'
  });

  console.log('\n' + '◇'.repeat(50));
  console.log('Tests completed!');
  console.log('◇'.repeat(50));
}

// Run tests if this script is executed directly
if (typeof require !== 'undefined' && require.main === module) {
  // Check if fetch is available (Node.js 18+)
  if (typeof fetch === 'undefined') {
    console.error('This script requires Node.js 18+ or the node-fetch package');
    console.error('Install dependencies: npm install node-fetch@2');
    process.exit(1);
  }

  runTests().catch(console.error);
}

module.exports = { testEndpoint, runTests };

