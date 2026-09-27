'use client';

import React from 'react';
import { TrendItem, GuaranteedFormat } from '@/types';
import { BarChart3, Flame, AlertCircle, ArrowRight, Lightbulb } from 'lucide-react';

interface TrendsAnalysisViewProps {
  trends: TrendItem[];
  formats: GuaranteedFormat[];
  weakArea: {
    studentWeakChapter: string;
    recentAccuracy: string;
    recommendedAction: string;
    suggestedPaperId: string;
  };
  onSolvePaper: (paperId: string) => void;
}

export const TrendsAnalysisView: React.FC<TrendsAnalysisViewProps> = ({
  trends,
  formats,
  weakArea,
  onSolvePaper
}) => {
  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-cream-50 flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-coral-500" />
          5-Year PYQ Intelligence & Board Weightage
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Historical probability engine predicting 2025 Board & Entrance exam questions based on 20+ years of trend analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Chapter Weightage Progress Bars (7 Cols) */}
        <div className="lg:col-span-7 bg-surface-light dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-cream-100 dark:border-neutral-800">
            <h3 className="text-base font-bold text-neutral-900 dark:text-cream-100 flex items-center gap-2">
              <Flame className="w-4 h-4 text-coral-500" />
              Chapter Repeat Probability Breakdown
            </h3>
            <span className="text-xs text-neutral-400">2020�2024 Data</span>
          </div>

          <div className="space-y-4">
            {trends.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-neutral-800 dark:text-cream-100">{item.chapter} ({item.weightage})</span>
                  <span className="text-coral-500">{item.repeatProb}% Repeat Probability</span>
                </div>

                <div className="w-full h-2.5 rounded-full bg-cream-100 dark:bg-surface-darkCard overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-coral-500 to-sunset transition-all duration-700"
                    style={{ width: `${item.repeatProb}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-400">
                  <span>{item.status}</span>
                  <span className="px-2 py-0.5 rounded bg-cream-100 dark:bg-surface-darkCard text-neutral-600 dark:text-neutral-300 font-semibold">
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Top 3 Guaranteed Repeat Formats + Weak Area Diagnostic (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Top 3 Guaranteed Formats */}
          <div className="bg-surface-light dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard rounded-3xl p-6 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-neutral-900 dark:text-cream-100">
              Top 3 Guaranteed Repeat Formats
            </h4>

            <div className="space-y-3">
              {formats.map(fmt => (
                <div
                  key={fmt.rank}
                  className="p-4 rounded-2xl bg-cream-50 dark:bg-surface-darkCard border border-cream-200/60 dark:border-neutral-800 space-y-1.5 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-gold-500 text-white font-extrabold text-[10px]">
                      Rank #{fmt.rank}
                    </span>
                    <div className="font-bold text-neutral-900 dark:text-cream-100">{fmt.title}</div>
                  </div>

                  <div className="text-coral-500 font-semibold">{fmt.frequency}</div>
                  <p className="text-neutral-500 dark:text-neutral-400 flex items-start gap-1 pt-0.5">
                    <Lightbulb className="w-3.5 h-3.5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <span>{fmt.tip}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Weak Area Diagnostic Card */}
          <div className="bg-gradient-to-br from-amber-500/10 via-coral-500/10 to-transparent border border-coral-500/30 rounded-3xl p-6 shadow-sm space-y-3 text-xs">
            <div className="flex items-center gap-2 text-coral-600 dark:text-coral-400 font-extrabold uppercase tracking-wide">
              <AlertCircle className="w-4 h-4" /> AI Weak Area Diagnostic
            </div>

            <div>
              <div className="text-sm font-bold text-neutral-900 dark:text-cream-50">{weakArea.studentWeakChapter}</div>
              <div className="text-neutral-500 dark:text-neutral-400 mt-0.5">Recent Mock Accuracy: {weakArea.recentAccuracy}</div>
            </div>

            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
              <strong>Remedy Plan:</strong> {weakArea.recommendedAction}
            </p>

            <button
              onClick={() => onSolvePaper(weakArea.suggestedPaperId)}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-coral-500 to-sunset text-white font-bold shadow-glow-coral flex items-center justify-center gap-1.5 hover:scale-102 transition-transform"
            >
              Solve Remedial PYQ Paper <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
