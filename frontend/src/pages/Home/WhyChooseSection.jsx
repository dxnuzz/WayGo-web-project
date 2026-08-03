import React from 'react';

const WhyChooseSection = () => {
  const features = [
    {
      icon: '📍',
      title: 'Prime Location',
      desc: 'Located conveniently on Main Street, Badulla, Sri Lanka.',
    },
    {
      icon: '💰',
      title: 'Best Daily Rates',
      desc: 'Clear prices with no hidden fees or surprise charges.',
    },
    {
      icon: '🛡️',
      title: 'Insured Fleet',
      desc: 'All vehicles are regularly serviced and fully insured for safety.',
    },
    {
      icon: '⚡',
      title: 'Fast & Easy Booking',
      desc: 'Book online in minutes and manage reservations via dashboard.',
    },
  ];

  return (
    <section
      style={{
        marginBottom: '3rem',
        background: '#f8fafc',
        padding: '2.5rem 1.5rem',
        borderRadius: '12px',
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#1e293b', marginBottom: '2rem' }}>
        Why Rent With WayGo?
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {features.map((f, i) => (
          <div key={i} className="card text-center">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{f.icon}</div>
            <h4 style={{ marginBottom: '0.5rem' }}>{f.title}</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseSection;
