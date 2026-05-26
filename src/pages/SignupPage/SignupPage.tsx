import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle,
  BarChart2, FileText, Star, Sparkles, Shield, Globe, Code2, Link2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './SignupPage.css';

type PasswordStrength = 0 | 1 | 2 | 3 | 4;

const getPasswordStrength = (p: string): PasswordStrength => {
  if (!p) return 0;
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s as PasswordStrength;
};

const strengthLabels: Record<PasswordStrength, string> = { 0: '', 1: 'Weak', 2: 'Fair', 3: 'Good', 4: 'Strong' };
const strengthColors: Record<PasswordStrength, string> = { 0: 'transparent', 1: '#ef4444', 2: '#f59e0b', 3: '#06b6d4', 4: '#10b981' };

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!fullName.trim()) { setError('Full name is required.'); return; }
    if (!email.trim()) { setError('Email is required.'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (!agreeTerms) { setError('Please accept the Terms of Service to continue.'); return; }

    setIsLoading(true);
    const result = await signup(fullName, email, password);
    setIsLoading(false);
    if (result.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError(result.error || 'Signup failed. Please try again.');
    }
  };

  const floatingCards = [
    { id: 1, icon: <BarChart2 size={18} />, title: 'Resume Score', before: '52%', after: '91%', color: 'purple' },
    { id: 2, icon: <FileText size={18} />, title: 'ATS Pass Rate', before: '38%', after: '89%', color: 'cyan' },
    { id: 3, icon: <Star size={18} />, title: 'Interviews', before: '1', after: '4', color: 'emerald' },
    { id: 4, icon: <Sparkles size={18} />, title: 'Job Offers', before: '0', after: '2', color: 'purple' },
  ];

  return (
    <div className={`sp-root ${mounted ? 'sp-mounted' : ''}`}>
      {/* LEFT */}
      <div className="sp-left">
        <div className="sp-mesh">
          <div className="sp-orb sp-orb-1" /><div className="sp-orb sp-orb-2" /><div className="sp-orb sp-orb-3" />
        </div>
        <div className="sp-grid-overlay" />
        <div className="sp-left-content">
          <div className="sp-logo">
            <div className="sp-logo-icon"><Shield size={22} /></div>
            <span className="sp-logo-text">ResumeIQ AI</span>
          </div>
          <div className="sp-hero">
            <h1 className="sp-hero-title">Transform Your{' '}<span className="sp-gradient-text">Career</span><br />Starting Today</h1>
            <p className="sp-hero-sub">Join 50,000+ professionals who supercharged their job search with AI-driven resume analysis and optimization.</p>
          </div>
          <div className="sp-cards">
            {floatingCards.map((card, i) => (
              <div key={card.id} className={`sp-stat-card sp-stat-card--${card.color}`} style={{ animationDelay: `${i * 0.4}s` }}>
                <div className={`sp-stat-icon sp-stat-icon--${card.color}`}>{card.icon}</div>
                <div className="sp-stat-body">
                  <div className="sp-stat-label">{card.title}</div>
                  <div className="sp-stat-compare">
                    <span className="sp-stat-before">{card.before}</span>
                    <span className="sp-stat-arrow">→</span>
                    <span className={`sp-stat-after sp-stat-after--${card.color}`}>{card.after}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="sp-features">
            {['Free forever plan available', 'No credit card required', 'AI-powered instant feedback', 'Cancel anytime'].map(f => (
              <div key={f} className="sp-feature-item"><CheckCircle size={15} /><span>{f}</span></div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="sp-right">
        <div className="sp-form-wrap">
          <div className="sp-form-header">
            <h2 className="sp-form-title">Create Account</h2>
            <p className="sp-form-subtitle">Start your AI-powered journey today</p>
          </div>

          {error && <div className="lp-error-banner" style={{ marginBottom: 16 }}><span>⚠</span> {error}</div>}

          <form className="sp-form" onSubmit={handleSubmit} noValidate>
            <div className={`sp-field ${focusedField === 'name' ? 'sp-field--focused' : ''}`}>
              <label className="sp-label" htmlFor="signup-name">Full Name</label>
              <div className="sp-input-wrap">
                <span className="sp-input-icon"><User size={16} /></span>
                <input id="signup-name" type="text" className="sp-input" placeholder="John Doe"
                  value={fullName} onChange={e => setFullName(e.target.value)}
                  onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)} />
              </div>
            </div>

            <div className={`sp-field ${focusedField === 'email' ? 'sp-field--focused' : ''}`}>
              <label className="sp-label" htmlFor="signup-email">Email Address</label>
              <div className="sp-input-wrap">
                <span className="sp-input-icon"><Mail size={16} /></span>
                <input id="signup-email" type="email" className="sp-input" placeholder="you@example.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} />
              </div>
            </div>

            <div className={`sp-field ${focusedField === 'password' ? 'sp-field--focused' : ''}`}>
              <label className="sp-label" htmlFor="signup-password">Password</label>
              <div className="sp-input-wrap">
                <span className="sp-input-icon"><Lock size={16} /></span>
                <input id="signup-password" type={showPassword ? 'text' : 'password'}
                  className="sp-input" placeholder="Min 8 characters"
                  value={password} onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField(null)} />
                <button type="button" className="sp-toggle-eye" onClick={() => setShowPassword(v => !v)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {password.length > 0 && (
                <div className="sp-strength-wrap">
                  <div className="sp-strength-bar">
                    {([1, 2, 3, 4] as PasswordStrength[]).map(level => (
                      <div key={level} className="sp-strength-segment"
                        style={{ background: passwordStrength >= level ? strengthColors[passwordStrength] : 'rgba(255,255,255,0.08)', transition: 'background 0.3s' }} />
                    ))}
                  </div>
                  <span className="sp-strength-label" style={{ color: strengthColors[passwordStrength] }}>
                    {strengthLabels[passwordStrength]}
                  </span>
                </div>
              )}
            </div>

            <div className={`sp-field ${focusedField === 'confirm' ? 'sp-field--focused' : ''}`}>
              <label className="sp-label" htmlFor="signup-confirm">Confirm Password</label>
              <div className="sp-input-wrap">
                <span className="sp-input-icon"><Lock size={16} /></span>
                <input id="signup-confirm" type={showConfirm ? 'text' : 'password'}
                  className="sp-input" placeholder="Re-enter password"
                  value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedField('confirm')} onBlur={() => setFocusedField(null)} />
                <button type="button" className="sp-toggle-eye" onClick={() => setShowConfirm(v => !v)}>
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="sp-terms-wrap">
              <label className="sp-terms-label">
                <input type="checkbox" className="sp-checkbox" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} />
                <span className="sp-checkbox-custom" />
                <span className="sp-terms-text">
                  I agree to the <a href="#" className="sp-terms-link">Terms of Service</a> and <a href="#" className="sp-terms-link">Privacy Policy</a>
                </span>
              </label>
            </div>

            <button type="submit" className={`sp-submit-btn ${isLoading ? 'sp-submit-btn--loading' : ''}`} disabled={isLoading}>
              {isLoading ? <span className="sp-spinner" /> : <><span>Create Account</span><ArrowRight size={18} /></>}
            </button>
          </form>

          <div className="sp-divider">
            <span className="sp-divider-line" /><span className="sp-divider-text">or sign up with</span><span className="sp-divider-line" />
          </div>
          <div className="sp-socials">
            <button className="sp-social-btn" type="button"><Globe size={18} /><span>Google</span></button>
            <button className="sp-social-btn" type="button"><Code2 size={18} /><span>GitHub</span></button>
            <button className="sp-social-btn" type="button"><Link2 size={18} /><span>LinkedIn</span></button>
          </div>
          <p className="sp-login-prompt">
            Already have an account?{' '}
            <Link to="/login" className="sp-login-link">Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
