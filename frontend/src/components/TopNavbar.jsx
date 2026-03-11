import React from 'react';
import { Bell, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TopNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="top-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Bell size={24} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
        
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <UserCircle size={28} style={{ color: 'var(--color-primary)' }} />
              <span style={{ fontWeight: '500' }}>{user.name}</span>
            </div>
            <button 
              onClick={handleLogout}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.4rem', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                color: 'var(--color-error)',
                fontSize: '14px',
                fontWeight: '500' 
              }}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        ) : (
          <button 
            className="btn-primary" 
            onClick={() => navigate('/login')}
            style={{ padding: '0.5rem 1.2rem' }}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default TopNavbar;
