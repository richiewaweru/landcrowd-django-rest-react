import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ParcelsDetails = () => {
  const { landListingId } = useParams();
  const navigate = useNavigate();
  const [parcels, setParcels] = useState([]);
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
  };

  
  const fetchParcels = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/parcel/${landListingId}/`, config);
      setParcels(response.data);
    } catch (error) {
      console.error('Error fetching parcels:', error);
    }
  };

  useEffect(() => {
    fetchParcels();
  }, [landListingId]);

  const deleteParcel = async (parcelId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/parcel/update/${parcelId}/`, config);
      alert('Parcel deleted successfully!');
      fetchParcels(); 
    } catch (error) {
      console.error('Failed to delete parcel:', error);
      alert('Failed to delete parcel. Please try again.');
    }
  };

  return (
    <div>
      <h2>Parcels for Listing ID: {landListingId}</h2>
      {parcels.map(parcel => (
        <div key={parcel.id} style={{ padding: '10px', margin: '5px', border: '1px solid grey' }}>
          <p>Parcel Label: {parcel.parcel_label}</p>
          <p>Area: {parcel.area} acres</p>
          <p>Price: ${parcel.price}</p>
          <p>Status: {parcel.status}</p>
          <button onClick={() => navigate(`/update-parcel-entry/${parcel.id}`)}>Edit</button>
          <button onClick={() => deleteParcel(parcel.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ParcelsDetails;


