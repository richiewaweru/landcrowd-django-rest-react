import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddLandMapAndImage = () => {
  const [images, setImages] = useState([]);
  const [map, setMap] = useState(null);
  const { land_listing_id } = useParams();
  const navigate = useNavigate();

  const handleImagesChange = (event) => {
    setImages([...images, ...Array.from(event.target.files)]);
  };

  const handleMapChange = (event) => {
    setMap(event.target.files[0]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const clearImagesSelection = () => {
    setImages([]);
  };

  const removeMap = () => {
    setMap(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to add resources.');
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${token}`,
      },
    };

    const imageUploadPromises = images.map((image) => {
      const formData = new FormData();
      formData.append('land_images', image);
      formData.append('land_listing', land_listing_id);
      return axios.post(`http://localhost:8000/api/landlisting-images/${land_listing_id}/`, formData, config);
    });

    let mapUploadPromise = Promise.resolve();
    if (map) {
      const formData = new FormData();
      formData.append('land_map', map);
      formData.append('land_listing', land_listing_id);
      mapUploadPromise = axios.post(`http://localhost:8000/api/landlisting-maps/${land_listing_id}/`, formData, config);
    }

    try {
      await Promise.all([...imageUploadPromises, mapUploadPromise]);
      alert('Resources uploaded successfully!');
      navigate(`/add-land-parcel/${land_listing_id}`);
    } catch (error) {
      console.error('Error uploading resources:', error);
      alert('Error uploading resources.');
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card" style={{ width: '50%' }}>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="mb-3">
            <div className="mb-3">
              <label className="form-label">Upload Images:</label>
              <input className="form-control" type="file" onChange={handleImagesChange} accept="image/*" multiple />
            </div>
            {images.map((image, index) => (
              <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                {image.name}
                <button className="btn btn-danger btn-sm" type="button" onClick={() => removeImage(index)}>Remove</button>
              </div>
            ))}
            {images.length > 0 && (
              <button className="btn btn-warning btn-sm mb-3" type="button" onClick={clearImagesSelection}>Clear Images</button>
            )}
            <div className="mb-3">
              <label className="form-label">Upload Map:</label>
              <input className="form-control" type="file" onChange={handleMapChange} accept="image/*" />
            </div>
            {map && (
              <div className="d-flex justify-content-between align-items-center mb-2">
                {map.name}
                <button className="btn btn-danger btn-sm" type="button" onClick={removeMap}>Remove Map</button>
              </div>
            )}
            <button className="btn btn-primary" type="submit">Upload Resources</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLandMapAndImage;

