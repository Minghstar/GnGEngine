import axios from 'axios';

export interface Athlete {
  id: string;
  name: string;
  sport: string;
  year: string;
  hometown: string;
  college: string;
  image?: string;
  highSchool?: string;
  nationality?: string;
}

// Try multiple possible environment variable names
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT || process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE;
const AIRTABLE_TABLE_NAME = 'Athletes'; // Adjust this to match your Airtable table name

// Debug logging to help troubleshoot environment variables
console.log('🔍 Airtable Config Debug:');
console.log('API Key exists:', !!AIRTABLE_API_KEY);
console.log('Base ID exists:', !!AIRTABLE_BASE_ID);
console.log('API Key starts with:', AIRTABLE_API_KEY?.substring(0, 10) + '...');
console.log('Base ID starts with:', AIRTABLE_BASE_ID?.substring(0, 10) + '...');

const airtableApi = axios.create({
  baseURL: `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`,
  headers: {
    'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const fetchAthletes = async (): Promise<Athlete[]> => {
  try {
    const response = await airtableApi.get(`/${AIRTABLE_TABLE_NAME}`);
    
    if (!response.data.records) {
      return [];
    }

    return response.data.records.map((record: any) => ({
      id: record.id,
      name: record.fields.Name || 'Unknown',
      sport: record.fields.Sport || 'Unknown',
      year: record.fields.Year || 'Unknown',
      hometown: record.fields.Hometown || 'Unknown',
      college: record.fields.College || 'Unknown',
      image: record.fields.Image?.[0]?.url || null,
      highSchool: record.fields.HighSchool || null,
      nationality: record.fields.Nationality || 'Australian',
    }));
  } catch (error) {
    console.error('Error fetching athletes:', error);
    return [];
  }
};

export const fetchAthleteById = async (id: string): Promise<Athlete | null> => {
  try {
    const response = await airtableApi.get(`/${AIRTABLE_TABLE_NAME}/${id}`);
    
    if (!response.data.fields) {
      return null;
    }

    const fields = response.data.fields;
    return {
      id: response.data.id,
      name: fields.Name || 'Unknown',
      sport: fields.Sport || 'Unknown',
      year: fields.Year || 'Unknown',
      hometown: fields.Hometown || 'Unknown',
      college: fields.College || 'Unknown',
      image: fields.Image?.[0]?.url || null,
      highSchool: fields.HighSchool || null,
      nationality: fields.Nationality || 'Australian',
    };
  } catch (error) {
    console.error('Error fetching athlete:', error);
    return null;
  }
};

export const getUniqueValues = (athletes: Athlete[], field: keyof Athlete): string[] => {
  const values = athletes
    .map(athlete => athlete[field])
    .filter((v): v is string => typeof v === 'string' && !!v);
  return [...new Set(values)].sort();
}; 