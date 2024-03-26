import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Parcels = () => {
  const { landListingId } = useParams();
  const [landMap, setLandMap] = useState(null);
  const [parcels, setParcels] = useState([]);
  const [selectedParcels, setSelectedParcels] = useState([]);
  const [images, setImages] = useState([]); // Added state for images
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mapsResponse = await axios.get(`http://localhost:8000/api/landlistings/${landListingId}/maps/`, config);
        setLandMap(mapsResponse.data[0]?.land_map);

        const parcelsResponse = await axios.get(`http://127.0.0.1:8000/api/parcel/${landListingId}/`, config);
        setParcels(parcelsResponse.data);

        const imagesResponse = await axios.get(`http://localhost:8000/api/landlistings/${landListingId}/images/`, config);
        setImages(imagesResponse.data); // Fetching and setting images
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
  

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          {landMap && (
            <img src={landMap} alt="Land Map" className="img-fluid" />
          )}
          <Slider {...sliderSettings}>
            {images.map((image, index) => (
              <div key={index}>
                <img src={image.land_images} alt={`Land ${index}`} className="img-fluid" style={{height:'500px'}}/>
              </div>
            ))}
          </Slider>
        </div>
        <div className="col-md-6">
          {/* Parcels listing and bid submission remains the same */}
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
