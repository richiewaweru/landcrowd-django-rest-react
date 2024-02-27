import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const LandEntries = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const handleUpdate = (id) => {
    navigate(`/update-listing/${id}`);
  };


  const handleDelete = (id) => {
    navigate(`/delete-listing/${id}`); 
  };

  const handleImageUpdate = (id) => {
    navigate(`/update-image-map/${id}`); 
  };

  const handleDeleteImage = (id) => {
    navigate(`/delete-image/${id}`); 
  };

  const handleAddLandParcel = (id) => {
    navigate(`/update-parcel-details/${id}`); 
  };
 
  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/user/landlistings', config);
        setTodos(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getTodos();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-md-3 g-4"> 
        {todos.map(item => (
          <div key={item.id} className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{item.location}</h5>
                <p className="card-text">Price: {item.price}</p>
                <p className="card-text">Tel: {item.telephone_number}</p>
                <p className="card-text"><small className="text-muted">Created: {item.created_at}</small></p>
              </div>
              <div className="card-footer bg-transparent">
                <button className="btn btn-primary me-2" onClick={() => handleUpdate(item.id)}>Update</button>
                <button className="btn btn-danger me-2" onClick={() => handleDelete(item.id)}>Delete</button>
                <button className="btn btn-info me-2" onClick={() => handleImageUpdate(item.id)}>Update Image/Map</button>
                <button className="btn btn-warning" onClick={() => handleAddLandParcel(item.id)}>Update Parcels</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandEntries;
