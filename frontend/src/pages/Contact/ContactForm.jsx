import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config/apiConfig';

const ContactForm = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    if (user) {
      fetch(`${API_BASE_URL}/auth.php?action=getProfile&user_id=${user.user_id}`)
        .then((r) => r.json())
        .then((d) => {
          if (d.success && d.data) {
            setFormData((prev) => ({
              ...prev,
              name: `${d.data.f_name || ''} ${d.data.l_name || ''}`.trim() || user.email,
              email: user.email,
            }));
          }
        });
    }
  }, [user]);

  useEffect(() => {
    let t;
    if (status.message) t = setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    return () => clearTimeout(t);
  }, [status.message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to submit an inquiry.');
      navigate('/auth');
      return;
    }
    if (user.role === 'admin') {
      setStatus({ type: 'error', message: 'Admins cannot send messages to themselves.' });
      return;
    }
    setStatus({ type: '', message: '' });
    try {
      const res = await fetch(`${API_BASE_URL}/contact.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, user_id: user.user_id }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData((prev) => ({ ...prev, message: '' }));
      } else setStatus({ type: 'error', message: data.message });
    } catch (err) {
      setStatus({ type: 'error', message: 'Connection error' });
    }
  };

  return (
    <div
      className="card"
      style={{
        background: '#fff',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
      }}
    >
      {status.message && (
        <div
          style={{
            padding: '0.5rem',
            borderRadius: '6px',
            marginBottom: '1rem',
            background: status.type === 'success' ? '#e6ffe6' : '#ffe6e6',
            color: status.type === 'success' ? '#008000' : '#d90429',
          }}
        >
          {status.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.75rem' }}>
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            readOnly={!!user}
            required
            style={{ width: '100%', padding: '0.5rem', background: user ? '#f1f5f9' : '#fff' }}
          />
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            readOnly={!!user}
            required
            style={{ width: '100%', padding: '0.5rem', background: user ? '#f1f5f9' : '#fff' }}
          />
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <label>Message</label>
          <textarea
            className="form-control"
            rows="4"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', padding: '0.6rem', cursor: 'pointer' }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
