import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Athlete } from '../utils/airtable';
import { 
  validateAthlete, 
  getDisplayName, 
  getDisplayCollege, 
  getDisplayHometown, 
  getDisplaySport, 
  getDisplayYear, 
  getFallbackValue,
  getInitials,
  shouldShowLowResBadge 
} from '../utils/athleteValidation';
import Button from './Button';

interface AthleteCardProps {
  athlete: Athlete;
}

// Helper to get flag emoji from nationality string
function getFlagEmoji(nationality: string) {
  if (!nationality) return '🇦🇺';
  if (nationality.toLowerCase().includes('austral')) return '🇦🇺';
  if (nationality.toLowerCase().includes('new zealand')) return '🇳🇿';
  // Add more as needed
  return '🏳️';
}

const AthleteCard = ({ athlete }: AthleteCardProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  
  // Conditional rendering logic - don't render if missing critical data
  if (!athlete.name && !athlete.image) {
    return null;
  }
  
  // Validate athlete data
  const validatedAthlete = validateAthlete(athlete);
  
  // Don't render if athlete is missing critical data
  if (!validatedAthlete.isValid) {
    return null;
  }
  
  // Get fallback values for missing data with improved messaging
  const displayName = getDisplayName(athlete.name);
  const displayCollege = getDisplayCollege(athlete.college);
  const displaySport = getDisplaySport(athlete.sport);
  const displayYear = getDisplayYear(athlete.year);
  const displayHometown = getDisplayHometown(athlete.hometown);
  const displayNationality = getFallbackValue(athlete.nationality, 'Australian');
  
  // Get initials for fallback avatar
  const initials = getInitials(displayName);
  
  // Check if image is low resolution
  const showLowResBadge = shouldShowLowResBadge(athlete.image);
  
  return (
    <motion.div 
      ref={ref}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      {/* Image Section - Fixed aspect ratio with max dimensions */}
      <div className="relative w-full h-64 bg-background max-w-[250px] max-h-[250px] mx-auto">
        {athlete.image ? (
          <Image
            src={athlete.image}
            alt={`${displayName} - ${displaySport} athlete`}
            fill
            className="object-cover rounded-t-2xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            onError={(e) => {
              // Fallback to initials if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const fallbackDiv = parent.querySelector('.fallback-avatar') as HTMLElement;
                if (fallbackDiv) {
                  fallbackDiv.style.display = 'flex';
                }
              }
            }}
          />
        ) : null}
        
        {/* Fallback Avatar - Always present but hidden when image loads */}
        <div 
          className={`fallback-avatar w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 ${athlete.image ? 'hidden' : ''}`}
        >
          <div className="text-white text-5xl font-bold font-heading">
            {initials}
          </div>
        </div>
        
        {/* Sport Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold font-heading shadow">
            {displaySport}
          </span>
        </div>
        
        {/* Verified Badge - Show for athletes with complete profiles */}
        {athlete.image && athlete.name && athlete.college && (
          <div className="absolute top-3 left-3">
            <motion.span 
              className="bg-accent/20 text-accent text-xs px-2 py-1 rounded-full font-semibold shadow relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: 'easeInOut'
                }}
              />
              Verified
            </motion.span>
          </div>
        )}
        
        {/* Low Res Badge */}
        {showLowResBadge && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-accent text-white px-2 py-1 rounded-full text-xs font-bold font-heading shadow">
              Low Res
            </span>
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg font-bold text-text font-heading flex-1 truncate">
            {displayName}
          </h3>
          <span className="text-xl" title={displayNationality}>
            {getFlagEmoji(displayNationality)}
          </span>
        </div>
        
        <div className="space-y-1 text-sm text-gray-600 font-body mb-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
            <span className="truncate">{displayCollege}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-accent rounded-full"></span>
            <span>Year {displayYear}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
            <span className="truncate">{displayHometown}</span>
          </div>
        </div>
        
        <div className="mt-auto pt-2">
          <Link href={`/profile/${athlete.id}`} legacyBehavior>
            <a>
              <Button variant="primary" className="w-full">View Profile</Button>
            </a>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default AthleteCard; 