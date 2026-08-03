import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import MyBookings from './MyBookings';
import MyProfile from './MyProfile';
import AddReview from './AddReview';
import MySupport from './MySupport';

const UserDashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!user) navigate('/auth');
  }, [user, navigate]);
  useEffect(() => {
    let t;
    if (message || errorMessage)
      t = setTimeout(() => {
        setMessage('');
        setErrorMessage('');
      }, 3000);
    return () => clearTimeout(t);
  }, [message, errorMessage]);

  const sidebarItems = [
    { id: 'bookings', label: '📋 My Bookings' },
    { id: 'profile', label: '👤 My Profile' },
    { id: 'feedback', label: '⭐ Add Review' },
    { id: 'support', label: '💬 Support Messages' },
  ];

  return (
    <DashboardLayout
      message={message}
      errorMessage={errorMessage}
      sidebarProps={{
        title: 'User Dashboard',
        items: sidebarItems,
        activeTab: activeTab,
        onTabChange: setActiveTab,
        onLogout: () => {
          logout();
          navigate('/');
        },
        isDark: true,
      }}
    >
      {activeTab === 'bookings' && <MyBookings />}
      {activeTab === 'profile' && (
        <MyProfile setGlobalMessage={setMessage} setGlobalError={setErrorMessage} />
      )}
      {activeTab === 'feedback' && (
        <AddReview setGlobalMessage={setMessage} setGlobalError={setErrorMessage} />
      )}
      {activeTab === 'support' && <MySupport />}
    </DashboardLayout>
  );
};

export default UserDashboardLayout;
