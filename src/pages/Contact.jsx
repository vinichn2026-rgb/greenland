import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import {
  ChevronRight, Phone, Mail, MapPin, Clock
} from 'lucide-react';

export const Contact = () => {
  const { setActivePage } = useContext(AppContext);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Your name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile.replace(/[-\s()]/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message text is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Submission failed');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', mobile: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="contact-page-container fade-in">

      {/* Breadcrumbs Header */}
      <header className="buyland-header" style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
        <div className="breadcrumb-nav" style={{ marginBottom: '0.75rem' }}>
          <span className="breadcrumb-link" onClick={() => setActivePage('home')}>Home</span>
          <ChevronRight className="breadcrumb-arrow" />
          <span className="breadcrumb-link active">Contact Us</span>
        </div>
      </header>

      {/* Main Contact Grid */}
      <div className="contact-main-grid">

        {/* Left Side: Contact Information and Social Links */}
        <div className="contact-left-col">
          <div className="contact-title-section" style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Contact Us</h1>
            <p style={{ color: 'var(--text-grey)', fontSize: '0.95rem', lineHeight: '1.5' }}>
              We're here to help you! Reach out to us for any queries or assistance.
            </p>
          </div>

          {/* Get In Touch Sidebar Card */}
          <div className="contact-info-card">
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Get In Touch</h3>
            <p style={{ color: 'var(--text-grey)', fontSize: '0.85rem', marginBottom: '1.75rem' }}>
              Feel free to contact us through any of the following channels.
            </p>

            {/* Info Channels */}
            <div className="contact-channels">

              {/* Phone Channel */}
              <div className="channel-row">
                <div className="channel-icon-box">
                  <Phone style={{ width: '18px', height: '18px' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.15rem' }}>Phone</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-grey)' }}>+91 99426 20101</p>
                </div>
              </div>

              {/* Email Channel */}
              <div className="channel-row">
                <div className="channel-icon-box">
                  <Mail style={{ width: '18px', height: '18px' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.15rem' }}>Email</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-grey)' }}>support@greenland.com</p>
                </div>
              </div>

              {/* Address Channel */}
              <div className="channel-row">
                <div className="channel-icon-box">
                  <MapPin style={{ width: '18px', height: '18px' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.15rem' }}>Address</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-grey)', lineHeight: '1.4' }}>
                    No: 12, Anna Salai, Chennai,<br />Tamil Nadu - 600002
                  </p>
                </div>
              </div>

              {/* Working Hours Channel */}
              <div className="channel-row">
                <div className="channel-icon-box">
                  <Clock style={{ width: '18px', height: '18px' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.15rem' }}>Working Hours</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-grey)', lineHeight: '1.4' }}>
                    Mon - Sat: 9:00 AM - 6:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

            </div>

            {/* Follow Us Section */}
            <div className="contact-follow-section" style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Follow Us</h4>
              <div className="contact-social-row">
                {/* Facebook circular button */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-btn"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                  </svg>
                </a>
                {/* Instagram circular button */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-btn"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                {/* Youtube circular button */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-btn"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Message Form and Map Visuals */}
        <div className="contact-right-col" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {/* Send Us a Message Card */}
          <div className="contact-form-card">
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>Send Us a Message</h3>

            {submitted && (
              <div style={{ backgroundColor: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                Thank you! Your message has been sent successfully. We will get back to you shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Row 1: Name and Email */}
              <div className="contact-form-row-2col">
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label htmlFor="name" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className={`contact-input ${errors.name ? 'error' : ''}`}
                  />
                  {errors.name && <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 500 }}>{errors.name}</span>}
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label htmlFor="email" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className={`contact-input ${errors.email ? 'error' : ''}`}
                  />
                  {errors.email && <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 500 }}>{errors.email}</span>}
                </div>
              </div>

              {/* Row 2: Mobile Number */}
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label htmlFor="mobile" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Mobile Number</label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter your mobile number"
                  className={`contact-input ${errors.mobile ? 'error' : ''}`}
                />
                {errors.mobile && <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 500 }}>{errors.mobile}</span>}
              </div>

              {/* Row 3: Subject */}
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label htmlFor="subject" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Enter subject"
                  className={`contact-input ${errors.subject ? 'error' : ''}`}
                />
                {errors.subject && <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 500 }}>{errors.subject}</span>}
              </div>

              {/* Row 4: Message */}
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label htmlFor="message" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className={`contact-input ${errors.message ? 'error' : ''}`}
                  style={{ minHeight: '120px', resize: 'vertical', fontFamily: 'inherit' }}
                />
                {errors.message && <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 500 }}>{errors.message}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="contact-submit-btn"
              >
                <span>Send Message</span>
              </button>

            </form>
          </div>

          {/* Location Map Card */}
          <div className="contact-map-card">
            {/* Map image background */}
            <img
              src="/images/mock_map.png"
              alt="GreenLand Office Location Map"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* Floating Marker Card */}
            <div className="floating-map-badge">
              {/* Red marker dot */}
              <div style={{ color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin style={{ width: '24px', height: '24px', fill: '#fee2e2' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                <strong style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>GreenLand</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-grey)', lineHeight: '1.3' }}>
                  No: 12, Anna Salai, Chennai, Tamil Nadu - 600002
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Contact;
