import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Book, MapPin, DollarSign, Target, Save, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import BackButton from '../components/BackButton';

const Profile = () => {
  const { user, login } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    marks10: 0,
    marks12: 0,
    preferredCourse: '',
    preferredLocation: '',
    budget: '',
    interests: '',
    aptitudeScore: 0
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        marks10: user.studentProfile?.marks10 || 0,
        marks12: user.studentProfile?.marks12 || 0,
        preferredCourse: user.studentProfile?.preferredCourse || '',
        preferredLocation: user.studentProfile?.preferredLocation || '',
        budget: user.studentProfile?.budget || '',
        interests: user.studentProfile?.interests || '',
        aptitudeScore: user.studentProfile?.aptitudeScore || 0
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.put('/api/users/profile', {
        name: formData.name,
        studentProfile: {
          marks10: formData.marks10,
          marks12: formData.marks12,
          preferredCourse: formData.preferredCourse,
          preferredLocation: formData.preferredLocation,
          budget: formData.budget,
          interests: formData.interests,
          aptitudeScore: formData.aptitudeScore
        }
      }, config);
      
      login({ ...user, ...data });
      showToast("Profile updated successfully", "success");
    } catch (err) {
      showToast(err.response?.data?.message || err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-transition" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '3rem' }}>
      <BackButton />
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>Student Profile</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your academic details and preferences to refine your AI recommendations.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Personal Info */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', fontSize: '1.25rem' }}>
            <User size={22} style={{ color: 'var(--color-primary)' }} /> Personal Information
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '600' }}>Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--color-border)', outline: 'none' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '600' }}>Email Address</label>
              <input 
                type="email" 
                value={formData.email} 
                disabled
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)', opacity: 0.7 }} 
              />
            </div>
          </div>
        </div>

        {/* Academic Details */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', fontSize: '1.25rem' }}>
            <Book size={22} style={{ color: 'var(--color-primary)' }} /> Academic Details
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '600' }}>10th Marks (%)</label>
              <input 
                type="number" 
                value={formData.marks10}
                onChange={(e) => setFormData({...formData, marks10: e.target.value})}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--color-border)', outline: 'none' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '600' }}>12th Marks (%)</label>
              <input 
                type="number" 
                value={formData.marks12}
                onChange={(e) => setFormData({...formData, marks12: e.target.value})}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--color-border)', outline: 'none' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '600' }}>Aptitude Score (%)</label>
              <input 
                type="number" 
                value={formData.aptitudeScore}
                readOnly
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }} 
              />
              <p className="small-text" style={{ color: 'var(--color-primary)', marginTop: '0.4rem' }}>Updated after taking a test.</p>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', fontSize: '1.25rem' }}>
            <Target size={22} style={{ color: 'var(--color-primary)' }} /> Preferences
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '600' }}>Preferred Course</label>
              <input 
                placeholder="e.g. B.Tech Computer Science" 
                value={formData.preferredCourse}
                onChange={(e) => setFormData({...formData, preferredCourse: e.target.value})}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--color-border)', outline: 'none' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '600' }}>Preferred Location</label>
              <input 
                placeholder="e.g. Pune, Maharashtra" 
                value={formData.preferredLocation}
                onChange={(e) => setFormData({...formData, preferredLocation: e.target.value})}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--color-border)', outline: 'none' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '600' }}>Maximum Budget (p.a.)</label>
              <input 
                placeholder="e.g. ₹5,00,000" 
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--color-border)', outline: 'none' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '600' }}>Interests / Skills</label>
              <input 
                placeholder="e.g. Coding, Robotics, AI" 
                value={formData.interests}
                onChange={(e) => setFormData({...formData, interests: e.target.value})}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--color-border)', outline: 'none' }} 
              />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="btn-primary" 
          style={{ width: 'fit-content', minWidth: '220px', padding: '1rem 2rem', alignSelf: 'flex-start', fontSize: '1.1rem' }}
        >
          {loading ? <><Loader2 className="animate-spin" size={20} /> Updating...</> : <><Save size={20} /> Update Profile</>}
        </button>
      </form>
    </div>
  );
};

export default Profile;
