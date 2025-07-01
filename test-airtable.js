#!/usr/bin/env node

// Load environment variables manually for testing
require('dotenv').config({ path: '.env.local' });

const axios = require('axios');

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

console.log('🔍 Testing Airtable Connection\n');

console.log('📋 Credentials:');
console.log(`API Key: ${AIRTABLE_API_KEY ? '✅ Found' : '❌ Missing'}`);
console.log(`Base ID: ${AIRTABLE_BASE_ID ? '✅ Found' : '❌ Missing'}`);

if (AIRTABLE_API_KEY && AIRTABLE_BASE_ID) {
  console.log(`\n🔗 Testing connection to: https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Athletes`);
  
  const testApi = axios.create({
    baseURL: `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`,
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  testApi.get('/Athletes')
    .then(response => {
      console.log('✅ Connection successful!');
      console.log(`📊 Found ${response.data.records?.length || 0} athletes`);
      if (response.data.records && response.data.records.length > 0) {
        console.log('📝 Sample athlete:', response.data.records[0].fields.Name || 'Unknown');
      }
    })
    .catch(error => {
      console.log('❌ Connection failed:');
      if (error.response) {
        console.log(`   Status: ${error.response.status}`);
        console.log(`   Error: ${error.response.data.error || 'Unknown error'}`);
      } else {
        console.log(`   Error: ${error.message}`);
      }
    });
} else {
  console.log('\n❌ Missing credentials. Please check your .env.local file.');
} 