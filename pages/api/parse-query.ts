import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    const prompt = `You are a natural language parser for athlete search queries. Convert the user's search query into JSON filters with these exact fields: sport, gender, nationality, division, location, and class_year. 

Available sports: Football, Basketball, Soccer, Tennis, Swimming, Track and Field, Baseball, Volleyball, Golf, Lacrosse, Hockey, Rowing, Cross Country, Wrestling, Softball, Field Hockey, Water Polo, Rugby, Cricket, Other

Available divisions: D1, D2, D3, NAIA, JUCO

Available nationalities: Australian, New Zealand, Other

Available class years: 2024, 2025, 2026, 2027, 2028

Be precise and format the output as strict JSON only. If a field is not mentioned in the query, omit it from the JSON. Use null for empty values.

Example input: "Female golfers in D2 from Sydney"
Output: {"gender": "Female", "sport": "Golf", "division": "D2", "location": "Sydney"}

Example input: "Male D1 tennis players from Australia"
Output: {"gender": "Male", "sport": "Tennis", "division": "D1", "nationality": "Australian"}

Example input: "New Zealand swimmers graduating in 2026"
Output: {"sport": "Swimming", "nationality": "New Zealand", "class_year": "2026"}

User query: "${query}"

Respond with JSON only:`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that converts natural language queries into JSON filters. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.1,
      max_tokens: 200,
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      return res.status(500).json({ error: 'No response from OpenAI' });
    }

    // Parse the JSON response
    let parsedFilters;
    try {
      parsedFilters = JSON.parse(response);
    } catch (error) {
      console.error('Failed to parse OpenAI response:', response);
      return res.status(500).json({ error: 'Invalid response format from OpenAI' });
    }

    // Validate and clean the filters
    const validFilters: any = {};
    
    if (parsedFilters.sport && typeof parsedFilters.sport === 'string') {
      validFilters.sport = parsedFilters.sport;
    }
    
    if (parsedFilters.gender && typeof parsedFilters.gender === 'string') {
      validFilters.gender = parsedFilters.gender;
    }
    
    if (parsedFilters.nationality && typeof parsedFilters.nationality === 'string') {
      validFilters.nationality = parsedFilters.nationality;
    }
    
    if (parsedFilters.division && typeof parsedFilters.division === 'string') {
      validFilters.division = parsedFilters.division;
    }
    
    if (parsedFilters.location && typeof parsedFilters.location === 'string') {
      validFilters.location = parsedFilters.location;
    }
    
    if (parsedFilters.class_year && typeof parsedFilters.class_year === 'string') {
      validFilters.class_year = parsedFilters.class_year;
    }

    return res.status(200).json({ filters: validFilters });
  } catch (error) {
    console.error('Error parsing query:', error);
    return res.status(500).json({ error: 'Failed to parse query' });
  }
} 