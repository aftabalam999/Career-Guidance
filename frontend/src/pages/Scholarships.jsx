import React from 'react';
import { Award, Calendar, Link } from 'lucide-react';

const Scholarships = () => {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Scholarships</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Based on your profile, you are eligible for the following scholarships.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {[1, 2, 3, 4].map(idx => (
          <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)', padding: '1rem', borderRadius: '0.5rem', alignSelf: 'start' }}>
                <Award size={24} />
              </div>
              <div>
                <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>Merit Scholarship {idx}</h3>
                <p className="small-text" style={{ color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Eligibility: &gt; 90% in 12th Grade</p>
                <p className="small-text" style={{ color: 'var(--text-secondary)' }}>State: All India</p>
              </div>
            </div>
            
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-background)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                <Calendar size={16} /> <span className="small-text">Deadline: 20th Oct</span>
              </div>
              <span style={{ fontWeight: '600', color: 'var(--color-success)' }}>$2,000</span>
            </div>

            <button className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
              <Link size={16} /> Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scholarships;
