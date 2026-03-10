import React from 'react';
import { Lock, Bell, Shield, Trash2 } from 'lucide-react';

const Settings = () => {
  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Settings</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your account configuration and privacy.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}><Lock size={20} /> Change Password</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
            <input type="password" placeholder="Current Password" style={{ padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid var(--color-border)' }} />
            <input type="password" placeholder="New Password" style={{ padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid var(--color-border)' }} />
            <input type="password" placeholder="Confirm New Password" style={{ padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid var(--color-border)' }} />
            <button className="btn-primary" style={{ alignSelf: 'start' }}>Update Password</button>
          </div>
        </div>

        <div className="card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}><Bell size={20} /> Notification Settings</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ transform: 'scale(1.2)' }} />
              <span>Email me when new suitable colleges are added</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ transform: 'scale(1.2)' }} />
              <span>Email me upcoming scholarship deadlines</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" style={{ transform: 'scale(1.2)' }} />
              <span>SMS notifications for important updates</span>
            </label>
          </div>
        </div>

        <div className="card" style={{ border: '1px solid var(--color-error)' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--color-error)' }}><Trash2 size={20} /> Danger Zone</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Once you delete your account, there is no going back. Please be certain.</p>
          <button style={{ backgroundColor: 'var(--color-error)', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontWeight: '500' }}>Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
