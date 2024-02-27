import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


const Parcels = () => {
  const { landListingId } = useParams();
  const [landMap, setLandMap] = useState(null);
  const [parcels, setParcels] = useState([]);
  const [selectedParcels, setSelectedParcels] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
    const fetchMap = async () => {
      try {
        const mapsResponse = await axios.get(`http://localhost:8000/api/landlistings/${landListingId}/maps/`, config);
        setLandMap(mapsResponse.data[0]?.land_map);
      } catch (error) {
        console.error('Error fetching map:', error);
      }
    };

    const getParcels = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/parcel/${landListingId}/`, config);
        setParcels(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMap();
    getParcels();
  }, [landListingId, token]);

  const toggleParcelSelection = (parcelId) => {
    setSelectedParcels(prevSelectedParcels => {
      if (prevSelectedParcels.includes(parcelId)) {
        return prevSelectedParcels.filter(id => id !== parcelId); // removes parcel from selection
      } else {
        return [...prevSelectedParcels, parcelId]; // sdds parcel to selection
      }
    });
  };

  const handleBidSubmission = async () => {

    if (!token) {
      alert('You must be logged in to submit bids.');
      return;
    }
  
    if (selectedParcels.length === 0) {
      alert('Please select at least one parcel for bidding.');
      return;
    }
  
    try {
      // Iterates over selected parcels and submit a bid for each
      await Promise.all(selectedParcels.map(parcelId => {
        const bidData = JSON.stringify({ parcel: parcelId });
        
        return axios.post(`http://127.0.0.1:8000/api/listing/${landListingId}/bid/`, bidData, config);
      }));
  
      alert('Bids submitted successfully!');
      setSelectedParcels([]); // reset selection after successful submission
      navigate('/listings')
    } catch (error) {
      console.error('Failed to submit bids:', error);
      alert('This parcel has been bidded Choose an available one.');
    }
  };
  

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          {landMap && (
            <img src={landMap} alt="Land Map" className="img-fluid" />
          )}
        </div>
        <div className="col-md-4">
          {parcels.map((parcel) => (
            <div key={parcel.id} className="card mb-3" onClick={() => toggleParcelSelection(parcel.id)} style={{ cursor: 'pointer', margin: '10px', padding: '10px', border: selectedParcels.includes(parcel.id) ? '2px solid #007bff' : '1px solid #ddd' }}>
              <div className="card-body">
                <h5 className="card-title">Parcel Label: {parcel.parcel_label}</h5>
                <p className="card-text">Area: {parcel.area}</p>
                <p className="card-text">Price: {parcel.price}</p>
                <p className="card-text">Status: {parcel.status}</p>
              </div>
            </div>
          ))}
          <button className="btn btn-primary" onClick={handleBidSubmission}>Submit Bids for Selected Parcels</button>
        </div>
      </div>
    </div>
  );
};

export default Parcels;
