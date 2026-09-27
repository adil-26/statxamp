'use client';

import React from 'react';
import { ScreenId, UserProfile, Board } from '@/types';
import { 
  X, 
  Home, 
  BookOpen, 
  Wand2, 
  Timer, 
  BarChart3, 
  Trophy, 
  Atom, 
  FileCheck2, 
  Coins, 
  Flame, 
  GraduationCap, 
  User, 
  Moon, 
  Sun, 
  ChevronRight,
  Sparkles,
  HelpCircle,
  Award,
  Download
} from 'lucide-react';

interface AppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  user: UserProfile;
  boards: Board[];
  currentBoardCode: string;
  onOpenBoardModal: () => void;
  theme: string;
  onToggleTheme: () => void;
}

export const AppDrawer: React.FC<AppDrawerProps> = ({
  isOpen,
  onClose,
  currentScreen,
  onNavigate,
  user,
  boards,
  currentBoardCode,
  onOpenBoardModal,
  theme,
  onToggleTheme,
}) => {
  if (!isOpen) return null;

  const currentBoard = boards.find(b => b.code === currentBoardCode) || boards[0];

  const handleNav = (screen: ScreenId) => {
    onNavigate(screen);
    onClose();
  };

  const navSections = [
    {
      title: 'Study & Practice Hub',
      items: [
        { id: 'screen-home' as ScreenId, label: 'Dashboard Home', desc: 'Overview, today goals & streak', icon: Home, color: 'text-coral-500', badge: 'Active' },
        { id: 'screen-papers' as ScreenId, label: 'PYQ Papers Library', desc: '20+ Years board question papers', icon: BookOpen, color: 'text-blue-500', badge: '20+ Yrs' },
        { id: 'screen-mocktest' as ScreenId, label: 'Speed Mock Drill', desc: '10-Min timed board simulation', icon: Timer, color: 'text-amber-500', badge: 'Timed' },
        { id: 'screen-question' as ScreenId, label: 'Step-by-Step Solver', desc: '10-Year recurring proofs & derivations', icon: FileCheck2, color: 'text-emerald-500', badge: 'Proofs' },
      ]
    },
    {
      title: 'AI & Exam Intelligence',
      items: [
        { id: 'screen-aitutor' as ScreenId, label: 'Arya AI Tutor (24/7)', desc: 'Voice explanations & handwritten OCR', icon: Wand2, color: 'text-purple-500', badge: 'Live AI' },
        { id: 'screen-analysis' as ScreenId, label: '5-Year PYQ Trends', desc: 'Guaranteed questions & diagnostics', icon: BarChart3, color: 'text-pink-500', badge: '98% Match' },
        { id: 'screen-competitive' as ScreenId, label: 'Competitive FastTrack', desc: 'MHT-CET, JEE Main, NEET & shortcuts', icon: Atom, color: 'text-cyan-500', badge: 'CET/JEE' },
      ]
    },
    {
      title: 'Community & Rewards',
      items: [
        { id: 'screen-leaderboard' as ScreenId, label: 'Leaderboard & Store', desc: 'State ranking & redeem SM Coins', icon: Trophy, color: 'text-gold-500', badge: `${user.coins} 🪙` },
        { id: 'screen-profile' as ScreenId, label: 'Student Profile', desc: 'Stats, target marks & badges', icon: User, color: 'text-neutral-600 dark:text-neutral-300' },
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Slide-over Drawer Container */}
      <div className="relative w-[85%] max-w-[340px] bg-white dark:bg-surface-dark border-r border-cream-200 dark:border-surface-darkCard h-full flex flex-col justify-between z-10 shadow-2xl overflow-y-auto">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-cream-200 dark:border-surface-darkCard bg-cream-50/70 dark:bg-surface-darkCard/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#261C19] to-[#14100E] border-2 border-coral-500 flex items-center justify-center">
                <span className="font-heading font-black text-sm text-gold-400">SX</span>
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-sm text-neutral-900 dark:text-cream-50 leading-tight">
                  Stat<span className="text-coral-500">Xam</span> Menu
                </h3>
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                  Complete Study Navigation
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-cream-100 dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard text-neutral-600 dark:text-neutral-300 hover:text-coral-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Student Mini Profile Card */}
          <div className="mt-3.5 p-3 rounded-xl bg-white dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard flex items-center gap-2.5">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-10 h-10 rounded-xl object-cover border border-coral-500/50" 
            />
            <div className="min-w-0 flex-1">
              <div className="font-black text-xs text-neutral-900 dark:text-cream-50 truncate">
                {user.name}
              </div>
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                {user.classLevel} • {user.district}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-amber-700 dark:text-gold-400 bg-gold-400/15 px-1.5 py-0.5 rounded-md">
                  <Flame className="w-2.5 h-2.5 text-gold-500 fill-gold-500" /> {user.streak}d Streak
                </span>
                <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-amber-800 dark:text-gold-300 bg-coral-500/10 px-1.5 py-0.5 rounded-md">
                  <Coins className="w-2.5 h-2.5 text-gold-500" /> {user.coins} 🪙
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 p-3 space-y-4 overflow-y-auto">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 px-2 pb-1">
                {section.title}
              </div>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentScreen === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                        isActive
                          ? 'bg-coral-500/10 dark:bg-coral-500/20 border border-coral-500/30 text-coral-600 dark:text-coral-400 font-bold'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-cream-100 dark:hover:bg-surface-darkCard font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isActive ? 'bg-coral-500 text-white' : 'bg-cream-100 dark:bg-surface-darkCard ' + item.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold leading-tight truncate">{item.label}</div>
                          <div className="text-[10px] text-neutral-400 truncate">{item.desc}</div>
                        </div>
                      </div>

                      {item.badge && (
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shrink-0 ml-1 ${
                          isActive
                            ? 'bg-coral-500 text-white'
                            : 'bg-cream-200/80 dark:bg-surface-darkCard text-neutral-600 dark:text-neutral-300'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer Actions (Board Switcher & Theme Toggle) */}
        <div className="p-3 border-t border-cream-200 dark:border-surface-darkCard bg-cream-50/50 dark:bg-surface-darkCard/30 space-y-2">
          {/* Install App / Download APK Banner in Drawer */}
          <button
            onClick={() => {
              onClose();
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('statxam_open_install_modal'));
              }
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-coral-500/15 via-sunset/15 to-gold-500/15 border border-coral-500/40 text-xs font-black text-coral-600 dark:text-coral-400 hover:scale-102 transition-transform shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-coral-500" />
              <span>Install StatXam App / APK</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-coral-500 text-white font-extrabold uppercase">
              Free
            </span>
          </button>

          {/* Board Selector Button */}
          <button
            onClick={() => {
              onClose();
              onOpenBoardModal();
            }}
            className="w-full flex items-center justify-between p-2 rounded-xl bg-white dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard text-xs font-bold text-neutral-800 dark:text-cream-100 hover:border-coral-500 transition-colors"
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-coral-500" />
              <div className="text-left">
                <div className="text-[9px] text-neutral-400 font-bold uppercase">Active Board</div>
                <div className="text-xs font-extrabold truncate max-w-[190px]">{currentBoard.name}</div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          {/* Theme & Profile Row */}
          <div className="flex items-center justify-between gap-2 pt-1 text-xs">
            <button
              onClick={onToggleTheme}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard font-bold text-neutral-700 dark:text-neutral-300 hover:text-coral-500 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-gold-400" /> : <Moon className="w-3.5 h-3.5 text-neutral-500" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            <button
              onClick={() => handleNav('screen-profile')}
              className="py-2 px-3 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-bold transition-colors"
            >
              Profile
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
