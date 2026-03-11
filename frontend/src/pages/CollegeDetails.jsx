import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, GraduationCap, Building2, TrendingUp, Wallet, Star } from 'lucide-react';
import { useColleges } from '../context/CollegeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import BackButton from '../components/BackButton';

const CollegeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCompare } = useColleges();
    const { user } = useAuth();
    const { showToast } = useToast();
    const [college, setCollege] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const { data } = await axios.get(`/api/colleges/${id}`);
                setCollege(data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    const handleSave = async () => {
        if (!user) { navigate('/login'); return; }
        
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('/api/saved', { collegeId: id }, config);
            showToast("College saved to favorites!", "success");
        } catch (err) {
            showToast(err.response?.data?.message || "Failed to save college", "error");
        }
    };

    if (loading) return <div className="p-8">Loading college details...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;

    return (
        <div className="p-8 page-transition" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <BackButton />
            <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{college.name}</h1>
                        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={18} /> {college.location}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Building2 size={18} /> {college.collegeType} Institute</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn-outline" onClick={() => addToCompare(college)}>Add to Compare</button>
                        <button className="btn-primary" onClick={handleSave}>Save College</button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', margin: '2rem 0' }}>
                    <div className="stat-card">
                        <TrendingUp style={{ color: 'var(--color-accent)' }} />
                        <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>#{college.ranking}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>National Rank</div>
                    </div>
                    <div className="stat-card">
                        <GraduationCap style={{ color: 'var(--color-primary)' }} />
                        <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>{college.placementPercentage}%</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Placements</div>
                    </div>
                    <div className="stat-card">
                        <Wallet style={{ color: 'var(--color-secondary)' }} />
                        <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>{college.feesRange}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Annual Fees</div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
                    <h2>About the Institute</h2>
                    <p style={{ lineHeight: '1.7', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{college.description}</p>
                </div>

                <div style={{ marginTop: '2.5rem' }}>
                    <h2>Popular Courses</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                        {college.courses.map((course, idx) => (
                            <div key={idx} className="card" style={{ padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: '12px', background: 'var(--color-surface)' }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>{course.name}</div>
                                <div style={{ color: 'var(--text-secondary)' }}>Seats: <span style={{ color: 'var(--text-primary)' }}>{course.seats}</span></div>
                                <div style={{ color: 'var(--text-secondary)' }}>Fees: <span style={{ color: 'var(--text-primary)' }}>₹{course.fees.toLocaleString()}</span></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: '2.5rem' }}>
                    <h2>Reviews & Ratings</h2>
                    <div style={{ marginTop: '1rem' }}>
                        {college.reviews && college.reviews.length > 0 ? (
                            college.reviews.map((review, idx) => (
                                <div key={idx} style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <div style={{ fontWeight: '600' }}>{review.user?.name || "Student"}</div>
                                        <div style={{ display: 'flex', color: 'gold' }}>
                                            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < review.rating ? "gold" : "none"} />)}
                                        </div>
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)' }}>{review.comment}</p>
                                </div>
                            ))
                        ) : (
                            <p style={{ color: 'var(--text-secondary)' }}>No reviews yet for this institute.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollegeDetails;
