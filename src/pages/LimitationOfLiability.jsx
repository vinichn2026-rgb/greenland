import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  ChevronRight, ShieldCheck, Monitor, FileText, Users, Ban, TrendingUp, Cloud, Scale, Headset, Mail, Phone, Clock, ChevronDown, Check
} from 'lucide-react';

export const LimitationOfLiability = () => {
  const { setActivePage } = useContext(AppContext);
  const [activeSection, setActiveSection] = useState(5); // Active 5 by default as in image
  const [expanded, setExpanded] = useState(false);

  const sections = [
    {
      id: 1,
      title: 'Introduction',
      icon: ShieldCheck,
      content: 'This Limitation of Liability section describes the situations in which Thennadu Nilam and its team will not be liable for any losses or damages.'
    },
    {
      id: 2,
      title: 'Platform Availability',
      icon: Monitor,
      content: 'We do our best to ensure uninterrupted access to our platform. However, we do not guarantee that the website will be available at all times or error-free.'
    },
    {
      id: 3,
      title: 'Information Accuracy',
      icon: FileText,
      content: 'While we strive to provide accurate information, we do not guarantee the completeness, reliability, or accuracy of any property listings or content.'
    },
    {
      id: 4,
      title: 'Third-Party Services',
      icon: Users,
      content: 'Our platform may contain links to third-party websites or services. We are not responsible for their content, policies, or practices.'
    },
    {
      id: 5,
      title: 'No Indirect Liability',
      icon: Ban,
      content: 'Thennadu Nilam shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our website.'
    },
    {
      id: 6,
      title: 'Maximum Liability',
      icon: TrendingUp,
      content: 'Our total liability for any claims shall not exceed the amount paid by you, if any, to use our services.'
    },
    {
      id: 7,
      title: 'Force Majeure',
      icon: Cloud,
      content: 'We shall not be liable for any delay or failure to perform resulting from causes outside our reasonable control, including natural disasters, acts of war, or network failures.'
    },
    {
      id: 8,
      title: 'Jurisdiction',
      icon: Scale,
      content: 'These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Ramnad.'
    },
    {
      id: 9,
      title: 'Contact Us',
      icon: Headset,
      content: 'If you have any questions or concerns regarding our liability policy, please reach out to our legal support team.'
    }
  ];

  const handleSidebarClick = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId > 6) {
      setExpanded(true);
    }
    const element = document.getElementById(`liability-sec-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const visibleSections = expanded ? sections : sections.slice(0, 6);

  return (
    <div className="terms-page-container fade-in">
      
      {/* Breadcrumbs Header */}
      <header className="buyland-header" style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
        <div className="breadcrumb-nav" style={{ marginBottom: '0.75rem' }}>
          <span className="breadcrumb-link" onClick={() => setActivePage('home')}>Home</span>
          <ChevronRight className="breadcrumb-arrow" />
          <span className="breadcrumb-link" onClick={() => setActivePage('terms')}>Terms & Conditions</span>
          <ChevronRight className="breadcrumb-arrow" />
          <span className="breadcrumb-link active">Limitation of Liability</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Limitation of Liability</h1>
        <p style={{ color: 'var(--text-grey)', fontSize: '0.95rem' }}>
          Please read this section carefully to understand the extent of our liability.
        </p>
      </header>

      {/* Grid Layout */}
      <div className="terms-layout-grid">
        
        {/* Left Sidebar Menu */}
        <div className="terms-sidebar-column">
          
          <div className="terms-sidebar-menu">
            {sections.map((sec) => {
              const IconComp = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  className={`terms-sidebar-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleSidebarClick(sec.id)}
                >
                  <IconComp className="terms-sidebar-icon" />
                  <span>{sec.id}. {sec.title}</span>
                </button>
              );
            })}
          </div>

          {/* Transparent & Fair Badge */}
          <div className="terms-trust-badge">
            <div className="terms-trust-badge-icon-left">
              <ShieldCheck style={{ width: '20px', height: '20px', fill: '#dcfce7' }} />
            </div>
            <div className="terms-trust-badge-text">
              <h4>Transparent & Fair</h4>
              <p>We believe in clarity and fairness in everything we do.</p>
            </div>
          </div>

        </div>

        {/* Right Content Panel */}
        <div className="terms-content-card">
          
          <div className="terms-card-grid">
            
            {/* Sections list */}
            <div className="terms-sections-list">
              {visibleSections.map((sec) => {
                const isHighlighted = activeSection === sec.id;
                return (
                  <div 
                    key={sec.id} 
                    id={`liability-sec-${sec.id}`}
                    className={`terms-section-item ${isHighlighted ? 'highlighted' : ''}`}
                  >
                    <div className="terms-section-header">
                      <span className="terms-section-num">{sec.id}</span>
                      <h3>{sec.title}</h3>
                    </div>
                    <p className="terms-section-text">{sec.content}</p>
                  </div>
                );
              })}

              {/* Expander Button */}
              <div className="terms-expand-row">
                <button 
                  className="terms-expand-btn"
                  onClick={() => setExpanded(!expanded)}
                >
                  <span>{expanded ? 'Read Less' : 'Read Full Policy'}</span>
                  <ChevronDown style={{ width: '16px', height: '16px', transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
              </div>
            </div>

            {/* Illustration */}
            <div className="terms-illustration-col">
              <div className="terms-illustration-container">
                {/* Visual Plant Leaves */}
                <div className="terms-decor-leaf leaf-1"></div>
                <div className="terms-decor-leaf leaf-2"></div>
                
                {/* Clipboard */}
                <div className="terms-clipboard">
                  <div className="terms-clipboard-clip"></div>
                  <div className="terms-clipboard-sheet">
                    <h4 style={{ fontSize: '0.55rem' }}>LIMITATION OF<br />LIABILITY</h4>
                    
                    <div className="terms-sheet-lines">
                      <div className="terms-sheet-line">
                        <Check className="terms-line-check" />
                        <div className="terms-line-bar bar-long"></div>
                      </div>
                      <div className="terms-sheet-line">
                        <Check className="terms-line-check" />
                        <div className="terms-line-bar bar-mid"></div>
                      </div>
                      <div className="terms-sheet-line">
                        <Check className="terms-line-check" />
                        <div className="terms-line-bar bar-long"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Shield Badge */}
                <div className="terms-floating-shield">
                  <Check style={{ width: '14px', height: '14px', color: '#fff', strokeWidth: 3 }} />
                </div>

                {/* Scales of Justice SVG in front */}
                <div className="terms-scales-overlay">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="scales-vector-icon">
                    <line x1="12" y1="3" x2="12" y2="21" />
                    <line x1="9" y1="21" x2="15" y2="21" />
                    <line x1="5" y1="7" x2="19" y2="7" />
                    <line x1="5" y1="7" x2="2" y2="15" />
                    <line x1="5" y1="7" x2="8" y2="15" />
                    <path d="M2 15h6a3 3 0 0 1-6 0z" />
                    <line x1="19" y1="7" x2="16" y2="15" />
                    <line x1="19" y1="7" x2="22" y2="15" />
                    <path d="M16 15h6a3 3 0 0 1-6 0z" />
                  </svg>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Assistance Banner */}
      <div className="liability-help-banner">
        
        {/* Help title */}
        <div className="help-banner-cell main-cell">
          <div className="help-icon-circle-green">
            <Headset style={{ width: '20px', height: '20px', color: '#fff' }} />
          </div>
          <div className="help-cell-text">
            <strong>Need Help?</strong>
            <p>If you have any questions about this policy or need clarification, we're here to help.</p>
          </div>
        </div>

        {/* Info 1: Email Support */}
        <div className="help-banner-cell info-cell">
          <Mail className="help-info-icon" />
          <div className="help-cell-text">
            <strong>Email Support</strong>
            <p>Thennadunilam@gmail.com</p>
          </div>
        </div>

        {/* Info 2: Call Us */}
        <div className="help-banner-cell info-cell">
          <Phone className="help-info-icon" />
          <div className="help-cell-text">
            <strong>Call Us</strong>
            <p>+91 99426 20101</p>
          </div>
        </div>

        {/* Info 3: Support Hours */}
        <div className="help-banner-cell info-cell">
          <Clock className="help-info-icon" />
          <div className="help-cell-text">
            <strong>Support Hours</strong>
            <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
          </div>
        </div>

        {/* Button Action */}
        <button 
          className="terms-support-btn"
          onClick={() => setActivePage('contact')}
          style={{ alignSelf: 'center', flexShrink: 0 }}
        >
          <span>Contact Support</span>
          <ChevronRight style={{ width: '16px', height: '16px' }} />
        </button>

      </div>

    </div>
  );
};

export default LimitationOfLiability;
