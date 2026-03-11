import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, Loader2, CheckCircle, ChevronRight, AlertCircle } from 'lucide-react';
import BackButton from '../components/BackButton';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const AptitudeTest = () => {
  const { user, login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('/api/ai/test-questions', config);
        setQuestions(data);
        setLoading(false);
      } catch (err) {
        showToast("Error loading test", "error");
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [user.token]);

  const handleOptionSelect = (opt) => {
    setAnswers({ ...answers, [questions[currentIndex]._id]: opt });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post('/api/ai/submit-test', { answers }, config);
      setResult(data);
      setCompleted(true);
      
      // Update local user context with new aptitude score if returned
      if (data.score !== undefined) {
         login({ ...user, studentProfile: { ...user.studentProfile, aptitudeScore: data.score } });
      }
    } catch (err) {
      showToast("Submission failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <Loader2 className="animate-spin" size={48} color="var(--color-primary)" />
      <p style={{ marginTop: '1rem' }}>Preparing your evaluation...</p>
    </div>
  );

  if (completed && result) {
    return (
      <div className="page-transition" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <div className="card" style={{ padding: '3rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', width: 'fit-content', margin: '0 auto 2rem' }}>
             <CheckCircle size={64} color="#10B981" />
          </div>
          <h1 style={{ marginBottom: '1rem' }}>Test Completed!</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
            Your career aptitude analysis is ready. Your matched score is:
          </p>
          <div style={{ fontSize: '4rem', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
             {result.score}%
          </div>
          <p style={{ fontWeight: '600', marginBottom: '2.5rem' }}>Suitability: <span style={{ color: 'var(--color-accent)' }}>{result.suitability}</span></p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn-outline" onClick={() => navigate('/profile')}>View Profile</button>
            <button className="btn-primary" onClick={() => navigate('/recommendations')}>Get Recommendations <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) return (
    <div className="page-transition card" style={{ padding: '4rem', textAlign: 'center', maxWidth: '600px', margin: '2rem auto' }}>
      <AlertCircle size={48} color="var(--color-error)" style={{ margin: '0 auto 1.5rem' }} />
      <h2>No Questions Available</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>The evaluation module is currently being updated by the admin.</p>
      <BackButton />
    </div>
  );

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }} className="page-transition">
      <BackButton />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Aptitude Evaluation</h1>
          <p style={{ color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', fontSize: '13px' }}>
            Section: {currentQ.section} ({currentIndex + 1} of {questions.length})
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-error)', padding: '0.5rem 1rem', borderRadius: '1rem', fontWeight: '600' }}>
          <Clock size={18} /> Time Tracking Active
        </div>
      </div>

      <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--color-border)', borderRadius: '4px', marginBottom: '2.5rem', overflow: 'hidden' }}>
        <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--color-primary)', transition: 'width 0.3s ease' }}></div>
      </div>

      <div className="card" style={{ padding: '3rem' }}>
        <h2 style={{ marginBottom: '2rem', lineHeight: '1.4', fontSize: '1.5rem' }}>
          {currentQ.question}
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {currentQ.options.map((option, idx) => (
            <label 
              key={idx} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1.25rem', 
                border: '2px solid', 
                borderColor: answers[currentQ._id] === option ? 'var(--color-primary)' : 'var(--color-border)',
                backgroundColor: answers[currentQ._id] === option ? 'rgba(124, 58, 237, 0.05)' : 'white',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <input 
                type="radio" 
                name={`q-${currentQ._id}`} 
                checked={answers[currentQ._id] === option}
                onChange={() => handleOptionSelect(option)}
                style={{ accentColor: 'var(--color-primary)', transform: 'scale(1.2)' }} 
              />
              <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{option}</span>
            </label>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
          <button 
            className="btn-outline" 
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
          >Previous</button>
          
          {currentIndex === questions.length - 1 ? (
             <button 
               className="btn-primary" 
               disabled={!answers[currentQ._id] || submitting}
               onClick={handleSubmit}
             >
               {submitting ? <Loader2 className="animate-spin" /> : 'Final Submit'}
             </button>
          ) : (
            <button 
              className="btn-primary" 
              disabled={!answers[currentQ._id]}
              onClick={() => setCurrentIndex(currentIndex + 1)}
            >Next Question</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AptitudeTest;

