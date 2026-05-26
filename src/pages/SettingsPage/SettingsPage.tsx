import { useState, useRef } from 'react';
import {
  User,
  Lock,
  Bell,
  Palette,
  CreditCard,
  AlertTriangle,
  Camera,
  Check,
  X,
  ChevronRight,
  Eye,
  EyeOff,
  Shield,
  Smartphone,
  LogOut,
  Trash2,
  CheckCircle,
  Zap,
  BarChart2,
} from 'lucide-react';
import './SettingsPage.css';

type SettingsSection =
  | 'profile'
  | 'security'
  | 'notifications'
  | 'appearance'
  | 'subscription'
  | 'danger';

interface NavItem {
  id: SettingsSection;
  label: string;
  icon: React.ElementType;
  danger?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'subscription', label: 'Subscription', icon: CreditCard },
  { id: 'danger', label: 'Danger Zone', icon: AlertTriangle, danger: true },
];

const ACCENT_COLORS = [
  { id: 'purple', label: 'Purple', value: '#7c3aed' },
  { id: 'cyan', label: 'Cyan', value: '#06b6d4' },
  { id: 'emerald', label: 'Emerald', value: '#10b981' },
  { id: 'pink', label: 'Pink', value: '#ec4899' },
  { id: 'orange', label: 'Orange', value: '#f97316' },
  { id: 'blue', label: 'Blue', value: '#2563eb' },
];

const SESSIONS = [
  {
    device: 'MacBook Pro',
    location: 'San Francisco, CA',
    lastActive: 'Active now',
    current: true,
  },
  {
    device: 'iPhone 15 Pro',
    location: 'San Francisco, CA',
    lastActive: '2 hours ago',
    current: false,
  },
  {
    device: 'Chrome on Windows',
    location: 'New York, NY',
    lastActive: '3 days ago',
    current: false,
  },
];

