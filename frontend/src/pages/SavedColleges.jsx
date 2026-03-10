import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MapPin, Building2, TrendingUp, Wallet, X } from 'lucide-react';

const SavedColleges = () => {
    const navigate = useNavigate();
    const [saved, setSaved] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchSaved = async () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo) { navigate('/login'); return; }

        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get('/api/saved', config);
            setSaved(data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSaved();
    }, []);

    const handleRemove = async (collegeId) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        
        try {
            await axios.delete(`/api/saved/${collegeId}`, config);
            setSaved(saved.filter(item => item.college._id !== collegeId));
        } catch (err) {
            alert("Failed to remove college from saved list");
        }
    };

    if (loading) return <div className="p-8">Loading saved colleges...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;

    return (
        <div className="p-8 page-transition" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>My Saved Colleges</h1>
                <p style={{ color: 'var(--text-secondary)' }}>You have {saved.length} institutes saved to your wishlist.</p>
            </div>

            {saved.length === 0 ? (
                <div className="card" style={{ padding: '4rem', textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '1rem' }}>No saved colleges yet.</h3>
                    <button className="btn-primary" onClick={() => navigate('/explorer')}>Explorer Institutes</button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                    {saved.map((item) => (
                        <div key={item._id} className="card" style={{ padding: '1.5rem', border: '1px solid var(--color-border)', position: 'relative' }}>
                            <button 
                                onClick={() => handleRemove(item.college._id)}
                                style={{ position: 'absolute', right: '1rem', top: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                            >
                                <X size={20} />
                            </button>

                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: '700', paddingRight: '2rem' }}>{item.college.name}</h3>
                            
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> {item.college.location}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><TrendingUp size={16} /> NIRF Rank: #{item.college.ranking}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Building2 size={16} /> Type: {item.college.collegeType}</span>
                            </div>

                            <button 
                                className="btn-primary" 
                                style={{ width: '100%' }}
                                onClick={() => navigate(`/colleges/${item.college._id}`)}
                            >View Full Details</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedColleges;
