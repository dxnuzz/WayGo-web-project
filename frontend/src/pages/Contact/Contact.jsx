//contact page
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

const Contact = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '850px', margin: '0 auto' }}>
      <h2 style={{ color: '#1e293b', marginBottom: '1.5rem', textAlign: 'center' }}>
        Contact WayGo Rentals
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}
      >
        <ContactInfo />
        <ContactForm user={user} />
      </div>
    </div>
  );
};

export default Contact;
