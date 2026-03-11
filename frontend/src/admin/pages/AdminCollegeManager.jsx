import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye, 
  MapPin, 
  X,
  Loader2,
  MoreVertical
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const AdminCollegeManager = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCollege, setEditingCollege] = useState(null);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    collegeType: 'Private',
    feesRange: '',
    placementPercentage: 0,
    ranking: 0,
    description: '',
    campusSize: '',
    hostelAvailable: false
  });

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` }};
      const { data } = await axios.get('/api/admin/colleges', config);
      setColleges(data);
      setLoading(false);
    } catch (error) {
      showToast("Failed to fetch colleges", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this college?")) return;
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` }};
      await axios.delete(`/api/admin/colleges/${id}`, config);
      setColleges(colleges.filter(c => c._id !== id));
      showToast("College deleted successfully", "success");
    } catch (error) {
      showToast("Delete failed", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` }};
      
      if (editingCollege) {
        await axios.put(`/api/admin/colleges/${editingCollege._id}`, formData, config);
        showToast("College updated", "success");
      } else {
        await axios.post('/api/admin/colleges', formData, config);
        showToast("College added", "success");
      }
      
      setShowModal(false);
      setEditingCollege(null);
      fetchColleges();
    } catch (error) {
      showToast("Operation failed", "error");
    }
  };

  const openEdit = (college) => {
    setEditingCollege(college);
    setFormData({
      name: college.name,
      location: college.location,
      collegeType: college.collegeType,
      feesRange: college.feesRange,
      placementPercentage: college.placementPercentage,
      ranking: college.ranking,
      description: college.description || '',
      campusSize: college.campusSize || '',
      hostelAvailable: college.hostelAvailable
    });
    setShowModal(true);
  };

  const filteredColleges = colleges.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-transition">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>College Management</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Add, edit, or remove educational institutions from the platform.</p>
        </div>
        <button 
          className="btn-primary" 
          onClick={() => { setEditingCollege(null); setFormData({ name: '', location: '', collegeType: 'Private', feesRange: '', placementPercentage: 0, ranking: 0, description: '', campusSize: '', hostelAvailable: false }); setShowModal(true); }}
        >
          <Plus size={18} /> Add New College
        </button>
      </div>

      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search colleges..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: '10px', border: '1px solid var(--color-border)', outline: 'none' }}
            />
          </div>
          <p style={{ margin: 0, fontWeight: '600', color: 'var(--text-secondary)' }}>Showing {filteredColleges.length} Institutes</p>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
            <tr>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>College Info</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Fees</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Placement</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Ranking</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'right', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '3rem' }}><Loader2 className="animate-spin" style={{ margin: '0 auto' }} /></td></tr>
            ) : filteredColleges.map((college) => (
              <tr key={college._id} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background 0.2s' }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ fontWeight: '700', color: 'var(--color-primary)' }}>{college.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} /> {college.location} • {college.collegeType}
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>{college.feesRange}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ flex: 1, height: '6px', backgroundColor: 'var(--color-border)', borderRadius: '3px', width: '60px' }}>
                      <div style={{ width: `${college.placementPercentage}%`, height: '100%', backgroundColor: '#10B981', borderRadius: '3px' }}></div>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '700' }}>{college.placementPercentage}%</span>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ padding: '0.2rem 0.6rem', backgroundColor: 'rgba(124, 58, 237, 0.1)', color: 'var(--color-primary)', borderRadius: '6px', fontWeight: '700', fontSize: '13px' }}>
                    #{college.ranking}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button onClick={() => openEdit(college)} style={{ padding: '0.4rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'white', color: '#7C3AED', cursor: 'pointer' }}><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(college._id)} style={{ padding: '0.4rem', borderRadius: '8px', border: '1px solid #FEE2E2', background: 'white', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '600px', padding: '2rem', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            <h2 style={{ marginBottom: '1.5rem' }}>{editingCollege ? 'Edit College' : 'Add New College'}</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>College Name</label>
                <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-border)' }} />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Location</label>
                  <input required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-border)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Type</label>
                  <select value={formData.collegeType} onChange={(e) => setFormData({...formData, collegeType: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
                    <option>Public</option>
                    <option>Private</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Fees</label>
                  <input value={formData.feesRange} onChange={(e) => setFormData({...formData, feesRange: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-border)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Placement (%)</label>
                  <input type="number" value={formData.placementPercentage} onChange={(e) => setFormData({...formData, placementPercentage: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-border)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Ranking</label>
                  <input type="number" value={formData.ranking} onChange={(e) => setFormData({...formData, ranking: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-border)' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-border)', height: '80px' }}></textarea>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem' }}>
                 <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                   <input type="checkbox" checked={formData.hostelAvailable} onChange={(e) => setFormData({...formData, hostelAvailable: e.target.checked})} />
                   Hostel Available
                 </label>
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '1rem' }}>{editingCollege ? 'Update College' : 'Create College'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCollegeManager;
