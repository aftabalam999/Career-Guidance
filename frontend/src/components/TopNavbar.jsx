import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bell, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown';

const TopNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    const fetchUnread = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('/api/notifications', config);
        setUnreadCount(data.filter(n => !n.isRead).length);
      } catch (err) {
        console.error('Error fetching notifications');
      }
    };
    fetchUnread();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="top-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div 
          onClick={() => setShowNotifications(!showNotifications)}
          style={{ position: 'relative', cursor: 'pointer', color: 'var(--text-secondary)' }}
        >
          <Bell size={24} />
          {unreadCount > 0 && (
            <div style={{ position: 'absolute', top: 0, right: 0, minWidth: '14px', height: '14px', backgroundColor: '#EF4444', borderRadius: '50%', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '800', color: 'white' }}>
              {unreadCount}
            </div>
          )}
          {showNotifications && <NotificationDropdown onClose={() => setShowNotifications(false)} />}
        </div>
        
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <UserCircle size={28} style={{ color: 'var(--color-primary)' }} />
              <span style={{ fontWeight: '500' }}>{user.name}</span>
            </div>

            {user.role === 'admin' && (
              <button 
                onClick={() => navigate('/admin')}
                className="btn-primary" 
                style={{ padding: '0.4rem 1rem', fontSize: '13px' }}
              >
                Admin Dashboard
              </button>
            )}

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
