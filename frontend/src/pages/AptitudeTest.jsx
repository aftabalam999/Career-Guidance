import React from 'react';
import { Clock } from 'lucide-react';
import BackButton from '../components/BackButton';

const AptitudeTest = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <BackButton />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Aptitude Evaluation</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Section: Quantitative Analysis (1 of 3)</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-error)', padding: '0.5rem 1rem', borderRadius: '1rem', fontWeight: '600' }}>
          <Clock size={18} /> 14:59 leftover
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--color-border)', borderRadius: '4px', marginBottom: '2rem' }}>
        <div style={{ width: '33%', height: '100%', backgroundColor: 'var(--color-primary)', borderRadius: '4px' }}></div>
      </div>

      <div className="card" style={{ padding: '2.5rem' }}>
        <h2 style={{ marginBottom: '1.5rem', lineHeight: '1.4' }}>
          1. If a train travels 60 km/h for 2 hours, and then 80 km/h for 1 hour, what is its average speed?
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {['66.6 km/h', '70 km/h', '75 km/h', '80 km/h'].map((option, idx) => (
            <label 
              key={idx} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1rem', 
                border: '1px solid var(--color-border)', 
                borderRadius: '0.5rem',
                cursor: 'pointer',
                transition: 'border 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
            >
              <input type="radio" name="question1" style={{ accentColor: 'var(--color-primary)', transform: 'scale(1.2)' }} />
              <span style={{ fontSize: '1.1rem' }}>{option}</span>
            </label>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
          <button className="btn-outline">Previous</button>
          <button className="btn-primary">Next Question</button>
        </div>
      </div>
    </div>
  );
};

export default AptitudeTest;
