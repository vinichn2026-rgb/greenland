import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import {
  Shield, MapPin, BadgePercent, Headset, Home as HomeIcon, Tag,
  Search, ShieldCheck, FileCheck, Droplet, Zap, Award,
  ArrowRight, Heart, Compass, MessageSquare, Award as AwardIcon, CheckCircle2,
  Sprout
} from 'lucide-react';

const HERO_SLIDES = [
  {
    title: "Find Your Perfect Empty Land Today!",
    subtitle: "Verified plots, prime locations, and great prices across Ramnad.",
    image: "/images/green_fields_bg.png",
    badge: "Premium Plots & Investment Lands"
  },
  {
    title: "Premium Agricultural & Farm Lands",
    subtitle: "Lush green agricultural layouts in Ramnad with rich soil and high water yield.",
    image: "/images/plot2.png",
    badge: "Farm Lands & Organic Estates"
  },
  {
    title: "DTCP Approved Residential Layouts",
    subtitle: "Clear titles and gated communities ready for immediate construction in Ramnad.",
    image: "/images/plot3.png",
    badge: "Residential Layouts & Villa Plots"
  },
  {
    title: "Industrial & Commercial Plots",
    subtitle: "Strategic commercial land packages near highways with high potential returns.",
    image: "/images/plot1.png",
    badge: "Commercial & Industrial Land"
  },
  {
    title: "Beachfront & Leisure Properties",
    subtitle: "Premium scenic villa plots and holiday home lands along the Ramnad coast.",
    image: "/images/plot4.png",
    badge: "Ramnad Beachfront Plots"
  }
];

