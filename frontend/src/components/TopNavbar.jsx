import React from 'react';
import { Bell, UserCircle } from 'lucide-react';

const TopNavbar = () => {
  return (
    <div className="top-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Bell size={24} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <UserCircle size={28} style={{ color: 'var(--color-primary)' }} />
          <span style={{ fontWeight: '500' }}>Student Name</span>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
