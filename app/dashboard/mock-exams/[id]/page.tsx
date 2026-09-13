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
  
  // Timer state (seconds)
  const [timeLeft, setTimeLeft] = useState(examData.durationMinutes * 60)
  const [isExamSubmitted, setIsExamSubmitted] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)

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
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/mock-exams">
            <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full border border-cyan-400/20">
                {examData.board} • {examData.classLevel}
              </span>
              <span className="text-[11px] font-bold text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full">
                {examData.subject}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white mt-1">{examData.title}</h1>
          </div>
        </div>

        {/* Live Timer and Submit */}
        {!isExamSubmitted ? (
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-sm border ${
              timeLeft < 300 
                ? 'bg-red-500/10 border-red-500/30 text-red-400 animate-pulse' 
                : 'bg-cyan-400/10 border-cyan-400/30 text-cyan-400'
            }`}>
              <Clock className="w-4 h-4" />
              <span>Time Left: {formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-5 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-midnight-900 font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(0,212,255,0.2)] transition-all cursor-pointer"
            >
              Submit Exam
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20 flex items-center gap-1.5">
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
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative">
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-xl bg-cyan-400/20 text-cyan-300 font-extrabold text-sm border border-cyan-400/30">
                    Q {currentIdx + 1} of {examData.questions.length}
                  </span>
                  <span className="text-xs font-semibold text-gray-400">
                    Chapter: <strong className="text-white">{currentQ.chapter}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="text-green-400 bg-green-500/10 px-2.5 py-1 rounded-lg border border-green-500/20">
                    +{currentQ.marks} Marks
                  </span>
                  {currentQ.negativeMarks > 0 && (
                    <span className="text-red-400 bg-red-500/10 px-2.5 py-1 rounded-lg border border-red-500/20">
                      -{currentQ.negativeMarks} Neg
                    </span>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <div className="mt-6">
                <p className="text-base sm:text-lg font-medium text-white leading-relaxed whitespace-pre-line">
                  {currentQ.question}
                </p>
              </div>

              {/* Options List */}
              <div className="mt-8 space-y-3">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentIdx] === optIdx
                  return (
                    <motion.div
                      key={optIdx}
                      whileHover={{ scale: 1.008 }}
                      whileTap={{ scale: 0.995 }}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                        isSelected
                          ? 'bg-cyan-400/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                        isSelected
                          ? 'bg-cyan-400 text-midnight-900 shadow-md'
                          : 'bg-white/10 text-gray-400'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className="text-sm sm:text-base font-medium leading-normal flex-1">
                        {option}
                      </span>
                    </motion.div>
                  )
                })}
              </div>

              {/* Question Navigation Controls */}
              <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleMarkReview}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      markedForReview[currentIdx]
                        ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    {markedForReview[currentIdx] ? 'Marked for Review' : 'Mark for Review'}
                  </button>
                  {selectedAnswers[currentIdx] !== undefined && (
                    <button
                      onClick={handleClearResponse}
                      className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-red-400 hover:bg-white/10 transition-all font-semibold"
                    >
                      Clear Answer
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevious}
                    disabled={currentIdx === 0}
                    className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous
                  </button>

                  <button
                    onClick={handleSaveAndNext}
                    className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-midnight-900 text-xs font-bold transition-all flex items-center gap-1 shadow-[0_0_10px_rgba(0,212,255,0.2)]"
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
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-6">
              <h3 className="font-bold text-white text-sm tracking-wide">Question Navigation Palette</h3>

              {/* Status Legend */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="w-3.5 h-3.5 rounded-md bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.4)]" />
                  <span>Answered ({Object.keys(selectedAnswers).length})</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="w-3.5 h-3.5 rounded-md bg-purple-500 shadow-[0_0_5px_rgba(168,85,247,0.4)]" />
                  <span>Review ({Object.keys(markedForReview).filter(k => markedForReview[Number(k)]).length})</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="w-3.5 h-3.5 rounded-md bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,0.4)]" />
                  <span>Not Answered ({examData.questions.length - Object.keys(selectedAnswers).length})</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="w-3.5 h-3.5 rounded-md bg-white/10 border border-white/20" />
                  <span>Not Visited</span>
                </div>
              </div>

              {/* Question Number Badges Grid */}
              <div className="pt-4 border-t border-white/10">
                <div className="grid grid-cols-5 gap-2.5">
                  {examData.questions.map((_, idx) => {
                    const status = getQuestionStatus(idx)
                    const isCurrent = currentIdx === idx

                    let badgeStyle = 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                    if (status === 'answered') badgeStyle = 'bg-green-500/20 text-green-400 border border-green-500/40 shadow-[0_0_10px_rgba(34,197,94,0.2)]'
                    else if (status === 'marked_review') badgeStyle = 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    else if (status === 'answered_marked_review') badgeStyle = 'bg-purple-500/30 text-purple-200 border border-purple-400 relative'
                    else if (status === 'not_answered') badgeStyle = 'bg-orange-500/20 text-orange-400 border border-orange-500/30'

                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentIdx(idx)}
                        className={`h-10 rounded-xl font-bold text-xs transition-all flex items-center justify-center relative cursor-pointer ${badgeStyle} ${
                          isCurrent ? 'ring-2 ring-cyan-400 scale-105' : ''
                        }`}
                      >
                        {idx + 1}
                        {status === 'answered_marked_review' && (
                          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-400" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* High Weightage Syllabus Tips */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
                  10-Year Weightage Insights
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {examData.highWeightageTopics.map((topic, i) => (
                    <span key={i} className="text-[10px] font-medium bg-white/5 border border-white/10 text-gray-300 px-2 py-0.5 rounded-md">
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
          <div className="bg-gradient-to-br from-midnight-900 to-cyan-950/40 border border-cyan-400/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-cyan-400/5 blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs font-semibold">
                  <Award className="w-3.5 h-3.5" /> Performance Report
                </div>
                <h2 className="text-3xl font-extrabold text-white">
                  Score: <span className="gradient-text">{results.score}</span> / {results.totalPossibleMarks}
                </h2>
                <p className="text-sm text-gray-400 max-w-lg">
                  {results.percentage >= 75 
                    ? '🎉 Outstanding work! You have strong mastery over the recurring 10-year question patterns for this paper.' 
                    : results.percentage >= 50 
                    ? '👍 Good attempt! Review the missed questions below to target high-weightage mark gains.' 
                    : '📚 Needs revision! Prioritize the high-weightage chapters highlighted in your 10-year analysis.'}
                </p>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center">
                  <div className="text-2xl font-black text-cyan-400">{results.accuracy}%</div>
                  <div className="text-[11px] font-bold text-gray-400 mt-1">Accuracy</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center">
                  <div className="text-2xl font-black text-green-400">{results.correctCount}</div>
                  <div className="text-[11px] font-bold text-gray-400 mt-1">Correct</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center">
                  <div className="text-2xl font-black text-red-400">{results.incorrectCount}</div>
                  <div className="text-[11px] font-bold text-gray-400 mt-1">Incorrect</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center">
                  <div className="text-2xl font-black text-gray-400">{results.unattemptedCount}</div>
                  <div className="text-[11px] font-bold text-gray-400 mt-1">Skipped</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
              <span className="text-xs text-gray-400 font-medium">
                Time taken: <strong className="text-white">{Math.floor(results.timeTaken / 60)}m {results.timeTaken % 60}s</strong>
              </span>
              <div className="flex gap-3">
                <button
                  onClick={handleRetake}
                  className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-xs hover:bg-white/10 transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake Exam
                </button>
                <Link href="/dashboard/mock-exams">
                  <button className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-midnight-900 font-bold text-xs transition-all">
                    More Mock Exams
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Question-by-Question Solution Breakdown */}
          <div className="space-y-6">
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
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
                    className={`bg-white/5 border rounded-3xl p-6 sm:p-7 space-y-4 transition-all ${
                      isCorrect 
                        ? 'border-green-500/30' 
                        : isSkipped 
                        ? 'border-white/10' 
                        : 'border-red-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="font-extrabold text-sm text-white bg-white/10 px-3 py-1 rounded-xl">
                          Question {idx + 1}
                        </span>
                        <span className="text-xs font-semibold text-gray-400">
                          {q.chapter}
                        </span>
                      </div>

                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+{q.marks})
                        </span>
                      ) : isSkipped ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                          Skipped (0)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect (-{q.negativeMarks || 0})
                        </span>
                      )}
                    </div>

                    <p className="text-base font-medium text-white leading-relaxed whitespace-pre-line">
                      {q.question}
                    </p>

                    {/* Options status */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {q.options.map((opt, optIdx) => {
                        const isChosenByStudent = studentAns === optIdx
                        const isActualCorrect = q.correctAnswer === optIdx

                        let optClass = 'bg-white/5 border-white/10 text-gray-400'
                        if (isActualCorrect) {
                          optClass = 'bg-green-500/15 border-green-500/50 text-green-300 font-semibold'
                        } else if (isChosenByStudent && !isActualCorrect) {
                          optClass = 'bg-red-500/15 border-red-500/50 text-red-300 line-through'
                        }

                        return (
                          <div key={optIdx} className={`p-3.5 rounded-xl border text-xs flex items-center gap-3 ${optClass}`}>
                            <span className="w-6 h-6 rounded-lg bg-black/20 flex items-center justify-center font-bold shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="flex-1">{opt}</span>
                            {isActualCorrect && <Check className="w-4 h-4 text-green-400 shrink-0" />}
                          </div>
                        )
                      })}
                    </div>

                    {/* AI Step-by-Step Explanation Box */}
                    <div className="mt-4 p-4 rounded-2xl bg-cyan-400/5 border border-cyan-400/20 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                        <Sparkles className="w-3.5 h-3.5" />
                        AI Step-by-Step Explanation:
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed font-sans whitespace-pre-line">
                        {q.explanation}
                      </p>
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
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-midnight-900 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-xl font-extrabold text-white">Ready to Submit?</h3>
                <p className="text-xs text-gray-400">
                  You cannot modify answers after submitting. Here is your current progress summary:
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10 text-xs">
                <div className="text-gray-400">Answered Questions:</div>
                <div className="text-right font-bold text-green-400">{Object.keys(selectedAnswers).length}</div>
                <div className="text-gray-400">Unanswered Questions:</div>
                <div className="text-right font-bold text-orange-400">{examData.questions.length - Object.keys(selectedAnswers).length}</div>
                <div className="text-gray-400">Marked for Review:</div>
                <div className="text-right font-bold text-purple-400">{Object.keys(markedForReview).filter(k => markedForReview[Number(k)]).length}</div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-semibold text-xs hover:bg-white/10 transition-all cursor-pointer"
                >
                  Continue Test
                </button>
                <button
                  onClick={handleSubmitExam}
                  className="flex-1 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-midnight-900 font-bold text-xs transition-all shadow-[0_0_10px_rgba(0,212,255,0.2)] cursor-pointer"
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
