import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SurveyorInquiriesPage = () => {
    const [inquiries, setInquiries] = useState([]);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const token = localStorage.getItem('token');

    const fetchInquiries = async () => {
        const response = await axios.get('http://localhost:8000/api/seller-inquiries/', {
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json',
            },      
        });
        setInquiries(response.data);
        console.log(response.data);
    };

    const updateStatus = async (inquiryId, newStatus) => {

        console.log(inquiryId);
        try {
            await axios.patch(`http://localhost:8000/api/seller-inquiries/${inquiryId}/`, {
                status: newStatus,
            },{
                headers: {
                  'Authorization': `Token ${token}`,
                  'Content-Type': 'application/json',
                },
              });
            fetchInquiries(); // Refreshes inquiries to reflect the status update
        } catch (error) {
            console.error('Error updating inquiry status:', error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2>Pending Inquiries</h2>
                    {inquiries.filter(inquiry => inquiry.status === 'pending').map(inquiry => (
                        <div key={inquiry.id} className="card mb-3">
                            
                            <div className="card-body">
                                <h5 className="card-title">Title Deed: {inquiry.title_deed_number}</h5>
                                <p className="card-text">Seller: {inquiry.full_name}</p>
                                <p className="card-text">Phone: {inquiry.phoneNumber}</p>
                                <p className="card-text">Location: {inquiry.location}</p>
                                <div>
                                    <button className="btn btn-success mr-2" onClick={() => updateStatus(inquiry.id, 'successful')}>Mark as Successful</button>
                                    <button className="btn btn-danger" onClick={() => updateStatus(inquiry.id, 'not_successful')}>Mark as Not Successful</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col">
                    <h2>Other Inquiries</h2>
                    {inquiries.filter(inquiry => inquiry.status !== 'pending').map(inquiry => (
                        <div key={inquiry.id} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Title Deed: {inquiry.title_deed_number}</h5>
                                <p className="card-text">Location: {inquiry.location}</p>
                                <p className="card-text">Status: {inquiry.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    
};

export default SurveyorInquiriesPage;