import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Transactionform.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function TransactionForm() {
  const [lawyers, setLawyers] = useState([]);
  const [surveyors, setSurveyors] = useState([]);
  const [selectedLawyer, setSelectedLawyer] = useState('');
  const [selectedSurveyor, setSelectedSurveyor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const location = useLocation();
  const bids = location.state?.bid_ids;
  const navigate = useNavigate(); 
  


  const token =localStorage.getItem('token');

  const config = {
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchLawyers = axios.get('http://localhost:8000/api/lawyers/', config);
    const fetchSurveyors = axios.get('http://localhost:8000/api/surveyors/', config);

    Promise.all([fetchLawyers, fetchSurveyors]).then((responses) => {
      setLawyers(responses[0].data);
      setSurveyors(responses[1].data);
      setIsLoading(false);
    }).catch(error => {
      console.error("Error fetching data: ", error);
      setError('Error fetching data');
      setIsLoading(false);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios.post('http://localhost:8000/api/transactions/update_transactions/',{
      bid_ids: bids,
      lawyer: selectedLawyer,
      surveyor: selectedSurveyor, 
      status:'in_progress'

    },config)
    .then(response => {
      console.log("Transaction successfully created: ", response.data);
      navigate('/my-bids')
      setIsLoading(false);
    })
    .catch(error => {
      console.error("Error creating transaction: ", error);
      setError('Error creating transaction');
      setIsLoading(false);
    });
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger" role="alert">Error: {error}</div>;
  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="transaction-form">
                <div className="mb-3">
                  <h3>Lawyers</h3>
                  {lawyers.map((lawyer) => (
                    <div key={lawyer.id} className="form-check">
                      <input type="radio" id={`lawyer-${lawyer.id}`} name="lawyer" value={lawyer.id} className="form-check-input" onChange={e => setSelectedLawyer(e.target.value)} />
                      <label htmlFor={`lawyer-${lawyer.id}`} className="form-check-label">{lawyer.fullName}</label>
                    </div>
                  ))}
                </div>
                <div className="mb-3">
                  <h3>Surveyors</h3>
                  {surveyors.map((surveyor) => (
                    <div key={surveyor.id} className="form-check">
                      <input type="radio" id={`surveyor-${surveyor.id}`} name="surveyor" value={surveyor.id} className="form-check-input" onChange={e => setSelectedSurveyor(e.target.value)} />
                      <label htmlFor={`surveyor-${surveyor.id}`} className="form-check-label">{surveyor.fullName}</label>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="alert alert-info">
            <p>Before selecting a lawyer or surveyor, consider viewing their profiles for prices and locations:</p>
            <Link to="/lawyer-list" className="btn btn-outline-info btn-sm">View Lawyers</Link>
            <Link to="/surveyor-list" className="btn btn-outline-info btn-sm mt-8">View Surveyors</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionForm;
