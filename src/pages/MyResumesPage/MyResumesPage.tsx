import { useState } from 'react';
import {
  Upload,
  FileText,
  Eye,
  Zap,
  Trash2,
  TrendingUp,
  Award,
  BarChart2,
  Activity,
  Lightbulb,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader,
  Star,
  Target,
  BookOpen,
} from 'lucide-react';
import './MyResumesPage.css';

interface Resume {
  id: string;
  name: string;
  score: number;
  uploadDate: string;
  status: 'optimized' | 'needs-work' | 'in-progress';
  size: string;
}

interface ActivityItem {
  id: string;
  action: string;
  target: string;
  time: string;
  icon: 'check' | 'zap' | 'eye' | 'upload';
}

interface InsightCard {
  id: string;
  title: string;
  body: string;
  icon: 'target' | 'book' | 'star';
  color: 'purple' | 'cyan' | 'emerald';
}

const RESUMES: Resume[] = [
  {
    id: '1',
    name: 'Software_Engineer_Resume.pdf',
    score: 89,
    uploadDate: 'May 18, 2026',
    status: 'optimized',
    size: '245 KB',
  },
  {
    id: '2',
    name: 'Backend_Dev_Resume.pdf',
    score: 72,
    uploadDate: 'May 15, 2026',
    status: 'needs-work',
    size: '198 KB',
  },
  {
    id: '3',
    name: 'ML_Engineer_Resume.pdf',
    score: 55,
    uploadDate: 'May 10, 2026',
    status: 'needs-work',
    size: '312 KB',
  },
  {
    id: '4',
    name: 'Frontend_Resume.pdf',
    score: 91,
    uploadDate: 'May 5, 2026',
    status: 'optimized',
    size: '178 KB',
  },
];

const ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    action: 'Analyzed',
    target: 'Software_Engineer_Resume.pdf',
    time: '2 hours ago',
    icon: 'zap',
  },
  {
    id: '2',
    action: 'Uploaded',
    target: 'ML_Engineer_Resume.pdf',
    time: '1 day ago',
    icon: 'upload',
  },
  {
    id: '3',
    action: 'Viewed',
    target: 'Frontend_Resume.pdf',
    time: '2 days ago',
    icon: 'eye',
  },
  {
    id: '4',
    action: 'Optimized',
    target: 'Backend_Dev_Resume.pdf',
    time: '3 days ago',
    icon: 'check',
  },
  {
    id: '5',
    action: 'Analyzed',
    target: 'Frontend_Resume.pdf',
    time: '5 days ago',
    icon: 'zap',
  },
];

const INSIGHTS: InsightCard[] = [
  {
    id: '1',
    title: 'Boost ML_Engineer_Resume',
    body:
      'Adding quantified metrics to your ML roles could increase your ATS score by ~15 points. Try adding "Improved model accuracy by X%".',
    icon: 'target',
    color: 'purple',
  },
  {
    id: '2',
    title: 'Trending Keywords',
    body:
      '"LLMs", "Retrieval Augmented Generation", and "MLOps" are top keywords for AI roles this month. Consider adding them.',
    icon: 'book',
    color: 'cyan',
  },
  {
    id: '3',
    title: 'Your Best Performing Resume',
    body:
      'Frontend_Resume.pdf (91/100) is your strongest resume. Use it as a template base for new versions.',
    icon: 'star',
    color: 'emerald',
  },
];

const getScoreColor = (score: number) => {
  if (score >= 85) return '#10b981';
  if (score >= 65) return '#f59e0b';
  return '#ef4444';
};

const getScoreDash = (score: number) => {
  const circumference = 2 * Math.PI * 20;
  return circumference - (score / 100) * circumference;
};

