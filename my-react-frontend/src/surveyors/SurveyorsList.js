import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SurveyorList = () => {
  const [surveyors, setSurveyors] = useState([]);

  useEffect(() => {
    const fetchSurveyors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/surveyors/');
        setSurveyors(response.data);
      } catch (error) {
        console.error('Failed to fetch surveyor:', error);
      }
    };

    fetchSurveyors();
  }, []);

  const handleCick=()=>{
    console.log("clicked")
  
  }

  return (
    <div>
      <h2>Choose a Surveyor</h2>
      <ul>
        <div onClick={handleCick}>
          <button>
            <a href="/surveyors/create">Add a Surveyor</a>
          </button>  
        {surveyors.map(surveyor => (
          <li key={surveyor.id}>
            {surveyor.fullName} - {surveyor.email}
          </li>
        ))}
    </div>
      </ul>
    
    </div>
  );
};

export default SurveyorList;

