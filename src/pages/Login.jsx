import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Mail, Lock, Eye, EyeOff, Heart, MessageSquare, Home as HomeIcon, Check 
} from 'lucide-react';

export const Login = () => {
  const { setActivePage } = useContext(AppContext);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in both Email and Password fields.');
      return;
    }

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed. Please check your credentials.');
        return;
      }

      // Successful login
      alert(`✅ Welcome back, ${data.name || data.email}!`);
      setActivePage('home');
    } catch (err) {
      setError('Server error. Please make sure the backend is running.');
    }
  };

  return (
    <div className="buyland-page-wrapper fade-in" style={{ paddingBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      
      <div className="login-split-card glass-panel" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '0', overflow: 'hidden', maxWidth: '1050px', width: '100%', border: '1px solid #e2e8f0', backgroundColor: '#fff', borderRadius: '16px' }}>
        
        {/* Left Side: Welcome Banner with Background and bullets list */}
        <div 
          className="login-welcome-banner" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.82), rgba(248, 250, 252, 0.85)), url('/images/green_fields_bg.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '3rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRight: '1px solid #e2e8f0'
          }}
        >
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '0.25rem' }}>
            Welcome Back!
          </h2>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-grey)', marginBottom: '3rem' }}>
            Login to your account
          </p>

          {/* Benefit items list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Item 1 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div className="why-icon-box" style={{ width: '42px', height: '42px', backgroundColor: 'var(--primary-green)', color: '#fff', borderRadius: '50%' }}>
                <Heart style={{ width: '18px', height: '18px', fill: '#fff' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>Access your saved properties</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-grey)' }}>View and manage your favorite lands.</span>
              </div>
            </div>

            {/* Item 2 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div className="why-icon-box" style={{ width: '42px', height: '42px', backgroundColor: 'var(--primary-green)', color: '#fff', borderRadius: '50%' }}>
                <MessageSquare style={{ width: '18px', height: '18px', fill: '#fff' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>Track your enquiries</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-grey)' }}>Keep track of your messages and responses.</span>
              </div>
            </div>

            {/* Item 3 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div className="why-icon-box" style={{ width: '42px', height: '42px', backgroundColor: 'var(--primary-green)', color: '#fff', borderRadius: '50%' }}>
                <HomeIcon style={{ width: '18px', height: '18px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>List and manage your properties</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-grey)' }}>Add, edit and manage your land listings easily.</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Login Credentials input form */}
        <div className="login-form-side" style={{ padding: '3.5rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '2rem' }}>
            Login to Your Account
          </h3>

          {error && <div className="modal-error-message" style={{ marginBottom: '1.5rem' }}>{error}</div>}

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Email Address */}
            <div className="filter-form-field">
              <label>Email Address</label>
              <div className="input-container">
                <Mail className="input-icon" />
                <input 
                  type="email"
                  placeholder="Enter your email"
                  className="form-input"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="filter-form-field">
              <label>Password</label>
              <div className="input-container">
                <Lock className="input-icon" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="form-input"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  style={{ paddingRight: '2.5rem' }}
                />
                <button 
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{ position: 'absolute', right: '0.75rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-light)', display: 'flex', alignItems: 'center' }}
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showPassword ? <EyeOff style={{ width: '18px', height: '18px' }} /> : <Eye style={{ width: '18px', height: '18px' }} />}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', fontWeight: 600 }}>
              <label className="checkbox-item-label">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <span>Remember Me</span>
              </label>
              <a href="#forgot" style={{ color: 'var(--primary-green)', textDecoration: 'none' }}>Forgot Password?</a>
            </div>

            {/* Submit Button */}
            <button type="submit" className="search-submit-btn" style={{ padding: '0.85rem', fontSize: '0.95rem', borderRadius: '6px', marginTop: '0.5rem' }}>
              Login
            </button>

          </form>

          {/* Social Logins */}
          <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
            <span style={{ padding: '0 0.75rem' }}>OR</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* Google OAuth button */}
            <button 
              className="filter-reset-btn" 
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', fontSize: '0.85rem', padding: '0.75rem', borderColor: '#cbd5e1', color: 'var(--text-dark)' }}
              onClick={() => alert("Connecting with Google Account...")}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Facebook OAuth button */}
            <button 
              className="filter-reset-btn" 
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', fontSize: '0.85rem', padding: '0.75rem', borderColor: '#cbd5e1', color: 'var(--text-dark)' }}
              onClick={() => alert("Connecting with Facebook Account...")}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Continue with Facebook</span>
            </button>
          </div>

          {/* Register link */}
          <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-grey)' }}>
            Don't have an account?{' '}
            <span
              style={{ color: 'var(--primary-green)', cursor: 'pointer' }}
              onClick={() => setActivePage('register')}
            >
              Register
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;
