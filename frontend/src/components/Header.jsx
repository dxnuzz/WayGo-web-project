import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logoImg from '../assets/logo.jpg';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
      <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={logoImg}
          alt="WayGo Logo"
          style={{ height: '95px', marginRight: '-10px', borderRadius: '6px' }}
        />
        <div style={{ zIndex: 1 }}>
          Way<span>Go</span>
        </div>
      </div>
      <nav className="nav-links" style={{ flexWrap: 'wrap' }}>
        <Link to="/" className="nav-item">
          Home
        </Link>
        <Link to="/vehicles" className="nav-item">
          Vehicles
        </Link>
        {(!user || user.role !== 'admin') && (
          <Link to="/contact" className="nav-item">
            Contact Us
          </Link>
        )}
        {user ? (
          <>
            <Link
              to={user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'}
              className="nav-item"
            >
              Dashboard
            </Link>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="btn btn-outline"
              style={{ padding: '0.4rem 1rem' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/auth" className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>
              Login
            </Link>
            <Link to="/auth" className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>
              Book Now
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
