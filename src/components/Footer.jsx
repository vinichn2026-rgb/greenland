import React, { useContext } from 'react';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import logoImg from '../assets/logo.png';

export const Footer = () => {
  const { setActivePage } = useContext(AppContext);

  return (
    <footer className="footer-realestate">
      <div className="footer-re-container">
        {/* About Section */}
        <div className="footer-column">
          <div className="footer-logo-title" style={{ display: 'flex', alignItems: 'center', background: '#ffffff', padding: '6px 12px', borderRadius: '8px', width: 'fit-content', marginBottom: '1rem' }}>
            <img src={logoImg} alt="Thennattu Nilam Logo" style={{ height: '60px', width: 'auto', objectFit: 'contain' }} />
          </div>
          <p style={{ fontSize: '0.8rem', lineHeight: '1.6' }}>
            Tamil Nadu's premier platform for vacant land investments, farm lands, and premium plots. We bridge the gap between verified sellers and passionate buyers.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><button onClick={() => setActivePage('buyland')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><ChevronRight style={{ width: '12px', height: '12px' }} /> Buy Land</button></li>
            <li><button onClick={() => setActivePage('sellland')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><ChevronRight style={{ width: '12px', height: '12px' }} /> Sell Land</button></li>
            <li><button onClick={() => setActivePage('home')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><ChevronRight style={{ width: '12px', height: '12px' }} /> Farm Lands</button></li>
            <li><button onClick={() => setActivePage('aboutus')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><ChevronRight style={{ width: '12px', height: '12px' }} /> Why Choose Us</button></li>
          </ul>
        </div>

        {/* Popular Locations */}
        <div className="footer-column">
          <h4>Popular Regions</h4>
          <ul className="footer-links">
            <li><button onClick={() => setActivePage('buyland')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><ChevronRight style={{ width: '12px', height: '12px' }} /> Chennai Region</button></li>
            <li><button onClick={() => setActivePage('buyland')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><ChevronRight style={{ width: '12px', height: '12px' }} /> Coimbatore District</button></li>
            <li><button onClick={() => setActivePage('buyland')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><ChevronRight style={{ width: '12px', height: '12px' }} /> Erode & Salem</button></li>
            <li><button onClick={() => setActivePage('buyland')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><ChevronRight style={{ width: '12px', height: '12px' }} /> Pollachi Valley</button></li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="footer-column">
          <h4>Get In Touch</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem' }}>
            <div className="footer-contact-item">
              <MapPin className="footer-contact-icon" />
              <span>102, Anna Salai, Guindy, Chennai, Tamil Nadu - 600032</span>
            </div>
            <div className="footer-contact-item">
              <Phone className="footer-contact-icon" />
              <span>+91 99426 20101</span>
            </div>
            <div className="footer-contact-item">
              <Mail className="footer-contact-icon" />
              <span>support@greenland.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-re-bottom">
        <span>© {new Date().getFullYear()} GreenLand Land Platform. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={() => setActivePage('terms')}
            style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', padding: 0 }}
          >
            Privacy Policy
          </button>
          <span>|</span>
          <button
            onClick={() => setActivePage('terms')}
            style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', padding: 0 }}
          >
            Terms & Conditions
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
