import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Award, Calendar, Link, Loader2, AlertCircle } from 'lucide-react';
import BackButton from '../components/BackButton';
import { useAuth } from '../context/AuthContext';

const Scholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('/api/ai/scholarships', config);
        setScholarships(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch scholarships");
        setLoading(false);
      }
    };
    fetchScholarships();
  }, [user.token]);

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <Loader2 className="animate-spin" size={48} color="var(--color-primary)" />
      <p style={{ marginTop: '1rem' }}>Finding aid for you...</p>
    </div>
  );

  return (
    <div className="page-transition">
      <BackButton />
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Available Scholarships</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Based on your profile, you may be eligible for the following financial aids.</p>
      </div>

      {scholarships.length === 0 ? (
        <div className="card" style={{ padding: '4rem', textAlign: 'center' }}>
          <AlertCircle size={48} color="var(--color-primary)" style={{ margin: '0 auto 1.5rem', opacity: 0.5 }} />
          <h3>No scholarships listed yet.</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Check back later as the admin updates the financial aid database.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
          {scholarships.map(s => (
            <div key={s._id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', padding: '1rem', borderRadius: '12px', height: 'fit-content' }}>
                  <Award size={24} />
                </div>
                <div>
                  <h3 style={{ margin: 0, marginBottom: '0.4rem', fontSize: '1.2rem', fontWeight: '700' }}>{s.name}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <p className="small-text" style={{ color: 'var(--text-secondary)', margin: 0 }}>Eligibility: <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{s.eligibility}</span></p>
                    <p className="small-text" style={{ color: 'var(--text-secondary)', margin: 0 }}>ID: {s._id.slice(-6).toUpperCase()}</p>
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-background)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                  <Calendar size={16} /> 
                  <span className="small-text" style={{ fontWeight: '600' }}>{new Date(s.deadline).toLocaleDateString()}</span>
                </div>
                <span style={{ fontWeight: '800', color: 'var(--color-success)', fontSize: '1.1rem' }}>{s.amount}</span>
              </div>

              <a 
                href={s.applyLink} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <button className="btn-primary" style={{ width: '100%' }}>
                  <Link size={18} /> Apply Now
                </button>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Scholarships;

