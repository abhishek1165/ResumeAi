import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle, XCircle, ChevronRight, Upload,
  Download, Zap, Target, BarChart3, Wand2, Star,
  Lock, ArrowRight, LogIn, Sparkles, TrendingUp,
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { useAuth } from '../../context/AuthContext';
import type { Keyword, Suggestion } from '../../context/ResumeContext';
import './ResultsPage.css';

/* ── Circular ATS Score Ring ── */
function ScoreRing({ score, color, label }: { score: number; color: string; label: string }) {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ * 0.75;

  return (
    <div className="rp-ring-container">
      <svg viewBox="0 0 180 180" width="200" height="200">
        {/* Track */}
        <circle cx="90" cy="90" r={r} fill="none" stroke="rgba(255,255,255,0.07)"
          strokeWidth="12" strokeLinecap="round"
          strokeDasharray={`${circ * 0.75} ${circ * 0.25}`}
          transform="rotate(135 90 90)" />
        {/* Fill */}
        <circle cx="90" cy="90" r={r} fill="none"
          stroke={color} strokeWidth="12" strokeLinecap="round"
          style={{
            transformOrigin: '90px 90px', transform: 'rotate(135deg)',
            strokeDasharray: `${filled} 9999`, transition: 'stroke-dasharray 1.2s ease',
            filter: `drop-shadow(0 0 8px ${color}66)`,
          }}
        />
        <text x="90" y="80" textAnchor="middle" fill="#f0f0ff" fontSize="38"
          fontWeight="800" fontFamily="Space Grotesk, sans-serif">{score}</text>
        <text x="90" y="100" textAnchor="middle" fill="#606080" fontSize="13"
          fontFamily="Inter, sans-serif">/100</text>
      </svg>
      <p className="rp-ring-label" style={{ color }}>{label}</p>
    </div>
  );
}

/* ── Locked Premium Feature Card ── */
function LockedCard({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="rp-locked-card">
      <div className="rp-locked-icon">{icon}</div>
      <div className="rp-locked-body">
        <p className="rp-locked-title">{title}</p>
        <p className="rp-locked-desc">{desc}</p>
      </div>
      <Lock size={16} className="rp-lock-icon" />
    </div>
  );
}

