import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LawyerProfileCreation = () => {
  const [lawyerProfileData, setLawyerProfileData] = useState({
    profilePhoto: null,
    fullName:'',
    phoneNumber: '',
    email:'',
    licenseNumber: '',
    address: '',
  });
  const token = localStorage.getItem('token');
  const navigate=useNavigate();

  const handleChange = (e) => {
    setLawyerProfileData({ ...lawyerProfileData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setLawyerProfileData({ ...lawyerProfileData, profilePhoto: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profilePhoto', lawyerProfileData.profilePhoto);
    formData.append('fullName', lawyerProfileData.fullName); 
    formData.append('phoneNumber', lawyerProfileData.phoneNumber);
    formData.append('email', lawyerProfileData.email);
    formData.append('licenseNumber', lawyerProfileData.licenseNumber);
    formData.append('address', lawyerProfileData.address);
    
    
    try {
      const response = await axios.post('http://localhost:8000/api/lawyer_profiles/', formData,{
        headers: {
           'Authorization': `Token ${token}`,
        }
      });
      console.log(' Lawyer Profile Creation Success:', response.data);
      navigate('/listings')
    } catch (error) {
      console.error('Lawyer Profile Creation Error:', error.response.data); 
    }
  };

  return (
    <div className="container my-5">
      <h2>Lawyer Profile Creation</h2>
      <form onSubmit={handleSubmit} className="card p-3">
        <div className="mb-3">
          <label htmlFor="profilePhoto" className="form-label">Profile Photo:</label>
          <input type="file" id="profilePhoto" name="profilePhoto" onChange={handlePhotoChange} required className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name:</label>
          <input type="text" id="fullName" name="fullName"  value={lawyerProfileData.fullName} onChange={handleChange} required className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
          <input type="text" id="phoneNumber" name="phoneNumber" value={lawyerProfileData.phoneNumber} onChange={handleChange} required className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email :</label>
          <input type="text" id="email" name="email" value={lawyerProfileData.email} onChange={handleChange} required className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="licensenNumber" className="form-label">License Number:</label>
          <input type="text" id="licenseNumber" name="licenseNumber" value={lawyerProfileData.licenseNumber} onChange={handleChange} required className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address:</label>
          <input type="text" id="address" name="address" value={lawyerProfileData.address} onChange={handleChange} required className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Create Profile</button>
      </form>
    </div>
  );
};

export default LawyerProfileCreation;
