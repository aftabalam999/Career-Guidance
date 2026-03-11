import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  ClipboardCheck, 
  Users, 
  Award, 
  MessageSquare, 
  BarChart3, 
  Upload, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = () => {
  const { logout } = useAuth();
  
  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Colleges', path: '/admin/colleges', icon: <Building2 size={20} /> },
    { name: 'Aptitude tests', path: '/admin/tests', icon: <ClipboardCheck size={20} /> },
    { name: 'Users', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'Scholarships', path: '/admin/scholarships', icon: <Award size={20} /> },
    { name: 'Reviews', path: '/admin/reviews', icon: <MessageSquare size={20} /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <BarChart3 size={20} /> },
    { name: 'Dataset Import', path: '/admin/import', icon: <Upload size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div style={{ width: '260px', height: '100vh', backgroundColor: '#111827', color: 'white', position: 'fixed', left: 0, top: 0, display: 'flex', flexDirection: 'column', zIndex: 1000 }}>
      <div style={{ padding: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#7C3AED' }}></div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Admin Panel</h2>
      </div>
      
      <nav style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {menuItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path} 
            end={item.path === '/admin'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.8rem 1rem',
              borderRadius: '8px',
              textDecoration: 'none',
              color: isActive ? 'white' : 'rgba(255,255,255,0.6)',
              backgroundColor: isActive ? '#7C3AED' : 'transparent',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            })}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <button 
          onClick={logout}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem 1rem', borderRadius: '8px', border: 'none', background: 'none', color: '#EF4444', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
