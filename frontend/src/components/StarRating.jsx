import React from 'react';

const StarRating = ({ rating = 5, onSelect = null }) => {
  const num = parseInt(rating) || 5;
  return (
    <div style={{ display: 'inline-flex', gap: '2px', color: '#f59e0b', fontSize: '1.2rem' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onSelect && onSelect(star)}
          style={{ cursor: onSelect ? 'pointer' : 'default' }}
        >
          {star <= num ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
