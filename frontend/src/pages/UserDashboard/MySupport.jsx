import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config/apiConfig';

const MySupport = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [supportMessages, setSupportMessages] = useState([]);

   useEffect(() => {
    if (user) {
      fetch(`${API_BASE_URL}/contact.php?action=getByUser&user_id=${user.user_id}`)
        .then((r) => r.json())
        .then((d) => d.success && setSupportMessages(d.data || []));
    }
  }, [user]);

  const onDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      const r = await fetch(`${API_BASE_URL}/contact.php?action=delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, role: 'customer' }),
      });
      if ((await r.json()).success) {
        setSupportMessages((prev) => prev.filter((m) => m.id !== id));
      }
    }
  };

    return (
        



          );
};

export default MySupport;