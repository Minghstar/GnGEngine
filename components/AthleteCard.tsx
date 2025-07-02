import Image from 'next/image';
import Link from 'next/link';
import { Athlete } from '../utils/airtable';
import { validateAthlete, getFallbackValue, getInitials } from '../utils/athleteValidation';
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
  // Validate athlete data
  const validatedAthlete = validateAthlete(athlete);
  
  // Don't render if athlete is missing critical data
  if (!validatedAthlete.isValid) {
    return null;
  }
  
  // Get fallback values for missing data
  const displayName = getFallbackValue(athlete.name, 'Unnamed Athlete');
  const displayCollege = getFallbackValue(athlete.college, 'Unknown College');
  const displaySport = getFallbackValue(athlete.sport, 'Unknown Sport');
  const displayYear = getFallbackValue(athlete.year, 'Unknown Year');
  const displayHometown = getFallbackValue(athlete.hometown, 'Unknown Location');
  const displayNationality = getFallbackValue(athlete.nationality, 'Australian');
  
  // Get initials for fallback avatar
  const initials = getInitials(displayName);
  
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col border border-light-gray">
      {/* Image Section - Fixed aspect ratio */}
      <div className="relative w-full h-64 bg-background">
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
          className={`fallback-avatar w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-red to-accent-blue ${athlete.image ? 'hidden' : ''}`}
        >
          <div className="text-white text-5xl font-bold font-heading">
            {initials}
          </div>
        </div>
        
        {/* Sport Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-accent text-background px-3 py-1 rounded-full text-xs font-bold font-heading shadow">
            {displaySport}
          </span>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg font-bold text-charcoal font-heading flex-1 truncate">
            {displayName}
          </h3>
          <span className="text-xl" title={displayNationality}>
            {getFlagEmoji(displayNationality)}
          </span>
        </div>
        
        <div className="space-y-1 text-sm text-text-secondary font-body mb-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-highlight rounded-full"></span>
            <span className="truncate">{displayCollege}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-accent rounded-full"></span>
            <span>Year {displayYear}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-highlight rounded-full"></span>
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
    </div>
  );
};

export default AthleteCard; 