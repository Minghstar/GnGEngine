import Image from 'next/image';
import Link from 'next/link';
import { Athlete } from '../utils/airtable';

interface AthleteCardProps {
  athlete: Athlete;
}

const AthleteCard = ({ athlete }: AthleteCardProps) => {
  return (
    <Link href={`/profile/${athlete.id}`}>
      <div className="bg-dark-gray rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer group border border-light-gray">
        {/* Image Section */}
        <div className="relative h-48 bg-background">
          {athlete.image ? (
            <Image
              src={athlete.image}
              alt={`${athlete.name} - ${athlete.sport}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-2xl"
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
        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent font-heading transition-colors">
            {athlete.name}
          </h3>
          
          <div className="space-y-1 text-sm text-text-secondary font-body">
            <div className="flex items-center">
              <span className="inline-block w-2 h-2 bg-green-highlight rounded-full mr-2"></span>
              <span>{athlete.college}</span>
            </div>
            
            <div className="flex items-center">
              <span className="inline-block w-2 h-2 bg-accent rounded-full mr-2"></span>
              <span>Year {athlete.year}</span>
            </div>
            
            <div className="flex items-center">
              <span className="inline-block w-2 h-2 bg-green-highlight rounded-full mr-2"></span>
              <span>{athlete.hometown}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AthleteCard; 