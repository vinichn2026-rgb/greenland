import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Heart, MapPin, Award, Compass, ChevronRight, Phone, MessageCircle, 
  ShieldCheck, Droplet, Zap, Share2, Eye, Layout, FileText
} from 'lucide-react';

const THUMBNAILS = [
  '/images/plot1.png',
  '/images/plot2.png',
  '/images/plot3.png',
  '/images/plot4.png',
  '/images/plot1.png'
];

export const LandDetails = () => {
  const {
    activePage,
    setActivePage,
    savedPlots,
    toggleSavePlot,
    plotsList,
    selectedPlotId
  } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState('overview');

  // Find the selected property
  const activePlot = useMemo(() => {
    return plotsList.find(p => p.id === selectedPlotId) || plotsList[0];
  }, [plotsList, selectedPlotId]);

  const isSaved = savedPlots.includes(activePlot.id);

  // Generate dynamic dimensions based on square feet area
  const dimensions = useMemo(() => {
    const width = 30;
    const length = Math.round(activePlot.areaVal / width);
    return `${width}x${length} Sq.ft`;
  }, [activePlot]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Listing link copied to clipboard!");
  };

  const handleGetContact = () => {
    alert(`Owner Contact Information:\nName: Suresh Kumar\nPhone: +91 99426 20101\nPlease mention Property ID: GLP12345${activePlot.id} when calling.`);
  };

  return (
    <div className="buyland-page-wrapper fade-in" style={{ paddingBottom: '3rem' }}>
      
      {/* Page Breadcrumb Header */}
      <header className="buyland-header" style={{ marginBottom: '1.5rem' }}>
        <div className="breadcrumb-nav" style={{ marginBottom: '0.75rem' }}>
          <span className="breadcrumb-link" onClick={() => setActivePage('home')}>Home</span>
          <ChevronRight className="breadcrumb-arrow" />
          <span className="breadcrumb-link" onClick={() => setActivePage('buyland')}>Buy Land</span>
          <ChevronRight className="breadcrumb-arrow" />
          <span className="breadcrumb-link active">Land Details</span>
        </div>
        
        <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
          {activePlot.areaVal} Sq.ft Plot For Sale
        </h1>
        <div className="plot-location">
          <MapPin className="plot-loc-icon" />
          <span style={{ fontWeight: 600 }}>{activePlot.location}</span>
        </div>
      </header>

      {/* Main Content Grid: 70% left, 30% right */}
      <div className="buyland-layout-grid" style={{ gridTemplateColumns: '1.4fr 0.6fr' }}>
        
        {/* Left Column: Visuals & Text Overview */}
        <div className="content-left" style={{ gap: '1.5rem' }}>
          
          {/* Hero Image Block */}
          <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', borderRadius: '12px', border: '1px solid #e2e8f0', position: 'relative' }}>
            <div style={{ height: '380px', width: '100%', position: 'relative' }}>
              <img src={activePlot.image} alt={activePlot.title} className="plot-img" style={{ height: '100%' }} />
              <span className={`plot-tag-badge ${activePlot.tagClass}`} style={{ top: '1rem', left: '1rem' }}>
                {activePlot.tag}
              </span>
              
              {/* Quick Actions (Save, Share) */}
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button 
                  className={`plot-save-btn ${isSaved ? 'saved' : ''}`}
                  onClick={() => toggleSavePlot(activePlot.id)}
                  title={isSaved ? "Remove from saved" : "Save plot"}
                  style={{ position: 'static', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                >
                  <Heart 
                    style={{ 
                      width: '16px', 
                      height: '16px', 
                      fill: isSaved ? '#ef4444' : 'none', 
                      color: isSaved ? '#ef4444' : 'currentColor' 
                    }} 
                  />
                </button>
                <button 
                  className="plot-save-btn"
                  onClick={handleShare}
                  title="Share listing"
                  style={{ position: 'static', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                >
                  <Share2 style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem', padding: '1rem', borderTop: '1px solid #e2e8f0', backgroundColor: '#fff' }}>
              {THUMBNAILS.map((thumb, index) => (
                <div 
                  key={index} 
                  style={{ 
                    height: '75px', 
                    borderRadius: '6px', 
                    overflow: 'hidden', 
                    border: index === 0 ? '2px solid var(--primary-green)' : '1px solid #e2e8f0',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  <img src={thumb} alt="Thumbnail view" className="plot-img" style={{ height: '100%' }} />
                  {index === 4 && (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.9rem', fontWeight: 700 }}>
                      +8
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Details Overview Tabs */}
          <div className="glass-panel" style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '12px' }}>
            <div className="widget-tabs" style={{ borderBottom: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
              <button 
                className={`widget-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                style={{ background: 'transparent', borderBottom: activeTab === 'overview' ? '3px solid var(--primary-green)' : 'none', color: activeTab === 'overview' ? 'var(--primary-green)' : 'var(--text-grey)', flex: 'none', padding: '0.75rem 1.5rem' }}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`widget-tab-btn ${activeTab === 'amenities' ? 'active' : ''}`}
                style={{ background: 'transparent', borderBottom: activeTab === 'amenities' ? '3px solid var(--primary-green)' : 'none', color: activeTab === 'amenities' ? 'var(--primary-green)' : 'var(--text-grey)', flex: 'none', padding: '0.75rem 1.5rem' }}
                onClick={() => setActiveTab('amenities')}
              >
                Amenities
              </button>
              <button 
                className={`widget-tab-btn ${activeTab === 'location' ? 'active' : ''}`}
                style={{ background: 'transparent', borderBottom: activeTab === 'location' ? '3px solid var(--primary-green)' : 'none', color: activeTab === 'location' ? 'var(--primary-green)' : 'var(--text-grey)', flex: 'none', padding: '0.75rem 1.5rem' }}
                onClick={() => setActiveTab('location')}
              >
                Location
              </button>
              <button 
                className={`widget-tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
                style={{ background: 'transparent', borderBottom: activeTab === 'documents' ? '3px solid var(--primary-green)' : 'none', color: activeTab === 'documents' ? 'var(--primary-green)' : 'var(--text-grey)', flex: 'none', padding: '0.75rem 1.5rem' }}
                onClick={() => setActiveTab('documents')}
              >
                Documents
              </button>
            </div>

            {/* Tab content rendering */}
            <div className="tab-contents-panel" style={{ fontSize: '0.9rem', color: 'var(--text-grey)', lineHeight: '1.6' }}>
              {activeTab === 'overview' && (
                <div>
                  <p style={{ marginBottom: '1.5rem' }}>
                    {activePlot.tag === 'DTCP Approved' ? 'DTCP' : activePlot.tag} approved plot for sale in {activePlot.location}. 
                    Prime location with {activePlot.road} access. Ready for construction. Good connectivity to GST Road and nearby industries.
                  </p>
                  
                  {/* Amenities Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                      <ShieldCheck style={{ width: '18px', height: '18px', color: 'var(--secondary-green)' }} />
                      <span>{activePlot.tag}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                      <MapPin style={{ width: '18px', height: '18px', color: 'var(--secondary-green)' }} />
                      <span>{activePlot.road}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                      <Compass style={{ width: '18px', height: '18px', color: 'var(--secondary-green)' }} />
                      <span>{activePlot.facing}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                      <MapPin style={{ width: '18px', height: '18px', color: 'var(--secondary-green)' }} />
                      <span>Black Top Road</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                      <Droplet style={{ width: '18px', height: '18px', color: 'var(--secondary-green)' }} />
                      <span>Water Facility</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                      <Zap style={{ width: '18px', height: '18px', color: 'var(--secondary-green)' }} />
                      <span>EB Connection</span>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'amenities' && (
                <div>
                  <p style={{ marginBottom: '1rem' }}>The property features premium layouts with these standard facilities:</p>
                  <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li>Fully Gated Layout with 24/7 Security guards</li>
                    <li>Planted street-side green avenues and ornamental trees</li>
                    <li>Ready-to-use water connection tap at each plot border</li>
                    <li>Underground drainage systems and storm water gutters</li>
                  </ul>
                </div>
              )}

              {activeTab === 'location' && (
                <div>
                  <p>Located at <strong>{activePlot.location}</strong>. High potential investment corridor. Close proximity to local industrial parks, highways, hospitals, and educational institutions.</p>
                </div>
              )}

              {activeTab === 'documents' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FileText style={{ color: 'var(--primary-green)' }} />
                      <span style={{ fontWeight: 600 }}>Layout Blueprint (PDF)</span>
                    </div>
                    <button className="view-details-btn" onClick={() => alert("Downloading blueprint...")}>Download</button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FileText style={{ color: 'var(--primary-green)' }} />
                      <span style={{ fontWeight: 600 }}>DTCP Approval Certificate</span>
                    </div>
                    <button className="view-details-btn" onClick={() => alert("Downloading certificate...")}>Download</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Property Details Panel */}
        <div className="content-right" style={{ gap: '1.5rem' }}>
          
          {/* Main Info Card */}
          <div className="glass-panel" style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', padding: '1.75rem', borderRadius: '12px' }}>
            <span className="plot-price" style={{ fontSize: '1.8rem', display: 'block', marginBottom: '1.25rem' }}>
              {activePlot.price}
            </span>
            
            <h3 style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 800, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              Property Details
            </h3>

            {/* Property Details Grid list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-grey)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Property ID</span>
                <strong style={{ color: '#0f172a' }}>GLP12345{activePlot.id}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Property Type</span>
                <strong style={{ color: '#0f172a' }}>{activePlot.landType || 'Residential Plot'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Land Area</span>
                <strong style={{ color: '#0f172a' }}>{activePlot.areaVal} Sq.ft</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Facing</span>
                <strong style={{ color: '#0f172a' }}>{activePlot.facing.replace(' Facing', '')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Road Width</span>
                <strong style={{ color: '#0f172a' }}>{activePlot.road}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Dimensions</span>
                <strong style={{ color: '#0f172a' }}>{dimensions}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Approval</span>
                <strong style={{ color: '#0f172a' }}>{activePlot.tag}</strong>
              </div>
            </div>

            {/* Action CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
                className="search-submit-btn" 
                style={{ padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                onClick={handleGetContact}
              >
                <Phone style={{ width: '16px', height: '16px' }} />
                <span>Get Owner Contact</span>
              </button>
              <button 
                className="filter-reset-btn" 
                style={{ padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' }}
                onClick={() => window.open(`https://wa.me/919942620101?text=I%20am%20interested%20in%20Property%20ID%20GLP12345${activePlot.id}`, '_blank')}
              >
                <MessageCircle style={{ width: '16px', height: '16px', color: 'var(--primary-green)' }} />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Location Map Placeholder */}
          <div className="glass-panel" style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', padding: '1.25rem', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.75rem' }}>
              Location Map
            </h3>
            <div style={{ height: '160px', width: '100%', borderRadius: '6px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
              <img src="/images/mock_map.png" alt="Map Location" className="plot-img" style={{ height: '100%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandDetails;
