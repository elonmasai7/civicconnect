import axios from 'axios';

const GOOGLE_CIVIC_API_KEY = process.env.GOOGLE_CIVIC_API_KEY;

export const getRepresentatives = async (address) => {
  const response = await axios.get(
    `https://www.googleapis.com/civicinfo/v2/representatives?address=${address}&key=${GOOGLE_CIVIC_API_KEY}`
  );
  
  return response.data.officials.map(official => ({
    name: official.name,
    role: official.roles[0].name,
    party: official.party,
    photoUrl: official.photoUrl || null,
    contact: {
      email: official.emails?.[0] || null,
      phone: official.phones?.[0] || null,
      website: official.urls?.[0] || null
    }
  }));
};
