import React from 'react';
import AthleteCard from './AthleteCard';
import Link from 'next/link';
import { Athlete } from '../utils/airtable';

const dummyAthletes: Athlete[] = [
  {
    id: '1',
    name: 'Sophie Williams',
    sport: 'Basketball',
    year: 'Sophomore',
    hometown: 'Sydney, NSW',
    college: 'UCLA',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    nationality: 'Australian',
  },
  {
    id: '2',
    name: "Liam O'Connor",
    sport: 'Swimming',
    year: 'Senior',
    hometown: 'Melbourne, VIC',
    college: 'Stanford',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    nationality: 'Australian',
  },
  {
    id: '3',
    name: 'Emily Chen',
    sport: 'Tennis',
    year: 'Freshman',
    hometown: 'Brisbane, QLD',
    college: 'USC',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    nationality: 'Australian',
  },
  {
    id: '4',
    name: 'Jack Thompson',
    sport: 'Soccer',
    year: 'Junior',
    hometown: 'Perth, WA',
    college: 'Duke',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    nationality: 'Australian',
  },
  {
    id: '5',
    name: 'Olivia Smith',
    sport: 'Track & Field',
    year: 'Sophomore',
    hometown: 'Adelaide, SA',
    college: 'Oregon',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    nationality: 'Australian',
  },
  {
    id: '6',
    name: 'Noah Brown',
    sport: 'Rowing',
    year: 'Senior',
    hometown: 'Canberra, ACT',
    college: 'Harvard',
    image: 'https://randomuser.me/api/portraits/men/36.jpg',
    nationality: 'Australian',
  },
];

interface AthleteShowcaseProps {
  athleteCount?: number;
}

const AthleteShowcase: React.FC<AthleteShowcaseProps> = () => {
  return (
    <section className="bg-background py-20 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Athlete Showcase</h2>
        <p className="font-body text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
          Meet some of the top Australian student-athletes making waves in U.S. college sports.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-10">
        {dummyAthletes.map((athlete) => (
          <AthleteCard key={athlete.id} athlete={athlete} />
        ))}
      </div>
      <div className="flex justify-center">
        <Link href="/directory" className="inline-block bg-accent text-background font-heading font-bold px-8 py-4 rounded-xl text-lg shadow-lg hover:scale-105 transition-transform duration-200">
          View Full Database
        </Link>
      </div>
    </section>
  );
};

export default AthleteShowcase; 