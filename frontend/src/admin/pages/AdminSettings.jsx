import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Brain, 
  Bell, 
  Shield, 
  Save, 
  RefreshCw,
  Loader2
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const AdminSettings = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [weights, setWeights] = useState({
    academicWeight: 30,
    aptitudeWeight: 40,
    placementWeight: 20,
    budgetWeight: 10
  });

  const [notifs, setNotifs] = useState({
    emailAlerts: true,
    systemToasts: true,
    browserNotifications: true,
    weeklySummaries: true
  });

  const [maintenance, setMaintenance] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get('/api/admin/settings', config);
      
      setWeights({
        academicWeight: data.academicWeight,
        aptitudeWeight: data.aptitudeWeight,
        placementWeight: data.placementWeight,
        budgetWeight: data.budgetWeight
      });
      setNotifs(data.notificationSettings);
      setMaintenance(data.maintenanceMode);
      setLoading(false);
    } catch (error) {
      showToast("Failed to load settings", "error");
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const total = Object.values(weights).reduce((a, b) => a + b, 0);
    if (total !== 100) {
       showToast(`Total weight must be 100% (Current: ${total}%)`, "error");
       return;
    }

    setSaving(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      
      await axios.put('/api/admin/settings', {
        ...weights,
        notificationSettings: notifs,
        maintenanceMode: maintenance
      }, config);
      
      showToast("System settings updated successfully", "success");
    } catch (error) {
      showToast("Failed to update settings", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <Loader2 className="animate-spin" size={40} color="var(--color-primary)" />
    </div>
  );

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

          <div style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            backgroundColor: Object.values(weights).reduce((a,b)=>a+b,0) === 100 ? 'rgba(124, 58, 237, 0.05)' : 'rgba(239, 68, 68, 0.05)', 
            borderRadius: '12px', 
            border: '1px dashed',
            borderColor: Object.values(weights).reduce((a,b)=>a+b,0) === 100 ? 'var(--color-primary)' : 'var(--color-error)',
            fontSize: '13px', 
            color: 'var(--text-secondary)' 
          }}>
             The sum of all weights must equal 100% for optimal AI matching results. 
             (Current Total: {Object.values(weights).reduce((a,b)=>a+b,0)}%)
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Bell size={22} style={{ color: '#F59E0B' }} /> Notification Channels
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {Object.entries(notifs).map(([key, value]) => (
                <label key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem', cursor: 'pointer' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', textTransform: 'capitalize' }}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <input 
                    type="checkbox" 
                    checked={value} 
                    onChange={(e) => setNotifs({...notifs, [key]: e.target.checked})}
                    style={{ width: '18px', height: '18px', accentColor: '#F59E0B' }} 
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Shield size={22} style={{ color: '#10B981' }} /> Maintenance & Security
            </h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
               <button 
                 onClick={() => showToast("Cache cleared successfully", "info")}
                 className="btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                 <RefreshCw size={16} /> Force Cache Clear
               </button>
               <button 
                 onClick={() => setMaintenance(!maintenance)}
                 className="btn-outline" 
                 style={{ 
                   display: 'flex', 
                   alignItems: 'center', 
                   justifyContent: 'center', 
                   gap: '0.5rem', 
                   color: maintenance ? 'white' : '#EF4444', 
                   backgroundColor: maintenance ? '#EF4444' : 'transparent',
                   borderColor: '#FEE2E2' 
                 }}>
                 <Shield size={16} /> {maintenance ? 'Disable Maintenance' : 'Enable Maintenance'}
               </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ padding: '1rem 3rem' }}>
           {saving ? <Loader2 size={20} className="animate-spin" /> : <><Save size={20} /> Save Configuration</>}
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
