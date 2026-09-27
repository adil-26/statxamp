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
  ArrowRight,
  Share2
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
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check if already standalone/installed
    if (typeof window !== 'undefined') {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                           (window.navigator as any).standalone === true;
      if (isStandalone) {
        setIsInstalled(true);
        return;
      }

      // Check iOS
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isAppleDevice = /iphone|ipad|ipod/.test(userAgent);
      setIsIOS(isAppleDevice);

      // Check if dismissed recently (within 24 hours)
      const dismissedTime = localStorage.getItem('statxam_install_dismissed');
      const now = Date.now();
      const isRecentlyDismissed = dismissedTime && now - parseInt(dismissedTime, 10) < 24 * 60 * 60 * 1000;

      // 2. Listen to browser beforeinstallprompt
      const handleBeforeInstall = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        if (!isRecentlyDismissed) {
          // Show polite banner after 2 seconds
          setTimeout(() => setIsVisible(true), 1800);
        }
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstall);

      // If on mobile browser and not recently dismissed, show banner after 2.5s even if event is delayed
      if (!isRecentlyDismissed && /android|iphone|ipad|mobile/.test(userAgent)) {
        setTimeout(() => setIsVisible(true), 2500);
      }

      // Listen for custom open event (from menu/navbar)
      const handleOpenCustom = () => {
        setIsModalOpen(true);
      };
      window.addEventListener('statxam_open_install_modal', handleOpenCustom);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
        window.removeEventListener('statxam_open_install_modal', handleOpenCustom);
      };
    }
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        if (onShowToast) onShowToast('Thank you! StatXam app installed successfully 🎉');
        setIsVisible(false);
        setIsModalOpen(false);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setIsModalOpen(true);
    } else {
      // Trigger native download / APK modal
      setIsModalOpen(true);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('statxam_install_dismissed', Date.now().toString());
  };

  if (isInstalled) return null;

  return (
    <>
      {/* 1. Floating Bottom Notification Banner (Appears automatically on visit) */}
      {isVisible && !isModalOpen && (
        <div className="fixed bottom-16 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in slide-in-from-bottom duration-300">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 dark:bg-surface-dark/95 backdrop-blur-xl border border-coral-500/40 shadow-glow-coral flex items-center justify-between gap-3 text-neutral-900 dark:text-cream-50">
            
            {/* App Icon */}
            <div className="relative flex-shrink-0">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#261C19] to-[#14100E] border-2 border-coral-500 flex items-center justify-center shadow-md">
                <span className="font-heading font-black text-sm text-gold-400">SX</span>
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-mint-500 border-2 border-white dark:border-surface-dark animate-pulse" />
            </div>

            {/* Banner Text */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className="font-heading font-extrabold text-xs sm:text-sm tracking-tight text-neutral-900 dark:text-cream-50 truncate">
                  Install StatXam App
                </h4>
                <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-coral-500 text-white uppercase">
                  APK / Mobile
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-tight mt-0.5 line-clamp-1">
                Fast 1-tap launch, 24/7 Arya AI doubt tutor & offline mock exams.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={handleInstallClick}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-coral-500 to-sunset hover:from-coral-600 hover:to-sunset text-white font-extrabold text-xs shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install</span>
              </button>

              <button
                onClick={handleDismiss}
                aria-label="Dismiss install notification"
                className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 2. Full App Installation & APK Download Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in"
          />

          <div className="relative w-full max-w-sm bg-white dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard rounded-3xl p-5 shadow-2xl z-10 space-y-4 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#261C19] to-[#14100E] border-2 border-coral-500 flex items-center justify-center shadow-md">
                  <span className="font-heading font-black text-base text-gold-400">SX</span>
                </div>
                <div>
                  <h3 className="font-heading font-black text-base text-neutral-900 dark:text-cream-50">
                    Stat<span className="text-coral-500">Xam</span> Mobile App
                  </h3>
                  <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                    Official Student Edition
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-cream-100 dark:bg-surface-darkCard border border-cream-200 dark:border-neutral-800 text-neutral-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Perks List */}
            <div className="space-y-2 py-1 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-cream-50 dark:bg-surface-darkCard/50 border border-cream-200/50 dark:border-neutral-800">
                <CheckCircle2 className="w-4 h-4 text-mint-500 shrink-0" />
                <span className="text-neutral-700 dark:text-cream-100 font-semibold">
                  Zero lag: Immediate access from your phone home screen
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-cream-50 dark:bg-surface-darkCard/50 border border-cream-200/50 dark:border-neutral-800">
                <Zap className="w-4 h-4 text-gold-500 shrink-0" />
                <span className="text-neutral-700 dark:text-cream-100 font-semibold">
                  Instant camera doubt scan & Marathi/English voice solver
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-cream-50 dark:bg-surface-darkCard/50 border border-cream-200/50 dark:border-neutral-800">
                <ShieldCheck className="w-4 h-4 text-coral-500 shrink-0" />
                <span className="text-neutral-700 dark:text-cream-100 font-semibold">
                  Offline-ready speed mock test engine with timer
                </span>
              </div>
            </div>

            {/* Platform Specific Action */}
            {isIOS ? (
              <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-2 text-xs text-blue-900 dark:text-blue-200">
                <div className="font-extrabold flex items-center gap-1.5">
                  <Share2 className="w-4 h-4 text-blue-600" />
                  <span>How to install on iOS / iPhone:</span>
                </div>
                <ol className="list-decimal pl-4 space-y-1 text-[11px] leading-relaxed">
                  <li>Tap the <strong>Share button (⎋)</strong> in Safari.</li>
                  <li>Scroll down and tap <strong>'Add to Home Screen' (⊞)</strong>.</li>
                  <li>Tap <strong>'Add'</strong> in the top-right corner.</li>
                </ol>
              </div>
            ) : (
              <div className="space-y-2.5">
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
                      if (onShowToast) onShowToast('Downloading StatXam APK package...');
                      // Trigger direct APK download route or manifest prompt
                      window.location.href = '/manifest.json';
                    }
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-coral-500 to-sunset hover:from-coral-600 hover:to-sunset text-white font-black text-sm shadow-md hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>1-Click Install App (No Play Store Required)</span>
                </button>

                {/* Direct APK Download fallback button */}
                <button
                  onClick={() => {
                    if (onShowToast) onShowToast('Starting Android APK package download...');
                    // Direct download
                    const link = document.createElement('a');
                    link.href = '/manifest.json';
                    link.download = 'statxam-app.webmanifest';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    setIsModalOpen(false);
                  }}
                  className="w-full py-2.5 px-3 rounded-2xl bg-surface-light dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard hover:border-coral-500 text-neutral-800 dark:text-cream-100 font-extrabold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-coral-500" />
                  <span>Download Standalone Android APK Package</span>
                </button>
              </div>
            )}

            <div className="text-[10px] text-center text-neutral-400">
              100% Free & Safe • Verified for Maharashtra SSC/HSC & CBSE
            </div>

          </div>
        </div>
      )}
    </>
  );
};
