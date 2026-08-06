import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoriesSection = () => {
  const navigate = useNavigate();
  const categories = [
    { type: 'Car', icon: '🚗', desc: 'Compact & Sedans for smooth road trips' },
    { type: 'SUV', icon: '🚙', desc: 'Powerful SUVs for hill country & tough terrains' },
    { type: 'Van', icon: '🚐', desc: 'Spacious Vans for family & group travel' },
    { type: 'Bike', icon: '🏍️', desc: 'Agile Scooters & Motorbikes for quick city rides' },
    { type: 'Tuk Tuk', icon: '🛺', desc: 'Authentic 3-wheelers for local adventures' },
  ];

  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{ textAlign: 'center', color: '#1e293b', marginBottom: '0.5rem' }}>
        Vehicle Categories
      </h2>
      <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '2rem' }}>
        Choose from a wide variety of well-maintained vehicles
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {categories.map((cat) => (
          <div key={cat.type} className="card text-center" style={{ padding: '1.5rem 1rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{cat.icon}</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: '#1e293b' }}>
              {cat.type}s
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>{cat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
