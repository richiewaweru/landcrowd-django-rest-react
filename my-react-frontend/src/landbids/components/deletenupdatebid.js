import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserBids = () => {
  const [bids, setBids] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/bids/`, config);
        setBids(response.data);
      } catch (error) {
        console.error('Error fetching bids:', error);
      }
    };

    fetchBids();
  }, []);

  const handleDeleteBid = async (bidId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/listing/bids/${bidId}/`, config);
      alert('Bid deleted successfully!');
      setBids(bids.filter(bid => bid.id !== bidId)); // UpdateS the local state to reflect deletion
      navigate('/listings')
    } catch (error) {
      console.error('Failed to delete bid:', error);
      alert('Failed to delete bid. Please try again.');
    }
  };

  return (
    <div>
      <h2>My Bids</h2>
      {bids.map(bid => (
        <div key={bid.id} style={{ padding: '10px', margin: '5px', border: '1px solid grey' }}>
          <p>Parcel Label: {bid.parcel.parcel_label}</p>
          <p>Area: {bid.parcel.area}</p>
          <p>Price: {bid.parcel.price}</p>
          <p>Parcel Location: {bid.listing.location}</p>
          <p>Parcel Seller: {bid.listing && bid.listing.seller ? bid.listing.seller.username : 'N/A'}</p>
          <button onClick={() => handleDeleteBid(bid.id)}>Delete Bid</button>
        </div>
      ))}
    </div>
  );
};

export default UserBids;
