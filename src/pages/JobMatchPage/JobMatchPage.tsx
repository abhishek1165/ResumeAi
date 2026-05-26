import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Building2,
  Search,
  CheckCircle,
  XCircle,
  Loader2,
  Target,
  Lightbulb,
  TrendingUp,
  Zap,
  AlertCircle,
  ArrowRight,
  FileSearch,
} from 'lucide-react';
import './JobMatchPage.css';

interface SkillCategory {
  name: string;
  match: number;
  total: number;
}

interface Recommendation {
  title: string;
  body: string;
  priority: 'high' | 'medium' | 'low';
}

const MATCHED_KEYWORDS = [
  'React', 'TypeScript', 'Node.js', 'REST APIs', 'Git', 'AWS',
  'Agile', 'Docker', 'PostgreSQL', 'GraphQL', 'CI/CD', 'Microservices',
  'Testing', 'Code Review', 'System Design', 'Leadership', 'Mentoring',
  'Performance Optimization', 'Cloud Architecture', 'Redis', 'Kubernetes',
  'Python', 'Problem Solving',
];

const MISSING_KEYWORDS = [
  'Terraform', 'Go', 'Kafka', 'gRPC', 'Prometheus', 'Grafana', 'Rust', 'Spark',
];

const SKILL_CATEGORIES: SkillCategory[] = [
  { name: 'Frontend Development', match: 9, total: 10 },
  { name: 'Backend & APIs', match: 7, total: 9 },
  { name: 'Cloud & DevOps', match: 5, total: 8 },
  { name: 'Data & Databases', match: 4, total: 6 },
  { name: 'Soft Skills', match: 4, total: 5 },
];

const RECOMMENDATIONS: Recommendation[] = [
  {
    title: 'Add Infrastructure as Code Skills',
    body:
      'The job requires Terraform experience. Highlight any IaC tools you\'ve used (Pulumi, CloudFormation) or add a brief mention of your cloud provisioning experience.',
    priority: 'high',
  },
  {
    title: 'Mention Observability Tools',
    body:
      'Prometheus and Grafana appear in the JD. If you\'ve worked with monitoring/alerting tools, add them to your skills section—even basic experience counts.',
    priority: 'medium',
  },
  {
    title: 'Quantify Leadership Impact',
    body:
      'The role emphasizes team leadership. Add metrics like "Led a team of X engineers" or "Reduced onboarding time by Y%" to strengthen this area.',
    priority: 'medium',
  },
];

const PRIORITY_COLORS = {
  high: { bg: 'rgba(239,68,68,0.1)', color: '#f87171', border: 'rgba(239,68,68,0.2)' },
  medium: { bg: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: 'rgba(245,158,11,0.2)' },
  low: { bg: 'rgba(16,185,129,0.1)', color: '#34d399', border: 'rgba(16,185,129,0.2)' },
};

