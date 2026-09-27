'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Sparkles, 
  Play, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Lightbulb, 
  CheckCircle2, 
  XCircle, 
  Calculator, 
  Layers, 
  GraduationCap, 
  Compass, 
  Clock, 
  Award,
  ArrowRight,
  TrendingUp,
  Brain,
  HelpCircle
} from 'lucide-react'
import { MathRenderer } from '@/components/math-renderer'
import Link from 'next/link'
import { CBSE_CHAPTERS_CATALOG, ChapterData, CalculationStep, INDIAN_BOARDS_LIST } from '@/lib/cbse-database'

const CHAPTERS_DATABASE: ChapterData[] = CBSE_CHAPTERS_CATALOG

export default function LearnBySubjectsPage() {
  const [selectedStandard, setSelectedStandard] = useState<'All' | 'Class 10' | 'Class 12' | 'Competitive'>('All')
  const [selectedBoard, setSelectedBoard] = useState<string>('All Boards')
  const [selectedSubject, setSelectedSubject] = useState<string>('Mathematics')
  const [activeChapterId, setActiveChapterId] = useState<string>(CBSE_CHAPTERS_CATALOG[0].id)
  const [activeViewTab, setActiveViewTab] = useState<'animation' | 'sandbox' | 'test'>('animation')
  const [selectedAiModel, setSelectedAiModel] = useState<string>('gemini-3.6-flash')
  const [mobileChapterSheetOpen, setMobileChapterSheetOpen] = useState<boolean>(false)
  const [isSightFocusMode, setIsSightFocusMode] = useState<boolean>(false)

  // Animation Step Player State
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false)

  // Sandbox Parameter State
  const activeChapter = useMemo(() => {
    return CHAPTERS_DATABASE.find(c => c.id === activeChapterId) || CHAPTERS_DATABASE[0]
  }, [activeChapterId])

  const [sandboxValue, setSandboxValue] = useState<number>(activeChapter.interactiveSandbox.defaultParam)

  // Dynamic AI Questions State + 3-HINTS Limit!
  const [currentQuestions, setCurrentQuestions] = useState<Array<{
    id: number
    question: string
    options: string[]
    correctAnswer: number
    hint: string
    explanation: string
  }>>(activeChapter.testQuestions)
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false)
  const [aiNotice, setAiNotice] = useState<string | null>(null)

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [revealedHints, setRevealedHints] = useState<Record<number, boolean>>({})
  const [hintsRemaining, setHintsRemaining] = useState<number>(3)
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false)
  const [hintAlertMsg, setHintAlertMsg] = useState<string | null>(null)

  // Auto-step animation loop
  useEffect(() => {
    let interval: any
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= activeChapter.calculationSteps.length - 1) {
            setIsAutoPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 3500)
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying, activeChapter])

  // Reset states when changing chapter
  useEffect(() => {
    setCurrentStepIdx(0)
    setIsAutoPlaying(false)
    setSandboxValue(activeChapter.interactiveSandbox.defaultParam)
    setCurrentQuestions(activeChapter.testQuestions)
    setSelectedAnswers({})
    setRevealedHints({})
    setHintsRemaining(3)
    setTestSubmitted(false)
    setHintAlertMsg(null)
    setAiNotice(null)
  }, [activeChapterId, activeChapter])

  // Generate fresh questions via Gemini AI Search Engine
  const handleGenerateAiQuestions = async () => {
    try {
      setIsAiGenerating(true)
      setHintAlertMsg(null)
      const res = await fetch('/api/generate-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: `${activeChapter.subject}: ${activeChapter.title}`,
          classLevel: activeChapter.standard === 'Competitive' ? 'Class 12' : activeChapter.standard,
          board: selectedBoard === 'All Boards' ? 'CBSE' : selectedBoard,
          difficulty: 'Medium',
          format: 'MCQ Quiz',
          count: 4,
          model: selectedAiModel
        })
      })

      if (!res.ok) throw new Error('Failed to fetch from AI')
      const data = await res.json()

      if (data.items && Array.isArray(data.items) && data.items.length > 0) {
        const formatted = data.items.map((item: any, idx: number) => ({
          id: idx + 1,
          question: item.question,
          options: item.options || [],
          correctAnswer: typeof item.correctAnswer === 'number' ? item.correctAnswer : 0,
          hint: item.hint || 'Review the step-by-step calculation formulas in the Animation tab.',
          explanation: item.explanation || 'Refer to the textbook standard derivation steps.'
        }))
        setCurrentQuestions(formatted)
        setSelectedAnswers({})
        setRevealedHints({})
        setHintsRemaining(3)
        setTestSubmitted(false)
        setAiNotice(`⚡ Generated fresh exam questions for ${selectedBoard === 'All Boards' ? 'All Boards' : selectedBoard} via AI Engine!`)
      }
    } catch (err) {
      console.error('Error generating AI test:', err)
      setHintAlertMsg('Could not connect to AI generator. Switched to curated board blueprint questions.')
    } finally {
      setIsAiGenerating(false)
    }
  }

  // Filtered chapters
  const filteredChapters = useMemo(() => {
    return CHAPTERS_DATABASE.filter(chap => {
      const matchStd = selectedStandard === 'All' || chap.standard === selectedStandard
      const matchSubj = chap.subject.toLowerCase() === selectedSubject.toLowerCase()
      const matchBoard = selectedBoard === 'All Boards' || !chap.boards || chap.boards.includes('All Boards') || chap.boards.includes(selectedBoard)
      return matchStd && matchSubj && matchBoard
    })
  }, [selectedStandard, selectedSubject, selectedBoard])

  // 3-Hints Request Handler
  const handleRequestHint = (qId: number) => {
    if (revealedHints[qId]) return // Already revealed for this question
    if (hintsRemaining <= 0) {
      setHintAlertMsg('⚠️ You have used all 3 hints allowed for this test! Apply your mastery.')
      setTimeout(() => setHintAlertMsg(null), 3000)
      return
    }

    setRevealedHints(prev => ({ ...prev, [qId]: true }))
    setHintsRemaining(prev => prev - 1)
  }

  // Calculate Test Score
  const scoreReport = useMemo(() => {
    let correct = 0
    currentQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++
      }
    })
    return {
      score: correct,
      total: currentQuestions.length,
      percentage: Math.round((correct / currentQuestions.length) * 100),
      hintsUsed: 3 - hintsRemaining
    }
  }, [currentQuestions, selectedAnswers, hintsRemaining])

  const sandboxResult = useMemo(() => {
    return activeChapter.interactiveSandbox.computeFormula(sandboxValue)
  }, [activeChapter, sandboxValue])

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Interactive Concept & Calculation Studio
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Learn by <span className="text-blue-600">Subjects & Chapters</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Explore step-by-step calculation proofs, interactive formula sandboxes, and chapter mastery assessments.
          </p>
        </div>

        {/* Board & Standard Selector Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Board Selector */}
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs shadow-2xs">
            <span className="text-slate-500 font-semibold">Board:</span>
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className="bg-transparent text-xs text-blue-700 font-bold focus:outline-none cursor-pointer"
            >
              {INDIAN_BOARDS_LIST.map(b => (
                <option key={b} value={b} className="bg-white text-slate-800 font-medium">
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Standard Selector Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            {(['All', 'Class 10', 'Class 12', 'Competitive'] as const).map(std => (
              <button
                key={std}
                onClick={() => setSelectedStandard(std)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  selectedStandard === std 
                    ? 'bg-blue-600 text-white shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {std}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Subject Pills Row */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 border-b border-slate-200">
        {['Mathematics', 'Physics', 'Chemistry', 'Biology'].map(subj => (
          <button
            key={subj}
            onClick={() => {
              setSelectedSubject(subj)
              const firstMatch = CHAPTERS_DATABASE.find(c => c.subject.toLowerCase() === subj.toLowerCase())
              if (firstMatch) setActiveChapterId(firstMatch.id)
            }}
            className={`px-4 py-2 rounded-xl font-semibold text-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              selectedSubject === subj
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            {subj}
          </button>
        ))}
      </div>

      {/* Mobile Chapter Quick Selector Bar (Shown only on mobile) */}
      <div className="lg:hidden p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-xs">
        <div className="min-w-0 flex-1 mr-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/70">
              {activeChapter.standard}
            </span>
            <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {activeChapter.weightageMarks}
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 truncate">{activeChapter.title}</h3>
        </div>
        <button
          onClick={() => setMobileChapterSheetOpen(true)}
          className="px-3 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs shrink-0 flex items-center gap-1.5 shadow-xs active:scale-95 transition-transform cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5" />
          Chapters ({filteredChapters.length})
        </button>
      </div>

      {/* Mobile Chapter Bottom Sheet Modal */}
      <AnimatePresence>
        {mobileChapterSheetOpen && (
          <div className="fixed inset-0 z-50 flex items-end lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileChapterSheetOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="relative w-full max-h-[80vh] bg-white border-t border-slate-200 rounded-t-3xl p-5 z-10 flex flex-col shadow-2xl pb-10"
            >
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4 shrink-0" />
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 shrink-0">
                <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  Select {selectedSubject} Chapter ({filteredChapters.length})
                </span>
                <button
                  onClick={() => setMobileChapterSheetOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 overflow-y-auto mt-3 pr-1 flex-1">
                {filteredChapters.map(chap => {
                  const isActive = chap.id === activeChapterId
                  return (
                    <div
                      key={chap.id}
                      onClick={() => {
                        setActiveChapterId(chap.id)
                        setMobileChapterSheetOpen(false)
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-blue-50 border-blue-400 shadow-2xs'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/70">
                          {chap.standard}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-700">
                          {chap.weightageMarks}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs">{chap.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{chap.description}</p>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Learning Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Chapters Navigation List (Hidden in Sight Focus Mode) */}
        {!isSightFocusMode && (
          <div className="hidden lg:block lg:col-span-4 bg-white border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-600" /> {selectedSubject} Chapters
              </span>
              <span className="text-[11px] text-slate-400 font-semibold">{filteredChapters.length} Chapters</span>
            </div>

            <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
              {filteredChapters.map(chap => {
                const isActive = chap.id === activeChapterId
                return (
                  <div
                    key={chap.id}
                    onClick={() => setActiveChapterId(chap.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                      isActive
                        ? 'bg-blue-50/80 border-blue-400 shadow-2xs'
                        : 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/70">
                        {chap.standard}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> {chap.weightageMarks}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-xs leading-snug">{chap.title}</h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{chap.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Right Column: Interactive Subject Detail Hub */}
        <div className={`${isSightFocusMode ? 'lg:col-span-12' : 'lg:col-span-8'} space-y-6`}>
          {/* Chapter Details Banner */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/70">
                    {activeChapter.subject} • {activeChapter.standard}
                  </span>
                  <span className="text-xs text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full font-semibold border border-purple-200/70">
                    {activeChapter.weightageMarks}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">{activeChapter.title}</h2>
                <p className="text-xs text-slate-600 mt-1">{activeChapter.description}</p>
              </div>

              {/* View Tabs Selector & Sight Focus Toggle */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsSightFocusMode(!isSightFocusMode)}
                  title="Toggle Full-Width Sight Mode (Hides side panels and expands math equations)"
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all text-xs flex items-center gap-1.5 border cursor-pointer ${
                    isSightFocusMode 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs' 
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>{isSightFocusMode ? 'Exit Focus View' : 'Focus Mode'}</span>
                </button>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs shrink-0">
                  <button
                    onClick={() => setActiveViewTab('animation')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      activeViewTab === 'animation'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Calculation Steps
                  </button>
                  <button
                    onClick={() => setActiveViewTab('sandbox')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      activeViewTab === 'sandbox'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Interactive Sandbox
                  </button>
                  <button
                    onClick={() => setActiveViewTab('test')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      activeViewTab === 'test'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    AI Test (3 Hints)
                  </button>
                </div>
              </div>
            </div>

            {/* TAB 1: Step-by-Step Animated Calculation Engine */}
            {activeViewTab === 'animation' && (
              <div className="mt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> {activeChapter.animationTopic}
                  </span>
                  
                  {/* Step Control Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                        isAutoPlaying
                          ? 'bg-blue-600 text-white animate-pulse'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Play className="w-3 h-3 fill-current" />
                      {isAutoPlaying ? 'Pause Auto Step' : 'Auto Play Derivation'}
                    </button>
                    <button
                      onClick={() => setCurrentStepIdx(prev => Math.max(0, prev - 1))}
                      disabled={currentStepIdx === 0}
                      className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-30 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono font-bold text-blue-700 px-2">
                      {currentStepIdx + 1} / {activeChapter.calculationSteps.length}
                    </span>
                    <button
                      onClick={() => setCurrentStepIdx(prev => Math.min(activeChapter.calculationSteps.length - 1, prev + 1))}
                      disabled={currentStepIdx === activeChapter.calculationSteps.length - 1}
                      className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-30 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Rich Derivation Milestone Step Tracker */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {activeChapter.calculationSteps.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentStepIdx(idx)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        idx === currentStepIdx
                          ? 'bg-blue-50 border-blue-400 text-blue-800 shadow-sm ring-1 ring-blue-300'
                          : idx < currentStepIdx
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                        <span>Step {idx + 1}</span>
                        {idx < currentStepIdx && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      </div>
                      <div className="text-xs font-semibold truncate mt-1 text-slate-900">{step.title}</div>
                    </button>
                  ))}
                </div>

                {/* Animated Calculation Display Card with Sight Comfort Sizing */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStepIdx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-5 shadow-card"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-xs sm:text-sm font-bold text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-xl border border-blue-200/70">
                        {activeChapter.calculationSteps[currentStepIdx].title}
                      </span>
                      <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        Step Verified
                      </span>
                    </div>

                    {/* Rendered Math Formula with Sight Sizing */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                      <MathRenderer 
                        content={`$$ ${activeChapter.calculationSteps[currentStepIdx].formula} $$`}
                        textSize={isSightFocusMode ? 'large' : 'comfortable'}
                      />
                    </div>

                    {/* Step Explanation Text */}
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                      {activeChapter.calculationSteps[currentStepIdx].explanation}
                    </p>

                    {/* Step Highlight Box */}
                    <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-amber-900 bg-amber-50/80 p-3.5 rounded-xl border border-amber-200/70">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Key Mathematical Logic: <strong className="text-slate-900 font-bold">{activeChapter.calculationSteps[currentStepIdx].activeHighlight}</strong></span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Formula Cheat Sheet Overview */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Formula Reference Matrix</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeChapter.formulaOverview.map((f, i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1.5 hover:border-blue-300 transition-all">
                        <span className="text-[11px] font-bold text-blue-700">{f.name}</span>
                        <MathRenderer 
                          content={`$$ ${f.latex} $$`} 
                          textSize={isSightFocusMode ? 'comfortable' : 'normal'}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Interactive Calculation Sandbox */}
            {activeViewTab === 'sandbox' && (
              <div className="mt-6 space-y-6">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-4 shadow-card">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">Interactive Formula Simulator</h3>
                      <p className="text-xs text-slate-500">Change parameters below to watch mathematical steps compute dynamically.</p>
                    </div>
                    
                    {/* Parameter Options */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-700 font-semibold">{activeChapter.interactiveSandbox.label}:</span>
                      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                        {activeChapter.interactiveSandbox.options.map(val => (
                          <button
                            key={val}
                            onClick={() => setSandboxValue(val)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              sandboxValue === val
                                ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {val}{activeChapter.interactiveSandbox.unit}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Computed Step-by-Step Breakdown */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <span className="text-xs text-slate-600 font-medium">1. Evaluate Trigonometric Values:</span>
                      <MathRenderer content={`$ ${sandboxResult.step1} $`} />
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <span className="text-xs text-slate-600 font-medium">2. Calculate Square of Sine:</span>
                      <MathRenderer content={`$ ${sandboxResult.step2} $`} />
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <span className="text-xs text-slate-600 font-medium">3. Calculate Square of Cosine:</span>
                      <MathRenderer content={`$ ${sandboxResult.step3} $`} />
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                      <span className="text-xs text-blue-900 font-bold">Final Verified Sum:</span>
                      <MathRenderer content={`$ ${sandboxResult.result} $`} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Chapter AI Test with 3-HINTS Limit! */}
            {activeViewTab === 'test' && (
              <div className="mt-6 space-y-6">
                {/* 3 Hints Counter & AI Generator Status Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-slate-900 text-base">
                        Chapter Mastery Assessment
                      </h3>
                      {aiNotice && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200">
                          AI Live Exam
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600">
                      Solve the 10-year recurring board exam questions below. You have <strong>strictly 3 hints</strong> for this test.
                    </p>
                  </div>

                  {/* Actions & Hints Remaining Badge */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Model Selector Dropdown */}
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 shadow-sm">
                      <Brain className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <select
                        value={selectedAiModel}
                        onChange={(e) => setSelectedAiModel(e.target.value)}
                        disabled={isAiGenerating || testSubmitted}
                        className="bg-transparent text-xs text-slate-800 font-semibold focus:outline-none cursor-pointer"
                        title="Select AI Model Engine"
                      >
                        <option value="gemini-3.6-flash">Gemini 3.6 Flash (Fast & Accurate)</option>
                        <option value="gemini-1.5-pro">Gemini 1.5 Pro (Deep Scientific Reasoning)</option>
                        <option value="gemini-1.5-flash">Gemini 1.5 Flash (Lightweight)</option>
                        <option value="gemini-2.0-flash">Gemini 2.0 Flash (Next-Gen)</option>
                      </select>
                    </div>

                    <button
                      onClick={handleGenerateAiQuestions}
                      disabled={isAiGenerating || testSubmitted}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                    >
                      <Sparkles className={`w-3.5 h-3.5 ${isAiGenerating ? 'animate-spin' : ''}`} />
                      {isAiGenerating ? 'Synthesizing with AI...' : 'Generate Questions with AI'}
                    </button>

                    <div className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 border ${
                      hintsRemaining > 1
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : hintsRemaining === 1
                        ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <span>{hintsRemaining} of 3 Hints Remaining</span>
                    </div>
                  </div>
                </div>

                {/* AI Notice Banner */}
                {aiNotice && (
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs flex items-center justify-between">
                    <span className="flex items-center gap-2 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      {aiNotice}
                    </span>
                    <button
                      onClick={() => {
                        setCurrentQuestions(activeChapter.testQuestions)
                        setSelectedAnswers({})
                        setRevealedHints({})
                        setHintsRemaining(3)
                        setTestSubmitted(false)
                        setAiNotice(null)
                      }}
                      className="text-[11px] underline text-slate-500 hover:text-slate-900"
                    >
                      Reset to Standard 10-Yr Blueprint
                    </button>
                  </div>
                )}

                {/* Alert Toast if out of hints */}
                {hintAlertMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold text-center"
                  >
                    {hintAlertMsg}
                  </motion.div>
                )}

                {/* Question List */}
                <div className="space-y-6">
                  {currentQuestions.map((q, idx) => {
                    const isHintRevealed = revealedHints[q.id]
                    const studentAns = selectedAnswers[q.id]
                    const isCorrect = testSubmitted && studentAns === q.correctAnswer
                    const isIncorrect = testSubmitted && studentAns !== undefined && studentAns !== q.correctAnswer

                    return (
                      <div
                        key={q.id}
                        className={`p-6 rounded-2xl border transition-all space-y-4 shadow-card ${
                          isCorrect
                            ? 'bg-emerald-50/40 border-emerald-300'
                            : isIncorrect
                            ? 'bg-rose-50/40 border-rose-300'
                            : 'bg-white border-slate-200/90'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200/60">
                            Question {idx + 1}
                          </span>

                          {/* Hint Button */}
                          {!testSubmitted && (
                            <button
                              onClick={() => handleRequestHint(q.id)}
                              disabled={isHintRevealed || hintsRemaining <= 0}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                                isHintRevealed
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : hintsRemaining > 0
                                  ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                                  : 'opacity-40 cursor-not-allowed bg-slate-100 border border-slate-200 text-slate-400'
                              }`}
                            >
                              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                              {isHintRevealed ? 'Hint Active' : `Use Hint (${hintsRemaining} left)`}
                            </button>
                          )}
                        </div>

                        {/* Question Text */}
                        <div className="text-base font-semibold text-slate-900">
                          <MathRenderer content={q.question} />
                        </div>

                        {/* Revealed Hint Box */}
                        {isHintRevealed && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1"
                          >
                            <span className="font-bold flex items-center gap-1.5 text-amber-900">
                              <Lightbulb className="w-3.5 h-3.5 text-amber-600" /> AI Guidance Hint:
                            </span>
                            <MathRenderer content={q.hint} />
                          </motion.div>
                        )}

                        {/* Options Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = studentAns === optIdx
                            const isActual = q.correctAnswer === optIdx

                            let optStyle = 'bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                            if (testSubmitted) {
                              if (isActual) optStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold'
                              else if (isSelected && !isActual) optStyle = 'bg-rose-50 border-rose-300 text-rose-800 line-through'
                            } else if (isSelected) {
                              optStyle = 'bg-blue-50 border-blue-400 text-blue-900 font-medium ring-1 ring-blue-300'
                            }

                            return (
                              <button
                                key={optIdx}
                                type="button"
                                disabled={testSubmitted}
                                onClick={() => setSelectedAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                                className={`p-4 rounded-xl border text-xs sm:text-sm text-left flex items-center gap-3 transition-all cursor-pointer ${optStyle}`}
                              >
                                <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                                  isSelected 
                                    ? 'bg-blue-600 text-white shadow-sm' 
                                    : 'bg-slate-200/80 text-slate-700'
                                }`}>
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <MathRenderer content={opt} className="flex-1" textSize="comfortable" />
                              </button>
                            )
                          })}
                        </div>

                        {/* Explanation after submission */}
                        {testSubmitted && (
                          <div className="mt-3 p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-1 text-xs text-slate-800">
                            <span className="font-bold text-blue-800 block">Explanation:</span>
                            <MathRenderer content={q.explanation} />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Bottom Test Controls */}
                {!testSubmitted ? (
                  <div className="flex justify-end pt-4 border-t border-slate-200">
                    <button
                      onClick={() => setTestSubmitted(true)}
                      disabled={Object.keys(selectedAnswers).length === 0}
                      className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Submit & Grade Assessment
                    </button>
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-card space-y-4 text-center">
                    <h3 className="text-xl font-bold text-slate-900">
                      Your Score: <span className="text-blue-600 font-extrabold">{scoreReport.score}</span> / {scoreReport.total} ({scoreReport.percentage}%)
                    </h3>
                    <p className="text-xs text-slate-600">
                      Hints Used: {scoreReport.hintsUsed} / 3 • {scoreReport.percentage >= 75 ? '🎉 Great job on this chapter!' : 'Review the steps in the Animation tab to boost your concepts.'}
                    </p>
                    <button
                      onClick={() => {
                        setSelectedAnswers({})
                        setRevealedHints({})
                        setHintsRemaining(3)
                        setTestSubmitted(false)
                      }}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-800 font-semibold text-xs inline-flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Retake Chapter Test
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
