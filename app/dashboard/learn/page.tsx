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
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Concept & Calculation Studio
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Learn by <span className="gradient-text">Subjects & Chapters</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Explore step-by-step animated calculation proofs, interactive formula sandboxes, and AI tests with 3-hint limits.
          </p>
        </div>

        {/* Board & Standard Selector Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Board Selector */}
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-2xl border border-white/10 text-xs">
            <span className="text-gray-400 font-semibold">Board:</span>
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className="bg-transparent text-xs text-cyan-300 font-bold focus:outline-none cursor-pointer"
            >
              {INDIAN_BOARDS_LIST.map(b => (
                <option key={b} value={b} className="bg-midnight-900 text-white font-medium">
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Standard Selector Filter */}
          <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-2xl border border-white/10 text-xs">
            {(['All', 'Class 10', 'Class 12', 'Competitive'] as const).map(std => (
              <button
                key={std}
                onClick={() => setSelectedStandard(std)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                  selectedStandard === std 
                    ? 'bg-cyan-400 text-midnight-900 shadow-md' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {std}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Subject Pills Row */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 border-b border-white/10">
        {['Mathematics', 'Physics', 'Chemistry', 'Biology'].map(subj => (
          <button
            key={subj}
            onClick={() => {
              setSelectedSubject(subj)
              // Select first chapter of that subject if available
              const firstMatch = CHAPTERS_DATABASE.find(c => c.subject.toLowerCase() === subj.toLowerCase())
              if (firstMatch) setActiveChapterId(firstMatch.id)
            }}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 shrink-0 ${
              selectedSubject === subj
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-midnight-900 shadow-[0_0_15px_rgba(0,212,255,0.3)]'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            {subj}
          </button>
        ))}
      </div>

      {/* Mobile Chapter Quick Selector Bar (Shown only on mobile) */}
      <div className="lg:hidden p-4 rounded-2xl bg-gradient-to-r from-white/5 to-cyan-400/10 border border-cyan-400/30 flex items-center justify-between shadow-lg">
        <div className="min-w-0 flex-1 mr-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full">
              {activeChapter.standard}
            </span>
            <span className="text-[10px] font-bold text-green-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {activeChapter.weightageMarks}
            </span>
          </div>
          <h3 className="text-sm font-black text-white truncate">{activeChapter.title}</h3>
        </div>
        <button
          onClick={() => setMobileChapterSheetOpen(true)}
          className="px-3 py-2 rounded-xl bg-cyan-400 text-midnight-950 font-extrabold text-xs shrink-0 flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,212,255,0.4)] active:scale-95 transition-transform cursor-pointer"
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
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="relative w-full max-h-[80vh] bg-midnight-900 border-t border-cyan-400/30 rounded-t-3xl p-5 z-10 flex flex-col shadow-2xl pb-10"
            >
              <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4 shrink-0" />
              <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
                <span className="font-extrabold text-white text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Select {selectedSubject} Chapter ({filteredChapters.length})
                </span>
                <button
                  onClick={() => setMobileChapterSheetOpen(false)}
                  className="p-1 rounded-lg bg-white/5 text-gray-400 hover:text-white"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2.5 overflow-y-auto mt-3 pr-1 flex-1">
                {filteredChapters.map(chap => {
                  const isActive = chap.id === activeChapterId
                  return (
                    <div
                      key={chap.id}
                      onClick={() => {
                        setActiveChapterId(chap.id)
                        setMobileChapterSheetOpen(false)
                      }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-cyan-400/20 border-cyan-400 shadow-[0_0_12px_rgba(0,212,255,0.25)]'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-extrabold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full">
                          {chap.standard}
                        </span>
                        <span className="text-[10px] font-bold text-green-400">
                          {chap.weightageMarks}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-xs">{chap.title}</h4>
                      <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{chap.description}</p>
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
        {/* Left Column: Chapters Navigation List (Visible only on Desktop) */}
        <div className="hidden lg:block lg:col-span-4 bg-white/5 border border-white/10 rounded-3xl p-5 space-y-4 backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> {selectedSubject} Chapters
            </span>
            <span className="text-[11px] text-gray-500 font-semibold">{filteredChapters.length} Chapters</span>
          </div>

          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {filteredChapters.map(chap => {
              const isActive = chap.id === activeChapterId
              return (
                <div
                  key={chap.id}
                  onClick={() => setActiveChapterId(chap.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isActive
                      ? 'bg-cyan-400/15 border-cyan-400 shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full border border-cyan-400/20">
                      {chap.standard}
                    </span>
                    <span className="text-[10px] font-bold text-green-400 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> {chap.weightageMarks}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-white text-sm leading-snug">{chap.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{chap.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Interactive Subject Detail Hub */}
        <div className="lg:col-span-8 space-y-6">
          {/* Chapter Details Banner */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-7 backdrop-blur-xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-cyan-400 bg-cyan-400/10 px-2.5 py-0.5 rounded-full">
                    {activeChapter.subject} • {activeChapter.standard}
                  </span>
                  <span className="text-xs text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full font-semibold">
                    {activeChapter.weightageMarks}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white mt-2">{activeChapter.title}</h2>
                <p className="text-xs text-gray-300 mt-1">{activeChapter.description}</p>
              </div>

              {/* View Tabs Selector */}
              <div className="flex items-center gap-1.5 bg-midnight-900/80 p-1.5 rounded-2xl border border-white/10 text-xs shrink-0">
                <button
                  onClick={() => setActiveViewTab('animation')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                    activeViewTab === 'animation'
                      ? 'bg-cyan-400 text-midnight-900 shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Calculation Steps
                </button>
                <button
                  onClick={() => setActiveViewTab('sandbox')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                    activeViewTab === 'sandbox'
                      ? 'bg-cyan-400 text-midnight-900 shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Interactive Sandbox
                </button>
                <button
                  onClick={() => setActiveViewTab('test')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                    activeViewTab === 'test'
                      ? 'bg-cyan-400 text-midnight-900 shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  AI Test (3 Hints)
                </button>
              </div>
            </div>

            {/* TAB 1: Step-by-Step Animated Calculation Engine */}
            {activeViewTab === 'animation' && (
              <div className="mt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> {activeChapter.animationTopic}
                  </span>
                  
                  {/* Step Control Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        isAutoPlaying
                          ? 'bg-purple-500 text-white animate-pulse'
                          : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white'
                      }`}
                    >
                      <Play className="w-3 h-3 fill-current" />
                      {isAutoPlaying ? 'Pause Auto Step' : 'Auto Play Derivation'}
                    </button>
                    <button
                      onClick={() => setCurrentStepIdx(prev => Math.max(0, prev - 1))}
                      disabled={currentStepIdx === 0}
                      className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-30"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono font-bold text-cyan-400 px-2">
                      {currentStepIdx + 1} / {activeChapter.calculationSteps.length}
                    </span>
                    <button
                      onClick={() => setCurrentStepIdx(prev => Math.min(activeChapter.calculationSteps.length - 1, prev + 1))}
                      disabled={currentStepIdx === activeChapter.calculationSteps.length - 1}
                      className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-30"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Step Progress Tracker */}
                <div className="grid grid-cols-4 gap-2">
                  {activeChapter.calculationSteps.map((step, idx) => (
                    <div
                      key={idx}
                      onClick={() => setCurrentStepIdx(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        idx === currentStepIdx
                          ? 'bg-cyan-400 shadow-[0_0_10px_rgba(0,212,255,0.6)]'
                          : idx < currentStepIdx
                          ? 'bg-green-500'
                          : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>

                {/* Animated Calculation Display Card */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStepIdx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="bg-midnight-900/90 border border-cyan-400/30 rounded-2xl p-6 space-y-4 shadow-xl"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-xs font-black text-cyan-300 bg-cyan-400/10 px-3 py-1 rounded-xl">
                        {activeChapter.calculationSteps[currentStepIdx].title}
                      </span>
                      <span className="text-[11px] text-green-400 font-bold bg-green-500/10 px-2.5 py-0.5 rounded-full">
                        Visual Step Verified
                      </span>
                    </div>

                    {/* Rendered Math Formula */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                      <MathRenderer 
                        content={`$$ ${activeChapter.calculationSteps[currentStepIdx].formula} $$`}
                      />
                    </div>

                    {/* Step Explanation Text */}
                    <p className="text-sm text-gray-200 leading-relaxed font-sans">
                      {activeChapter.calculationSteps[currentStepIdx].explanation}
                    </p>

                    {/* Step Highlight Box */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 bg-cyan-400/5 p-3 rounded-xl border border-cyan-400/15">
                      <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Key Mathematical Logic: <strong>{activeChapter.calculationSteps[currentStepIdx].activeHighlight}</strong></span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Formula Cheat Sheet Overview */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Formula Reference Matrix</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeChapter.formulaOverview.map((f, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                        <span className="text-[11px] font-semibold text-gray-400">{f.name}</span>
                        <MathRenderer content={`$$ ${f.latex} $$`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Interactive Calculation Sandbox */}
            {activeViewTab === 'sandbox' && (
              <div className="mt-6 space-y-6">
                <div className="p-5 rounded-2xl bg-midnight-900/80 border border-cyan-400/20 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-extrabold text-white text-base">Interactive Formula Simulator</h3>
                      <p className="text-xs text-gray-400">Change parameters below to watch mathematical steps compute dynamically.</p>
                    </div>
                    
                    {/* Parameter Options */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-cyan-400 font-bold">{activeChapter.interactiveSandbox.label}:</span>
                      <div className="flex gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                        {activeChapter.interactiveSandbox.options.map(val => (
                          <button
                            key={val}
                            onClick={() => setSandboxValue(val)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              sandboxValue === val
                                ? 'bg-cyan-400 text-midnight-900 shadow-md'
                                : 'text-gray-400 hover:text-white'
                            }`}
                          >
                            {val}{activeChapter.interactiveSandbox.unit}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Computed Step-by-Step Breakdown */}
                  <div className="space-y-3 pt-3 border-t border-white/10">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-semibold">1. Evaluate Trigonometric Values:</span>
                      <MathRenderer content={`$ ${sandboxResult.step1} $`} />
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-semibold">2. Calculate Square of Sine:</span>
                      <MathRenderer content={`$ ${sandboxResult.step2} $`} />
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-semibold">3. Calculate Square of Cosine:</span>
                      <MathRenderer content={`$ ${sandboxResult.step3} $`} />
                    </div>

                    <div className="p-4 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-between">
                      <span className="text-xs text-cyan-300 font-extrabold">Final Verified Sum:</span>
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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-cyan-400/10 border border-cyan-400/30">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-cyan-400" />
                      <h3 className="font-extrabold text-white text-base">
                        Chapter Mastery Assessment
                      </h3>
                      {aiNotice && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 animate-pulse">
                          AI Live Exam
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-300">
                      Solve the 10-year recurring board exam questions below. You have **strictly 3 hints** for this test.
                    </p>
                  </div>

                  {/* Actions & Hints Remaining Badge */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Model Selector Dropdown */}
                    <div className="flex items-center gap-1.5 bg-midnight-900/90 border border-cyan-400/30 rounded-xl px-2.5 py-1.5 shadow-inner">
                      <Brain className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <select
                        value={selectedAiModel}
                        onChange={(e) => setSelectedAiModel(e.target.value)}
                        disabled={isAiGenerating || testSubmitted}
                        className="bg-transparent text-xs text-cyan-300 font-bold focus:outline-none cursor-pointer"
                        title="Select AI Model Engine"
                      >
                        <option value="gemini-3.6-flash" className="bg-midnight-900 text-white">Gemini 3.6 Flash (Fast & Accurate)</option>
                        <option value="gemini-1.5-pro" className="bg-midnight-900 text-white">Gemini 1.5 Pro (Deep Scientific Reasoning)</option>
                        <option value="gemini-1.5-flash" className="bg-midnight-900 text-white">Gemini 1.5 Flash (Lightweight)</option>
                        <option value="gemini-2.0-flash" className="bg-midnight-900 text-white">Gemini 2.0 Flash (Next-Gen)</option>
                      </select>
                    </div>

                    <button
                      onClick={handleGenerateAiQuestions}
                      disabled={isAiGenerating || testSubmitted}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-midnight-900 font-extrabold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all cursor-pointer"
                    >
                      <Sparkles className={`w-3.5 h-3.5 ${isAiGenerating ? 'animate-spin' : ''}`} />
                      {isAiGenerating ? 'Synthesizing with AI...' : 'Generate Questions with AI'}
                    </button>

                    <div className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 border ${
                      hintsRemaining > 1
                        ? 'bg-cyan-400/20 text-cyan-300 border-cyan-400/40 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                        : hintsRemaining === 1
                        ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40 animate-pulse'
                        : 'bg-red-500/20 text-red-300 border-red-500/40'
                    }`}>
                      <Lightbulb className="w-4 h-4" />
                      <span>{hintsRemaining} of 3 Hints Remaining</span>
                    </div>
                  </div>
                </div>

                {/* AI Notice Banner */}
                {aiNotice && (
                  <div className="p-3 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-xs flex items-center justify-between">
                    <span className="flex items-center gap-2 font-medium">
                      <Sparkles className="w-3.5 h-3.5" />
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
                      className="text-[11px] underline text-gray-400 hover:text-white"
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
                    className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-semibold text-center"
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
                        className={`p-6 rounded-3xl border transition-all space-y-4 ${
                          isCorrect
                            ? 'bg-green-500/10 border-green-500/40'
                            : isIncorrect
                            ? 'bg-red-500/10 border-red-500/40'
                            : 'bg-white/5 border-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-xl">
                            Question {idx + 1}
                          </span>

                          {/* Hint Button */}
                          {!testSubmitted && (
                            <button
                              onClick={() => handleRequestHint(q.id)}
                              disabled={isHintRevealed || hintsRemaining <= 0}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                                isHintRevealed
                                  ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                                  : hintsRemaining > 0
                                  ? 'bg-white/5 border border-white/10 text-gray-300 hover:text-cyan-300 hover:bg-cyan-400/10'
                                  : 'opacity-40 cursor-not-allowed bg-white/5 border border-white/10 text-gray-500'
                              }`}
                            >
                              <Lightbulb className="w-3.5 h-3.5" />
                              {isHintRevealed ? 'Hint Active' : `Use Hint (${hintsRemaining} left)`}
                            </button>
                          )}
                        </div>

                        {/* Question Text */}
                        <MathRenderer content={q.question} className="text-base font-semibold text-white" />

                        {/* Revealed Hint Box */}
                        {isHintRevealed && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="p-3.5 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 text-xs space-y-1"
                          >
                            <span className="font-bold flex items-center gap-1.5 text-yellow-300">
                              <Lightbulb className="w-3.5 h-3.5" /> AI Guidance Hint:
                            </span>
                            <MathRenderer content={q.hint} />
                          </motion.div>
                        )}

                        {/* Options Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = studentAns === optIdx
                            const isActual = q.correctAnswer === optIdx

                            let optStyle = 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                            if (testSubmitted) {
                              if (isActual) optStyle = 'bg-green-500/20 border-green-500 text-green-300 font-bold'
                              else if (isSelected && !isActual) optStyle = 'bg-red-500/20 border-red-500 text-red-300 line-through'
                            } else if (isSelected) {
                              optStyle = 'bg-cyan-400/20 border-cyan-400 text-white shadow-[0_0_12px_rgba(0,212,255,0.2)]'
                            }

                            return (
                              <button
                                key={optIdx}
                                type="button"
                                disabled={testSubmitted}
                                onClick={() => setSelectedAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                                className={`p-3.5 rounded-xl border text-xs text-left flex items-center gap-3 transition-all cursor-pointer ${optStyle}`}
                              >
                                <span className="w-6 h-6 rounded-lg bg-black/30 flex items-center justify-center font-bold shrink-0">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <MathRenderer content={opt} className="flex-1" />
                              </button>
                            )
                          })}
                        </div>

                        {/* Explanation after submission */}
                        {testSubmitted && (
                          <div className="mt-3 p-3.5 rounded-xl bg-cyan-400/5 border border-cyan-400/15 space-y-1 text-xs">
                            <span className="font-bold text-cyan-400 block">Explanation:</span>
                            <MathRenderer content={q.explanation} />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Bottom Test Controls */}
                {!testSubmitted ? (
                  <div className="flex justify-end pt-4 border-t border-white/10">
                    <button
                      onClick={() => setTestSubmitted(true)}
                      disabled={Object.keys(selectedAnswers).length === 0}
                      className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-midnight-900 font-extrabold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Submit & Grade Assessment
                    </button>
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-midnight-900/90 border border-cyan-400/40 space-y-4 text-center">
                    <h3 className="text-xl font-extrabold text-white">
                      Your Score: <span className="gradient-text">{scoreReport.score}</span> / {scoreReport.total} ({scoreReport.percentage}%)
                    </h3>
                    <p className="text-xs text-gray-400">
                      Hints Used: {scoreReport.hintsUsed} / 3 • {scoreReport.percentage >= 75 ? '🎉 Great job on this chapter!' : 'Review the steps in the Animation tab to boost your concepts.'}
                    </p>
                    <button
                      onClick={() => {
                        setSelectedAnswers({})
                        setRevealedHints({})
                        setHintsRemaining(3)
                        setTestSubmitted(false)
                      }}
                      className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs inline-flex items-center gap-2 transition-all cursor-pointer"
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
