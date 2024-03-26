import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BuyerProfileCreation = () => {
  const [buyerProfileData, setBuyerProfileData] = useState({
    profilePhoto: null,
    phoneNumber: '',
    fullName: '',
  });

  const token = localStorage.getItem('token');
  const navigate=useNavigate();


  const handleChange = (e) => {
    setBuyerProfileData({ ...buyerProfileData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setBuyerProfileData({ ...buyerProfileData, profilePhoto: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profilePhoto', buyerProfileData.profilePhoto);
    formData.append('phoneNumber', buyerProfileData.phoneNumber);
    formData.append('fullName', buyerProfileData.fullName); // Additional field
    formData.append('address', buyerProfileData.address); // Additional field
    
    try {
      const response = await axios.post('http://localhost:8000/api/buyer-profiles/', formData, {
        headers: {
            'Authorization': `Token ${token}`,
        }
      });
      console.log('Buyer Profile Creation Success:', response.data);
      navigate('/listings')
    } catch (error) {
      console.error('Buyer Profile Creation Error:', error.response.data);
      // create handling error
    }
  };

  return (
    <div className="container my-5">
      <h2>Buyer Profile Creation</h2>
      <form onSubmit={handleSubmit} className="card p-3">
        <div className="mb-3">
          <label htmlFor="profilePhoto">Profile Photo:</label>
          <input type="file" id="profilePhoto" name="profilePhoto" onChange={handlePhotoChange} required className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" name="phoneNumber" value={buyerProfileData.phoneNumber} onChange={handleChange} required className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" name="fullName" value={buyerProfileData.fullName} onChange={handleChange} required className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Create Profile</button>
      </form>
    </div>
  );
};

export default BuyerProfileCreation;