const StatusBadge = ({ status }: { status: Resume['status'] }) => {
  const map = {
    optimized: { label: 'Optimized', icon: CheckCircle, cls: 'badge--green' },
    'needs-work': { label: 'Needs Work', icon: AlertCircle, cls: 'badge--amber' },
    'in-progress': { label: 'In Progress', icon: Loader, cls: 'badge--blue' },
  };
  const { label, icon: Icon, cls } = map[status];
  return (
    <span className={`myr-status-badge ${cls}`}>
      <Icon size={11} />
      {label}
    </span>
  );
};

const ActivityIcon = ({ icon }: { icon: ActivityItem['icon'] }) => {
  const map = {
    check: { Icon: CheckCircle, cls: 'act-icon--green' },
    zap: { Icon: Zap, cls: 'act-icon--purple' },
    eye: { Icon: Eye, cls: 'act-icon--cyan' },
    upload: { Icon: Upload, cls: 'act-icon--blue' },
  };
  const { Icon, cls } = map[icon];
  return (
    <div className={`myr-act-icon ${cls}`}>
      <Icon size={14} />
    </div>
  );
};

const InsightIcon = ({
  icon,
  color,
}: {
  icon: InsightCard['icon'];
  color: InsightCard['color'];
}) => {
  const icons = { target: Target, book: BookOpen, star: Star };
  const Icon = icons[icon];
  return (
    <div className={`myr-insight-icon myr-insight-icon--${color}`}>
      <Icon size={18} />
    </div>
  );
};

