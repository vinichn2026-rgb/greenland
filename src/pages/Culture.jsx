import React from 'react';
import { Sprout } from 'lucide-react';

export const Culture = () => {
  return (
    <div className="page-container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel" style={{ textAlign: 'center', maxWidth: '500px', backgroundColor: '#fff', border: '1px solid #e2e8f0', color: '#0f172a' }}>
        <Sprout style={{ width: '48px', height: '48px', color: '#0b4a1b', margin: '0 auto 1.5rem auto' }} />
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>GreenLand Culture & Heritage</h2>
        <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Future sub-page outlining historical land conservation programs and community farm systems in Tamil Nadu.
        </p>
        <button className="btn-glow btn-glow-green" style={{ border: '1px solid #0b4a1b', color: '#0b4a1b', textShadow: 'none' }} onClick={() => window.location.reload()}>
          Return to Portal
        </button>
      </div>
    </div>
  );
};

export default Culture;
