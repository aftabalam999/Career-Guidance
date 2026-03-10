import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Test = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [finished, setFinished] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('/api/tests', { headers: { 'x-auth-token': token } });
                setQuestions(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    const handleAnswer = (option) => {
        if (questions[currentIdx].answer === option) {
            setScore(score + 1);
        }

        if (currentIdx + 1 < questions.length) {
            setCurrentIdx(currentIdx + 1);
        } else {
            setFinished(true);
            submitScore(score + (questions[currentIdx].answer === option ? 1 : 0));
        }
    };

    const submitScore = async (finalScore) => {
        try {
            const percentageScore = (finalScore / questions.length) * 100 || 0;
            const token = localStorage.getItem('token');
            await axios.post('/api/results',
                { aptitudeScore: percentageScore },
                { headers: { 'x-auth-token': token } }
            );
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div>Loading test...</div>;

    if (finished) {
        return (
            <div className="card" style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Test Completed!</h2>
                <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>You scored {Math.round((score / questions.length) * 100 || 0)}%</p>
                <button className="btn-primary" onClick={() => navigate('/recommendations')}>View Recommendations</button>
            </div>
        );
    }

    if (questions.length === 0) return <div className="card">No questions available. Admin needs to add questions.</div>;

    const q = questions[currentIdx];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 className="page-title">Aptitude Test</h1>
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-light)' }}>
                    <span>Question {currentIdx + 1} of {questions.length}</span>
                    <span>Score: {score}</span>
                </div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '2rem', fontWeight: '600' }}>{q.question}</h2>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {q.options.map(opt => (
                        <button
                            key={opt}
                            onClick={() => handleAnswer(opt)}
                            style={{ padding: '1rem', textAlign: 'left', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseOver={e => e.currentTarget.style.borderColor = 'var(--primary-color)'}
                            onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Test;
