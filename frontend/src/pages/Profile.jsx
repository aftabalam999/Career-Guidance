import React from 'react';
import { User, Book, MapPin, DollarSign, Target } from 'lucide-react';

const Profile = () => {
  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Student Profile</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your academic details and preferences for better AI recommendations.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Personal Info */}
        <div className="card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}><User size={20} /> Personal Information</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Full Name</label>
              <input type="text" defaultValue="Student Name" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid var(--color-border)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
              <input type="email" defaultValue="student@example.com" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid var(--color-border)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone</label>
              <input type="text" defaultValue="+91 9876543210" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid var(--color-border)' }} />
            </div>
          </div>
        </div>

        {/* Academic Details */}
        <div className="card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}><Book size={20} /> Academic Details</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>10th Marks (%)</label>
              <input type="number" defaultValue="88" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid var(--color-border)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>12th Marks (%)</label>
              <input type="number" defaultValue="92" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid var(--color-border)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Board / Stream</label>
              <input type="text" defaultValue="CBSE - Science" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid var(--color-border)' }} />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}><Target size={20} /> Preferences</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.5rem', fontWeight: '500' }}><Book size={16} /> Preferred Course</label>
              <select style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid var(--color-border)' }}>
                <option>Computer Science</option>
                <option>Mechanical</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.5rem', fontWeight: '500' }}><MapPin size={16} /> Preferred Location</label>
              <input type="text" defaultValue="New Delhi" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid var(--color-border)' }} />
            </div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.5rem', fontWeight: '500' }}><DollarSign size={16} /> Budget</label>
              <input type="text" defaultValue="$10,000 / year" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid var(--color-border)' }} />
            </div>
          </div>
        </div>

        <button className="btn-primary" style={{ padding: '1rem', width: '200px', fontWeight: '600' }}>Save Profile</button>
      </div>
    </div>
  );
};

export default Profile;
