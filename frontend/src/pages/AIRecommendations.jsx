import React from 'react';
import { Star, GitCompare, ChevronRight, CheckCircle2 } from 'lucide-react';

const AIRecommendations = () => {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1>AI College Recommendations</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Based on your marks, aptitude, and budget, here are your best matches.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[1, 2, 3].map((idx) => (
          <div key={idx} className="card" style={{ borderLeft: idx === 1 ? '4px solid var(--color-primary)' : '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <h2 style={{ margin: 0 }}>Global Tech Institute {idx}</h2>
                  {idx === 1 && <span style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '0.15rem 0.5rem', borderRadius: '1rem', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Star size={12} fill="white" /> Top Pick</span>}
                </div>
                <p className="small-text" style={{ color: 'var(--color-success)', fontWeight: '600' }}>{98 - idx}% Match Percentage</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-accent" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><GitCompare size={16} /> Compare</button>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>View Details <ChevronRight size={16}/></button>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'rgba(124, 58, 237, 0.05)', padding: '1rem', borderRadius: '0.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <CheckCircle2 style={{ color: 'var(--color-primary)', flexShrink: 0 }} size={20} />
              <div>
                <p style={{ fontWeight: '500', marginBottom: '0.25rem' }}>Why this match?</p>
                <p className="small-text" style={{ color: 'var(--text-secondary)' }}>
                  This college aligns perfectly with your interest in Computer Science and fits within your stated budget. The campus location matches your preference, and your aptitude score of 85% places you well above their typical acceptance threshold.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;
