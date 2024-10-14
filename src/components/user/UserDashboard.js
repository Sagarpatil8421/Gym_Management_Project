import React, { useState } from 'react';
import { searchMembers } from '../../services/firestore'; // Assume searchMembers searches members by name or email

const UserDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const searchResults = await searchMembers(searchTerm);
    setResults(searchResults);
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.name} - {result.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
