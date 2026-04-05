import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const TranscriptModal = ({ vttUrl, onClose }) => {
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        const response = await fetch(vttUrl);
        const text = await response.text();
        
        // Simple VTT to Text Parser
        const lines = text.split('\n');
        let parsedText = '';
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          // Skip WEBVTT, empty lines, index numbers, and timestamp lines
          if (
            line === 'WEBVTT' || 
            line === '' || 
            !isNaN(line) || 
            line.includes('-->')
          ) {
            continue;
          }
          parsedText += line + ' ';
        }

        setTranscript(parsedText || 'No transcript text found.');
      } catch (error) {
        console.error('Error fetching transcript', error);
        setTranscript('Failed to load transcript.');
      } finally {
        setLoading(false);
      }
    };
    fetchTranscript();
  }, [vttUrl]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.8)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(10px)'
    }}>
      <div className="glass-panel" style={{ width: '80%', maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto', position: 'relative' }}>
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }}
        >
          <X size={24} />
        </button>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
          Video Transcript
        </h3>
        {loading ? (
          <p>Analyzing transcript from AWS...</p>
        ) : (
          <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            {transcript}
          </p>
        )}
      </div>
    </div>
  );
};

export default TranscriptModal;
