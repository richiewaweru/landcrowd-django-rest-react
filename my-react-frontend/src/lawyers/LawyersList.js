import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LawyerList = () => {
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/lawyers/');
        setLawyers(response.data);
      } catch (error) {
        console.error('Failed to fetch lawyers:', error);
      }
    };

    fetchLawyers();
  }, []);

  const handleCick=()=>{
    console.log("clicked")
  
  }

  return (
    <div>
      <h2>Choose a Lawyer</h2>
      <ul>
        <div onClick={handleCick}>
          <button>
            <a href="/lawyers/create">Add a Lawyer</a>
          </button>  
        {lawyers.map(lawyer => (
          <li key={lawyer.id}>
            {lawyer.fullName} - {lawyer.email}
          </li>
        ))}
    </div>
      </ul>
    
    </div>
  );
};

export default LawyerList;

