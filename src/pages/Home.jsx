import React, { useContext, useState } from 'react';
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
    subtitle: "Verified plots, prime locations, great prices. Find the best land deals across Tamil Nadu.",
    image: "/images/green_fields_bg.png",
    badge: "Premium Plots & Investment Lands"
  },
  {
    title: "Premium Agricultural & Farm Lands",
    subtitle: "Lush green agricultural land deals in Pollachi, Coimbatore & Madurai. Rich soil, high yielding water source.",
    image: "/images/plot2.png",
    badge: "Farm Lands & Organic Estates"
  },
  {
    title: "DTCP Approved Residential Layouts",
    subtitle: "Clear titles, blacktop roads, secure gated communities in Chennai suburbs ready for immediate construction.",
    image: "/images/plot3.png",
    badge: "Residential Layouts & Villa Plots"
  },
  {
    title: "Industrial & Commercial Plots",
    subtitle: "Strategic commercial land packages near highways and industrial corridors with high potential returns.",
    image: "/images/plot1.png",
    badge: "Commercial & Industrial Land"
  },
  {
    title: "Beachfront & Leisure Properties",
    subtitle: "Premium scenic villa plots and holiday home lands along ECR and scenic coastal roads.",
    image: "/images/plot4.png",
    badge: "ECR Beachfront Plots"
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

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleInputChange = (field, value) => {
    setSearchQuery(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="page-container" style={{ gap: '0' }}>

      {/* Hero Wrapper containing left content & right search widget */}
      <section
        className="hero-wrapper"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.5)), url('${HERO_SLIDES[currentSlide].image}')`,
          transition: 'background-image 0.5s ease-in-out'
        }}
      >
        <button className="slider-arrow-btn slider-arrow-left" onClick={prevSlide}>‹</button>
        <button className="slider-arrow-btn slider-arrow-right" onClick={nextSlide}>›</button>

        <div className="hero-container">
          {/* Hero Left Content */}
          <div className="hero-left">
            <div className="hero-tag">
              <Shield className="hero-tag-icon" />
              <span>{HERO_SLIDES[currentSlide].badge}</span>
            </div>
            <h2>
              {HERO_SLIDES[currentSlide].title.split(" ").map((word, i) => {
                if (word.includes("Empty") || word.includes("Today!") || word.includes("Agricultural") || word.includes("Farm") || word.includes("Residential") || word.includes("Approved")) {
                  return <span key={i}>{word} </span>;
                }
                return word + " ";
              })}
            </h2>
            <p className="hero-subtitle">
              {HERO_SLIDES[currentSlide].subtitle}
            </p>
          </div>

          {/* Hero Right: Search Widget */}
          <div className="hero-right">
            <div className="search-widget-card">
              <div className="widget-tabs">
                <button
                  className={`widget-tab-btn ${activeTab === 'buy' ? 'active' : ''}`}
                  onClick={() => setActiveTab('buy')}
                >
                  <HomeIcon className="tab-icon" />
                  <span>Buy Land</span>
                </button>
                <button
                  className={`widget-tab-btn ${activeTab === 'sell' ? 'active' : ''}`}
                  onClick={() => setActiveTab('sell')}
                >
                  <Tag className="tab-icon" />
                  <span>Sell Land</span>
                </button>
              </div>

              <div className="widget-body">
                <div className="form-grid">
                  {/* Location Field */}
                  <div className="form-field field-full">
                    <label>Location</label>
                    <div className="input-container">
                      <MapPin className="input-icon" />
                      <select
                        className="form-input"
                        value={searchQuery.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                      >
                        <option value="">Select Location</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Coimbatore">Coimbatore</option>
                        <option value="Salem">Salem</option>
                        <option value="Erode">Erode</option>
                        <option value="Pollachi">Pollachi</option>
                        <option value="Thanjavur">Thanjavur</option>
                      </select>
                    </div>
                  </div>

                  {/* Land Type */}
                  <div className="form-field">
                    <label>Land Type</label>
                    <select
                      className="form-input form-input-no-icon"
                      value={searchQuery.landType}
                      onChange={(e) => handleInputChange('landType', e.target.value)}
                    >
                      <option value="All Types">All Types</option>
                      <option value="Residential Plot">Residential Plot</option>
                      <option value="Agricultural Land">Agricultural Land</option>
                      <option value="Farm Land">Farm Land</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div className="form-field">
                    <label>Budget</label>
                    <select
                      className="form-input form-input-no-icon"
                      value={searchQuery.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                    >
                      <option value="">Select Budget</option>
                      <option value="Under ₹10 Lakhs">Under ₹10 Lakhs</option>
                      <option value="₹10L - ₹20L">₹10L - ₹20L</option>
                      <option value="₹20L - ₹50L">₹20L - ₹50L</option>
                      <option value="Above ₹50 Lakhs">Above ₹50 Lakhs</option>
                    </select>
                  </div>

                  {/* Area limits */}
                  <div className="form-field field-full">
                    <label>Land Area (sq.ft)</label>
                    <div className="area-range-inputs">
                      <input
                        type="number"
                        placeholder="Min Area"
                        className="form-input form-input-no-icon"
                        value={searchQuery.minArea}
                        onChange={(e) => handleInputChange('minArea', e.target.value)}
                      />
                      <span>-</span>
                      <input
                        type="number"
                        placeholder="Max Area"
                        className="form-input form-input-no-icon"
                        value={searchQuery.maxArea}
                        onChange={(e) => handleInputChange('maxArea', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <button className="search-submit-btn" onClick={handleSearch}>
                  <Search style={{ width: '18px', height: '18px' }} />
                  <span>Search Land</span>
                </button>

                {/* Popular Tags list */}
                <div className="popular-searches">
                  <span>Popular Searches :</span>
                  <a href="#coimbatore" className="popular-tag">Coimbatore</a>
                  <a href="#pollachi" className="popular-tag">Pollachi</a>
                  <a href="#erode" className="popular-tag">Erode</a>
                  <a href="#salem" className="popular-tag">Salem</a>
                  <a href="#thanjavur" className="popular-tag">Thanjavur</a>
                  <button className="popular-tag-more">More ▾</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Highlights Middle Bar */}
      <section className="trust-bar-wrapper">
        <div className="trust-bar">
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

      {/* Content Area: Left grid of cards and right sidebar */}
      <main className="content-wrapper">
        {/* Left Side: Featured Land Deals */}
        <div className="content-left">
          <div className="featured-header">
            <div className="featured-header-title">
              <p>
                <Sprout style={{ width: '12px', height: '12px' }} />
                <span>Featured Lands</span>
              </p>
              <h3>Best Empty Land Deals</h3>
            </div>
            <button className="view-all-btn" onClick={handleSearch}>
              <span>View All Lands</span>
              <ArrowRight style={{ width: '14px', height: '14px' }} />
            </button>
          </div>

          <div className="plots-grid">
            {plotsList.slice(0, 6).map((plot) => {
              const isSaved = savedPlots.includes(plot.id);
              return (
                <div key={plot.id} className="plot-card">
                  <div className="plot-img-box">
                    <img src={plot.image} alt={plot.title} className="plot-img" />
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

                  <div className="plot-body">
                    <h4>{plot.title}</h4>
                    <div className="plot-location">
                      <MapPin className="plot-loc-icon" />
                      <span>{plot.location}</span>
                    </div>

                    <div className="plot-features">
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
                      <span className="plot-price">{plot.price}</span>
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
        </div>

        {/* Right Side: Why Choose Us Sidebar */}
        <div className="content-right">
          <div className="why-choose-card">
            <div className="why-header">
              <h3>Why Choose Thennattu Nilam?</h3>
              <div className="gold-medallion" title="Top Rated Platform">
                <AwardIcon style={{ width: '18px', height: '18px' }} />
              </div>
            </div>

            <div className="why-body">
              <div className="why-item">
                <div className="why-icon-box">
                  <CheckCircle2 className="why-icon" />
                </div>
                <div className="why-text">
                  <h4>100% Legal Verified</h4>
                  <p>All lands are legally verified</p>
                </div>
              </div>

              <div className="why-item">
                <div className="why-icon-box">
                  <CheckCircle2 className="why-icon" />
                </div>
                <div className="why-text">
                  <h4>Clear Documents</h4>
                  <p>All documents are clear & safe</p>
                </div>
              </div>

              <div className="why-item">
                <div className="why-icon-box">
                  <CheckCircle2 className="why-icon" />
                </div>
                <div className="why-text">
                  <h4>Prime Locations</h4>
                  <p>Best locations with great connectivity</p>
                </div>
              </div>

              <div className="why-item">
                <div className="why-icon-box">
                  <CheckCircle2 className="why-icon" />
                </div>
                <div className="why-text">
                  <h4>Best Price Guarantee</h4>
                  <p>Get the best price in the market</p>
                </div>
              </div>

              <div className="why-item">
                <div className="why-icon-box">
                  <CheckCircle2 className="why-icon" />
                </div>
                <div className="why-text">
                  <h4>Easy & Safe Process</h4>
                  <p>Hassle-free buying experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

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
