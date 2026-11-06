'use client';

import React from 'react';
import { ScreenId } from '@/types';
import { Home, BookOpen, Wand2, Timer, User } from 'lucide-react';

interface MobileNavProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentScreen, onNavigate }) => {
  return (
    <nav className="mobile-tab-bar fixed bottom-0 left-0 right-0 z-50 border-t border-cream-200 bg-white/95 px-2 shadow-lg backdrop-blur-md dark:border-surface-darkCard dark:bg-surface-dark/95 lg:hidden">
      <div className="h-14 flex items-center justify-around relative">
        <button
          onClick={() => onNavigate('screen-home')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
            currentScreen === 'screen-home' ? 'text-coral-500 font-bold' : 'text-neutral-500 dark:text-neutral-400'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => onNavigate('screen-papers')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
            currentScreen === 'screen-papers' ? 'text-coral-500 font-bold' : 'text-neutral-500 dark:text-neutral-400'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Papers</span>
        </button>

        {/* Elevated AI Tutor Hub Button (Pink & Blue mix) */}
        <div className="relative -top-3.5">
          <button
            onClick={() => onNavigate('screen-aitutor')}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-blue-500 text-white flex items-center justify-center shadow-md border-2 border-cream-50 dark:border-surface-darkBg animate-pulse"
            title="Ask StatXam AI"
          >
            <Wand2 className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={() => onNavigate('screen-mocktest')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
            currentScreen === 'screen-mocktest' ? 'text-coral-500 font-bold' : 'text-neutral-500 dark:text-neutral-400'
          }`}
        >
          <Timer className="w-4 h-4" />
          <span>Mock</span>
        </button>

        <button
          onClick={() => onNavigate('screen-profile')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
            currentScreen === 'screen-profile' ? 'text-coral-500 font-bold' : 'text-neutral-500 dark:text-neutral-400'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </button>
      </div>
    </nav>
  );
};
