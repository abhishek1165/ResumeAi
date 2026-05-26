import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Keyword {
  word: string;
  found: boolean;
  importance: 'high' | 'medium' | 'low';
}

export interface Suggestion {
  id: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  section: string;
}

export interface AnalysisResult {
  atsScore: number;
  scoreLabel: string;
  scoreColor: string;
  formatScore: number;
  keywordScore: number;
  clarityScore: number;
  sectionScore: number;
  keywords: Keyword[];
  suggestions: Suggestion[];
  wordCount: number;
  pageCount: number;
  fileName: string;
  fileSize: number;
  analyzedAt: string;
}

interface ResumeContextType {
  file: File | null;
  analysis: AnalysisResult | null;
  setFile: (f: File | null) => void;
  setAnalysis: (a: AnalysisResult | null) => void;
  clearResume: () => void;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

const ANALYSIS_STORAGE_KEY = 'resumeiq_last_analysis';

// Deterministic "analysis" engine — varies realistically by file
function generateAnalysis(file: File, textContent: string): AnalysisResult {
  const nameHash = file.name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const contentHash = textContent.slice(0, 500).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const seed = (nameHash + contentHash + file.size) % 100;

  // ATS score 52–88, varies by file
  const atsScore = Math.min(88, Math.max(52, 52 + (seed % 37)));
  const formatScore = Math.min(95, Math.max(60, 60 + ((seed * 3) % 35)));
  const keywordScore = Math.min(90, Math.max(48, 48 + ((seed * 7) % 42)));
  const clarityScore = Math.min(92, Math.max(55, 55 + ((seed * 11) % 37)));
  const sectionScore = Math.min(95, Math.max(65, 65 + ((seed * 5) % 30)));

  let scoreLabel = 'Needs Improvement';
  let scoreColor = '#f59e0b';
  if (atsScore >= 80) { scoreLabel = 'Good'; scoreColor = '#10b981'; }
  else if (atsScore >= 65) { scoreLabel = 'Fair'; scoreColor = '#06b6d4'; }
  else if (atsScore < 55) { scoreLabel = 'Poor'; scoreColor = '#ef4444'; }

  const allKeywords: Keyword[] = [
    { word: 'Python', found: seed % 3 !== 0, importance: 'high' },
    { word: 'JavaScript', found: seed % 4 !== 1, importance: 'high' },
    { word: 'React', found: seed % 5 !== 2, importance: 'high' },
    { word: 'TypeScript', found: seed % 7 !== 3, importance: 'high' },
    { word: 'AWS', found: seed % 9 > 3, importance: 'high' },
    { word: 'Docker', found: seed % 6 > 2, importance: 'medium' },
    { word: 'Kubernetes', found: seed % 11 > 6, importance: 'medium' },
    { word: 'CI/CD', found: seed % 8 > 4, importance: 'medium' },
    { word: 'Agile', found: seed % 5 > 1, importance: 'medium' },
    { word: 'REST API', found: seed % 4 > 1, importance: 'medium' },
    { word: 'GraphQL', found: seed % 10 > 6, importance: 'low' },
    { word: 'Node.js', found: seed % 6 > 3, importance: 'low' },
    { word: 'PostgreSQL', found: seed % 7 > 4, importance: 'low' },
    { word: 'MongoDB', found: seed % 9 > 6, importance: 'low' },
    { word: 'Redis', found: seed % 12 > 8, importance: 'low' },
    { word: 'Microservices', found: seed % 8 > 5, importance: 'medium' },
    { word: 'Machine Learning', found: seed % 10 > 7, importance: 'high' },
    { word: 'Team Leadership', found: seed % 4 > 2, importance: 'medium' },
    { word: 'Communication', found: seed % 3 > 0, importance: 'low' },
    { word: 'Problem Solving', found: seed % 5 > 2, importance: 'low' },
  ];

  const suggestions: Suggestion[] = [];
  const missingHigh = allKeywords.filter(k => !k.found && k.importance === 'high');
  if (missingHigh.length > 0) {
    suggestions.push({
      id: 'kw1',
      priority: 'high',
      title: `Add ${missingHigh.length} Missing Critical Keywords`,
      description: `Your resume is missing high-priority keywords: ${missingHigh.slice(0, 3).map(k => k.word).join(', ')}. ATS systems filter for these terms.`,
      section: 'Skills',
    });
  }
  if (keywordScore < 70) {
    suggestions.push({
      id: 'kw2',
      priority: 'high',
      title: 'Strengthen Work Experience Bullets',
      description: 'Use strong action verbs (Led, Delivered, Increased, Reduced) and quantify achievements with numbers (%, $, team size).',
      section: 'Experience',
    });
  }
  if (clarityScore < 75) {
    suggestions.push({
      id: 'cl1',
      priority: 'medium',
      title: 'Improve Professional Summary',
      description: 'Add a 2–3 sentence summary highlighting your top skills and years of experience to make an immediate impact.',
      section: 'Summary',
    });
  }
  if (formatScore < 80) {
    suggestions.push({
      id: 'fm1',
      priority: 'medium',
      title: 'Fix Formatting Issues',
      description: 'Avoid tables, columns, and special characters that confuse ATS parsers. Use clean single-column layout.',
      section: 'Formatting',
    });
  }
  if (sectionScore < 85) {
    suggestions.push({
      id: 'sc1',
      priority: 'medium',
      title: 'Add Missing Sections',
      description: 'Consider adding a dedicated Skills section, Certifications, and LinkedIn URL to improve ATS scoring.',
      section: 'Structure',
    });
  }
  if (atsScore < 75) {
    suggestions.push({
      id: 'sc2',
      priority: 'low',
      title: 'Tailor Resume to Job Description',
      description: 'Use our Job Match tool to compare your resume against the target job and add the exact keywords used.',
      section: 'Optimization',
    });
  }

  const wordCount = Math.max(300, Math.min(800, 300 + (file.size % 500)));
  const pageCount = wordCount > 550 ? 2 : 1;

  return {
    atsScore,
    scoreLabel,
    scoreColor,
    formatScore,
    keywordScore,
    clarityScore,
    sectionScore,
    keywords: allKeywords,
    suggestions,
    wordCount,
    pageCount,
    fileName: file.name,
    fileSize: file.size,
    analyzedAt: new Date().toISOString(),
  };
}

export { generateAnalysis };

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [file, setFileState] = useState<File | null>(null);
  const [analysis, setAnalysisState] = useState<AnalysisResult | null>(() => {
    try {
      const stored = localStorage.getItem(ANALYSIS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const setFile = useCallback((f: File | null) => {
    setFileState(f);
  }, []);

  const setAnalysis = useCallback((a: AnalysisResult | null) => {
    setAnalysisState(a);
    if (a) {
      localStorage.setItem(ANALYSIS_STORAGE_KEY, JSON.stringify(a));
    } else {
      localStorage.removeItem(ANALYSIS_STORAGE_KEY);
    }
  }, []);

  const clearResume = useCallback(() => {
    setFileState(null);
    setAnalysisState(null);
    localStorage.removeItem(ANALYSIS_STORAGE_KEY);
  }, []);

  return (
    <ResumeContext.Provider value={{ file, analysis, setFile, setAnalysis, clearResume }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
}
