import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, 
  Trash2, 
  Search, 
  Layers,
  HelpCircle,
  X,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const AdminAptitudeManager = () => {
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    section: 'Quantitative',
    difficulty: 'medium'
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` }};
      const { data } = await axios.get('/api/admin/questions', config);
      setQuestions(data);
      setLoading(false);
    } catch (err) {
      showToast("Error fetching questions", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` }};
      await axios.post('/api/admin/questions', formData, config);
      showToast("Question added", "success");
      setShowModal(false);
      fetchQuestions();
    } catch (err) {
      showToast("Failed to add question", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` }};
      await axios.delete(`/api/admin/questions/${id}`, config);
      setQuestions(questions.filter(q => q._id !== id));
      showToast("Question removed", "success");
    } catch (err) {
      showToast("Delete failed", "error");
    }
  };

  return (
    <div className="page-transition">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Test Management</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage questions for the career aptitude test.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Add New Question
        </button>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {questions.map((q, idx) => (
          <div key={q._id} className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(124, 58, 237, 0.1)', color: '#7C3AED', borderRadius: '12px', height: 'fit-content' }}>
              <HelpCircle size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: '#7C3AED', backgroundColor: 'rgba(124, 58, 237, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                    {q.section}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                    {q.difficulty}
                  </span>
                </div>
                <button onClick={() => handleDelete(q._id)} style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{idx + 1}. {q.question}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {q.options.map((opt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '14px', backgroundColor: opt === q.correctAnswer ? 'rgba(16, 185, 129, 0.05)' : 'white' }}>
                    {opt === q.correctAnswer && <CheckCircle2 size={16} color="#10B981" />}
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '600px', padding: '2rem', position: 'relative' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            <h2 style={{ marginBottom: '1.5rem' }}>Add New Question</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600' }}>Question Text</label>
                <textarea required onChange={(e) => setFormData({...formData, question: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-border)', height: '80px' }}></textarea>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {formData.options.map((opt, i) => (
                  <input key={i} placeholder={`Option ${i+1}`} required onChange={(e) => {
                    const newOpts = [...formData.options];
                    newOpts[i] = e.target.value;
                    setFormData({...formData, options: newOpts});
                  }} style={{ padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-border)' }} />
                ))}
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600' }}>Correct Answer</label>
                <select required onChange={(e) => setFormData({...formData, correctAnswer: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
                   <option value="">Select option...</option>
                   {formData.options.map((opt, i) => opt && <option key={i} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <select onChange={(e) => setFormData({...formData, section: e.target.value})} style={{ padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
                   <option>Quantitative</option>
                   <option>Logical Reasoning</option>
                   <option>Verbal</option>
                </select>
                <select onChange={(e) => setFormData({...formData, difficulty: e.target.value})} style={{ padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
                   <option value="easy">Easy</option>
                   <option value="medium">Medium</option>
                   <option value="hard">Hard</option>
                </select>
              </div>
              <button type="submit" className="btn-primary" style={{ padding: '1rem' }}>Save Question</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAptitudeManager;
