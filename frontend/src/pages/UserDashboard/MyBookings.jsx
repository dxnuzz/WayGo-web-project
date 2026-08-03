import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import API_BASE_URL from '../../config/apiConfig';
import ReceiptModal from '../../components/ReceiptModal';

const MyBookings = () =>{
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const fetchBookings = () =>{
    fetch(`${API_BASE_URL}/bookings.php?action=getByCustomer&customer_id=${user.user_id}`)
      .then((r) => r.json())
      .then((d) => d.success && setBookings(d.data || []));
  };

  useEffect(() => {if (user) fetchBookings();}, [user]);

  const apiCall = async (action, id, extra = {}) =>{
    const r = await fetch(`${API_BASE_URL}/bookings.php?action=${action}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ booking_id: id, ...extra }),
    });
    const d = await r.json();
    if (d.success) fetchBookings(); else alert(d.message);
  };

  const onCancel = (id) => window.confirm('Cancel booking?') && apiCall('cancel', id, { customer_id: user.user_id });
  const onDelete = (id) => window.confirm('Permanently delete this booking record?') && apiCall('delete', id, { role: 'customer' });

    return (

    );
    };
export default MyBookings;