import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, DollarSign, Target, Heart } from 'lucide-react';

const Explorer = () => {
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [savedColleges, setSavedColleges] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const [collegeRes, userRes] = await Promise.all([
                    axios.get('/api/colleges', { headers: { 'x-auth-token': token } }),
                    axios.get('/api/auth/user', { headers: { 'x-auth-token': token } })
                ]);
                setColleges(collegeRes.data);
                setSavedColleges(userRes.data.savedColleges.map(c => c._id));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const toggleSave = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (savedColleges.includes(id)) {
                await axios.delete(`/api/colleges/saved/${id}`, { headers: { 'x-auth-token': token } });
                setSavedColleges(savedColleges.filter(cId => cId !== id));
            } else {
                await axios.post(`/api/colleges/saved/${id}`, {}, { headers: { 'x-auth-token': token } });
                setSavedColleges([...savedColleges, id]);
            }
        } catch (err) {
            console.error('Error toggling save', err);
        }
    };

    if (loading) return <div className="page-content">Loading colleges...</div>;

    return (
        <div>
            <h1 className="page-title">College Explorer</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {colleges.map(college => (
                    <div key={college._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <h3 style={{ color: 'var(--primary-color)', fontSize: '1.25rem', fontWeight: 'bold' }}>{college.name}</h3>
                            <button
                                onClick={() => toggleSave(college._id)}
                                style={{ background: 'transparent', color: savedColleges.includes(college._id) ? 'var(--error-color)' : 'var(--text-light)' }}
                            >
                                <Heart fill={savedColleges.includes(college._id) ? 'var(--error-color)' : 'none'} size={24} />
                            </button>
                        </div>

                        <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
                            <MapPin size={16} /> {college.city}, {college.location}
                        </p>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
                            <DollarSign size={16} /> Fees: ₹{college.fees?.toLocaleString() || 'N/A'}/yr
                        </p>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', marginBottom: '1rem' }}>
                            <Target size={16} /> Placement: {college.placementPercentage}%
                        </p>

                        <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {college.courseOffered?.map(course => (
                                <span key={course} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: '#eff6ff', color: 'var(--primary-color)', borderRadius: '1rem' }}>
                                    {course}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
                {colleges.length === 0 && <p>No colleges found. Admin should add some.</p>}
            </div>
        </div>
    );
};

export default Explorer;
