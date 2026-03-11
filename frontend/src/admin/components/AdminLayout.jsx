import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return null;
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
      <AdminSidebar />
      <AdminNavbar />
      <main style={{ marginLeft: '260px', paddingTop: '70px' }}>
        <div style={{ padding: '2.5rem' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
