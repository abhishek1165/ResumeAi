import { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Printer,
  ChevronDown,
  Share2,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Link2,
  Briefcase,
  GraduationCap,
  Star,
} from 'lucide-react';
import './PreviewPage.css';

type Template = 'modern' | 'classic' | 'minimal';

const TEMPLATES: { value: Template; label: string }[] = [
  { value: 'modern', label: 'Modern' },
  { value: 'classic', label: 'Classic' },
  { value: 'minimal', label: 'Minimal' },
];

export default function PreviewPage() {
  const [zoom, setZoom] = useState(100);
  const [template, setTemplate] = useState<Template>('modern');
  const [templateOpen, setTemplateOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 10, 150));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 10, 50));
  const handleReset = () => setZoom(100);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedTemplate = TEMPLATES.find((t) => t.value === template)!;

  return (
    <div className="preview-page">
      {/* Background */}
      <div className="preview-bg">
        <div className="preview-orb preview-orb--purple" />
        <div className="preview-orb preview-orb--cyan" />
      </div>

      {/* Top Toolbar */}
      <div className="preview-toolbar glass">
        <div className="preview-toolbar__left">
          <div className="preview-toolbar__brand">
            <Star size={16} className="preview-toolbar__brand-icon" />
            <span>Resume Preview</span>
          </div>

          {/* Zoom Controls */}
          <div className="preview-zoom-group">
            <button
              className="preview-icon-btn"
              onClick={handleZoomOut}
              title="Zoom Out"
            >
              <ZoomOut size={16} />
            </button>
            <span className="preview-zoom-label">{zoom}%</span>
            <button
              className="preview-icon-btn"
              onClick={handleZoomIn}
              title="Zoom In"
            >
              <ZoomIn size={16} />
            </button>
            <button
              className="preview-icon-btn"
              onClick={handleReset}
              title="Reset Zoom"
            >
              <RotateCw size={14} />
            </button>
          </div>

          {/* Template Selector */}
          <div className="preview-template-selector">
            <button
              className="preview-template-btn"
              onClick={() => setTemplateOpen((o) => !o)}
            >
              <span>{selectedTemplate.label}</span>
              <ChevronDown
                size={14}
                style={{
                  transform: templateOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}
              />
            </button>
            {templateOpen && (
              <div className="preview-template-dropdown glass-card">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.value}
                    className={`preview-template-option ${
                      template === t.value
                        ? 'preview-template-option--active'
                        : ''
                    }`}
                    onClick={() => {
                      setTemplate(t.value);
                      setTemplateOpen(false);
                    }}
                  >
                    {t.label}
                    {template === t.value && <CheckCircle size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="preview-toolbar__right">
          <button
            className="preview-icon-btn preview-icon-btn--text"
            onClick={() => window.print()}
            title="Print"
          >
            <Printer size={16} />
            <span>Print</span>
          </button>
          <button
            className="preview-btn-gradient"
            onClick={handleDownload}
          >
            {downloaded ? (
              <>
                <CheckCircle size={16} />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <Download size={16} />
                <span>Export PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="preview-canvas">
        <div
          className={`preview-paper preview-paper--${template}`}
          style={{ transform: `scale(${zoom / 100})` }}
        >
          {/* ATS Score Badge */}
          <div className="preview-ats-badge">
            <div className="preview-ats-badge__dot" />
            <span>89/100 ATS Optimized</span>
          </div>

          {/* Resume Header */}
          <div className={`preview-resume-header preview-resume-header--${template}`}>
            {template === 'modern' && (
              <div className="preview-resume-header__accent" />
            )}
            <h1 className="preview-resume-name">Alex Johnson</h1>
            <p className="preview-resume-title">Senior Software Engineer</p>
            <div className="preview-resume-contact">
              <span>
                <Mail size={12} /> alex.johnson@email.com
              </span>
              <span className="preview-contact-sep">|</span>
              <span>
                <Phone size={12} /> (555) 123-4567
              </span>
              <span className="preview-contact-sep">|</span>
              <span>
                <MapPin size={12} /> San Francisco, CA
              </span>
              <span className="preview-contact-sep">|</span>
              <span>
                <Link2 size={12} /> linkedin.com/in/alexjohnson
              </span>
            </div>
          </div>

          {/* Summary */}
          <div className="preview-resume-section">
            <h2 className={`preview-section-title preview-section-title--${template}`}>
              Professional Summary
            </h2>
            <p className="preview-resume-text">
              Results-driven Senior Software Engineer with 8+ years of experience
              designing and building scalable web applications. Proven track record
              of leading cross-functional teams to deliver high-impact products.
              Expert in React, Node.js, and cloud architectures with a passion for
              clean code and developer experience.
            </p>
          </div>

          {/* Work Experience */}
          <div className="preview-resume-section">
            <h2 className={`preview-section-title preview-section-title--${template}`}>
              <Briefcase size={14} style={{ marginRight: 6 }} />
              Work Experience
            </h2>

            <div className="preview-job">
              <div className="preview-job-header">
                <div>
                  <h3 className="preview-job-title">Senior Software Engineer</h3>
                  <p className="preview-job-company">TechCorp Inc. — San Francisco, CA</p>
                </div>
                <span className="preview-job-date">Jan 2021 – Present</span>
              </div>
              <ul className="preview-job-bullets">
                <li>Led development of microservices architecture serving 5M+ daily active users</li>
                <li>Reduced API response time by 65% through Redis caching and query optimization</li>
                <li>Mentored team of 6 engineers, conducting code reviews and architectural planning</li>
                <li>Shipped 12 major features using React, TypeScript, and GraphQL</li>
              </ul>
            </div>

            <div className="preview-job">
              <div className="preview-job-header">
                <div>
                  <h3 className="preview-job-title">Software Engineer II</h3>
                  <p className="preview-job-company">StartupXYZ — Remote</p>
                </div>
                <span className="preview-job-date">Mar 2018 – Dec 2020</span>
              </div>
              <ul className="preview-job-bullets">
                <li>Built real-time collaboration features using WebSockets and React</li>
                <li>Designed and implemented CI/CD pipeline reducing deployment time by 80%</li>
                <li>Integrated third-party payment processing handling $2M+ monthly transactions</li>
              </ul>
            </div>
          </div>

          {/* Skills */}
          <div className="preview-resume-section">
            <h2 className={`preview-section-title preview-section-title--${template}`}>
              Technical Skills
            </h2>
            <div className="preview-skills">
              {[
                'React', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL',
                'Redis', 'AWS', 'Docker', 'Kubernetes', 'Python', 'Git', 'CI/CD',
              ].map((skill) => (
                <span key={skill} className={`preview-skill-tag preview-skill-tag--${template}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="preview-resume-section">
            <h2 className={`preview-section-title preview-section-title--${template}`}>
              <GraduationCap size={14} style={{ marginRight: 6 }} />
              Education
            </h2>
            <div className="preview-job-header">
              <div>
                <h3 className="preview-job-title">
                  B.S. Computer Science
                </h3>
                <p className="preview-job-company">University of California, Berkeley</p>
              </div>
              <span className="preview-job-date">2014 – 2018</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="preview-bottom-bar glass">
        <div className="preview-bottom-bar__info">
          <div className="preview-bottom-ats">
            <div className="preview-bottom-ats__ring">
              <svg viewBox="0 0 36 36" width="36" height="36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(16,185,129,0.2)" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeDasharray="94.25"
                  strokeDashoffset="11.31"
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <span className="preview-bottom-ats__score">89</span>
            </div>
            <div>
              <p className="preview-bottom-ats__label">ATS Score</p>
              <p className="preview-bottom-ats__sub">Excellent</p>
            </div>
          </div>
        </div>
        <div className="preview-bottom-bar__actions">
          <button className="preview-btn-outline" onClick={handleShare}>
            {copied ? (
              <>
                <CheckCircle size={16} />
                Link Copied!
              </>
            ) : (
              <>
                <Share2 size={16} />
                Share Link
              </>
            )}
          </button>
          <button className="preview-btn-gradient" onClick={handleDownload}>
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
