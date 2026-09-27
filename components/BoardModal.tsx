'use client';

import React from 'react';
import { Board } from '@/types';
import { X, GraduationCap, Check } from 'lucide-react';

interface BoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  boards: Board[];
  currentBoardCode: string;
  onSelectBoard: (boardCode: string) => void;
}

export const BoardModal: React.FC<BoardModalProps> = ({
  isOpen,
  onClose,
  boards,
  currentBoardCode,
  onSelectBoard
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-light dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-5 animate-fadeIn">
        
        <div className="flex items-center justify-between pb-3 border-b border-cream-100 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-coral-500/10 text-coral-500 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-neutral-900 dark:text-cream-50">Select State Board & Class</h3>
              <p className="text-xs text-neutral-400">Personalize syllabus, PYQs, and regional language explanations.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-600 dark:hover:text-cream-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {boards.map(b => {
            const isSelected = b.code === currentBoardCode;
            return (
              <div
                key={b.code}
                onClick={() => {
                  onSelectBoard(b.code);
                  onClose();
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-coral-500/10 border-coral-500 font-bold text-coral-600 dark:text-coral-400'
                    : 'bg-cream-50 dark:bg-surface-darkCard border-cream-200 dark:border-neutral-800 text-neutral-800 dark:text-cream-100 hover:border-coral-400'
                }`}
              >
                <div>
                  <div className="text-sm font-bold">{b.name}</div>
                  <div className="text-xs text-neutral-400 mt-0.5">
                    Classes: {b.classes.join(', ')} � Default: {b.defLang}
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-coral-500 text-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
