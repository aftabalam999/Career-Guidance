import React from 'react';
import { BookOpen, Target, Heart, Briefcase, TrendingUp, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>Welcome back, {user?.name || 'Student'}!</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Here is your personalized career and college insight dashboard.</p>

      {/* Widgets Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: 'rgba(124, 58, 237, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--color-primary)' }}>
            <BookOpen size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>Top Matches</h3>
            <p className="small-text" style={{ color: 'var(--text-secondary)' }}>12 Colleges</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--color-accent)' }}>
            <Target size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>Aptitude Score</h3>
            <p className="small-text" style={{ color: 'var(--text-secondary)' }}>85% - Excellent</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--color-error)' }}>
            <Heart size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>Saved</h3>
            <p className="small-text" style={{ color: 'var(--text-secondary)' }}>5 Colleges</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--color-success)' }}>
            <Briefcase size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>Career Match</h3>
            <p className="small-text" style={{ color: 'var(--text-secondary)' }}>Software Engineer (92%)</p>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2>Career Interest Distribution</h2>
            <TrendingUp size={20} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div style={{ height: '300px', backgroundColor: 'var(--color-background)', borderRadius: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed var(--color-border)' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Chart visualization goes here</p>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2>Recent Activity</h2>
            <Users size={20} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                <p style={{ fontWeight: '500', marginBottom: '0.25rem' }}>Completed Mock Test #{i}</p>
                <p className="small-text" style={{ color: 'var(--text-secondary)' }}>2 days ago</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
