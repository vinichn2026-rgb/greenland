import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  ChevronRight, User, Phone, MapPin, Award, Compass, 
  Layers, CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft 
} from 'lucide-react';

export const Mediator = () => {
  const { setActivePage, fetchPlots } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Form States
  const [agentData, setAgentData] = useState({
    agentName: '',
    agentPhone: '',
    agentLocation: '',
  });

  const [locationData, setLocationData] = useState({
    villageName: '',
    panchayatName: '',
    districtName: 'Ramanathapuram',
    locationAddress: '', // This will map to "location"
  });

  const [plotData, setPlotData] = useState({
    title: '',
    price: '',
    area: '',
    road: '30ft Road',
    facing: 'East Facing',
    landType: 'Residential Plot',
    tag: 'DTCP Approved',
    features: {
      dtcp: true,
      rera: false,
      corner: false,
      gated: false,
      road30: true
    }
  });

  const handleAgentChange = (e) => {
    const { name, value } = e.target;
    setAgentData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocationData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlotChange = (e) => {
    const { name, value } = e.target;
    setPlotData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureToggle = (name) => {
    setPlotData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [name]: !prev.features[name]
      }
    }));
  };

  // Step validation
  const validateStep = () => {
    setError('');
    if (step === 1) {
      if (!agentData.agentName.trim()) {
        setError('Agent Name is required');
        return false;
      }
      if (!agentData.agentPhone.trim() || !/^\d{10}$/.test(agentData.agentPhone.replace(/[-\s()]/g, ''))) {
        setError('Please enter a valid 10-digit mobile number');
        return false;
      }
      if (!agentData.agentLocation.trim()) {
        setError('Agent Location / Office City is required');
        return false;
      }
    } else if (step === 2) {
      if (!locationData.villageName.trim()) {
        setError('Village Name is required');
        return false;
      }
      if (!locationData.panchayatName.trim()) {
        setError('Panchayat Name is required');
        return false;
      }
      if (!locationData.locationAddress.trim()) {
        setError('Location Address is required');
        return false;
      }
    } else if (step === 3) {
      if (!plotData.title.trim()) {
        setError('Plot Title / Description is required');
        return false;
      }
      if (!plotData.price.trim()) {
        setError('Price is required');
        return false;
      }
      if (!plotData.area.trim()) {
        setError('Land Area is required');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setSubmitting(true);
    setError('');

    // Construct location text (combine village, panchayat, district)
    const combinedLocation = `${locationData.villageName}, ${locationData.panchayatName}, ${locationData.districtName}`;

    // Convert price to ₹ format if not already
    let displayPrice = plotData.price.trim();
    if (!displayPrice.startsWith('₹')) {
      displayPrice = `₹ ${parseInt(displayPrice).toLocaleString('en-IN')}`;
    }

    const payload = {
      title: plotData.title,
      location: combinedLocation,
      price: displayPrice,
      priceVal: parseInt(plotData.price.replace(/[^\d]/g, '')) || 0,
      area: plotData.area,
      areaVal: parseInt(plotData.area) || 0,
      road: plotData.road,
      facing: plotData.facing,
      tag: plotData.tag,
      tagClass: plotData.tag.toLowerCase().includes('approved') 
        ? 'approved' 
        : plotData.tag.toLowerCase().includes('corner') 
          ? 'corner' 
          : 'premium',
      landType: plotData.landType,
      features: plotData.features,
      status: 'pending', // IMPORTANT: Set to pending for Admin approval
      agentName: agentData.agentName,
      agentPhone: agentData.agentPhone,
      agentLocation: agentData.agentLocation,
      villageName: locationData.villageName,
      panchayatName: locationData.panchayatName,
      districtName: locationData.districtName,
      images: [] // default fallback image will be handled by backend based on location
    };

    try {
      const res = await fetch('/api/plots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Submission failed');
      }

      setSuccess(true);
      await fetchPlots(); // Refresh public lists
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page-container fade-in" style={{ paddingBottom: '5rem' }}>
      
      {/* Breadcrumbs Header */}
      <header className="buyland-header" style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
        <div className="breadcrumb-nav" style={{ marginBottom: '0.75rem' }}>
          <span className="breadcrumb-link" onClick={() => setActivePage('home')}>Home</span>
          <ChevronRight className="breadcrumb-arrow" />
          <span className="breadcrumb-link active">Mediator Center</span>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="contact-main-grid" style={{ gridTemplateColumns: success ? '1fr' : '380px 1fr' }}>
        
        {/* Left Side: Information Card (Hidden on success) */}
        {!success && (
          <div className="contact-left-col">
            <div className="contact-title-section" style={{ marginBottom: '1.5rem' }}>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', lineHeight: '1.2' }}>
                Agent Portal
              </h1>
              <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Register and post your verified plots directly to Thennadu Nilam. Ensure faster buyers and secure documentation.
              </p>
            </div>

            <div className="contact-info-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>Verification Process</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div className="channel-icon-box" style={{ width: '32px', height: '32px', fontSize: '0.8rem', fontWeight: 700 }}>1</div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.1rem' }}>Submit Details</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-grey)', lineHeight: '1.4' }}>Fill out agent profile and land specs accurately.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div className="channel-icon-box" style={{ width: '32px', height: '32px', fontSize: '0.8rem', fontWeight: 700 }}>2</div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.1rem' }}>Admin Vetting</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-grey)', lineHeight: '1.4' }}>Our legal team reviews approvals (DTCP/RERA) and parent documents.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div className="channel-icon-box" style={{ width: '32px', height: '32px', fontSize: '0.8rem', fontWeight: 700 }}>3</div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.1rem' }}>Live Listing</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-grey)', lineHeight: '1.4' }}>Vetted property is immediately listed on the Buy Land catalog.</p>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-green)' }}>
                <ShieldCheck style={{ width: '20px', height: '20px' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>100% Secure & Vetted Portal</span>
              </div>
            </div>
          </div>
        )}

        {/* Right Side: Step-by-Step MultiStep Form */}
        <div className="contact-right-col">
          {success ? (
            <div className="glass-panel" style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '4rem 2rem', textAlign: 'center', boxShadow: 'var(--shadow-lg)', maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--secondary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                <CheckCircle2 style={{ width: '36px', height: '36px' }} />
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Listing Submitted!</h2>
              <p style={{ color: 'var(--text-grey)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                Thank you, agent **{agentData.agentName}**. Your listing for the plot in **{locationData.villageName}** has been recorded under pending verification. Our admins will verify the documents and publish it shortly.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button 
                  className="search-submit-btn" 
                  onClick={() => {
                    setSuccess(false);
                    setStep(1);
                    setAgentData({ agentName: '', agentPhone: '', agentLocation: '' });
                    setLocationData({ villageName: '', panchayatName: '', districtName: 'Ramanathapuram', locationAddress: '' });
                    setPlotData({ title: '', price: '', area: '', road: '30ft Road', facing: 'East Facing', landType: 'Residential Plot', tag: 'DTCP Approved', features: { dtcp: true, rera: false, corner: false, gated: false, road30: true } });
                  }}
                  style={{ padding: '0.75rem 1.5rem' }}
                >
                  Post Another Plot
                </button>
                <button 
                  className="filter-reset-btn" 
                  onClick={() => setActivePage('buyland')}
                  style={{ padding: '0.75rem 1.5rem' }}
                >
                  View Listings
                </button>
              </div>
            </div>
          ) : (
            <div className="contact-form-card" style={{ borderRadius: '16px', padding: '2.5rem' }}>
              
              {/* Form Progress Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '15px', left: '10%', right: '10%', height: '2px', backgroundColor: '#e2e8f0', zIndex: 1 }}>
                  <div style={{ width: `${((step - 1) / 2) * 100}%`, height: '100%', backgroundColor: 'var(--secondary-green)', transition: 'width 0.3s ease' }}></div>
                </div>
                
                {/* Step indicators */}
                {[1, 2, 3].map((num) => (
                  <div 
                    key={num} 
                    style={{ 
                      zIndex: 2, 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '50%', 
                      backgroundColor: step >= num ? 'var(--primary-green)' : '#e2e8f0', 
                      color: step >= num ? '#fff' : '#64748b', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontWeight: 700, 
                      fontSize: '0.85rem',
                      boxShadow: step === num ? '0 0 0 4px rgba(15, 76, 35, 0.15)' : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {step > num ? <CheckCircle2 style={{ width: '16px', height: '16px' }} /> : num}
                  </div>
                ))}
              </div>

              {/* Step Title Header */}
              <div style={{ marginBottom: '1.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary-green)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Step {step} of 3
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>
                  {step === 1 && "Agent Profile Verification"}
                  {step === 2 && "Land Location Details"}
                  {step === 3 && "Land Specifications & Features"}
                </h3>
              </div>

              {error && (
                <div style={{ backgroundColor: '#fef2f2', color: '#ef4444', border: '1px solid #fee2e2', padding: '0.85rem 1.25rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                  ⚠️ {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* STEP 1: Agent details */}
                {step === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <User style={{ width: '14px', height: '14px' }} /> Agent Name
                      </label>
                      <input 
                        type="text" 
                        name="agentName" 
                        value={agentData.agentName} 
                        onChange={handleAgentChange} 
                        placeholder="Enter your full name" 
                        className="contact-input"
                      />
                    </div>

                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Phone style={{ width: '14px', height: '14px' }} /> Mobile Number
                      </label>
                      <input 
                        type="text" 
                        name="agentPhone" 
                        value={agentData.agentPhone} 
                        onChange={handleAgentChange} 
                        placeholder="Enter 10-digit mobile number" 
                        className="contact-input"
                      />
                    </div>

                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <MapPin style={{ width: '14px', height: '14px' }} /> Agent Location / City
                      </label>
                      <input 
                        type="text" 
                        name="agentLocation" 
                        value={agentData.agentLocation} 
                        onChange={handleAgentChange} 
                        placeholder="e.g. Ramanathapuram, Keelakarai" 
                        className="contact-input"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 2: Location details */}
                {step === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="contact-form-row-2col">
                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Village Name</label>
                        <input 
                          type="text" 
                          name="villageName" 
                          value={locationData.villageName} 
                          onChange={handleLocationChange} 
                          placeholder="e.g. Pattinamkathan" 
                          className="contact-input"
                        />
                      </div>

                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Panchayat Name</label>
                        <input 
                          type="text" 
                          name="panchayatName" 
                          value={locationData.panchayatName} 
                          onChange={handleLocationChange} 
                          placeholder="e.g. Achundanvayal" 
                          className="contact-input"
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>District</label>
                      <input 
                        type="text" 
                        name="districtName" 
                        value={locationData.districtName} 
                        onChange={handleLocationChange} 
                        disabled
                        className="contact-input"
                        style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed' }}
                      />
                    </div>

                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Plot Location Address Details</label>
                      <input 
                        type="text" 
                        name="locationAddress" 
                        value={locationData.locationAddress} 
                        onChange={handleLocationChange} 
                        placeholder="e.g. 5th Street, Pattinamkathan North" 
                        className="contact-input"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 3: Plot details */}
                {step === 3 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Plot Title</label>
                      <input 
                        type="text" 
                        name="title" 
                        value={plotData.title} 
                        onChange={handlePlotChange} 
                        placeholder="e.g. 1200 Sq.ft East Facing Plot" 
                        className="contact-input"
                      />
                    </div>

                    <div className="contact-form-row-2col">
                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Price (INR, e.g. 1500000)</label>
                        <input 
                          type="number" 
                          name="price" 
                          value={plotData.price} 
                          onChange={handlePlotChange} 
                          placeholder="e.g. 1500000" 
                          className="contact-input"
                        />
                      </div>

                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Area (Sq.ft)</label>
                        <input 
                          type="number" 
                          name="area" 
                          value={plotData.area} 
                          onChange={handlePlotChange} 
                          placeholder="e.g. 1200" 
                          className="contact-input"
                        />
                      </div>
                    </div>

                    <div className="contact-form-row-2col">
                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Land Type</label>
                        <select 
                          name="landType" 
                          value={plotData.landType} 
                          onChange={handlePlotChange} 
                          className="contact-input"
                          style={{ height: '42px', padding: '0.5rem 1rem' }}
                        >
                          <option value="Residential Plot">Residential Plot</option>
                          <option value="Agricultural Land">Agricultural Land</option>
                          <option value="Farm Land">Farm Land</option>
                        </select>
                      </div>

                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Facing Direction</label>
                        <select 
                          name="facing" 
                          value={plotData.facing} 
                          onChange={handlePlotChange} 
                          className="contact-input"
                          style={{ height: '42px', padding: '0.5rem 1rem' }}
                        >
                          <option value="East Facing">East Facing</option>
                          <option value="North Facing">North Facing</option>
                          <option value="West Facing">West Facing</option>
                          <option value="South Facing">South Facing</option>
                        </select>
                      </div>
                    </div>

                    {/* Features checklist */}
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>Approvals & Features</label>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.25rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-grey)', cursor: 'pointer' }}>
                          <input 
                            type="checkbox" 
                            checked={plotData.features.dtcp} 
                            onChange={() => handleFeatureToggle('dtcp')}
                          />
                          DTCP Approved
                        </label>

                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-grey)', cursor: 'pointer' }}>
                          <input 
                            type="checkbox" 
                            checked={plotData.features.rera} 
                            onChange={() => handleFeatureToggle('rera')}
                          />
                          RERA Registered
                        </label>

                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-grey)', cursor: 'pointer' }}>
                          <input 
                            type="checkbox" 
                            checked={plotData.features.corner} 
                            onChange={() => handleFeatureToggle('corner')}
                          />
                          Corner Plot
                        </label>

                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-grey)', cursor: 'pointer' }}>
                          <input 
                            type="checkbox" 
                            checked={plotData.features.gated} 
                            onChange={() => handleFeatureToggle('gated')}
                          />
                          Gated Community
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Control Actions Panel */}
                <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1rem' }}>
                  {step > 1 && (
                    <button 
                      type="button" 
                      onClick={prevStep} 
                      className="filter-reset-btn"
                      style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, justifyContent: 'center' }}
                    >
                      <ArrowLeft style={{ width: '16px', height: '16px' }} />
                      <span>Back</span>
                    </button>
                  )}

                  {step < 3 ? (
                    <button 
                      type="button" 
                      onClick={nextStep} 
                      className="contact-submit-btn"
                      style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, justifyContent: 'center' }}
                    >
                      <span>Continue</span>
                      <ArrowRight style={{ width: '16px', height: '16px' }} />
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      disabled={submitting}
                      className="contact-submit-btn"
                      style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, justifyContent: 'center', opacity: submitting ? 0.7 : 1 }}
                    >
                      <span>{submitting ? "Submitting..." : "Submit Listing"}</span>
                      <CheckCircle2 style={{ width: '16px', height: '16px' }} />
                    </button>
                  )}
                </div>

              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Mediator;
