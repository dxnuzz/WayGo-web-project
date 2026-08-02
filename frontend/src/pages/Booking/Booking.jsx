import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ReceiptModal from '../../components/ReceiptModal';
import BookingForm from './BookingForm';

const Booking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const vehicle = state?.vehicle;
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState(null);

  if (!vehicle) {
    navigate('/vehicles');
    return null;
  }
  if (!user) {
    navigate('/auth');
    return null;
  }
  if (receipt)
    return <ReceiptModal receipt={receipt} onClose={() => navigate('/user-dashboard')} />;

  return (
    <div
      className="card"
      style={{
        maxWidth: '550px',
        margin: '2rem auto',
        padding: '1.5rem',
        borderRadius: '12px',
        background: '#fff',
      }}
    >
      <h2 style={{ color: '#1e293b', marginBottom: '1rem' }}>
        Reserve{' '}
        {vehicle.vehicle_name.toLowerCase().startsWith(vehicle.brand.toLowerCase())
          ? vehicle.vehicle_name
          : `${vehicle.brand} ${vehicle.vehicle_name}`}
      </h2>
      {error && (
        <div
          className="alert alert-error"
          style={{
            color: '#d90429',
            background: '#ffe6e6',
            padding: '0.5rem',
            borderRadius: '6px',
            marginBottom: '1rem',
          }}
        >
          {error}
        </div>
      )}
      <div
        style={{
          background: '#f8fafc',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          marginBottom: '1.25rem',
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>
            {vehicle.vehicle_name.toLowerCase().startsWith(vehicle.brand.toLowerCase())
              ? vehicle.vehicle_name
              : `${vehicle.brand} ${vehicle.vehicle_name}`}
          </strong>{' '}
          &bull; Rs. {parseFloat(vehicle.rental_price_per_day).toLocaleString()} / day
        </p>
      </div>
      <BookingForm vehicle={vehicle} onConfirm={setReceipt} setError={setError} />
    </div>
  );
};

export default Booking;
