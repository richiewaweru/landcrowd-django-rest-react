import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SellerProfileCreation = () => {
  const [sellerProfileData, setSellerProfileData] = useState({
    profilePhoto: null,
    fullName:'',
    phoneNumber: '',
    landRegistrationNumber: '',
    landTitleDeedNumber:'',
  });

  const token = localStorage.getItem('token');
  const navigate=useNavigate();

  const handleChange = (e) => {
    setSellerProfileData({ ...sellerProfileData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setSellerProfileData({ ...sellerProfileData, profilePhoto: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profilePhoto', sellerProfileData.profilePhoto);
    formData.append('fullName', sellerProfileData.fullName);
    formData.append('phoneNumber', sellerProfileData.phoneNumber);
    formData.append('landRegistrationNumber', sellerProfileData.landRegistrationNumber);
    formData.append('landTitleDeedNumber', sellerProfileData.landTitleDeedNumber);
    
    try {
      const response = await axios.post('http://localhost:8000/api/seller-profiles/', formData, {
        headers: {
          'Authorization': `Token ${token}`,
        }
      });
      console.log('Seller Profile Creation Success:', response.data);
      navigate('/listings')
    } catch (error) {
      console.error('Seller Profile Creation Error:', error.response.data);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Seller Profile Creation</h2>
      <form onSubmit={handleSubmit} className="card p-3">
        <div className="mb-3">
          <label htmlFor="profilePhoto" className="form-label">Profile Photo:</label>
          <input type="file" id="profilePhoto" name="profilePhoto" className="form-control" onChange={handlePhotoChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name:</label>
          <input type="text" id="fullName" name="fullName" className="form-control" value={sellerProfileData.fullName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
          <input type="text" id="phoneNumber" name="phoneNumber" className="form-control" value={sellerProfileData.phoneNumber} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Create Profile</button>
      </form>
    </div>
  );
};

export default SellerProfileCreation;
