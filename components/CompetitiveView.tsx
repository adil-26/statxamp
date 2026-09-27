'use client';

import React, { useState } from 'react';
import { CompetitiveExam, Shortcut } from '@/types';
import { MathView } from './MathView';
import { Atom, Zap, Clock, CheckCircle2, Play } from 'lucide-react';

interface CompetitiveViewProps {
  exams: CompetitiveExam[];
  shortcuts: Shortcut[];
  onStartExamMock: (examId: string) => void;
}

export const CompetitiveView: React.FC<CompetitiveViewProps> = ({
  exams,
  shortcuts,
  onStartExamMock
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'All Exams' },
    { id: 'mht-cet', label: 'MHT-CET (PCM/PCB)' },
    { id: 'jee-main', label: 'JEE Main & Adv' },
    { id: 'neet-ug', label: 'NEET-UG' },
    { id: 'nda-cuet', label: 'NDA & CUET' },
    { id: 'ntse-olympiad', label: 'NTSE / Olympiad' },
  ];

  const filteredExams = activeTab === 'all' 
    ? exams 
    : exams.filter(e => e.id === activeTab);

  return (
    <div className="space-y-4 sm:space-y-6 pb-6 sm:pb-10">
      
      {/* Header */}
      <div>
        <h2 className="text-lg sm:text-2xl font-extrabold text-neutral-900 dark:text-cream-50 flex items-center gap-2">
          <Atom className="w-5 h-5 sm:w-6 sm:h-6 text-coral-500" />
          Competitive Exams Hub
        </h2>
        <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          Official shift papers and 30-second AI shortcut hacks for MHT-CET, JEE, NEET, NDA & Olympiads.
        </p>
      </div>

      {/* Filter Tabs (Mobile Compact) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {filterTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-coral-500 to-sunset text-white shadow-sm'
                : 'bg-surface-light dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard text-neutral-600 dark:text-neutral-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 30-Second AI Shortcuts Showcase */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-cream-50 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-royal-500" />
            30-Second AI Shortcut Hacks
          </h3>
          <span className="text-[10px] text-neutral-400">Save 2-3 mins/Q</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {shortcuts.map(sc => (
            <div
              key={sc.id}
              className="bg-surface-light dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard rounded-2xl p-3.5 sm:p-4 shadow-sm space-y-2.5 hover:border-royal-500 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-royal-500/10 text-royal-600 dark:text-royal-400 text-[10px] font-bold">
                  {sc.exam} � {sc.subject}
                </span>
                <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {sc.timeSaved}
                </span>
              </div>

              <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-cream-100">{sc.title}</h4>

              <div className="bg-cream-50 dark:bg-surface-darkCard p-2.5 rounded-xl border border-dashed border-cream-300 dark:border-neutral-700 text-center font-mono text-xs sm:text-sm overflow-x-auto">
                <MathView content={`$$${sc.formula}$$`} block />
              </div>

              <p className="text-[11px] text-neutral-600 dark:text-neutral-300 leading-relaxed">
                <strong>Smart Hack:</strong> {sc.trick}
              </p>

              <div className="bg-cream-100/60 dark:bg-surface-darkCard/60 p-2 rounded-lg text-[11px] text-neutral-600 dark:text-neutral-300">
                <strong>Example:</strong> <MathView content={sc.example} />
              </div>

              <div className="bg-mint-500/10 border border-mint-500/30 p-2 rounded-lg text-[11px] text-mint-700 dark:text-mint-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-mint-500 flex-shrink-0" />
                <span>Result: <MathView content={`$${sc.instantAnswer}$`} /></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Target Entrance Shift Papers */}
      <div className="space-y-3 pt-1">
        <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-cream-50">
          Target Entrance Shift Papers & Drills
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredExams.map(exam => (
            <div
              key={exam.id}
              className="bg-surface-light dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between hover:border-coral-500 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${exam.color}15`, color: exam.color }}
                  >
                    {exam.state}
                  </span>
                  <span className="text-[10px] font-bold text-neutral-400">{exam.markingRule}</span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-cream-50">{exam.name}</h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">{exam.tagline}</p>

                <div className="pt-1 text-[11px] text-neutral-600 dark:text-neutral-300">
                  <span className="font-semibold text-coral-500">Key Yields:</span> {exam.topShortcuts}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-cream-100 dark:border-neutral-800 space-y-2.5">
                <div className="flex items-center justify-between text-[10px] text-neutral-400">
                  <span>{exam.papersCount} Official Shifts</span>
                  <span>{exam.duration}</span>
                </div>

                <button
                  onClick={() => onStartExamMock(exam.id)}
                  className="w-full py-2 rounded-full bg-gradient-to-r from-coral-500 to-sunset text-white font-bold text-[11px] shadow-sm flex items-center justify-center gap-1.5 hover:scale-102 transition-transform"
                >
                  <Play className="w-3 h-3 fill-white" /> Start Practice Paper
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
