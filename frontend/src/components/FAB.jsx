import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import axios from 'axios';

const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5001/api' : '/api';
const DUMMY_USER_ID = 'test-user-123';

const FAB = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNewShadow = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/videos/discover/${DUMMY_USER_ID}`);
      const videos = res.data;
      if (videos && videos.length > 0) {
        const randomVideo = videos[Math.floor(Math.random() * videos.length)];
        navigate(`/video/${randomVideo._id}`);
      }
    } catch (error) {
      console.error('Error fetching new video:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleNewShadow}
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
        cursor: loading ? 'wait' : 'pointer',
        zIndex: 1000,
        transition: 'transform 0.2s',
        opacity: loading ? 0.7 : 1
      }}
      onMouseOver={(e) => { if(!loading) e.currentTarget.style.transform = 'scale(1.1)' }}
      onMouseOut={(e) => { if(!loading) e.currentTarget.style.transform = 'scale(1)' }}
      title="New Shado"
    >
      <Plus size={32} className={loading ? 'animate-spin' : ''} />
    </button>
  );
};

export default FAB;