export const Home = () => {
  const {
    activeTab,
    setActiveTab,
    savedPlots,
    toggleSavePlot,
    searchQuery,
    setSearchQuery,
    handleSearch,
    plotsList,
    setActivePage,
    setSelectedPlotId
  } = useContext(AppContext);

  // Hero carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Calculator States
  const [calcLocation, setCalcLocation] = useState('Ramanathapuram');
  const [calcArea, setCalcArea] = useState(1200);
  const [calcYears, setCalcYears] = useState(5);

  const appreciationRates = {
    Ramanathapuram: 0.12,
    Rameswaram: 0.15,
    Paramakudi: 0.10,
    Keelakarai: 0.11,
    Devipattinam: 0.09
  };

  const basePricesPerSqFt = {
    Ramanathapuram: 1500,
    Rameswaram: 1800,
    Paramakudi: 1000,
    Keelakarai: 1200,
    Devipattinam: 800
  };

  const calculateAppreciation = () => {
    const basePrice = basePricesPerSqFt[calcLocation] * calcArea;
    const rate = appreciationRates[calcLocation];
    const finalPrice = basePrice * Math.pow(1 + rate, calcYears);
    return {
      initial: Math.round(basePrice),
      future: Math.round(finalPrice),
      gain: Math.round(finalPrice - basePrice),
      percentage: Math.round(((finalPrice - basePrice) / basePrice) * 100)
    };
  };

  const calcResult = calculateAppreciation();

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleInputChange = (field, value) => {
    setSearchQuery(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="page-container" style={{ gap: '0' }}>

      {/* 1. Hero Section (Widescreen, centered title, capsule search bar) */}
      <section
        className="hero-wrapper"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.5)), url('${HERO_SLIDES[currentSlide].image}')`,
          transition: 'background-image 0.5s ease-in-out',
        }}
      >
        <button className="slider-arrow-btn slider-arrow-left" onClick={prevSlide}>‹</button>
        <button className="slider-arrow-btn slider-arrow-right" onClick={nextSlide}>›</button>

        <div className="hero-container">
          {/* Hero Left Content */}
          <div className="hero-left" style={{ textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
            <div className="hero-tag">
              <Shield className="hero-tag-icon" />
              <span>{HERO_SLIDES[currentSlide].badge}</span>
            </div>
            <h2>
              {HERO_SLIDES[currentSlide].title.split(" ").map((word, i) => {
                if (word.includes("Empty") || word.includes("Today!") || word.includes("Agricultural") || word.includes("Farm") || word.includes("Residential") || word.includes("Approved")) {
                  return <span key={i} style={{ color: 'var(--light-green)' }}>{word} </span>;
                }
                return word + " ";
              })}
            </h2>
            <p className="hero-subtitle">
              {HERO_SLIDES[currentSlide].subtitle}
            </p>
          </div>

          {/* Floating Capsule Search Bar */}
          <div className="capsule-search-bar">
            <div className="capsule-field">
              <label>Town / Region</label>
              <select
                className="capsule-select"
                value={searchQuery.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              >
                <option value="">Select Location</option>
                <option value="Ramanathapuram">Ramanathapuram</option>
                <option value="Rameswaram">Rameswaram</option>
                <option value="Paramakudi">Paramakudi</option>
                <option value="Keelakarai">Keelakarai</option>
                <option value="Devipattinam">Devipattinam</option>
              </select>
            </div>
            
            <div className="capsule-divider"></div>

            <div className="capsule-field">
              <label>Category</label>
              <select
                className="capsule-select"
                value={searchQuery.landType}
                onChange={(e) => handleInputChange('landType', e.target.value)}
              >
                <option value="All Types">All Types</option>
                <option value="Residential Plot">Residential Plot</option>
                <option value="Agricultural Land">Agricultural Land</option>
                <option value="Farm Land">Farm Land</option>
              </select>
            </div>

            <div className="capsule-divider"></div>

            <div className="capsule-field">
              <label>Max Budget</label>
              <select
                className="capsule-select"
                value={searchQuery.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
              >
                <option value="">Any Budget</option>
                <option value="1500000">Upto ₹ 15 Lakhs</option>
                <option value="2500000">Upto ₹ 25 Lakhs</option>
                <option value="5000000">Upto ₹ 50 Lakhs</option>
                <option value="10000000">Upto ₹ 1 Crore</option>
              </select>
            </div>

            <button className="capsule-btn" onClick={handleSearch}>
              <span>Search Lands</span>
              <ArrowRight style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Trust Highlights Middle Bar */}
      <section className="modern-section" style={{ marginTop: '-3rem', position: 'relative', zIndex: 10 }}>
        <div className="trust-bar" style={{ borderRadius: '16px', border: '1px solid rgba(34, 197, 94, 0.12)' }}>
          <div className="trust-item">
            <div className="trust-icon-box">
              <Award className="trust-icon" />
            </div>
            <div className="trust-text-wrapper">
              <h4>DTCP Approved</h4>
              <p>Clear Titles</p>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon-box">
              <MapPin className="trust-icon" />
            </div>
            <div className="trust-text-wrapper">
              <h4>30ft & 24ft Road</h4>
              <p>Black Top Roads</p>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon-box">
              <Droplet className="trust-icon" />
            </div>
            <div className="trust-text-wrapper">
              <h4>Water Facility</h4>
              <p>Good Water Source</p>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon-box">
              <Zap className="trust-icon" />
            </div>
            <div className="trust-text-wrapper">
              <h4>Electricity</h4>
              <p>EB Connection</p>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon-box">
              <FileCheck className="trust-icon" />
            </div>
            <div className="trust-text-wrapper">
              <h4>Immediate Registration</h4>
              <p>Ready to Build</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Plots Section (Full Width Stacked) */}
      <section className="modern-section">
        <div className="section-title-box">
          <p>
            <Sprout style={{ width: '12px', height: '12px' }} />
            <span>Featured Investments</span>
          </p>
          <h3>Best Empty Land Deals</h3>
        </div>

        <div className="modern-plots-grid">
          {plotsList.slice(0, 6).map((plot) => {
            const isSaved = savedPlots.includes(plot.id);
            return (
              <div key={plot.id} className="modern-plot-card">
                <div className="modern-plot-img-box">
                  <img src={plot.image} alt={plot.title} className="modern-plot-img" />
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

                <div className="plot-body" style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>{plot.title}</h4>
                  <div className="plot-location" style={{ marginBottom: '1rem' }}>
                    <MapPin className="plot-loc-icon" />
                    <span>{plot.location}</span>
                  </div>

                  <div className="plot-features" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', marginBottom: '1.25rem' }}>
                    <div className="feature-item">
                      <Award className="feature-icon" />
                      <span>DTCP</span>
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

                  <div className="plot-footer">
                    <span className="plot-price" style={{ fontSize: '1.3rem', color: 'var(--primary-green)' }}>{plot.price}</span>
                    <button
                      className="view-details-btn"
                      onClick={() => {
                        setSelectedPlotId(plot.id);
                        setActivePage('landdetails');
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button className="view-all-btn" style={{ padding: '0.8rem 2.5rem', fontSize: '0.9rem', margin: '0 auto' }} onClick={handleSearch}>
            <span>View All Lands</span>
            <ArrowRight style={{ width: '14px', height: '14px' }} />
          </button>
        </div>
      </section>

      {/* 4. Interactive Appreciation Estimator (Full Width Stacked) */}
      <section className="modern-section">
        <div className="calc-card-wrapper">
          <div className="calc-grid">
            <div className="calc-left">
              <span className="featured-header-title" style={{ display: 'inline-block', marginBottom: '0.5rem' }}>
                <p style={{ color: 'var(--accent-gold)' }}>
                  <AwardIcon style={{ width: '12px', height: '12px' }} />
                  <span>Smart Investor Deck</span>
                </p>
              </span>
              <h3>Appreciation Estimator</h3>
              <p>
                Select your desired location, plot size, and hold duration to view historical data-backed projections on future land value gains in Ramnad region.
              </p>
              <div className="calc-form">
                <div className="calc-field">
                  <label>Select Growth Hub</label>
                  <select
                    className="form-input form-input-no-icon"
                    value={calcLocation}
                    onChange={(e) => setCalcLocation(e.target.value)}
                    style={{ paddingLeft: '0.75rem', height: '45px', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                  >
                    <option value="Ramanathapuram">Ramanathapuram Center (12% CAGR)</option>
                    <option value="Rameswaram">Rameswaram Coast (15% CAGR)</option>
                    <option value="Paramakudi">Paramakudi Suburb (10% CAGR)</option>
                    <option value="Keelakarai">Keelakarai Port Region (11% CAGR)</option>
                    <option value="Devipattinam">Devipattinam Sub-Hub (9% CAGR)</option>
                  </select>
                </div>
                
                <div className="calc-field">
                  <div className="calc-range-info">
                    <label>Plot Area (sq.ft)</label>
                    <span className="font-mono">{calcArea} sq.ft</span>
                  </div>
                  <input
                    type="range"
                    min="600"
                    max="4800"
                    step="100"
                    value={calcArea}
                    onChange={(e) => setCalcArea(parseInt(e.target.value))}
                    className="calc-range-slider"
                  />
                </div>

                <div className="calc-field">
                  <div className="calc-range-info">
                    <label>Holding Duration (Years)</label>
                    <span className="font-mono">{calcYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={calcYears}
                    onChange={(e) => setCalcYears(parseInt(e.target.value))}
                    className="calc-range-slider"
                  />
                </div>
              </div>
            </div>

            <div className="calc-right">
              <h4 className="calc-result-header">Estimated Future Value</h4>
              <div className="calc-result-value font-mono">
                ₹ {calcResult.future.toLocaleString('en-IN')}
              </div>
              
              <div className="calc-projection-bars">
                <div className="proj-bar-row">
                  <div className="proj-bar-label">
                    <span>Initial Cost</span>
                    <span>₹ {calcResult.initial.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="proj-bar-outer">
                    <div className="proj-bar-inner" style={{ width: '45%' }}></div>
                  </div>
                </div>

                <div className="proj-bar-row">
                  <div className="proj-bar-label">
                    <span>Capital Gains</span>
                    <span>+ ₹ {calcResult.gain.toLocaleString('en-IN')} ({calcResult.percentage}% ROI)</span>
                  </div>
                  <div className="proj-bar-outer">
                    <div className="proj-bar-inner" style={{ width: `${Math.min(100, 45 + calcResult.percentage / 3)}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us Section (Full Width stacked) */}
      <section className="modern-section">
        <div className="section-title-box">
          <p>
            <Shield className="hero-tag-icon" style={{ color: 'var(--light-green)' }} />
            <span>Unmatched Safety</span>
          </p>
          <h3>Why Choose Thennadu Nilam?</h3>
        </div>

        <div className="why-grid-modern">
          <div className="why-card-modern">
            <div className="why-icon-circle-modern">
              <CheckCircle2 style={{ width: '24px', height: '24px' }} />
            </div>
            <h4>100% Legal Verified</h4>
            <p>Every listed land document is carefully vetted by legal experts to ensure clean titles.</p>
          </div>

          <div className="why-card-modern">
            <div className="why-icon-circle-modern">
              <CheckCircle2 style={{ width: '24px', height: '24px' }} />
            </div>
            <h4>Clear Documents</h4>
            <p>Full document chains, parent deeds, and EC checks are ready for instant buyer review.</p>
          </div>

          <div className="why-card-modern">
            <div className="why-icon-circle-modern">
              <CheckCircle2 style={{ width: '24px', height: '24px' }} />
            </div>
            <h4>Prime Growth Locations</h4>
            <p>Our plots sit strictly in high-appreciation pathways of Ramnad with great road connectivity.</p>
          </div>

          <div className="why-card-modern">
            <div className="why-icon-circle-modern">
              <CheckCircle2 style={{ width: '24px', height: '24px' }} />
            </div>
            <h4>Best Price Guarantee</h4>
            <p>Deal directly with verified owners, ensuring zero hidden brokerage charges or commissions.</p>
          </div>
        </div>
      </section>

      {/* 6. Local Connectivity Section (Full Width split layout) */}
      <section className="modern-section">
        <div className="split-radar-layout">
          <div className="split-radar-left">
            <span className="featured-header-title" style={{ display: 'inline-block', marginBottom: '0.5rem' }}>
              <p style={{ color: 'var(--accent-gold)' }}>
                <MapPin style={{ width: '12px', height: '12px' }} />
                <span>Prime Connectivity</span>
              </p>
            </span>
            <h3>Strategic Ramnad Infrastructure</h3>
            <p>
              Our properties are meticulously selected near upcoming transport hubs, marine ports, and national highways. This radar illustrates average travel distance and drive-times from our major plots to prime landmarks in Ramanathapuram.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="why-cta-btn-primary" onClick={() => setActivePage('contact')}>
                Schedule Site Visit
              </button>
              <button className="why-cta-btn-secondary" style={{ border: '1px solid var(--border-color)', color: 'var(--text-dark)', background: '#fff' }} onClick={() => setActivePage('buyland')}>
                Explore Map Plots
              </button>
            </div>
          </div>

          <div className="split-radar-right">
            <div className="hotspots-sidebar-card">
              <div className="hotspot-header">
                <h3>Local Connectivity Radar</h3>
                <MapPin style={{ width: '18px', height: '18px', color: 'var(--light-green)' }} />
              </div>
              
              <div className="hotspot-map-mock">
                <img src="/images/mock_map.png" alt="Mock Map Radar" className="hotspot-map-img" />
                <div className="hotspot-radar-pulse"></div>
              </div>

              <div className="hotspot-list">
                <div className="hotspot-item">
                  <div className="hotspot-label-group">
                    <CheckCircle2 style={{ width: '14px', height: '14px', color: 'var(--light-green)' }} />
                    <span>National Highway NH-49</span>
                  </div>
                  <span className="hotspot-distance">1.2 km</span>
                </div>

                <div className="hotspot-item">
                  <div className="hotspot-label-group">
                    <CheckCircle2 style={{ width: '14px', height: '14px', color: 'var(--light-green)' }} />
                    <span>Ramanathapuram Town</span>
                  </div>
                  <span className="hotspot-distance">3.5 km</span>
                </div>

                <div className="hotspot-item">
                  <div className="hotspot-label-group">
                    <CheckCircle2 style={{ width: '14px', height: '14px', color: 'var(--light-green)' }} />
                    <span>Keelakarai Harbour</span>
                  </div>
                  <span className="hotspot-distance">8.0 km</span>
                </div>

                <div className="hotspot-item">
                  <div className="hotspot-label-group">
                    <CheckCircle2 style={{ width: '14px', height: '14px', color: 'var(--light-green)' }} />
                    <span>ECR Express Road</span>
                  </div>
                  <span className="hotspot-distance">2.5 km</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Action Button */}
      <button
        className="whatsapp-float-btn"
        onClick={() => window.open('https://wa.me/919942620101', '_blank')}
      >
        <MessageSquare className="wa-icon" style={{ fill: '#fff' }} />
        <span>Chat on WhatsApp</span>
        <span className="wa-badge"></span>
      </button>

    </div>
  );
};

export default Home;
