import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/listings">LandCrowd</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item"><Link className="nav-link" to="/signup">Sign Up</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/logout">Logout</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/listings">Lands</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/sell">Sell</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/my-bids">My Bids</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/my-notifs">My Notifications</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/saleS">Buy Land</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/lease">Lease Land</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/lawyer-list">Lawyers</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/surveyor-list">Surveyors</Link></li>

        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
