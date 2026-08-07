import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.jpg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content-new">
        {/*logo*/}
        <div className="footer-col brand-col">
          <div
            className="footer-logo"
            style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}
          >
            <img
              src={logoImg}
              alt="WayGo Logo"
              style={{ height: '50px', marginRight: '5px', borderRadius: '6px' }}
            />
            {/*website name*/}
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--white)' }}>
              Way<span style={{ color: '#3b82f6' }}>Go</span>
            </div>
          </div>
          <p className="footer-desc">
            Self-drive vehicle rentals, pick up right from our shop in Badulla, Sri Lanka.
          </p>
        </div>

        {/*navigation links*/}
        <div className="footer-col">
          <h4 className="footer-title">Explore</h4>
          <ul className="footer-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/vehicles">Vehicles</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/*contact and location*/}
        <div className="footer-col">
          <h4 className="footer-title">Visit Our Shop</h4>
          <ul className="footer-text-list">
            <li>WayGo, Main Street, Badulla, Sri Lanka</li>
            <li>Every day - 7:00 AM – 8:00 PM</li>
            <li>+94 74 3232 200</li>
            <li>info@waygo.lk</li>
          </ul>
        </div>
      </div>

      <div className="container">
        <div className="footer-bottom">
            {/*current year automatically*/}
          <p>&copy; {new Date().getFullYear()} WayGo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
