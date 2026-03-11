import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bell, X, Check, Trash2, Info, AlertTriangle, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const NotificationDropdown = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('/api/notifications', config);
      setNotifications(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setLoading(false);
    }
  };

  const markRead = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`/api/notifications/${id}`, {}, config);
      setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      showToast('Error marking as read', 'error');
    }
  };

  const deleteNotif = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`/api/notifications/${id}`, config);
      setNotifications(notifications.filter(n => n._id !== id));
      showToast('Notification deleted', 'success');
    } catch (err) {
      showToast('Error deleting notification', 'error');
    }
  };

  return (
    <div 
      className="card" 
      style={{ 
        position: 'absolute', 
        top: '60px', 
        right: '0', 
        width: '380px', 
        maxHeight: '500px', 
        overflowY: 'auto', 
        zIndex: 1000, 
        padding: '0',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
    >
      <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-background)' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '800' }}>Notifications</h3>
        <button onClick={onClose} style={{ background: 'none', padding: '4px', color: 'var(--text-secondary)' }}>
          <X size={18} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading...</div>
        ) : notifications.length === 0 ? (
          <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
            <Bell size={40} style={{ margin: '0 auto 1rem', opacity: 0.1 }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>No new notifications</p>
          </div>
        ) : (
          notifications.map(n => (
            <div 
              key={n._id} 
              style={{ 
                padding: '1.25rem', 
                borderBottom: '1px solid var(--color-border)', 
                display: 'flex', 
                gap: '1rem',
                backgroundColor: n.isRead ? 'white' : 'rgba(124, 58, 237, 0.03)',
                transition: 'background 0.2s',
                position: 'relative'
              }}
            >
              <div style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '10px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: n.type === 'system' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                color: n.type === 'system' ? 'var(--color-error)' : 'var(--color-accent)',
                flexShrink: 0
              }}>
                {n.type === 'system' ? <AlertTriangle size={18} /> : <Info size={18} />}
              </div>
              
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: n.isRead ? '400' : '600', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                  {n.message}
                </p>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>
                  {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(n.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {!n.isRead && (
                  <button 
                    onClick={() => markRead(n._id)} 
                    style={{ background: 'none', padding: '4px', color: 'var(--color-primary)', title: 'Mark as read' }}
                  >
                    <Check size={16} />
                  </button>
                )}
                <button 
                  onClick={() => deleteNotif(n._id)} 
                  style={{ background: 'none', padding: '4px', color: 'var(--color-error)', opacity: 0.5 }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ padding: '0.75rem', textAlign: 'center', borderTop: '1px solid var(--color-border)' }}>
        <button style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
          See matches from AI Advisor <ExternalLink size={12} />
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
