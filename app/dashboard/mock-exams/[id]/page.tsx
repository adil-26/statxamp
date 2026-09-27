'use client'

import { useState, useEffect, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowLeft, 
  ArrowRight, 
  Bookmark, 
  Award, 
  Sparkles, 
  Check, 
  HelpCircle,
  BarChart2,
  FileText
} from 'lucide-react'
import Link from 'next/link'
import { MOCK_EXAMS_DATABASE, MockExam, ExamQuestion } from '@/lib/exam-data'
import { MathRenderer } from '@/components/math-renderer'

type QuestionStatus = 'not_visited' | 'not_answered' | 'answered' | 'marked_review' | 'answered_marked_review'

export default function ExamRoomPage() {
  const params = useParams()
  const router = useRouter()
  const examId = (params?.id as string) || 'cbse-12-physics-2024'

  const [customExam, setCustomExam] = useState<MockExam | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && examId === 'custom') {
      const saved = sessionStorage.getItem('statxam_custom_exam')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (parsed && parsed.questions && parsed.questions.length > 0) {
            setCustomExam(parsed)
            setTimeLeft(parsed.durationMinutes * 60)
          }
        } catch (e) {
          console.error('Failed to parse custom exam', e)
        }
      }
    }
  }, [examId])

  // Load exam data or fallback to default
  const defaultExamData: MockExam = useMemo(() => {
    return MOCK_EXAMS_DATABASE[examId] || MOCK_EXAMS_DATABASE['cbse-12-physics-2024']
  }, [examId])

  const examData: MockExam = customExam || defaultExamData

  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({})
  const [visitedQuestions, setVisitedQuestions] = useState<Record<number, boolean>>({ 0: true })
  const [sightScale, setSightScale] = useState<'normal' | 'comfortable' | 'large'>('normal')
  
  // Timer state (seconds)
  const [timeLeft, setTimeLeft] = useState(examData.durationMinutes * 60)
  const [isExamSubmitted, setIsExamSubmitted] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  // Keyboard shortcut answering listener
  useEffect(() => {
    if (isExamSubmitted || showSubmitModal) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return

      const key = e.key.toUpperCase()
      const currentOptions = examData.questions[currentIdx]?.options || []

      if (['A', 'B', 'C', 'D'].includes(key)) {
        const idx = key.charCodeAt(0) - 65
        if (idx < currentOptions.length) {
          handleSelectOption(idx)
        }
      } else if (['1', '2', '3', '4'].includes(key)) {
        const idx = parseInt(key) - 1
        if (idx < currentOptions.length) {
          handleSelectOption(idx)
        }
      } else if (e.key === 'Enter') {
        handleSaveAndNext()
      } else if (e.key === 'ArrowRight') {
        handleSaveAndNext()
      } else if (e.key === 'ArrowLeft') {
        handlePrevious()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isExamSubmitted, showSubmitModal, currentIdx, examData])

  // Countdown timer effect
  useEffect(() => {
    if (isExamSubmitted) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmitExam()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [isExamSubmitted])

  // Track visited questions
  useEffect(() => {
    setVisitedQuestions((prev) => ({ ...prev, [currentIdx]: true }))
  }, [currentIdx])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const currentQ: ExamQuestion = examData.questions[currentIdx] || examData.questions[0]

  const handleSelectOption = (optIdx: number) => {
    if (isExamSubmitted) return
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIdx]: optIdx
    }))
  }

  const handleClearResponse = () => {
    setSelectedAnswers((prev) => {
      const updated = { ...prev }
      delete updated[currentIdx]
      return updated
    })
  }

  const handleToggleMarkReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentIdx]: !prev[currentIdx]
    }))
  }

  const handleSaveAndNext = () => {
    if (currentIdx < examData.questions.length - 1) {
      setCurrentIdx((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1)
    }
  }

  const handleSubmitExam = () => {
    setShowSubmitModal(false)
    setIsExamSubmitted(true)
  }

  // Calculate question status for palette
  const getQuestionStatus = (idx: number): QuestionStatus => {
    const isAnswered = selectedAnswers[idx] !== undefined
    const isMarked = markedForReview[idx]
    const isVisited = visitedQuestions[idx]

    if (isAnswered && isMarked) return 'answered_marked_review'
    if (isMarked) return 'marked_review'
    if (isAnswered) return 'answered'
    if (isVisited) return 'not_answered'
    return 'not_visited'
  }

  // Calculate Final Results
  const results = useMemo(() => {
    let score = 0
    let correctCount = 0
    let incorrectCount = 0
    let unattemptedCount = 0

    examData.questions.forEach((q, idx) => {
      const answer = selectedAnswers[idx]
      if (answer === undefined) {
        unattemptedCount++
      } else if (answer === q.correctAnswer) {
        correctCount++
        score += q.marks
      } else {
        incorrectCount++
        score -= (q.negativeMarks || 0)
      }
    })

    const totalPossibleMarks = examData.questions.reduce((acc, q) => acc + q.marks, 0)
    const accuracy = correctCount + incorrectCount > 0 
      ? Math.round((correctCount / (correctCount + incorrectCount)) * 100) 
      : 0
    const percentage = Math.round((Math.max(0, score) / totalPossibleMarks) * 100)
    const timeTaken = (examData.durationMinutes * 60) - timeLeft

    return {
      score: Math.max(0, score),
      totalPossibleMarks,
      correctCount,
      incorrectCount,
      unattemptedCount,
      accuracy,
      percentage,
      timeTaken
    }
  }, [examData, selectedAnswers, isExamSubmitted, timeLeft])

  // Retake exam reset
  const handleRetake = () => {
    setSelectedAnswers({})
    setMarkedForReview({})
    setVisitedQuestions({ 0: true })
    setCurrentIdx(0)
    setTimeLeft(examData.durationMinutes * 60)
    setIsExamSubmitted(false)
  }

  return (
    <div className="space-y-6">
      {/* Top Header Bar for Exam Room */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/mock-exams">
            <button className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 transition-all cursor-pointer">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/70">
                {examData.board} • {examData.classLevel}
              </span>
              <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200/70">
                {examData.subject}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">{examData.title}</h1>
          </div>
        </div>

        {/* Live Timer, Sight Zoom, and Submit */}
        {!isExamSubmitted ? (
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Sight Zoom Controls */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <span className="text-[10px] text-slate-500 font-bold px-1.5 uppercase">Sight:</span>
              {(['normal', 'comfortable', 'large'] as const).map((scale) => (
                <button
                  key={scale}
                  onClick={() => setSightScale(scale)}
                  title={`Adjust text size (${scale})`}
                  className={`px-2 py-0.5 rounded-lg font-bold transition-all text-xs cursor-pointer ${
                    sightScale === scale 
                      ? 'bg-blue-600 text-white shadow-2xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {scale === 'normal' ? 'A' : scale === 'comfortable' ? 'A+' : 'A++'}
                </button>
              ))}
            </div>

            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono font-bold text-sm border ${
              timeLeft < 300 
                ? 'bg-red-50 border-red-200 text-red-700 animate-pulse' 
                : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}>
              <Clock className="w-4 h-4" />
              <span>Time: {formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Submit Exam
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Exam Completed & Graded
            </span>
          </div>
        )}
      </div>

      {/* Main Content: Testing Console vs Scorecard */}
      {!isExamSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Active Question Workspace */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs relative">
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-xl bg-blue-50 text-blue-700 font-bold text-sm border border-blue-200/80">
                    Question {currentIdx + 1} of {examData.questions.length}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    Chapter: <strong className="text-slate-800">{currentQ.chapter}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="text-xs text-slate-400 font-mono hidden md:inline bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                    Keys: A-D or 1-4
                  </span>
                  <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    +{currentQ.marks} Marks
                  </span>
                  {currentQ.negativeMarks > 0 && (
                    <span className="text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                      -{currentQ.negativeMarks} Neg
                    </span>
                  )}
                </div>
              </div>

              {/* Question Text with Sight Sizing */}
              <div className="mt-6">
                <MathRenderer 
                  content={currentQ.question} 
                  textSize={sightScale}
                  className="font-medium text-slate-900 leading-relaxed" 
                />
              </div>

              {/* Options List with Keyboard Indicators */}
              <div className="mt-8 space-y-3">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentIdx] === optIdx
                  return (
                    <motion.div
                      key={optIdx}
                      whileHover={{ scale: 1.004 }}
                      whileTap={{ scale: 0.995 }}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${
                        isSelected
                          ? 'bg-blue-50/90 border-blue-500 text-slate-900 shadow-xs ring-1 ring-blue-500/30'
                          : 'bg-slate-50/70 border-slate-200/90 text-slate-800 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <MathRenderer content={option} textSize={sightScale} className="font-medium leading-normal flex-1 text-slate-800" />
                      <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">[{String.fromCharCode(65 + optIdx)}]</span>
                    </motion.div>
                  )
                })}
              </div>

              {/* Question Navigation Controls */}
              <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleMarkReview}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      markedForReview[currentIdx]
                        ? 'bg-purple-50 border-purple-300 text-purple-700'
                        : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    {markedForReview[currentIdx] ? 'Marked for Review' : 'Mark for Review'}
                  </button>
                  {selectedAnswers[currentIdx] !== undefined && (
                    <button
                      onClick={handleClearResponse}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 hover:text-rose-600 hover:bg-slate-200/70 transition-all font-semibold cursor-pointer"
                    >
                      Clear Answer
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevious}
                    disabled={currentIdx === 0}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-200/70 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous
                  </button>

                  <button
                    onClick={handleSaveAndNext}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    {currentIdx === examData.questions.length - 1 ? 'Save & Review' : 'Save & Next'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Question Palette Console */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5">
              <h3 className="font-bold text-slate-900 text-sm tracking-wide">Question Navigation Palette</h3>

              {/* Status Legend */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="w-4 h-4 rounded-md bg-emerald-50 border border-emerald-300 text-emerald-700 flex items-center justify-center font-bold text-[10px]">
                    ✓
                  </span>
                  <span>Answered ({Object.keys(selectedAnswers).length})</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="w-4 h-4 rounded-md bg-purple-50 border border-purple-300 text-purple-700 flex items-center justify-center font-bold text-[10px]">
                    ★
                  </span>
                  <span>Review ({Object.keys(markedForReview).filter(k => markedForReview[Number(k)]).length})</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="w-4 h-4 rounded-md bg-amber-50 border border-amber-300 text-amber-700 flex items-center justify-center font-bold text-[10px]">
                    !
                  </span>
                  <span>Skipped ({examData.questions.length - Object.keys(selectedAnswers).length})</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="w-4 h-4 rounded-md bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center font-bold text-[10px]">
                    ○
                  </span>
                  <span>Not Visited</span>
                </div>
              </div>

              {/* Question Number Badges Grid */}
              <div className="pt-4 border-t border-slate-200">
                <div className="grid grid-cols-5 gap-2">
                  {examData.questions.map((_, idx) => {
                    const status = getQuestionStatus(idx)
                    const isCurrent = currentIdx === idx

                    let badgeStyle = 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200/70'
                    if (status === 'answered') badgeStyle = 'bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold'
                    else if (status === 'marked_review') badgeStyle = 'bg-purple-50 text-purple-700 border border-purple-300 font-bold'
                    else if (status === 'answered_marked_review') badgeStyle = 'bg-purple-100 text-purple-800 border border-purple-400 font-bold relative'
                    else if (status === 'not_answered') badgeStyle = 'bg-amber-50 text-amber-700 border border-amber-300 font-bold'

                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentIdx(idx)}
                        className={`h-9 rounded-xl font-bold text-xs transition-all flex items-center justify-center relative cursor-pointer ${badgeStyle} ${
                          isCurrent ? 'ring-2 ring-blue-600 scale-105' : ''
                        }`}
                      >
                        {idx + 1}
                        {status === 'answered_marked_review' && (
                          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* High Weightage Syllabus Tips */}
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  10-Year Weightage Insights
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {examData.highWeightageTopics.map((topic, i) => (
                    <span key={i} className="text-[10px] font-medium bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Post-Exam Scorecard & Comprehensive Solution Review */
        <div className="space-y-8">
          {/* Result Highlights Banner */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                  <Award className="w-3.5 h-3.5" /> Performance Report
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  Score: <span className="text-blue-600">{results.score}</span> / {results.totalPossibleMarks}
                </h2>
                <p className="text-sm text-slate-600 max-w-lg">
                  {results.percentage >= 75 
                    ? '🎉 Outstanding work! You have strong mastery over the recurring 10-year question patterns for this paper.' 
                    : results.percentage >= 50 
                    ? '👍 Good attempt! Review the missed questions below to target high-weightage mark gains.' 
                    : '📚 Needs revision! Prioritize the high-weightage chapters highlighted in your 10-year analysis.'}
                </p>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
                <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl text-center">
                  <div className="text-2xl font-black text-blue-600">{results.accuracy}%</div>
                  <div className="text-[11px] font-semibold text-slate-500 mt-1">Accuracy</div>
                </div>
                <div className="bg-emerald-50/60 border border-emerald-200/80 p-4 rounded-xl text-center">
                  <div className="text-2xl font-black text-emerald-700">{results.correctCount}</div>
                  <div className="text-[11px] font-semibold text-emerald-600 mt-1">Correct</div>
                </div>
                <div className="bg-rose-50/60 border border-rose-200/80 p-4 rounded-xl text-center">
                  <div className="text-2xl font-black text-rose-700">{results.incorrectCount}</div>
                  <div className="text-[11px] font-semibold text-rose-600 mt-1">Incorrect</div>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl text-center">
                  <div className="text-2xl font-black text-slate-600">{results.unattemptedCount}</div>
                  <div className="text-[11px] font-semibold text-slate-500 mt-1">Skipped</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap gap-4 items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Time taken: <strong className="text-slate-900">{Math.floor(results.timeTaken / 60)}m {results.timeTaken % 60}s</strong>
              </span>
              <div className="flex gap-3">
                <button
                  onClick={handleRetake}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-200/70 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake Exam
                </button>
                <Link href="/dashboard/mock-exams">
                  <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-xs cursor-pointer">
                    More Mock Exams
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Question-by-Question Solution Breakdown */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Detailed Solutions & Explanations
            </h3>

            <div className="space-y-6">
              {examData.questions.map((q, idx) => {
                const studentAns = selectedAnswers[idx]
                const isCorrect = studentAns === q.correctAnswer
                const isSkipped = studentAns === undefined

                return (
                  <div
                    key={q.id}
                    className={`bg-white border rounded-2xl p-6 sm:p-7 space-y-4 shadow-xs transition-all ${
                      isCorrect 
                        ? 'border-emerald-200 bg-emerald-50/10' 
                        : isSkipped 
                        ? 'border-slate-200' 
                        : 'border-rose-200 bg-rose-50/10'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded-xl">
                          Question {idx + 1}
                        </span>
                        <span className="text-xs font-medium text-slate-500">
                          {q.chapter}
                        </span>
                      </div>

                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+{q.marks})
                        </span>
                      ) : isSkipped ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                          Skipped (0)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect (-{q.negativeMarks || 0})
                        </span>
                      )}
                    </div>

                    <p className="text-base font-medium text-slate-900 leading-relaxed whitespace-pre-line">
                      {q.question}
                    </p>

                    {/* Options status */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {q.options.map((opt, optIdx) => {
                        const isChosenByStudent = studentAns === optIdx
                        const isActualCorrect = q.correctAnswer === optIdx

                        let optClass = 'bg-slate-50 border-slate-200 text-slate-600'
                        if (isActualCorrect) {
                          optClass = 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold'
                        } else if (isChosenByStudent && !isActualCorrect) {
                          optClass = 'bg-rose-50 border-rose-300 text-rose-800 line-through'
                        }

                        return (
                          <div key={optIdx} className={`p-3.5 rounded-xl border text-xs flex items-center gap-3 ${optClass}`}>
                            <span className="w-6 h-6 rounded-lg bg-black/5 flex items-center justify-center font-bold shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="flex-1">{opt}</span>
                            {isActualCorrect && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                          </div>
                        )
                      })}
                    </div>

                    {/* AI Step-by-Step Explanation Box */}
                    <div className="mt-4 p-4 rounded-xl bg-blue-50/60 border border-blue-200/70 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
                        <Sparkles className="w-3.5 h-3.5" />
                        Step-by-Step Explanation:
                      </div>
                      <MathRenderer content={q.explanation} className="text-xs text-slate-700 leading-relaxed font-sans" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      <AnimatePresence>
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Ready to Submit?</h3>
                <p className="text-xs text-slate-500">
                  You cannot modify answers after submitting. Here is your current progress summary:
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-200 text-xs">
                <div className="text-slate-500">Answered Questions:</div>
                <div className="text-right font-bold text-emerald-600">{Object.keys(selectedAnswers).length}</div>
                <div className="text-slate-500">Unanswered Questions:</div>
                <div className="text-right font-bold text-amber-600">{examData.questions.length - Object.keys(selectedAnswers).length}</div>
                <div className="text-slate-500">Marked for Review:</div>
                <div className="text-right font-bold text-purple-600">{Object.keys(markedForReview).filter(k => markedForReview[Number(k)]).length}</div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-200/70 transition-all cursor-pointer"
                >
                  Continue Test
                </button>
                <button
                  onClick={handleSubmitExam}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-xs cursor-pointer"
                >
                  Confirm & Submit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
