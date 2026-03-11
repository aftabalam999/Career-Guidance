import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, GitCompare, ChevronRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useColleges } from '../context/CollegeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import BackButton from '../components/BackButton';

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addToCompare } = useColleges();
  const { user } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.post('/api/ai/recommend', {}, config);
        setRecommendations(data.recommendations || []);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to get recommendations. Ensure your profile is complete.");
        setLoading(false);
      }
    };

    if (user) {
      fetchRecommendations();
    }
  }, [user]);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '1rem' }}>
        <Loader2 className="animate-spin" size={48} style={{ color: 'var(--color-primary)' }} />
        <h2 style={{ color: 'var(--text-secondary)' }}>AI is analyzing your profile...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '4rem', margin: '2rem auto', maxWidth: '600px' }}>
        <AlertCircle size={48} style={{ color: 'var(--color-error)', marginBottom: '1rem' }} />
        <h2>Wait a second!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{error}</p>
        <button className="btn-primary" onClick={() => navigate('/profile')}>Complete Profile</button>
      </div>
    );
  }

  return (
    <div className="page-transition">
      <BackButton />
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>AI College Recommendations</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Matches personalized based on your academic marks, aptitude, and preferences.</p>
      </div>

      {recommendations.length === 0 ? (
        <div className="card" style={{ padding: '4rem', textAlign: 'center' }}>
          <p>No recommendations found. Try adjusting your profile preferences.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
          {recommendations.map((rec, idx) => (
            <div key={idx} className="card card-hover" style={{ borderLeft: idx === 0 ? '5px solid var(--color-primary)' : '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{rec.college?.name}</h2>
                    {idx === 0 && (
                      <span style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '24px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Star size={12} fill="white" /> TOP PICK
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <p style={{ color: 'var(--color-success)', fontWeight: '700', fontSize: '1.1rem', margin: 0 }}>{rec.match}% Match</p>
                     <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{rec.college?.location}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button 
                    className="btn-outline" 
                    onClick={() => addToCompare(rec.college)}
                    style={{ padding: '0.6rem 1.2rem' }}
                  >
                    <GitCompare size={18} /> Compare
                  </button>
                  <button 
                    className="btn-primary" 
                    onClick={() => navigate(`/colleges/${rec.college?._id}`)}
                    style={{ padding: '0.6rem 1.2rem' }}
                  >
                    View Details <ChevronRight size={18}/>
                  </button>
                </div>
              </div>
              
              <div style={{ backgroundColor: 'rgba(124, 58, 237, 0.04)', padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '1rem', alignItems: 'flex-start', border: '1px solid rgba(124, 58, 237, 0.1)' }}>
                <CheckCircle2 style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} size={20} />
                <div>
                  <p style={{ fontWeight: '700', marginBottom: '0.25rem', color: 'var(--color-primary)', fontSize: '0.95rem' }}>Why this recommendation?</p>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>
                    {rec.reason}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;
