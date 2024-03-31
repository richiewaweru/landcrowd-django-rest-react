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
        console.error('Failed to fetch surveyors:', error);
      }
    };

    fetchSurveyors();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Choose a Surveyor</h2>
      <div className="row">
        {surveyors.map(surveyor => (
          <div key={surveyor.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={surveyor.profilePhoto || 'placeholder-image-url.jpg'} className="card-img-top" alt={surveyor.fullName} />
              <div className="card-body">
                <h5 className="card-title">{surveyor.fullName}</h5>
                <p className="card-text">Phone: {surveyor.phoneNumber}</p>
                <p className="card-text">Email: {surveyor.email }</p>
                <p className="card-text">Certification Number: {surveyor.certificationNumber}</p>
                <p className="card-text">Address: {surveyor.address}, {surveyor.city}</p>
                <p className="card-text">Rates: ${surveyor.rates.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyorList;
