import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LandListingForm = () => {
  const [formData, setFormData] = useState({
    location: '',
    price: '',
    size: '',
    telephone_number: '',
    installment_options: false,
    landTitleDeedNumber: '',
    listing_type: 'for sale',
    description:'',
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('User must be logged in to create a listing');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/landlistings/', formData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const land_listing_id = Number(response.data.id);
      navigate(`/add-image-map/${land_listing_id}`);
    } catch (error) {
      console.error('Error creating land listing:', error.response.data);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card" style={{ width: '50%' }}>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="Size in acres"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="telephone_number"
                value={formData.telephone_number}
                onChange={handleChange}
                placeholder="Telephone Number"
                required
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="installment_options"
                checked={formData.installment_options}
                onChange={handleChange}
              />
              <label className="form-check-label">Installment Options</label>
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                name="listing_type"
                value={formData.listing_type}
                onChange={handleChange}
              >
                <option value="for sale">For sale</option>
                <option value="for lease">For lease</option>
              </select>
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="landTitleDeedNumber"
                value={formData.landTitleDeedNumber}
                onChange={handleChange}
                placeholder="land Title Deed Number"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Land Description"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">Create Listing</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandListingForm;

