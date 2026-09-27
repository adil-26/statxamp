export type ScreenId = 
  | 'screen-home'
  | 'screen-competitive'
  | 'screen-aitutor'
  | 'screen-papers'
  | 'screen-question'
  | 'screen-mocktest'
  | 'screen-analysis'
  | 'screen-leaderboard'
  | 'screen-profile';

export type Language = 'en' | 'mr' | 'hi';

export interface UserProfile {
  name: string;
  classLevel: string;
  stream: string;
  board: string;
  boardCode: string;
  language: string;
  coins: number;
  streak: number;
  rankDistrict: number;
  district: string;
  state: string;
  solvedPYQs: number;
  accuracy: number;
  dailyGoalPercent: number;
  dailyMinutesLeft: number;
  avatar: string;
  badges: Badge[];
}

export interface Badge {
  id: string;
  title: string;
  icon: string;
  color: string;
  desc: string;
}

export interface Board {
  code: string;
  name: string;
  region: string;
  classes: string[];
  defLang: string;
}

export interface CompetitiveExam {
  id: string;
  name: string;
  category: string;
  state: string;
  badge: string;
  color: string;
  tagline: string;
  papersCount: number;
  markingRule: string;
  duration: string;
  topShortcuts: string;
  icon: string;
}

export interface Shortcut {
  id: string;
  title: string;
  exam: string;
  subject: string;
  formula: string;
  trick: string;
  example: string;
  instantAnswer: string;
  timeSaved: string;
}

export interface SampleNoteStep {
  step: number;
  title: string;
  math: string;
  desc: string;
}

export interface SampleNote {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  ocrText: string;
  previewImg: string;
  analysis: {
    englishSummary: string;
    marathiSummary: string;
    steps: SampleNoteStep[];
    eli5: string;
    markingScheme: string;
  };
}

export interface PYQPaper {
  id: string;
  title: string;
  board: string;
  classLevel?: 'Class 10' | 'Class 12' | 'Competitive';
  year: string;
  subject: string;
  marks: number;
  duration: string;
  solved: boolean;
  solvedCount: string;
  difficulty: string;
  languages: string[];
  highYieldTopics: string[];
  questionsCount: number;
}

export interface SolverStep {
  stepNum: number;
  title: string;
  math: string;
  desc: string;
  whyThisStep: string;
}

export interface SolverQuestion {
  id: string;
  board: string;
  chapter: string;
  questionEn: string;
  questionMr: string;
  steps: SolverStep[];
  eli5: string;
  markingGuide: string;
}

export interface MockQuestion {
  id: number;
  chapter: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface TrendItem {
  chapter: string;
  weightage: string;
  repeatProb: number;
  status: string;
  tag: string;
}

export interface GuaranteedFormat {
  rank: number;
  title: string;
  frequency: string;
  tip: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  district: string;
  school: string;
  coins: number;
  streak: number;
  avatar: string;
  isUser?: boolean;
}

export interface StoreItem {
  id: string;
  name: string;
  cost: number;
  icon: string;
  color: string;
  desc: string;
  badge: string;
}

export interface PeerActivity {
  name: string;
  action: string;
  time: string;
  avatar: string;
}
