import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Trash2, 
  MessageSquare, 
  User, 
  Building2, 
  Star, 
  Clock,
  Search,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const AdminReviewManager = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` }};
      const { data } = await axios.get('/api/admin/reviews', config);
      setReviews(data);
      setLoading(false);
    } catch (error) {
      showToast("Error loading reviews", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review permanently?")) return;
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` }};
      await axios.delete(`/api/admin/reviews/${id}`, config);
      setReviews(reviews.filter(r => r._id !== id));
      showToast("Review removed", "success");
    } catch (error) {
      showToast("Failed to delete", "error");
    }
  };

  const filtered = reviews.filter(r => 
    r.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.college?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-transition">
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Review Moderation</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Monitor and moderate student feedback across the platform.</p>
      </div>

      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ position: 'relative', width: '350px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search by user, college or comment..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.6rem 2.5rem', borderRadius: '10px', border: '1px solid var(--color-border)', outline: 'none' }}
            />
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'var(--color-surface)' }}>
            <tr>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '12px' }}>CONTENT</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '12px' }}>RATING</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '12px' }}>METADATA</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'right', fontSize: '12px' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={{ textAlign: 'center', padding: '3rem' }}><Loader2 className="animate-spin" /></td></tr>
            ) : filtered.map(r => (
              <tr key={r._id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '1.25rem 1.5rem', maxWidth: '400px' }}>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div style={{ padding: '0.5rem', backgroundColor: 'rgba(124, 58, 237, 0.05)', borderRadius: '10px', height: 'fit-content', color: 'var(--color-primary)' }}>
                      <MessageSquare size={18} />
                    </div>
                    <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: 'var(--text-primary)' }}>"{r.comment}"</p>
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F59E0B', fontWeight: '800' }}>
                    <Star size={16} fill="#F59E0B" /> {r.rating}/5
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}><User size={13}/> {r.user?.name || 'Deleted User'}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}><Building2 size={13}/> {r.college?.name || 'Deleted College'}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={11}/> {new Date(r.createdAt).toLocaleDateString()}</div>
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                   <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                      <button style={{ background: 'none', border: 'none', color: '#10B981', cursor: 'pointer' }}><CheckCircle size={18} /></button>
                      <button onClick={() => handleDelete(r._id)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}><XCircle size={18} /></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReviewManager;
