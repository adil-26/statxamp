'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Brain, Download, Copy, Play, CheckCircle2, RefreshCw, ArrowRight, BookOpen, Lightbulb, Info } from 'lucide-react'
import Link from 'next/link'
import { MathRenderer } from '@/components/math-renderer'

export default function AIGeneratorPage() {
  const router = useRouter()
  const [topic, setTopic] = useState('')
  const [classVal, setClassVal] = useState('Class 12')
  const [board, setBoard] = useState('CBSE')
  const [format, setFormat] = useState('MCQ Quiz') // 'MCQ Quiz', 'Formula Sheet', 'Detailed Summary'
  const [difficulty, setDifficulty] = useState('Medium')
  const [aiModel, setAiModel] = useState('gemini-3.6-flash')
  
  const [loading, setLoading] = useState(false)
  const [generatedOutput, setGeneratedOutput] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  const quickTopics = [
    'Electrostatics & Gauss Law',
    'Ray & Wave Optics',
    'Calculus & Integrals',
    'Thermodynamics',
    'Organic Aldehydes & Ketones',
    'Life Processes & Nutrition'
  ]

  const handleGenerate = async () => {
    if (!topic.trim()) return
    setLoading(true)
    setGeneratedOutput(null)

    try {
      const res = await fetch('/api/generate-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.trim(),
          classLevel: classVal,
          board: board,
          format: format,
          difficulty: difficulty,
          count: 5,
          model: aiModel
        })
      })

      if (!res.ok) {
        throw new Error('Failed to generate study material')
      }

      const data = await res.json()
      setGeneratedOutput(data)
    } catch (err: any) {
      console.error('Error generating study material:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLaunchExam = () => {
    if (!generatedOutput || !generatedOutput.items) return

    const customExamData = {
      id: 'custom',
      title: generatedOutput.title || `${topic} Practice Test`,
      type: 'Practice Test',
      classLevel: classVal,
      board: board,
      subject: topic,
      durationMinutes: Math.max(15, generatedOutput.items.length * 3),
      totalMarks: generatedOutput.items.reduce((acc: number, q: any) => acc + (q.marks || 1), 0),
      questionsCount: generatedOutput.items.length,
      dateBadge: 'AI Generated',
      description: `Dynamic syllabus mock test generated for ${topic} based on ${board} ${classVal} blueprints.`,
      highWeightageTopics: [topic],
      questions: generatedOutput.items.map((item: any, idx: number) => ({
        id: item.id || idx + 1,
        question: item.question || item.q,
        options: item.options || item.o,
        correctAnswer: item.correctAnswer !== undefined ? item.correctAnswer : (item.a || 0),
        explanation: item.explanation || 'Detailed AI step-by-step solution.',
        chapter: item.chapter || topic,
        marks: item.marks || 1,
        negativeMarks: item.negativeMarks || 0,
        type: item.type || 'MCQ'
      }))
    }

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('statxam_custom_exam', JSON.stringify(customExamData))
    }
    router.push('/dashboard/mock-exams/custom')
  }

  const handleCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(JSON.stringify(generatedOutput, null, 2))
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden">
      {/* Background soft tint */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-50/50 blur-3xl pointer-events-none" />
      
      {/* Header navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md py-4 px-6 border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
              S
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Stat<span className="text-blue-600">Xam</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/mock-exams" className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-2 hover:bg-slate-50 text-xs shadow-xs transition-colors">
              <Play className="w-3.5 h-3.5 text-blue-600 fill-current" /> Mock Exams
            </Link>
            <Link href="/dashboard" className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 text-xs shadow-sm transition-colors">
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Form container */}
      <section className="pt-28 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Side: Generator Controls */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 p-6 sm:p-7 rounded-2xl shadow-card flex flex-col justify-between space-y-6 h-fit">
          <div>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 rounded-full w-fit">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Gemini AI Syllabus Engine
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-3">AI Study Material Generator</h1>
            <p className="text-xs text-slate-500 mt-1">Generate 10-year weightage quizzes, revision formula sheets, and study notes.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-600 font-bold block mb-1.5">Topic or Chapter Name</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Electrostatics, Optics, Calculus, Aldehydes..."
                className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 text-slate-900 font-medium placeholder-slate-400"
              />

              {/* Quick Topic Chips */}
              <div className="mt-2.5">
                <span className="text-[10px] text-slate-500 block mb-1 font-semibold">Quick High-Yield Topics:</span>
                <div className="flex flex-wrap gap-1.5">
                  {quickTopics.map((t, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTopic(t)}
                      className="text-[10px] bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 text-slate-700 px-2 py-1 rounded-lg border border-slate-200 transition-all cursor-pointer font-medium"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-xs text-slate-600 font-bold block mb-1.5">Target Class / Level</label>
                <select 
                  value={classVal} 
                  onChange={(e) => setClassVal(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-400"
                >
                  <option>Class 12</option>
                  <option>Class 10</option>
                  <option>Class 11</option>
                  <option>JEE Main / Adv</option>
                  <option>NEET UG</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-600 font-bold block mb-1.5">Board / Authority</label>
                <select 
                  value={board} 
                  onChange={(e) => setBoard(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-400"
                >
                  <option>CBSE</option>
                  <option>ICSE / ISC</option>
                  <option>Maharashtra State Board (HSC/SSC)</option>
                  <option>UP Board</option>
                  <option>Karnataka State Board</option>
                  <option>Tamil Nadu Board</option>
                  <option>West Bengal Board</option>
                  <option>NTA (JEE / NEET)</option>
                  <option>State Board</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-600 font-bold block mb-1.5 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-blue-600" /> AI Engine Model
              </label>
              <select 
                value={aiModel} 
                onChange={(e) => setAiModel(e.target.value)}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-400"
              >
                <option value="gemini-3.6-flash">Google Gemini 3.6 Flash (Fast & Accurate)</option>
                <option value="gemini-1.5-pro">Google Gemini 1.5 Pro (Deep Scientific Reasoning)</option>
                <option value="gemini-1.5-flash">Google Gemini 1.5 Flash (Lightweight)</option>
                <option value="gemini-2.0-flash">Google Gemini 2.0 Flash (Next-Gen)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-600 font-bold block mb-1.5">Output Format</label>
                <select 
                  value={format} 
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-400"
                >
                  <option>MCQ Quiz</option>
                  <option>Formula Sheet</option>
                  <option>Detailed Summary</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-600 font-bold block mb-1.5">Difficulty</label>
                <select 
                  value={difficulty} 
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-400"
                >
                  <option>Standard Board</option>
                  <option>Medium</option>
                  <option>Advanced / Competitive</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !topic.trim()}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-40 text-sm shadow-sm cursor-pointer"
          >
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Brain className="w-5 h-5" />}
            Generate Study Material
          </button>
        </div>

        {/* Right Side: Output Display Window */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 p-6 sm:p-7 rounded-2xl shadow-card min-h-[500px] flex flex-col justify-between relative overflow-hidden">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center space-y-4 py-20"
              >
                <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin" />
                <h3 className="text-lg font-bold text-slate-900">AI Syllabus Synthesizer running...</h3>
                <p className="text-xs text-slate-500 text-center max-w-sm">
                  Analyzing 10-year past paper blueprints and formulating structured questions for {topic}.
                </p>
              </motion.div>
            ) : generatedOutput ? (
              <motion.div 
                key="output"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col justify-between h-full space-y-6"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                        {generatedOutput.board} • {generatedOutput.classVal}
                      </span>
                      <h3 className="font-bold text-lg text-slate-900 mt-0.5">{generatedOutput.title}</h3>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={handleCopy} 
                        className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer shadow-xs"
                        title="Copy to clipboard"
                      >
                        {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 space-y-6 overflow-y-auto max-h-[380px] pr-2">
                    {generatedOutput.type === 'quiz' && (
                      <div className="space-y-6">
                        {(generatedOutput.items || []).map((item: any, i: number) => {
                          const questionText = item.question || item.q || ''
                          const optionsList: string[] = item.options || item.o || []
                          const correctIdx = item.correctAnswer !== undefined ? item.correctAnswer : (item.a !== undefined ? item.a : 0)

                          return (
                            <div key={i} className="space-y-3 bg-slate-50/80 border border-slate-200 p-4 rounded-xl">
                              <div className="flex items-start gap-2.5">
                                <span className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                  {i + 1}
                                </span>
                                <div className="text-sm font-semibold text-slate-900 flex-1">
                                  <MathRenderer content={questionText} />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                                {optionsList.map((opt: string, optI: number) => (
                                  <div 
                                    key={optI} 
                                    className={`p-3 rounded-xl border text-xs text-left flex items-center gap-2 ${
                                      optI === correctIdx 
                                        ? 'border-emerald-300 bg-emerald-50 text-emerald-900 font-semibold' 
                                        : 'border-slate-200 bg-white text-slate-700'
                                    }`}
                                  >
                                    <span className="font-bold text-slate-500 shrink-0">{String.fromCharCode(65 + optI)}.</span>
                                    <MathRenderer content={opt} className="flex-1" />
                                  </div>
                                ))}
                              </div>

                              {item.explanation && (
                                <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200 mt-2 space-y-1">
                                  <strong className="text-blue-700 block">Answer Explanation:</strong>
                                  <MathRenderer content={item.explanation} />
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {generatedOutput.type === 'formulas' && (
                      <div className="grid grid-cols-1 gap-3">
                        {(generatedOutput.items || []).map((form: any, i: number) => (
                          <div key={i} className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                            <span className="text-xs text-slate-600 font-semibold flex items-center gap-1.5">
                              <Lightbulb className="w-3.5 h-3.5 text-blue-600" /> {form.name}
                            </span>
                            <div className="text-slate-900 font-bold text-sm bg-white p-3 rounded-xl border border-slate-200">
                              <MathRenderer content={`$ ${form.eq} $`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {generatedOutput.type === 'summary' && (
                      <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 border border-slate-200 p-5 rounded-xl font-sans">
                        {generatedOutput.text}
                      </div>
                    )}
                  </div>
                </div>

                {/* Notice banner if present */}
                {generatedOutput.notice && (
                  <div className="flex items-center gap-2 text-[11px] text-blue-800 bg-blue-50 border border-blue-200 p-2.5 rounded-xl">
                    <Info className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{generatedOutput.notice}</span>
                  </div>
                )}

                {/* Bottom Action Footer */}
                <div className="border-t border-slate-100 pt-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    Topic: <strong className="text-slate-900">{topic}</strong> ({classVal})
                  </span>

                  {generatedOutput.type === 'quiz' ? (
                    <button 
                      onClick={handleLaunchExam}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Launch in CBT Exam Room
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <Link href="/dashboard/mock-exams">
                      <button className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs">
                        <Play className="w-3.5 h-3.5 text-blue-600 fill-current" />
                        Explore Mock Exams
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                className="flex-1 flex flex-col items-center justify-center space-y-4 py-20 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-base">No Study Material Generated Yet</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Select a topic on the left (or pick one of our quick high-yield chips) and click Generate to see the AI output.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  )
}
