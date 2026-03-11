import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = ({ style }) => {
  const navigate = useNavigate();
  return (
    <button 
      onClick={() => navigate(-1)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'none',
        border: 'none',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        padding: '0.5rem 0',
        marginBottom: '1rem',
        ...style
      }}
      className="back-btn-hover"
    >
      <ArrowLeft size={18} />
      Back
    </button>
  );
};

export default BackButton;
