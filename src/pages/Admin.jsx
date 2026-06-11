import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  ShieldCheck, Check, Trash2, User, Phone, MapPin, 
  Award, Compass, Eye, ShieldAlert, CheckCircle2,
  Lock, Mail, EyeOff, LogOut
} from 'lucide-react';

export const Admin = () => {
  const { fetchPlots } = useContext(AppContext);
  const [pendingPlots, setPendingPlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [actionMessage, setActionMessage] = useState('');

  // Admin authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('isAdminAuthenticated') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (adminEmail.trim().toLowerCase() === 'admin@thennadunilam.com' && adminPassword === 'adminpassword123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAdminAuthenticated', 'true');
    } else {
      setLoginError('Invalid Administrator credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAdminAuthenticated');
  };

  const fetchPending = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/plots/pending');
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setPendingPlots(data);
      if (data.length > 0) {
        setSelectedPlot(data[0]);
      } else {
        setSelectedPlot(null);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load pending listings. Please check server connections.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`/api/plots/${id}/approve`, {
        method: 'PUT'
      });
      if (!res.ok) throw new Error('Approve failed');
      
      setActionMessage('Listing successfully approved! It is now live in Buy Land.');
      setTimeout(() => setActionMessage(''), 4000);
      
      // Refresh list
      await fetchPending();
      await fetchPlots(); // Update main app context plots
    } catch (err) {
      console.error(err);
      alert('Failed to approve property.');
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Are you sure you want to reject and delete this listing?')) return;

    try {
      const res = await fetch(`/api/plots/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Deletion failed');

      setActionMessage('Listing rejected and removed from system.');
      setTimeout(() => setActionMessage(''), 4000);

      // Refresh list
      await fetchPending();
    } catch (err) {
      console.error(err);
      alert('Failed to reject property.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="buyland-page-wrapper fade-in" style={{ paddingBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div className="login-split-card glass-panel" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', padding: '0', overflow: 'hidden', maxWidth: '1000px', width: '100%', border: '1px solid #e2e8f0', backgroundColor: '#fff', borderRadius: '16px', boxShadow: 'var(--shadow-lg)' }}>
          {/* Left Panel */}
          <div 
            className="login-welcome-banner"
            style={{ 
              backgroundImage: `linear-gradient(rgba(15, 76, 35, 0.88), rgba(11, 74, 27, 0.92)), url('/images/green_fields_bg.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '3rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              color: '#fff',
              borderRight: '1px solid #e2e8f0'
            }}
          >
            <ShieldAlert style={{ width: '48px', height: '48px', color: '#b89047', marginBottom: '1.5rem' }} />
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
              Admin Panel
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.5', marginBottom: '2rem' }}>
              Access to verify pending mediator listings, approve new land entries, and manage plot inventory.
            </p>
            
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '1rem', borderRadius: '8px', fontSize: '0.8rem', borderLeft: '3px solid #b89047' }}>
              <strong style={{ color: '#fff', display: 'block', marginBottom: '0.25rem' }}>💡 Default Sandbox Credentials:</strong>
              <div>Email: <span style={{ fontFamily: 'monospace', color: '#b89047', fontWeight: 700 }}>admin@thennadunilam.com</span></div>
              <div>Password: <span style={{ fontFamily: 'monospace', color: '#b89047', fontWeight: 700 }}>adminpassword123</span></div>
            </div>
          </div>

          {/* Right Panel: Login Form */}
          <div className="login-form-side" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Security Check
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-grey)', marginBottom: '1.5rem' }}>Please verify your administrator access keys.</p>

            {loginError && (
              <div className="modal-error-message" style={{ marginBottom: '1.25rem', padding: '0.75rem', borderRadius: '6px' }}>
                ⚠️ {loginError}
              </div>
            )}

            <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="filter-form-field">
                <label>Admin Email</label>
                <div className="input-container">
                  <Mail className="input-icon" style={{ zIndex: 10 }} />
                  <input 
                    type="email"
                    placeholder="admin@thennadunilam.com"
                    className="form-input"
                    value={adminEmail}
                    onChange={(e) => { setAdminEmail(e.target.value); setLoginError(''); }}
                    required
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              <div className="filter-form-field">
                <label>Admin Password</label>
                <div className="input-container">
                  <Lock className="input-icon" style={{ zIndex: 10 }} />
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    className="form-input"
                    value={adminPassword}
                    onChange={(e) => { setAdminPassword(e.target.value); setLoginError(''); }}
                    style={{ paddingRight: '2.5rem', paddingLeft: '2.5rem' }}
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '0.75rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-light)', display: 'flex', alignItems: 'center', zIndex: 10 }}
                  >
                    {showPassword ? <EyeOff style={{ width: '18px', height: '18px' }} /> : <Eye style={{ width: '18px', height: '18px' }} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="search-submit-btn" style={{ padding: '0.85rem', fontSize: '0.95rem', borderRadius: '6px', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <ShieldCheck style={{ width: '18px', height: '18px' }} />
                <span>Verify Access</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="terms-page-container fade-in" style={{ paddingBottom: '4rem' }}>
      
      {/* Header */}
      <header className="buyland-header" style={{ marginTop: '1.5rem', marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShieldAlert style={{ color: 'var(--primary-green)', width: '32px', height: '32px' }} />
            Admin Verification Center
          </h1>
          <p style={{ color: 'var(--text-grey)', fontSize: '0.95rem', maxWidth: '700px', lineHeight: '1.6', marginTop: '0.4rem' }}>
            Approve or reject pending real estate listings submitted by registered mediators and agents. Verified listings will automatically go live.
          </p>
        </div>
        
        <button 
          onClick={handleLogout}
          className="filter-reset-btn" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.6rem 1.25rem', 
            fontSize: '0.85rem', 
            borderColor: '#ef4444', 
            color: '#ef4444', 
            fontWeight: 700 
          }}
        >
          <LogOut style={{ width: '15px', height: '15px' }} />
          <span>Admin Logout</span>
        </button>
      </header>

      {/* Action Notification Alert */}
      {actionMessage && (
        <div style={{ backgroundColor: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '1rem 1.5rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 style={{ width: '18px', height: '18px' }} />
          {actionMessage}
        </div>
      )}

      {loading ? (
        <div className="glass-panel" style={{ backgroundColor: '#fff', textAlign: 'center', padding: '4rem', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <p style={{ fontWeight: 600, color: '#64748b' }}>⏳ Fetching pending listings from database...</p>
        </div>
      ) : error ? (
        <div className="glass-panel" style={{ backgroundColor: '#fef2f2', textAlign: 'center', padding: '4rem', border: '1px solid #fee2e2', borderRadius: '12px' }}>
          <p style={{ fontWeight: 600, color: '#ef4444' }}>❌ {error}</p>
        </div>
      ) : pendingPlots.length === 0 ? (
        <div className="glass-panel" style={{ backgroundColor: '#fff', textAlign: 'center', padding: '5rem 2rem', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--secondary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <Check className="comparison-icon tick" style={{ width: '28px', height: '28px' }} />
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>All Clear!</h3>
          <p style={{ color: 'var(--text-grey)', fontSize: '0.85rem' }}>There are currently no pending listings requiring verification approval.</p>
        </div>
      ) : (
        <div className="contact-main-grid" style={{ gridTemplateColumns: '1fr 420px', gap: '2rem' }}>
          
          {/* Left Side: Pending Table */}
          <div className="contact-form-card" style={{ padding: '1.75rem', borderRadius: '14px', overflowX: 'auto' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
              Pending Listings Queue ({pendingPlots.length})
            </h3>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: 'var(--text-light)' }}>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}>Plot Info</th>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}>Village/Panchayat</th>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}>Agent</th>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingPlots.map((plot) => (
                  <tr 
                    key={plot.id} 
                    onClick={() => setSelectedPlot(plot)}
                    style={{ 
                      borderBottom: '1px solid #f1f5f9', 
                      cursor: 'pointer',
                      backgroundColor: selectedPlot?.id === plot.id ? 'rgba(34, 197, 94, 0.04)' : 'transparent',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <strong style={{ color: '#0f172a' }}>{plot.title}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.1rem' }}>
                          {plot.area} Sq.ft • {plot.price}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem 0.5rem', color: 'var(--text-grey)' }}>
                      {plot.villageName || 'N/A'}, {plot.panchayatName || 'N/A'}
                    </td>
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, color: '#475569' }}>{plot.agentName}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{plot.agentLocation}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }} onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => handleApprove(plot.id)}
                          style={{ 
                            width: '28px', 
                            height: '28px', 
                            borderRadius: '6px', 
                            backgroundColor: 'rgba(34, 197, 94, 0.1)', 
                            color: 'var(--secondary-green)', 
                            border: 'none', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title="Approve & Publish"
                        >
                          <Check style={{ width: '14px', height: '14px', strokeWidth: 3 }} />
                        </button>
                        <button 
                          onClick={() => handleReject(plot.id)}
                          style={{ 
                            width: '28px', 
                            height: '28px', 
                            borderRadius: '6px', 
                            backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                            color: '#ef4444', 
                            border: 'none', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title="Reject & Delete"
                        >
                          <Trash2 style={{ width: '14px', height: '14px' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right Side: Detailed Profile Inspector Panel */}
          {selectedPlot && (
            <div className="contact-info-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderRadius: '14px', border: '1px solid var(--primary-green)' }}>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--secondary-green)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Verification Details
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginTop: '0.15rem' }}>
                  {selectedPlot.title}
                </h3>
              </div>

              {/* Agent info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                <strong style={{ fontSize: '0.8rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Mediator Profile</strong>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                  <User style={{ width: '14px', height: '14px', color: 'var(--secondary-green)' }} />
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{selectedPlot.agentName}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                  <Phone style={{ width: '14px', height: '14px', color: 'var(--secondary-green)' }} />
                  <a href={`tel:${selectedPlot.agentPhone}`} style={{ color: 'var(--text-grey)', textDecoration: 'none' }}>
                    {selectedPlot.agentPhone}
                  </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                  <MapPin style={{ width: '14px', height: '14px', color: 'var(--secondary-green)' }} />
                  <span style={{ color: 'var(--text-grey)' }}>Office: {selectedPlot.agentLocation}</span>
                </div>
              </div>

              {/* Location details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <strong style={{ fontSize: '0.8rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Geographic Vetting</strong>
                
                <div style={{ fontSize: '0.8rem', color: 'var(--text-grey)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <div>Village: <span style={{ fontWeight: 600, color: '#0f172a' }}>{selectedPlot.villageName}</span></div>
                  <div>Panchayat: <span style={{ fontWeight: 600, color: '#0f172a' }}>{selectedPlot.panchayatName}</span></div>
                  <div>District: <span style={{ fontWeight: 600, color: '#0f172a' }}>{selectedPlot.districtName}</span></div>
                </div>
              </div>

              {/* Land specs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <strong style={{ fontSize: '0.8rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Land Specifications</strong>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--text-grey)' }}>
                  <div>Price: <strong style={{ color: 'var(--primary-green)' }}>{selectedPlot.price}</strong></div>
                  <div>Area: <strong style={{ color: '#0f172a' }}>{selectedPlot.area} Sq.ft</strong></div>
                  <div>Facing: <span>{selectedPlot.facing}</span></div>
                  <div>Road Width: <span>{selectedPlot.road}</span></div>
                </div>
              </div>

              {/* Approvals checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <strong style={{ fontSize: '0.8rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Vetted Approvals</strong>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    padding: '0.2rem 0.5rem', 
                    borderRadius: '4px', 
                    backgroundColor: selectedPlot.features.dtcp ? 'rgba(34, 197, 94, 0.1)' : '#f1f5f9',
                    color: selectedPlot.features.dtcp ? 'var(--secondary-green)' : '#64748b',
                    fontWeight: 700
                  }}>
                    DTCP {selectedPlot.features.dtcp ? 'Approved' : 'No'}
                  </span>

                  <span style={{ 
                    fontSize: '0.7rem', 
                    padding: '0.2rem 0.5rem', 
                    borderRadius: '4px', 
                    backgroundColor: selectedPlot.features.rera ? 'rgba(34, 197, 94, 0.1)' : '#f1f5f9',
                    color: selectedPlot.features.rera ? 'var(--secondary-green)' : '#64748b',
                    fontWeight: 700
                  }}>
                    RERA {selectedPlot.features.rera ? 'Registered' : 'No'}
                  </span>

                  <span style={{ 
                    fontSize: '0.7rem', 
                    padding: '0.2rem 0.5rem', 
                    borderRadius: '4px', 
                    backgroundColor: selectedPlot.features.gated ? 'rgba(34, 197, 94, 0.1)' : '#f1f5f9',
                    color: selectedPlot.features.gated ? 'var(--secondary-green)' : '#64748b',
                    fontWeight: 700
                  }}>
                    Gated Community: {selectedPlot.features.gated ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>

              {/* Inspector action buttons */}
              <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
                <button 
                  onClick={() => handleReject(selectedPlot.id)}
                  style={{ 
                    flex: 1, 
                    padding: '0.75rem', 
                    borderRadius: '6px', 
                    backgroundColor: '#fff', 
                    color: '#ef4444', 
                    border: '1px solid #ef4444', 
                    cursor: 'pointer',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    fontSize: '0.8rem'
                  }}
                >
                  <Trash2 style={{ width: '16px', height: '16px' }} />
                  <span>Reject</span>
                </button>
                
                <button 
                  onClick={() => handleApprove(selectedPlot.id)}
                  style={{ 
                    flex: 1.5, 
                    padding: '0.75rem', 
                    borderRadius: '6px', 
                    backgroundColor: 'var(--primary-green)', 
                    color: '#fff', 
                    border: 'none', 
                    cursor: 'pointer',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    fontSize: '0.8rem'
                  }}
                >
                  <Check style={{ width: '16px', height: '16px', strokeWidth: 3 }} />
                  <span>Approve & Publish</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
