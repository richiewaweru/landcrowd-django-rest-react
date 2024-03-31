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

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Choose a Lawyer</h2>
      <div className="row">
        {lawyers.map(lawyer => (
          <div key={lawyer.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={lawyer.profilePhoto || 'placeholder-image-url.jpg'} className="card-img-top" alt={lawyer.fullName} />
              <div className="card-body">
                <h5 className="card-title">{lawyer.fullName}</h5>
                <p className="card-text">Phone: {lawyer.phoneNumber}</p>
                <p className="card-text">Email: {lawyer.email || 'N/A'}</p>
                <p className="card-text">License Number: {lawyer.licenseNumber}</p>
                <p className="card-text">Address: {lawyer.address}, {lawyer.city}</p>
                <p className="card-text">Rates: ${lawyer.rates.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LawyerList;


