import React from 'react';
import { useColleges } from '../context/CollegeContext';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, TrendingUp, Wallet, GraduationCap, X } from 'lucide-react';
import BackButton from '../components/BackButton';

const CompareColleges = () => {
    const { compareList, removeFromCompare, clearCompare } = useColleges();
    const navigate = useNavigate();

    if (compareList.length === 0) {
        return (
            <div className="p-8 page-transition" style={{ textAlign: 'center', marginTop: '4rem' }}>
                <BackButton style={{ justifyContent: 'center' }} />
                <Building2 size={64} style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', opacity: '0.4' }} />
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Comparison List Empty</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Select up to 3 colleges from the explorer to compare them side-by-side.</p>
                <button className="btn-primary" onClick={() => navigate('/explorer')}>Go to Explorer</button>
            </div>
        );
    }

    const rows = [
        { label: 'NIRF Ranking', key: 'ranking', icon: <TrendingUp size={18} /> },
        { label: 'Location', key: 'location', icon: <MapPin size={18} /> },
        { label: 'Institute Type', key: 'collegeType', icon: <Building2 size={18} /> },
        { label: 'Annual Fees', key: 'feesRange', icon: <Wallet size={18} /> },
        { label: 'Placements', key: 'placementPercentage', icon: <GraduationCap size={18} />, suffix: '%' },
        { label: 'Campus Size', key: 'campusSize' },
        { label: 'Hostel', key: 'hostelAvailable', formatter: (val) => val ? 'Available' : 'No' }
    ];

    return (
        <div className="p-8 page-transition">
            <BackButton />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>College Comparison</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Detailed side-by-side analysis of your top choices.</p>
                </div>
                {compareList.length > 0 && (
                    <button className="btn-danger" onClick={clearCompare}>
                        Clear All
                    </button>
                )}
            </div>

            <div className="card" style={{ padding: '0', overflowX: 'auto', borderRadius: '16px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                            <th style={{ padding: '2rem', textAlign: 'left', background: 'var(--color-surface)', width: '250px' }}>Features</th>
                            {compareList.map((college) => (
                                <th key={college._id} style={{ padding: '2rem', textAlign: 'center', position: 'relative' }}>
                                    <button 
                                        onClick={() => removeFromCompare(college._id)}
                                        style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                                    >
                                        <X size={18} />
                                    </button>
                                    <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>{college.name}</div>
                                    <button 
                                        className="btn-primary" 
                                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                                        onClick={() => navigate(`/colleges/${college._id}`)}
                                    >View Full Profile</button>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, idx) => (
                            <tr key={idx} style={{ borderBottom: idx === rows.length - 1 ? 'none' : '1px solid var(--color-border)' }}>
                                <td style={{ padding: '1.5rem 2rem', fontWeight: '600', color: 'var(--text-primary)', background: 'var(--color-surface)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    {row.icon} {row.label}
                                </td>
                                {compareList.map((college) => (
                                    <td key={college._id} style={{ padding: '1.5rem 2rem', textAlign: 'center', fontSize: '1.05rem' }}>
                                        {row.formatter 
                                            ? row.formatter(college[row.key]) 
                                            : `${college[row.key]}${row.suffix || ''}`}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {/* Course Comparison Row */}
                        <tr style={{ background: 'var(--color-surface)' }}>
                            <td style={{ padding: '1.5rem 2rem', fontWeight: '600', color: 'var(--text-primary)' }}>Popular Courses</td>
                            {compareList.map((college) => (
                                <td key={college._id} style={{ padding: '1.5rem 2rem', textAlign: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {college.courses.slice(0, 3).map((c, i) => (
                                            <div key={i} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                                {c.name} (Seats: {c.seats})
                                            </div>
                                        ))}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompareColleges;