function ProfileSection() {
  const [name, setName] = useState('Alex Johnson');
  const [email, setEmail] = useState('alex.johnson@email.com');
  const [bio, setBio] = useState(
    'Senior Software Engineer passionate about building products that matter.'
  );
  const [jobTitle, setJobTitle] = useState('Senior Software Engineer');
  const [location, setLocation] = useState('San Francisco, CA');
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="sp-section-content">
      <div className="sp-section-header">
        <h2 className="sp-section-title">Profile Settings</h2>
        <p className="sp-section-subtitle">
          Manage your personal information and public profile.
        </p>
      </div>

      <div className="sp-avatar-wrap glass-card">
        <div className="sp-avatar">
          <span>AJ</span>
          <button className="sp-avatar-btn" onClick={() => fileRef.current?.click()}>
            <Camera size={14} />
          </button>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} />
        </div>
        <div>
          <p className="sp-avatar-name">{name}</p>
          <p className="sp-avatar-sub">Click the camera icon to upload a new photo</p>
          <p className="sp-avatar-hint">JPG, PNG or GIF · max 5MB</p>
        </div>
      </div>

      <div className="sp-form glass-card">
        <div className="sp-form-grid">
          <div className="sp-form-group">
            <label className="sp-label">Full Name</label>
            <input className="sp-input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="sp-form-group">
            <label className="sp-label">Email Address</label>
            <input className="sp-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="sp-form-group">
            <label className="sp-label">Job Title</label>
            <input className="sp-input" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
          </div>
          <div className="sp-form-group">
            <label className="sp-label">Location</label>
            <input className="sp-input" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
        </div>
        <div className="sp-form-group">
          <label className="sp-label">Bio</label>
          <textarea className="sp-textarea" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} />
        </div>
        <div className="sp-form-footer">
          <button className="sp-save-btn" onClick={handleSave}>
            {saved ? (
              <><CheckCircle size={16} />Saved!</>
            ) : (
              <><Check size={16} />Save Changes</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function SecuritySection() {
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showPws, setShowPws] = useState<Record<string, boolean>>({});
  const [twoFa, setTwoFa] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);

  const toggleShow = (key: string) => setShowPws((s) => ({ ...s, [key]: !s[key] }));

  const handlePwSave = () => {
    setPwSaved(true);
    setTimeout(() => setPwSaved(false), 2000);
  };

  return (
    <div className="sp-section-content">
      <div className="sp-section-header">
        <h2 className="sp-section-title">Security</h2>
        <p className="sp-section-subtitle">Keep your account protected with strong credentials and 2FA.</p>
      </div>

      <div className="sp-form glass-card">
        <h3 className="sp-card-title"><Lock size={16} />Change Password</h3>
        <div className="sp-form-group">
          <label className="sp-label">Current Password</label>
          <div className="sp-input-wrap">
            <input className="sp-input sp-input--pw" type={showPws.current ? 'text' : 'password'}
              placeholder="Enter current password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} />
            <button className="sp-pw-toggle" onClick={() => toggleShow('current')}>
              {showPws.current ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>
        <div className="sp-form-grid">
          <div className="sp-form-group">
            <label className="sp-label">New Password</label>
            <div className="sp-input-wrap">
              <input className="sp-input sp-input--pw" type={showPws.new ? 'text' : 'password'}
                placeholder="Min. 8 characters" value={newPw} onChange={(e) => setNewPw(e.target.value)} />
              <button className="sp-pw-toggle" onClick={() => toggleShow('new')}>
                {showPws.new ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <div className="sp-form-group">
            <label className="sp-label">Confirm New Password</label>
            <div className="sp-input-wrap">
              <input className="sp-input sp-input--pw" type={showPws.confirm ? 'text' : 'password'}
                placeholder="Repeat new password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} />
              <button className="sp-pw-toggle" onClick={() => toggleShow('confirm')}>
                {showPws.confirm ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
        </div>
        <div className="sp-form-footer">
          <button className="sp-save-btn" onClick={handlePwSave}>
            {pwSaved ? <><CheckCircle size={16} />Password Updated!</> : <><Shield size={16} />Update Password</>}
          </button>
        </div>
      </div>

      <div className="sp-toggle-card glass-card">
        <div className="sp-toggle-card__left">
          <div className="sp-toggle-card__icon sp-toggle-card__icon--purple"><Smartphone size={18} /></div>
          <div>
            <p className="sp-toggle-card__title">Two-Factor Authentication</p>
            <p className="sp-toggle-card__sub">Add an extra layer of security with an authenticator app.</p>
          </div>
        </div>
        <button className={`sp-toggle ${twoFa ? 'sp-toggle--on' : ''}`} onClick={() => setTwoFa((v) => !v)}>
          <span className="sp-toggle__thumb" />
        </button>
      </div>

      <div className="sp-form glass-card">
        <h3 className="sp-card-title"><Shield size={16} />Active Sessions</h3>
        <div className="sp-sessions">
          {SESSIONS.map((s, i) => (
            <div key={i} className="sp-session">
              <div className="sp-session__left">
                <div className={`sp-session__dot ${s.current ? 'sp-session__dot--active' : ''}`} />
                <div>
                  <p className="sp-session__device">{s.device}</p>
                  <p className="sp-session__meta">{s.location} · {s.lastActive}</p>
                </div>
              </div>
              {!s.current ? (
                <button className="sp-session-revoke"><LogOut size={13} />Revoke</button>
              ) : (
                <span className="sp-session-current-badge">Current</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface NotifToggle {
  id: string;
  title: string;
  desc: string;
  defaultOn: boolean;
}

const NOTIF_TOGGLES: NotifToggle[] = [
  { id: 'email_notif', title: 'Email Notifications', desc: 'Receive important updates and activity summaries via email.', defaultOn: true },
  { id: 'weekly_report', title: 'Weekly Progress Report', desc: 'Get a summary of your resume performance every Monday.', defaultOn: true },
  { id: 'analysis_done', title: 'Analysis Complete', desc: 'Get notified when your AI analysis finishes.', defaultOn: true },
  { id: 'tips', title: 'Career Tips & Insights', desc: 'Receive personalized career advice and industry trends.', defaultOn: false },
  { id: 'marketing', title: 'Product Updates', desc: 'Stay informed about new features and improvements.', defaultOn: false },
];

function NotificationsSection() {
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    NOTIF_TOGGLES.reduce((acc, t) => ({ ...acc, [t.id]: t.defaultOn }), {})
  );

  return (
    <div className="sp-section-content">
      <div className="sp-section-header">
        <h2 className="sp-section-title">Notifications</h2>
        <p className="sp-section-subtitle">Choose what you want to be notified about.</p>
      </div>
      <div className="sp-form glass-card">
        {NOTIF_TOGGLES.map((notif, i) => (
          <div key={notif.id} className={`sp-toggle-row ${i < NOTIF_TOGGLES.length - 1 ? 'sp-toggle-row--bordered' : ''}`}>
            <div>
              <p className="sp-toggle-row__title">{notif.title}</p>
              <p className="sp-toggle-row__desc">{notif.desc}</p>
            </div>
            <button className={`sp-toggle ${toggles[notif.id] ? 'sp-toggle--on' : ''}`}
              onClick={() => setToggles((t) => ({ ...t, [notif.id]: !t[notif.id] }))}>
              <span className="sp-toggle__thumb" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppearanceSection() {
  const [accentColor, setAccentColor] = useState('purple');

  return (
    <div className="sp-section-content">
      <div className="sp-section-header">
        <h2 className="sp-section-title">Appearance</h2>
        <p className="sp-section-subtitle">Customize how ResumeIQ looks for you.</p>
      </div>

      <div className="sp-form glass-card">
        <h3 className="sp-card-title"><Palette size={16} />Theme Mode</h3>
        <div className="sp-theme-options">
          {[
            { id: 'dark', label: 'Dark', desc: 'Sleek dark interface (current)' },
            { id: 'light', label: 'Light', desc: 'Coming soon' },
            { id: 'system', label: 'System', desc: 'Follow your OS setting' },
          ].map((theme) => (
            <div key={theme.id}
              className={`sp-theme-card ${theme.id === 'dark' ? 'sp-theme-card--active' : ''} ${theme.id !== 'dark' ? 'sp-theme-card--disabled' : ''}`}>
              <div className={`sp-theme-preview sp-theme-preview--${theme.id}`}>
                <div className="sp-theme-preview__bar" />
                <div className="sp-theme-preview__content">
                  <div className="sp-theme-preview__line sp-theme-preview__line--title" />
                  <div className="sp-theme-preview__line" />
                  <div className="sp-theme-preview__line sp-theme-preview__line--short" />
                </div>
              </div>
              <p className="sp-theme-label">{theme.label}</p>
              <p className="sp-theme-desc">{theme.desc}</p>
              {theme.id === 'dark' && <CheckCircle size={14} className="sp-theme-check" />}
            </div>
          ))}
        </div>
      </div>

      <div className="sp-form glass-card">
        <h3 className="sp-card-title"><Palette size={16} />Accent Color</h3>
        <div className="sp-color-swatches">
          {ACCENT_COLORS.map((color) => (
            <button key={color.id}
              className={`sp-swatch ${accentColor === color.id ? 'sp-swatch--active' : ''}`}
              style={{ background: color.value }}
              onClick={() => setAccentColor(color.id)}
              title={color.label}>
              {accentColor === color.id && <Check size={14} />}
            </button>
          ))}
        </div>
        <p className="sp-color-label">
          Selected:{' '}
          <span style={{ color: ACCENT_COLORS.find((c) => c.id === accentColor)?.value }}>
            {ACCENT_COLORS.find((c) => c.id === accentColor)?.label}
          </span>
        </p>
      </div>
    </div>
  );
}

function SubscriptionSection() {
  return (
    <div className="sp-section-content">
      <div className="sp-section-header">
        <h2 className="sp-section-title">Subscription</h2>
        <p className="sp-section-subtitle">Manage your plan, billing, and usage.</p>
      </div>

      <div className="sp-plan-card glass-card">
        <div className="sp-plan-card__header">
          <div className="sp-plan-badge"><Zap size={14} />Pro Plan</div>
          <span className="sp-plan-price">$19<span>/mo</span></span>
        </div>
        <p className="sp-plan-desc">Billed monthly · Renews June 18, 2026</p>
        <div className="sp-plan-features">
          {['Unlimited analyses', 'Full AI rewrite', 'Job matching', 'All 15+ templates', 'Priority support'].map((f) => (
            <span key={f} className="sp-plan-feature"><CheckCircle size={12} />{f}</span>
          ))}
        </div>
        <div className="sp-plan-actions">
          <button className="sp-plan-upgrade-btn">Upgrade to Enterprise</button>
          <button className="sp-plan-manage-btn">Manage Billing</button>
        </div>
      </div>

      <div className="sp-form glass-card">
        <h3 className="sp-card-title"><BarChart2 size={16} />Usage This Month</h3>
        <div className="sp-usage-list">
          {[
            { label: 'Resume Analyses', used: 8 },
            { label: 'AI Rewrites', used: 3 },
            { label: 'Job Matches', used: 5 },
            { label: 'PDF Exports', used: 12 },
          ].map((item) => (
            <div key={item.label} className="sp-usage-row">
              <div className="sp-usage-row__header">
                <span className="sp-usage-label">{item.label}</span>
                <span className="sp-usage-count">{item.used} used</span>
              </div>
              <div className="sp-usage-note">Unlimited on Pro plan</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DangerZoneSection() {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  return (
    <div className="sp-section-content">
      <div className="sp-section-header">
        <h2 className="sp-section-title sp-section-title--danger">
          <AlertTriangle size={22} />Danger Zone
        </h2>
        <p className="sp-section-subtitle">
          These actions are permanent and cannot be undone. Please proceed with caution.
        </p>
      </div>

      <div className="sp-danger-card glass-card sp-danger-card--mild">
        <div className="sp-danger-card__body">
          <h4 className="sp-danger-title">Export Your Data</h4>
          <p className="sp-danger-desc">Download a full archive of your resumes, analyses, and account data.</p>
        </div>
        <button className="sp-danger-btn sp-danger-btn--mild">Export Data</button>
      </div>

      <div className="sp-danger-card glass-card sp-danger-card--red">
        <div className="sp-danger-card__body">
          <h4 className="sp-danger-title sp-danger-title--red">
            <Trash2 size={16} />Delete Account
          </h4>
          <p className="sp-danger-desc">
            Permanently delete your account, all resumes, analyses, and data. This action is irreversible.
          </p>
        </div>

        {!confirmDelete ? (
          <button className="sp-danger-btn sp-danger-btn--red" onClick={() => setConfirmDelete(true)}>
            <Trash2 size={15} />Delete Account
          </button>
        ) : (
          <div className="sp-delete-confirm">
            <p className="sp-delete-confirm__text">Type <strong>DELETE</strong> to confirm:</p>
            <div className="sp-delete-confirm__row">
              <input className="sp-input sp-input--danger" value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)} placeholder="Type DELETE" />
              <button className="sp-danger-btn sp-danger-btn--red" disabled={confirmText !== 'DELETE'}>
                Confirm Delete
              </button>
              <button className="sp-cancel-btn" onClick={() => { setConfirmDelete(false); setConfirmText(''); }}>
                <X size={15} />Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile');

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':       return <ProfileSection />;
      case 'security':      return <SecuritySection />;
      case 'notifications': return <NotificationsSection />;
      case 'appearance':    return <AppearanceSection />;
      case 'subscription':  return <SubscriptionSection />;
      case 'danger':        return <DangerZoneSection />;
      default:              return <ProfileSection />;
    }
  };

  return (
    <div className="sp-page">
      <div className="sp-bg">
        <div className="sp-orb sp-orb--purple" />
        <div className="sp-orb sp-orb--cyan" />
      </div>

      <div className="container sp-container">
        <div className="sp-page-header animate-fadeInUp">
          <h1 className="sp-page-title">
            Account <span className="gradient-text">Settings</span>
          </h1>
          <p className="sp-page-subtitle">Manage your profile, security, and preferences.</p>
        </div>

        <div className="sp-layout">
          <nav className="sp-sidebar glass-card">
            {NAV_ITEMS.map((item) => (
              <button key={item.id}
                className={`sp-nav-item ${activeSection === item.id ? 'sp-nav-item--active' : ''} ${item.danger ? 'sp-nav-item--danger' : ''}`}
                onClick={() => setActiveSection(item.id)}>
                <item.icon size={16} />
                <span>{item.label}</span>
                <ChevronRight size={14} className="sp-nav-chevron" />
              </button>
            ))}
          </nav>

          <div className="sp-content animate-fadeIn">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
