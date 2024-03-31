import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const getUserInfo = async (token) => {
    try {
      const response = await axios.get('http://localhost:8000/users/api/user-info/', {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user info:', error.response.data);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/dj-rest-auth/login/', credentials);
      localStorage.setItem('token', response.data.key); 
      console.log('Login Success:', response.data);

      const userInfo = await getUserInfo(response.data.key);
      if (userInfo) {
        if (!userInfo.is_profile_complete) {
          switch (userInfo.user_type) {
            case 'buyer':
              navigate('/buyer-profile');
              break;
            case 'seller':
              navigate('/seller-profile');
              break;
            case 'lawyer':
              navigate('/lawyer-profile');
              break;
            case 'surveyor':
              navigate('/surveyor-profile');
              break;
            default:
              console.log('Unknown user type or profile already complete');
              navigate('/listings'); // Default redirection
          }
        } else {
          switch (userInfo.user_type) {
            case 'lawyer':
            case 'surveyor':
              navigate('/show-transactions');
              break;
            case 'seller':
            case 'buyer':
              navigate('/listings'); // Default redirection for sellers and surveyors
              break;
            default:
              navigate('/listings'); // Fallback redirection
          }          
        }
      }
    
    } catch (error) {
      console.error('Login Error:', error.response.data);
      alert('Invalid username or password');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Image Container */}
        <div className="col-md-6">
          <img src={`${process.env.PUBLIC_URL}/images/login-image.jpg`} alt="Login" className="img-fluid"/>
        </div>
        {/* Login Form Container */}
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="d-flex flex-column align-items-start">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={credentials.username}
              onChange={handleChange}
              className="mb-3"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              className="mb-3"
              required
            />
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
