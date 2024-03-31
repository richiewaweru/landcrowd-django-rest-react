import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InquiryForm.css'; 
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const InquiryForm = () => {
    const [titleDeedNumber, setTitleDeedNumber] = useState('');
    const [location, setLocation] = useState('');
    const [surveyors, setSurveyors] = useState([]);
    const [selectedSurveyor, setSelectedSurveyor] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [full_name, setFull_Name] = useState('');
    const [error, setError] = useState('');

    const token = localStorage.getItem('token'); 
    const navigate = useNavigate();

    const config={
        headers: {
        'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',       
    }};
    useEffect(() => {
        const fetchSurveyors = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/surveyors/');
                setSurveyors(response.data);
            } catch (err) {
                setError('Failed to fetch surveyors.');
                console.error(err);
            }
        };
        fetchSurveyors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/seller-inquiries/', {
                title_deed_number: titleDeedNumber,
                location: location,
                surveyor: selectedSurveyor,
                phoneNumber: phoneNumber,
                full_name: full_name,
            },config);
            alert('Inquiry submitted successfully.Periodically check your notifications to see the status update about your inquiry');
            navigate('/my-notifs');


        } catch (err) {
            setError('Failed to submit the inquiry. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title text-center">Submit Your Inquiry</h2>
                            {error && <p className="error text-danger">{error}</p>}
                                <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                        <label>Full Name:</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={full_name}
                                            onChange={(e) => setFull_Name(e.target.value)}
                                            required
                                        />
                                    </div>
                                <div className="form-group">
                                        <label>phone Number:</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Title Deed Number:</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={titleDeedNumber}
                                            onChange={(e) => setTitleDeedNumber(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Location:</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Choose a Surveyor:</label>
                                        <select className="form-control" value={selectedSurveyor} onChange={(e) => setSelectedSurveyor(e.target.value)} required>
                                            <option value="">--Select a Surveyor--</option>
                                            {surveyors.map(surveyor => (
                                                <option key={surveyor.id} value={surveyor.id}>{surveyor.fullName}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit Inquiry</button>
                                </form>
                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="alert alert-info mt-2">
                                        <h4 className="alert-heading">Need Help Choosing?</h4>
                                        <p>Consider viewing surveyor profiles for detailed information on their location and rates to make an informed decision:</p>
                                        <Link to="/surveyor-list" className="btn btn-outline-info">View Surveyors</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
    );
};

export default InquiryForm;
