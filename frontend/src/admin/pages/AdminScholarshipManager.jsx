import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Search, 
  Award, 
  Calendar, 
  DollarSign, 
  ExternalLink,
  X,
  Loader2
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const AdminScholarshipManager = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState(null);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: '',
    deadline: '',
    applyLink: '',
    eligibility: {
      marksRequired: 0,
      incomeLimit: 0,
      category: '',
      state: ''
    }
  });

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` }};
      const { data } = await axios.get('/api/admin/scholarships', config);
      setScholarships(data);
      setLoading(false);
    } catch (error) {
       showToast("Failed to fetch scholarships", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` }};
      
      const payload = {
        ...formData,
        eligibility: {
          ...formData.eligibility,
          category: formData.eligibility.category.split(',').map(c => c.trim()).filter(c => c)
        }
      };

      if (editingScholarship) {
        await axios.put(`/api/admin/scholarships/${editingScholarship._id}`, payload, config);
        showToast("Scholarship updated", "success");
      } else {
        await axios.post('/api/admin/scholarships', payload, config);
        showToast("Scholarship added", "success");
      }
      
      setShowModal(false);
      setEditingScholarship(null);
      fetchScholarships();
    } catch (error) {
      showToast("Operation failed", "error");
    }
  };

  const openEdit = (s) => {
    setEditingScholarship(s);
    setFormData({
      name: s.name,
      description: s.description || '',
      amount: s.amount,
      deadline: s.deadline.split('T')[0],
      applyLink: s.applyLink,
      eligibility: {
        marksRequired: s.eligibility?.marksRequired || 0,
        incomeLimit: s.eligibility?.incomeLimit || 0,
        category: s.eligibility?.category?.join(', ') || '',
        state: s.eligibility?.state || ''
      }
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this scholarship?")) return;
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` }};
      await axios.delete(`/api/admin/scholarships/${id}`, config);
      setScholarships(scholarships.filter(s => s._id !== id));
      showToast("Scholarship removed", "success");
    } catch (error) {
      showToast("Delete failed", "error");
    }
  };

  const filtered = scholarships.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-transition">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Scholarship Hub</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage financial aid opportunities for students.</p>
        </div>
        <button className="btn-primary" onClick={() => { setEditingScholarship(null); setShowModal(true); }}>
          <Plus size={18} /> New Scholarship
        </button>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search scholarships..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.6rem 2.5rem', borderRadius: '10px', border: '1px solid var(--color-border)', outline: 'none' }}
            />
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'var(--color-surface)' }}>
            <tr>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '12px' }}>SCHOLARSHIP</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '12px' }}>AMOUNT</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '12px' }}>DEADLINE</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'right', fontSize: '12px' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
               <tr><td colSpan="4" style={{ textAlign: 'center', padding: '3rem' }}><Loader2 className="animate-spin" /></td></tr>
            ) : filtered.map(s => (
              <tr key={s._id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ fontWeight: '700', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Award size={16} /> {s.name}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {s.eligibility?.state || 'All States'} • {s.eligibility?.marksRequired}% Required
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ fontWeight: '600', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <DollarSign size={14} /> {s.amount}
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} /> {new Date(s.deadline).toLocaleDateString()}
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <a href={s.applyLink} target="_blank" rel="noreferrer" style={{ padding: '0.4rem', borderRadius: '8px', border: '1px solid var(--color-border)', color: 'var(--text-secondary)' }}><ExternalLink size={16} /></a>
                    <button onClick={() => openEdit(s)} style={{ padding: '0.4rem', borderRadius: '8px', border: '1px solid var(--color-border)', color: '#7C3AED' }}><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(s._id)} style={{ padding: '0.4rem', borderRadius: '8px', border: '1px solid #FEE2E2', color: '#EF4444' }}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '600px', padding: '2rem', position: 'relative' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'none', border: 'none' }}><X size={20} /></button>
            <h2 style={{ marginBottom: '1.5rem' }}>{editingScholarship ? 'Edit Scholarship' : 'New Scholarship'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600' }}>Name</label>
                <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-border)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600' }}>Amount</label>
                  <input required value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-border)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600' }}>Deadline</label>
                  <input type="date" required value={formData.deadline} onChange={(e) => setFormData({...formData, deadline: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-border)' }} />
                </div>
              </div>
              <div>
                 <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600' }}>Apply Link</label>
                 <input required value={formData.applyLink} onChange={(e) => setFormData({...formData, applyLink: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-border)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600' }}>Min Marks (%)</label>
                  <input type="number" value={formData.eligibility.marksRequired} onChange={(e) => setFormData({...formData, eligibility: {...formData.eligibility, marksRequired: e.target.value}})} style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-border)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600' }}>State</label>
                  <input value={formData.eligibility.state} onChange={(e) => setFormData({...formData, eligibility: {...formData.eligibility, state: e.target.value}})} style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-border)' }} />
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ padding: '1rem' }}>Save Scholarship</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminScholarshipManager;
