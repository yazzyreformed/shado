import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';

const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5001/api' : '/api';
const DUMMY_USER_ID = 'test-user-123';

const DiscoverFeed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiscover = async () => {
      try {
        const res = await axios.get(`${API_BASE}/videos/discover/${DUMMY_USER_ID}`);
        setVideos(res.data);
      } catch (error) {
        console.error('Error fetching discover feed', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDiscover();
  }, []);

  return (
    <div className="flex-col gap-8 flex">
      <div>
        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Discover New Scenes</h2>
        <p className="text-muted" style={{ color: 'var(--text-muted)' }}>
          Swipe through these scenes to expand your shadowing collection.
        </p>
      </div>

      {loading ? (
        <p>Loading discovery feed...</p>
      ) : videos && videos.length > 0 ? (
        <div className="flex-col gap-6 flex">
          {videos.map(video => (
            <div key={video._id} className="glass-panel flex justify-between items-center" style={{ padding: '24px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{video.title}</h3>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  background: video.difficulty === 'hard' ? 'rgba(239,68,68,0.2)' : 'rgba(59,130,246,0.2)',
                  color: video.difficulty === 'hard' ? '#ef4444' : '#3b82f6',
                  border: `1px solid ${video.difficulty === 'hard' ? '#ef4444' : '#3b82f6'}`
                }}>
                  {video.difficulty.toUpperCase()}
                </span>
              </div>
              <button className="btn-primary flex items-center justify-center gap-2" onClick={() => navigate(`/video/${video._id}`)}>
                <Play size={20} /> Play & Add
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel text-center flex-col flex justify-center items-center" style={{ height: '300px', gap: '16px' }}>
          <p>Wow! You have shadowed every video in our database.</p>
          <button className="btn-primary" onClick={() => navigate('/')}>Back to Collection</button>
        </div>
      )}
    </div>
  );
};

export default DiscoverFeed;
