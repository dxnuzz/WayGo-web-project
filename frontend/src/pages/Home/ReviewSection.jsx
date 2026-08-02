import React from 'react';
import StarRating from '../../components/StarRating';

const ReviewsSection = ({ feedbacks = [] }) => {
  if (!feedbacks || feedbacks.length === 0) return null;

  return (
    <section className="reviews" style={{ marginBottom: '3rem' }}>
      <h2 style={{ textAlign: 'center', color: '#1e293b', marginBottom: '0.5rem' }}>
        Customer Reviews
      </h2>
      <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '2rem' }}>
        See what travelers say about WayGo
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {feedbacks.map((f) => (
          <div
            key={f.feedback_id}
            className="card"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <StarRating rating={f.rating} />
              <p
                style={{
                  fontStyle: 'italic',
                  color: '#334155',
                  margin: '0.5rem 0 1rem 0',
                  lineHeight: '1.5',
                }}
              >
                "{f.message}"
              </p>
            </div>
            <div
              style={{
                borderTop: '1px solid #e2e8f0',
                paddingTop: '0.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <strong style={{ color: '#2563eb', fontSize: '0.95rem' }}>
                {f.f_name} {f.l_name}
              </strong>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                {f.created_at ? new Date(f.created_at).toLocaleDateString() : ''}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
