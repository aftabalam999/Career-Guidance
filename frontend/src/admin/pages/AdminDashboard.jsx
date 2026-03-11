import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Users, 
  Building2, 
  ClipboardCheck, 
  Award,
  TrendingUp,
  UserPlus,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, Cell, PieChart, Pie
} from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` }};
        
        const [statsRes, analyticsRes] = await Promise.all([
          axios.get('/api/admin/stats', config),
          axios.get('/api/admin/analytics', config)
        ]);

        setStats(statsRes.data);
        setAnalytics(analyticsRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Dashboard Load Error', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading Admin Hub...</div>;

  const statCards = [
    { name: 'Total Users', value: stats?.totalUsers, icon: <Users size={24} />, color: '#7C3AED', trend: '+12%' },
    { name: 'Total Colleges', value: stats?.totalColleges, icon: <Building2 size={24} />, color: '#10B981', trend: '+4%' },
    { name: 'Tests Completed', value: stats?.testsCompleted, icon: <ClipboardCheck size={24} />, color: '#F59E0B', trend: '+28%' },
    { name: 'Active Scholarships', value: stats?.activeScholarships, icon: <Award size={24} />, color: '#EF4444', trend: '-2%' },
  ];

  return (
    <div className="page-transition">
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#111827' }}>System Overview</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Real-time platform metrics and user engagement analytics.</p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {statCards.map((stat, i) => (
          <div key={i} className="card" style={{ padding: '1.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: `${stat.color}15`, color: stat.color, borderRadius: '12px' }}>
                {stat.icon}
              </div>
              <div style={{ color: stat.trend.startsWith('+') ? '#10B981' : '#EF4444', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
                {stat.trend.startsWith('+') ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />} {stat.trend}
              </div>
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: '800', margin: 0 }}>{stat.value}</h3>
            <p style={{ color: 'var(--text-secondary)', fontWeight: '500', margin: '4px 0 0 0' }}>{stat.name}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="card" style={{ padding: '1.5rem', height: '400px' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: '700' }}>User Registrations (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={analytics?.userGrowth}>
              <defs>
                <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#7C3AED" fillOpacity={1} fill="url(#colorUser)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: '1.5rem', height: '400px' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: '700' }}>Most Viewed Colleges</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={analytics?.mostViewedColleges} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={120} style={{ fontSize: '12px' }} />
              <Tooltip />
              <Bar dataKey="views" fill="#10B981" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div className="card" style={{ padding: '1.5rem', height: '400px' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: '700' }}>Career Interest Distribution</h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={analytics?.careerPrefs}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="count"
                nameKey="_id"
                label
              >
                {analytics?.careerPrefs.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#7C3AED', '#10B981', '#F59E0B', '#EF4444', '#3B82F6'][index % 5]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: '700' }}>Recent Platform Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[1,2,3,4,5].map(i => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                  <UserPlus size={20} />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>New Student Registered</p>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>user_#{i}34 joined the guidance platform</p>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--text-secondary)' }}>{i}h ago</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
