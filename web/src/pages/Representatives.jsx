import React, { useState, useEffect } from 'react';
import RepresentativeCard from '../components/RepresentativeCard';
import { getRepresentatives } from '../services/civicService';

const Representatives = () => {
  const [address, setAddress] = useState('');
  const [representatives, setRepresentatives] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!address) return;
    
    setLoading(true);
    try {
      const reps = await getRepresentatives(address);
      setRepresentatives(reps);
    } catch (error) {
      console.error('Error fetching representatives:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1>Find Your Representatives</h1>
      
      <div className="search-container">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      <div className="representatives-grid">
        {representatives.map(rep => (
          <RepresentativeCard key={rep.name} representative={rep} />
        ))}
      </div>
    </div>
  );
};

export default Representatives;
