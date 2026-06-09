import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import {
  User, Mail, Lock, Eye, EyeOff,
  Shield, Bell, Heart, Upload, CheckCircle2
} from 'lucide-react';

export const Register = () => {
  const { setActivePage } = useContext(AppContext);

  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    agreed: false,
  });

  const [showPassword, setShowPassword]         = useState(false);
  const [showConfirm, setShowConfirm]           = useState(false);
  const [errors, setErrors]                     = useState({});
  const [submitting, setSubmitting]             = useState(false);
  const [success, setSuccess]                   = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())            e.name = 'Full name is required';
    if (!form.email.trim())           e.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.mobile.trim())          e.mobile = 'Mobile number is required';
    else if (!/^\d{10}$/.test(form.mobile.replace(/\s/g, ''))) e.mobile = 'Enter a valid 10-digit number';
    if (!form.password)               e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword)        e.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    if (!form.agreed)                 e.agreed = 'You must agree to the Terms & Conditions';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors({ email: data.error || 'Registration failed' });
      } else {
        setSuccess(`Account created for ${form.name.trim()}! Redirecting to login...`);
        setTimeout(() => setActivePage('login'), 2000);
      }
    } catch {
      setErrors({ email: 'Server error. Make sure the backend is running.' });
    } finally {
      setSubmitting(false);
    }
  };

  const features = [
    { Icon: Heart,   title: 'Save Your Favorites',   desc: 'Save lands you love and view them anytime.' },
    { Icon: Bell,    title: 'Get Alerts',             desc: 'Receive updates on new lands and best deals.' },
    { Icon: Shield,  title: 'Secure & Easy',          desc: 'Your data is safe with us. Hassle-free experience.' },
    { Icon: Upload,  title: 'List Your Property',     desc: 'Easily list your land and reach thousands of buyers.' },
  ];

  const stats = [
    { value: '100%',  label: 'Verified' },
    { value: '1000+', label: 'Happy Customers' },
    { value: '50+',   label: 'Prime Locations' },
    { value: '10+',   label: 'Years Experience' },
  ];

  return (
    <div className="buyland-page-wrapper fade-in" style={{ paddingBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '85vh' }}>
      <div className="register-split-card">

        {/* ── LEFT PANEL ─────────────────────────────────────── */}
        <div className="register-left-panel">
          <div className="register-left-inner">
            <h2 className="register-left-title">
              Create Your <span style={{ color: 'var(--primary-green)' }}>Account</span>
            </h2>
            <p className="register-left-sub">Join GreenLand today and unlock amazing features.</p>

            <div className="register-features-list">
              {features.map(({ Icon, title, desc }) => (
                <div key={title} className="register-feature-item">
                  <div className="register-feature-icon">
                    <Icon style={{ width: '18px', height: '18px' }} />
                  </div>
                  <div>
                    <strong className="register-feature-title">{title}</strong>
                    <span className="register-feature-desc">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats bar */}
          <div className="register-stats-bar">
            {stats.map(({ value, label }) => (
              <div key={label} className="register-stat-item">
                <span className="register-stat-value">{value}</span>
                <span className="register-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL (FORM) ────────────────────────────── */}
        <div className="register-right-panel">
          <h3 className="register-form-title">Create Your Account</h3>
          <p className="register-form-sub">It's quick and easy.</p>

          {success && (
            <div className="register-success-banner">
              <CheckCircle2 style={{ width: '16px', height: '16px', flexShrink: 0 }} />
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

            {/* Row 1: Full Name + Email */}
            <div className="register-form-row">
              <div className="register-field">
                <label className="register-label">Full Name</label>
                <div className="register-input-wrap">
                  <User className="register-input-icon" />
                  <input
                    type="text" name="name" value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`register-input ${errors.name ? 'input-error' : ''}`}
                  />
                </div>
                {errors.name && <span className="register-error">{errors.name}</span>}
              </div>

              <div className="register-field">
                <label className="register-label">Email Address</label>
                <div className="register-input-wrap">
                  <Mail className="register-input-icon" />
                  <input
                    type="email" name="email" value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`register-input ${errors.email ? 'input-error' : ''}`}
                  />
                </div>
                {errors.email && <span className="register-error">{errors.email}</span>}
              </div>
            </div>

            {/* Row 2: Mobile + Password */}
            <div className="register-form-row">
              <div className="register-field">
                <label className="register-label">Mobile Number</label>
                <div className="register-input-wrap register-mobile-wrap">
                  {/* Country code selector */}
                  <div className="register-country-badge">
                    <span style={{ fontSize: '1.1rem' }}>🇮🇳</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>+91</span>
                  </div>
                  <input
                    type="tel" name="mobile" value={form.mobile}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    className={`register-input register-mobile-input ${errors.mobile ? 'input-error' : ''}`}
                    maxLength={10}
                  />
                </div>
                {errors.mobile && <span className="register-error">{errors.mobile}</span>}
              </div>

              <div className="register-field">
                <label className="register-label">Password</label>
                <div className="register-input-wrap">
                  <Lock className="register-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password" value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`register-input ${errors.password ? 'input-error' : ''}`}
                    style={{ paddingRight: '2.5rem' }}
                  />
                  <button type="button" className="register-eye-btn" onClick={() => setShowPassword(p => !p)}>
                    {showPassword ? <EyeOff style={{ width: '16px', height: '16px' }} /> : <Eye style={{ width: '16px', height: '16px' }} />}
                  </button>
                </div>
                {errors.password && <span className="register-error">{errors.password}</span>}
              </div>
            </div>

            {/* Row 3: Confirm Password */}
            <div className="register-field">
              <label className="register-label">Confirm Password</label>
              <div className="register-input-wrap">
                <Lock className="register-input-icon" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword" value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={`register-input ${errors.confirmPassword ? 'input-error' : ''}`}
                  style={{ paddingRight: '2.5rem' }}
                />
                <button type="button" className="register-eye-btn" onClick={() => setShowConfirm(p => !p)}>
                  {showConfirm ? <EyeOff style={{ width: '16px', height: '16px' }} /> : <Eye style={{ width: '16px', height: '16px' }} />}
                </button>
              </div>
              {errors.confirmPassword && <span className="register-error">{errors.confirmPassword}</span>}
            </div>

            {/* Terms checkbox */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label className="register-terms-label">
                <input
                  type="checkbox" name="agreed"
                  checked={form.agreed} onChange={handleChange}
                  className="register-checkbox"
                />
                <span>
                  I agree to the{' '}
                  <span
                    style={{ color: 'var(--primary-green)', fontWeight: 700, cursor: 'pointer' }}
                    onClick={() => setActivePage('terms')}
                  >Terms &amp; Conditions</span>
                  {' '}and{' '}
                  <span style={{ color: 'var(--primary-green)', fontWeight: 700, cursor: 'pointer' }}>
                    Privacy Policy
                  </span>
                </span>
              </label>
              {errors.agreed && <span className="register-error" style={{ marginLeft: '1.5rem' }}>{errors.agreed}</span>}
            </div>

            {/* Register button */}
            <button
              type="submit"
              className="register-submit-btn"
              disabled={submitting}
              style={{ opacity: submitting ? 0.75 : 1 }}
            >
              {submitting ? 'Creating Account...' : 'Register'}
            </button>

          </form>

          {/* OR divider */}
          <div className="register-or-divider">
            <div className="register-or-line" />
            <span>OR</span>
            <div className="register-or-line" />
          </div>

          {/* Social buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <button
              className="register-social-btn"
              onClick={() => alert('Google OAuth coming soon...')}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <button
              className="register-social-btn"
              onClick={() => alert('Facebook OAuth coming soon...')}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </button>
          </div>

          {/* Already have account link */}
          <p className="register-login-link">
            Already have an account?{' '}
            <span onClick={() => setActivePage('login')}>Login</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;
