import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, Search, UserCircle } from 'lucide-react';

const AdminNavbar = () => {
  const { user } = useAuth();

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
        <div style={{ position: 'relative', cursor: 'pointer', color: 'var(--text-secondary)' }}>
          <Bell size={22} />
          <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', backgroundColor: '#EF4444', borderRadius: '50%', border: '2px solid white' }}></div>
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
