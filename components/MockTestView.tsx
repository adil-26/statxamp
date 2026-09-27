'use client';

import React, { useState, useEffect } from 'react';
import { MockQuestion } from '@/types';
import { MathView } from './MathView';
import { 
  Timer, 
  CheckCircle2, 
  RotateCcw, 
  ArrowLeft, 
  ArrowRight, 
  Flag, 
  Trophy, 
  Clock, 
  Zap,
  BarChart2
} from 'lucide-react';

interface MockTestViewProps {
  questions: MockQuestion[];
  onClaimCoins: (amount: number, reason: string) => void;
  showToast: (msg: string, icon?: string) => void;
}

export const MockTestView: React.FC<MockTestViewProps> = ({
  questions,
  onClaimCoins,
  showToast
}) => {
  const [testState, setTestState] = useState<'landing' | 'active' | 'results'>('landing');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [reviewed, setReviewed] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins (600s)
  const [reviewMode, setReviewMode] = useState(false);

  // Timer Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (testState === 'active' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testState, timeLeft]);

  const handleStartTest = () => {
    setAnswers({});
    setReviewed({});
    setTimeLeft(600);
    setCurrentIndex(0);
    setReviewMode(false);
    setTestState('active');
    showToast('Mock Test Started! 10 Minutes on clock ??');
  };

  const handleSelectOption = (optIdx: number) => {
    const qId = questions[currentIndex].id;
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleToggleReview = () => {
    const qId = questions[currentIndex].id;
    setReviewed(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleClearResponse = () => {
    const qId = questions[currentIndex].id;
    setAnswers(prev => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  const handleSubmitTest = () => {
    setTestState('results');
    onClaimCoins(25, 'Speed Mock Test Completion');
    showToast('Mock Test Submitted! Calculating accuracy...', 'fa-trophy');
  };

  // Calculate results
  const correctCount = questions.filter(q => answers[q.id] === q.correct).length;
  const totalQuestions = questions.length;
  const accuracy = Math.round((correctCount / totalQuestions) * 100);
  const score = correctCount * 2;

  const currentQ = questions[currentIndex];
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="space-y-7 pb-10">
      
      {/* 1. Landing View */}
      {testState === 'landing' && (
        <div className="max-w-2xl mx-auto bg-surface-light dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard rounded-3xl p-6 sm:p-10 shadow-sm text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-coral-500/10 text-coral-500 flex items-center justify-center mx-auto shadow-sm">
            <Timer className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-cream-50">
              State Board & CET Speed Mock Drill
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              High-yield mixed test featuring Math, Science, and Entrance shortcuts.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-cream-50 dark:bg-surface-darkCard text-xs font-bold text-neutral-700 dark:text-cream-100">
            <div>
              <div className="text-coral-500 text-base font-extrabold">10 Qs</div>
              <div className="text-neutral-400 font-normal">Questions</div>
            </div>
            <div>
              <div className="text-coral-500 text-base font-extrabold">10 Mins</div>
              <div className="text-neutral-400 font-normal">Duration</div>
            </div>
            <div>
              <div className="text-coral-500 text-base font-extrabold">+20 Marks</div>
              <div className="text-neutral-400 font-normal">Total Score</div>
            </div>
          </div>

          <div className="text-left text-xs text-neutral-500 dark:text-neutral-400 space-y-2 p-4 rounded-2xl bg-cream-50/60 dark:bg-surface-darkCard/60 border border-cream-200/50 dark:border-neutral-800">
            <div className="font-bold text-neutral-800 dark:text-cream-100 mb-1">Test Guidelines:</div>
            <div>� Each correct question awards +2 marks. Zero negative marking.</div>
            <div>� Use the interactive question palette on the right to jump between questions.</div>
            <div>� Instant accuracy diagnostics and chapter mastery breakdown provided upon submission.</div>
          </div>

          <button
            onClick={handleStartTest}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-coral-500 to-sunset text-white font-extrabold text-sm shadow-glow-coral hover:scale-102 transition-transform"
          >
            Start Timed Mock Exam Now
          </button>
        </div>
      )}

      {/* 2. Active Test View */}
      {testState === 'active' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Question Area (8 Cols) */}
          <div className="lg:col-span-8 bg-surface-light dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between min-h-[500px]">
            <div className="space-y-5">
              {/* Question Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-cream-100 dark:border-neutral-800">
                <div>
                  <span className="text-xs font-extrabold text-coral-500 uppercase tracking-wider">
                    Question {currentIndex + 1} of {totalQuestions}
                  </span>
                  <div className="text-xs text-neutral-400">{currentQ.chapter}</div>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-coral-500/10 text-coral-500 font-mono text-sm font-bold">
                  <Clock className="w-4 h-4" />
                  <span>{mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}</span>
                </div>
              </div>

              {/* Question Statement */}
              <div className="text-base font-bold text-neutral-900 dark:text-cream-50 leading-relaxed">
                <MathView content={currentQ.question} block />
              </div>

              {/* Options Group */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = answers[currentQ.id] === optIdx;
                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-coral-500/10 border-coral-500 font-bold text-coral-600 dark:text-coral-400 shadow-sm'
                          : 'bg-cream-50 dark:bg-surface-darkCard border-cream-200 dark:border-neutral-800 text-neutral-800 dark:text-cream-100 hover:border-coral-400'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'border-coral-500 bg-coral-500 text-white' : 'border-neutral-300 dark:border-neutral-600 text-neutral-500'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <div className="flex-1 text-sm font-mono">
                        <MathView content={opt} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="pt-6 mt-6 border-t border-cream-100 dark:border-neutral-800 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleReview}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                    reviewed[currentQ.id]
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'bg-cream-100 dark:bg-surface-darkCard text-neutral-600 dark:text-neutral-300 border-cream-200 dark:border-neutral-800'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5 inline mr-1" />
                  {reviewed[currentQ.id] ? 'Marked for Review' : 'Mark for Review'}
                </button>
                <button
                  onClick={handleClearResponse}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                  Clear Choice
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(prev => prev - 1)}
                  className="px-4 py-2 rounded-full bg-cream-100 dark:bg-surface-darkCard text-xs font-bold text-neutral-700 dark:text-cream-200 disabled:opacity-40"
                >
                  <ArrowLeft className="w-3.5 h-3.5 inline mr-1" /> Prev
                </button>

                {currentIndex < totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentIndex(prev => prev + 1)}
                    className="px-5 py-2 rounded-full bg-coral-500 text-white text-xs font-bold shadow-glow-coral"
                  >
                    Next <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitTest}
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-mint-500 to-mint-600 text-white text-xs font-extrabold shadow-md"
                  >
                    Submit Test Now
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Palette Sidebar (4 Cols) */}
          <div className="lg:col-span-4 bg-surface-light dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-neutral-900 dark:text-cream-100">Question Palette</h4>
              
              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, idx) => {
                  const isAns = answers[q.id] !== undefined;
                  const isRev = reviewed[q.id];
                  const isCur = idx === currentIndex;

                  let colorClass = 'bg-cream-100 dark:bg-surface-darkCard text-neutral-600 dark:text-neutral-300 border-cream-200 dark:border-neutral-800';
                  if (isAns) colorClass = 'bg-mint-500 text-white border-mint-500';
                  if (isRev) colorClass = 'bg-amber-500 text-white border-amber-500';

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-10 rounded-xl font-bold text-xs border flex items-center justify-center transition-all ${colorClass} ${
                        isCur ? 'ring-2 ring-coral-500 font-black scale-105' : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="pt-3 text-[11px] space-y-1.5 text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-mint-500" /> Answered ({Object.keys(answers).length})
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-amber-500" /> Marked for Review ({Object.keys(reviewed).filter(k => reviewed[Number(k)]).length})
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-cream-200 dark:bg-neutral-700" /> Unvisited ({totalQuestions - Object.keys(answers).length})
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmitTest}
              className="w-full py-3 rounded-full bg-gradient-to-r from-coral-500 to-sunset text-white font-extrabold text-xs shadow-glow-coral"
            >
              Submit & View Diagnostic
            </button>
          </div>

        </div>
      )}

      {/* 3. Results View */}
      {testState === 'results' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-surface-light dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard rounded-3xl p-8 shadow-sm text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-mint-500/10 text-mint-500 flex items-center justify-center mx-auto">
              <Trophy className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-cream-50">
                Diagnostic Score Card
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">Speed Mock Test Completed � +25 SM Coins Credited</p>
            </div>

            {/* Score Ring */}
            <div className="flex items-center justify-center gap-8 py-2">
              <div>
                <div className="text-4xl font-black text-coral-500">{accuracy}%</div>
                <div className="text-xs text-neutral-400 font-semibold">Overall Accuracy</div>
              </div>
              <div className="h-10 w-px bg-cream-200 dark:bg-neutral-800" />
              <div>
                <div className="text-4xl font-black text-neutral-900 dark:text-cream-50">{score} / 20</div>
                <div className="text-xs text-neutral-400 font-semibold">{correctCount}/{totalQuestions} Correct</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setReviewMode(!reviewMode)}
                className="px-6 py-2.5 rounded-full bg-cream-100 dark:bg-surface-darkCard text-xs font-bold text-neutral-700 dark:text-cream-200 hover:border-coral-500"
              >
                {reviewMode ? 'Hide Solutions' : 'Review All Question Explanations'}
              </button>
              <button
                onClick={handleStartTest}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-coral-500 to-sunset text-white text-xs font-extrabold shadow-glow-coral flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Re-attempt Drill
              </button>
            </div>
          </div>

          {/* Detailed Solutions Review */}
          {reviewMode && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-neutral-900 dark:text-cream-100 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-coral-500" />
                Comprehensive Solutions & Formulas
              </h4>

              <div className="space-y-3">
                {questions.map((q, idx) => {
                  const userAns = answers[q.id];
                  const isCorrect = userAns === q.correct;
                  return (
                    <div
                      key={q.id}
                      className="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-neutral-400">Q.{idx + 1} � {q.chapter}</span>
                        <span className={`font-bold ${isCorrect ? 'text-mint-500' : 'text-red-500'}`}>
                          {isCorrect ? '? Correct (+2)' : '? Incorrect (0)'}
                        </span>
                      </div>

                      <div className="font-bold text-neutral-800 dark:text-cream-100 text-sm">
                        <MathView content={q.question} />
                      </div>

                      <div className="p-3 rounded-xl bg-mint-500/10 border border-mint-500/20 text-mint-900 dark:text-mint-300">
                        <strong>Correct Option: {String.fromCharCode(65 + q.correct)}</strong> � <MathView content={q.explanation} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
