import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, MapPin, DollarSign, Target } from 'lucide-react';

const Saved = () => {
    const [savedColleges, setSavedColleges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserSaved();
    }, []);

    const fetchUserSaved = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/auth/user', { headers: { 'x-auth-token': token } });
            setSavedColleges(res.data.savedColleges || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const removeSave = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/colleges/saved/${id}`, { headers: { 'x-auth-token': token } });
            setSavedColleges(savedColleges.filter(c => c._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="page-title">Saved Colleges</h1>

            {savedColleges.length === 0 ? (
                <div className="card">You haven't saved any colleges yet. Go to College Explorer to discover!</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {savedColleges.map(college => (
                        <div key={college._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <h3 style={{ color: 'var(--primary-color)', fontSize: '1.25rem', fontWeight: 'bold' }}>{college.name}</h3>
                                <button
                                    onClick={() => removeSave(college._id)}
                                    style={{ background: 'transparent', color: 'var(--error-color)' }}
                                    title="Remove from saved"
                                >
                                    <Heart fill="var(--error-color)" size={24} />
                                </button>
                            </div>

                            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
                                <MapPin size={16} /> {college.city || ''}, {college.location}
                            </p>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
                                <DollarSign size={16} /> Fees: ₹{college.fees?.toLocaleString() || 'N/A'}/yr
                            </p>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', marginBottom: '1rem' }}>
                                <Target size={16} /> Placement: {college.placementPercentage}%
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Saved;
