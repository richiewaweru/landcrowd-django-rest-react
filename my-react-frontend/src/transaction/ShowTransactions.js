import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);


    //Mounts tge component 

    useEffect(() => {
        fetchTransactions();
    }, []);

    const token = localStorage.getItem('token');

    const config = {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      };

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/transactions/', config);
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const updateTransactionStatus = async (transactionId, newStatus) => {
        try {
            await axios.patch(`http://localhost:8000/api/transactions/${transactionId}/`, {
                status: newStatus,
            }, config);
            fetchTransactions(); // Re-fetch transactions to update the UI
        } catch (error) {
            console.error('Error updating transaction status:', error);
        }
    };

    // function to filter transactions by status
    const filterTransactionsByStatus = (status) => {
        return transactions.filter(transaction => transaction.status === status);
    };

    return (
        <div className="container">
            <div className="row">
                {['pending', 'in_progress', 'completed', 'cancelled'].map((status, index) => (
                    <div key={index} className="col">
                        <h3>{status.replace('_', ' ').toUpperCase()}</h3>
                        {filterTransactionsByStatus(status).map((transaction) => (
                            <div key={transaction.id} className="card" style={{marginBottom: '20px'}}>
                                <div className="card-body">
                                    <h5 className="card-title">Transaction #{transaction.id}</h5>
                                    <p className="card-text">Land location: {transaction.listing.location}</p>
                                    <p className="card-text">Land Title Deed: {transaction.listing.landTitleDeedNumber }</p>
                                    <p className="card-text">Land seller name: {transaction.listing.seller_profile.fullName}</p>
                                    <p className="card-text">Land email : {transaction.listing.seller.email}</p>
                                    <p className="card-text">Land seller phone number: {transaction.listing.telephone_number}</p>
                                    <p className="card-text">Buyers name: {transaction.bid.buyer_profile.fullName}</p>
                                    <p className="card-text">Buyers email: {transaction.bid.bidder.email}</p>
                                    <p className="card-text">Buyers phone number: {transaction.bid.buyer_profile.phoneNumber}</p>
                                    <p className="card-text">Parcel label: {transaction.bid.parcel.parcel_label}</p>
                                    <p className="card-text">Parcel  Area: {transaction.bid.parcel.area}</p>
                                    <p className="card-text">Parcel  Price: {transaction.bid.parcel.price}</p>
                                    <p className="card-text">Status: {transaction.status}</p>
                                    {/* Update button for each status except 'completed' and 'cancelled' */}
                                    {status !== 'completed' && status !== 'cancelled' && (
                                        <button 
                                            className="btn btn-primary" 
                                            onClick={() => updateTransactionStatus(transaction.id, status === 'pending' ? 'in_progress' : 'completed')}>
                                            Move to {status === 'pending' ? 'In Progress' : 'Completed'}
                                        </button>
                                    )}

{status !== 'completed' && status !== 'cancelled' && (
                                    <button 
                                        className="btn btn-warning"
                                        onClick={() => updateTransactionStatus(transaction.id, 'cancelled')}>
                                        Mark as Cancelled
                                    </button>
                                )}

                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionsPage;
