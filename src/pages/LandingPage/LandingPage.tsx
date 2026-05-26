import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Upload, X, Zap, ArrowRight, CheckCircle, XCircle,
  BarChart3, Target, Layout, Star, ChevronDown,
  Sparkles, Shield, Eye, FileText, Users,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useResume } from '../../context/ResumeContext';
import './LandingPage.css';

/* ─── Static mock data for the right-panel preview ─── */
const SCORE_BARS = [
  { label: 'Content',       score: 88, color: '#10b981' },
  { label: 'Keyword Match', score: 90, color: '#7c3aed' },
  { label: 'Formatting',    score: 82, color: '#2563eb' },
  { label: 'Readability',   score: 78, color: '#f59e0b' },
  { label: 'Experience',    score: 85, color: '#06b6d4' },
];

const STRENGTHS = ['Strong skills section', 'Good use of metrics', 'Well-structured experience'];
const IMPROVEMENTS = ['Add more relevant keywords', 'Improve bullet points', 'Enhance achievements'];

const NAV_LINKS = [
  { label: 'Pricing',   href: '/pricing' },
  { label: 'Job Match', href: '/job-match' },
  { label: 'Dashboard', href: '/dashboard' },
];

const COMPANIES = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Spotify', 'Tesla'];

const FEATURES = [
  { icon: <Sparkles size={22} />, title: 'AI Resume Analysis', desc: 'Advanced AI scans your resume for content, structure & ATS fit' },
  { icon: <BarChart3 size={22} />, title: 'Instant ATS Score', desc: 'Get a detailed ATS score and insights in seconds' },
  { icon: <Target size={22} />, title: 'Job Match', desc: 'Match your resume with any job description instantly' },
  { icon: <Layout size={22} />, title: 'Full Dashboard', desc: 'Get actionable insights and track your improvement over time' },
];

