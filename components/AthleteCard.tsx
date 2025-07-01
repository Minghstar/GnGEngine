import Image from 'next/image';
import Link from 'next/link';
import { Athlete } from '../utils/airtable';
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
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col border border-light-gray">
      {/* Image Section */}
      <div className="relative h-48 bg-background">
        {athlete.image ? (
          <Image
            src={athlete.image}
            alt={`${athlete.name} - ${athlete.sport}`}
            fill
            className="object-cover rounded-t-2xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-highlight to-accent">
            <div className="text-white text-4xl font-bold font-heading">
              {athlete.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
          </div>
        )}
        {/* Sport Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-accent text-background px-2 py-1 rounded-full text-xs font-bold font-heading shadow">
            {athlete.sport}
          </span>
        </div>
      </div>
      {/* Content Section */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg font-bold text-charcoal font-heading flex-1 truncate">
            {athlete.name}
          </h3>
          <span className="text-xl" title={athlete.nationality || 'Australian'}>
            {getFlagEmoji(athlete.nationality || 'Australian')}
          </span>
        </div>
        <div className="space-y-1 text-sm text-text-secondary font-body mb-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-highlight rounded-full"></span>
            <span className="truncate">{athlete.college}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-accent rounded-full"></span>
            <span>Year {athlete.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-highlight rounded-full"></span>
            <span className="truncate">{athlete.hometown}</span>
          </div>
        </div>
        <div className="mt-auto pt-2">
          <Link href={`/profile/${athlete.id}`} legacyBehavior>
            <a>
              <Button variant="primary" size="sm" className="w-full">View Profile</Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AthleteCard; 