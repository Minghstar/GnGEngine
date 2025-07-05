import { NextApiRequest, NextApiResponse } from 'next';
import { fetchAthletes } from '../../utils/airtable';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { q, claimedBy } = req.query;

  // If searching by claimed email, don't require q parameter
  if (!q && !claimedBy) {
    return res.status(400).json({ success: false, message: 'Query parameter or claimedBy parameter is required' });
  }

  try {
    const athletes = await fetchAthletes();

    let filteredAthletes;

    if (claimedBy && typeof claimedBy === 'string') {
      // Search by claimed email
      const claimedEmail = claimedBy.toLowerCase().trim();
      filteredAthletes = athletes
        .filter(athlete => {
          const claimedByEmail = athlete.claimedByEmail?.toLowerCase() || '';
          return claimedByEmail === claimedEmail && athlete.claimedStatus === 'Claimed';
        })
        .map(athlete => ({
          id: athlete.id,
          name: athlete.name,
          college: athlete.college,
          sport: athlete.sport,
          image: athlete.image,
          claimedStatus: athlete.claimedStatus,
          claimedByEmail: athlete.claimedByEmail
        }));
    } else if (q && typeof q === 'string') {
      // Regular search by name, college, sport
      const query = q.toLowerCase().trim();
      filteredAthletes = athletes
        .filter(athlete => {
          const name = athlete.name?.toLowerCase() || '';
          const college = athlete.college?.toLowerCase() || '';
          const sport = athlete.sport?.toLowerCase() || '';
          
          return name.includes(query) || 
                 college.includes(query) || 
                 sport.includes(query);
        })
        .map(athlete => ({
          id: athlete.id,
          name: athlete.name,
          college: athlete.college,
          sport: athlete.sport,
          image: athlete.image
        }))
        .slice(0, 10); // Limit to 10 results for performance
    } else {
      filteredAthletes = [];
    }

    return res.status(200).json({
      success: true,
      athletes: filteredAthletes
    });
  } catch (error) {
    console.error('Error searching athletes:', error);
    return res.status(500).json({
      success: false,
      message: 'Error searching athletes'
    });
  }
} 