export default function ResultsPage() {
  const navigate = useNavigate();
  const { analysis, file } = useResume();
  const { isAuthenticated } = useAuth();
  const [showSaveBanner, setShowSaveBanner] = useState(true);

  /* ── No analysis — prompt to upload ── */
  if (!analysis) {
    return (
      <div className="rp-empty">
        <div className="rp-empty-icon"><BarChart3 size={48} /></div>
        <h2>No Analysis Found</h2>
        <p>Upload a resume to see your ATS score and insights.</p>
        <button className="rp-cta-primary" onClick={() => navigate('/')}>
          <Upload size={18} /> Upload Resume
        </button>
      </div>
    );
  }

  /* ── Derived data from correct field names ── */
  const presentKw = analysis.keywords.filter((k: Keyword) => k.found);
  const missingKw = analysis.keywords.filter((k: Keyword) => !k.found);

  const scoreBreakdown = [
    { label: 'Keywords', val: analysis.keywordScore, color: '#7c3aed' },
    { label: 'Format',   val: analysis.formatScore,  color: '#06b6d4' },
    { label: 'Clarity',  val: analysis.clarityScore,  color: '#10b981' },
    { label: 'Sections', val: analysis.sectionScore,  color: '#f59e0b' },
  ];

  return (
    <div className="rp-root">
      {/* Background */}
      <div className="rp-bg">
        <div className="rp-orb rp-orb-1" />
        <div className="rp-orb rp-orb-2" />
        <div className="rp-grid-overlay" />
      </div>

      {/* ── Top Bar ── */}
      <header className="rp-topbar">
        <Link to="/" className="rp-logo">
          <span className="rp-logo-icon"><Zap size={16} /></span>
          <span className="rp-logo-name">ResumeIQ</span>
          <span className="rp-logo-badge">AI</span>
        </Link>
        <div className="rp-topbar-actions">
          <span className="rp-file-chip">📄 {file?.name ?? analysis.fileName}</span>
          <button className="rp-upload-again" onClick={() => navigate('/')}>
            <Upload size={14} /> Analyze Another
          </button>
          {!isAuthenticated ? (
            <Link to="/signup" className="rp-signup-btn">
              Save Results Free <ArrowRight size={14} />
            </Link>
          ) : (
            <Link to="/dashboard" className="rp-signup-btn">
              My Dashboard <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </header>

      {/* ── Save Banner (guests only) ── */}
      {!isAuthenticated && showSaveBanner && (
        <div className="rp-save-banner">
          <Sparkles size={16} />
          <span>
            <strong>Your analysis is temporary.</strong> Create a free account to save results,
            track your score history, and download your optimized resume.
          </span>
          <Link to="/signup" className="rp-banner-cta">Save My Results</Link>
          <button className="rp-banner-dismiss" onClick={() => setShowSaveBanner(false)}>✕</button>
        </div>
      )}

      <div className="rp-content">
        {/* ── Page Title ── */}
        <div className="rp-header">
          <div className="rp-eye"><Zap size={13} /> ATS Analysis Complete</div>
          <h1 className="rp-title">Your Resume <span className="gradient-text">ATS Report</span></h1>
          <p className="rp-subtitle">
            Here's how your resume performs against applicant tracking systems.
          </p>
        </div>

        {/* ── Main Grid ── */}
        <div className="rp-grid-layout">

          {/* LEFT — Score + breakdown */}
          <div className="rp-left">

            {/* Score Card */}
            <div className="rp-score-card glass-card">
              <p className="rp-card-title">ATS Score</p>
              <ScoreRing
                score={analysis.atsScore}
                color={analysis.scoreColor}
                label={`${analysis.scoreLabel} ${analysis.atsScore >= 75 ? '🎉' : analysis.atsScore >= 55 ? '💪' : '⚠️'}`}
              />
              <div className="rp-score-breakdown">
                {scoreBreakdown.map(b => (
                  <div key={b.label} className="rp-bar-row">
                    <span className="rp-bar-label">{b.label}</span>
                    <div className="rp-bar-track">
                      <div className="rp-bar-fill"
                        style={{ width: `${Math.min(b.val, 100)}%`, background: b.color }} />
                    </div>
                    <span className="rp-bar-val" style={{ color: b.color }}>{b.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="rp-stats-row">
              <div className="rp-stat-box">
                <span className="rp-stat-num" style={{ color: '#10b981' }}>{presentKw.length}</span>
                <span className="rp-stat-lbl">Keywords Found</span>
              </div>
              <div className="rp-stat-box">
                <span className="rp-stat-num" style={{ color: '#ef4444' }}>{missingKw.length}</span>
                <span className="rp-stat-lbl">Missing</span>
              </div>
              <div className="rp-stat-box">
                <span className="rp-stat-num" style={{ color: '#f59e0b' }}>{analysis.suggestions.length}</span>
                <span className="rp-stat-lbl">Improvements</span>
              </div>
            </div>

            {/* Upgrade CTA (guests) */}
            {!isAuthenticated && (
              <div className="rp-upgrade-card">
                <div className="rp-upgrade-icon"><Star size={22} /></div>
                <div>
                  <p className="rp-upgrade-title">Save & Track Progress</p>
                  <p className="rp-upgrade-desc">
                    Create a free account to save this analysis, compare scores over time,
                    and unlock one-click AI rewriting.
                  </p>
                </div>
                <Link to="/signup" className="rp-upgrade-btn">
                  Get Started Free <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </div>

          {/* RIGHT — Keywords + Suggestions */}
          <div className="rp-right">

            {/* Keywords */}
            <div className="rp-kw-card glass-card">
              <p className="rp-card-title">Keyword Analysis</p>
              <div className="rp-kw-section">
                <p className="rp-kw-heading rp-kw-heading--green">
                  <CheckCircle size={14} /> Present Keywords ({presentKw.length})
                </p>
                <div className="rp-kw-pills">
                  {presentKw.map((k: Keyword) => (
                    <span key={k.word} className="rp-pill rp-pill--green">{k.word}</span>
                  ))}
                </div>
              </div>
              <div className="rp-kw-section">
                <p className="rp-kw-heading rp-kw-heading--red">
                  <XCircle size={14} /> Missing Keywords ({missingKw.length})
                </p>
                <div className="rp-kw-pills">
                  {missingKw.map((k: Keyword) => (
                    <span key={k.word} className="rp-pill rp-pill--red">{k.word}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="rp-suggestions-card glass-card">
              <p className="rp-card-title">AI Improvement Suggestions</p>
              <div className="rp-suggestions">
                {analysis.suggestions.map((s: Suggestion) => (
                  <div key={s.id}
                    className={`rp-suggestion rp-suggestion--${s.priority}`}>
                    <div className="rp-sug-header">
                      <span className={`rp-impact rp-impact--${s.priority}`}>
                        {s.priority.toUpperCase()}
                      </span>
                      <p className="rp-sug-title">{s.title}</p>
                    </div>
                    <p className="rp-sug-desc">{s.description}</p>
                    {!isAuthenticated ? (
                      <Link to="/signup" className="rp-sug-action rp-sug-action--locked">
                        <Lock size={12} /> Sign up free to apply this fix
                      </Link>
                    ) : (
                      <Link to="/workspace" className="rp-sug-action">
                        Fix with AI <ChevronRight size={12} />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Premium locked features (guests) ── */}
        {!isAuthenticated && (
          <div className="rp-premium-section">
            <div className="rp-premium-header">
              <h2 className="rp-premium-title">
                Unlock the Full Suite —{' '}
                <span className="gradient-text">Free Forever</span>
              </h2>
              <p className="rp-premium-sub">Create an account to access all features below</p>
            </div>
            <div className="rp-premium-grid">
              <LockedCard icon={<Wand2 size={20} />}
                title="AI Resume Rewriter"
                desc="One-click AI rewrites for every bullet point and summary" />
              <LockedCard icon={<Download size={20} />}
                title="Download Optimized PDF"
                desc="Export your improved resume as a professionally formatted PDF" />
              <LockedCard icon={<TrendingUp size={20} />}
                title="Score History & Progress"
                desc="Track your ATS score improvements over every revision" />
              <LockedCard icon={<Target size={20} />}
                title="Job Description Match"
                desc="Paste any job and see your tailored match score instantly" />
            </div>
            <div className="rp-premium-ctas">
              <Link to="/signup" className="rp-cta-primary">
                <Sparkles size={18} /> Create Free Account
              </Link>
              <Link to="/login" className="rp-cta-secondary">
                <LogIn size={16} /> Already have an account? Sign in
              </Link>
            </div>
          </div>
        )}

        {/* ── Authenticated user quick actions ── */}
        {isAuthenticated && (
          <div className="rp-auth-actions">
            <Link to="/workspace" className="rp-cta-primary">
              <Wand2 size={18} /> Optimize with AI
            </Link>
            <Link to="/dashboard" className="rp-cta-secondary">
              <BarChart3 size={16} /> Full Dashboard
            </Link>
            <button className="rp-cta-secondary" onClick={() => navigate('/')}>
              <Upload size={16} /> Analyze Another Resume
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
