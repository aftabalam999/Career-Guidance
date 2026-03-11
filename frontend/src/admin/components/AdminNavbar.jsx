import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Bell, Search, UserCircle } from 'lucide-react';
import NotificationDropdown from '../../components/NotificationDropdown';

const AdminNavbar = () => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('/api/notifications', config);
        setUnreadCount(data.filter(n => !n.isRead).length);
      } catch (err) {
        console.error('Error fetching unread notifications');
      }
    };
    fetchUnread();
    
    // Refresh every minute
    const interval = setInterval(fetchUnread, 60000);
    return () => clearInterval(interval);
  }, [user.token]);

  return (
    <div style={{ height: '70px', width: 'calc(100% - 260px)', position: 'fixed', right: 0, top: 0, backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2.5rem', zIndex: 999 }}>
      <div style={{ width: '350px', position: 'relative' }}>
        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
        <input 
          type="text" 
          placeholder="Search for something..." 
          style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: '10px', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'var(--color-background)', fontSize: '14px' }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div 
          onClick={() => setShowNotifications(!showNotifications)}
          style={{ position: 'relative', cursor: 'pointer', color: 'var(--text-secondary)' }}
        >
          <Bell size={22} />
          {unreadCount > 0 && (
            <div style={{ position: 'absolute', top: '-1px', right: '-1px', minWidth: '14px', height: '14px', backgroundColor: '#EF4444', borderRadius: '50%', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '800', color: 'white' }}>
              {unreadCount}
            </div>
          )}
          
          {showNotifications && <NotificationDropdown onClose={() => setShowNotifications(false)} />}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderLeft: '1px solid var(--color-border)', paddingLeft: '1.5rem' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>{user?.name}</p>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-accent)', fontWeight: '600' }}>Platform Admin</p>
          </div>
          <div style={{ backgroundColor: '#7C3AED', color: 'white', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '800' }}>
            {user?.name?.charAt(0)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
