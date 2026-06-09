import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ChevronRight, UploadCloud, CheckCircle2 } from 'lucide-react';

export const SellLand = () => {
  const { 
    setActivePage, 
    addPlot 
  } = useContext(AppContext);

  // Form states
  const [landType, setLandType] = useState('');
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('');
  const [road, setRoad] = useState('');
  const [price, setPrice] = useState('');
  const [facing, setFacing] = useState('');
  const [dimension, setDimension] = useState('');
  
  // User details
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);

  // Error/Success validation feedback
  const [error, setError] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(prev => [...prev, ...files.map(f => f.name)]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!landType || !location.trim() || !area.trim() || !road || !price.trim() || !facing || !name.trim() || !mobile.trim()) {
      setError('Please fill in all required fields marked with *.');
      return;
    }

    if (!agree) {
      setError('You must agree to the Terms & Conditions before listing.');
      return;
    }

    // Convert price string to standard ₹ format
    let formattedPrice = price.trim();
    if (!formattedPrice.startsWith('₹')) {
      formattedPrice = '₹ ' + formattedPrice;
    }

    const newPlot = {
      title: `${area} Sq.ft Plot`,
      location: location.trim(),
      price: formattedPrice,
      area: area.trim(),
      road: road,
      facing: facing,
      tag: 'New Listing',
      image: '/images/plot1.png',
      landType: landType,
      features: {
        dtcp: true,
        rera: false,
        corner: facing.toLowerCase().includes('corner') || landType.toLowerCase().includes('corner'),
        gated: false,
        road30: road.includes('30ft')
      }
    };

    addPlot(newPlot);
    alert('Your property has been successfully listed!');
    setActivePage('buyland'); // Redirect to search results
  };

  return (
    <div className="buyland-page-wrapper fade-in" style={{ paddingBottom: '4rem' }}>
      
      {/* Breadcrumb Header */}
      <header className="buyland-header" style={{ marginBottom: '2rem' }}>
        <div className="breadcrumb-nav" style={{ marginBottom: '0.75rem' }}>
          <span className="breadcrumb-link" onClick={() => setActivePage('home')}>Home</span>
          <ChevronRight className="breadcrumb-arrow" />
          <span className="breadcrumb-link" onClick={() => setActivePage('sellland')}>Sell Land</span>
          <ChevronRight className="breadcrumb-arrow" />
          <span className="breadcrumb-link active">List Your Land</span>
        </div>
        
        <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
          List Your Land for Sale
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-grey)' }}>
          Get the best price for your property. Quick & easy listing process.
        </p>
      </header>

      {/* Validation Feedback */}
      {error && (
        <div className="modal-error-message" style={{ maxWidth: '1000px', margin: '0 auto 1.5rem auto' }}>
          {error}
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleSubmit} style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Card 1: Property Details */}
        <div className="glass-panel" style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
            Property Details
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem' }}>
            {/* Left Column: Form Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              
              {/* Land Type */}
              <div className="filter-form-field">
                <label>Land Type *</label>
                <select 
                  className="filter-select-input"
                  value={landType}
                  onChange={(e) => setLandType(e.target.value)}
                >
                  <option value="">Select Land Type</option>
                  <option value="Residential Plot">Residential Plot</option>
                  <option value="Agricultural Land">Agricultural Land</option>
                  <option value="Farm Land">Farm Land</option>
                </select>
              </div>

              {/* Location */}
              <div className="filter-form-field">
                <label>Location *</label>
                <input 
                  type="text" 
                  placeholder="Enter Location"
                  className="filter-text-input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* Road Width */}
              <div className="filter-form-field">
                <label>Road Width *</label>
                <select 
                  className="filter-select-input"
                  value={road}
                  onChange={(e) => setRoad(e.target.value)}
                >
                  <option value="">Select Road Width</option>
                  <option value="24ft Road">24ft Road</option>
                  <option value="30ft Road">30ft Road</option>
                  <option value="40ft Road">40ft Road</option>
                  <option value="50ft Road">50ft Road</option>
                </select>
              </div>

              {/* Land Area */}
              <div className="filter-form-field">
                <label>Land Area (sq.ft) *</label>
                <input 
                  type="number" 
                  placeholder="Enter Area"
                  className="filter-text-input"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
              </div>

              {/* Facing */}
              <div className="filter-form-field">
                <label>Facing *</label>
                <select 
                  className="filter-select-input"
                  value={facing}
                  onChange={(e) => setFacing(e.target.value)}
                >
                  <option value="">Select Facing</option>
                  <option value="East Facing">East Facing</option>
                  <option value="North Facing">North Facing</option>
                  <option value="West Facing">West Facing</option>
                  <option value="South Facing">South Facing</option>
                </select>
              </div>

              {/* Expected Price */}
              <div className="filter-form-field">
                <label>Expected Price *</label>
                <input 
                  type="text" 
                  placeholder="Enter Price"
                  className="filter-text-input"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/* Dimensions */}
              <div className="filter-form-field" style={{ gridColumn: 'span 2' }}>
                <label>Dimension</label>
                <input 
                  type="text" 
                  placeholder="Enter Dimension (L x B)"
                  className="filter-text-input"
                  value={dimension}
                  onChange={(e) => setDimension(e.target.value)}
                />
              </div>
            </div>

            {/* Right Column: Upload Files Dragbox */}
            <div className="filter-form-field">
              <label>Upload Photos</label>
              <div className="upload-drag-box">
                <UploadCloud className="upload-cloud-icon" />
                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.25rem' }}>
                  Drag & Drop images here
                </p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginBottom: '0.75rem' }}>or</span>
                
                <label className="view-details-btn" style={{ padding: '0.5rem 1rem', cursor: 'pointer', border: '1px solid var(--primary-green)', color: 'var(--primary-green)', fontSize: '0.8rem', fontWeight: 700 }}>
                  Choose Files
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*"
                    onChange={handleFileUpload} 
                    style={{ display: 'none' }} 
                  />
                </label>
                
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                  JPG, PNG up to 10MB, Max 10 images
                </span>

                {uploadedFiles.length > 0 && (
                  <div style={{ marginTop: '1rem', width: '100%', padding: '0.5rem', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
                    <CheckCircle2 style={{ width: '14px', height: '14px', color: 'var(--secondary-green)' }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-grey)' }}>
                      {uploadedFiles.length} photo(s) selected
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Contact Details */}
        <div className="glass-panel" style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
            Your Details
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
            
            {/* Name */}
            <div className="filter-form-field">
              <label>Name *</label>
              <input 
                type="text" 
                placeholder="Enter Your Name"
                className="filter-text-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Mobile Number */}
            <div className="filter-form-field">
              <label>Mobile Number *</label>
              <input 
                type="tel" 
                placeholder="Enter Mobile Number"
                className="filter-text-input"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            {/* Email Address */}
            <div className="filter-form-field">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="Enter Email Address"
                className="filter-text-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Terms checkbox */}
          <label className="checkbox-item-label" style={{ marginBottom: '0.5rem' }}>
            <input 
              type="checkbox" 
              checked={agree}
              onChange={() => setAgree(!agree)}
            />
            <span>I agree to the <button type="button" onClick={() => setActivePage('terms')} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--primary-green)', textDecoration: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>Terms & Conditions</button></span>
          </label>
        </div>

        {/* Large submit button */}
        <button type="submit" className="search-submit-btn" style={{ padding: '1rem', fontSize: '1rem', width: '100%', borderRadius: '6px' }}>
          Submit Property
        </button>

      </form>
    </div>
  );
};

export default SellLand;
