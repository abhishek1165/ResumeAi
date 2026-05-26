import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  X,
  Wand2,
  Download,
  ChevronRight,
  Star,
  Zap,
  AlertCircle,
  CheckCircle,
  FileText,
  ArrowRight,
  Sparkles,
  SkipForward,
} from 'lucide-react';
import './WorkspacePage.css';

/* ─── Types ─────────────────────────────────────────────── */
interface Suggestion {
  id: number;
  section: string;
  type: 'IMPROVE' | 'ADD' | 'REWRITE' | 'ENHANCE';
  title: string;
  description: string;
  impact: 'high' | 'medium';
}

/* ─── Data ──────────────────────────────────────────────── */
const suggestions: Suggestion[] = [
  {
    id: 1,
    section: 'Work Experience',
    type: 'IMPROVE',
    title: 'Add quantified metrics to Work Experience bullets',
    description:
      'Replace vague statements like "improved performance" with specific numbers: "Improved application load time by 40%, serving 10K+ daily users."',
    impact: 'high',
  },
  {
    id: 2,
    section: 'Keywords',
    type: 'ADD',
    title: 'Add 8 missing keywords from job description',
    description:
      'Insert: Kubernetes, CI/CD, Agile, REST API, GraphQL, Terraform, Jenkins, Microservices — into relevant sections naturally.',
    impact: 'high',
  },
  {
    id: 3,
    section: 'Summary',
    type: 'REWRITE',
    title: 'Strengthen summary with an impact statement',
    description:
      'Begin with a strong value proposition: "Results-driven Software Engineer with 5+ years building scalable cloud-native applications, delivering 3x performance gains."',
    impact: 'medium',
  },
  {
    id: 4,
    section: 'Skills',
    type: 'ENHANCE',
    title: 'Add missing technical skills to Skills section',
    description:
      'Add Kubernetes, CI/CD, Terraform, GraphQL, and Agile methodologies. Group skills by category (Languages, Cloud, Tools) for better ATS parsing.',
    impact: 'medium',
  },
];

/* ─── Resume content helpers ─────────────────────────────── */
const OriginalExperience = () => (
  <div className="ws-resume-section">
    <div className="ws-resume-section-title">Work Experience</div>
    <div className="ws-resume-job">
      <div className="ws-resume-job-header">
        <span className="ws-resume-company">Tech Corp Inc.</span>
        <span className="ws-resume-dates">2021 – Present</span>
      </div>
      <div className="ws-resume-role">Senior Software Engineer</div>
      <ul className="ws-resume-bullets">
        <li className="ws-bullet ws-bullet--issue">
          <AlertCircle size={12} className="ws-bullet-icon" />
          Worked on improving the application performance
        </li>
        <li className="ws-bullet ws-bullet--issue">
          <AlertCircle size={12} className="ws-bullet-icon" />
          Led a team to deliver new features
        </li>
        <li className="ws-bullet ws-bullet--issue">
          <AlertCircle size={12} className="ws-bullet-icon" />
          Helped with backend development tasks
        </li>
        <li className="ws-bullet">Built React-based frontend components</li>
        <li className="ws-bullet">Managed AWS cloud infrastructure</li>
      </ul>
    </div>
  </div>
);

const OriginalSkills = () => (
  <div className="ws-resume-section">
    <div className="ws-resume-section-title">Skills</div>
    <div className="ws-skills-wrap">
      {['Python', 'React', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'PostgreSQL', 'Git'].map((s) => (
        <span key={s} className="ws-skill-chip">{s}</span>
      ))}
    </div>
  </div>
);

const OriginalSummary = () => (
  <div className="ws-resume-section">
    <div className="ws-resume-section-title">Professional Summary</div>
    <p className="ws-resume-para ws-resume-para--issue">
      Software engineer with experience in web development. Good at solving problems and working in teams.
      Looking for new opportunities.
    </p>
  </div>
);

const OriginalEducation = () => (
  <div className="ws-resume-section">
    <div className="ws-resume-section-title">Education</div>
    <div className="ws-resume-job-header">
      <span className="ws-resume-company">University of Technology</span>
      <span className="ws-resume-dates">2016 – 2020</span>
    </div>
    <div className="ws-resume-role">B.S. Computer Science — GPA 3.7</div>
  </div>
);

