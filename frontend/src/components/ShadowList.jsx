import React from 'react';
import { Calendar, Activity as ActivityIcon, Clock } from 'lucide-react';

const ShadowList = ({ stats }) => {
  if (!stats) {
    return <p style={{ color: 'var(--text-muted)' }}>Loading stats...</p>;
  }

  return (
    <div className="flex-col gap-6 flex">
      {/* Overview Cards */}
      <div className="grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px' }}>
          <div className="flex items-center gap-4" style={{ marginBottom: '8px', color: 'var(--text-muted)' }}>
            <ActivityIcon size={16} />
            <span style={{ fontSize: '0.875rem' }}>Total Sessions</span>
          </div>
          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>
            {stats.totalSessions}
          </p>
        </div>
        
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px' }}>
          <div className="flex items-center gap-4" style={{ marginBottom: '8px', color: 'var(--text-muted)' }}>
            <Calendar size={16} />
            <span style={{ fontSize: '0.875rem' }}>Active Days</span>
          </div>
          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>
            {stats.totalStudyDays}
          </p>
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--text-muted)' }}>Recent History</h4>
        <div className="flex-col gap-4 flex">
          {stats.recentActivities && stats.recentActivities.length > 0 ? (
            stats.recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between" style={{ 
                padding: '12px', 
                background: 'rgba(255,255,255,0.03)', 
                borderRadius: '8px'
              }}>
                <div className="flex items-center gap-4">
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    background: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff'
                  }}>
                    <Clock size={14} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.9rem', fontWeight: '500' }}>
                      {activity.videoId?.title || 'Unknown Video'}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {new Date(activity.completedAt).toLocaleDateString()} at {new Date(activity.completedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>
              No activities yet. Start shadowing!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShadowList;
