import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SurveyorProfileCreation = () => {
  const [surveyorProfileData, setSurveyorProfileData] = useState({
    profilePhoto: null,
    fullName:'',
    phoneNumber: '',
    email:'',
    certificationNumber: '',
    address: '',
  });

  const token = localStorage.getItem('token');
  const navigate=useNavigate();

  const handleChange = (e) => {
    setSurveyorProfileData({ ...surveyorProfileData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setSurveyorProfileData({ ...surveyorProfileData, profilePhoto: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profilePhoto', surveyorProfileData.profilePhoto);
    formData.append('fullName', surveyorProfileData.fullName);
    formData.append('phoneNumber', surveyorProfileData.phoneNumber);
    formData.append('email', surveyorProfileData.email);
    formData.append('certificationNumber', surveyorProfileData.certificationNumber);
    formData.append('address', surveyorProfileData.address);
    
    try {
      const response = await axios.post('http://localhost:8000/api/surveyor-profiles/', formData, {
        headers: {
          'Authorization': `Token ${token}`,
        }
      });
      console.log('Surveyor Profile Creation Success:', response.data);
      navigate('/listings')
    } catch (error) {
      console.error('Surveyor Profile Creation Error:', error.response.data);
      // handle error later
    }
  };

  return (
    <div className="container my-5">
      <h2>Surveyor Profile Creation</h2>
      <form onSubmit={handleSubmit} className="card p-3">
        <div className="mb-3">
          <label htmlFor="profilePhoto" className="form-label">Profile Photo:</label>
          <input type="file" id="profilePhoto" name="profilePhoto" onChange={handlePhotoChange} required className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">full Name:</label>
          <input type="text" id="fullName" name="fullName"  value={surveyorProfileData.fullName} onChange={handleChange} required className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
          <input type="text" id="phoneNumber" name="phoneNumber" value={surveyorProfileData.phoneNumber} onChange={handleChange} required className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email :</label>
          <input type="text" id="email" name="email" value={surveyorProfileData.email} onChange={handleChange} required className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="certificationNumber" className="form-label">Certification Number:</label>
          <input type="text" id="certificationNumber" name="certificationNumber" value={surveyorProfileData.certificationNumber} onChange={handleChange} required className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address:</label>
          <input type="text" id="address" name="address" value={surveyorProfileData.address} onChange={handleChange} required className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Create Profile</button>
      </form>
    </div>
  );
};

export default SurveyorProfileCreation;
