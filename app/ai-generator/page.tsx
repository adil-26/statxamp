'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Brain, Download, Copy, Play, CheckCircle2, RefreshCw, ArrowRight, BookOpen, Lightbulb, Info } from 'lucide-react'
import Link from 'next/link'

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
    <main className="min-h-screen bg-midnight-900 text-white relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-cyan-400/5 blur-3xl pointer-events-none" />
      
      {/* Header navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong py-4 px-6 border-b border-cyan-400/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 
                            flex items-center justify-center glow-border">
              <span className="text-xl font-bold gradient-text">S</span>
            </div>
            <span className="text-xl font-bold">
              Stat<span className="text-cyan-400">Xam</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/mock-exams" className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-semibold flex items-center gap-2 hover:bg-white/10 text-xs">
              <Play className="w-3.5 h-3.5 text-cyan-400" /> Mock Exams
            </Link>
            <Link href="/dashboard" className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-midnight-900 font-bold flex items-center gap-2 text-xs shadow-[0_0_12px_rgba(0,212,255,0.25)]">
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Form container */}
      <section className="pt-28 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Side: Generator Controls */}
        <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 sm:p-7 rounded-3xl glow-hover flex flex-col justify-between space-y-6 h-fit backdrop-blur-xl">
          <div>
            <div className="flex items-center gap-2 px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 text-xs font-semibold text-cyan-400 rounded-full w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              Gemini AI Syllabus Engine
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-3">AI Study Material Generator</h1>
            <p className="text-xs text-gray-400 mt-1">Generate 10-year weightage quizzes, revision formula sheets, and study notes.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 font-bold block mb-1.5">Topic or Chapter Name</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Electrostatics, Optics, Calculus, Aldehydes..."
                className="w-full h-11 px-3.5 bg-midnight-900/80 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-cyan-400/50 text-white font-medium placeholder-gray-500"
              />

              {/* Quick Topic Chips */}
              <div className="mt-2.5">
                <span className="text-[10px] text-gray-400 block mb-1 font-semibold">Quick High-Yield Topics:</span>
                <div className="flex flex-wrap gap-1.5">
                  {quickTopics.map((t, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTopic(t)}
                      className="text-[10px] bg-white/5 hover:bg-white/10 text-cyan-300 px-2 py-1 rounded-lg border border-white/10 transition-all cursor-pointer"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-xs text-gray-400 font-bold block mb-1.5">Target Class / Level</label>
                <select 
                  value={classVal} 
                  onChange={(e) => setClassVal(e.target.value)}
                  className="w-full h-10 px-3 bg-midnight-900/80 border border-white/10 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-cyan-400/50"
                >
                  <option>Class 12</option>
                  <option>Class 10</option>
                  <option>Class 11</option>
                  <option>JEE Main / Adv</option>
                  <option>NEET UG</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 font-bold block mb-1.5">Board / Authority</label>
                <select 
                  value={board} 
                  onChange={(e) => setBoard(e.target.value)}
                  className="w-full h-10 px-3 bg-midnight-900/80 border border-white/10 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-cyan-400/50"
                >
                  <option>CBSE</option>
                  <option>ICSE / ISC</option>
                  <option>NTA (National)</option>
                  <option>State Board</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400 font-bold block mb-1.5 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-cyan-400" /> AI Engine Model
              </label>
              <select 
                value={aiModel} 
                onChange={(e) => setAiModel(e.target.value)}
                className="w-full h-10 px-3 bg-midnight-900/80 border border-cyan-400/30 rounded-xl text-xs font-semibold text-cyan-300 focus:outline-none focus:border-cyan-400"
              >
                <option value="gemini-3.6-flash">Google Gemini 3.6 Flash (Fast & Accurate)</option>
                <option value="gemini-1.5-pro">Google Gemini 1.5 Pro (Deep Scientific Reasoning)</option>
                <option value="gemini-1.5-flash">Google Gemini 1.5 Flash (Lightweight)</option>
                <option value="gemini-2.0-flash">Google Gemini 2.0 Flash (Next-Gen)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 font-bold block mb-1.5">Output Format</label>
                <select 
                  value={format} 
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full h-10 px-3 bg-midnight-900/80 border border-white/10 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-cyan-400/50"
                >
                  <option>MCQ Quiz</option>
                  <option>Formula Sheet</option>
                  <option>Detailed Summary</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 font-bold block mb-1.5">Difficulty</label>
                <select 
                  value={difficulty} 
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full h-10 px-3 bg-midnight-900/80 border border-white/10 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-cyan-400/50"
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
            className="w-full h-12 bg-cyan-400 hover:bg-cyan-300 text-midnight-900 font-extrabold rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 text-sm shadow-[0_0_20px_rgba(0,212,255,0.25)] cursor-pointer"
          >
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Brain className="w-5 h-5" />}
            Generate Study Material
          </button>
        </div>

        {/* Right Side: Output Display Window */}
        <div className="lg:col-span-7 bg-white/5 border border-white/10 p-6 sm:p-7 rounded-3xl glow-hover min-h-[500px] flex flex-col justify-between relative overflow-hidden backdrop-blur-xl">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center space-y-4 py-20"
              >
                <div className="w-16 h-16 rounded-full border-4 border-cyan-400/30 border-t-cyan-400 animate-spin" />
                <h3 className="text-lg font-bold text-white">AI Syllabus Synthesizer running...</h3>
                <p className="text-xs text-gray-400 text-center max-w-sm">
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
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                        {generatedOutput.board} • {generatedOutput.classVal}
                      </span>
                      <h3 className="font-extrabold text-lg text-white mt-0.5">{generatedOutput.title}</h3>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={handleCopy} 
                        className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all cursor-pointer"
                        title="Copy to clipboard"
                      >
                        {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-300" />}
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="mt-6 space-y-6 overflow-y-auto max-h-[380px] pr-2">
                    {generatedOutput.type === 'quiz' && (
                      <div className="space-y-6">
                        {generatedOutput.items.map((item: any, i: number) => (
                          <div key={i} className="space-y-3 bg-midnight-900/40 border border-white/5 p-4 rounded-2xl">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-bold flex items-center justify-center">
                                {i + 1}
                              </span>
                              <span className="text-sm font-semibold text-white">{item.q}</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                              {item.o.map((opt: string, optI: number) => (
                                <div 
                                  key={optI} 
                                  className={`p-3 rounded-xl border text-xs text-left ${
                                    optI === item.a 
                                      ? 'border-green-500/50 bg-green-500/10 text-green-300 font-semibold' 
                                      : 'border-white/10 bg-white/5 text-gray-300'
                                  }`}
                                >
                                  <span className="font-bold mr-2 text-gray-400">{String.fromCharCode(65 + optI)}.</span>
                                  {opt}
                                </div>
                              ))}
                            </div>

                            {item.explanation && (
                              <div className="text-[11px] text-gray-400 bg-white/5 p-2.5 rounded-xl border border-white/5 mt-2">
                                <strong className="text-cyan-400">Answer Explanation:</strong> {item.explanation}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {generatedOutput.type === 'formulas' && (
                      <div className="grid grid-cols-1 gap-3">
                        {generatedOutput.items.map((form: any, i: number) => (
                          <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1.5">
                            <span className="text-xs text-gray-400 font-semibold flex items-center gap-1.5">
                              <Lightbulb className="w-3.5 h-3.5 text-cyan-400" /> {form.name}
                            </span>
                            <div className="font-mono text-cyan-400 font-bold text-sm bg-midnight-900/60 p-3 rounded-xl border border-cyan-400/20">
                              {form.eq}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {generatedOutput.type === 'summary' && (
                      <div className="text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-line bg-white/5 border border-white/10 p-5 rounded-2xl font-sans">
                        {generatedOutput.text}
                      </div>
                    )}
                  </div>
                </div>

                {/* Notice banner if present */}
                {generatedOutput.notice && (
                  <div className="flex items-center gap-2 text-[11px] text-cyan-300 bg-cyan-400/10 border border-cyan-400/20 p-2.5 rounded-xl">
                    <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{generatedOutput.notice}</span>
                  </div>
                )}

                {/* Bottom Action Footer */}
                <div className="border-t border-white/10 pt-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-gray-400">
                    Topic: <strong className="text-white">{topic}</strong> ({classVal})
                  </span>

                  {generatedOutput.type === 'quiz' ? (
                    <button 
                      onClick={handleLaunchExam}
                      className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-midnight-900 font-bold text-xs flex items-center gap-2 transition-all shadow-[0_0_12px_rgba(0,212,255,0.25)] cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-midnight-900" />
                      Launch in CBT Exam Room
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <Link href="/dashboard/mock-exams">
                      <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer">
                        <Play className="w-3.5 h-3.5 text-cyan-400" />
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
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(0,212,255,0.1)]">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-white text-base">No Study Material Generated Yet</h3>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">
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
