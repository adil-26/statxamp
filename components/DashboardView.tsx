import React, { useState } from 'react';
import { ScreenId, UserProfile, CompetitiveExam, PeerActivity } from '@/types';
import { 
  ClipboardCheck, 
  Flame, 
  Trophy, 
  Camera, 
  Upload, 
  Languages, 
  Brain, 
  Play, 
  AlertTriangle, 
  BarChart2, 
  ArrowRight, 
  FileText, 
  Clock, 
  Radio, 
  Sparkles, 
  Zap, 
  MessageSquareQuote, 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  Calculator, 
  FlaskConical, 
  Layers 
} from 'lucide-react';

interface DashboardViewProps {
  user: UserProfile;
  exams: CompetitiveExam[];
  peers: PeerActivity[];
  onNavigate: (screen: ScreenId, params?: any) => void;
  onSolvePaper: (paperId: string) => void;
  onSelectSampleNote: (noteId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  exams,
  peers,
  onNavigate,
  onSolvePaper,
  onSelectSampleNote
}) => {
  const [selectedBoardClass, setSelectedBoardClass] = useState<'class-10' | 'class-12'>('class-10');

  const popularDoubts = [
    { label: 'Pythagoras Theorem Proof', noteId: 'note-math-trig' },
    { label: "Newton's 2nd Law (F=ma)", noteId: 'note-phys-newton' },
    { label: 'मराठी समास (विग्रह)', noteId: 'note-marathi-samas' },
    { label: "Cramer's Rule 3-Marks", paperId: 'mh-math1-2024' }
  ];

  // Dedicated Class 10 Board Subjects
  const class10Subjects = [
    {
      id: 'c10-math1',
      title: 'Mathematics Part 1 (Algebra)',
      code: 'SSC Class 10',
      marks: '40 Marks',
      topics: "Cramer's Rule, Quadratic Eq, AP",
      paperId: 'mh-math1-2024',
      icon: Calculator,
      color: 'from-blue-500/15 to-indigo-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400',
      accentBg: 'bg-blue-500',
      solvedPercent: 85,
    },
    {
      id: 'c10-math2',
      title: 'Mathematics Part 2 (Geometry)',
      code: 'SSC Class 10',
      marks: '40 Marks',
      topics: 'Pythagoras, Circles, Trigonometry',
      paperId: 'mh-math2-2024',
      icon: Layers,
      color: 'from-indigo-500/15 to-purple-500/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400',
      accentBg: 'bg-indigo-500',
      solvedPercent: 70,
    },
    {
      id: 'c10-sci',
      title: 'Science & Technology (1 & 2)',
      code: 'SSC Class 10',
      marks: '80 Marks',
      topics: 'Ray Optics, Periodic Table, Evolution',
      paperId: 'mh-sci1-2024',
      icon: FlaskConical,
      color: 'from-emerald-500/15 to-teal-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
      accentBg: 'bg-emerald-500',
      solvedPercent: 60,
    },
    {
      id: 'c10-marathi',
      title: 'Marathi (कुमारभारती)',
      code: 'SSC Class 10',
      marks: '80 Marks',
      topics: 'समास, वाक्प्रचार, स्थूलवाचन, निबंध',
      paperId: 'mh-marathi-2023',
      icon: BookOpen,
      color: 'from-rose-500/15 to-pink-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400',
      accentBg: 'bg-rose-500',
      solvedPercent: 50,
    },
  ];

  // Dedicated Class 12 Board Subjects
  const class12Subjects = [
    {
      id: 'c12-phys',
      title: 'HSC Physics (Theory & Derivations)',
      code: 'HSC Class 12 (Science)',
      marks: '70 Marks',
      topics: 'Rotational Dynamics, Wave Optics, AC',
      paperId: 'mh-hsc-phys-2024',
      icon: Zap,
      color: 'from-amber-500/15 to-orange-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400',
      accentBg: 'bg-amber-500',
      solvedPercent: 75,
    },
    {
      id: 'c12-chem',
      title: 'HSC Chemistry (Organic & Physical)',
      code: 'HSC Class 12 (Science)',
      marks: '70 Marks',
      topics: 'Thermodynamics, Aldehydes & Ketones',
      paperId: 'mh-hsc-chem-2024',
      icon: FlaskConical,
      color: 'from-cyan-500/15 to-blue-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400',
      accentBg: 'bg-cyan-500',
      solvedPercent: 65,
    },
    {
      id: 'c12-math',
      title: 'HSC Mathematics & Statistics',
      code: 'HSC Class 12 (Sci / Arts / Com)',
      marks: '80 Marks',
      topics: 'Definite Integrals, Vectors, 3D Lines',
      paperId: 'mh-hsc-math-2024',
      icon: Calculator,
      color: 'from-violet-500/15 to-purple-500/10 border-violet-500/30 text-violet-600 dark:text-violet-400',
      accentBg: 'bg-violet-500',
      solvedPercent: 80,
    },
    {
      id: 'c12-bio',
      title: 'HSC Biology (Botany & Zoology)',
      code: 'HSC Class 12 (Science)',
      marks: '70 Marks',
      topics: 'Genetics, Plant Reproduction, Biotech',
      paperId: 'mh-hsc-bio-2024',
      icon: BookOpen,
      color: 'from-emerald-500/15 to-teal-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
      accentBg: 'bg-emerald-500',
      solvedPercent: 55,
    },
  ];

  return (
    <div className="space-y-5 pb-10">
      
      {/* 1. Rich User Greeting Strip */}
      <div className="bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border border-cream-200 dark:border-surface-darkCard rounded-2xl p-3.5 sm:p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-cream-50 tracking-tight">
              Hello, {user.name}
            </h2>
            <span className="text-lg">👋</span>
            <span className="px-2 py-0.5 rounded-full bg-coral-500/10 text-coral-500 text-[10px] font-extrabold uppercase tracking-wide">
              {user.classLevel} Aspirant
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium">
            {user.board} • Target: 95%+ Board Merit
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-mint-500/10 border border-mint-500/20 shadow-2xs">
            <div className="w-6 h-6 rounded-lg bg-mint-500/20 flex items-center justify-center text-mint-600 dark:text-mint-400">
              <ClipboardCheck className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-black text-neutral-800 dark:text-cream-100">{user.solvedPYQs}</div>
              <div className="text-[8px] text-neutral-400 font-bold uppercase tracking-wider">PYQs Solved</div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gold-500/10 border border-gold-500/25 shadow-2xs">
            <div className="w-6 h-6 rounded-lg bg-gold-500/20 flex items-center justify-center text-gold-600 dark:text-gold-400">
              <Flame className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
            </div>
            <div>
              <div className="text-xs font-black text-neutral-800 dark:text-cream-100">{user.streak} Days</div>
              <div className="text-[8px] text-neutral-400 font-bold uppercase tracking-wider">Streak</div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-coral-500/10 border border-coral-500/20 shadow-2xs">
            <div className="w-6 h-6 rounded-lg bg-coral-500/20 flex items-center justify-center text-coral-600 dark:text-coral-400">
              <Trophy className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-black text-neutral-800 dark:text-cream-100">#{user.rankDistrict}</div>
              <div className="text-[8px] text-neutral-400 font-bold uppercase tracking-wider">Pune Rank</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Compact & Sleek AI Tutor Poster (Breadth-wise small, light cream & pink/blue glow mix) */}
      <div className="space-y-1.5">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#211333] via-[#2A163B] to-[#141E38] text-white p-3.5 sm:p-4 border border-pink-500/30 shadow-md">
          
          {/* Ambient Glowing Color Orbs */}
          <div className="absolute -top-12 -left-12 w-44 h-44 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-2.5">
            
            {/* Top Bar with Online Status and Dual Language Badge */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 text-[11px] font-extrabold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                24/7 AI DOUBT TUTOR ONLINE
              </span>
              <span className="text-[11px] text-blue-200 font-semibold flex items-center gap-1 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                <Languages className="w-3 h-3 text-blue-300" /> Bilingual: English & Marathi
              </span>
            </div>

            {/* Title & Actions in Sleek Horizontal Row */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="space-y-1 max-w-xl">
                <h3 className="text-base sm:text-lg font-black leading-tight text-white tracking-tight">
                  Ask Arya — <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-blue-300 bg-clip-text text-transparent">Instant AI Step Solutions</span>
                </h3>
                <p className="text-[11px] sm:text-xs text-neutral-200/90 leading-snug">
                  Snap notebook pages or equations for instant proofs with real voice audio explanations.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => onNavigate('screen-aitutor')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-coral-500 hover:from-pink-600 hover:to-coral-600 text-white font-extrabold text-xs shadow-sm hover:scale-105 transition-transform"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Scan Notes</span>
                </button>
                <button
                  onClick={() => onNavigate('screen-aitutor')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-full bg-blue-500/20 hover:bg-blue-500/35 border border-blue-400/40 text-blue-100 font-bold text-xs transition-colors backdrop-blur-sm"
                >
                  <Upload className="w-3.5 h-3.5 text-blue-300" />
                  <span>Upload PDF</span>
                </button>
              </div>
            </div>

            {/* Quick Doubts Chips */}
            <div className="flex items-center gap-1.5 flex-wrap text-[11px] pt-0.5 border-t border-white/10">
              <span className="text-neutral-400 font-bold flex items-center gap-1 text-[11px]">
                <Sparkles className="w-3 h-3 text-pink-400" /> Quick Doubts:
              </span>
              {popularDoubts.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (chip.noteId) {
                      onSelectSampleNote(chip.noteId);
                    } else if (chip.paperId) {
                      onSolvePaper(chip.paperId);
                    }
                  }}
                  className="px-2 py-0.5 rounded-full bg-white/10 hover:bg-pink-500/30 border border-white/15 text-neutral-200 hover:text-white transition-all text-[11px] font-medium"
                >
                  {chip.label}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Tagline Line Below Card: 'AI Tutor Ask and Talk' */}
        <div className="flex items-center justify-center gap-1.5 py-0.5 text-[11px] font-black tracking-widest text-pink-600 dark:text-pink-400 uppercase">
          <MessageSquareQuote className="w-3.5 h-3.5 text-pink-500" />
          <span>AI Tutor Ask and Talk</span>
        </div>
      </div>

      {/* 3. Dedicated Section for Class 10 & Class 12 Board Exams */}
      <div className="space-y-3.5 bg-white/70 dark:bg-surface-dark/70 backdrop-blur-md border border-cream-200 dark:border-surface-darkCard rounded-2xl p-4 sm:p-5 shadow-sm">
        
        {/* Section Header & Class 10 / Class 12 Tab Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cream-200 dark:border-surface-darkCard pb-3">
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-coral-500" />
              <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-cream-50">
                State Board PYQs & Syllabus Practice
              </h3>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Select your class to practice official board question papers with step solutions.
            </p>
          </div>

          {/* Class 10 & Class 12 Switcher Buttons */}
          <div className="flex items-center p-1 rounded-xl bg-cream-100 dark:bg-surface-darkCard border border-cream-200 dark:border-neutral-800 self-start sm:self-auto">
            <button
              onClick={() => setSelectedBoardClass('class-10')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                selectedBoardClass === 'class-10'
                  ? 'bg-coral-500 text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-300 hover:text-coral-500'
              }`}
            >
              <span>Class 10 (SSC)</span>
            </button>
            <button
              onClick={() => setSelectedBoardClass('class-12')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                selectedBoardClass === 'class-12'
                  ? 'bg-coral-500 text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-300 hover:text-coral-500'
              }`}
            >
              <span>Class 12 (HSC)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Class 10 vs Class 12 Content */}
        {selectedBoardClass === 'class-10' ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-500 font-semibold">
              <span>Class 10 SSC Core Subjects (Maharashtra & State Boards)</span>
              <button
                onClick={() => onNavigate('screen-papers')}
                className="text-coral-500 hover:underline font-extrabold flex items-center gap-1"
              >
                View All Class 10 Papers <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {class10Subjects.map((sub) => {
                const Icon = sub.icon;
                return (
                  <div
                    key={sub.id}
                    className={`p-3.5 rounded-xl border bg-gradient-to-br ${sub.color} flex flex-col justify-between space-y-3 hover:scale-102 transition-transform shadow-2xs`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white/80 dark:bg-black/30 backdrop-blur-sm">
                          {sub.marks}
                        </span>
                        <div className="w-6 h-6 rounded-lg bg-white/80 dark:bg-black/30 flex items-center justify-center">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <h4 className="font-black text-xs sm:text-sm text-neutral-900 dark:text-cream-50 line-clamp-1">
                        {sub.title}
                      </h4>
                      <p className="text-[10px] text-neutral-600 dark:text-neutral-300 mt-1 line-clamp-2">
                        {sub.topics}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                      <div className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400">
                        Accuracy: {sub.solvedPercent}%
                      </div>
                      <button
                        onClick={() => onSolvePaper(sub.paperId)}
                        className="px-2.5 py-1 rounded-lg bg-neutral-900 dark:bg-cream-50 text-white dark:text-neutral-900 text-[10px] font-extrabold hover:bg-coral-500 dark:hover:bg-coral-500 dark:hover:text-white transition-colors flex items-center gap-1"
                      >
                        <Play className="w-2.5 h-2.5 fill-current" /> Solve
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-500 font-semibold">
              <span>Class 12 HSC Core Subjects (Science, Commerce & Arts)</span>
              <button
                onClick={() => onNavigate('screen-papers')}
                className="text-coral-500 hover:underline font-extrabold flex items-center gap-1"
              >
                View All Class 12 Papers <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {class12Subjects.map((sub) => {
                const Icon = sub.icon;
                return (
                  <div
                    key={sub.id}
                    className={`p-3.5 rounded-xl border bg-gradient-to-br ${sub.color} flex flex-col justify-between space-y-3 hover:scale-102 transition-transform shadow-2xs`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white/80 dark:bg-black/30 backdrop-blur-sm">
                          {sub.marks}
                        </span>
                        <div className="w-6 h-6 rounded-lg bg-white/80 dark:bg-black/30 flex items-center justify-center">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <h4 className="font-black text-xs sm:text-sm text-neutral-900 dark:text-cream-50 line-clamp-1">
                        {sub.title}
                      </h4>
                      <p className="text-[10px] text-neutral-600 dark:text-neutral-300 mt-1 line-clamp-2">
                        {sub.topics}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                      <div className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400">
                        Accuracy: {sub.solvedPercent}%
                      </div>
                      <button
                        onClick={() => onSolvePaper(sub.paperId)}
                        className="px-2.5 py-1 rounded-lg bg-neutral-900 dark:bg-cream-50 text-white dark:text-neutral-900 text-[10px] font-extrabold hover:bg-coral-500 dark:hover:bg-coral-500 dark:hover:text-white transition-colors flex items-center gap-1"
                      >
                        <Play className="w-2.5 h-2.5 fill-current" /> Solve
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* 4. Daily Practice Mission & High-Yield Exam Alert */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        
        {/* Daily Mission Card */}
        <div className="bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border border-cream-200 dark:border-surface-darkCard rounded-2xl p-3.5 sm:p-4 shadow-sm flex items-center gap-3.5 hover:border-coral-500/50 transition-colors">
          <div className="relative w-14 h-14 flex-shrink-0 flex items-center justify-center">
            <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 72 72">
              <circle cx="36" cy="36" r="30" strokeWidth="6" className="stroke-cream-100 dark:stroke-neutral-800" fill="none" />
              <circle 
                cx="36" 
                cy="36" 
                r="30" 
                strokeWidth="6" 
                className="stroke-coral-500" 
                fill="none" 
                strokeDasharray="188.4"
                strokeDashoffset={188.4 - (188.4 * user.dailyGoalPercent) / 100}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-[11px] font-black text-coral-500">{user.dailyGoalPercent}%</span>
          </div>

          <div className="flex-1 min-w-0 space-y-0.5">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-xs sm:text-sm text-neutral-900 dark:text-cream-100">
                Daily Practice Mission
              </h4>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-gold-400/20 text-amber-800 dark:text-gold-300">
                +30 ₵ Reward
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
              Solve 5 more questions to maintain your {user.streak}-day streak.
            </p>
            <button
              onClick={() => onNavigate('screen-mocktest')}
              className="inline-flex items-center gap-1 text-[11px] font-extrabold text-coral-500 hover:text-coral-600 pt-0.5 group"
            >
              <Play className="w-2.5 h-2.5 fill-coral-500 transition-transform group-hover:scale-110" /> 
              <span>Continue Practice ({user.dailyMinutesLeft} mins left)</span>
            </button>
          </div>
        </div>

        {/* High-Yield Alert Card */}
        <div className="bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border border-cream-200 dark:border-surface-darkCard rounded-2xl p-3.5 sm:p-4 shadow-sm flex items-center gap-3.5 hover:border-amber-500/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0 border border-amber-500/20 shadow-2xs">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="flex-1 min-w-0 space-y-0.5">
            <div className="text-[9px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 text-amber-500 fill-amber-500" /> Repeat Probability: 98%
            </div>
            <h4 className="font-extrabold text-xs sm:text-sm text-neutral-900 dark:text-cream-100">
              High-Yield Exam Alert!
            </h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
              Cramer's Rule & Pythagoras Theorem have appeared in 100% of last 10 Board Papers.
            </p>
            <button
              onClick={() => onNavigate('screen-analysis')}
              className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-700 dark:text-amber-400 pt-0.5 hover:underline"
            >
              <BarChart2 className="w-3 h-3" /> 
              <span>View 5-Year Trends Analysis</span>
            </button>
          </div>
        </div>

      </div>

      {/* 5. Competitive FastTrack Row */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-black text-neutral-900 dark:text-cream-50 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-coral-500 animate-pulse" />
            Competitive Exams FastTrack
          </h3>
          <button
            onClick={() => onNavigate('screen-competitive')}
            className="text-xs font-extrabold text-coral-500 hover:text-coral-600 flex items-center gap-1 hover:underline"
          >
            Explore All Exams <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {exams.slice(0, 3).map((exam) => (
            <div
              key={exam.id}
              onClick={() => onNavigate('screen-competitive')}
              className="bg-white dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard rounded-2xl p-4 hover:border-coral-500 transition-all duration-200 hover:-translate-y-0.5 shadow-sm cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${exam.color}15`, color: exam.color }}
                  >
                    {exam.badge}
                  </span>
                  <span className="text-[10px] font-bold text-neutral-400">{exam.state}</span>
                </div>

                <h4 className="text-sm font-extrabold text-neutral-900 dark:text-cream-50 mb-0.5 group-hover:text-coral-500 transition-colors">
                  {exam.name}
                </h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mb-2.5 line-clamp-2 leading-relaxed">
                  {exam.tagline}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-cream-100 dark:border-neutral-800 text-[10px] text-neutral-400 font-semibold">
                <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {exam.papersCount} Shifts</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {exam.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Peer Activity Ticker */}
      <div className="bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border border-cream-200 dark:border-surface-darkCard rounded-2xl p-3.5 sm:p-4 shadow-sm space-y-2.5">
        <div className="flex items-center gap-2 text-[11px] font-black text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
          <Radio className="w-3.5 h-3.5 text-mint-500 animate-pulse" />
          <span>Live Regional Peer Activity (Maharashtra & Pune District)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {peers.map((peer, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 p-2 rounded-xl bg-cream-50/80 dark:bg-surface-darkCard border border-cream-200/50 dark:border-neutral-800 text-xs"
            >
              <img src={peer.avatar} alt={peer.name} className="w-7 h-7 rounded-full object-cover shadow-2xs flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="font-extrabold text-neutral-900 dark:text-cream-100 text-xs truncate">{peer.name}</div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">{peer.action}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};