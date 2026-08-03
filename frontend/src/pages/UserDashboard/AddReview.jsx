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
