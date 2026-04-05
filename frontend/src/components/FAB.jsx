import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

const FAB = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/discover')}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary)',
        color: '#fff',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(var(--primary-rgb), 0.4)',
        cursor: 'pointer',
        zIndex: 1000,
        transition: 'transform 0.2s',
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      title="New Shado"
    >
      <Plus size={32} />
    </button>
  );
};

export default FAB;
