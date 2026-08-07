import React from 'react';
import Sidebar from './Sidebar';
const DashboardLayout = ({ sidebarProps, message, errorMessage, children }) => {
   

    return (<div className="dashboard-layout-container" style={{ minHeight: '80vh', padding: '1rem 0' }}>
      <Sidebar {...sidebarProps} />
      <div className="dashboard-main-content">
        {message && (
          <div
            className="alert alert-success"
            style={{
              background: '#e6ffe6',
              color: '#008000',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              marginBottom: '1rem',
            }}
          >
            {message}
          </div>
        )}
        {errorMessage && (
          <div
            className="alert alert-error"
            style={{
              background: '#ffe6e6',
              color: '#d90429',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              marginBottom: '1rem',
            }}
          >
            {errorMessage}
          </div>
        )}
        {children}
      </div>
    </div>
    );
    };

export default DashboardLayout; 