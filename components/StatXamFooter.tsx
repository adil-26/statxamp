'use client';

import React from 'react';
import { ScreenId } from '@/types';
import { Zap, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-auto border-t border-cream-200 dark:border-surface-darkCard bg-surface-light dark:bg-surface-dark pt-12 pb-16 lg:pb-12 text-xs text-neutral-500 dark:text-neutral-400">
      <div className="max-w-[1240px] mx-auto px-4 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#261C19] to-[#14100E] border border-coral-500 flex items-center justify-center">
                <span className="font-heading font-black text-xs text-white">SX</span>
              </div>
              <span className="font-heading font-extrabold text-base text-neutral-900 dark:text-cream-50">
                Stat<span className="text-coral-500">Xam</span>
              </span>
            </div>
            <p className="leading-relaxed">
              India's premier AI-powered learning and PYQ practice platform for State Boards & Competitive Entrance Exams.
            </p>
            <div className="flex items-center gap-2 text-mint-600 dark:text-mint-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-mint-500 animate-pulse" />
              <span>All AI & Speech Systems Operational</span>
            </div>
          </div>

          {/* State Boards */}
          <div className="space-y-2">
            <h5 className="font-bold text-neutral-900 dark:text-cream-100 text-sm">Covered State Boards</h5>
            <ul className="space-y-1.5">
              <li>Maharashtra State Board (SSC & HSC)</li>
              <li>UP Madhyamik Shiksha Parishad (UPMSP)</li>
              <li>Bihar School Examination Board (BSEB)</li>
              <li>Tamil Nadu Directorate (TNDGE)</li>
              <li>Karnataka Secondary Board (KSEAB)</li>
            </ul>
          </div>

          {/* Competitive Exams */}
          <div className="space-y-2">
            <h5 className="font-bold text-neutral-900 dark:text-cream-100 text-sm">Competitive FastTrack</h5>
            <ul className="space-y-1.5">
              <li><button onClick={() => onNavigate('screen-competitive')} className="hover:text-coral-500">MHT-CET 2025 (PCM/PCB)</button></li>
              <li><button onClick={() => onNavigate('screen-competitive')} className="hover:text-coral-500">JEE Main 2025 (NTA Shifts)</button></li>
              <li><button onClick={() => onNavigate('screen-competitive')} className="hover:text-coral-500">NEET-UG 2025 (NCERT Drill)</button></li>
              <li><button onClick={() => onNavigate('screen-competitive')} className="hover:text-coral-500">UPSC NDA & CUET (UG)</button></li>
              <li><button onClick={() => onNavigate('screen-competitive')} className="hover:text-coral-500">NTSE & State Olympiads</button></li>
            </ul>
          </div>

          {/* Platform Features */}
          <div className="space-y-2">
            <h5 className="font-bold text-neutral-900 dark:text-cream-100 text-sm">Core Intelligence</h5>
            <ul className="space-y-1.5">
              <li><button onClick={() => onNavigate('screen-aitutor')} className="hover:text-coral-500">24/7 Arya AI Voice Tutor</button></li>
              <li><button onClick={() => onNavigate('screen-papers')} className="hover:text-coral-500">20+ Years PYQ Library</button></li>
              <li><button onClick={() => onNavigate('screen-mocktest')} className="hover:text-coral-500">10-Min Speed Mock Drill</button></li>
              <li><button onClick={() => onNavigate('screen-analysis')} className="hover:text-coral-500">5-Year Weightage Intelligence</button></li>
              <li><button onClick={() => onNavigate('screen-leaderboard')} className="hover:text-coral-500">District & State Leaderboards</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 border-t border-cream-100 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            � 2026 StatXam Ed-Tech Platform. Built for Indian State Board & Competitive Aspirants.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span className="flex items-center gap-1 text-mint-500 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Board Certified
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
