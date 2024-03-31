import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserBids = () => {
  const [bids, setBids] = useState([]);
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
    fetchBids();
  }, []);


  const fetchBids = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/user/bids/`, config);
      setBids(response.data);
    } catch (error) {
      console.error('Error fetching bids:', error);
    }
  };


  const handleUpdateBid = async (bidId) => {
    const isConfirmed = window.confirm("Are you sure you want to finalize this land transaction and mark it as sold?");
    if (isConfirmed) {
      try {
        await axios.patch(`http://127.0.0.1:8000/api/listing/bids/${bidId}/`, {
          status: 'sold',
        }, config);
        alert('Bid updated successfully!');
        fetchBids();
        const updatedBids = bids.map(bid => bid.id === bidId ? {...bid, status: 'sold'} : bid);
        setBids(updatedBids);
      } catch (error) {
        console.error('Failed to update bid:', error);
        alert('Failed to update bid. Please check with surveyor and lawyer progress to proceed.');
      }
    }
  };

  const handleDeleteBid = async (bidId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this bid?");
    if (isConfirmed) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/listing/bids/${bidId}/`, config);
        alert('Bid deleted successfully!');
        setBids(bids.filter(bid => bid.id !== bidId)); // Updates the local state to reflect deletion
      } catch (error) {
        console.error('Failed to delete bid:', error);
        alert('The bid has been sold and cannot be alltered.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Bids</h2>
      {bids.length > 0 ? (
        bids.map(bid => (
          <div key={bid.id} className="card mb-3 mx-auto" style={{ maxWidth: '600px', borderRadius: '15px', border: '1px solid #007bff' }}>
            <div className="card-body">
              <h5 className="card-title">Parcel: {bid.parcel.parcel_label}</h5>
              <p className="card-text">Area: {bid.parcel.area} acres</p>
              <p className="card-text">Price: ${bid.parcel.price}</p>
              <p className="card-text">Location: {bid.listing.location}</p>
              <p className="card-text">Parcel Status: {bid.parcel.status}</p>
              <p className="card-text">Seller: {bid.listing && bid.listing.seller ? bid.listing.seller.username : 'N/A'}</p>
              <div className="d-flex justify-content-around">
                <button className="btn btn-primary" onClick={() => handleUpdateBid(bid.id)}>Finalize Transaction</button>
                <button className="btn btn-danger" onClick={() => handleDeleteBid(bid.id)}>Delete Bid</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No bids found.</p>
      )}
    </div>
  );
};

export default UserBids;
