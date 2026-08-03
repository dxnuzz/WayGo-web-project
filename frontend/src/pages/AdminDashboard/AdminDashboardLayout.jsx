import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import AdminHome from './AdminHome';
import ManageVehicles from './ManageVehicles';
import AddVehicle from './AddVehicle';
import ViewBookings from './ViewBookings';
import ViewUsers from './ViewUsers';
import ViewFeedbacks from './ViewFeedbacks';
import ViewContactMessages from './ViewContactMessages';

const AdminDashboardLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('stats');

    const [isEditMode, setIsEditMode] = useState(false);
    const [editVehicleId, setEditVehicleId] = useState(null);
    const initialData = {
        licence_number: '',
        vehicle_name: '',
        type: 'Car',
        brand: 'Toyota',
        color: '',
        rental_price_per_day: '',
        seats: '',
        fuel_type: 'Petrol',
        transmission: 'Auto',
        description: '',
    };
    const [vehicleData, setVehicleData] = useState(initialData);

    useEffect(() => {
        if (!user || user.role !== 'admin') navigate('/');
    }, [user, navigate]);

    const sidebarItems = [
        { id: 'stats', label: '📊 System Overview' },
        { id: 'manage_vehicles', label: '🚗 Manage Vehicles' },
        { id: 'bookings', label: '📑 View Bookings' },
        { id: 'users', label: '👥 View Customers' },
        { id: 'feedbacks', label: '⭐ Customer Reviews' },
        { id: 'contact_messages', label: '✉️ Support Inquiries' },
    ];

    return (
        <DashboardLayout
            sidebarProps={{
                title: 'Admin Control',
                items: sidebarItems,
                activeTab,
                onTabChange: setActiveTab,
                onLogout: () => {
                    logout();
                    navigate('/');
                },
                isDark: true,
            }}
        >
            {activeTab === 'stats' && <AdminHome />}
            {activeTab === 'manage_vehicles' && (
                <ManageVehicles
                    onAddClick={() => {
                        setIsEditMode(false);
                        setVehicleData(initialData);
                        setActiveTab('add_vehicle');
                    }}
                    onEdit={(v) => {
                        setVehicleData(v);
                        setEditVehicleId(v.vehicle_id);
                        setIsEditMode(true);
                        setActiveTab('add_vehicle');
                    }}
                />
            )}
            {activeTab === 'add_vehicle' && (
                <AddVehicle
                    isEditMode={isEditMode}
                    initialData={vehicleData}
                    adminId={user?.user_id}
                    onCancel={() => setActiveTab('manage_vehicles')}
                    onComplete={() => setActiveTab('manage_vehicles')}
                />
            )}
            {activeTab === 'bookings' && <ViewBookings />}
            {activeTab === 'users' && <ViewUsers />}
            {activeTab === 'feedbacks' && <ViewFeedbacks />}
            {activeTab === 'contact_messages' && <ViewContactMessages />}
        </DashboardLayout>
    );
};
export default AdminDashboardLayout;
