import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { athleteId, athleteName, fullName, email, socialMedia, explanation } = req.body;

    if (!athleteId || !fullName || !email || !explanation) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Here you would typically:
    // 1. Send an email notification to your team
    // 2. Store the claim request in a database
    // 3. Send a confirmation email to the claimant
    // 4. Log the claim request for review

    // For now, we'll simulate a successful claim request
    console.log('Profile claim request:', {
      athleteId,
      athleteName,
      fullName,
      email,
      socialMedia,
      explanation,
      timestamp: new Date().toISOString()
    });

    // In a real implementation, you might:
    // - Send email to admin: `New profile claim for athlete ${athleteId}`
    // - Send email to claimant: `We've received your claim request`
    // - Store in database for review
    // - Create a ticket in your support system

    return res.status(200).json({ 
      success: true, 
      message: 'Claim request submitted successfully',
      claimId: `claim_${Date.now()}`
    });

  } catch (error) {
    console.error('Error processing claim request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 