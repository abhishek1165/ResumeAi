import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import UploadPage from './pages/UploadPage/UploadPage';
import ScanningPage from './pages/ScanningPage/ScanningPage';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import WorkspacePage from './pages/WorkspacePage/WorkspacePage';
import PreviewPage from './pages/PreviewPage/PreviewPage';
import MyResumesPage from './pages/MyResumesPage/MyResumesPage';
import JobMatchPage from './pages/JobMatchPage/JobMatchPage';
import PricingPage from './pages/PricingPage/PricingPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import './styles/globals.css';

// Pages that don't show the global navbar (they have their own)
const NO_NAVBAR_PATHS = [
  '/',
  '/login', '/signup', '/forgot-password',
  '/scanning', '/results', '/dashboard', '/workspace',
  '/settings', '/my-resumes', '/preview', '/upload',
];

// Redirect already-logged-in users away from auth pages
function AuthRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

const AppLayout: React.FC = () => {
  const location = useLocation();
  const showNavbar = !NO_NAVBAR_PATHS.some(p =>
    p === '/' ? location.pathname === '/' : location.pathname.startsWith(p)
  );

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        {/* ── Public marketing routes ── */}
        <Route path="/"        element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />

        {/* ── Core product — no login required ── */}
        <Route path="/upload"    element={<UploadPage />} />
        <Route path="/scanning"  element={<ScanningPage />} />
        <Route path="/results"   element={<ResultsPage />} />
        <Route path="/job-match" element={<JobMatchPage />} />

        {/* ── Auth pages (redirect if already logged in) ── */}
        <Route path="/login"           element={<AuthRoute><LoginPage /></AuthRoute>} />
        <Route path="/signup"          element={<AuthRoute><SignupPage /></AuthRoute>} />
        <Route path="/forgot-password" element={<AuthRoute><ForgotPasswordPage /></AuthRoute>} />

        {/* ── Account-only features ── */}
        <Route path="/dashboard"  element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/workspace"  element={<ProtectedRoute><WorkspacePage /></ProtectedRoute>} />
        <Route path="/preview"    element={<ProtectedRoute><PreviewPage /></ProtectedRoute>} />
        <Route path="/my-resumes" element={<ProtectedRoute><MyResumesPage /></ProtectedRoute>} />
        <Route path="/settings"   element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

        {/* ── Catch-all ── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <ResumeProvider>
        <AppLayout />
      </ResumeProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
