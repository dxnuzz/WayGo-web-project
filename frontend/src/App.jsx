import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home/Home';
import Booking from './pages/Booking/Booking';
import UserDashboard from './pages/UserDashboard/UserDashboardLayout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />

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
              
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
