import React from 'react';

const ContactInfo = () => (
  <div
    className="card"
    style={{ background: '#1e293b', color: 'white', padding: '1.5rem', borderRadius: '12px' }}
  >
    <h3 style={{ color: '#60a5fa', marginBottom: '0.3rem' }}>🏢 Address</h3>
    <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>Main Street, Badulla, Sri Lanka</p>
    <h3 style={{ color: '#60a5fa', marginBottom: '0.3rem' }}>📞 Phone</h3>
    <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>+94 74 3232 200</p>
    <h3 style={{ color: '#60a5fa', marginBottom: '0.3rem' }}>✉️ Email</h3>
    <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>info@waygo.lk</p>
    <h3 style={{ color: '#60a5fa', marginBottom: '0.3rem' }}>🕒 Hours</h3>
    <p style={{ color: '#cbd5e1', margin: 0 }}>Every Day: 7:00 AM – 8:00 PM</p>
  </div>
);

export default ContactInfo;
