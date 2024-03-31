import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">LandCrowd</Link>
      <ul className="navigation-links">
        <li><Link className="nav-link" to="/listings">Lands</Link></li>
        <li><Link className="nav-link" to="/help">Sell</Link></li>
        <li><Link className="nav-link" to="/sales">Buy Land</Link></li>
        <li><Link className="nav-link" to="/lease">Lease Land</Link></li>
        <li><Link className="nav-link" to="/lawyer-list">Lawyers</Link></li>
        <li><Link className="nav-link" to="/surveyor-list">Surveyors</Link></li>
      </ul>
      <div className="dropdown">
        <button className="dropbtn">User</button>
        <div className="dropdown-content">
          <Link className="dropdown-item" to="/signup">Sign Up</Link>
          <Link className="dropdown-item" to="/login">Login</Link>
          <Link className="dropdown-item" to="/logout">Logout</Link>
          <Link className="dropdown-item" to="/profile">My Land Listings</Link>
          <Link className="dropdown-item" to="/my-bids">My Bids</Link>
          <Link className="dropdown-item" to="/my-notifs">My Notifications</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
