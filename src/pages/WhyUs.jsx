import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  ChevronRight, ShieldCheck, TrendingUp, FileText, Check, X, Search, Compass, MapPin
} from 'lucide-react';

export const WhyUs = () => {
  const { setActivePage } = useContext(AppContext);

  const pillars = [
    {
      id: 1,
      title: '100% Legal Verification',
      desc: 'Every listed plot undergoes strict verification of title deeds, encumbrance certificates (EC), and DTCP/RERA approvals so you can buy with complete peace of mind.',
      icon: ShieldCheck,
      color: '#15803d'
    },
    {
      id: 2,
      title: 'Zero Brokerage Fees',
      desc: 'Save thousands on high commissions. We connect you directly with developers and verified landowners for transparent, middleman-free negotiations.',
      icon: Compass,
      color: '#0d9488'
    },
    {
      id: 3,
      title: 'Prime Growth Hubs',
      desc: 'We curate plot listings strictly in high-appreciation zones across Tamil Nadu (such as Oragadam, Kelambakkam, Vandalur) to guarantee high ROI.',
      icon: TrendingUp,
      color: '#22c55e'
    },
    {
      id: 4,
      title: 'Post-Purchase Patta Support',
      desc: 'Our relationship doesn\'t end at closing. Our in-house legal experts assist you with patta transfer, registration paperwork, and site documentation.',
      icon: FileText,
      color: '#0b4a1b'
    }
  ];

  const journeySteps = [
    {
      step: '01',
      title: 'Search & Filter',
      desc: 'Browse hundreds of plots matching your criteria. Use our advanced location, budget, and approval filters to shortlist properties in seconds.',
      icon: Search
    },
    {
      step: '02',
      title: 'Free Site Visit',
      desc: 'Schedule a physical site inspection at your convenience. Our coordinators will assist you with plot layouts and boundary markings on site.',
      icon: MapPin
    },
    {
      step: '03',
      title: 'Verify Title Deeds',
      desc: 'Access legal opinions, parent document chains, and approval papers directly. View clear title clearances vetted by our legal team.',
      icon: ShieldCheck
    },
    {
      step: '04',
      title: 'Direct Purchase & Registration',
      desc: 'Deal directly with the owner to sign the sale agreement. We stand by you during sub-registrar office registration and patta transfer.',
      icon: FileText
    }
  ];

  return (
    <div className="terms-page-container fade-in" style={{ paddingBottom: '4rem' }}>
      
      {/* Breadcrumbs Header */}
      <header className="buyland-header" style={{ marginTop: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="breadcrumb-nav" style={{ marginBottom: '0.75rem' }}>
          <span className="breadcrumb-link" onClick={() => setActivePage('home')}>Home</span>
          <ChevronRight className="breadcrumb-arrow" />
          <span className="breadcrumb-link active">Why Us</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
          Why Choose GreenLand?
        </h1>
        <p style={{ color: 'var(--text-grey)', fontSize: '1rem', maxWidth: '700px', lineHeight: '1.6' }}>
          We are Tamil Nadu's most trusted vacant land marketplace. We combine legal vetting, zero brokerage, and expert support to deliver a modern, secure land investment experience.
        </p>
      </header>

      {/* Pillars Section */}
      <section className="why-pillars-grid" style={{ marginBottom: '4rem' }}>
        {pillars.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.id} className="why-pillar-card">
              <div className="why-pillar-icon-box" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                <IconComponent style={{ width: '22px', height: '22px' }} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          );
        })}
      </section>

      {/* Comparison Chart Matrix */}
      <section className="why-comparison-section" style={{ marginBottom: '4.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            A Smarter Way to Buy Land
          </h2>
          <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem' }}>
            See how GreenLand compares with traditional land brokers.
          </p>
        </div>

        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Parameters</th>
                <th className="highlight-col header-highlight">The GreenLand Platform</th>
                <th>Traditional Brokers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Litigation & Ownership Risk</strong></td>
                <td className="highlight-col">
                  <div className="comparison-cell green-cell">
                    <Check className="comparison-icon tick" />
                    <span>100% Legal Clearances Vetted</span>
                  </div>
                </td>
                <td>
                  <div className="comparison-cell">
                    <X className="comparison-icon cross" />
                    <span>Buyer’s Sole Responsibility</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td><strong>Brokerage Fee / Commission</strong></td>
                <td className="highlight-col">
                  <div className="comparison-cell green-cell">
                    <Check className="comparison-icon tick" />
                    <span>0% Fee — Direct Owner Deal</span>
                  </div>
                </td>
                <td>
                  <div className="comparison-cell">
                    <X className="comparison-icon cross" />
                    <span>2% to 3% Hidden Charges</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td><strong>Approvals Verification</strong></td>
                <td className="highlight-col">
                  <div className="comparison-cell green-cell">
                    <Check className="comparison-icon tick" />
                    <span>Strict DTCP / RERA Checks</span>
                  </div>
                </td>
                <td>
                  <div className="comparison-cell">
                    <X className="comparison-icon cross" />
                    <span>Unclear and Unvetted Claims</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td><strong>Patta Transfer Assistance</strong></td>
                <td className="highlight-col">
                  <div className="comparison-cell green-cell">
                    <Check className="comparison-icon tick" />
                    <span>Complete Legal Help Vetted</span>
                  </div>
                </td>
                <td>
                  <div className="comparison-cell">
                    <X className="comparison-icon cross" />
                    <span>No Help After Transaction</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td><strong>Site Layout Accuracy</strong></td>
                <td className="highlight-col">
                  <div className="comparison-cell green-cell">
                    <Check className="comparison-icon tick" />
                    <span>Vetted layout boundaries</span>
                  </div>
                </td>
                <td>
                  <div className="comparison-cell">
                    <X className="comparison-icon cross" />
                    <span>Unmarked, unclear alignments</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Customer Journey Timeline */}
      <section className="why-journey-section" style={{ marginBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            Your Journey to Land Ownership
          </h2>
          <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem' }}>
            We guide you step-by-step from choosing your plot to completing documentation.
          </p>
        </div>

        <div className="why-timeline-wrapper">
          <div className="why-timeline-line"></div>
          
          <div className="why-timeline-grid">
            {journeySteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={index} className="why-timeline-card">
                  <div className="timeline-badge-num">{step.step}</div>
                  <div className="timeline-icon-circle">
                    <StepIcon style={{ width: '20px', height: '20px', color: 'var(--secondary-green)' }} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="why-cta-card">
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem' }}>
          Ready to Invest in Your Future?
        </h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', marginBottom: '1.75rem', maxWidth: '600px', margin: '0 auto 1.75rem auto', lineHeight: '1.5' }}>
          Browse our collection of DTCP-approved residential plots and agricultural farm lands in Chennai and prime Tamil Nadu regions.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            className="why-cta-btn-primary"
            onClick={() => setActivePage('buyland')}
          >
            Browse Properties
          </button>
          <button 
            className="why-cta-btn-secondary"
            onClick={() => setActivePage('contact')}
          >
            Speak with an Expert
          </button>
        </div>
      </section>

    </div>
  );
};

export default WhyUs;
