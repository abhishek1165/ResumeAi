import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Target, FileText, Lightbulb, Wand2,
  CheckCircle, XCircle, AlertCircle,
  ChevronRight, Upload, LogOut, Settings, Star,
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { useResume } from '../../context/ResumeContext';
import './DashboardPage.css';

const NAV_ITEMS = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { id: 'keywords', icon: Target, label: 'Keywords' },
  { id: 'suggestions', icon: Lightbulb, label: 'Suggestions' },
  { id: 'formatting', icon: FileText, label: 'Format Score' },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { analysis } = useResume();
  const [activeNav, setActiveNav] = useState('overview');

  // No analysis — prompt to upload
  if (!analysis) {
    return (
      <div className="db-no-resume">
        <div className="db-no-resume-bg">
          <div className="db-orb db-orb-1" /><div className="db-orb db-orb-2" />
        </div>
        <div className="db-no-resume-card glass-card">
          <div className="db-no-resume-icon"><Upload size={40} /></div>
          <h2>No Resume Analyzed Yet</h2>
          <p>Upload your resume to get your instant ATS score and personalized improvement plan.</p>
          <button className="db-primary-btn" onClick={() => navigate('/upload')}>
            <Upload size={18} /> Upload Resume
          </button>
        </div>
      </div>
    );
  }

  const {
    atsScore, scoreLabel, scoreColor, formatScore, keywordScore, clarityScore, sectionScore,
    keywords, suggestions, fileName, analyzedAt,
  } = analysis;

  const foundKeywords = keywords.filter(k => k.found);
  const missingKeywords = keywords.filter(k => !k.found);
  const circumference = 2 * Math.PI * 58;
  const dashoffset = circumference - (atsScore / 100) * circumference;

  const scoreBreakdown = [
    { label: 'Keywords', score: keywordScore, color: 'var(--accent-purple-light)' },
    { label: 'Format', score: formatScore, color: 'var(--accent-cyan)' },
    { label: 'Clarity', score: clarityScore, color: 'var(--accent-emerald)' },
    { label: 'Sections', score: sectionScore, color: 'var(--accent-amber)' },
  ];

  const priorityColors = { high: '#ef4444', medium: '#f59e0b', low: '#06b6d4' };
  const priorityBg = { high: 'rgba(239,68,68,0.12)', medium: 'rgba(245,158,11,0.12)', low: 'rgba(6,182,212,0.12)' };

  return (
    <div className="db-root">
      {/* Sidebar */}
      <aside className="db-sidebar">
        <div className="db-sidebar-logo">
          <div className="db-logo-icon"><Star size={16} /></div>
          <span className="db-logo-text">ResumeIQ AI</span>
        </div>

        <nav className="db-nav">
          {NAV_ITEMS.map(item => (
            <button key={item.id}
              className={`db-nav-item ${activeNav === item.id ? 'db-nav-item--active' : ''}`}
              onClick={() => setActiveNav(item.id)}>
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="db-sidebar-actions">
          <button className="db-nav-item" onClick={() => navigate('/upload')}>
            <Upload size={18} /><span>New Analysis</span>
          </button>
          <button className="db-nav-item" onClick={() => navigate('/workspace')}>
            <Wand2 size={18} /><span>AI Optimizer</span>
          </button>
          <Link to="/settings" className="db-nav-item" style={{ textDecoration: 'none' }}>
            <Settings size={18} /><span>Settings</span>
          </Link>
        </div>

        <div className="db-sidebar-user">
          <div className="db-user-avatar">{user?.name?.charAt(0).toUpperCase() ?? 'U'}</div>
          <div className="db-user-info">
            <p className="db-user-name">{user?.name}</p>
            <p className="db-user-email">{user?.email}</p>
          </div>
          <button className="db-logout-btn" onClick={() => { logout(); navigate('/'); }} title="Logout">
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="db-main">
        {/* Top bar */}
        <div className="db-topbar">
          <div className="db-topbar-left">
            <div className="db-topbar-file">
              <FileText size={16} />
              <span className="db-topbar-filename">{fileName}</span>
            </div>
            <div className="db-topbar-time">
              Analyzed {new Date(analyzedAt).toLocaleString()}
            </div>
          </div>
          <div className="db-topbar-right">
            <div className="db-score-badge" style={{ borderColor: `${scoreColor}44`, background: `${scoreColor}15` }}>
              <span style={{ color: scoreColor, fontWeight: 700 }}>{atsScore}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>/100</span>
            </div>
            <button className="db-primary-btn" onClick={() => navigate('/workspace')}>
              <Wand2 size={16} /> Optimize with AI
            </button>
            <button className="db-outline-btn" onClick={() => navigate('/upload')}>
              <Upload size={16} /> New Upload
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="db-content">

          {/* ── OVERVIEW ── */}
          {activeNav === 'overview' && (
            <>
              {/* Stats row */}
              <div className="db-stats-row">
                {[
                  { label: 'ATS Score', value: `${atsScore}/100`, color: scoreColor, sub: scoreLabel },
                  { label: 'Keywords Found', value: `${foundKeywords.length}/${keywords.length}`, color: 'var(--accent-cyan)', sub: 'Matched' },
                  { label: 'Missing Keywords', value: missingKeywords.length.toString(), color: 'var(--accent-amber)', sub: 'To add' },
                  { label: 'Improvements', value: suggestions.length.toString(), color: 'var(--accent-purple-light)', sub: 'Suggested' },
                ].map(stat => (
                  <div key={stat.label} className="db-stat-card glass-card">
                    <p className="db-stat-label">{stat.label}</p>
                    <p className="db-stat-value" style={{ color: stat.color }}>{stat.value}</p>
                    <p className="db-stat-sub">{stat.sub}</p>
                  </div>
                ))}
              </div>

              <div className="db-two-col">
                {/* Big score ring */}
                <div className="db-score-card glass-card">
                  <h3 className="db-card-title">ATS Score</h3>
                  <div className="db-ring-wrap">
                    <svg viewBox="0 0 128 128" className="db-ring-svg">
                      <circle cx="64" cy="64" r="58" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                      <circle cx="64" cy="64" r="58" fill="none"
                        stroke={scoreColor} strokeWidth="10" strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashoffset}
                        transform="rotate(-90 64 64)"
                        style={{ transition: 'stroke-dashoffset 1s ease', filter: `drop-shadow(0 0 8px ${scoreColor}66)` }} />
                    </svg>
                    <div className="db-ring-inner">
                      <span className="db-ring-score" style={{ color: scoreColor }}>{atsScore}</span>
                      <span className="db-ring-total">/100</span>
                      <span className="db-ring-label" style={{ color: scoreColor }}>{scoreLabel}</span>
                    </div>
                  </div>
                  <p className="db-score-desc">
                    {atsScore >= 80
                      ? "Great job! Your resume is well-optimized. Apply the remaining suggestions to maximize your score."
                      : atsScore >= 65
                      ? "Your resume is partially optimized. Focus on the high-priority improvements below."
                      : "Your resume needs significant improvement to pass ATS filters. Start with the high-priority fixes."}
                  </p>
                  {/* Breakdown bars */}
                  <div className="db-breakdown">
                    {scoreBreakdown.map(({ label, score, color }) => (
                      <div key={label} className="db-breakdown-row">
                        <span className="db-breakdown-label">{label}</span>
                        <div className="db-breakdown-track">
                          <div className="db-breakdown-fill"
                            style={{ width: `${score}%`, background: color }} />
                        </div>
                        <span className="db-breakdown-pct" style={{ color }}>{score}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top suggestions */}
                <div className="db-suggestions-preview glass-card">
                  <div className="db-card-header">
                    <h3 className="db-card-title">Top Improvements</h3>
                    <button className="db-see-all" onClick={() => setActiveNav('suggestions')}>
                      See all <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="db-suggestion-list">
                    {suggestions.slice(0, 3).map(s => (
                      <div key={s.id} className="db-suggestion-item">
                        <div className="db-suggestion-priority"
                          style={{ background: priorityBg[s.priority], color: priorityColors[s.priority], borderColor: `${priorityColors[s.priority]}33` }}>
                          {s.priority.toUpperCase()}
                        </div>
                        <div className="db-suggestion-body">
                          <p className="db-suggestion-title">{s.title}</p>
                          <p className="db-suggestion-desc">{s.description}</p>
                          <span className="db-suggestion-section">📌 {s.section}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="db-optimize-cta" onClick={() => navigate('/workspace')}>
                    <Wand2 size={16} /> Apply All with AI Optimizer
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ── KEYWORDS ── */}
          {activeNav === 'keywords' && (
            <div className="db-keywords-section">
              <div className="db-kw-grid">
                <div className="glass-card db-kw-card">
                  <h3 className="db-card-title" style={{ color: 'var(--accent-emerald)' }}>
                    <CheckCircle size={18} /> Found Keywords ({foundKeywords.length})
                  </h3>
                  <div className="db-kw-pills">
                    {foundKeywords.map(k => (
                      <span key={k.word} className={`db-kw-pill db-kw-pill--found db-kw-pill--${k.importance}`}>
                        <CheckCircle size={11} /> {k.word}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="glass-card db-kw-card">
                  <h3 className="db-card-title" style={{ color: 'var(--accent-red)' }}>
                    <XCircle size={18} /> Missing Keywords ({missingKeywords.length})
                  </h3>
                  <div className="db-kw-pills">
                    {missingKeywords.map(k => (
                      <span key={k.word} className={`db-kw-pill db-kw-pill--missing db-kw-pill--${k.importance}`}>
                        <XCircle size={11} /> {k.word}
                      </span>
                    ))}
                  </div>
                  <p className="db-kw-tip">
                    <AlertCircle size={13} /> Add these keywords naturally to your resume to improve your ATS score.
                  </p>
                </div>
              </div>
              <div className="glass-card db-kw-score-card">
                <h3 className="db-card-title">Keyword Match Rate</h3>
                <div className="db-big-score">
                  <span style={{ color: 'var(--accent-cyan)' }}>{keywordScore}%</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  Your resume matches {keywordScore}% of common keywords for your target role. Aim for 80%+ to pass most ATS filters.
                </p>
              </div>
            </div>
          )}

          {/* ── SUGGESTIONS ── */}
          {activeNav === 'suggestions' && (
            <div className="db-suggestions-full">
              <div className="db-suggestions-header">
                <h2 className="db-section-title">Improvement Suggestions</h2>
                <button className="db-primary-btn" onClick={() => navigate('/workspace')}>
                  <Wand2 size={16} /> Apply All with AI
                </button>
              </div>
              {suggestions.map(s => (
                <div key={s.id} className="db-suggestion-full glass-card">
                  <div className="db-suggestion-full-header">
                    <div className="db-suggestion-priority db-suggestion-priority--lg"
                      style={{ background: priorityBg[s.priority], color: priorityColors[s.priority], borderColor: `${priorityColors[s.priority]}33` }}>
                      {s.priority.toUpperCase()} PRIORITY
                    </div>
                    <span className="db-suggestion-section-tag">📌 {s.section}</span>
                  </div>
                  <h3 className="db-suggestion-full-title">{s.title}</h3>
                  <p className="db-suggestion-full-desc">{s.description}</p>
                  <button className="db-apply-btn" onClick={() => navigate('/workspace')}>
                    Apply This Fix <ChevronRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ── FORMATTING ── */}
          {activeNav === 'formatting' && (
            <div className="db-format-section">
              <div className="db-two-col">
                {[
                  { label: 'Format Score', score: formatScore, color: 'var(--accent-cyan)', desc: 'Layout, spacing, and structure compatibility with ATS parsers.' },
                  { label: 'Keyword Score', score: keywordScore, color: 'var(--accent-purple-light)', desc: 'How well your keywords match job market requirements.' },
                  { label: 'Clarity Score', score: clarityScore, color: 'var(--accent-emerald)', desc: 'Readability, action verbs, and quantified achievements.' },
                  { label: 'Section Score', score: sectionScore, color: 'var(--accent-amber)', desc: 'Presence of key resume sections (Summary, Experience, Skills, Education).' },
                ].map(({ label, score, color, desc }) => (
                  <div key={label} className="db-format-card glass-card">
                    <div className="db-format-top">
                      <h3 className="db-card-title">{label}</h3>
                      <span className="db-format-score" style={{ color }}>{score}%</span>
                    </div>
                    <div className="db-format-bar-track">
                      <div className="db-format-bar-fill" style={{ width: `${score}%`, background: color }} />
                    </div>
                    <p className="db-format-desc">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
