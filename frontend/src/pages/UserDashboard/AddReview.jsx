import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import API_BASE_URL from '../../config/apiConfig';
import StarRating from '../../components/StarRating';

const AddReview = ({ setGlobalMessage, setGlobalError }) => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(5);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const r = await fetch(`${API_BASE_URL}/feedbacks.php?action=submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.user_id, rating, message: feedbackMsg }),
    });
    const d = await r.json();
    setSubmitting(false);
    if (d.success) {
      setGlobalMessage('Review submitted!');
      setGlobalError('');
      setFeedbackMsg('');
      setRating(5);
    } else {
      setGlobalError(d.message);
      setGlobalMessage('');
    }
  };
return (
    <div style={{ maxWidth: '580px' }}>
      <h2 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>Write a Website Review</h2>
      <p style={{ marginBottom: '1.5rem', color: '#64748b', fontSize: '0.95rem' }}>
        Share your experience with WayGo. Approved reviews will be featured on our homepage!
      </p>
      <form onSubmit={onSubmit}>
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
            Your Rating
          </label>
          <StarRating rating={rating} onSelect={setRating} />
          <span
            style={{
              fontSize: '0.85rem',
              color: '#64748b',
              marginTop: '0.25rem',
              display: 'block',
            }}
          >
            Selected: {rating} out of 5 Stars
          </span>
        </div>

        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>
            Review Message
          </label>
          <textarea
            name="message"
            className="form-control"
            rows="4"
            placeholder="Tell us about your rental experience..."
            value={feedbackMsg}
            onChange={(e) => setFeedbackMsg(e.target.value)}
            required
            style={{ width: '100%', padding: '0.75rem', resize: 'vertical' }}
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
          style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}
        >
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default AddReview;