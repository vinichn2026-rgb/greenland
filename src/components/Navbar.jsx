import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import {
  Sprout, Heart, Bell, PlusCircle, MapPin, Phone, Mail
} from 'lucide-react';
import logoImg from '../assets/thennattu_nilam_original_logo1.png';

export const Navbar = () => {
  const {
    activePage,
    setActivePage,
    savedPlots,
    notificationsCount,
    setPostPropertyModalOpen
  } = useContext(AppContext);

  return (
    <div className="navbar-wrapper">
      {/* Green Top Bar */}
      <div className="top-bar">
        <div className="top-bar-left">
          <MapPin style={{ width: '12px', height: '12px', color: '#22c55e' }} />
          <span>Tamil Nadu's Most Trusted Land Platform</span>
        </div>
        <div className="top-bar-mid">
          <a href="tel:+919942620101">
            <Phone style={{ width: '12px', height: '12px' }} />
            <span>+91 99426 20101</span>
          </a>
          <a href="mailto:support@greenland.com">
            <Mail style={{ width: '12px', height: '12px' }} />
            <span>support@greenland.com</span>
          </a>
        </div>
        <div className="top-bar-right">
          <span>Follow Us:</span>
          <div className="social-links">
            {/* Facebook inline SVG */}
            <button className="social-icon-btn">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </button>
            {/* Instagram inline SVG */}
            <button className="social-icon-btn">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </button>
            {/* Youtube inline SVG */}
            <button className="social-icon-btn">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </button>
            {/* WhatsApp/Chat inline SVG */}
            <button className="social-icon-btn">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.497 1.45 5.421 1.451 5.58 0 10.121-4.527 10.124-10.099.002-2.7-1.043-5.237-2.946-7.14C17.34 1.46 14.81 .413 12.11.413 6.533.413 1.995 4.939 1.992 10.51c-.001 1.922.502 3.8 1.458 5.4l-.956 3.492 3.572-.938-.009-.008z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Curved White Navbar */}
      <nav className="navbar">
        <div className="nav-logo-box" onClick={() => setActivePage('home')}>
          <img src={logoImg} alt="Thennattu Nilam Logo" className="nav-logo-img" style={{ height: '170px', width: 'auto', objectFit: 'contain' }} />
        </div>

        <div className="nav-menu">
          <button
            className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => setActivePage('home')}
          >
            <span>Home</span>
          </button>
          <button
            className={`nav-link ${activePage === 'buyland' ? 'active' : ''}`}
            onClick={() => setActivePage('buyland')}
          >
            <span>Buy Land</span>
          </button>
          <button
            className={`nav-link ${activePage === 'sellland' ? 'active' : ''}`}
            onClick={() => setActivePage('sellland')}
          >
            <span>Sell Land</span>
          </button>
          <button
            className={`nav-link ${activePage === 'aboutus' ? 'active' : ''}`}
            onClick={() => setActivePage('aboutus')}
          >
            <span>About Us</span>
          </button>
          <button
            className={`nav-link ${activePage === 'whyus' ? 'active' : ''}`}
            onClick={() => setActivePage('whyus')}
          >
            <span>Why Us</span>
          </button>
          <button
            className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}
            onClick={() => setActivePage('contact')}
          >
            <span>Contact</span>
          </button>
        </div>

        <div className="nav-actions">
          <button className="nav-link" style={{ borderBottom: 'none' }}>
            <Heart className="link-icon" style={{ fill: savedPlots.length > 0 ? '#ef4444' : 'none', color: savedPlots.length > 0 ? '#ef4444' : 'inherit' }} />
            <span>Saved ({savedPlots.length})</span>
          </button>

          <button className="nav-icon-link" onClick={() => setActivePage('login')} title="Login Account">
            <Bell style={{ width: '20px', height: '20px' }} />
            {notificationsCount > 0 && <span className="badge-num">{notificationsCount}</span>}
          </button>

          <button className="post-property-btn" onClick={() => setPostPropertyModalOpen(true)}>
            <span>Post Property</span>
            <PlusCircle style={{ width: '18px', height: '18px' }} />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
