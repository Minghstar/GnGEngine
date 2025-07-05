import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT || process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE;
const AIRTABLE_TABLE_NAME = 'Athletes';

const airtableApi = axios.create({
  baseURL: `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`,
  headers: {
    'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { athleteId, verificationData } = req.body;

    if (!athleteId) {
      return res.status(400).json({ error: 'Athlete ID is required' });
    }

    // Update the athlete record with verification data
    const updateData = {
      fields: {
        IsVerified: true,
        VerifiedAt: new Date().toISOString(),
        VerifiedBy: verificationData?.verifiedBy || 'Self',
        // Add any additional verification fields
        VerificationMethod: verificationData?.method || 'Email',
        VerificationNotes: verificationData?.notes || '',
      }
    };

    const response = await airtableApi.patch(
      `/${AIRTABLE_TABLE_NAME}/${athleteId}`,
      updateData
    );

    if (response.status === 200) {
      return res.status(200).json({ 
        success: true, 
        message: 'Athlete verified successfully',
        verifiedAt: updateData.fields.VerifiedAt
      });
    } else {
      return res.status(500).json({ error: 'Failed to verify athlete' });
    }

  } catch (error) {
    console.error('Error verifying athlete:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 