export default function JobMatchPage() {
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [scoreAnimated, setScoreAnimated] = useState(false);

  const handleAnalyze = () => {
    if (!jobDescription.trim()) return;
    setIsAnalyzing(true);
    setShowResults(false);
    setScoreAnimated(false);

    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      setTimeout(() => setScoreAnimated(true), 300);
    }, 2200);
  };

  const compatibilityScore = 78;
  const circumference = 2 * Math.PI * 54;
  const dashOffset = scoreAnimated
    ? circumference - (compatibilityScore / 100) * circumference
    : circumference;

  const getScoreColor = (s: number) =>
    s >= 80 ? '#10b981' : s >= 60 ? '#f59e0b' : '#ef4444';

  const scoreColor = getScoreColor(compatibilityScore);

  return (
    <div className="jm-page">
      {/* Background */}
      <div className="jm-bg">
        <div className="jm-orb jm-orb--purple" />
        <div className="jm-orb jm-orb--cyan" />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Page Header */}
        <div className="jm-header animate-fadeInUp">
          <div className="jm-header__eyebrow">
            <Target size={14} />
            <span>Job Match AI</span>
          </div>
          <h1 className="jm-page-title">
            Match Your Resume to Any{' '}
            <span className="gradient-text">Job Description</span>
          </h1>
          <p className="jm-page-subtitle">
            Paste a job description and get instant compatibility analysis with
            personalized optimization tips.
          </p>
        </div>

        {/* Main 2-col layout */}
        <div className="jm-layout">
          {/* Left: Input Panel */}
          <div className="jm-input-panel glass-card">
            <div className="jm-input-panel__header">
              <FileSearch size={18} />
              <h2>Job Details</h2>
            </div>

            {/* Company + Position Inputs */}
            <div className="jm-inputs-row">
              <div className="jm-form-group">
                <label className="jm-label">
                  <Building2 size={13} />
                  Company Name
                </label>
                <input
                  className="jm-input"
                  type="text"
                  placeholder="e.g. Google, Stripe..."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="jm-form-group">
                <label className="jm-label">
                  <Briefcase size={13} />
                  Position
                </label>
                <input
                  className="jm-input"
                  type="text"
                  placeholder="e.g. Senior Engineer..."
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>
            </div>

            {/* Job Description Textarea */}
            <div className="jm-form-group">
              <label className="jm-label">
                <Search size={13} />
                Job Description
                <span className="jm-label-required">*</span>
              </label>
              <textarea
                className="jm-textarea"
                placeholder="Paste the full job description here...&#10;&#10;We'll analyze it against your resume and identify matched keywords, missing skills, and personalized recommendations."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={16}
              />
              <div className="jm-char-count">
                {jobDescription.length} characters
              </div>
            </div>

            {/* Analyze Button */}
            <button
              className={`jm-analyze-btn ${isAnalyzing ? 'jm-analyze-btn--loading' : ''}`}
              onClick={handleAnalyze}
              disabled={isAnalyzing || !jobDescription.trim()}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 size={18} className="jm-spinner" />
                  Analyzing Match...
                </>
              ) : (
                <>
                  <Zap size={18} />
                  Analyze Match
                </>
              )}
            </button>
          </div>

          {/* Right: Results Panel */}
          <div className="jm-results-panel">
            {/* Empty State */}
            {!isAnalyzing && !showResults && (
              <div className="jm-empty-state glass-card">
                <div className="jm-empty-illustration">
                  <div className="jm-empty-ring jm-empty-ring--outer" />
                  <div className="jm-empty-ring jm-empty-ring--middle" />
                  <div className="jm-empty-ring jm-empty-ring--inner" />
                  <div className="jm-empty-icon">
                    <Target size={32} />
                  </div>
                </div>
                <h3 className="jm-empty-title">Ready to Analyze</h3>
                <p className="jm-empty-body">
                  Paste a job description on the left and click{' '}
                  <strong>Analyze Match</strong> to see your compatibility score,
                  matched keywords, skills gaps, and AI recommendations.
                </p>
                <div className="jm-empty-features">
                  {[
                    'Keyword matching',
                    'Skills gap analysis',
                    'AI recommendations',
                    'ATS optimization tips',
                  ].map((f) => (
                    <span key={f} className="jm-empty-feature">
                      <CheckCircle size={12} />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Loading State */}
            {isAnalyzing && (
              <div className="jm-loading-state glass-card">
                <div className="jm-loading-animation">
                  <div className="jm-loading-ring" />
                  <div className="jm-loading-ring jm-loading-ring--2" />
                  <Zap size={24} className="jm-loading-icon" />
                </div>
                <h3 className="jm-loading-title">Analyzing Match...</h3>
                <div className="jm-loading-steps">
                  {[
                    'Parsing job description',
                    'Extracting keywords',
                    'Comparing with resume',
                    'Generating insights',
                  ].map((step, i) => (
                    <div key={step} className="jm-loading-step">
                      <div
                        className="jm-loading-step__dot"
                        style={{ animationDelay: `${i * 0.5}s` }}
                      />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {showResults && (
              <div className="jm-results animate-fadeInUp">
                {/* Score Card */}
                <div className="jm-score-card glass-card">
                  <div className="jm-score-card__left">
                    <div className="jm-score-ring-wrapper">
                      <svg viewBox="0 0 120 120" width="140" height="140">
                        {/* Background ring */}
                        <circle
                          cx="60" cy="60" r="54"
                          fill="none"
                          stroke="rgba(255,255,255,0.06)"
                          strokeWidth="8"
                        />
                        {/* Score arc */}
                        <circle
                          cx="60" cy="60" r="54"
                          fill="none"
                          stroke={scoreColor}
                          strokeWidth="8"
                          strokeDasharray={circumference}
                          strokeDashoffset={dashOffset}
                          strokeLinecap="round"
                          transform="rotate(-90 60 60)"
                          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.34,1.56,0.64,1)' }}
                        />
                      </svg>
                      <div className="jm-score-center">
                        <span
                          className="jm-score-number"
                          style={{ color: scoreColor }}
                        >
                          {compatibilityScore}%
                        </span>
                        <span className="jm-score-label">Match</span>
                      </div>
                    </div>
                  </div>
                  <div className="jm-score-card__right">
                    <div className="jm-score-badge" style={{ color: scoreColor }}>
                      <TrendingUp size={14} />
                      Good Match
                    </div>
                    <h3 className="jm-score-title">
                      {companyName ? companyName : 'Target Company'} —{' '}
                      {position ? position : 'Target Role'}
                    </h3>
                    <p className="jm-score-desc">
                      Your resume matches <strong>{compatibilityScore}%</strong> of
                      the job requirements. With a few targeted improvements, you
                      could reach 90%+.
                    </p>
                    <div className="jm-score-stats">
                      <div className="jm-score-stat">
                        <span className="jm-score-stat__num jm-score-stat__num--green">
                          {MATCHED_KEYWORDS.length}
                        </span>
                        <span className="jm-score-stat__label">Matched</span>
                      </div>
                      <div className="jm-score-stat">
                        <span className="jm-score-stat__num jm-score-stat__num--red">
                          {MISSING_KEYWORDS.length}
                        </span>
                        <span className="jm-score-stat__label">Missing</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Keywords */}
                <div className="jm-keywords-section">
                  <div className="jm-keywords-col">
                    <h4 className="jm-keywords-title jm-keywords-title--green">
                      <CheckCircle size={14} />
                      Matched Keywords ({MATCHED_KEYWORDS.length})
                    </h4>
                    <div className="jm-keywords-list">
                      {MATCHED_KEYWORDS.map((kw) => (
                        <span key={kw} className="jm-keyword jm-keyword--green">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="jm-keywords-col">
                    <h4 className="jm-keywords-title jm-keywords-title--red">
                      <XCircle size={14} />
                      Missing Keywords ({MISSING_KEYWORDS.length})
                    </h4>
                    <div className="jm-keywords-list">
                      {MISSING_KEYWORDS.map((kw) => (
                        <span key={kw} className="jm-keyword jm-keyword--red">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Skills Gap */}
                <div className="jm-skills-section glass-card">
                  <h4 className="jm-skills-title">
                    <BarChart size={16} />
                    Skills Gap Analysis
                  </h4>
                  <div className="jm-skills-list">
                    {SKILL_CATEGORIES.map((cat) => {
                      const pct = Math.round((cat.match / cat.total) * 100);
                      const color =
                        pct >= 85 ? '#10b981' : pct >= 65 ? '#f59e0b' : '#ef4444';
                      return (
                        <div key={cat.name} className="jm-skill-row">
                          <div className="jm-skill-row__header">
                            <span className="jm-skill-name">{cat.name}</span>
                            <span className="jm-skill-count" style={{ color }}>
                              {cat.match}/{cat.total}
                            </span>
                          </div>
                          <div className="jm-skill-bar">
                            <div
                              className="jm-skill-bar__fill"
                              style={{
                                width: scoreAnimated ? `${pct}%` : '0%',
                                background: color,
                                transition: 'width 1s ease',
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="jm-recs-section">
                  <h4 className="jm-recs-title">
                    <Lightbulb size={16} />
                    AI Recommendations
                  </h4>
                  <div className="jm-recs-list">
                    {RECOMMENDATIONS.map((rec, i) => {
                      const style = PRIORITY_COLORS[rec.priority];
                      return (
                        <div
                          key={i}
                          className="jm-rec-card glass-card"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        >
                          <div className="jm-rec-card__header">
                            <AlertCircle size={14} style={{ color: style.color }} />
                            <h5 className="jm-rec-title">{rec.title}</h5>
                            <span
                              className="jm-rec-priority"
                              style={{
                                background: style.bg,
                                color: style.color,
                                border: `1px solid ${style.border}`,
                              }}
                            >
                              {rec.priority}
                            </span>
                          </div>
                          <p className="jm-rec-body">{rec.body}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA */}
                <button
                  className="jm-optimize-btn"
                  onClick={() => navigate('/workspace')}
                >
                  <Zap size={18} />
                  Optimize for This Job
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Inline alias for icon not in lucide */
function BarChart({ size }: { size: number }) {
  return <TrendingUp size={size} />;
}
