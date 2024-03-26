import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Listings.css'; // Ensure this CSS file styles the listing cards appropriately

const Listings = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListingsAndImages = async () => {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Token ${token}` };
      try {
        // Fetches listings and their first image
        const listingsResponse = await axios.get('http://127.0.0.1:8000/api/landlistings', { headers });
        const listingsWithImages = await Promise.all(listingsResponse.data.map(async (listing) => {
          const imagesResponse = await axios.get(`http://localhost:8000/api/landlistings/${listing.id}/images/`, { headers });
          return { ...listing, image: imagesResponse.data[0]?.land_images }; // Assuming land_images is the correct path to the image URL
        }));
        setListings(listingsWithImages);
      } catch (error) {
        console.error('Error fetching listings and images:', error);
      }
    };

    fetchListingsAndImages();
  }, []);

  return (
    <div className="listings-container">
      {listings.map(listing => (
        <div key={listing.id} className="listing-card" onClick={() => navigate(`/parcel/${listing.id}`)}>
          {listing.image && (
            <div className="listing-image-container">
              <img src={listing.image} alt={`Listing ${listing.id}`} className="listing-image" />
            </div>
          )}
          <div className="listing-details">
            <h5 className="listing-title">Location: {listing.location}</h5>
            <p className="listing-price">Price: {listing.price}</p>
            <p className="listing-type">Telephone Number: {listing.telephone_number}</p>
            <p className="listing-type">Type: {listing.listing_type}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Listings;
