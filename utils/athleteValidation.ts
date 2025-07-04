import { Athlete } from './airtable';

export interface ValidatedAthlete extends Athlete {
  isValid: boolean;
  missingFields: string[];
}

export const validateAthlete = (athlete: Athlete): ValidatedAthlete => {
  const missingFields: string[] = [];
  
  // Check required fields
  if (!athlete.name || athlete.name.trim() === '') {
    missingFields.push('name');
  }
  
  if (!athlete.college || athlete.college.trim() === '') {
    missingFields.push('college');
  }
  
  if (!athlete.sport || athlete.sport.trim() === '') {
    missingFields.push('sport');
  }
  
  if (!athlete.year || athlete.year.trim() === '') {
    missingFields.push('year');
  }
  
  if (!athlete.hometown || athlete.hometown.trim() === '') {
    missingFields.push('hometown');
  }
  
  // Athlete is valid if it has at least name and college
  const isValid = !missingFields.includes('name') && !missingFields.includes('college');
  
  return {
    ...athlete,
    isValid,
    missingFields
  };
};

export const getFallbackValue = (value: string | undefined | null, fallback: string): string => {
  if (!value || value.trim() === '') {
    return fallback;
  }
  return value;
};

export const getDisplayName = (name: string | undefined | null): string => {
  return getFallbackValue(name, 'Unnamed Athlete');
};

export const getDisplayCollege = (college: string | undefined | null): string => {
  return getFallbackValue(college, 'College Unknown');
};

export const getDisplayHometown = (hometown: string | undefined | null): string => {
  return getFallbackValue(hometown, 'Hometown Unknown');
};

export const getDisplaySport = (sport: string | undefined | null): string => {
  return getFallbackValue(sport, 'Sport Unknown');
};

export const getDisplayYear = (year: string | undefined | null): string => {
  return getFallbackValue(year, 'Year Unknown');
};

export const isLowResImage = (imageUrl: string | undefined | null): boolean => {
  if (!imageUrl) return false;
  
  // Check if URL contains common low-res indicators
  const lowResIndicators = ['thumb', 'small', '150', '100', '50'];
  return lowResIndicators.some(indicator => imageUrl.toLowerCase().includes(indicator));
};

export const shouldShowLowResBadge = (imageUrl: string | undefined | null): boolean => {
  return isLowResImage(imageUrl);
};

export const getInitials = (name: string): string => {
  if (!name || name.trim() === '') {
    return '?';
  }
  
  const names = name.trim().split(' ').filter(n => n.length > 0);
  if (names.length === 0) {
    return '?';
  }
  
  return names.map(n => n[0]).join('').toUpperCase().slice(0, 3);
}; 