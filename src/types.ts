export interface Candidate {
  id: string;
  name: string;
  email: string;
  githubUsername: string;
  avatarUrl: string;
  matchScore: number;
  status: 'pending' | 'reviewed' | 'hired' | 'rejected' | 'scheduled';
  commitMetrics: CommitMetrics;
  createdAt?: string;
  position?: string;
  interviewDate?: string;
  interviewTime?: string;
  interviewNotes?: string;
}

export interface CommitMetrics {
  totalCommits: number;
  codeQualityScore: number;
  consistencyScore: number;
  collaborationScore: number;
  technicalDiversityScore: number;
  overallScore: number;
  commitHistory: CommitHistory[];
  languageDistribution: LanguageDistribution[];
}

export interface CommitHistory {
  date: string;
  count: number;
}

export interface LanguageDistribution {
  language: string;
  percentage: number;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  requiredSkills: string[];
  description: string;
  candidates: number;
  position: string;
  salary?: string;
  experience?: string;
  remote?: boolean;
}

export interface GithubProfile {
  id: string;
  name: string;
  email: string;
  githubUsername: string;
  avatarUrl: string;
  bio?: string;
  location?: string;
  publicRepos: number;
  followers: number;
  following: number;
  createdAt: string;
}

export interface AnalysisResult {
  profile: GithubProfile;
  metrics: CommitMetrics;
  matchScore: number;
  benchmark: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'recruiter' | 'hiring_manager';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ScheduledInterview {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  date: string;
  time: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}