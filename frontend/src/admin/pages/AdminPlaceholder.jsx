import React from 'react';

const AdminPlaceholder = ({ title }) => {
  return (
    <div className="page-transition" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <div style={{ padding: '2rem', backgroundColor: 'rgba(124, 58, 237, 0.05)', borderRadius: '24px', border: '1px dashed var(--color-primary)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--color-primary)' }}>{title}</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>
          This administrative module is currently under active development as part of the phase 2 update.
        </p>
      </div>
    </div>
  );
};

export default AdminPlaceholder;
