import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import {
  ChevronRight, Target, Eye, Gem, Users, MapPin, Award,
  Layout, CheckCircle2, Shield, Headset, BadgePercent
} from 'lucide-react';

export const AboutUs = () => {
  const { setActivePage } = useContext(AppContext);

  return (
    <div className="buyland-page-wrapper fade-in" style={{ paddingBottom: '4rem' }}>

      {/* Breadcrumbs Header */}
      <header className="buyland-header" style={{ marginBottom: '2rem' }}>
        <div className="breadcrumb-nav" style={{ marginBottom: '0.75rem' }}>
          <span className="breadcrumb-link" onClick={() => setActivePage('home')}>Home</span>
          <ChevronRight className="breadcrumb-arrow" />
          <span className="breadcrumb-link active">About Us</span>
        </div>
      </header>

      {/* Main Section: Text Description + Image */}
      <section className="about-main-section" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3rem', alignItems: 'center', marginBottom: '3rem' }}>
        <div className="about-text-content">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
            About Thennadu Nilam
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-grey)', marginBottom: '1.5rem' }}>
            Thennadu Nilam is a trusted land marketplace dedicated to helping customers buy and sell verified empty lands across Ramnad and surrounding regions.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-grey)' }}>
            We ensure transparent transactions, verified properties, and the best customer experience.
          </p>
        </div>

        {/* Brand Image card */}
        <div className="about-img-box" style={{ height: '300px', borderRadius: '14px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '1px solid #cbd5e1' }}>
          <img src="/images/green_fields_bg.png" alt="Ramnad Lands" className="plot-img" />
        </div>
      </section>

      {/* Statistics Row Grid */}
      <section className="about-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
        {/* Stat 1 */}
        <div className="glass-panel about-stat-box" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem 1.5rem', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <div className="why-icon-box" style={{ width: '44px', height: '44px', borderRadius: '8px' }}>
            <Layout style={{ width: '20px', height: '20px' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', lineHeight: '1.1' }}>500+</h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)' }}>Lands Listed</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="glass-panel about-stat-box" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem 1.5rem', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <div className="why-icon-box" style={{ width: '44px', height: '44px', borderRadius: '8px' }}>
            <Users style={{ width: '20px', height: '20px' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', lineHeight: '1.1' }}>1000+</h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)' }}>Happy Customers</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="glass-panel about-stat-box" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem 1.5rem', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <div className="why-icon-box" style={{ width: '44px', height: '44px', borderRadius: '8px' }}>
            <MapPin style={{ width: '20px', height: '20px' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', lineHeight: '1.1' }}>50+</h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)' }}>Prime Locations</span>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="glass-panel about-stat-box" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem 1.5rem', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <div className="why-icon-box" style={{ width: '44px', height: '44px', borderRadius: '8px' }}>
            <Award style={{ width: '20px', height: '20px' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', lineHeight: '1.1' }}>10+</h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)' }}>Years Experience</span>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="about-pillars-panel glass-panel" style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '2.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '2.5rem', marginBottom: '4rem' }}>

        {/* Mission */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderRight: '1px solid #e2e8f0', paddingRight: '1.5rem' }}>
          <div className="why-icon-box" style={{ width: '48px', height: '48px' }}>
            <Target style={{ width: '22px', height: '22px' }} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>Our Mission</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-grey)', lineHeight: '1.6' }}>
            To make land buying and selling simple, transparent and secure for everyone.
          </p>
        </div>

        {/* Vision */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderRight: '1px solid #e2e8f0', paddingRight: '1.5rem' }}>
          <div className="why-icon-box" style={{ width: '48px', height: '48px' }}>
            <Eye style={{ width: '22px', height: '22px' }} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>Our Vision</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-grey)', lineHeight: '1.6' }}>
            To become Ramnad's most trusted land marketplace.
          </p>
        </div>

        {/* Values */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="why-icon-box" style={{ width: '48px', height: '48px' }}>
            <Gem style={{ width: '22px', height: '22px' }} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>Our Values</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text-grey)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
              <CheckCircle2 style={{ width: '15px', height: '15px', color: 'var(--secondary-green)' }} />
              <span>Transparency</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
              <CheckCircle2 style={{ width: '15px', height: '15px', color: 'var(--secondary-green)' }} />
              <span>Trust & Integrity</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
              <CheckCircle2 style={{ width: '15px', height: '15px', color: 'var(--secondary-green)' }} />
              <span>Customer First</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
              <CheckCircle2 style={{ width: '15px', height: '15px', color: 'var(--secondary-green)' }} />
              <span>Innovation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bottom Bar Highlights */}
      <section className="glass-panel" style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>

        {/* Item 1 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Shield style={{ color: 'var(--light-green)', width: '22px', height: '22px' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>Verified Properties</strong>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>100% Legal Verified</span>
          </div>
        </div>

        {/* Item 2 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <MapPin style={{ color: 'var(--light-green)', width: '22px', height: '22px' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>Prime Locations</strong>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>Best Locations</span>
          </div>
        </div>

        {/* Item 3 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <BadgePercent style={{ color: 'var(--light-green)', width: '22px', height: '22px' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>Best Price</strong>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>Market Competitive</span>
          </div>
        </div>

        {/* Item 4 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Headset style={{ color: 'var(--light-green)', width: '22px', height: '22px' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>Legal Support</strong>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>Expert Assistance</span>
          </div>
        </div>

      </section>

    </div>
  );
};

export default AboutUs;
