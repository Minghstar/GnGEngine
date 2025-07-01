#!/usr/bin/env node

console.log('🔍 Environment Variable Test\n');

// Test different possible variable names
const possibleApiKeys = [
  'AIRTABLE_API_KEY',
  'AIRTABLE_PAT', 
  'AIRTABLE_TOKEN'
];

const possibleBaseIds = [
  'AIRTABLE_BASE_ID',
  'AIRTABLE_BASE'
];

console.log('📋 Checking API Key variables:');
possibleApiKeys.forEach(key => {
  const value = process.env[key];
  console.log(`  ${key}: ${value ? '✅ Found' : '❌ Not found'}`);
  if (value) {
    console.log(`    Starts with: ${value.substring(0, 10)}...`);
    console.log(`    Length: ${value.length} characters`);
  }
});

console.log('\n📋 Checking Base ID variables:');
possibleBaseIds.forEach(key => {
  const value = process.env[key];
  console.log(`  ${key}: ${value ? '✅ Found' : '❌ Not found'}`);
  if (value) {
    console.log(`    Starts with: ${value.substring(0, 10)}...`);
    console.log(`    Length: ${value.length} characters`);
  }
});

console.log('\n📝 Expected .env.local format:');
console.log('AIRTABLE_API_KEY=pat_your_token_here');
console.log('AIRTABLE_BASE_ID=app_your_base_id_here');
console.log('\n⚠️  Make sure:');
console.log('  - No spaces around = sign');
console.log('  - No quotes around values');
console.log('  - No trailing spaces');
console.log('  - File is saved and server restarted'); 