import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SalesListings = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const listingType = 'for sale';

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/listings/?listing_type=${listingType}`);
        console.log(res);
        setTodos(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getTodos();
  }, []);

  const handleListingClick = (landListingId) => {
    navigate(`/parcel/${landListingId}`);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {todos.map(item => (
          <div key={item.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card" onClick={() => handleListingClick(item.id)} style={{ cursor: 'pointer' }}>
              <div className="card-body">
                <h5 className="card-title">{item.location}</h5>
                <p className="card-text">Price: {item.price}</p>
                <p className="card-text">Tel: {item.telephone_number}</p>
                <p className="card-text">Listed: {new Date(item.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesListings;

