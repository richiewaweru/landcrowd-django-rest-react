import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    user_type: '', 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/users/api/user/create/', userData);
      console.log('Signup Success:', response.data);
      navigate('/login'); 
    } catch (error) {
      console.error('Signup Error:', error.response.data);
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="card w-50 my-5">
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Sign Up</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="text" name="username" className="form-control" placeholder="Username" value={userData.username} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <input type="email" name="email" className="form-control" placeholder="Email" value={userData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <input type="password" name="password" className="form-control" placeholder="Password" value={userData.password} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <select name="user_type" className="form-select" value={userData.user_type} onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="lawyer">Lawyer</option>
                <option value="surveyor">Surveyor</option>
              </select>
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