const OptimizedExperience = ({ applied }: { applied: boolean }) => (
  <div className="ws-resume-section">
    <div className="ws-resume-section-title">Work Experience</div>
    <div className="ws-resume-job">
      <div className="ws-resume-job-header">
        <span className="ws-resume-company">Tech Corp Inc.</span>
        <span className="ws-resume-dates">2021 – Present</span>
      </div>
      <div className="ws-resume-role">Senior Software Engineer</div>
      <ul className="ws-resume-bullets">
        {applied ? (
          <>
            <li className="ws-bullet ws-bullet--optimized">
              <CheckCircle size={12} className="ws-bullet-icon" />
              Reduced application load time by <strong>40%</strong>, improving UX for <strong>10K+ daily users</strong> through Node.js optimization and caching
            </li>
            <li className="ws-bullet ws-bullet--optimized">
              <CheckCircle size={12} className="ws-bullet-icon" />
              Led cross-functional team of <strong>6 engineers</strong>, delivering <strong>12 features</strong> on-time using <strong>Agile/Scrum</strong> methodology
            </li>
            <li className="ws-bullet ws-bullet--optimized">
              <CheckCircle size={12} className="ws-bullet-icon" />
              Architected <strong>microservices</strong> backend with <strong>REST APIs</strong> and <strong>GraphQL</strong>, handling 1M+ requests/day
            </li>
          </>
        ) : (
          <>
            <li className="ws-bullet ws-bullet--pending">Worked on improving the application performance</li>
            <li className="ws-bullet ws-bullet--pending">Led a team to deliver new features</li>
            <li className="ws-bullet ws-bullet--pending">Helped with backend development tasks</li>
          </>
        )}
        <li className="ws-bullet">Built React-based frontend components</li>
        <li className="ws-bullet">Managed AWS cloud infrastructure</li>
      </ul>
    </div>
  </div>
);

const OptimizedSkills = ({ applied }: { applied: boolean }) => (
  <div className="ws-resume-section">
    <div className="ws-resume-section-title">Skills</div>
    <div className="ws-skills-wrap">
      {['Python', 'React', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'PostgreSQL', 'Git'].map((s) => (
        <span key={s} className="ws-skill-chip">{s}</span>
      ))}
      {applied && (
        <>
          {['Kubernetes', 'CI/CD', 'Terraform', 'GraphQL', 'Agile'].map((s) => (
            <span key={s} className="ws-skill-chip ws-skill-chip--new">{s} ✦</span>
          ))}
        </>
      )}
    </div>
  </div>
);

const OptimizedSummary = ({ applied }: { applied: boolean }) => (
  <div className="ws-resume-section">
    <div className="ws-resume-section-title">Professional Summary</div>
    {applied ? (
      <p className="ws-resume-para ws-resume-para--optimized">
        Results-driven <strong>Software Engineer</strong> with <strong>5+ years</strong> building scalable cloud-native applications using React, Node.js, and AWS. Delivered <strong>3× performance improvements</strong> and led cross-functional teams to ship products serving <strong>1M+ users</strong>. Proficient in Agile methodologies and microservices architecture.
      </p>
    ) : (
      <p className="ws-resume-para ws-resume-para--pending">
        Software engineer with experience in web development. Good at solving problems and working in teams.
      </p>
    )}
  </div>
);

