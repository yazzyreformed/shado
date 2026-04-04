import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';
import ShadowList from './ShadowList';
import { Play, RotateCw } from 'lucide-react';

const API_BASE = 'http://localhost:5001/api';
// We use a dummy test user for Fast Mode
const DUMMY_USER_ID = 'test-user-123';

const Dashboard = () => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  const fetchRandomVideo = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/videos/random`);
      setCurrentVideo(res.data);
    } catch (error) {
      console.error('Error fetching video:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_BASE}/shadowing/stats/${DUMMY_USER_ID}`);
      setStats(res.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchRandomVideo();
    fetchStats();
  }, []);

  const handleShadowComplete = async () => {
    if (!currentVideo) return;
    try {
      await axios.post(`${API_BASE}/shadowing/complete`, {
        userId: DUMMY_USER_ID,
        videoId: currentVideo._id
      });
      // Refresh stats
      fetchStats();
    } catch (error) {
      console.error('Error saving complete status:', error);
    }
  };

  return (
    <div className="flex-col gap-6 flex">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Welcome back, Explorer!</h2>
          <p className="text-muted" style={{ color: 'var(--text-muted)' }}>Ready to improve your pronunciation today?</p>
        </div>
        <button className="btn-primary flex items-center gap-4" onClick={fetchRandomVideo}>
          <RotateCw size={20} />
          <span>New Shadow</span>
        </button>
      </div>

      <div className="grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="glass-panel">
          {loading ? (
            <div className="flex justify-center items-center" style={{ height: '300px' }}>
              <p>Loading video...</p>
            </div>
          ) : currentVideo ? (
            <VideoPlayer 
              video={currentVideo} 
              onComplete={handleShadowComplete} 
            />
          ) : (
            <div className="flex justify-center items-center flex-col" style={{ height: '300px', gap: '16px' }}>
              <p>No video available right now.</p>
              <button className="btn-primary" onClick={fetchRandomVideo}>Try Again</button>
            </div>
          )}
        </div>

        <div className="glass-panel flex-col gap-6 flex">
          <h3 style={{ fontSize: '1.25rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '12px' }}>Your Shadowing Logs</h3>
          <ShadowList stats={stats} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
