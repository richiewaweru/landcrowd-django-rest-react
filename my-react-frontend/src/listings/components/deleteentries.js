import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    // Optionally fetch the listing details to display before deletion
    const fetchListing = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:8000/api/landlistings/${id}/`, {
          headers: { 'Authorization': `Token ${token}` },
        });
        setListing(response.data);
      } catch (error) {
        console.error('Error fetching listing details:', error);
      }
    };

    fetchListing();
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8000/api/landlistings/${id}/`, {
        headers: { 'Authorization': `Token ${token}` },
      });
      navigate('/lands'); // Redirect to listings overview or home page after deletion
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  return (
    <div>
      {listing && (
        <div>
          <h3>Are you sure you want to delete this listing?</h3>
          <p>Location: {listing.location}</p>
          <p>Price: {listing.price}</p>
          <button onClick={handleDelete}>Delete Listing</button>
        </div>
      )}
    </div>
  );
};

export default DeleteListing;