/* ─── Component ─────────────────────────────────────────── */
const WorkspacePage: React.FC = () => {
  const [appliedIds, setAppliedIds] = useState<Set<number>>(new Set());
  const [skippedIds, setSkippedIds] = useState<Set<number>>(new Set());

  const handleApply = (id: number) => {
    setAppliedIds((prev) => new Set([...prev, id]));
    setSkippedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleSkip = (id: number) => {
    setSkippedIds((prev) => new Set([...prev, id]));
    setAppliedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleApplyAll = () => {
    setAppliedIds(new Set(suggestions.map((s) => s.id)));
    setSkippedIds(new Set());
  };

  const appliedCount = appliedIds.size;
  const totalCount = suggestions.length;
  const progressPct = (appliedCount / totalCount) * 100;

  const projectedScore = Math.round(72 + (appliedCount / totalCount) * 17);

  const typeColor: Record<Suggestion['type'], string> = {
    IMPROVE: '#f59e0b',
    ADD: '#7c3aed',
    REWRITE: '#06b6d4',
    ENHANCE: '#10b981',
  };

  const typeBg: Record<Suggestion['type'], string> = {
    IMPROVE: 'rgba(245,158,11,0.12)',
    ADD: 'rgba(124,58,237,0.12)',
    REWRITE: 'rgba(6,182,212,0.12)',
    ENHANCE: 'rgba(16,185,129,0.12)',
  };

  return (
    <div className="ws-root">
      {/* ── Header ── */}
      <header className="ws-header">
        <div className="ws-header-left">
          <div className="ws-header-logo">
            <Wand2 size={18} />
          </div>
          <div className="ws-header-info">
            <h1 className="ws-header-title">Resume Optimizer</h1>
            <span className="ws-header-sub">AI-powered improvement workspace</span>
          </div>
        </div>

        <div className="ws-header-center">
          <div className="ws-score-flow">
            <div className="ws-score-pill ws-score-pill--current">
              <span className="ws-score-num">72</span>
              <span className="ws-score-lbl">Current</span>
            </div>
            <div className="ws-score-arrow">
              <ArrowRight size={16} />
            </div>
            <div className="ws-score-pill ws-score-pill--projected">
              <Star size={12} />
              <span className="ws-score-num">{projectedScore}</span>
              <span className="ws-score-lbl">Projected</span>
            </div>
          </div>
        </div>

        <div className="ws-header-right">
          <button className="ws-header-btn ws-header-btn--ghost" onClick={handleApplyAll}>
            <Zap size={15} />
            Apply All
          </button>
          <button className="ws-header-btn ws-header-btn--outlined">
            <Download size={15} />
            Export
          </button>
          <Link to="/dashboard" className="ws-header-btn ws-header-btn--primary">
            <Check size={15} />
            Done
          </Link>
        </div>
      </header>

      {/* ── 3-Column Layout ── */}
      <div className="ws-columns">

        {/* ── Col 1: Original Resume ── */}
        <div className="ws-col ws-col--original">
          <div className="ws-col-header">
            <div className="ws-col-header-left">
              <FileText size={16} className="ws-col-header-icon" />
              <span className="ws-col-header-title">Original</span>
            </div>
            <span className="ws-col-score-badge ws-col-score-badge--warning">72</span>
          </div>

          <div className="ws-col-body">
            <OriginalSummary />
            <OriginalExperience />
            <OriginalSkills />
            <OriginalEducation />
          </div>
        </div>

        {/* ── Col 2: AI Suggestions ── */}
        <div className="ws-col ws-col--suggestions">
          <div className="ws-col-header">
            <div className="ws-col-header-left">
              <Sparkles size={16} className="ws-col-header-icon ws-col-header-icon--purple" />
              <span className="ws-col-header-title">AI Suggestions</span>
            </div>
            <span className="ws-col-score-badge ws-col-score-badge--purple">
              {appliedCount}/{totalCount}
            </span>
          </div>

          {/* Progress bar */}
          <div className="ws-suggestions-progress">
            <div className="ws-suggestions-progress-bar">
              <div
                className="ws-suggestions-progress-fill"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="ws-suggestions-progress-text">
              {appliedCount} of {totalCount} improvements applied
            </span>
          </div>

          <div className="ws-col-body">
            {suggestions.map((sug, i) => {
              const isApplied = appliedIds.has(sug.id);
              const isSkipped = skippedIds.has(sug.id);

              return (
                <div
                  key={sug.id}
                  className={`ws-sug-card ${isApplied ? 'ws-sug-card--applied' : ''} ${isSkipped ? 'ws-sug-card--skipped' : ''}`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {/* Card header */}
                  <div className="ws-sug-card-top">
                    <span className="ws-sug-section-tag">{sug.section}</span>
                    <span
                      className="ws-sug-type-badge"
                      style={{
                        color: typeColor[sug.type],
                        background: typeBg[sug.type],
                        borderColor: `${typeColor[sug.type]}44`,
                      }}
                    >
                      {sug.type}
                    </span>
                    {isApplied && (
                      <span className="ws-sug-applied-mark">
                        <CheckCircle size={14} />
                        Applied
                      </span>
                    )}
                    {isSkipped && (
                      <span className="ws-sug-skipped-mark">
                        <SkipForward size={13} />
                        Skipped
                      </span>
                    )}
                  </div>

                  {/* Impact */}
                  <div className="ws-sug-impact">
                    <span
                      className={`ws-impact-dot ws-impact-dot--${sug.impact}`}
                    />
                    <span className="ws-impact-label">
                      {sug.impact === 'high' ? 'High Impact' : 'Medium Impact'}
                    </span>
                  </div>

                  <h4 className="ws-sug-title">{sug.title}</h4>
                  <p className="ws-sug-desc">{sug.description}</p>

                  {/* Actions */}
                  {!isApplied && !isSkipped && (
                    <div className="ws-sug-actions">
                      <button
                        className="ws-sug-btn ws-sug-btn--apply"
                        onClick={() => handleApply(sug.id)}
                      >
                        <Check size={14} />
                        Apply
                      </button>
                      <button
                        className="ws-sug-btn ws-sug-btn--skip"
                        onClick={() => handleSkip(sug.id)}
                      >
                        <X size={14} />
                        Skip
                      </button>
                    </div>
                  )}

                  {isApplied && (
                    <div className="ws-sug-actions">
                      <button
                        className="ws-sug-btn ws-sug-btn--undo"
                        onClick={() => handleSkip(sug.id)}
                      >
                        <X size={13} />
                        Undo
                      </button>
                    </div>
                  )}

                  {isSkipped && (
                    <div className="ws-sug-actions">
                      <button
                        className="ws-sug-btn ws-sug-btn--apply"
                        onClick={() => handleApply(sug.id)}
                      >
                        <Check size={13} />
                        Apply Instead
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Col 3: Optimized Resume ── */}
        <div className="ws-col ws-col--optimized">
          <div className="ws-col-header">
            <div className="ws-col-header-left">
              <CheckCircle size={16} className="ws-col-header-icon ws-col-header-icon--emerald" />
              <span className="ws-col-header-title">Optimized</span>
            </div>
            <span className="ws-col-score-badge ws-col-score-badge--emerald">{projectedScore}</span>
          </div>

          <div className="ws-col-body">
            {/* Optimized summary */}
            <OptimizedSummary applied={appliedIds.has(3)} />

            {/* Optimized experience */}
            <OptimizedExperience applied={appliedIds.has(1)} />

            {/* Optimized skills */}
            <OptimizedSkills applied={appliedIds.has(4)} />

            {/* Education unchanged */}
            <OriginalEducation />

            {/* Applied watermark */}
            {appliedCount > 0 && (
              <div className="ws-optimized-banner">
                <CheckCircle size={15} />
                <span>{appliedCount} AI improvement{appliedCount > 1 ? 's' : ''} applied</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <footer className="ws-footer">
        <div className="ws-footer-left">
          <div className="ws-footer-progress">
            <div
              className="ws-footer-progress-fill"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="ws-footer-text">
            {appliedCount === totalCount
              ? '🎉 All improvements applied!'
              : `${appliedCount}/${totalCount} improvements applied — score ${projectedScore}/100`}
          </span>
        </div>

        <div className="ws-footer-right">
          {appliedCount < totalCount && (
            <button className="ws-footer-btn ws-footer-btn--ghost" onClick={handleApplyAll}>
              <Zap size={14} />
              Apply All Remaining
            </button>
          )}
          <button
            className={`ws-footer-btn ${appliedCount === totalCount ? 'ws-footer-btn--primary' : 'ws-footer-btn--outlined'}`}
          >
            <Check size={14} />
            {appliedCount === totalCount ? 'All Changes Applied ✓' : 'Save Progress'}
          </button>
          <Link to="/dashboard" className="ws-footer-btn ws-footer-btn--text">
            Back to Dashboard
            <ChevronRight size={14} />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default WorkspacePage;
