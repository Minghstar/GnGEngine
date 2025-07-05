import { NextApiRequest, NextApiResponse } from 'next';
import { createClaimRecord, fetchAthleteById } from '../../utils/airtable';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { athleteId, athleteName, fullName, email, socialMedia, explanation } = req.body;

    if (!athleteId || !fullName || !email || !explanation) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Fetch athlete details to get college and sport
    const athlete = await fetchAthleteById(athleteId);
    if (!athlete) {
      return res.status(404).json({ error: 'Athlete not found' });
    }

    // Create claim record in Airtable
    const claimData = {
      athleteName: athleteName,
      claimedByName: fullName,
      email: email,
      college: athlete.college,
      sport: athlete.sport,
      socialMedia: socialMedia || '',
      explanation: explanation,
      athleteRecordId: athleteId
    };

    const success = await createClaimRecord(claimData);

    if (success) {
      return res.status(200).json({ 
        success: true, 
        message: 'Claim request submitted successfully',
        claimId: `claim_${Date.now()}`
      });
    } else {
      return res.status(500).json({ error: 'Failed to create claim record' });
    }

  } catch (error) {
    console.error('Error processing claim request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 