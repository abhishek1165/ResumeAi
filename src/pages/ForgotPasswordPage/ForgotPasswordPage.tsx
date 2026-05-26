import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, Shield, RefreshCw } from 'lucide-react';
import './ForgotPasswordPage.css';

type PageState = 'idle' | 'loading' | 'success' | 'error';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pageState, setPageState] = useState<PageState>('idle');
  const [isResending, setIsResending] = useState(false);
  const [focusedField, setFocusedField] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateEmail = (): boolean => {
    if (!email) {
      setEmailError('Email address is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail()) return;
    setPageState('loading');
    try {
      await new Promise((r) => setTimeout(r, 1800));
      setPageState('success');
    } catch {
      setPageState('error');
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsResending(false);
  };

  return (
    <div className={`fp-root ${mounted ? 'fp-mounted' : ''}`}>
      {/* Animated background */}
      <div className="fp-bg">
        <div className="fp-orb fp-orb-1" />
        <div className="fp-orb fp-orb-2" />
        <div className="fp-orb fp-orb-3" />
        <div className="fp-grid" />
      </div>

      {/* Floating particles */}
      <div className="fp-particles" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="fp-particle"
            style={{
              left: `${(i * 17 + 5) % 100}%`,
              top: `${(i * 23 + 10) % 100}%`,
              animationDelay: `${(i * 0.4) % 6}s`,
              animationDuration: `${4 + (i % 4)}s`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
            }}
          />
        ))}
      </div>

      {/* Back to login */}
      <div className="fp-top-nav">
        <Link to="/login" className="fp-back-btn">
          <ArrowLeft size={16} />
          <span>Back to Login</span>
        </Link>
        <div className="fp-logo">
          <div className="fp-logo-icon">
            <Shield size={18} />
          </div>
          <span className="fp-logo-text">ResumeIQ AI</span>
        </div>
      </div>

      {/* Main card */}
      <div className="fp-center">
        <div className={`fp-card ${pageState === 'success' ? 'fp-card--success' : ''}`}>
          {pageState === 'success' ? (
            /* SUCCESS STATE */
            <div className="fp-success-content">
              {/* Animated checkmark */}
              <div className="fp-check-wrap">
                <div className="fp-check-ring fp-check-ring-1" />
                <div className="fp-check-ring fp-check-ring-2" />
                <div className="fp-check-circle">
                  <CheckCircle size={36} />
                </div>
              </div>

              <h2 className="fp-success-title">Check Your Email</h2>
              <p className="fp-success-desc">
                We&apos;ve sent a password reset link to
              </p>
              <div className="fp-success-email">
                <Mail size={15} />
                <span>{email}</span>
              </div>
              <p className="fp-success-note">
                The link will expire in <strong>15 minutes</strong>. If you
                don&apos;t see the email, check your spam folder.
              </p>

              <div className="fp-success-actions">
                <button
                  type="button"
                  className="fp-resend-btn"
                  onClick={handleResend}
                  disabled={isResending}
                >
                  {isResending ? (
                    <span className="fp-spinner" />
                  ) : (
                    <>
                      <RefreshCw size={15} />
                      <span>Resend Email</span>
                    </>
                  )}
                </button>
                <Link to="/login" className="fp-return-link">
                  <ArrowLeft size={15} />
                  Return to Login
                </Link>
              </div>
            </div>
          ) : (
            /* FORM STATE */
            <>
              {/* Card header */}
              <div className="fp-card-icon-wrap">
                <div className="fp-card-icon">
                  <Mail size={26} />
                </div>
              </div>

              <div className="fp-card-header">
                <h2 className="fp-card-title">Forgot Password?</h2>
                <p className="fp-card-subtitle">
                  No worries! Enter your email and we&apos;ll send you a secure
                  link to reset your password.
                </p>
              </div>

              <form className="fp-form" onSubmit={handleSubmit} noValidate>
                {/* Email field */}
                <div
                  className={`fp-field ${focusedField ? 'fp-field--focused' : ''} ${emailError ? 'fp-field--error' : ''} ${email && !emailError ? 'fp-field--valid' : ''}`}
                >
                  <label className="fp-label" htmlFor="reset-email">
                    Email Address
                  </label>
                  <div className="fp-input-wrap">
                    <span className="fp-input-icon">
                      <Mail size={16} />
                    </span>
                    <input
                      id="reset-email"
                      type="email"
                      className="fp-input"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError('');
                      }}
                      onFocus={() => setFocusedField(true)}
                      onBlur={() => setFocusedField(false)}
                      autoComplete="email"
                    />
                    {email && !emailError && (
                      <span className="fp-valid-icon">
                        <CheckCircle size={15} />
                      </span>
                    )}
                  </div>
                  {emailError && (
                    <span className="fp-error-msg">{emailError}</span>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className={`fp-submit-btn ${pageState === 'loading' ? 'fp-submit-btn--loading' : ''}`}
                  disabled={pageState === 'loading'}
                >
                  {pageState === 'loading' ? (
                    <>
                      <span className="fp-spinner" />
                      <span>Sending Link...</span>
                    </>
                  ) : (
                    <>
                      <Mail size={17} />
                      <span>Send Reset Link</span>
                    </>
                  )}
                </button>
              </form>

              {/* Error state */}
              {pageState === 'error' && (
                <div className="fp-server-error">
                  Something went wrong. Please try again.
                </div>
              )}

              {/* Back link */}
              <div className="fp-bottom">
                <Link to="/login" className="fp-back-link">
                  <ArrowLeft size={15} />
                  Back to Login
                </Link>
                <span className="fp-divider-dot" />
                <Link to="/signup" className="fp-back-link">
                  Create Account
                </Link>
              </div>

              {/* Security note */}
              <div className="fp-security-note">
                <Shield size={13} />
                <span>
                  For security, reset links expire in 15 minutes and can only
                  be used once.
                </span>
              </div>
            </>
          )}
        </div>

        {/* Steps indicator */}
        {pageState !== 'success' && (
          <div className="fp-steps">
            <div className="fp-step fp-step--active">
              <span className="fp-step-num">1</span>
              <span className="fp-step-label">Enter Email</span>
            </div>
            <div className="fp-step-line" />
            <div className="fp-step">
              <span className="fp-step-num">2</span>
              <span className="fp-step-label">Check Inbox</span>
            </div>
            <div className="fp-step-line" />
            <div className="fp-step">
              <span className="fp-step-num">3</span>
              <span className="fp-step-label">Reset Password</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
