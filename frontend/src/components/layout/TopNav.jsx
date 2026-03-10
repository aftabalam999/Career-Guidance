import React from 'react';
import { LogOut, User as UserIcon } from 'lucide-react';

const TopNav = ({ onLogout, user }) => {
    return (
        <div className="top-navbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)' }}>
                    <UserIcon size={20} />
                    <span>{user?.name || 'User'}</span>
                </div>
                <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', color: 'var(--error-color)', padding: '0.5rem', fontWeight: '500' }}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default TopNav;
