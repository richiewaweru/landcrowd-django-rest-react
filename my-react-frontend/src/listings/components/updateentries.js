import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


const UpdateListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: '',
    price: '',
    size: '',
    telephone_number: '',
    installment_options: false,
  });

  useEffect(() => {
    const fetchListing = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:8000/api/landlistings/${id}/`, {
          headers: { 'Authorization': `Token ${token}` },
        });
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching listing details:', error);
      }
    };
    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('User must be logged in to update a listing');
      return;
    }
    try {
      await axios.patch(`http://localhost:8000/api/landlistings/${id}/`, formData, {
        headers: { 'Authorization': `Token ${token}` },
      });
      navigate('/lands'); // Adjust the redirect path as needed
    } catch (error) {
      console.error('Error updating listing:', error);
      alert('Only the user can edit this listing');
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="card w-50">
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Update Listing</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} placeholder="Location" required />
            </div>
            <div className="mb-3">
              <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} placeholder="Price" required />
            </div>
            <div className="mb-3">
              <input type="number" name="size" className="form-control" value={formData.size} onChange={handleChange} placeholder="Size in acres" required />
            </div>
            <div className="mb-3">
              <input type="text" name="telephone_number" className="form-control" value={formData.telephone_number} onChange={handleChange} placeholder="Telephone Number" required />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" name="installment_options" className="form-check-input" checked={formData.installment_options} onChange={handleChange} />
              <label className="form-check-label">Installment Options</label>
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">Update Listing</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateListing;