export default function MyResumesPage() {
  const [resumes, setResumes] = useState<Resume[]>(RESUMES);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setDeletingId(id);
    setTimeout(() => {
      setResumes((prev) => prev.filter((r) => r.id !== id));
      setDeletingId(null);
    }, 500);
  };

  const avgScore = Math.round(
    resumes.reduce((acc, r) => acc + r.score, 0) / resumes.length
  );
  const bestScore = Math.max(...resumes.map((r) => r.score));

  return (
    <div className="myr-page">
      {/* Background */}
      <div className="myr-bg">
        <div className="myr-orb myr-orb--purple" />
        <div className="myr-orb myr-orb--cyan" />
        <div className="myr-orb myr-orb--emerald" />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Page Header */}
        <div className="myr-header">
          <div className="myr-header__text animate-fadeInUp">
            <div className="myr-header__eyebrow">
              <Activity size={14} />
              <span>Dashboard</span>
            </div>
            <h1 className="myr-page-title">
              My <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="myr-page-subtitle">
              Track, manage, and optimize all your resumes in one place.
            </p>
          </div>
          <button className="myr-upload-btn">
            <Upload size={16} />
            Upload New Resume
          </button>
        </div>

        {/* Stats Row */}
        <div className="myr-stats-row">
          {[
            {
              icon: FileText,
              label: 'Total Resumes',
              value: resumes.length,
              color: 'purple',
              sub: 'in your library',
            },
            {
              icon: BarChart2,
              label: 'Avg ATS Score',
              value: `${avgScore}`,
              color: 'cyan',
              sub: 'across all resumes',
            },
            {
              icon: Award,
              label: 'Best Score',
              value: `${bestScore}/100`,
              color: 'emerald',
              sub: 'Frontend_Resume.pdf',
            },
            {
              icon: TrendingUp,
              label: 'Analyses Run',
              value: '12',
              color: 'amber',
              sub: 'this month',
            },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="myr-stat-card glass-card"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={`myr-stat-icon myr-stat-icon--${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="myr-stat-label">{stat.label}</p>
                <p className={`myr-stat-value myr-stat-value--${stat.color}`}>
                  {stat.value}
                </p>
                <p className="myr-stat-sub">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="myr-main-grid">
          {/* Left: Resumes + Insights */}
          <div className="myr-left">
            {/* Resume Grid */}
            <div className="myr-section-header">
              <h2 className="myr-section-title">
                <FileText size={18} />
                Recent Resumes
              </h2>
              <span className="myr-section-count">{resumes.length} files</span>
            </div>

            <div className="myr-resumes-grid">
              {resumes.map((resume, i) => (
                <div
                  key={resume.id}
                  className={`myr-resume-card glass-card ${
                    deletingId === resume.id ? 'myr-resume-card--deleting' : ''
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {/* Card Header */}
                  <div className="myr-resume-card__header">
                    <div className="myr-resume-file-icon">
                      <FileText size={22} />
                    </div>

                    {/* Score Ring */}
                    <div className="myr-score-ring">
                      <svg viewBox="0 0 48 48" width="48" height="48">
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          fill="none"
                          stroke="rgba(255,255,255,0.08)"
                          strokeWidth="3"
                        />
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          fill="none"
                          stroke={getScoreColor(resume.score)}
                          strokeWidth="3"
                          strokeDasharray={`${2 * Math.PI * 20}`}
                          strokeDashoffset={getScoreDash(resume.score)}
                          strokeLinecap="round"
                          transform="rotate(-90 24 24)"
                          style={{ transition: 'stroke-dashoffset 1s ease' }}
                        />
                      </svg>
                      <span
                        className="myr-score-ring__value"
                        style={{ color: getScoreColor(resume.score) }}
                      >
                        {resume.score}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="myr-resume-card__body">
                    <h3 className="myr-resume-name" title={resume.name}>
                      {resume.name}
                    </h3>
                    <div className="myr-resume-meta">
                      <span>
                        <Clock size={11} />
                        {resume.uploadDate}
                      </span>
                      <span>{resume.size}</span>
                    </div>
                    <StatusBadge status={resume.status} />
                  </div>

                  {/* Card Actions */}
                  <div className="myr-resume-card__actions">
                    <button className="myr-card-btn myr-card-btn--view">
                      <Eye size={13} />
                      View
                    </button>
                    <button className="myr-card-btn myr-card-btn--analyze">
                      <Zap size={13} />
                      Analyze
                    </button>
                    <button
                      className="myr-card-btn myr-card-btn--delete"
                      onClick={() => handleDelete(resume.id)}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Insights */}
            <div className="myr-section-header" style={{ marginTop: 40 }}>
              <h2 className="myr-section-title">
                <Lightbulb size={18} />
                AI Career Insights
              </h2>
            </div>
            <div className="myr-insights-grid">
              {INSIGHTS.map((insight) => (
                <div key={insight.id} className="myr-insight-card glass-card">
                  <InsightIcon icon={insight.icon} color={insight.color} />
                  <div>
                    <h4 className="myr-insight-title">{insight.title}</h4>
                    <p className="myr-insight-body">{insight.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Activity Timeline */}
          <div className="myr-right">
            <div className="myr-activity-panel glass-card">
              <div className="myr-activity-header">
                <Activity size={16} />
                <h3>Recent Activity</h3>
              </div>
              <div className="myr-activity-list">
                {ACTIVITIES.map((item, i) => (
                  <div
                    key={item.id}
                    className="myr-activity-item"
                    style={{ animationDelay: `${i * 0.07}s` }}
                  >
                    <div className="myr-activity-item__left">
                      <ActivityIcon icon={item.icon} />
                      <div className="myr-activity-line" />
                    </div>
                    <div className="myr-activity-item__content">
                      <p className="myr-activity-action">
                        <span>{item.action}</span>{' '}
                        <span className="myr-activity-file">{item.target}</span>
                      </p>
                      <p className="myr-activity-time">
                        <Clock size={10} />
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tips Card */}
            <div className="myr-tips-card glass-card">
              <div className="myr-tips-header">
                <Star size={16} className="myr-tips-star" />
                <h3>Pro Tips</h3>
              </div>
              <ul className="myr-tips-list">
                <li>
                  <CheckCircle size={13} />
                  Tailor each resume to the specific job description
                </li>
                <li>
                  <CheckCircle size={13} />
                  Use action verbs and quantify achievements
                </li>
                <li>
                  <CheckCircle size={13} />
                  Keep your resume to 1–2 pages max
                </li>
                <li>
                  <CheckCircle size={13} />
                  Run ATS analysis before each application
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
