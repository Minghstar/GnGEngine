#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 GNG Engine Environment Setup\n');

// Check if .env.local already exists
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ .env.local file already exists');
  console.log('📝 Please make sure your Airtable credentials are properly set:');
  console.log('   - AIRTABLE_API_KEY=your_airtable_api_key_here');
  console.log('   - AIRTABLE_BASE_ID=your_airtable_base_id_here\n');
} else {
  // Create .env.local from example
  const examplePath = path.join(__dirname, 'env.example');
  if (fs.existsSync(examplePath)) {
    fs.copyFileSync(examplePath, envPath);
    console.log('✅ Created .env.local file from env.example');
    console.log('📝 Please edit .env.local and add your Airtable credentials:\n');
    console.log('   1. Get your Airtable API Key from: https://airtable.com/account');
    console.log('   2. Get your Base ID from your Airtable base URL');
    console.log('   3. Update the values in .env.local\n');
  } else {
    console.log('❌ env.example file not found');
    console.log('📝 Please create .env.local manually with:');
    console.log('   AIRTABLE_API_KEY=your_airtable_api_key_here');
    console.log('   AIRTABLE_BASE_ID=your_airtable_base_id_here\n');
  }
}

console.log('🔗 Useful Links:');
console.log('   - Airtable API Documentation: https://airtable.com/developers/web/api/introduction');
console.log('   - How to find Base ID: https://support.airtable.com/docs/finding-airtable-ids');
console.log('   - How to get API Key: https://support.airtable.com/docs/creating-and-using-api-keys\n');

console.log('🎯 Next Steps:');
console.log('   1. Add your Airtable credentials to .env.local');
console.log('   2. Restart the development server: npm run dev');
console.log('   3. Visit http://localhost:3000 to see your site!\n'); 