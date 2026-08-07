import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../config/apiConfig';

const ViewBookings = () => {
    const [bookings, setBookings] = useState([]);

    const fetchBookings = () => {
        fetch(`${API_BASE_URL}/bookings.php?action=getAll`)
            .then((r) => r.json())
            .then((d) => d.success && setBookings(d.data));
    };

    useEffect(() => { fetchBookings(); }, []);

    const onComplete = async (bid, vid, scheduled_return_date) => {
        const actual = window.prompt('Enter actual return date (YYYY-MM-DD):', scheduled_return_date);
        if (!actual) return;
        if (actual.trim() && !/^\d{4}-\d{2}-\d{2}$/.test(actual.trim())) return alert('Invalid date format.');

        const r = await fetch(`${API_BASE_URL}/bookings.php?action=complete`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ booking_id: bid, vehicle_id: vid, actual_return_date: actual.trim() || scheduled_return_date }),
        });
        if ((await r.json()).success) fetchBookings();
    };

    const onDelete = async (id) => {
        if (!window.confirm('Permanently delete this booking record?')) return;
        const r = await fetch(`${API_BASE_URL}/bookings.php?action=delete`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ booking_id: id, role: 'admin' }),
        });
        const res = await r.json();
        if (res.success) fetchBookings(); else alert(res.message);
    };

    return (
        <div>
            <h2 style={{ color: '#1e293b', marginBottom: '1.5rem' }}>All Reservations</h2>
            <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                            {['ID', 'Customer', 'Vehicle', 'Pickup & Return', 'Total Amount', 'Status', 'Action'].map(h => (
                                <th key={h} style={{ padding: '1rem' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b) => (
                            <tr key={b.booking_id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '1rem' }}>#{b.booking_id}</td>
                                <td style={{ padding: '1rem', fontWeight: 600 }}>{b.f_name} {b.l_name}</td>
                                <td style={{ padding: '1rem' }}>{b.vehicle_name} ({b.licence_number})</td>
                                <td style={{ padding: '1rem' }}>{b.pickup_date} to {b.return_date}</td>
                                <td style={{ padding: '1rem' }}>Rs. {parseFloat(parseFloat(b.total_amount) + parseFloat(b.additional_price || 0)).toLocaleString()}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem',
                                        background: b.status === 'Confirmed' ? '#dbeafe' : b.status === 'Completed' ? '#dcfce7' : '#fee2e2',
                                        color: b.status === 'Confirmed' ? '#1e40af' : b.status === 'Completed' ? '#166534' : '#991b1b'
                                    }}>
                                        {b.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    {b.status === 'Confirmed' && (
                                        <button onClick={() => onComplete(b.booking_id, b.vehicle_id, b.return_date)} className="btn btn-outline" style={{ padding: '0.3rem 0.7rem', fontSize: '0.85rem' }}>
                                            Mark Returned
                                        </button>
                                    )}
                                    <button onClick={() => onDelete(b.booking_id)} className="delete-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ViewBookings;
