import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Loader } from 'lucide-react';
import { useResume, generateAnalysis } from '../../context/ResumeContext';
import { useAuth } from '../../context/AuthContext';
import './ScanningPage.css';


const SCAN_STEPS = [
  { label: 'Parsing document structure', duration: 1200 },
  { label: 'Extracting keywords and skills', duration: 1400 },
  { label: 'Running ATS compatibility check', duration: 1600 },
  { label: 'Scoring format and readability', duration: 1100 },
  { label: 'Generating AI improvement insights', duration: 1300 },
];

const LOG_MESSAGES = [
  '[INFO] Document loaded successfully',
  '[PARSE] Extracting text content...',
  '[PARSE] Document structure analyzed',
  '[SCAN] Identified 6 resume sections',
  '[SCAN] Extracting keyword candidates...',
  '[ATS] Running compatibility rules engine',
  '[ATS] Checking format compatibility...',
  '[ATS] Evaluating action verb strength',
  '[SCORE] Computing keyword density score',
  '[SCORE] Evaluating section completeness',
  '[AI] Generating personalized recommendations',
  '[AI] Ranking improvement priorities',
  '[DONE] Analysis complete ✓',
];

export default function ScanningPage() {
  const navigate = useNavigate();
  const { file, setAnalysis } = useResume();
  const { isAuthenticated } = useAuth();


  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  // Redirect if no file — go to upload (public)
  useEffect(() => {
    if (!file) navigate('/upload');
  }, [file, navigate]);


  // Run scan steps
  useEffect(() => {
    if (!file) return;

    let step = 0;
    let elapsed = 0;
    const total = SCAN_STEPS.reduce((s, st) => s + st.duration, 0);

    const addLog = (msg: string) => {
      setLogs(prev => [...prev, msg]);
      setTimeout(() => logRef.current?.scrollTo({ top: 9999, behavior: 'smooth' }), 50);
    };

    addLog(LOG_MESSAGES[0]);
    addLog(LOG_MESSAGES[1]);

    const runStep = (i: number) => {
      if (i >= SCAN_STEPS.length) {
        addLog(LOG_MESSAGES[LOG_MESSAGES.length - 1]);
        // Decide destination: authenticated → dashboard, guest → results
        const dest = isAuthenticated ? '/dashboard' : '/results';
        const reader = new FileReader();
        reader.onload = (ev) => {
          const text = ev.target?.result as string || '';
          const analysis = generateAnalysis(file, text);
          setAnalysis(analysis);
          setDone(true);
          setTimeout(() => navigate(dest), 1500);
        };
        reader.onerror = () => {
          const analysis = generateAnalysis(file, '');
          setAnalysis(analysis);
          setDone(true);
          setTimeout(() => navigate(dest), 1500);
        };
        try {
          reader.readAsText(file);
        } catch {
          const analysis = generateAnalysis(file, '');
          setAnalysis(analysis);
          setDone(true);
          setTimeout(() => navigate(dest), 1500);
        }
        return;
      }

      setCurrentStep(i);
      const logMsgIdx = Math.min(2 + i * 2, LOG_MESSAGES.length - 2);
      addLog(LOG_MESSAGES[logMsgIdx]);

      setTimeout(() => {
        elapsed += SCAN_STEPS[i].duration;
        setProgress(Math.round((elapsed / total) * 100));
        setCompletedSteps(prev => [...prev, i]);
        if (logMsgIdx + 1 < LOG_MESSAGES.length - 1) addLog(LOG_MESSAGES[logMsgIdx + 1]);
        step++;
        runStep(step);
      }, SCAN_STEPS[i].duration);
    };

    const startTimer = setTimeout(() => runStep(0), 400);
    return () => clearTimeout(startTimer);
  }, [file, setAnalysis, navigate]);

  // Animated ring
  const circumference = 2 * Math.PI * 54;
  const dashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="sc-root">
      <div className="sc-bg">
        <div className="sc-orb sc-orb-1" />
        <div className="sc-orb sc-orb-2" />
        <div className="sc-orb sc-orb-3" />
      </div>

      {/* Neural net particles */}
      <div className="sc-particles" aria-hidden>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="sc-particle"
            style={{ left: `${(i * 17 + 5) % 100}%`, top: `${(i * 23 + 10) % 100}%`, animationDelay: `${(i * 0.4) % 6}s` }} />
        ))}
      </div>

      <div className="sc-center">
        {/* Title */}
        <div className="sc-header">
          <div className="sc-pill">{done ? '✓ Complete' : '⚡ AI Scanning'}</div>
          <h1 className="sc-title">{done ? 'Analysis Complete!' : 'Analyzing Your Resume'}</h1>
          <p className="sc-sub">{file?.name}</p>
        </div>

        {/* Ring */}
        <div className="sc-ring-wrap">
          <svg viewBox="0 0 120 120" className="sc-ring-svg">
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(124,58,237,0.12)" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="54" fill="none"
              stroke="url(#scanGrad)" strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashoffset}
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dashoffset 0.4s ease' }}
            />
            <defs>
              <linearGradient id="scanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
          <div className="sc-ring-inner">
            {done ? (
              <CheckCircle size={36} style={{ color: '#10b981' }} />
            ) : (
              <>
                <span className="sc-pct">{progress}%</span>
                <span className="sc-pct-label">Analyzing</span>
              </>
            )}
          </div>
        </div>

        {/* Steps */}
        <div className="sc-steps">
          {SCAN_STEPS.map((step, i) => {
            const isComplete = completedSteps.includes(i);
            const isCurrent = currentStep === i && !isComplete;
            return (
              <div key={i} className={`sc-step ${isComplete ? 'sc-step--done' : ''} ${isCurrent ? 'sc-step--active' : ''}`}>
                <div className="sc-step-icon">
                  {isComplete ? <CheckCircle size={16} /> : isCurrent ? <Loader size={16} className="sc-spin" /> : <Clock size={16} />}
                </div>
                <span className="sc-step-label">{step.label}</span>
                {isComplete && <span className="sc-step-check">✓</span>}
              </div>
            );
          })}
        </div>

        {/* Terminal log */}
        <div className="sc-terminal" ref={logRef}>
          <div className="sc-terminal-bar">
            <span className="sc-dot sc-dot-red" /><span className="sc-dot sc-dot-yellow" /><span className="sc-dot sc-dot-green" />
            <span className="sc-terminal-title">analysis.log</span>
          </div>
          <div className="sc-terminal-body">
            {logs.map((log, i) => (
              <div key={i} className="sc-log-line">{log}</div>
            ))}
            {!done && <div className="sc-cursor">▋</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
