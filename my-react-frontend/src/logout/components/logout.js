
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/users/api/user/logout/', {}, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
      });
      localStorage.removeItem('token'); // remove the token from local storage for security
      navigate('/login'); 
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
