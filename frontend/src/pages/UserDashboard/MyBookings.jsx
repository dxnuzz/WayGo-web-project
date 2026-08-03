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

  //load customer bookings
  const fetchBookings = () =>{
    fetch(`${API_BASE_URL}/bookings.php?action=getByCustomer&customer_id=${user.user_id}`)
      .then((r) => r.json())
      .then((d) => d.success && setBookings(d.data || []));
  };

  useEffect(() => {if (user) fetchBookings();}, [user]);

  //reusable API call for booking actions
  const apiCall = async (action, id, extra = {}) =>{
    const r = await fetch(`${API_BASE_URL}/bookings.php?action=${action}`, {
      method: 'POST', 
      headers:{ 'Content-Type': 'application/json' },
      body: JSON.stringify({ booking_id: id, ...extra }),
    });
    const d = await r.json();
    if (d.success){
        fetchBookings(); 
    }else{
        alert(d.message);
    }
  };

  const onCancel = (id) => window.confirm('Cancel booking?') && apiCall('cancel', id, { customer_id: user.user_id });
  const onDelete = (id) => window.confirm('Permanently delete this booking record?') && apiCall('delete', id, { role: 'customer' });

    return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
        <h2 style={{color: '#1e293b', margin: 0}}>My Bookings</h2>
        {bookings.length > 0 && (
          <button onClick={() => navigate('/vehicles')} className="btn btn-primary">Book Another Ride</button>
        )}
      </div>
      {bookings.length > 0 ? (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {bookings.map((b) =>{
            const canCancel = b.status !== 'Cancelled' && b.status !== 'Completed';
            //calculate total booking amount
            const total = parseFloat(parseFloat(b.total_amount) + parseFloat(b.additional_price || 0)).toLocaleString();
            //status text color
            const statusColor = b.status === 'Cancelled' ? '#d90429' : (b.status === 'Confirmed' ? '#008000' : '#2b2d42');
            //avoid repeating brand name
            const vName = b.vehicle_name.toLowerCase().startsWith(b.brand.toLowerCase()) ? b.vehicle_name : `${b.brand} ${b.vehicle_name}`;
            
            return (
              <div key={b.booking_id} className="card" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', padding: '1.25rem' }}>
                <div>
                  <h4 style={{ color: '#2563eb', margin: '0 0 0.3rem 0' }}>{vName} ({b.licence_number})</h4>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 0.3rem 0' }}>
                    Booking #{b.booking_id} | Pickup: <strong>{b.pickup_date}</strong> to Return: <strong>{b.return_date}</strong>
                  </p>
                  <p style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>
                    Total: <span style={{ color: '#16a34a' }}>Rs. {total}</span> | Status: <span style={{ color: statusColor }}>{b.status}</span>
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {b.status !== 'Cancelled' && <button onClick={() => setSelectedReceipt(b)} className="receipt-btn">View Receipt</button>}
                  {canCancel ? (
                    <button onClick={() => onCancel(b.booking_id)} className="cancel-btn">Cancel</button>
                  ) : (
                    <button onClick={() => onDelete(b.booking_id)} className="delete-btn">Delete</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ color: '#64748b', marginBottom: '1rem' }}>You have no active vehicle bookings yet.</p>
          <button onClick={() => navigate('/vehicles')} className="btn btn-primary">Browse Vehicles & Book</button>
        </div>
      )}
      {/*receipt popup*/}
      <ReceiptModal receipt={selectedReceipt} onClose={() => setSelectedReceipt(null)} />
    </div>
    );
    };
export default MyBookings;