import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { X, Plus, Sparkles } from 'lucide-react';

export const PostPropertyModal = () => {
  const { 
    postPropertyModalOpen, 
    setPostPropertyModalOpen, 
    addPlot,
    setActivePage 
  } = useContext(AppContext);

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    area: '',
    road: '30ft Road',
    facing: 'East Facing',
    tag: 'DTCP Approved'
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [error, setError] = useState('');

  if (!postPropertyModalOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Validate files limit
    if (uploadedImages.length + files.length > 5) {
      setError('You can upload a maximum of 5 images.');
      return;
    }
    
    // Check if files are indeed images
    const nonImages = files.filter(f => !f.type.startsWith('image/'));
    if (nonImages.length > 0) {
      setError('Only image files are allowed.');
      return;
    }
    
    setUploadedImages(prev => [...prev, ...files]);
    setError('');
  };

  const removeImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setError('');
  };

  const handleClose = () => {
    setPostPropertyModalOpen(false);
    setFormData({
      title: '',
      location: '',
      price: '',
      area: '',
      road: '30ft Road',
      facing: 'East Facing',
      tag: 'DTCP Approved'
    });
    setUploadedImages([]);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, location, price, area } = formData;

    if (!title.trim() || !location.trim() || !price.trim() || !area.trim()) {
      setError('Please fill in all required fields (Title, Location, Price, Area).');
      return;
    }

    // Format price if it doesn't contain Rupee symbol
    let formattedPrice = price.trim();
    if (!formattedPrice.startsWith('₹')) {
      formattedPrice = '₹ ' + formattedPrice;
    }

    // Create URL pointers for uploaded local files to render them directly
    const firstImageUrl = uploadedImages.length > 0 
      ? URL.createObjectURL(uploadedImages[0]) 
      : '/images/plot1.png';

    const allImageUrls = uploadedImages.length > 0 
      ? uploadedImages.map(file => URL.createObjectURL(file))
      : ['/images/plot1.png'];

    const newPlot = {
      title: title.trim(),
      location: location.trim(),
      price: formattedPrice,
      area: area.trim(),
      road: formData.road,
      facing: formData.facing,
      tag: formData.tag,
      image: firstImageUrl,
      images: allImageUrls,
      features: {
        dtcp: formData.tag === 'DTCP Approved',
        rera: formData.tag === 'Premium Location',
        corner: formData.tag === 'Corner Plot',
        gated: formData.tag === 'Premium Location',
        road30: formData.road === '30ft Road'
      }
    };

    addPlot(newPlot);
    handleClose();
    
    // Redirect user to the listings search page so they see their new post
    setActivePage('buyland');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container fade-in">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles style={{ width: '18px', height: '18px', color: '#22c55e' }} />
            <h3>Post Your Property</h3>
          </div>
          <button className="modal-close-btn" onClick={handleClose}>
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && <div className="modal-error-message">{error}</div>}

            <div className="modal-form-grid">
              {/* Title */}
              <div className="filter-form-field" style={{ gridColumn: 'span 2' }}>
                <label>Property Title *</label>
                <input 
                  type="text" 
                  placeholder="e.g. 1200 Sq.ft Plot"
                  className="filter-text-input"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>

              {/* Location */}
              <div className="filter-form-field">
                <label>Location (City, Area) *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Oragadam, Chennai"
                  className="filter-text-input"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>

              {/* Price */}
              <div className="filter-form-field">
                <label>Price (₹) *</label>
                <input 
                  type="text" 
                  placeholder="e.g. 18,00,000"
                  className="filter-text-input"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                />
              </div>

              {/* Area */}
              <div className="filter-form-field">
                <label>Land Area (sq.ft) *</label>
                <input 
                  type="number" 
                  placeholder="e.g. 1200"
                  className="filter-text-input"
                  value={formData.area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                />
              </div>

              {/* Tag / Badge type */}
              <div className="filter-form-field">
                <label>Label / Badge</label>
                <select 
                  className="filter-select-input"
                  value={formData.tag}
                  onChange={(e) => handleInputChange('tag', e.target.value)}
                >
                  <option value="DTCP Approved">DTCP Approved</option>
                  <option value="Corner Plot">Corner Plot</option>
                  <option value="Premium Location">Premium Location</option>
                  <option value="Hot Deal">Hot Deal</option>
                </select>
              </div>

              {/* Road Width */}
              <div className="filter-form-field">
                <label>Road Width</label>
                <select 
                  className="filter-select-input"
                  value={formData.road}
                  onChange={(e) => handleInputChange('road', e.target.value)}
                >
                  <option value="30ft Road">30ft Road</option>
                  <option value="24ft Road">24ft Road</option>
                  <option value="40ft Road">40ft Road</option>
                </select>
              </div>

              {/* Facing */}
              <div className="filter-form-field">
                <label>Facing Direction</label>
                <select 
                  className="filter-select-input"
                  value={formData.facing}
                  onChange={(e) => handleInputChange('facing', e.target.value)}
                >
                  <option value="East Facing">East Facing</option>
                  <option value="North Facing">North Facing</option>
                  <option value="West Facing">West Facing</option>
                  <option value="South Facing">South Facing</option>
                </select>
              </div>

              {/* Upload Photos Section */}
              <div className="modal-image-upload-section">
                <label>Upload Photos (Maximum 5 images)</label>
                <div className="modal-image-preview-grid">
                  
                  {/* Uploaded Thumbnail items */}
                  {uploadedImages.map((file, idx) => {
                    const previewUrl = URL.createObjectURL(file);
                    return (
                      <div key={idx} className="modal-image-preview-item">
                        <img 
                          src={previewUrl} 
                          alt={`preview-${idx}`} 
                          className="modal-image-preview-img" 
                        />
                        <button 
                          type="button" 
                          className="modal-image-remove-btn"
                          onClick={() => removeImage(idx)}
                        >
                          <X style={{ width: '10px', height: '10px' }} />
                        </button>
                      </div>
                    );
                  })}
                  
                  {/* Plus Add image card button */}
                  {uploadedImages.length < 5 && (
                    <label className="modal-image-add-btn">
                      <Plus className="modal-image-add-btn-icon" />
                      <span>Add Image</span>
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                      />
                    </label>
                  )}
                  
                </div>
              </div>

            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="filter-reset-btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="filter-apply-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <Plus style={{ width: '16px', height: '16px' }} />
              <span>Submit Listing</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostPropertyModal;
