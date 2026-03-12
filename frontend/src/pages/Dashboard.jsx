import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, Target, Heart, Briefcase, TrendingUp, Users, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get('/api/users/dashboard-stats', config);
        setStats(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <Loader2 className="animate-spin" size={40} color="var(--color-primary)" />
    </div>
  );

  return (
    <div className="page-transition">
      <h1>Welcome back, {user?.name || 'Student'}!</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Here is your personalized career and college insight dashboard.</p>

      {/* Widgets Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: 'rgba(124, 58, 237, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--color-primary)' }}>
            <BookOpen size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>Total Colleges</h3>
            <p className="small-text" style={{ color: 'var(--text-secondary)' }}>{stats?.collegesCount || 0} Institutes</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--color-accent)' }}>
            <Target size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>Aptitude Score</h3>
            <p className="small-text" style={{ color: 'var(--text-secondary)' }}>{stats?.aptitudeScore || 0}% - {stats?.aptitudeScore >= 80 ? 'Excellent' : stats?.aptitudeScore >= 60 ? 'Good' : 'Needs Work'}</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--color-error)' }}>
            <Heart size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>Saved</h3>
            <p className="small-text" style={{ color: 'var(--text-secondary)' }}>{stats?.savedCount || 0} Colleges</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--color-success)' }}>
            <Briefcase size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>Recent Match</h3>
            <p className="small-text" style={{ color: 'var(--text-secondary)' }}>AI Analysis Active</p>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2>Platform Engagement</h2>
            <TrendingUp size={20} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div style={{ height: '300px', backgroundColor: 'var(--color-background)', borderRadius: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed var(--color-border)' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Visualization logic initialized.</p>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2>Recent Activity</h2>
            <Users size={20} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {stats?.recentActivity?.length > 0 ? (
              stats.recentActivity.map((act, i) => (
                <div key={i} style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                  <p style={{ fontWeight: '500', marginBottom: '0.25rem' }}>{act.title}</p>
                  <p className="small-text" style={{ color: 'var(--text-secondary)' }}>{act.subtitle} - {new Date(act.date).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>No recent activity found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
