import React from 'react';
import statsIcon from '../../assets/stats-icon.svg';
import vehicleIcon from '../../assets/vehicle-icon.svg';
import bookingIcon from '../../assets/booking-icon.svg';
import userIcon from '../../assets/user-icon.svg';
import feedbackIcon from '../../assets/feedback-icon.svg';
import logoutIcon from '../../assets/logout-icon.svg';

const AdminSidebar = ({ activeTab, onTabChange, isEditMode, onLogout }) => {
    const items = [
        { id: 'stats', icon: statsIcon, label: 'System Overview' },
        { id: 'manage_vehicles', icon: vehicleIcon, label: 'Manage Vehicles' },
        { id: 'bookings', icon: bookingIcon, label: 'View Bookings' },
        { id: 'users', icon: userIcon, label: 'View Customers' },
        { id: 'feedbacks', icon: feedbackIcon, label: 'Customer Reviews' },
    ];

    return (
        <div
            style={{
                width: '240px',
                flexShrink: 0,
                background: '#0f172a',
                padding: '1.5rem 1rem',
                borderRadius: '12px',
                color: 'white',
            }}
        >
            <h3 style={{ padding: '0 0.5rem', color: '#93c5fd', marginBottom: '1.25rem' }}>
                Admin Control
            </h3>
            {items.map((item) => (
                <div
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        marginBottom: '0.5rem',
                        background: activeTab === item.id ? '#2563eb' : 'transparent',
                        color: activeTab === item.id ? '#fff' : '#cbd5e1',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <img
                        src={item.icon}
                        alt=""
                        style={{
                            width: '18px',
                            height: '18px',
                            marginRight: '10px',
                            filter: activeTab === item.id ? 'invert(1)' : 'invert(0.8)',
                        }}
                    />
                    {item.label}
                </div>
            ))}
            <div
                onClick={onLogout}
                style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginTop: '2rem',
                    color: '#f87171',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <img
                    src={logoutIcon}
                    alt=""
                    style={{
                        width: '18px',
                        height: '18px',
                        marginRight: '10px',
                        filter: 'invert(0.5) sepia(1) saturate(50) hue-rotate(330deg)',
                    }}
                />
                Logout
            </div>
        </div>
    );
};

export default AdminSidebar;
