'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ScreenId } from '@/types';
import { useAuth } from '@/lib/auth';
import { 
  Compass, 
  Atom, 
  Wand2, 
  BookOpen, 
  Timer, 
  BarChart3, 
  Trophy, 
  GraduationCap, 
  Coins, 
  Moon, 
  Sun, 
  Flame,
  Zap,
  Menu,
  Download
} from 'lucide-react';

interface NavbarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  coins: number;
  streak: number;
  boardName: string;
  theme: string;
  onToggleTheme: () => void;
  onOpenBoardModal: () => void;
  userAvatar: string;
  onOpenDrawer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  coins,
  streak,
  boardName,
  theme,
  onToggleTheme,
  onOpenBoardModal,
  userAvatar,
  onOpenDrawer
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const navItems = [
    { id: 'screen-home' as ScreenId, label: 'Dashboard', icon: Compass },
    { id: 'screen-competitive' as ScreenId, label: 'Competitive', icon: Atom },
    { id: 'screen-aitutor' as ScreenId, label: 'StatXam AI', icon: Wand2 },
    { id: 'screen-papers' as ScreenId, label: 'PYQ Library', icon: BookOpen },
    { id: 'screen-mocktest' as ScreenId, label: 'Mock Drill', icon: Timer },
    { id: 'screen-analysis' as ScreenId, label: 'PYQ Trends', icon: BarChart3 },
    { id: 'screen-leaderboard' as ScreenId, label: 'Leaderboard', icon: Trophy },
  ];

  return (
    <header className="app-header sticky top-0 z-50 border-b border-cream-200 bg-cream-50/95 pt-[env(safe-area-inset-top)] backdrop-blur-md transition-colors dark:border-surface-darkCard dark:bg-surface-darkBg/95">
      <div className="mx-auto flex h-14 w-full max-w-[1240px] items-center justify-between gap-2 px-3 sm:h-16 sm:px-4">
        
        {/* Left: Hamburger Menu + Brand Logo Emblem */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onOpenDrawer && (
            <button
              onClick={onOpenDrawer}
              aria-label="Open App Menu"
              className="rounded-xl border border-cream-200 bg-surface-light p-1.5 text-neutral-700 shadow-2xs hover:border-coral-500/50 hover:text-coral-500 dark:border-surface-darkCard dark:bg-surface-dark dark:text-cream-100 lg:hidden"
              title="Open Navigation Menu"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}

          <button
            onClick={() => onNavigate('screen-home')}
            className="flex items-center gap-2 sm:gap-2.5 group text-left"
          >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#261C19] to-[#14100E] border-2 border-coral-500 shadow-sm flex items-center justify-center relative overflow-hidden transition-transform duration-200 group-hover:scale-105">
            <span className="font-heading font-black text-sm sm:text-base bg-gradient-to-br from-[#FFFDF9] to-gold-400 bg-clip-text text-transparent">
              SX
            </span>
            <Zap className="w-2 h-2 text-gold-500 absolute top-0.5 right-0.5 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="font-heading font-extrabold text-base sm:text-lg tracking-tight text-neutral-900 dark:text-cream-50 leading-none">
              Stat<span className="bg-gradient-to-r from-coral-500 to-sunset bg-clip-text text-transparent">Xam</span>
            </div>
            <span className="text-[8px] sm:text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
              State Boards & CET
            </span>
          </div>
        </button>
        </div>

        <nav className="desktop-chrome hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                  isActive
                    ? 'bg-coral-500/10 font-bold text-coral-500'
                    : 'text-neutral-600 hover:bg-cream-100 hover:text-coral-500 dark:text-neutral-300'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Header Action Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onOpenBoardModal}
            className="hidden items-center gap-1 rounded-full border border-cream-200 bg-surface-light px-2.5 py-1 text-[11px] font-semibold text-neutral-800 shadow-sm dark:border-surface-darkCard dark:bg-surface-dark dark:text-cream-100 md:inline-flex"
            title="Switch Board"
          >
            <GraduationCap className="w-3 h-3 text-coral-500" />
            <span className="max-w-[90px] truncate">{boardName}</span>
          </button>

          {/* Streak Pill */}
          <div 
            className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full bg-gold-400/15 border border-gold-500/30 text-[11px] font-bold text-amber-700 dark:text-gold-400 shadow-sm"
            title="Daily Practice Streak"
          >
            <Flame className="w-3 h-3 text-gold-500 fill-gold-500 animate-pulse" />
            <span>{streak}d</span>
          </div>

          {/* SM Coins Pill */}
          <button
            onClick={() => onNavigate('screen-leaderboard')}
            className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full bg-gradient-to-r from-gold-500/10 to-coral-500/10 border border-gold-500/40 text-[11px] font-bold text-amber-800 dark:text-gold-300 shadow-sm hover:scale-105 transition-transform"
            title="SM Coins Wallet"
          >
            <Coins className="w-3 h-3 text-gold-500" />
            <span>{coins} ?</span>
          </button>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent('statxam_open_install_modal'))}
            className="hidden items-center gap-1 rounded-full border border-coral-500/40 bg-coral-500/10 px-2.5 py-1 text-[11px] font-extrabold text-coral-600 lg:inline-flex"
            title="Install App"
          >
            <Download className="h-3 w-3" />
            Install App
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-surface-light dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard text-neutral-600 dark:text-neutral-300 hover:text-coral-500 transition-colors"
            title="Toggle Light / Dark Mode"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-gold-400" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Profile Avatar */}
          <button
            onClick={() => (user ? onNavigate('screen-profile') : router.push('/sign-in'))}
            className="h-7 w-7 flex-shrink-0 overflow-hidden rounded-full border-2 border-coral-500 sm:h-8 sm:w-8"
            title={user ? 'View Profile' : 'Sign in'}
          >
            {user ? (
              <img src={userAvatar} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="flex h-full w-full items-center justify-center bg-coral-500 text-[10px] font-black text-white">In</span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