/* ─── ATS Ring ─── */
function ATSRing({ score }: { score: number }) {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ * 0.75; // 270° arc
  return (
    <svg viewBox="0 0 180 180" width="180" height="180">
      <circle cx="90" cy="90" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="12"
        strokeDasharray={`${circ * 0.75} ${circ * 0.25}`}
        strokeDashoffset={circ * 0.125}
        strokeLinecap="round"
        transform="rotate(135 90 90)" />
      <circle cx="90" cy="90" r={r} fill="none"
        stroke="url(#atsGrad)" strokeWidth="12"
        strokeDasharray={`${circ * 0.75 - (score / 100) * circ * 0.75} 9999`}
        strokeDashoffset={0}
        strokeLinecap="round"
        transform={`rotate(135 90 90)`}
        style={{ transform: 'rotate(135deg)', transformOrigin: '90px 90px', strokeDasharray: `${(score / 100) * circ * 0.75} 9999`, transition: 'stroke-dasharray 1.5s ease' }}
      />
      <defs>
        <linearGradient id="atsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <text x="90" y="82" textAnchor="middle" fill="#f0f0ff" fontSize="36" fontWeight="800" fontFamily="Space Grotesk, sans-serif">{score}</text>
      <text x="90" y="102" textAnchor="middle" fill="#606080" fontSize="13" fontFamily="Inter, sans-serif">/100</text>
    </svg>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { setFile } = useResume();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [heroDrag, setHeroDrag] = useState(false);
  const [heroError, setHeroError] = useState('');
  const [mobileNav, setMobileNav] = useState(false);

  const handleHeroFile = (f: File) => {
    const ext = '.' + f.name.split('.').pop()?.toLowerCase();
    if (!['.pdf', '.doc', '.docx', '.txt'].includes(ext)) {
      setHeroError('Please upload a PDF, DOCX or TXT file.');
      return;
    }
    if (f.size > 10 * 1024 * 1024) { setHeroError('File must be under 10MB.'); return; }
    setHeroError('');
    setHeroFile(f);
    setFile(f);
  };

  const handleAnalyze = () => {
    if (!heroFile) { fileInputRef.current?.click(); return; }
    if (isAuthenticated) navigate('/scanning');
    else navigate('/signup', { state: { from: '/scanning' } });
  };

  return (
    <div className="lp2-root">

      {/* ── NAVBAR ── */}
      <header className="lp2-nav">
        <div className="lp2-nav-inner">
          <Link to="/" className="lp2-logo">
            <span className="lp2-logo-icon"><Zap size={16} /></span>
            <span className="lp2-logo-name">ResumeIQ</span>
            <span className="lp2-logo-badge">AI</span>
          </Link>

          <nav className="lp2-links">
            {NAV_LINKS.map(l => (
              <Link key={l.label} to={l.href} className="lp2-link">{l.label}</Link>
            ))}
            <div className="lp2-link lp2-link--dropdown">
              Resources <ChevronDown size={14} />
            </div>
          </nav>

          <div className="lp2-nav-actions">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="lp2-login-btn">Dashboard</Link>
                <button className="lp2-cta-btn" onClick={() => { logout(); }}>Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="lp2-login-btn">Log in</Link>
                <Link to="/signup" className="lp2-cta-btn">Get Started Free</Link>
              </>
            )}
          </div>

          <button className="lp2-hamburger" onClick={() => setMobileNav(v => !v)}>
            <span /><span /><span />
          </button>
        </div>
        {mobileNav && (
          <div className="lp2-mobile-menu">
            {NAV_LINKS.map(l => <Link key={l.label} to={l.href} className="lp2-mobile-link">{l.label}</Link>)}
            <Link to="/login" className="lp2-mobile-link">Log in</Link>
            <Link to="/signup" className="lp2-mobile-cta">Get Started Free</Link>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="lp2-hero">
        {/* Background */}
        <div className="lp2-hero-bg">
          <div className="lp2-orb lp2-orb-1" />
          <div className="lp2-orb lp2-orb-2" />
          <div className="lp2-orb lp2-orb-3" />
          <div className="lp2-grid-overlay" />
        </div>

        <div className="lp2-hero-inner">
          {/* LEFT COL */}
          <div className="lp2-hero-left">
            <div className="lp2-eyebrow">
              <Sparkles size={13} />
              <span>AI-Powered Resume Analyzer</span>
            </div>

            <h1 className="lp2-h1">
              Boost Your Resume<br />
              <span className="gradient-text">ATS Score</span> with AI
            </h1>

            <p className="lp2-desc">
              Upload your resume, get an instant ATS score,
              actionable feedback, and preview improvements —{' '}
              <span className="lp2-desc-accent">for free.</span>
            </p>

            {/* Upload Zone */}
            <div className="lp2-upload-box">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                style={{ display: 'none' }}
                onChange={e => { const f = e.target.files?.[0]; if (f) handleHeroFile(f); }}
              />

              {!heroFile ? (
                <div
                  className={`lp2-dropzone ${heroDrag ? 'lp2-dropzone--drag' : ''}`}
                  onDragOver={e => { e.preventDefault(); setHeroDrag(true); }}
                  onDragLeave={() => setHeroDrag(false)}
                  onDrop={e => { e.preventDefault(); setHeroDrag(false); const f = e.dataTransfer.files[0]; if (f) handleHeroFile(f); }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="lp2-drop-icon">
                    <Upload size={28} />
                  </div>
                  <p className="lp2-drop-main">
                    {heroDrag ? 'Drop your resume here' : 'Drag & drop your resume here'}
                  </p>
                  <p className="lp2-drop-sub">
                    or <span className="lp2-browse">browse files</span>
                  </p>
                  <p className="lp2-drop-formats">PDF, DOCX (Max 10MB)</p>
                </div>
              ) : (
                <div className="lp2-file-selected">
                  <div className="lp2-file-row">
                    <span className="lp2-file-emoji">📄</span>
                    <div className="lp2-file-meta">
                      <p className="lp2-file-name">{heroFile.name}</p>
                      <p className="lp2-file-size">{(heroFile.size / 1024).toFixed(0)} KB · Ready</p>
                    </div>
                    <button className="lp2-file-remove" onClick={() => { setHeroFile(null); setFile(null); }}>
                      <X size={15} />
                    </button>
                  </div>
                </div>
              )}

              {heroError && <p className="lp2-upload-error">⚠ {heroError}</p>}

              <button className="lp2-analyze-btn" onClick={handleAnalyze}>
                <Upload size={18} />
                {heroFile
                  ? (isAuthenticated ? 'Analyze My Resume Now' : 'Get My Free ATS Score')
                  : 'Upload & Get ATS Score for Free'}
                <Sparkles size={15} />
              </button>

              <p className="lp2-no-card">
                <Shield size={12} /> No credit card required
              </p>
            </div>
          </div>

          {/* RIGHT COL — Live Score Preview */}
          <div className="lp2-hero-right">
            {/* Score card */}
            <div className="lp2-score-card glass-card">
              <p className="lp2-score-card-title">Your ATS Score</p>
              <div className="lp2-ring-wrap">
                <ATSRing score={85} />
                <div className="lp2-ring-label">
                  <span className="lp2-ring-status">Great Score! 🎉</span>
                  <span className="lp2-ring-desc">Your resume is well-optimized<br />for ATS and recruiters.</span>
                  <Link to={isAuthenticated ? '/dashboard' : '/signup'} className="lp2-view-dash">
                    View Full Dashboard →
                  </Link>
                </div>
              </div>

              {/* Score bars */}
              <div className="lp2-score-bars">
                {SCORE_BARS.map(b => (
                  <div key={b.label} className="lp2-bar-row">
                    <span className="lp2-bar-label">{b.label}</span>
                    <div className="lp2-bar-track">
                      <div className="lp2-bar-fill" style={{ width: `${b.score}%`, background: b.color }} />
                    </div>
                    <span className="lp2-bar-val" style={{ color: b.color }}>{b.score}/100</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths / Improvements */}
            <div className="lp2-insights-row">
              <div className="lp2-insight-card glass-card">
                <p className="lp2-insight-title lp2-insight-title--green">Top Strengths</p>
                {STRENGTHS.map(s => (
                  <div key={s} className="lp2-insight-item lp2-insight-item--green">
                    <CheckCircle size={14} /><span>{s}</span>
                  </div>
                ))}
              </div>
              <div className="lp2-insight-card glass-card">
                <p className="lp2-insight-title lp2-insight-title--red">Areas to Improve</p>
                {IMPROVEMENTS.map(s => (
                  <div key={s} className="lp2-insight-item lp2-insight-item--red">
                    <XCircle size={14} /><span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume preview strip */}
            <div className="lp2-preview-card glass-card">
              <div className="lp2-preview-header">
                <p className="lp2-preview-title">Preview of Improved Resume</p>
                <Link to={isAuthenticated ? '/preview' : '/signup'} className="lp2-preview-link">
                  See Preview →
                </Link>
              </div>
              <div className="lp2-preview-body">
                <div className="lp2-resume-thumb">
                  <div className="lp2-rt-line lp2-rt-line--title" />
                  <div className="lp2-rt-line lp2-rt-line--sub" />
                  <div className="lp2-rt-line" />
                  <div className="lp2-rt-line lp2-rt-line--short" />
                </div>
                <div className="lp2-resume-content">
                  <p className="lp2-rc-name">John Doe</p>
                  <p className="lp2-rc-title">Senior Product Designer</p>
                  <div className="lp2-rc-meta">
                    <span>✉ john.doe@email.com</span>
                    <span>📱 +1 234 567 890</span>
                    <span>📍 New York, USA</span>
                  </div>
                  <div className="lp2-rc-divider" />
                  <p className="lp2-rc-section">SUMMARY</p>
                  <div className="lp2-rc-lines">
                    <div className="lp2-rc-line" />
                    <div className="lp2-rc-line lp2-rc-line--short" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="lp2-trust">
        <div className="lp2-trust-inner">
          <p className="lp2-trust-label">Trusted by 50,000+ job seekers from</p>
          <div className="lp2-logos">
            {COMPANIES.map(c => (
              <div key={c} className="lp2-logo-item">{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="lp2-features">
        <div className="lp2-features-inner">
          {FEATURES.map(f => (
            <div key={f.title} className="lp2-feature-card glass-card">
              <div className="lp2-feature-icon">{f.icon}</div>
              <h3 className="lp2-feature-title">{f.title}</h3>
              <p className="lp2-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="lp2-how" id="how-it-works">
        <div className="lp2-how-inner">
          <div className="lp2-section-header">
            <p className="lp2-section-eye"><Zap size={13} /> How It Works</p>
            <h2 className="lp2-section-title">Get Your ATS Score in <span className="gradient-text">3 Steps</span></h2>
          </div>
          <div className="lp2-steps">
            {[
              { n: '01', title: 'Upload Your Resume', desc: 'Drag & drop your PDF or DOCX resume. Takes under 5 seconds.', icon: <Upload size={24} /> },
              { n: '02', title: 'AI Scans & Scores', desc: 'Our AI analyzes keywords, formatting, clarity and ATS compatibility.', icon: <Sparkles size={24} /> },
              { n: '03', title: 'Get Results & Improve', desc: 'See your ATS score, missing keywords, and one-click AI fixes.', icon: <BarChart3 size={24} /> },
            ].map((step, i) => (
              <div key={step.n} className="lp2-step">
                <div className="lp2-step-num">{step.n}</div>
                <div className="lp2-step-icon-wrap">{step.icon}</div>
                <h3 className="lp2-step-title">{step.title}</h3>
                <p className="lp2-step-desc">{step.desc}</p>
                {i < 2 && <div className="lp2-step-connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="lp2-stats">
        <div className="lp2-stats-inner">
          {[
            { val: '2M+', label: 'Resumes Analyzed' },
            { val: '94%', label: 'Success Rate' },
            { val: '3x', label: 'More Interviews' },
            { val: '50K+', label: 'Happy Professionals' },
          ].map(s => (
            <div key={s.label} className="lp2-stat">
              <span className="lp2-stat-val gradient-text">{s.val}</span>
              <span className="lp2-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="lp2-cta-section">
        <div className="lp2-cta-bg">
          <div className="lp2-cta-orb lp2-cta-orb-1" />
          <div className="lp2-cta-orb lp2-cta-orb-2" />
        </div>
        <div className="lp2-cta-inner">
          <h2 className="lp2-cta-title">Ready to Land Your <span className="gradient-text">Dream Job?</span></h2>
          <p className="lp2-cta-sub">Join 50,000+ professionals who've already boosted their resume with ResumeIQ AI.</p>
          <div className="lp2-cta-btns">
            <button className="lp2-analyze-btn lp2-analyze-btn--lg" onClick={() => navigate(isAuthenticated ? '/upload' : '/signup')}>
              <Zap size={20} /> Start Free Analysis <ArrowRight size={18} />
            </button>
            <Link to="/pricing" className="lp2-outline-btn">View Pricing</Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp2-footer">
        <div className="lp2-footer-inner">
          <div className="lp2-footer-brand">
            <Link to="/" className="lp2-logo">
              <span className="lp2-logo-icon"><Zap size={14} /></span>
              <span className="lp2-logo-name">ResumeIQ</span>
              <span className="lp2-logo-badge">AI</span>
            </Link>
            <p className="lp2-footer-tagline">AI-powered resume optimization for modern job seekers.</p>
          </div>
          <div className="lp2-footer-links">
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Dashboard', 'Job Match'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
              { title: 'Support', links: ['Help Center', 'Contact', 'Privacy', 'Terms'] },
            ].map(col => (
              <div key={col.title} className="lp2-footer-col">
                <h4 className="lp2-footer-col-title">{col.title}</h4>
                {col.links.map(l => <a key={l} href="#" className="lp2-footer-link">{l}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div className="lp2-footer-bottom">
          <p>© 2026 ResumeIQ AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
