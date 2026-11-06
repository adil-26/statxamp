'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import { ScreenId } from '@/types';
import { 
  USER_DATA, 
  BOARDS_DATA, 
  COMPETITIVE_EXAMS_DATA, 
  SHORTCUTS_DATA, 
  SAMPLE_NOTES_DATA, 
  PYQ_PAPERS_DATA, 
  SOLVER_QUESTION_DATA, 
  MOCK_QUESTIONS_DATA, 
  TRENDS_INTELLIGENCE_DATA, 
  LEADERBOARDS_DATA, 
  SM_STORE_DATA, 
  PEER_ACTIVITY_DATA 
} from '@/lib/data';

import { Navbar } from '@/components/Navbar';
import { MobileNav } from '@/components/MobileNav';
import { DashboardView } from '@/components/DashboardView';
import { CompetitiveView } from '@/components/CompetitiveView';
import { AITutorView } from '@/components/AITutorView';
import { PYQLibraryView } from '@/components/PYQLibraryView';
import { StepSolverView } from '@/components/StepSolverView';
import { MockTestView } from '@/components/MockTestView';
import { TrendsAnalysisView } from '@/components/TrendsAnalysisView';
import { LeaderboardView } from '@/components/LeaderboardView';
import { ProfileView } from '@/components/ProfileView';
import { BoardModal } from '@/components/BoardModal';
import { AppDrawer } from '@/components/AppDrawer';
import { InstallAppPrompt } from '@/components/InstallAppPrompt';
import { ArrowLeft } from 'lucide-react';
import { Footer as StatXamFooter } from '@/components/StatXamFooter';
import { Toast } from '@/components/Toast';
import { useAuth } from '@/lib/auth';

