import { useRouter } from 'next/router';
import { useUser, useAuth } from '@clerk/nextjs';
import { useState } from 'react';

export default function SelectRolePage() {
  const router = useRouter();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSelect = async (role: 'athlete' | 'follower') => {
    if (!user) return;
    setLoading(true);
    try {
      const token = await getToken();
      await fetch('/api/set-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role })
      });
      if (role === 'athlete') {
        router.push('/claim');
      } else {
        router.push('/results');
      }
    } catch (e) {
      alert('Failed to set role.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary to-accent">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Select Your Role</h1>
        <div className="space-y-4">
          <button
            className="w-full py-3 rounded-lg bg-accent text-white font-semibold text-lg hover:bg-accent/90 transition"
            onClick={() => handleSelect('athlete')}
            disabled={loading}
          >
            👤 Athlete — I'm a current or future college athlete
          </button>
          <button
            className="w-full py-3 rounded-lg bg-primary text-white font-semibold text-lg hover:bg-primary/90 transition"
            onClick={() => handleSelect('follower')}
            disabled={loading}
          >
            👀 Follower — I just want to explore and follow athletes
          </button>
        </div>
      </div>
    </div>
  );
} 