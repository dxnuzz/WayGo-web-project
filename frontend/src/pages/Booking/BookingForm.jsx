import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import API_BASE_URL from '../../config/apiConfig';

const BookingForm = ({ vehicle, onConfirm, setError }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ pickup_date: '', return_date: '' });

  const todayObj = new Date();
  const maxDateObj = new Date(todayObj);
  maxDateObj.setDate(todayObj.getDate() + 14);
  const minDate = todayObj.toISOString().split('T')[0];
  const maxDate = maxDateObj.toISOString().split('T')[0];

  const handleBook = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/bookings.php?action=create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_id: user.user_id,
          vehicle_id: vehicle.vehicle_id,
          pickup_date: formData.pickup_date,
          return_date: formData.return_date,
          per_day_amount: vehicle.rental_price_per_day,
        }),
      });
      const data = await res.json();
      if (data.success) {
        const days = Math.max(
          1,
          (new Date(formData.return_date) - new Date(formData.pickup_date)) / 86400000,
        );
        onConfirm({
          booking_id: data.booking_id,
          brand: vehicle.brand,
          vehicle_name: vehicle.vehicle_name,
          licence_number: vehicle.licence_number,
          pickup_date: formData.pickup_date,
          return_date: formData.return_date,
          per_day_amount: vehicle.rental_price_per_day,
          total_amount: vehicle.rental_price_per_day * days,
          status: 'Confirmed',
        });
      } else setError(data.message);
    } catch (err) {
      setError('Booking error occurred');
    }
  };

  return (
    <form onSubmit={handleBook}>
      <div style={{ marginBottom: '1rem' }}>
        <label>Pickup Date</label>
        <input
          type="date"
          className="form-control"
          value={formData.pickup_date}
          onChange={(e) => setFormData({ ...formData, pickup_date: e.target.value })}
          required
          min={minDate}
          max={maxDate}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>
      <div style={{ marginBottom: '1.25rem' }}>
        <label>Return Date</label>
        <input
          type="date"
          className="form-control"
          value={formData.return_date}
          onChange={(e) => setFormData({ ...formData, return_date: e.target.value })}
          required
          min={formData.pickup_date || minDate}
          max={maxDate}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>
      <div
        style={{
          padding: '0.75rem',
          background: '#fffbeb',
          color: '#b45309',
          borderRadius: '6px',
          fontSize: '0.85rem',
          marginBottom: '1rem',
          border: '1px solid #fde68a',
        }}
      >
        <strong>Important:</strong> You can only cancel within 3 hours from the booking time.
        Additional charges will apply for delayed returns.
        Vehicles can only be booked for dates up to 2 weeks from the current date.
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: '100%', padding: '0.7rem', cursor: 'pointer' }}
      >
        Confirm Reservation
      </button>
    </form>
  );
};

export default BookingForm;
