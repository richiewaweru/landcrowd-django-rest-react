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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/dj-rest-auth/login/', credentials);
      localStorage.setItem('token', response.data.key); 
      console.log('Login Success:', response.data);
      navigate("/listings");
    } catch (error) {
      console.error('Login Error:', error.response.data);
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
          <h3>Login</h3>
         
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
