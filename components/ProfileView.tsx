'use client';

import React from 'react';
import { UserProfile, Board } from '@/types';
import { 
  User, 
  Award, 
  GraduationCap, 
  Languages, 
  Moon, 
  Sun, 
  Flame, 
  Coins, 
  ClipboardCheck,
  Calculator,
  Zap,
  Trophy,
  Brain
} from 'lucide-react';

interface ProfileViewProps {
  user: UserProfile;
  boards: Board[];
  onOpenBoardModal: () => void;
  theme: string;
  onToggleTheme: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  boards,
  onOpenBoardModal,
  theme,
  onToggleTheme
}) => {
  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator': return <Calculator className="w-5 h-5 text-white" />;
      case 'Flame': return <Flame className="w-5 h-5 text-white" />;
      case 'Zap': return <Zap className="w-5 h-5 text-white" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-white" />;
      default: return <Brain className="w-5 h-5 text-white" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-7 pb-10">
      
      {/* Profile Header */}
      <div className="bg-surface-light dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        <div className="w-24 h-24 rounded-full border-4 border-coral-500 overflow-hidden shadow-glow-coral flex-shrink-0">
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-1 flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-cream-50">{user.name}</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-coral-500 text-white text-[10px] font-extrabold uppercase">
              Pro Scholar
            </span>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {user.board} � {user.classLevel}
          </p>
          <div className="pt-2 flex items-center justify-center sm:justify-start gap-4 text-xs font-bold text-neutral-700 dark:text-cream-200">
            <span className="flex items-center gap-1"><Coins className="w-4 h-4 text-gold-500" /> {user.coins} ?</span>
            <span className="flex items-center gap-1"><Flame className="w-4 h-4 text-coral-500" /> {user.streak} Days Streak</span>
            <span className="flex items-center gap-1"><ClipboardCheck className="w-4 h-4 text-mint-500" /> {user.solvedPYQs} PYQs</span>
          </div>
        </div>

        <button
          onClick={onOpenBoardModal}
          className="px-5 py-2.5 rounded-full bg-cream-100 dark:bg-surface-darkCard border border-cream-200 dark:border-neutral-800 text-xs font-bold text-neutral-700 dark:text-cream-100 hover:border-coral-500"
        >
          Change Board / Class
        </button>
      </div>

      {/* Academic Settings & Customizations */}
      <div className="bg-surface-light dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        <h3 className="text-base font-bold text-neutral-900 dark:text-cream-50">
          Academic Configuration
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-cream-50 dark:bg-surface-darkCard border border-cream-200/60 dark:border-neutral-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-bold text-neutral-800 dark:text-cream-100 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-coral-500" /> State Board Selection
              </div>
              <div className="text-neutral-400">{user.board}</div>
            </div>
            <button onClick={onOpenBoardModal} className="font-bold text-coral-500 hover:underline">
              Switch
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-cream-50 dark:bg-surface-darkCard border border-cream-200/60 dark:border-neutral-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-bold text-neutral-800 dark:text-cream-100 flex items-center gap-1.5">
                <Languages className="w-4 h-4 text-royal-500" /> Study Language
              </div>
              <div className="text-neutral-400">{user.language}</div>
            </div>
            <button onClick={onOpenBoardModal} className="font-bold text-royal-500 hover:underline">
              Change
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-cream-50 dark:bg-surface-darkCard border border-cream-200/60 dark:border-neutral-800 flex items-center justify-between sm:col-span-2">
            <div className="space-y-0.5">
              <div className="font-bold text-neutral-800 dark:text-cream-100 flex items-center gap-1.5">
                {theme === 'dark' ? <Sun className="w-4 h-4 text-gold-400" /> : <Moon className="w-4 h-4 text-neutral-600" />}
                Appearance Theme
              </div>
              <div className="text-neutral-400">Current Theme: {theme === 'dark' ? 'Dark Warm Night' : 'Light Cream & Warm Ivory'}</div>
            </div>
            <button
              onClick={onToggleTheme}
              className="px-4 py-1.5 rounded-full bg-cream-200 dark:bg-neutral-800 font-bold text-neutral-800 dark:text-cream-100"
            >
              Toggle {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
      </div>

      {/* Achievement Badges Shelf */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-cream-50 flex items-center gap-2">
          <Award className="w-5 h-5 text-gold-500" />
          Achievement Badges Shelf
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.badges.map(b => (
            <div
              key={b.id}
              className="p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard shadow-sm flex items-center gap-3.5"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
                style={{ backgroundColor: b.color }}
              >
                {getBadgeIcon(b.icon)}
              </div>
              <div>
                <h4 className="font-bold text-xs text-neutral-900 dark:text-cream-100">{b.title}</h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
