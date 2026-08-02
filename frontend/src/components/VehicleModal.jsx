import React from 'react';
import { useNavigate } from 'react-router-dom';
import { currency } from './VehicleCard';

const VehicleModal = ({ vehicle, onClose }) => {
  const navigate = useNavigate();
  if (!vehicle) return null;

  const handleBookNow = () => {
    onClose();
    if (!localStorage.getItem('WayGo_user')) navigate('/auth');
    else navigate('/booking', { state: { vehicle } });
  };

  const defaultImage =
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80';
  const img = vehicle.image_path
    ? vehicle.image_path.startsWith('http')
      ? vehicle.image_path
      : `/WayGo-web/backend/${vehicle.image_path.replace(/^\//, '')}`
    : defaultImage;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '500px',
          overflow: 'hidden',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
        }}
      >
        <img
          src={img}
          alt={vehicle.vehicle_name}
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
        <div style={{ padding: '1.5rem' }}>
          <h3 style={{ color: '#1e293b', margin: '0 0 0.5rem 0' }}>
            {vehicle.brand} {vehicle.vehicle_name}
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Licence: {vehicle.licence_number} &bull; Color: {vehicle.color}
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5rem',
              fontSize: '0.85rem',
              marginBottom: '1rem',
              background: '#f8fafc',
              padding: '0.75rem',
              borderRadius: '6px',
            }}
          >
            <div>Seats: {vehicle.seats}</div>
            <div>Fuel: {vehicle.fuel_type}</div>
            <div>Transmission: {vehicle.transmission}</div>
            <div>
              Status:{' '}
              <span
                style={{
                  color: vehicle.availability === 'Available' ? '#16a34a' : '#d90429',
                  fontWeight: 600,
                }}
              >
                {vehicle.availability}
              </span>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1rem' }}>
            {vehicle.description || 'Clean, serviced, and ready for rental in Badulla.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ color: '#2563eb', margin: 0 }}>
              {currency(vehicle.rental_price_per_day)}/day
            </h4>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={onClose}
                className="btn btn-outline"
                style={{ padding: '0.4rem 0.8rem' }}
              >
                Close
              </button>
              {vehicle.availability === 'Available' && (
                <button
                  onClick={handleBookNow}
                  className="btn btn-primary"
                  style={{ padding: '0.4rem 0.8rem' }}
                >
                  Book Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleModal;
