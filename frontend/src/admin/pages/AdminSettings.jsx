import React, { useState } from 'react';
import { 
  Settings, 
  Brain, 
  Bell, 
  Shield, 
  Save, 
  RefreshCw,
  Sliders
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const AdminSettings = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [weights, setWeights] = useState({
    academicWeight: 30,
    aptitudeWeight: 40,
    placementWeight: 20,
    budgetWeight: 10
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      showToast("System settings updated successfully", "success");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="page-transition">
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>System Settings</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Configure AI recommendation algorithms and global platform behavior.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Brain size={22} style={{ color: 'var(--color-primary)' }} /> AI Recommendation Weights
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {Object.entries(weights).map(([key, value]) => (
              <div key={key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', textTransform: 'capitalize' }}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--color-primary)' }}>{value}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={value} 
                  onChange={(e) => setWeights({...weights, [key]: parseInt(e.target.value)})}
                  style={{ width: '100%', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                />
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'rgba(124, 58, 237, 0.05)', borderRadius: '12px', border: '1px dashed var(--color-primary)', fontSize: '13px', color: 'var(--text-secondary)' }}>
             The sum of all weights must equal 100% for optimal AI matching results.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Bell size={22} style={{ color: '#F59E0B' }} /> Notification Channels
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['Email Alerts', 'System Toasts', 'Browser Notifications', 'Weekly Summaries'].map(item => (
                <label key={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem', cursor: 'pointer' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>{item}</span>
                  <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: '#F59E0B' }} />
                </label>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Shield size={22} style={{ color: '#10B981' }} /> Maintenance & Security
            </h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
               <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                 <RefreshCw size={16} /> Force Cache Clear
               </button>
               <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#EF4444', borderColor: '#FEE2E2' }}>
                 <Shield size={16} /> Maintenance Mode
               </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <button onClick={handleSave} disabled={loading} className="btn-primary" style={{ padding: '1rem 3rem' }}>
           {loading ? <RefreshCw className="animate-spin" /> : <><Save size={20} /> Save Configuration</>}
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
