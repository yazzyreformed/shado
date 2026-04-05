import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShadowListItem from './ShadowListItem';
import FAB from './FAB';

const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5001/api' : '/api';
const DUMMY_USER_ID = 'test-user-123';

const Dashboard = () => {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchShadowList = async () => {
    try {
      const res = await axios.get(`${API_BASE}/shadowing/list/${DUMMY_USER_ID}`);
      setList(res.data);
    } catch (error) {
      console.error('Error fetching shadow list', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShadowList();
  }, []);

  return (
    <div className="flex-col gap-8 flex">
      <div>
        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Your Shadow Collection</h2>
        <p className="text-muted" style={{ color: 'var(--text-muted)' }}>
          Click an academy ring to see your progress or start shadowing.
        </p>
      </div>

      {loading ? (
        <p>Loading your collection...</p>
      ) : list && list.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
          {list.map((item, idx) => (
            <ShadowListItem key={idx} item={item} />
          ))}
        </div>
      ) : (
        <div className="glass-panel text-center flex-col flex justify-center items-center" style={{ height: '300px', gap: '16px' }}>
          <p>Your shadow collection is empty.</p>
          <p style={{ color: 'var(--text-muted)' }}>Use the (+) button at bottom right to discover new scenes!</p>
        </div>
      )}

      <FAB />
    </div>
  );
};

export default Dashboard;
