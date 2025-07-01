import Image from 'next/image';
import Link from 'next/link';
import { Athlete } from '../utils/airtable';

interface AthleteCardProps {
  athlete: Athlete;
}

const AthleteCard = ({ athlete }: AthleteCardProps) => {
  return (
    <Link href={`/profile/${athlete.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer group">
        {/* Image Section */}
        <div className="relative h-48 bg-gray-200">
          {athlete.image ? (
            <Image
              src={athlete.image}
              alt={`${athlete.name} - ${athlete.sport}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-aussie-green to-green-700">
              <div className="text-white text-4xl font-bold">
                {athlete.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
            </div>
          )}
          
          {/* Sport Badge */}
          <div className="absolute top-3 right-3">
            <span className="bg-aussie-green text-white px-2 py-1 rounded-full text-xs font-medium">
              {athlete.sport}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-aussie-green transition-colors">
            {athlete.name}
          </h3>
          
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              <span>{athlete.college}</span>
            </div>
            
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>Year {athlete.year}</span>
            </div>
            
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{athlete.hometown}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AthleteCard; 