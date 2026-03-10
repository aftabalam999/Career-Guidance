import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';

const Recommendations = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('/api/results', { headers: { 'x-auth-token': token } });
                setResults(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, []);

    if (loading) return <div>Loading...</div>;

    if (results.length === 0) {
        return (
            <div className="card" style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
                <Sparkles size={48} style={{ color: 'var(--primary-color)', marginBottom: '1rem' }} />
                <h2 style={{ marginBottom: '1rem' }}>No Recommendations Yet</h2>
                <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Take the aptitude test to start getting AI-powered recommendations.</p>
                <a href="/test" className="btn-primary">Take Test Now</a>
            </div>
        );
    }

    const latestResult = results[0];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="page-title" style={{ margin: 0 }}>AI Recommendations</h1>
                <div style={{ background: '#eff6ff', color: 'var(--primary-color)', padding: '0.5rem 1rem', borderRadius: '2rem', fontWeight: '500' }}>
                    Latest Score: {latestResult.aptitudeScore.toFixed(0)}%
                </div>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {latestResult.recommendedColleges?.map((item, idx) => (
                    <div key={item.college?._id || idx} className="card" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <h2 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>{item.college?.name || 'Unknown College'}</h2>
                            <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-light)', fontSize: '0.875rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <BookOpen size={16} /> Rank: {item.college?.ranking}
                                </span>
                                <span>Fees: ₹{item.college?.fees?.toLocaleString()}</span>
                                <span>Placement: {item.college?.placementPercentage}%</span>
                            </div>
                        </div>

                        <div style={{ width: '200px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>
                                <span>Match Score</span>
                                <span style={{ color: 'var(--accent-color)' }}>{item.matchPercentage}%</span>
                            </div>
                            <div style={{ height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: `${item.matchPercentage}%`, background: 'var(--accent-color)', height: '100%', borderRadius: '4px' }}></div>
                            </div>
                        </div>

                        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            View <ArrowRight size={16} />
                        </button>
                    </div>
                ))}

                {!latestResult.recommendedColleges?.length && (
                    <div className="card">No matches found based on your current profile. Try adjusting your preferences or budget.</div>
                )}
            </div>
        </div>
    );
};

export default Recommendations;
