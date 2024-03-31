import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ParcelUpdateComponent = () => {
  const { parcelId } = useParams(); // Get parcelId from URL parameters
  const navigate = useNavigate();
  const [parcelData, setParcelData] = useState({
    parcel_label: '',
    area: '',
    price: '',
    status: '',
  });
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
    // Fetch the current parcel data
    const fetchParcelData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/parcel/update/${parcelId}/`, config);
        setParcelData(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching parcel data:', error);
      }
    };

    fetchParcelData();
  }, [parcelId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParcelData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/parcel/update/${parcelId}/`, parcelData, config);
      alert('Parcel updated successfully!');
      navigate(-1); // Navigates back to the previous state.
    } catch (error) {
      console.error('Failed to update parcel:', error);
      alert('Failed to update parcel. Please try again.');
    }
  };

  return (
    <div>
      <h2>Update Parcel</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Parcel Label:</label>
          <input
            type="text"
            name="parcel_label"
            value={parcelData.parcel_label}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Area (acres):</label>
          <input
            type="number"
            name="area"
            value={parcelData.area}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={parcelData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={parcelData.status} onChange={handleChange} required>
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>
        </div>
        <button type="submit">Update Parcel</button>
      </form>
    </div>
  );
};

export default ParcelUpdateComponent;
