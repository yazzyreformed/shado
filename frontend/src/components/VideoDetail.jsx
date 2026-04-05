import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, FileText } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import TranscriptModal from './TranscriptModal';

const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5001/api' : '/api';
const DUMMY_USER_ID = 'test-user-123';

const VideoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);
  const [activityError, setActivityError] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`${API_BASE}/videos/${id}`);
        setVideo(res.data);
      } catch (error) {
        console.error('Error fetching video', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  const handleComplete = async () => {
    try {
      await axios.post(`${API_BASE}/shadowing/complete`, {
        userId: DUMMY_USER_ID,
        videoId: id
      });
      setActivityError('');
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setActivityError(error.response.data.message);
      } else {
        console.error('Error logging activity', error);
      }
    }
  };

  if (loading) return <p>Preparing your shadowing laboratory...</p>;
  if (!video) return <p>Video not found.</p>;

  return (
    <div className="flex-col gap-6 flex">
      <button 
        className="btn-secondary" 
        onClick={() => navigate(-1)} 
        style={{ width: 'fit-content', border: 'none', padding: '8px 16px', display: 'flex', gap: '8px', alignItems: 'center' }}
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '32px', alignItems: 'start' }}>
        {/* Left Side: Video Player */}
        <div className="flex-col gap-4 flex" style={{ width: '100%' }}>
          <VideoPlayer video={video} onComplete={handleComplete} />
          
          <div className="flex justify-between items-center" style={{ marginTop: '8px' }}>
            <button 
              className="btn-primary" 
              onClick={() => setShowTranscript(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}
            >
              <FileText size={18} /> View Transcript Text
            </button>
            {activityError && (
              <p style={{ color: '#ef4444', fontSize: '0.9rem', margin: 0 }}>{activityError}</p>
            )}
          </div>
        </div>

        {/* Right Side: Static Guidelines */}
        <div className="glass-panel sticky" style={{ top: '24px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--primary)' }}>Shadowing Protocol</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
            Follow these 4 rigorous steps to master the pronunciation and prosody of this scene:
          </p>

          <div className="flex-col gap-6 flex">
            <div>
              <h4 style={{ color: 'var(--text-main)', marginBottom: '4px' }}>Step 1: Watch with Subtitles</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Enable English subtitles and watch the scene to understand the context and flow.</p>
            </div>
            
            <div>
              <h4 style={{ color: 'var(--text-main)', marginBottom: '4px' }}>Step 2: Read the Transcript</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Open the transcript modal and read the text aloud on your own, guessing the pronunciation.</p>
            </div>

            <div>
              <h4 style={{ color: 'var(--text-main)', marginBottom: '4px' }}>Step 3: Shadow with Transcript</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Play the video and read the transcript simultaneously with the speaker, matching their speed and tone perfectly.</p>
            </div>

            <div>
              <h4 style={{ color: 'var(--text-main)', marginBottom: '4px' }}>Step 4: Shadow Blindly</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Close the transcript, disable subtitles, and repeat after the speaker purely by listening.</p>
            </div>
          </div>
        </div>
      </div>

      {showTranscript && (
        <TranscriptModal 
          vttUrl={video.subtitleUrl} 
          onClose={() => setShowTranscript(false)} 
        />
      )}
    </div>
  );
};

export default VideoDetail;
