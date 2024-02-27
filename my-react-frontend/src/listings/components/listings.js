import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Listings.css'; 

const Listings = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListingsAndImages = async () => {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Token ${token}` };
      try {
        // fetches listings and their first image
        const listingsResponse = await axios.get('http://127.0.0.1:8000/api/landlistings', { headers });
        const listingsWithImages = await Promise.all(listingsResponse.data.map(async (listing) => {
          const imagesResponse = await axios.get(`http://localhost:8000/api/landlistings/${listing.id}/images/`, { headers });
          return { ...listing, image: imagesResponse.data[0]?.land_images }; 
        }));
        setListings(listingsWithImages);
      } catch (error) {
        console.error('Error fetching listings and images:', error);
      }
    };

    fetchListingsAndImages();
  }, []);

  // Slider settings for the horizontal carousel
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 }},
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 }}
    ]
  };

  return (
    <div className="listings-slider-container">
      <Slider {...carouselSettings}>
        {listings.map(listing => (
          <div key={listing.id} className="listing-card" onClick={() => navigate(`/parcel/${listing.id}`)}>
            {listing.image && (
              <div className="listing-image-container">
                <img src={listing.image} alt={`Listing ${listing.id}`} className="listing-image" />
              </div>
            )}
            <div className="listing-details">
              <h5 className="listing-title">{listing.location}</h5>
              <p className="listing-price">Price: {listing.price}</p>
              <p className="listing-type">Type: {listing.listing_type}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Listings;



