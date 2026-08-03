import React from 'react';

const ReceiptModal = ({ receipt, onClose }) => {
  if (!receipt) return null;
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
          padding: '2rem',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '480px',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
        }}
      >
        <h2
          style={{
            color: '#1e293b',
            textAlign: 'center',
            marginBottom: '1rem',
            borderBottom: '2px solid #f1f5f9',
            paddingBottom: '0.5rem',
          }}
        >
          WayGo Rental Receipt
        </h2>
        <div style={{ marginBottom: '1.25rem', lineHeight: '1.8', fontSize: '0.95rem' }}>
          <p>
            <strong>Booking ID:</strong> #{receipt.booking_id}
          </p>
          <p>
            <strong>Vehicle:</strong> {receipt.vehicle_name} ({receipt.licence_number})
          </p>
          <p>
            <strong>Rent Date:</strong> {receipt.pickup_date}
          </p>
          <p>
            <strong>Selected Returned Date:</strong> {receipt.return_date}
          </p>
          {receipt.actual_return_date && (
            <p>
              <strong>Actual Returned Date:</strong>{' '}
              <span style={{ color: '#ef4444', fontWeight: 600 }}>
                {receipt.actual_return_date}
              </span>
            </p>
          )}
          <p>
            <strong>Daily Rate:</strong> Rs. {parseFloat(receipt.per_day_amount).toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong>{' '}
            <span style={{ color: '#16a34a', fontWeight: 600 }}>{receipt.status}</span>
          </p>
        </div>
        <div
          style={{
            borderTop: '2px solid #f1f5f9',
            paddingTop: '1rem',
            marginBottom: '1.5rem',
            textAlign: 'right',
          }}
        >
          {receipt.additional_price > 0 && (
            <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                Booked Price: Rs. {parseFloat(receipt.total_amount).toLocaleString()}
              </p>
              <p style={{ margin: 0, color: '#ef4444' }}>
                Additional Price (Delayed): Rs.{' '}
                {parseFloat(receipt.additional_price).toLocaleString()}
              </p>
            </div>
          )}
          <h3 style={{ color: '#2563eb', margin: 0 }}>
            Total Amount: Rs.{' '}
            {parseFloat(
              parseFloat(receipt.total_amount) + parseFloat(receipt.additional_price || 0),
            ).toLocaleString()}
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={() => window.print()}
            className="btn btn-primary"
            style={{ cursor: 'pointer' }}
          >
            Print Receipt
          </button>
          <button onClick={onClose} className="btn btn-outline" style={{ cursor: 'pointer' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
