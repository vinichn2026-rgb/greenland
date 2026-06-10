import React, { useContext } from 'react';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export const Footer = () => {
  const { setActivePage } = useContext(AppContext);

  return (
    <footer className="footer-realestate">
      <div className="footer-re-container">
        {/* About Section */}
        <div className="footer-column">
          <div className="footer-logo-title" style={{ marginBottom: '1rem' }}>
            <p style={{
              fontSize: '1.6rem',
              fontWeight: '800',
              fontFamily: "'Outfit', 'Playfair Display', 'Georgia', serif",
              color: '#0f4c23',
              letterSpacing: '0.5px',
              margin: 0,
              textTransform: 'uppercase',
              display: 'flex',
              flexDirection: 'column',
              lineHeight: '1.2'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#0f4c23' }}>Thennadu</span>
                <span style={{ color: '#b89047' }}>Nilam</span>
              </span>
              <span style={{
                fontSize: '0.65rem',
                letterSpacing: '2px',
                color: '#b89047',
                fontWeight: '600',
                marginTop: '0.2rem',
                borderTop: '1px solid #e2e8f0',
                paddingTop: '0.2rem'
              }}>
                REAL ESTATE & DEVELOPMENTS
              </span>
            </p>
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
            <li><button onClick={() => setActivePage('buyland')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><ChevronRight style={{ width: '12px', height: '12px' }} /> Ramnad Region</button></li>
            <li><button onClick={() => setActivePage('buyland')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><ChevronRight style={{ width: '12px', height: '12px' }} /> Rameswaram Region</button></li>
            <li><button onClick={() => setActivePage('buyland')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><ChevronRight style={{ width: '12px', height: '12px' }} /> Paramakudi Division</button></li>
            <li><button onClick={() => setActivePage('buyland')} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><ChevronRight style={{ width: '12px', height: '12px' }} /> Keelakarai Coast</button></li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="footer-column">
          <h4>Get In Touch</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem' }}>
            <div className="footer-contact-item">
              <MapPin className="footer-contact-icon" />
              <span>102, Anna Salai, Ramnad, Tamil Nadu - 623501</span>
            </div>
            <div className="footer-contact-item">
              <Phone className="footer-contact-icon" />
              <span>+91 99426 20101</span>
            </div>
            <div className="footer-contact-item">
              <Mail className="footer-contact-icon" />
              <span>Thennadunilam@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-re-bottom">
        <span>© {new Date().getFullYear()} Thennadu Nilam Real Estate & Developments. All rights reserved.</span>
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
