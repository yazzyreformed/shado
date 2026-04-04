import React, { useState, useRef } from 'react';
import { Subtitles, CheckCircle } from 'lucide-react';

const VideoPlayer = ({ video, onComplete }) => {
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [completed, setCompleted] = useState(false);
  const videoRef = useRef(null);

  const handleEnded = () => {
    if (!completed) {
      setCompleted(true);
      onComplete();
    }
  };

  const toggleSubtitles = () => {
    setShowSubtitles(!showSubtitles);
  };

  return (
    <div className="flex-col gap-4 flex" style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{video.title}</h3>
        <span style={{ 
          background: 'rgba(99, 102, 241, 0.2)', 
          color: 'var(--primary)', 
          padding: '4px 12px', 
          borderRadius: '12px',
          fontSize: '0.875rem',
          textTransform: 'uppercase'
        }}>
          {video.difficulty}
        </span>
      </div>

      <div style={{ position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', background: '#000' }}>
        <video 
          ref={videoRef}
          controls 
          src={video.s3Url} 
          style={{ width: '100%', aspectRatio: '16/9', display: 'block' }}
          onEnded={handleEnded}
        />
        
        {showSubtitles && video.subtitle && (
          <div style={{
            position: 'absolute',
            bottom: '60px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.7)',
            padding: '10px 20px',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '1.1rem',
            textAlign: 'center',
            width: '80%',
            backdropFilter: 'blur(4px)'
          }}>
            {video.subtitle}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-2">
        <button 
          className="btn-secondary flex items-center gap-4" 
          onClick={toggleSubtitles}
          style={{ 
            background: showSubtitles ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.1)',
            borderColor: showSubtitles ? 'var(--primary)' : 'rgba(255, 255, 255, 0.2)'
          }}
        >
          <Subtitles size={18} />
          {showSubtitles ? 'Hide Subtitles' : 'Show Subtitles'}
        </button>

        {completed && (
          <div className="animate-fade-in flex items-center" style={{ color: '#10b981', gap: '8px', fontWeight: '500' }}>
            <CheckCircle size={20} />
            <span>Activity Logged!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
