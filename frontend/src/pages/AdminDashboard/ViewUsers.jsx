import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../config/apiConfig';

const ViewUsers = () => {
    const [usersList, setUsersList] = useState([]);

    const fetchUsers = () => {
        fetch(`${API_BASE_URL}/admin.php?action=getAllUsers`)
            .then((r) => r.json())
            .then((d) => d.success && setUsersList(d.data));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const onToggleStatus = async (uid, cur) => {
        const r = await fetch(`${API_BASE_URL}/admin.php?action=toggleUserStatus`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: uid, status: cur === 'Active' ? 'Suspended' : 'Active' }),
        });
        const d = await r.json();
        if (d.success) fetchUsers();
    };

    return (
        <div>
            <h2 style={{ color: '#1e293b', marginBottom: '1.5rem' }}>Customer Accounts</h2>
            <div
                style={{
                    overflowX: 'auto',
                    background: '#fff',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                }}
            >
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                            <th style={{ padding: '1rem' }}>ID</th>
                            <th style={{ padding: '1rem' }}>Full Name</th>
                            <th style={{ padding: '1rem' }}>Email</th>
                            <th style={{ padding: '1rem' }}>Phone</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList.map((u) => (
                            <tr key={u.user_id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '1rem' }}>#{u.user_id}</td>
                                <td style={{ padding: '1rem', fontWeight: 600 }}>
                                    {u.f_name} {u.l_name}
                                </td>
                                <td style={{ padding: '1rem' }}>{u.email}</td>
                                <td style={{ padding: '1rem' }}>{u.phone_number}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span
                                        style={{
                                            color: u.status === 'Active' ? '#16a34a' : '#d90429',
                                            fontWeight: 600,
                                        }}
                                    >
                                        {u.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <button
                                        onClick={() => onToggleStatus(u.user_id, u.status)}
                                        className="btn btn-outline"
                                        style={{
                                            padding: '0.3rem 0.7rem',
                                            fontSize: '0.85rem',
                                            borderColor: u.status === 'Active' ? '#d90429' : '#16a34a',
                                            color: u.status === 'Active' ? '#d90429' : '#16a34a',
                                        }}
                                    >
                                        {u.status === 'Active' ? 'Suspend' : 'Activate'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ViewUsers;
