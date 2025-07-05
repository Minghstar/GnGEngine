import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Layout from '../../../components/Layout';
import Button from '../../../components/Button';
import ProtectedRoute from '../../../components/ProtectedRoute';
import { fetchAthleteById, Athlete } from '../../../utils/airtable';
import { 
  getDisplayName, 
  getDisplayCollege, 
  getDisplaySport, 
  getDisplayYear, 
  getDisplayHometown 
} from '../../../utils/athleteValidation';

interface EditProfileProps {
  athlete: Athlete | null;
}

export default function EditProfile({ athlete }: EditProfileProps) {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    sport: '',
    year: '',
    hometown: '',
    college: '',
    highSchool: '',
    nationality: '',
    image: ''
  });

  // Check if user is the owner
  const userIsOwner = 
    user?.publicMetadata?.role === "athlete" &&
    athlete?.claimedStatus === "Claimed" &&
    user?.primaryEmailAddress?.emailAddress === athlete?.claimedByEmail;

  useEffect(() => {
    if (athlete) {
      setFormData({
        name: athlete.name || '',
        sport: athlete.sport || '',
        year: athlete.year || '',
        hometown: athlete.hometown || '',
        college: athlete.college || '',
        highSchool: athlete.highSchool || '',
        nationality: athlete.nationality || '',
        image: athlete.image || ''
      });
    }
  }, [athlete]);

  // Redirect if not owner
  useEffect(() => {
    if (user && athlete && !userIsOwner) {
      router.replace(`/profile/${athlete.id}`);
    }
  }, [user, athlete, userIsOwner, router]);

  if (!userIsOwner || !athlete) {
    return (
      <Layout title="Access Denied - GNG Engine">
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-4">You don't have permission to edit this profile.</p>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/update-athlete/${athlete.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push(`/profile/${athlete.id}`);
      } else {
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute requiredRole="athlete">
      <Layout 
        title={`Edit ${getDisplayName(athlete.name)} - GNG Engine`}
        description={`Edit profile information for ${getDisplayName(athlete.name)}`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <Button 
            onClick={() => router.back()}
            variant="secondary"
            className="mb-4"
          >
            ← Back to Profile
          </Button>
          <h1 className="text-3xl font-bold text-text mb-2">Edit Profile</h1>
          <p className="text-gray-600">Update your athlete information</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-text mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="sport" className="block text-sm font-semibold text-text mb-2">
                  Sport *
                </label>
                <input
                  type="text"
                  id="sport"
                  name="sport"
                  value={formData.sport}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="college" className="block text-sm font-semibold text-text mb-2">
                  College/University *
                </label>
                <input
                  type="text"
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-semibold text-text mb-2">
                  Class Year *
                </label>
                <input
                  type="text"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="e.g., 2024, Junior, Senior"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="hometown" className="block text-sm font-semibold text-text mb-2">
                  Hometown *
                </label>
                <input
                  type="text"
                  id="hometown"
                  name="hometown"
                  value={formData.hometown}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="nationality" className="block text-sm font-semibold text-text mb-2">
                  Nationality
                </label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  placeholder="e.g., Australian"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>

            {/* High School */}
            <div>
              <label htmlFor="highSchool" className="block text-sm font-semibold text-text mb-2">
                High School
              </label>
              <input
                type="text"
                id="highSchool"
                name="highSchool"
                value={formData.highSchool}
                onChange={handleInputChange}
                placeholder="Your high school name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            {/* Profile Image */}
            <div>
              <label htmlFor="image" className="block text-sm font-semibold text-text mb-2">
                Profile Image URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              {formData.image && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
                    <Image
                      src={formData.image}
                      alt="Profile preview"
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id as string;
    const athlete = await fetchAthleteById(id);

    return {
      props: {
        athlete,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching athlete for edit page:', error);
    return {
      props: {
        athlete: null,
      },
      revalidate: 3600,
    };
  }
}; 