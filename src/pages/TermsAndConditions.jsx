import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  ChevronRight, FileText, Globe, Home, User, CreditCard, Lock, Shield, Edit3, Headset, ChevronDown, Check
} from 'lucide-react';

export const TermsAndConditions = () => {
  const { setActivePage } = useContext(AppContext);
  const [activeSection, setActiveSection] = useState(1);
  const [expanded, setExpanded] = useState(false);

  const sections = [
    {
      id: 1,
      title: 'Introduction',
      icon: FileText,
      content: 'Welcome to Thennadu Nilam. By accessing or using our website, you agree to comply with and be bound by these Terms & Conditions. Please read them carefully.'
    },
    {
      id: 2,
      title: 'Use of Website',
      icon: Globe,
      content: 'You agree to use Thennadu Nilam only for lawful purposes. You must not use our website in any way that may damage, disable, overburden, or impair the site or interfere with any other party\'s use.'
    },
    {
      id: 3,
      title: 'Property Listings',
      icon: Home,
      content: 'All property listings are subject to availability and verification. We do not guarantee the accuracy, completeness, or reliability of any listing.'
    },
    {
      id: 4,
      title: 'User Responsibilities',
      icon: User,
      content: 'Users are responsible for maintaining the confidentiality of their account and for all activities that occur under their account.'
    },
    {
      id: 5,
      title: 'Payments & Transactions',
      icon: CreditCard,
      content: 'All payments must be made through secure and trusted channels. Thennadu Nilam is not responsible for any third-party transactions.'
    },
    {
      id: 6,
      title: 'Privacy Policy',
      icon: Lock,
      content: 'Your privacy is important to us. Our Privacy Policy governs the collection, use, and disclosure of your personal information. Please review it to understand our practices.'
    },
    {
      id: 7,
      title: 'Limitation of Liability',
      icon: Shield,
      content: 'Thennadu Nilam and its affiliates will not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of the website.'
    },
    {
      id: 8,
      title: 'Changes to Terms',
      icon: Edit3,
      content: 'We reserve the right to modify these Terms & Conditions at any time. Any changes will be posted on this page and will become effective immediately upon publication.'
    },
    {
      id: 9,
      title: 'Contact Us',
      icon: Headset,
      content: 'If you have any questions or concerns regarding these Terms & Conditions, please reach out to our support team at Thennadunilam@gmail.com.'
    }
  ];

  const handleSidebarClick = (sectionId) => {
    if (sectionId === 7) {
      setActivePage('liability');
      return;
    }
    setActiveSection(sectionId);
    if (sectionId > 5) {
      setExpanded(true);
    }
    const element = document.getElementById(`terms-sec-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Determine sections to show in list based on expanded state
  const visibleSections = expanded ? sections : sections.slice(0, 5);

  return (
    <div className="terms-page-container fade-in">
      
      {/* Breadcrumbs Header */}
      <header className="buyland-header" style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
        <div className="breadcrumb-nav" style={{ marginBottom: '0.75rem' }}>
          <span className="breadcrumb-link" onClick={() => setActivePage('home')}>Home</span>
          <ChevronRight className="breadcrumb-arrow" />
          <span className="breadcrumb-link active">Terms & Conditions</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Terms & Conditions</h1>
        <p style={{ color: 'var(--text-grey)', fontSize: '0.95rem' }}>
          Please read these terms and conditions carefully before using Thennadu Nilam.
        </p>
      </header>

      {/* Grid Layout */}
      <div className="terms-layout-grid">
        
        {/* Left Sidebar Columns */}
        <div className="terms-sidebar-column">
          
          {/* Menu Card */}
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

          {/* Bottom Trust Badge */}
          <div className="terms-trust-badge">
            <div className="terms-trust-badge-icon-left">
              <Shield style={{ width: '20px', height: '20px', fill: '#dcfce7' }} />
            </div>
            <div className="terms-trust-badge-text">
              <h4>Safe & Secure</h4>
              <p>Your trust and security are our top priorities.</p>
            </div>
            <div className="terms-trust-badge-icon-right">
              <Shield className="shield-outline" style={{ width: '24px', height: '24px', opacity: 0.15 }} />
            </div>
          </div>

        </div>

        {/* Right Main Panel Card */}
        <div className="terms-content-card">
          
          {/* Grid for Content list + Illustration */}
          <div className="terms-card-grid">
            
            {/* Left side list */}
            <div className="terms-sections-list">
              {visibleSections.map((sec) => {
                const isHighlighted = activeSection === sec.id;
                const isLiability = sec.id === 7;
                return (
                  <div 
                    key={sec.id} 
                    id={`terms-sec-${sec.id}`}
                    className={`terms-section-item ${isHighlighted ? 'highlighted' : ''}`}
                    onClick={() => {
                      if (isLiability) setActivePage('liability');
                    }}
                    style={isLiability ? { cursor: 'pointer' } : {}}
                  >
                    <div className="terms-section-header">
                      <span className="terms-section-num">{sec.id}</span>
                      <h3 style={isLiability ? { color: 'var(--primary-green)', textDecoration: 'underline' } : {}}>{sec.title}</h3>
                      {isLiability && <ChevronRight style={{ width: '16px', height: '16px', color: 'var(--secondary-green)', marginLeft: 'auto' }} />}
                    </div>
                    <p className="terms-section-text">{sec.content}</p>
                  </div>
                );
              })}

              {/* Read Full Terms button */}
              <div className="terms-expand-row">
                <button 
                  className="terms-expand-btn"
                  onClick={() => setExpanded(!expanded)}
                >
                  <span>{expanded ? 'Read Less' : 'Read Full Terms'}</span>
                  <ChevronDown style={{ width: '16px', height: '16px', transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
              </div>
            </div>

            {/* Right side Illustration Card */}
            <div className="terms-illustration-col">
              <div className="terms-illustration-container">
                {/* Visual Plant Leaves behind */}
                <div className="terms-decor-leaf leaf-1"></div>
                <div className="terms-decor-leaf leaf-2"></div>
                
                {/* Paper clipboard */}
                <div className="terms-clipboard">
                  {/* Clip at top */}
                  <div className="terms-clipboard-clip"></div>
                  
                  {/* Paper sheet */}
                  <div className="terms-clipboard-sheet">
                    <h4>TERMS &<br />CONDITIONS</h4>
                    
                    {/* Checklist lines */}
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
                      <div className="terms-sheet-line">
                        <Check className="terms-line-check" />
                        <div className="terms-line-bar bar-short"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Shield Badge */}
                <div className="terms-floating-shield">
                  <Check style={{ width: '14px', height: '14px', color: '#fff', strokeWidth: 3 }} />
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Help Desk Banner */}
      <div className="terms-help-banner">
        <div className="terms-help-left">
          <div className="terms-help-icon-circle">
            <Headset style={{ width: '20px', height: '20px', color: '#fff' }} />
          </div>
          <div className="terms-help-text">
            <strong>Need Help?</strong>
            <span>If you have any questions about these Terms & Conditions, feel free to contact us.</span>
          </div>
        </div>
        <button 
          className="terms-support-btn"
          onClick={() => setActivePage('contact')}
        >
          <span>Contact Support</span>
          <ChevronRight style={{ width: '16px', height: '16px' }} />
        </button>
      </div>

    </div>
  );
};

export default TermsAndConditions;
