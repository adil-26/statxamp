'use client';

import React, { useState } from 'react';
import { SolverQuestion } from '@/types';
import { MathView } from './MathView';
import { 
  Zap, 
  HelpCircle, 
  Lightbulb, 
  Award, 
  CheckCircle2, 
  ArrowDown, 
  Languages,
  Sparkles
} from 'lucide-react';

interface StepSolverViewProps {
  questionData: SolverQuestion;
  onClaimCoins: (amount: number, reason: string) => void;
  showToast: (msg: string, icon?: string) => void;
}

export const StepSolverView: React.FC<StepSolverViewProps> = ({
  questionData,
  onClaimCoins,
  showToast
}) => {
  const [unlockedStep, setUnlockedStep] = useState(1);
  const [openWhy, setOpenWhy] = useState<Record<number, boolean>>({});
  const [lang, setLang] = useState<'en' | 'mr'>('en');
  const [claimedReward, setClaimedReward] = useState(false);

  const handleRevealNext = () => {
    if (unlockedStep < 4) {
      const next = unlockedStep + 1;
      setUnlockedStep(next);
      if (next === 4 && !claimedReward) {
        setClaimedReward(true);
        onClaimCoins(10, "Mastered Cramer's Rule Step Solver");
      }
    }
  };

  const toggleWhy = (stepNum: number) => {
    setOpenWhy(prev => ({ ...prev, [stepNum]: !prev[stepNum] }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-7 pb-10">
      
      {/* Question Header Card */}
      <div className="bg-surface-light dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-coral-500/10 text-coral-500 text-xs font-bold">
            {questionData.board}
          </span>
          <button
            onClick={() => setLang(lang === 'en' ? 'mr' : 'en')}
            className="px-3 py-1.5 rounded-full bg-cream-100 dark:bg-surface-darkCard border border-cream-200 dark:border-neutral-800 text-xs font-bold text-neutral-700 dark:text-cream-200 hover:border-coral-500 flex items-center gap-1.5"
          >
            <Languages className="w-3.5 h-3.5 text-coral-500" />
            <span>{lang === 'en' ? 'English (Bilingual)' : '????? (?????? ????)'}</span>
          </button>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-cream-50 leading-snug">
            {questionData.chapter}
          </h3>
          <div className="mt-3 p-4 rounded-2xl bg-cream-50 dark:bg-surface-darkCard border border-cream-200/60 dark:border-neutral-800 text-sm font-semibold text-neutral-800 dark:text-cream-100">
            <MathView content={lang === 'mr' ? questionData.questionMr : questionData.questionEn} block />
          </div>
        </div>
      </div>

      {/* Progressive Step Revealer Container */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-neutral-900 dark:text-cream-100 flex items-center gap-2">
            <Zap className="w-5 h-5 text-coral-500" />
            Progressive AI Step Proof Revealer
          </h4>
          <span className="text-xs text-neutral-400 font-semibold">
            Step {unlockedStep} of {questionData.steps.length} Unlocked
          </span>
        </div>

        <div className="space-y-4">
          {questionData.steps.map((step) => {
            const isRevealed = step.stepNum <= unlockedStep;
            return (
              <div
                key={step.stepNum}
                className={`p-6 rounded-3xl border transition-all duration-300 ${
                  isRevealed
                    ? 'bg-surface-light dark:bg-surface-dark border-coral-500/50 dark:border-coral-500/40 shadow-sm opacity-100'
                    : 'bg-cream-100/40 dark:bg-surface-darkCard/40 border-cream-200 dark:border-neutral-800 opacity-40 blur-[0.5px] pointer-events-none'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-coral-500 to-sunset text-white text-xs font-extrabold">
                    Step {step.stepNum} of 4
                  </span>
                  <span className="text-xs font-bold text-neutral-400">
                    {isRevealed ? <CheckCircle2 className="w-4 h-4 text-mint-500 inline" /> : 'Locked'}
                  </span>
                </div>

                <h5 className="font-bold text-sm text-neutral-900 dark:text-cream-100 mt-1">
                  {step.title}
                </h5>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  {step.desc}
                </p>

                <div className="my-3 p-3.5 rounded-2xl bg-cream-50 dark:bg-surface-darkCard text-center font-mono text-sm overflow-x-auto border border-cream-200/60 dark:border-neutral-800">
                  <MathView content={`$$${step.math}$$`} block />
                </div>

                {/* "Why this step?" button */}
                <div className="pt-1">
                  <button
                    onClick={() => toggleWhy(step.stepNum)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-500/10 text-royal-600 dark:text-royal-400 text-xs font-bold hover:bg-royal-500/20 transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Why this step?</span>
                  </button>

                  {openWhy[step.stepNum] && (
                    <div className="mt-2.5 p-3 rounded-xl bg-royal-500/5 border-l-4 border-royal-500 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed animate-fadeIn">
                      {step.whyThisStep}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Reveal Next Button & Completion Banner */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          {unlockedStep < 4 ? (
            <button
              onClick={handleRevealNext}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-coral-500 to-sunset text-white font-extrabold text-sm shadow-glow-coral flex items-center justify-center gap-2 hover:scale-105 transition-transform"
            >
              <ArrowDown className="w-4 h-4" />
              <span>Reveal Step {unlockedStep + 1} of 4</span>
            </button>
          ) : (
            <div className="w-full p-4 rounded-2xl bg-mint-500/10 border border-mint-500/30 text-mint-800 dark:text-mint-300 font-bold text-xs flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-mint-500" />
                <span>All Steps Mastered! Full 3 Marks Guaranteed!</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-mint-500 text-white font-extrabold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> +10 ? Claimed
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ELI5 & Marking Guide Drawers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-900 dark:text-blue-300 text-xs space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-blue-500" /> Explain Simply (ELI5 Analogy)
          </div>
          <p className="leading-relaxed">{questionData.eli5}</p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" /> Marking Scheme Distribution
          </div>
          <p className="leading-relaxed">{questionData.markingGuide}</p>
        </div>
      </div>

    </div>
  );
};
