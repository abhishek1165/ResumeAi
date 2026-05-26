import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Eye, EyeOff, Mail, Lock, ArrowRight, CheckCircle,
  Zap, TrendingUp, Award, Shield, Globe, Code2, Link2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const redirectTo = (location.state as { from?: string })?.from || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);
    if (result.success) {
      navigate(redirectTo, { replace: true });
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }
  };

  const floatingCards = [
    { id: 1, icon: <Award size={18} />, title: 'ATS Score', value: '87/100', sub: '+12 from last scan', color: 'cyan' },
    { id: 2, icon: <TrendingUp size={18} />, title: 'Keyword Match', value: '94%', sub: 'Above average', color: 'purple' },
    { id: 3, icon: <Zap size={18} />, title: 'Skills Detected', value: '23', sub: '3 trending skills', color: 'emerald' },
    { id: 4, icon: <CheckCircle size={18} />, title: 'Interviews', value: '3x', sub: 'More call-backs', color: 'cyan' },
  ];

  return (
    <div className={`lp-root ${mounted ? 'lp-mounted' : ''}`}>
      {/* LEFT BRANDING PANEL */}
      <div className="lp-left">
        <div className="lp-mesh">
          <div className="lp-orb lp-orb-1" />
          <div className="lp-orb lp-orb-2" />
          <div className="lp-orb lp-orb-3" />
        </div>
        <div className="lp-grid-overlay" />
        <div className="lp-left-content">
          <div className="lp-logo">
            <div className="lp-logo-icon"><Shield size={22} /></div>
            <span className="lp-logo-text">ResumeIQ AI</span>
          </div>
          <div className="lp-hero">
            <h1 className="lp-hero-title">
              Land Your{' '}
              <span className="lp-gradient-text">Dream Job</span>
              <br />With AI Precision
            </h1>
            <p className="lp-hero-sub">
              Analyze, optimize, and perfect your resume with our intelligent
              AI engine. Trusted by 50,000+ professionals worldwide.
            </p>
          </div>
          <div className="lp-cards">
            {floatingCards.map((card, delay) => (
              <div key={card.id} className={`lp-stat-card lp-stat-card--${card.color}`} style={{ animationDelay: `${delay * 0.3}s` }}>
                <div className={`lp-stat-icon lp-stat-icon--${card.color}`}>{card.icon}</div>
                <div className="lp-stat-body">
                  <div className="lp-stat-label">{card.title}</div>
                  <div className="lp-stat-value">{card.value}</div>
                  <div className="lp-stat-sub">{card.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="lp-badges">
            {['SOC 2 Compliant', '256-bit Encryption', 'GDPR Ready'].map(b => (
              <div key={b} className="lp-badge"><CheckCircle size={14} /><span>{b}</span></div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="lp-right">
        <div className="lp-form-wrap">
          <div className="lp-form-header">
            <h2 className="lp-form-title">Welcome back</h2>
            <p className="lp-form-subtitle">Sign in to your ResumeIQ AI account</p>
          </div>

          {error && (
            <div className="lp-error-banner">
              <span>⚠</span> {error}
            </div>
          )}

          <form className="lp-form" onSubmit={handleSubmit} noValidate>
            <div className={`lp-field ${focusedField === 'email' ? 'lp-field--focused' : ''} ${email ? 'lp-field--filled' : ''}`}>
              <label className="lp-label" htmlFor="login-email">Email Address</label>
              <div className="lp-input-wrap">
                <span className="lp-input-icon"><Mail size={16} /></span>
                <input id="login-email" type="email" className="lp-input"
                  placeholder="you@example.com" value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="email" />
              </div>
            </div>

            <div className={`lp-field ${focusedField === 'password' ? 'lp-field--focused' : ''} ${password ? 'lp-field--filled' : ''}`}>
              <label className="lp-label" htmlFor="login-password">Password</label>
              <div className="lp-input-wrap">
                <span className="lp-input-icon"><Lock size={16} /></span>
                <input id="login-password" type={showPassword ? 'text' : 'password'}
                  className="lp-input" placeholder="••••••••" value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="current-password" />
                <button type="button" className="lp-toggle-eye" onClick={() => setShowPassword(v => !v)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="lp-options">
              <span />
              <Link to="/forgot-password" className="lp-forgot">Forgot password?</Link>
            </div>

            <button type="submit" className={`lp-submit-btn ${isLoading ? 'lp-submit-btn--loading' : ''}`} disabled={isLoading}>
              {isLoading ? <span className="lp-spinner" /> : <><span>Sign In</span><ArrowRight size={18} /></>}
            </button>
          </form>

          <div className="lp-divider">
            <span className="lp-divider-line" />
            <span className="lp-divider-text">or continue with</span>
            <span className="lp-divider-line" />
          </div>

          <div className="lp-socials">
            <button className="lp-social-btn" type="button"><Globe size={18} /><span>Google</span></button>
            <button className="lp-social-btn" type="button"><Code2 size={18} /><span>GitHub</span></button>
            <button className="lp-social-btn" type="button"><Link2 size={18} /><span>LinkedIn</span></button>
          </div>

          <p className="lp-signup-prompt">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="lp-signup-link">Create one free →</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
