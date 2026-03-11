import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Building2, 
  ClipboardCheck, 
  Download,
  Filter
} from 'lucide-react';

const AdminAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` }};
        const { data } = await axios.get('/api/admin/analytics', config);
        setData(data);
        setLoading(false);
      } catch (err) {
        console.error("Analytics fetch failed", err);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div>Analyzing platform data...</div>;

  return (
    <div className="page-transition">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Platform Analytics</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Deep dive into user behavior and career trends.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Filter size={18} /> Filters</button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Download size={18} /> Export PDF</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
        {/* Registration Trend */}
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users size={20} color="#7C3AED" /> Student Growth Trend
          </h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="_id" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#7C3AED" fill="rgba(124, 58, 237, 0.1)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Career Interests */}
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TrendingUp size={20} color="#10B981" /> Popular Career Choices
          </h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.careerPrefs}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Score Distribution */}
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ClipboardCheck size={20} color="#F59E0B" /> Aptitude Score Distribution
          </h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data?.scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" label={{ value: 'Score Range', position: 'insideBottom', offset: -5 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="stepAfter" dataKey="count" stroke="#F59E0B" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* College Popularity */}
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Building2 size={20} color="#3B82F6" /> Institute View Analytics
          </h3>
          <div style={{ height: '300px' }}>
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.mostViewedColleges} layout="vertical">
                   <XAxis type="number" hide />
                   <YAxis dataKey="name" type="category" width={100} style={{ fontSize: '10px' }} />
                   <Tooltip />
                   <Bar dataKey="views" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
