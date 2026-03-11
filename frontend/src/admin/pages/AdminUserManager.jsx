import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Users, 
  Trash2, 
  ShieldAlert,
  Search,
  Mail,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const AdminUserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` }};
      const { data } = await axios.get('/api/admin/users', config);
      setUsers(data);
      setLoading(false);
    } catch (error) {
       showToast("Failed to fetch users", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This action is permanent.")) return;
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` }};
      await axios.delete(`/api/admin/users/${id}`, config);
      setUsers(users.filter(u => u._id !== id));
      showToast("User deleted", "success");
    } catch (error) {
      showToast("Operation failed", "error");
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-transition">
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>User Management</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Monitor registered students and manage account statuses.</p>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between' }}>
           <div style={{ position: 'relative', width: '350px' }}>
             <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
             <input 
               type="text" 
               placeholder="Search by name or email..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               style={{ width: '100%', padding: '0.6rem 2.5rem', borderRadius: '10px', border: '1px solid var(--color-border)', outline: 'none' }}
             />
           </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'var(--color-surface)' }}>
            <tr>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '12px', color: 'var(--text-secondary)' }}>USER</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '12px', color: 'var(--text-secondary)' }}>ROLE</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '12px', color: 'var(--text-secondary)' }}>JOINED DATE</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '12px', color: 'var(--text-secondary)' }}>STATUS</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'right', fontSize: '12px', color: 'var(--text-secondary)' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', fontWeight: '700' }}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: '700' }}>{user.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={12}/> {user.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600', textTransform: 'capitalize' }}>{user.role}</span>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} /> {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#10B981', fontWeight: '600' }}>
                    <ShieldCheck size={16} /> Active
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                   <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                      <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><ShieldAlert size={18} /></button>
                      <button onClick={() => handleDelete(user._id)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={18} /></button>
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

export default AdminUserManager;
