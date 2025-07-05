import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth, clerkClient } from '@clerk/nextjs/server';
import { fetchAthleteById } from '../../../utils/airtable';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT || process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE;
const AIRTABLE_TABLE_NAME = 'Athletes';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = await getAuth(req);
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const { id } = req.query;
    const updateData = req.body;

    // Fetch the athlete to check ownership
    const athlete = await fetchAthleteById(id as string);
    if (!athlete) {
      return res.status(404).json({ error: 'Athlete not found' });
    }

    // Get user details from Clerk
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const userEmail = user.primaryEmailAddress?.emailAddress;

    // Check if user is the owner
    const userIsOwner = 
      user.publicMetadata?.role === "athlete" &&
      athlete.claimedStatus === "Claimed" &&
      userEmail === athlete.claimedByEmail;

    if (!userIsOwner) {
      return res.status(403).json({ error: 'Access denied. You can only edit your own profile.' });
    }

    // Update the athlete record in Airtable
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          Name: updateData.name,
          Sport: updateData.sport,
          Year: updateData.year,
          Hometown: updateData.hometown,
          College: updateData.college,
          HighSchool: updateData.highSchool || '',
          Nationality: updateData.nationality || 'Australian',
          Image: updateData.image ? [{ url: updateData.image }] : [],
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Airtable update error:', errorData);
      return res.status(500).json({ error: 'Failed to update athlete record' });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Profile updated successfully' 
    });

  } catch (error) {
    console.error('Error updating athlete:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}