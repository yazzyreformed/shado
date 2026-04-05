import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Headphones, Activity, BookOpen } from 'lucide-react';
import Dashboard from './components/Dashboard';
import DiscoverFeed from './components/DiscoverFeed';
import VideoDetail from './components/VideoDetail';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="glass-header flex items-center justify-center">
          <div className="container flex justify-between items-center" style={{ width: '100%', padding: '15px 20px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="flex items-center gap-4">
                <Headphones size={32} color="var(--primary)" />
                <h1 className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                  ShadoWEB
                </h1>
              </div>
            </Link>
            <nav className="flex gap-4">
              <Link to="/" className="btn-secondary flex items-center" style={{ gap: '8px', textDecoration: 'none' }}>
                <Activity size={18} />
                Dashboard
              </Link>
            </nav>
          </div>
        </header>

        <main className="container animate-fade-in" style={{ padding: '40px 20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/discover" element={<DiscoverFeed />} />
            <Route path="/video/:id" element={<VideoDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