export function StatXamApp() {
  const searchParams = useSearchParams();
  const queryScreen = searchParams.get('screen');
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('screen-home');
  const [syncedQuery, setSyncedQuery] = useState<string | null>(null);
  const [theme, setTheme] = useState<string>('light');
  const [userCoins, setUserCoins] = useState<number>(USER_DATA.coins);
  const [userStreak, setUserStreak] = useState<number>(USER_DATA.streak);
  const [currentBoardCode, setCurrentBoardCode] = useState<string>(USER_DATA.boardCode);
  const [activeNoteId, setActiveNoteId] = useState<string>(SAMPLE_NOTES_DATA[0].id);
  const [bookmarks, setBookmarks] = useState<string[]>(['mh-math1-2024']);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { user: authUser, profile } = useAuth();

  const screenTitles: Record<ScreenId, string> = {
    'screen-home': 'Dashboard',
    'screen-competitive': '🎯 Competitive Entrance FastTrack',
    'screen-aitutor': '🤖 StatXam AI Doubt Tutor (24/7 Voice & OCR)',
    'screen-papers': '📚 20+ Years PYQ Papers Library',
    'screen-question': '📝 Step-by-Step Solver & Proofs',
    'screen-mocktest': '⚡ 10-Min Speed Mock Drill',
    'screen-analysis': '📈 5-Year PYQ Weightage Trends',
    'screen-leaderboard': '🏆 National Leaderboard & SM Coins Store',
    'screen-profile': '👤 Student Profile & Settings',
  };

  const wantedScreen = queryScreen && screenTitles[queryScreen as ScreenId] ? (queryScreen as ScreenId) : 'screen-home';
  if (queryScreen !== syncedQuery) {
    setSyncedQuery(queryScreen);
    if (wantedScreen !== currentScreen) setCurrentScreen(wantedScreen);
  }

  // Initialize Theme & Local Storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('statxam_theme') || 'light';
    const savedCoins = localStorage.getItem('statxam_coins');
    const savedBookmarks = localStorage.getItem('statxam_bookmarks');

    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (savedCoins) setUserCoins(parseInt(savedCoins, 10));
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (e) {
        // ignore
      }
    }

    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const screenParam = urlParams.get('screen') as ScreenId | null;
      if (screenParam) {
        setCurrentScreen(screenParam);
      }
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF5E3A', '#FFB800', '#00C49F', '#7C5CFC']
      });
    } catch (e) {
      // fallback
    }
  };

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('statxam_theme', nextTheme);
  };

  const handleClaimCoins = (amount: number, reason: string) => {
    setUserCoins(prev => {
      const next = prev + amount;
      localStorage.setItem('statxam_coins', next.toString());
      return next;
    });
    fireConfetti();
    triggerToast(`+${amount} SM Coins earned! (${reason})`);
  };

  const handleBuyStoreItem = (itemId: string, cost: number) => {
    if (userCoins < cost) {
      triggerToast(`Not enough coins! Need ${cost} 🪙. Solve more PYQs to earn!`);
      return;
    }
    setUserCoins(prev => {
      const next = prev - cost;
      localStorage.setItem('statxam_coins', next.toString());
      return next;
    });
    fireConfetti();
    triggerToast(`Item Redeemed Successfully! -${cost} 🪙`);
  };

  const handleToggleBookmark = (paperId: string) => {
    setBookmarks(prev => {
      let updated: string[];
      if (prev.includes(paperId)) {
        updated = prev.filter(id => id !== paperId);
        triggerToast('Removed from Bookmarks');
      } else {
        updated = [...prev, paperId];
        triggerToast('Saved to Bookmarks! 🔖');
      }
      localStorage.setItem('statxam_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  const currentBoard = BOARDS_DATA.find(b => b.code === currentBoardCode) || BOARDS_DATA[0];
  const student = {
    ...USER_DATA,
    name: profile?.full_name || authUser?.email || USER_DATA.name,
    classLevel: profile?.class_level || USER_DATA.classLevel,
    board: profile?.board || currentBoard.name,
    coins: profile ? profile.coins : userCoins,
    streak: profile ? profile.streak : userStreak,
  };

  const goTo = (screen: ScreenId) => {
    setCurrentScreen(screen);
    const base = window.location.pathname.startsWith('/app') ? '/app' : '/';
    const url = screen === 'screen-home' ? base : `${base}?screen=${screen}`;
    window.history.pushState({ screen }, '', url);
  };

  useEffect(() => {
    const onPop = () => {
      const screen = new URLSearchParams(window.location.search).get('screen') as ScreenId | null;
      setCurrentScreen(screen && screenTitles[screen] ? screen : 'screen-home');
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return (
    <div className={`app-screen flex min-h-screen flex-col pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0 ${currentScreen === 'screen-aitutor' ? 'h-dvh overflow-hidden' : ''}`}>
      
      {/* 1. Header with SX Logo, Board Switcher, Coins, Streak & Profile */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={(screen) => goTo(screen)}
        coins={userCoins}
        streak={userStreak}
        boardName={currentBoard.code}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenBoardModal={() => setIsBoardModalOpen(true)}
        userAvatar={USER_DATA.avatar}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      {/* 2. Main Content Container */}
      <main className={`mx-auto flex w-full max-w-[1240px] flex-1 flex-col px-3 sm:px-4 ${currentScreen === 'screen-aitutor' ? 'min-h-0 pt-2' : 'pt-3 sm:pt-5'}`}>
        {currentScreen !== 'screen-home' && currentScreen !== 'screen-aitutor' && (
          <>
            <button
              onClick={() => goTo('screen-home')}
              className="mb-3 inline-flex items-center gap-1 text-sm font-bold text-neutral-800 dark:text-cream-50 lg:hidden"
            >
              <ArrowLeft className="w-4 h-4 text-coral-500" />
              Home
            </button>
            <div className="mb-4 hidden items-center justify-between rounded-2xl border border-cream-200 bg-white/95 p-3 shadow-xs backdrop-blur-md dark:border-surface-darkCard dark:bg-surface-dark/95 lg:flex">
              <button
                onClick={() => goTo('screen-home')}
                className="inline-flex items-center gap-1.5 rounded-xl bg-coral-500/10 px-3 py-1.5 text-xs font-extrabold text-coral-600"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </button>
              <span className="text-xs font-black uppercase tracking-wide text-neutral-800 dark:text-cream-50">
                {screenTitles[currentScreen]}
              </span>
            </div>
          </>
        )}

        {currentScreen === 'screen-home' && (
          <DashboardView
            user={student}
            exams={COMPETITIVE_EXAMS_DATA}
            peers={PEER_ACTIVITY_DATA}
            onNavigate={(s) => goTo(s)}
            onSolvePaper={(paperId) => goTo('screen-question')}
            onSelectSampleNote={(noteId) => {
              setActiveNoteId(noteId);
              goTo('screen-aitutor');
            }}
          />
        )}

        {currentScreen === 'screen-competitive' && (
          <CompetitiveView
            exams={COMPETITIVE_EXAMS_DATA}
            shortcuts={SHORTCUTS_DATA}
            onStartExamMock={(examId) => goTo('screen-mocktest')}
          />
        )}

        {currentScreen === 'screen-aitutor' && (
          <AITutorView
            sampleNotes={SAMPLE_NOTES_DATA}
            activeNoteId={activeNoteId}
            onSelectNote={(noteId) => setActiveNoteId(noteId)}
            onClaimCoins={handleClaimCoins}
            showToast={triggerToast}
          />
        )}

        {currentScreen === 'screen-papers' && (
          <PYQLibraryView
            papers={PYQ_PAPERS_DATA}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onSolvePaper={(paperId) => goTo('screen-question')}
          />
        )}

        {currentScreen === 'screen-question' && (
          <StepSolverView
            questionData={SOLVER_QUESTION_DATA}
            onClaimCoins={handleClaimCoins}
            showToast={triggerToast}
          />
        )}

        {currentScreen === 'screen-mocktest' && (
          <MockTestView
            questions={MOCK_QUESTIONS_DATA}
            onClaimCoins={handleClaimCoins}
            showToast={triggerToast}
          />
        )}

        {currentScreen === 'screen-analysis' && (
          <TrendsAnalysisView
            trends={TRENDS_INTELLIGENCE_DATA.fiveYearTrends}
            formats={TRENDS_INTELLIGENCE_DATA.top3GuaranteedFormats}
            weakArea={TRENDS_INTELLIGENCE_DATA.weakAreaDiagnostic}
            onSolvePaper={(paperId) => goTo('screen-question')}
          />
        )}

        {currentScreen === 'screen-leaderboard' && (
          <LeaderboardView
            leaderboards={LEADERBOARDS_DATA}
            storeItems={SM_STORE_DATA}
            userCoins={userCoins}
            onBuyItem={handleBuyStoreItem}
          />
        )}

        {currentScreen === 'screen-profile' && (
          <ProfileView
            user={student}
            boards={BOARDS_DATA}
            onOpenBoardModal={() => setIsBoardModalOpen(true)}
            theme={theme}
            onToggleTheme={handleToggleTheme}
          />
        )}

      </main>

      {/* 3. Floating Mobile Navigation (Home, Papers, Elevated StatXam AI button, Mock, Profile) */}
      <MobileNav
        currentScreen={currentScreen}
        onNavigate={(screen) => goTo(screen)}
      />

      {/* 3.5 App Slide-Over Navigation Drawer */}
      <AppDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentScreen={currentScreen}
        onNavigate={(screen) => goTo(screen)}
        user={student}
        boards={BOARDS_DATA}
        currentBoardCode={currentBoardCode}
        onOpenBoardModal={() => setIsBoardModalOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {currentScreen !== 'screen-aitutor' && <StatXamFooter onNavigate={(screen) => goTo(screen)} />}

      {/* 5. State Board Selection Modal */}
      <BoardModal
        isOpen={isBoardModalOpen}
        onClose={() => setIsBoardModalOpen(false)}
        boards={BOARDS_DATA}
        currentBoardCode={currentBoardCode}
        onSelectBoard={(code) => {
          setCurrentBoardCode(code);
          const b = BOARDS_DATA.find(x => x.code === code);
          triggerToast(`Switched board to ${b?.name || code}`);
        }}
      />

      {/* 6. Toast Notification */}
      <Toast message={toastMessage} />

      {/* 7. Automatic Mobile App Install & APK Prompt */}
      <InstallAppPrompt onShowToast={triggerToast} />

    </div>
  );
}
