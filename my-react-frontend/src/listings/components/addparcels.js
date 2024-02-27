import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './AddParcel.css'

const AddParcel = () => {
    const { landListingId } = useParams();
    const navigate = useNavigate();
    const [images, setImages] = useState([]); 
    const [parcels, setParcels] = useState([{ parcel_label: '', area: '', price: '', status: 'available' }]);
    const [landMap, setLandMap] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': `Token ${token}`,
            },
        };

        const fetchMapAndImages = async () => {
            try {
                const mapResponse = await axios.get(`http://localhost:8000/api/landlistings/${landListingId}/maps/`, config);
                const imagesResponse = await axios.get(`http://localhost:8000/api/landlistings/${landListingId}/images/`, config);
                setLandMap(mapResponse.data[0]?.land_map);
                setImages(imagesResponse.data);
            } catch (error) {
                console.error('Error fetching map and images:', error);
            }
        };

        fetchMapAndImages();
    }, [landListingId, token]);

    const handleChange = (index, e) => {
        const updatedParcels = parcels.map((parcel, i) =>
            i === index ? { ...parcel, [e.target.name]: e.target.value } : parcel
        );
        setParcels(updatedParcels);
    };

    const addParcel = () => {
        setParcels([...parcels, { parcel_label: '', area: '', price: '', status: 'available' }]);
    };

    const removeParcel = index => {
        setParcels(parcels.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
        };

        try {
            await Promise.all(parcels.map(parcel =>
                axios.post(`http://localhost:8000/api/parcel/${landListingId}/`, { ...parcel, land_listing: landListingId }, config)
            ));
            alert('Parcels created successfully');
            navigate('/listings');
        } catch (error) {
            console.error('Error creating parcels:', error);
            alert('Failed to add parcels');
        }
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-4">
                    <form onSubmit={handleSubmit}>
                        {parcels.map((parcel, index) => (
                            <div key={index} className="card mb-3">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Parcel Label:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="parcel_label"
                                            value={parcel.parcel_label}
                                            onChange={e => handleChange(index, e)}
                                            placeholder="Parcel label"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Area:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="area"
                                            value={parcel.area}
                                            onChange={e => handleChange(index, e)}
                                            placeholder="Parcel Area"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Price:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="price"
                                            value={parcel.price}
                                            onChange={e => handleChange(index, e)}
                                            placeholder="Parcel Price"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Status:</label>
                                        <select
                                            className="form-select"
                                            name="status"
                                            value={parcel.status}
                                            onChange={e => handleChange(index, e)}
                                            required
                                        >
                                            <option value="available">Available</option>
                                            <option value="sold">Sold</option>
                                        </select>
                                    </div>
                                    {parcels.length > 1 && (
                                        <button type="button" className="btn btn-danger" onClick={() => removeParcel(index)}>Remove Parcel</button>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div className="mb-3">
                            <button type="button" className="btn btn-primary" onClick={addParcel}>Add Another Parcel</button>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-success">Submit All Parcels</button>
                        </div>
                    </form>
                </div>
                <div className="col-lg-8">
                    {landMap && (
                        <div className="md-5">
                            <img src={landMap} alt="Land Map" className="img-fluid" />
                        </div>
                    )}
                    <Slider {...sliderSettings}>
                        {images.map((image, index) => (
                            <div key={index}>
                                <img src={image.land_images} alt={`Land ${index}`} className="img-fluid" />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default AddParcel;

