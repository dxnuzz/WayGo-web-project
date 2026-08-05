import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../config/apiConfig';

const AdminHome = () => {
    const [stats, setStats] = useState({});

    useEffect(() => {
        fetch(`${API_BASE_URL}/admin.php?action=getStats&t=${Date.now()}`)
            .then((r) => r.json())
            .then((d) => d.success && setStats(d.data));
    }, []);

    return (
        <div>
            <h2 style={{ color: '#1e293b', marginBottom: '1.5rem' }}>Website & Fleet Statistics</h2>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                }}
            >
                <div className="card text-center" style={{ padding: '2rem 1rem' }}>
                    <h3 style={{ color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                        Total Vehicles
                    </h3>
                    <div style={{ fontSize: '3rem', color: '#2563eb', fontWeight: 800 }}>
                        {stats.total_vehicles || 0}
                    </div>
                </div>
                <div className="card text-center" style={{ padding: '2rem 1rem' }}>
                    <h3 style={{ color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                        Ongoing Bookings
                    </h3>
                    <div style={{ fontSize: '3rem', color: '#2563eb', fontWeight: 800 }}>
                        {stats.total_bookings || 0}
                    </div>
                </div>
                <div className="card text-center" style={{ padding: '2rem 1rem' }}>
                    <h3 style={{ color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                        Registered Customers
                    </h3>
                    <div style={{ fontSize: '3rem', color: '#2563eb', fontWeight: 800 }}>
                        {stats.total_customers || 0}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
