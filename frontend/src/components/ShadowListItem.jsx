import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';

const ShadowListItem = ({ item }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

  const { video, shadowCount, dates } = item;
  
  // Decide ring color based on difficulty
  const ringColor = video.difficulty === 'hard' ? '#ef4444' : 
                    video.difficulty === 'medium' ? '#eab308' : '#3b82f6';

  // Build last 30 days array
  const last30Days = Array.from({ length: 30 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    d.setHours(0,0,0,0);
    return d;
  });

  const parsedDates = dates.map(d => {
    const date = new Date(d);
    date.setHours(0,0,0,0);
    return date.getTime();
  });

  const getDayStatus = (date) => {
    return parsedDates.includes(date.getTime());
  };

  return (
    <div className="flex-col flex gap-4" style={{ alignItems: 'center' }}>
      
      {/* Circle Icon */}
      <div 
        className="shadow-ring-container relative cursor-pointer"
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          border: `4px solid ${ringColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.05)',
          boxShadow: `0 0 15px ${ringColor}40`,
          transition: 'all 0.3s ease',
        }}
        onClick={() => setShowCalendar(!showCalendar)}
        onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)' }}
        onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
      >
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-main)', opacity: 0.8 }}>
            {video.title.split(' ').slice(0, 2).join(' ')}
          </h4>
        </div>

        {/* Counter Badge */}
        <div style={{
          position: 'absolute',
          top: '-5px',
          right: '-5px',
          background: 'var(--primary)',
          color: 'white',
          borderRadius: '50%',
          width: '28px',
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          border: '2px solid var(--background)'
        }}>
          {shadowCount}
        </div>
      </div>

      {/* Toggled Calendar Area */}
      {showCalendar && (
        <div className="glass-panel animate-fade-in" style={{ width: '100%', padding: '16px', marginTop: '8px' }}>
          <div className="flex justify-between items-center mb-4">
            <h5 style={{ margin: 0, color: 'var(--text-muted)' }}>Shadow History</h5>
            <button 
              className="btn-primary flex items-center justify-center" 
              style={{ padding: '6px 12px', gap: '8px', background: ringColor, borderColor: ringColor }}
              onClick={() => navigate(`/video/${video._id}`)}
            >
              <Play size={16} /> Play
            </button>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(15, 1fr)', 
            gap: '4px' 
          }}>
            {last30Days.map((date, idx) => (
              <div 
                key={idx} 
                title={date.toDateString()}
                style={{
                  aspectRatio: '1',
                  borderRadius: '4px',
                  background: getDayStatus(date) ? ringColor : 'rgba(255,255,255,0.05)',
                  opacity: getDayStatus(date) ? 1 : 0.5
                }} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShadowListItem;
