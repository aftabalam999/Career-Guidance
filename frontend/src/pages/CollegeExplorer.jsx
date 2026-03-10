import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MapPin, Building2, TrendingUp, Wallet, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useColleges } from '../context/CollegeContext';

const CollegeExplorer = () => {
    const navigate = useNavigate();
    const { addToCompare } = useColleges();
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    
    // Search and Filter State
    const [keyword, setKeyword] = useState('');
    const [collegeType, setCollegeType] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        const fetchColleges = async () => {
            setLoading(true);
            try {
                const params = {
                    keyword,
                    collegeType,
                    location,
                    pageNumber: page
                };
                const { data } = await axios.get('/api/colleges', { params });
                setColleges(data.colleges);
                setPages(data.pages);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };
        fetchColleges();
    }, [page, keyword, collegeType, location]);

    const handleSave = async (id) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo) { navigate('/login'); return; }
        
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.post('/api/saved', { collegeId: id }, config);
            alert("College saved to favorites!");
        } catch (err) {
            alert(err.response?.data?.message || "Already saved or error occurred");
        }
    };

    return (
        <div className="p-8 page-transition" style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>College Explorer</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Find and compare premium institutes in India.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 3fr', gap: '2rem' }}>
                {/* Filters Sidebar */}
                <aside className="card" style={{ height: 'fit-content', padding: '1.5rem', position: 'sticky', top: '1rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600' }}>Search Institutes</h3>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-secondary)' }} />
                            <input 
                                type="text" 
                                placeholder="Search by name..." 
                                style={{ padding: '0.75rem 1rem 0.75rem 2.5rem', width: '100%', borderRadius: '12px', border: '1px solid var(--color-border)', outline: 'none' }}
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600' }}>Institute Type</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input type="radio" value="" name="type" checked={collegeType === ''} onChange={() => setCollegeType('')} style={{ accentColor: 'var(--color-primary)' }} /> All Types
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input type="radio" value="Public" name="type" checked={collegeType === 'Public'} onChange={() => setCollegeType('Public')} style={{ accentColor: 'var(--color-primary)' }} /> Public
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input type="radio" value="Private" name="type" checked={collegeType === 'Private'} onChange={() => setCollegeType('Private')} style={{ accentColor: 'var(--color-primary)' }} /> Private
                            </label>
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600' }}>Location</h3>
                        <input 
                            type="text" 
                            placeholder="Enter city..." 
                            style={{ padding: '0.75rem 1rem', width: '100%', borderRadius: '12px', border: '1px solid var(--color-border)', outline: 'none' }}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                </aside>

                {/* College Cards Grid */}
                <div>
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>Loading institutes...</div>
                    ) : error ? (
                        <div style={{ color: 'var(--color-error)' }}>{error}</div>
                    ) : colleges.length === 0 ? (
                        <div className="card" style={{ padding: '4rem', textAlign: 'center' }}>No colleges found matching these criteria.</div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                            {colleges.map((college) => (
                                <div key={college._id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', border: '1px solid var(--color-border)' }}>
                                    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div style={{ padding: '0.4rem 0.8rem', background: 'rgba(124, 58, 237, 0.1)', color: 'var(--color-primary)', borderRadius: '24px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>
                                            {college.collegeType}
                                        </div>
                                        <div style={{ color: 'gold', display: 'flex', alignItems: 'center' }}>
                                            <Star size={16} fill="gold" /> <span style={{ marginLeft: '4px', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '600' }}>4.5</span>
                                        </div>
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: '700' }}>{college.name}</h3>
                                    
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> {college.location}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><TrendingUp size={16} /> NIRF Rank: #{college.ranking}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Wallet size={16} /> Fees: {college.feesRange}</span>
                                    </div>

                                    <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                                        <button 
                                            className="btn-outline" 
                                            style={{ flex: 1, padding: '0.6rem 0.4rem', fontSize: '0.85rem' }}
                                            onClick={() => addToCompare(college)}
                                        >Compare</button>
                                        <button 
                                            className="btn-outline" 
                                            style={{ flex: 1, padding: '0.6rem 0.4rem', fontSize: '0.85rem' }}
                                            onClick={() => handleSave(college._id)}
                                        >Save</button>
                                        <button 
                                            className="btn-primary" 
                                            style={{ flex: 1, padding: '0.6rem 0.4rem', fontSize: '0.85rem' }}
                                            onClick={() => navigate(`/colleges/${college._id}`)}
                                        >View</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {pages > 1 && (
                        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                            {[...Array(pages)].map((_, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => setPage(i + 1)} 
                                    className={page === i + 1 ? "btn-primary" : "btn-outline"}
                                    style={{ padding: '0.5rem 1rem' }}
                                >{i + 1}</button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CollegeExplorer;
