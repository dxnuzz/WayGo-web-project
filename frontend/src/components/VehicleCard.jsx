import React from 'react';
import { useNavigate } from 'react-router-dom';

const VehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    const user = localStorage.getItem('WayGo_user');
    if (!user) navigate('/auth');
    else navigate('/booking', { state: { vehicle } });
  };

  const defaultImage =
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80';
  
  const rawImagePath = vehicle.image_path || '';
  const imagePath = rawImagePath.replace('/WayGo-web/', '/WayGo-web-project/');
  
  const imageUrl = imagePath
    ? imagePath.startsWith('http')
      ? imagePath
      : `/WayGo-web-project/backend/${imagePath.replace(/^\//, '')}`
    : defaultImage;

  return (
    <div className="card vehicle-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <img
        src={imageUrl}
        alt={vehicle.vehicle_name}
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
      <div className="vehicle-card-body" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 className="vehicle-title">
          {vehicle.vehicle_name.toLowerCase().startsWith(vehicle.brand.toLowerCase())
            ? vehicle.vehicle_name
            : `${vehicle.brand} ${vehicle.vehicle_name}`}
        </h3>
        <div className="vehicle-price">
          Rs. {vehicle.rental_price_per_day}{' '}
          <span style={{ fontSize: '1rem', color: '#8d99ae', fontWeight: 'normal' }}>/ day</span>
        </div>
        <div className="vehicle-details">
          <span className="badge">{vehicle.type}</span>
          <span className="badge">{vehicle.seats} Seats</span>
          <span className="badge">{vehicle.transmission}</span>
          <span className="badge">{vehicle.fuel_type}</span>
          <span
            className="badge"
            style={{
              backgroundColor:
                vehicle.color.toLowerCase() === 'white' ? '#f0f0f0' : vehicle.color.toLowerCase(),
              color: ['white', 'yellow', 'beige', 'pink'].includes(vehicle.color.toLowerCase())
                ? '#000'
                : '#fff',
            }}
          >
            {vehicle.color}
          </span>
        </div>
        <p className="mb-3" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
          {vehicle.description}
        </p>
        <div className="mb-3" style={{ marginTop: 'auto' }}>
          <span
            className={`badge ${vehicle.availability === 'Available' ? 'available' : 'rented'}`}
          >
            {vehicle.availability}
          </span>
        </div>
        <button
          className="btn btn-primary"
          style={{ width: '100%' }}
          onClick={handleBookNow}
          disabled={vehicle.availability !== 'Available'}
        >
          {vehicle.availability === 'Available' ? 'Book Now' : 'Not Available'}
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
