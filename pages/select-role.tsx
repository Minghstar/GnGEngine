import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

export default function SelectRole() {
  const [selectedRole, setSelectedRole] = useState<'athlete' | 'follower' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  // If user already has a role, redirect them
  if (user?.publicMetadata?.role) {
    if (user.publicMetadata.role === 'athlete') {
      // Check if athlete has claimed profile
      checkAthleteProfile();
    } else {
      router.push('/results');
    }
    return null;
  }

  const checkAthleteProfile = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      router.push('/claim-profile');
      return;
    }
    
    try {
      const response = await fetch(`/api/search-athletes?claimedBy=${encodeURIComponent(user.primaryEmailAddress.emailAddress)}`);
      const data = await response.json();
      
      if (data.success && data.athletes.length > 0) {
        // User has claimed a profile - redirect to it
        const claimedProfile = data.athletes[0];
        router.push(`/profile/${claimedProfile.id}`);
      } else {
        // No claimed profile - redirect to claim page
        router.push('/claim-profile');
      }
    } catch (error) {
      console.error('Error checking athlete profile:', error);
      // Fallback to claim page
      router.push('/claim-profile');
    }
  };

  const handleRoleSelect = async (role: 'athlete' | 'follower') => {
    setSelectedRole(role);
    setIsLoading(true);

    try {
      const response = await fetch('/api/set-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      });

      if (response.ok) {
        // Redirect based on role
        if (role === 'athlete') {
          // Check if athlete has claimed profile
          await checkAthleteProfile();
        } else {
          router.push('/results');
        }
      } else {
        console.error('Failed to set role');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error setting role:', error);
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to GNG Engine
              </h1>
              <p className="text-gray-600">
                Choose how you'd like to use the platform
              </p>
            </motion.div>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRoleSelect('athlete')}
                disabled={isLoading}
                className={`w-full p-6 rounded-xl border-2 transition-all duration-200 ${
                  selectedRole === 'athlete'
                    ? 'border-accent bg-accent/10'
                    : 'border-gray-200 hover:border-accent/50'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    🏃‍♂️ I'm an Athlete
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Claim your profile, update your information, and showcase your achievements
                  </p>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRoleSelect('follower')}
                disabled={isLoading}
                className={`w-full p-6 rounded-xl border-2 transition-all duration-200 ${
                  selectedRole === 'follower'
                    ? 'border-accent bg-accent/10'
                    : 'border-gray-200 hover:border-accent/50'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    👀 I'm a Follower
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Discover athletes, follow their progress, and stay updated on college sports
                  </p>
                </div>
              </motion.button>
            </div>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 text-center"
              >
                <div className="inline-flex items-center text-accent">
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Setting up your experience...
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
} 