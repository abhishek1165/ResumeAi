import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload, X, CheckCircle, Shield, Zap, AlertTriangle,
  FileText, Loader,
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { useAuth } from '../../context/AuthContext';
import './UploadPage.css';

const ACCEPTED = ['.pdf', '.doc', '.docx', '.txt'];
const MAX_MB = 10;

export default function UploadPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setFile } = useResume();

  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (f: File): string => {
    const ext = '.' + f.name.split('.').pop()?.toLowerCase();
    if (!ACCEPTED.includes(ext)) return 'Please upload a PDF, DOC, DOCX, or TXT file.';
    if (f.size > MAX_MB * 1024 * 1024) return `File size must be under ${MAX_MB}MB.`;
    return '';
  };

  const handleFileSelect = (f: File) => {
    const err = validateFile(f);
    if (err) { setError(err); return; }
    setError('');
    setSelectedFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFileSelect(f);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setFile(selectedFile);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 80));
      setUploadProgress(i);
    }
    navigate('/scanning');
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (name: string) => {
    const ext = name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return '📄';
    if (ext === 'doc' || ext === 'docx') return '📝';
    return '📃';
  };

  return (
    <div className="up-root">
      {/* Background */}
      <div className="up-bg">
        <div className="up-orb up-orb-1" />
        <div className="up-orb up-orb-2" />
        <div className="up-orb up-orb-3" />
        <div className="up-grid" />
      </div>

      {/* Top nav */}
      <div className="up-topbar">
        <div className="up-logo">
          <div className="up-logo-icon"><Zap size={18} /></div>
          <span className="up-logo-text">ResumeIQ AI</span>
        </div>
        <div className="up-user">
          <div className="up-user-avatar">{user?.name?.charAt(0).toUpperCase() ?? 'U'}</div>
          <span className="up-user-name">{user?.name}</span>
        </div>
      </div>

      <div className="up-content">
        <div className="up-header animate-fadeInUp">
          <div className="up-pill"><Zap size={13} /> Upload Resume</div>
          <h1 className="up-title">Analyze Your <span className="gradient-text">Resume</span></h1>
          <p className="up-subtitle">Upload your resume and get an instant AI-powered ATS score with detailed feedback.</p>
        </div>

        {/* Drop zone */}
        <div
          className={`up-dropzone glass-card animate-fadeInUp ${dragOver ? 'up-dropzone--active' : ''} ${selectedFile ? 'up-dropzone--has-file' : ''}`}
          style={{ animationDelay: '100ms' }}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !selectedFile && inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED.join(',')}
            style={{ display: 'none' }}
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); }}
          />

          {!selectedFile ? (
            <div className="up-empty">
              <div className={`up-upload-icon ${dragOver ? 'up-upload-icon--active' : ''}`}>
                <Upload size={48} />
              </div>
              <h3 className="up-drop-title">{dragOver ? 'Drop it here!' : 'Drop your resume here'}</h3>
              <p className="up-drop-sub">or <span className="up-browse-link" onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}>click to browse</span></p>
              <div className="up-format-badges">
                {['PDF', 'DOCX', 'DOC', 'TXT'].map(f => <span key={f} className="up-format-badge">{f}</span>)}
              </div>
              <p className="up-size-note">Maximum file size: {MAX_MB}MB</p>
            </div>
          ) : (
            <div className="up-file-info">
              <div className="up-file-icon">{getFileIcon(selectedFile.name)}</div>
              <div className="up-file-meta">
                <p className="up-file-name">{selectedFile.name}</p>
                <p className="up-file-size">{formatSize(selectedFile.size)}</p>
              </div>
              <button className="up-remove-btn" onClick={e => { e.stopPropagation(); setSelectedFile(null); setUploadProgress(0); setUploading(false); }}>
                <X size={18} />
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="up-error animate-fadeInUp">
            <AlertTriangle size={16} /> {error}
          </div>
        )}

        {/* Upload progress */}
        {uploading && (
          <div className="up-progress animate-fadeInUp">
            <div className="up-progress-header">
              <Loader size={16} className="up-spin" />
              <span>{uploadProgress < 100 ? `Uploading... ${uploadProgress}%` : 'Processing resume...'}</span>
            </div>
            <div className="up-progress-track">
              <div className="up-progress-fill" style={{ width: `${uploadProgress}%` }} />
            </div>
          </div>
        )}

        {/* Analyze button */}
        {selectedFile && !uploading && (
          <button className="up-analyze-btn animate-fadeInUp" onClick={handleAnalyze}>
            <Zap size={20} />
            Analyze Resume with AI
          </button>
        )}

        {/* Trust badges */}
        <div className="up-trust animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          {[
            { icon: <Zap size={18} />, label: 'AI-Powered Analysis' },
            { icon: <Shield size={18} />, label: 'Secure & Private' },
            { icon: <CheckCircle size={18} />, label: 'Instant Results' },
            { icon: <FileText size={18} />, label: 'All Formats Supported' },
          ].map(({ icon, label }) => (
            <div key={label} className="up-trust-badge">
              <span className="up-trust-icon">{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <p className="up-privacy-note">
          <Shield size={12} /> Files are encrypted in transit and deleted after analysis. We never store your resume data.
        </p>
      </div>
    </div>
  );
}
