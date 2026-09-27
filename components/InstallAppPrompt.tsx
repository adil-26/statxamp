'use client';

import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Smartphone, 
  X, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink, 
  Zap, 
  Bell, 
  Share2,
  ChevronRight,
  Layers
} from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface InstallAppPromptProps {
  onShowToast?: (msg: string) => void;
}

export const InstallAppPrompt: React.FC<InstallAppPromptProps> = ({ onShowToast }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if running as standalone PWA or Capacitor native app
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         (window.navigator as any).standalone === true ||
                         (window as any).Capacitor !== undefined;
    
    if (isStandalone) {
      setIsInstalled(true);
      setShowBanner(false);
      return;
    }

    const ua = window.navigator.userAgent.toLowerCase();
    const isApple = /iphone|ipad|ipod/.test(ua);
    setIsIOS(isApple);

    // Listen to browser beforeinstallprompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Listen for custom trigger from Navbar, AppDrawer, or Dashboard
    const handleOpenCustom = () => {
      setIsModalOpen(true);
    };
    window.addEventListener('statxam_open_install_modal', handleOpenCustom);

    // Show polite welcoming toast
    const timer = setTimeout(() => {
      if (onShowToast) {
        onShowToast('📲 StatXam App Ready: Install for instant offline access & AI camera doubt solver!');
      }
    }, 1200);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('statxam_open_install_modal', handleOpenCustom);
    };
  }, [onShowToast]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        if (onShowToast) onShowToast('Thank you! StatXam app installed successfully 🎉');
        setShowBanner(false);
        setIsModalOpen(false);
      }
      setDeferredPrompt(null);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleDownloadApkDirectly = () => {
    if (onShowToast) onShowToast('Starting direct StatXam APK download...');
    window.open('https://github.com/adil-26/statxamp/releases/latest/download/StatXam-v1.0.0.apk', '_blank');
  };

  if (isInstalled) return null;

  return (
    <>
      {/* 1. Prominent Top Notification Bar (Visible on mobile & desktop upon opening site) */}
      {showBanner && !isModalOpen && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#221338] via-[#2F1522] to-[#121E3B] text-white px-3 sm:px-4 py-2.5 shadow-lg border-b border-coral-500/40 animate-in slide-in-from-top duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2.5">
            
            {/* Left: App Icon & Announcement */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-coral-500 to-amber-500 flex items-center justify-center shadow-sm flex-shrink-0">
                <Smartphone className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-heading font-black text-xs text-white tracking-tight">
                    Install StatXam App
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full bg-coral-500 text-white text-[9px] font-black uppercase">
                    Android APK / PWA
                  </span>
                </div>
                <p className="text-[11px] text-cream-200/90 truncate hidden sm:block">
                  Fast 1-tap mobile launch, camera handwritten doubt solver & offline speed tests.
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleInstallClick}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-coral-500 to-sunset hover:from-coral-600 hover:to-sunset text-white font-extrabold text-[11px] sm:text-xs shadow-glow-coral flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-transform"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install App</span>
              </button>

              <button
                onClick={handleDownloadApkDirectly}
                className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-[11px] sm:text-xs hidden md:inline-flex items-center gap-1 transition-colors"
                title="Download Standalone APK file"
              >
                <span>Download APK</span>
              </button>

              <button
                onClick={() => setShowBanner(false)}
                className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 2. Floating Quick Install Badge (Always available when banner is closed) */}
      {!showBanner && !isModalOpen && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 px-3.5 py-2 rounded-full bg-gradient-to-r from-coral-500 via-sunset to-amber-500 text-white font-black text-xs shadow-glow-coral flex items-center gap-2 hover:scale-105 active:scale-95 transition-all border border-white/30 animate-bounce duration-1000"
        >
          <Smartphone className="w-4 h-4" />
          <span>Install App / APK</span>
        </button>
      )}

      {/* 3. Comprehensive App Installation & APK Download Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in"
          />

          <div className="relative w-full max-w-md bg-white dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard rounded-3xl p-5 sm:p-6 shadow-2xl z-10 space-y-4 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-cream-100 dark:border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#261C19] to-[#14100E] border-2 border-coral-500 flex items-center justify-center shadow-md">
                  <span className="font-heading font-black text-base text-gold-400">SX</span>
                </div>
                <div>
                  <h3 className="font-heading font-black text-base sm:text-lg text-neutral-900 dark:text-cream-50">
                    Stat<span className="text-coral-500">Xam</span> Mobile App
                  </h3>
                  <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                    Official Student Edition (v1.0.0)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-cream-100 dark:bg-surface-darkCard border border-cream-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-cream-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-2 py-1 text-xs">
              <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-cream-50 dark:bg-surface-darkCard/60 border border-cream-200/60 dark:border-neutral-800">
                <div className="w-7 h-7 rounded-xl bg-mint-500/10 text-mint-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900 dark:text-cream-50">Fast 1-Tap Home Screen Access</div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">No browser address bar, instant native app performance.</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-cream-50 dark:bg-surface-darkCard/60 border border-cream-200/60 dark:border-neutral-800">
                <div className="w-7 h-7 rounded-xl bg-pink-500/10 text-pink-600 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900 dark:text-cream-50">24/7 Arya AI Camera Doubt Solver</div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">Snap handwritten notes or textbook pages for instant proofs.</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-cream-50 dark:bg-surface-darkCard/60 border border-cream-200/60 dark:border-neutral-800">
                <div className="w-7 h-7 rounded-xl bg-coral-500/10 text-coral-600 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900 dark:text-cream-50">Offline Mock Exam Engine</div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">10-year Maharashtra SSC/HSC & CBSE PYQ papers with timers.</div>
                </div>
              </div>
            </div>

            {/* Platform Instructions & Download Buttons */}
            {isIOS ? (
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-2.5 text-xs text-blue-900 dark:text-blue-200">
                <div className="font-extrabold flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-blue-600" />
                  <span>How to install on iOS / Safari:</span>
                </div>
                <ol className="list-decimal pl-4 space-y-1.5 text-[11px] leading-relaxed">
                  <li>Tap the <strong>Share button (⎋)</strong> at the bottom of Safari.</li>
                  <li>Scroll down and tap <strong>'Add to Home Screen' (⊞)</strong>.</li>
                  <li>Tap <strong>'Add'</strong> in the top-right corner to place StatXam on your phone!</li>
                </ol>
              </div>
            ) : (
              <div className="space-y-3 pt-1">
                {/* 1-Click Install Button */}
                <button
                  onClick={async () => {
                    if (deferredPrompt) {
                      deferredPrompt.prompt();
                      const { outcome } = await deferredPrompt.userChoice;
                      if (outcome === 'accepted' && onShowToast) {
                        onShowToast('StatXam App installed on your phone! 🎉');
                      }
                      setDeferredPrompt(null);
                      setIsModalOpen(false);
                    } else {
                      handleDownloadApkDirectly();
                    }
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-coral-500 to-sunset hover:from-coral-600 hover:to-sunset text-white font-black text-sm shadow-glow-coral hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>1-Click Install App (Recommended)</span>
                </button>

                {/* Direct Android APK Download Button */}
                <button
                  onClick={handleDownloadApkDirectly}
                  className="w-full py-3 px-4 rounded-2xl bg-surface-light dark:bg-surface-darkCard border border-coral-500/50 hover:border-coral-500 text-neutral-900 dark:text-cream-50 font-extrabold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Download className="w-4 h-4 text-coral-500" />
                  <span>Download Standalone Android APK (StatXam-v1.0.0.apk)</span>
                </button>
              </div>
            )}

            <div className="text-[10px] text-center text-neutral-400 pt-1">
              100% Free & Safe • Verified for Maharashtra SSC/HSC & CBSE
            </div>

          </div>
        </div>
      )}
    </>
  );
};
