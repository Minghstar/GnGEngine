import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { userId } = await getAuth(req);
  
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const { role } = req.body;
  if (!role || !['athlete', 'follower'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }
  try {
    await clerkClient.users.updateUser(userId, {
      publicMetadata: { role }
    });
    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to set role' });
  }
}); 