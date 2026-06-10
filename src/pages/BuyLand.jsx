import React, { useContext, useState, useMemo, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Sprout, Heart, MapPin, Award, Compass, Search, 
  ChevronRight, ChevronLeft 
} from 'lucide-react';

const ITEMS_PER_PAGE = 2; // Slice to 2 items per page to showcase working pagination

export const BuyLand = () => {
  const { 
    setActivePage, 
    savedPlots, 
    toggleSavePlot,
    plotsList,
    plotsLoading,
    plotsError,
    setSelectedPlotId
  } = useContext(AppContext);

  // Local filter states
  const [localLocation, setLocalLocation] = useState('');
  const [localLandType, setLocalLandType] = useState('All Types');
  const [localBudget, setLocalBudget] = useState(10000000); // Default 1 Crore
  const [localMinArea, setLocalMinArea] = useState('');
  const [localMaxArea, setLocalMaxArea] = useState('');
  const [sortOrder, setSortOrder] = useState('Latest');
  
  // Checklist filters
  const [checkboxFilters, setCheckboxFilters] = useState({
    dtcp: false,
    rera: false,
    corner: false,
    gated: false,
    road30: false
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  const handleCheckboxChange = (name) => {
    setCheckboxFilters(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleReset = () => {
    setLocalLocation('');
    setLocalLandType('All Types');
    setLocalBudget(10000000);
    setLocalMinArea('');
    setLocalMaxArea('');
    setSortOrder('Latest');
    setCheckboxFilters({
      dtcp: false,
      rera: false,
      corner: false,
      gated: false,
      road30: false
    });
    setCurrentPage(1);
  };

  // Perform reactive filtering and sorting
  const filteredPlots = useMemo(() => {
    let result = [...plotsList];

    // Filter by location
    if (localLocation) {
      result = result.filter(plot => 
        plot.location.toLowerCase().includes(localLocation.toLowerCase())
      );
    }

    // Filter by type
    if (localLandType !== 'All Types') {
      result = result.filter(plot => 
        plot.landType === localLandType
      );
    }

    // Filter by budget
    result = result.filter(plot => plot.priceVal <= localBudget);

    // Filter by min area
    if (localMinArea) {
      result = result.filter(plot => plot.areaVal >= parseInt(localMinArea));
    }

    // Filter by max area
    if (localMaxArea) {
      result = result.filter(plot => plot.areaVal <= parseInt(localMaxArea));
    }

    // Filter by checkboxes
    if (checkboxFilters.dtcp) {
      result = result.filter(plot => plot.features?.dtcp);
    }
    if (checkboxFilters.rera) {
      result = result.filter(plot => plot.features?.rera);
    }
    if (checkboxFilters.corner) {
      result = result.filter(plot => plot.features?.corner);
    }
    if (checkboxFilters.gated) {
      result = result.filter(plot => plot.features?.gated);
    }
    if (checkboxFilters.road30) {
      result = result.filter(plot => plot.features?.road30);
    }

    // Sort listings
    if (sortOrder === 'Latest') {
      result.sort((a, b) => b.id - a.id); // Highest ID first (newest)
    } else if (sortOrder === 'PriceLowHigh') {
      result.sort((a, b) => a.priceVal - b.priceVal);
    } else if (sortOrder === 'PriceHighLow') {
      result.sort((a, b) => b.priceVal - a.priceVal);
    }

    return result;
  }, [plotsList, localLocation, localLandType, localBudget, localMinArea, localMaxArea, checkboxFilters, sortOrder]);

  // Reset to first page when search queries or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [localLocation, localLandType, localBudget, localMinArea, localMaxArea, checkboxFilters, sortOrder]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredPlots.length / ITEMS_PER_PAGE));
  
  const paginatedPlots = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPlots.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPlots, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="buyland-page-wrapper fade-in">
      {/* Page Header and Breadcrumb */}
      <header className="buyland-header">
        <h1>Buy Land</h1>
        <div className="breadcrumb-nav">
          <span className="breadcrumb-link" onClick={() => setActivePage('home')}>Home</span>
          <ChevronRight className="breadcrumb-arrow" />
          <span className="breadcrumb-link active">Buy Land</span>
        </div>
      </header>

      {/* Main Grid: Filters Sidebar + Listings Column */}
      <div className="buyland-layout-grid">
        {/* Left Sidebar Filter Results */}
        <aside className="filter-sidebar-card">
          <div className="filter-header">
            <h3>Filter Results</h3>
          </div>

          <div className="filter-body">
            {/* Location */}
            <div className="filter-form-field">
              <label>Location</label>
              <select 
                className="filter-select-input"
                value={localLocation}
                onChange={(e) => setLocalLocation(e.target.value)}
              >
                <option value="">Select Location</option>
                <option value="Ramanathapuram">Ramanathapuram</option>
                <option value="Rameswaram">Rameswaram</option>
                <option value="Paramakudi">Paramakudi</option>
                <option value="Keelakarai">Keelakarai</option>
                <option value="Devipattinam">Devipattinam</option>
                <option value="Sayalgudi">Sayalgudi</option>
                <option value="Mandapam">Mandapam</option>
                <option value="Mudukulathur">Mudukulathur</option>
                <option value="RS Mangalam">RS Mangalam</option>
                <option value="Kadaladi">Kadaladi</option>
              </select>
            </div>

            {/* Land Type */}
            <div className="filter-form-field">
              <label>Land Type</label>
              <select 
                className="filter-select-input"
                value={localLandType}
                onChange={(e) => setLocalLandType(e.target.value)}
              >
                <option value="All Types">All Types</option>
                <option value="Residential Plot">Residential Plot</option>
                <option value="Agricultural Land">Agricultural Land</option>
                <option value="Farm Land">Farm Land</option>
              </select>
            </div>

            {/* Budget range slider */}
            <div className="filter-form-field">
              <div className="budget-slider-header">
                <label>Budget</label>
                <span className="budget-range-value font-mono">
                  ₹ 0 - ₹ {localBudget >= 10000000 ? '1,00,00,000+' : localBudget.toLocaleString('en-IN')}
                </span>
              </div>
              <input 
                type="range"
                min="500000"
                max="10000000"
                step="500000"
                value={localBudget}
                onChange={(e) => setLocalBudget(parseInt(e.target.value))}
                className="budget-range-slider"
              />
            </div>

            {/* Area Limits */}
            <div className="filter-form-field">
              <label>Land Area (sq.ft)</label>
              <div className="filter-area-inputs">
                <input 
                  type="number" 
                  placeholder="Min Area" 
                  className="filter-text-input"
                  value={localMinArea}
                  onChange={(e) => setLocalMinArea(e.target.value)}
                />
                <input 
                  type="number" 
                  placeholder="Max Area" 
                  className="filter-text-input"
                  value={localMaxArea}
                  onChange={(e) => setLocalMaxArea(e.target.value)}
                />
              </div>
            </div>

            {/* More Filters Checkbox Checklist */}
            <div className="filter-form-field">
              <label className="checkbox-section-title">More Filters</label>
              <div className="checkbox-list">
                <label className="checkbox-item-label">
                  <input 
                    type="checkbox" 
                    checked={checkboxFilters.dtcp}
                    onChange={() => handleCheckboxChange('dtcp')}
                  />
                  <span>DTCP Approved</span>
                </label>
                <label className="checkbox-item-label">
                  <input 
                    type="checkbox" 
                    checked={checkboxFilters.rera}
                    onChange={() => handleCheckboxChange('rera')}
                  />
                  <span>RERA Approved</span>
                </label>
                <label className="checkbox-item-label">
                  <input 
                    type="checkbox" 
                    checked={checkboxFilters.corner}
                    onChange={() => handleCheckboxChange('corner')}
                  />
                  <span>Corner Plot</span>
                </label>
                <label className="checkbox-item-label">
                  <input 
                    type="checkbox" 
                    checked={checkboxFilters.gated}
                    onChange={() => handleCheckboxChange('gated')}
                  />
                  <span>Gated Community</span>
                </label>
                <label className="checkbox-item-label">
                  <input 
                    type="checkbox" 
                    checked={checkboxFilters.road30}
                    onChange={() => handleCheckboxChange('road30')}
                  />
                  <span>30ft Road</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="filter-actions-row">
              <button className="filter-reset-btn" onClick={handleReset}>Reset</button>
              <button className="filter-apply-btn" onClick={() => alert("Filters are applied reactively in real time!")}>Apply Filter</button>
            </div>
          </div>
        </aside>

        {/* Right Listings Column */}
        <main className="listings-column">
          <div className="listings-list-header">
            <h3>{filteredPlots.length} Lands Found</h3>
            <div className="sort-by-wrapper">
              <span>Sort By:</span>
              <select 
                className="sort-select-input"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="Latest">Latest</option>
                <option value="PriceLowHigh">Price: Low to High</option>
                <option value="PriceHighLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="listings-vertical-list">
            {plotsLoading ? (
              <div className="glass-panel" style={{ backgroundColor: '#fff', textAlign: 'center', padding: '3rem', border: '1px solid #e2e8f0' }}>
                <p style={{ fontWeight: 600, color: '#64748b' }}>⏳ Loading listings from database...</p>
              </div>
            ) : plotsError ? (
              <div className="glass-panel" style={{ backgroundColor: '#fef2f2', textAlign: 'center', padding: '3rem', border: '1px solid #fee2e2' }}>
                <p style={{ fontWeight: 600, color: '#ef4444' }}>❌ {plotsError}</p>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>Make sure MySQL is running and the backend server is started.</p>
              </div>
            ) : paginatedPlots.length === 0 ? (
              <div className="glass-panel" style={{ backgroundColor: '#fff', textAlign: 'center', padding: '3rem', border: '1px solid #e2e8f0' }}>
                <p style={{ fontWeight: 600, color: '#64748b' }}>No properties match your active filter settings.</p>
                <button className="filter-reset-btn" style={{ marginTop: '1rem' }} onClick={handleReset}>Clear All Filters</button>
              </div>
            ) : (
              paginatedPlots.map((plot) => {
                const isSaved = savedPlots.includes(plot.id);
                return (
                  <div key={plot.id} className="listing-row-card">
                    {/* Image Container with tag badge and save icon */}
                    <div className="listing-row-img-box">
                      <img src={plot.image} alt={plot.title} className="listing-row-img" />
                      <span className={`plot-tag-badge ${plot.tagClass}`}>{plot.tag}</span>
                      <button 
                        className={`plot-save-btn ${isSaved ? 'saved' : ''}`}
                        onClick={() => toggleSavePlot(plot.id)}
                        title={isSaved ? "Remove from saved" : "Save plot"}
                        style={{ top: '0.75rem', right: '0.75rem' }}
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
                    </div>

                    {/* Mid Info */}
                    <div className="listing-row-info">
                      <h4>{plot.title}</h4>
                      <div className="plot-location" style={{ marginBottom: '0.75rem' }}>
                        <MapPin className="plot-loc-icon" />
                        <span>{plot.location}</span>
                      </div>

                      <div className="listing-row-features">
                        <div className="feature-item">
                          <Award className="feature-icon" />
                          <span>DTCP Approved</span>
                        </div>
                        <div className="feature-item">
                          <MapPin className="feature-icon" />
                          <span>{plot.road}</span>
                        </div>
                        <div className="feature-item">
                          <Compass className="feature-icon" />
                          <span>{plot.facing}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Info */}
                    <div className="listing-row-right">
                      <span className="listing-row-price">{plot.price}</span>
                      <button 
                        className="search-submit-btn" 
                        style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                        onClick={() => {
                          setSelectedPlotId(plot.id);
                          setActivePage('landdetails');
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination Controls */}
          {filteredPlots.length > ITEMS_PER_PAGE && (
            <div className="pagination-row">
              <button 
                className="page-nav-btn" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
              >
                <ChevronLeft style={{ width: '16px', height: '16px' }} />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`page-num-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}

              <button 
                className="page-nav-btn" 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{ opacity: currentPage === totalPages ? 0.4 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
              >
                <ChevronRight style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BuyLand;
