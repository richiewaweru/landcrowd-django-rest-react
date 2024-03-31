import React from 'react';
import { useNavigate } from 'react-router-dom';

const HelpDecisionComponent = () => {
    const navigate = useNavigate();

    const handleDecision = (decision) => {
        if (!decision) {
            navigate('/sell');
        }
        else {
            navigate('/inquiry');
        }
    };

    return (
        <div className="container mt-5">
            <div>
                <h3 className="mb-4">Hello</h3>
                <p>Do you need help searching for the land?</p>
                <p>Do you need help to get a registry land map?</p>
                <p>Have you been cleared by the County office for land subdivision?</p>
                <p>Find out if you have met the requirements for land subdivision:</p>
                <ol>
                    <li><a href="https://www.kendikadvocates.co.ke/land.php" target="_blank" rel="noopener noreferrer">Learn more about land subdivision requirements</a></li>
                    <li><a href="https://www.linkedin.com/pulse/9-steps-land-subdivision-kenya-steve-ogut/" target="_blank" rel="noopener noreferrer">Learn more about land subdivision requirements</a></li>
                </ol>
            </div>
            <div className="mt-4">
                <h2>Do you need help to begin with the land subdivision process?</h2>
                <p>LandCrowd offers you options of certified surveyors to help you carry out the land subdivision process. If you need help, proceed to select a surveyor.</p>
                <div className="d-flex justify-content-center gap-2 mt-3">
                    <button className="btn btn-primary" onClick={() => handleDecision(true)}>Yes, I need help</button>
                    <button className="btn btn-secondary" onClick={() => handleDecision(false)}>No, I can proceed</button>
                </div>
            </div>
        </div>
    );
};

export default HelpDecisionComponent;
