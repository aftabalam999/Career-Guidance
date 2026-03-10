import React from 'react';
import { BookOpen, Sparkles, Building, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const StatCard = ({ title, value, icon, linkText, link }) => (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
                <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' }}>{title}</p>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{value}</h3>
            </div>
            <div style={{ background: '#eff6ff', padding: '0.75rem', borderRadius: '0.5rem', color: 'var(--primary-color)' }}>
                {icon}
            </div>
        </div>
        <Link to={link} style={{ color: 'var(--primary-color)', fontSize: '0.875rem', fontWeight: '500' }}>
            {linkText} &rarr;
        </Link>
    </div>
);

const chartData = [
    { name: 'Jan', tests: 4 },
    { name: 'Feb', tests: 7 },
    { name: 'Mar', tests: 12 },
    { name: 'Apr', tests: 5 }
];

const Dashboard = ({ user }) => {
    return (
        <div>
            <h1 className="page-title">Welcome back, {user?.name.split(' ')[0]}!</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard title="Colleges Explored" value="0" icon={<Building size={24} />} linkText="Explore more" link="/explorer" />
                <StatCard title="Saved Colleges" value={user?.savedColleges?.length || 0} icon={<BookOpen size={24} />} linkText="View list" link="/saved" />
                <StatCard title="Aptitude Score" value="Not Taken" icon={<Sparkles size={24} />} linkText="Take test now" link="/test" />
                <StatCard title="Profile Completion" value={user?.careerInterest ? '100%' : '50%'} icon={<User size={24} />} linkText="Update profile" link="/profile" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="card">
                    <h3 style={{ marginBottom: '1rem' }}>Your Target Fields</h3>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {user?.careerInterest ? (
                            <span style={{ padding: '0.5rem 1rem', background: '#eff6ff', color: 'var(--primary-color)', borderRadius: '2rem', fontWeight: '500' }}>{user.careerInterest}</span>
                        ) : (
                            <p style={{ color: 'var(--text-light)' }}>No career interests set yet.</p>
                        )}
                        {user?.locationPreference && (
                            <span style={{ padding: '0.5rem 1rem', background: '#eff6ff', color: 'var(--primary-color)', borderRadius: '2rem', fontWeight: '500' }}>{user.locationPreference}</span>
                        )}
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: '1rem' }}>Activity Overview</h3>
                    <div style={{ height: '200px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <XAxis dataKey="name" stroke="var(--text-light)" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="tests" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
