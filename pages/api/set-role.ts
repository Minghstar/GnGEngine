import { NextApiRequest, NextApiResponse } from 'next';
import { requireSession } from '@clerk/nextjs/api';
import { clerkClient } from '@clerk/nextjs/server';

export default requireSession(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { userId } = req.auth;
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