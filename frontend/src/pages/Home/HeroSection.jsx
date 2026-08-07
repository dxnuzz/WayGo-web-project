import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section
      style={{
        textAlign: 'center',
        padding: '3.5rem 1.5rem',
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: 'white',
        borderRadius: '12px',
        marginBottom: '2.5rem',
      }}
    >
      <span
        style={{
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontSize: '0.85rem',
          color: '#60a5fa',
          fontWeight: 700,
          display: 'block',
          marginBottom: '0.5rem',
        }}
      >
        Self-Drive Rentals in Badulla
      </span>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: '#ffffff' }}>
        Explore Sri Lanka With WayGo
      </h1>
      <p
        style={{
          fontSize: '1.1rem',
          color: '#cbd5e1',
          marginBottom: '2rem',
          maxWidth: '650px',
          margin: '0 auto 2rem auto',
          lineHeight: '1.6',
        }}
      >
        Rent reliable Cars, SUVs, Vans, Bikes, and Tuk Tuks directly from our main branch in
        Badulla. Transparent daily rates & easy online booking.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          className="btn btn-primary"
          style={{ fontSize: '1rem', padding: '0.8rem 1.8rem', cursor: 'pointer' }}
          onClick={() => navigate('/vehicles')}
        >
          Browse All Vehicles
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
