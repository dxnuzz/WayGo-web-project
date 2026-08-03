import React from 'react';

const LocationSection = () => {
  return (
    <section
      style={{
        background: '#1e293b',
        color: 'white',
        padding: '2.5rem 1.5rem',
        borderRadius: '12px',
        textAlign: 'center',
        marginBottom: '2rem',
      }}
    >
      <h2 style={{ color: '#ffffff', marginBottom: '0.75rem' }}>
        Visit Our Main Office & Rental Hub
      </h2>
      <p style={{ color: '#cbd5e1', fontSize: '1.05rem', marginBottom: '1.25rem' }}>
        🏢 <strong>WayGo Vehicle Rentals</strong> — Main Street, Badulla, Sri Lanka
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          fontSize: '0.95rem',
          color: '#94a3b8',
        }}
      >
        <div>🕒 Open Daily: 7:00 AM – 8:00 PM</div>
        <div>📞 Hotline: +94 74 3232 200 / 055 222 3344</div>
        <div>✉️ Email: info@waygo.lk</div>
      </div>
    </section>
  );
};

export default LocationSection;
