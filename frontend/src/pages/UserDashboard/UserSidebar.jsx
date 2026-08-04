import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserSidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const navigate = useNavigate();

  //dashboard menu items
  const items = [
    { id: 'bookings', label: '📋 My Bookings' },
    { id: 'profile', label: '👤 My Profile' },
    { id: 'feedback', label: '⭐ Add Review' },
    { id: 'support', label: '💬 Support Messages' },
  ];

  return (
    <div
      style={{
        width: '240px',
        flexShrink: 0,
        background: '#f8fafc',
        padding: '1.5rem 1rem',
        borderRadius: '12px',
      }}
    >
      <h3 style={{ padding: '0 0.5rem', color: '#1e293b', marginBottom: '1.25rem' }}>
        User Dashboard
      </h3>

      {/*display all dashboard menu options*/}
      {items.map((item) => (       
        <div
          key={item.id}
          onClick={() => setActiveTab(item.id)}//switch to active dashboard tab
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '0.5rem',
            fontWeight: 500,

            //highlight selected menu item
            background: activeTab === item.id ? '#2563eb' : 'transparent',
            color: activeTab === item.id ? '#fff' : '#334155',
          }}
        >
          {item.label}
        </div>
      ))}

      {/*logout button*/}
      <div
        onClick={onLogout}
        style={{
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '2rem',
          color: '#d90429',
          fontWeight: 600,
        }}
      >
        🚪 Logout
      </div>
    </div>
  );
};

export default UserSidebar;
