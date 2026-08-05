import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home/Home';

import Vehicles from './pages/Vehicles/Vehicles';
import Booking from './pages/Booking/Booking';
import UserDashboard from './pages/UserDashboard/UserDashboardLayout';
import AdminDashboard from './pages/AdminDashboard/AdminDashboardLayout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              
              <Route path="/vehicles" element={<Vehicles />} />

               <Route
                path="/booking"
                element={
                  <ProtectedRoute>
                    <Booking />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/user-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['customer', 'admin']}>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
