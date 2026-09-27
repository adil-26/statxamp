'use client';

import React, { useState } from 'react';
import { PYQPaper } from '@/types';
import { Search, BookOpen, Clock, Award, Users, Bookmark, Play, CheckCircle2 } from 'lucide-react';

interface PYQLibraryViewProps {
  papers: PYQPaper[];
  bookmarks: string[];
  onToggleBookmark: (paperId: string) => void;
  onSolvePaper: (paperId: string) => void;
}

export const PYQLibraryView: React.FC<PYQLibraryViewProps> = ({
  papers,
  bookmarks,
  onToggleBookmark,
  onSolvePaper
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<'all' | 'Class 10' | 'Class 12' | 'Competitive'>('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const classLevels = [
    { id: 'all', label: 'All Boards & Classes' },
    { id: 'Class 10', label: 'Class 10 (SSC / 10th)' },
    { id: 'Class 12', label: 'Class 12 (HSC / 12th)' },
    { id: 'Competitive', label: 'Competitive (CET / JEE / NEET)' },
  ];

  const subjects = [
    { id: 'all', label: 'All Subjects' },
    { id: 'mathematics', label: 'Mathematics' },
    { id: 'science', label: 'Science & Tech / Physics / Chem' },
    { id: 'competitive', label: 'Competitive PCM / PCB' },
    { id: 'marathi', label: 'Marathi (कुमारभारती)' },
    { id: 'social', label: 'Social Sciences' },
  ];

  const years = ['all', '2024', '2023', '2022', '2020'];

  const filteredPapers = papers.filter(p => {
    const matchesSearch = searchQuery.trim() === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.highYieldTopics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesClass = selectedClass === 'all' || p.classLevel === selectedClass;
    const matchesSubject = selectedSubject === 'all' || p.subject.toLowerCase().includes(selectedSubject);
    const matchesYear = selectedYear === 'all' || p.year === selectedYear;

    return matchesSearch && matchesClass && matchesSubject && matchesYear;
  });

  return (
    <div className="space-y-7 pb-10">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-cream-50 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-coral-500" />
          Official PYQ Library (20+ Years Solved Papers)
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Explore authentic Maharashtra SSC & HSC, UP Board, CBSE, and Competitive Shift Papers with step-by-step AI solutions.
        </p>
      </div>

      {/* Class 10 & Class 12 Board Switcher Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-cream-100/80 dark:bg-surface-darkCard border border-cream-200 dark:border-surface-darkCard max-w-2xl overflow-x-auto">
        {classLevels.map((lvl) => (
          <button
            key={lvl.id}
            onClick={() => setSelectedClass(lvl.id as any)}
            className={`flex-1 min-w-[130px] sm:min-w-0 py-2 px-3 rounded-xl text-xs font-black transition-all text-center ${
              selectedClass === lvl.id
                ? 'bg-gradient-to-r from-coral-500 to-sunset text-white shadow-sm'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-coral-500'
            }`}
          >
            {lvl.label}
          </button>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers by subject, chapter, or high-yield topic (e.g. Cramer's Rule, Newton, Integrals)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-full bg-surface-light dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard text-sm text-neutral-900 dark:text-cream-50 outline-none focus:border-coral-500 shadow-sm"
          />
        </div>

        {/* Subject Chips & Year Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {subjects.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedSubject(s.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedSubject === s.id
                    ? 'bg-coral-500 text-white shadow-glow-coral'
                    : 'bg-surface-light dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard text-neutral-600 dark:text-neutral-300 hover:border-coral-400'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 self-end sm:self-auto">
            <span className="text-xs text-neutral-400 mr-1 font-semibold">Year:</span>
            {years.map(y => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedYear === y
                    ? 'bg-neutral-900 dark:bg-cream-50 text-white dark:text-neutral-900'
                    : 'bg-cream-100 dark:bg-surface-darkCard text-neutral-500 dark:text-neutral-400'
                }`}
              >
                {y === 'all' ? 'All' : y}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Papers Grid */}
      {filteredPapers.length === 0 ? (
        <div className="text-center py-16 bg-surface-light dark:bg-surface-dark rounded-3xl border border-cream-200 dark:border-surface-darkCard">
          <BookOpen className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-3" />
          <h4 className="text-base font-bold text-neutral-800 dark:text-cream-100">No matching PYQ papers found</h4>
          <p className="text-xs text-neutral-400 mt-1">Try broadening your search query or subject filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPapers.map(paper => {
            const isBookmarked = bookmarks.includes(paper.id);
            return (
              <div
                key={paper.id}
                className="bg-surface-light dark:bg-surface-dark border border-cream-200 dark:border-surface-darkCard rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-coral-500 transition-all hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-0.5 rounded-full bg-coral-500/10 text-coral-500 text-xs font-extrabold">
                      {paper.year} Board Exam
                    </span>
                    <span className="text-xs font-bold text-mint-500 flex items-center gap-1">
                      {paper.solved ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
                      {paper.solved ? 'Solved' : 'Unsolved'}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-neutral-900 dark:text-cream-50 leading-snug">
                    {paper.title}
                  </h4>

                  <div className="flex items-center gap-3 text-xs text-neutral-400 flex-wrap">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {paper.duration}</span>
                    <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5" /> {paper.marks} Marks</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {paper.solvedCount}</span>
                  </div>

                  {/* High Yield Topics */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {paper.highYieldTopics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-cream-100 dark:bg-surface-darkCard text-[11px] text-neutral-600 dark:text-neutral-300"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-cream-100 dark:border-neutral-800 flex items-center gap-2">
                  <button
                    onClick={() => onSolvePaper(paper.id)}
                    className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-coral-500 to-sunset text-white font-bold text-xs shadow-glow-coral flex items-center justify-center gap-2 hover:scale-102 transition-transform"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" /> Solve with AI
                  </button>

                  <button
                    onClick={() => onToggleBookmark(paper.id)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors ${
                      isBookmarked
                        ? 'bg-gold-500/15 border-gold-500 text-gold-500'
                        : 'bg-cream-50 dark:bg-surface-darkCard border-cream-200 dark:border-neutral-800 text-neutral-400 hover:text-gold-500'
                    }`}
                    title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Paper'}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-gold-500' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
