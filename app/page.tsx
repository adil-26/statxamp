'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LogoAnimation, AnimatedText } from '@/components/logo-animation'
import { Footer } from '@/components/footer'
import { Sparkles, ArrowRight, BookOpen, Trophy, Brain, Zap, CheckCircle2, ChevronRight, Layers } from 'lucide-react'
import Link from 'next/link'
import { INDIAN_BOARDS_LIST } from '@/lib/cbse-database'

export default function Home() {
  const [selectedBoard, setSelectedBoard] = useState('CBSE (Central Board)')
  const [selectedClass, setSelectedClass] = useState('Class 12')

  return (
    <main className="min-h-screen bg-midnight-950 text-white relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      
      {/* Floating Orbs - Eye-soothing gradient */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />

      {/* Header navbar */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 glass-strong py-4 px-6 border-b border-cyan-400/10"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 
                            flex items-center justify-center font-black text-midnight-950 text-lg shadow-[0_0_15px_rgba(0,212,255,0.4)]">
              S
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              Stat<span className="gradient-text">Xam</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link 
              href="/ai-generator"
              className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-cyan-300 text-xs font-bold hover:bg-white/10 transition-all"
            >
              AI Generator
            </Link>
            <Link 
              href="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-cyan-400 text-midnight-950 font-black text-xs flex items-center gap-2 hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all cursor-pointer"
            >
              Launch Platform
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full 
                           bg-cyan-400/10 border border-cyan-400/25 text-cyan-300 text-xs font-bold"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Next-Gen Indian Board & Competitive Syllabus Engine</span>
              </motion.div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white">
                Master Complex Proofs. <br />
                <span className="gradient-text">Ace Every Exam.</span>
              </h1>

              {/* Subtitle with High Sight Contrast */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-sans">
                Interactive step-by-step mathematical derivations, formula sandboxes, and AI-driven mock tests with 3-hint limits — built for CBSE, ICSE, and Indian State Boards.
              </p>

              {/* 1-Click Interactive Syllabus Quick-Start Launcher */}
              <div className="p-5 rounded-3xl bg-white/5 border border-cyan-400/30 backdrop-blur-xl shadow-2xl space-y-4 max-w-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-black text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-cyan-400" /> Quick-Start Syllabus Launcher
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    Instant Access
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 font-bold block mb-1">Target Board:</label>
                    <select
                      value={selectedBoard}
                      onChange={(e) => setSelectedBoard(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-midnight-900 border border-white/15 text-xs text-white font-semibold focus:outline-none focus:border-cyan-400"
                    >
                      {INDIAN_BOARDS_LIST.map(b => (
                        <option key={b} value={b} className="bg-midnight-900 text-white">{b}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 font-bold block mb-1">Standard / Class:</label>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-midnight-900 border border-white/15 text-xs text-white font-semibold focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Class 12">Class 12 (Board Blueprint)</option>
                      <option value="Class 10">Class 10 (Board Blueprint)</option>
                      <option value="JEE / NEET">JEE & NEET Competitive</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Link 
                    href="/dashboard/learn" 
                    className="flex-1 min-w-[160px] py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-midnight-950 font-extrabold text-xs text-center flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all cursor-pointer"
                  >
                    Start Learning Proofs
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link 
                    href="/dashboard/mock-exams"
                    className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-300 font-bold text-xs text-center transition-all cursor-pointer"
                  >
                    Take Practice Test
                  </Link>
                </div>
              </div>

              {/* Verified Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 10-Yr Blueprint Analyzed
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Multi-Model AI Engine
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Sight Ergonomics Mode
                </span>
              </div>
            </motion.div>

            {/* Right Content - Animated Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center items-center"
            >
              <LogoAnimation size={320} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. AI Study Assistant */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="bento-card p-6 group cursor-pointer border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center mb-4
                              group-hover:bg-cyan-400/20 transition-all duration-300 border border-cyan-400/20">
                <Brain className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors">
                Visual Proof Engine
              </h3>
              <ul className="space-y-1.5 text-slate-300 text-xs leading-relaxed">
                <li>• Step-by-step animated derivations</li>
                <li>• Interactive formula simulation sandboxes</li>
                <li>• Sight-comfort LaTeX equation reader</li>
              </ul>
            </motion.div>

            {/* 2. State Boards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -6 }}
              className="bento-card p-6 group cursor-pointer border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center mb-4
                              group-hover:bg-cyan-400/20 transition-all duration-300 border border-cyan-400/20">
                <BookOpen className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors">
                All Indian Boards
              </h3>
              <ul className="space-y-1.5 text-slate-300 text-xs leading-relaxed">
                <li>• CBSE, ICSE, Maharashtra HSC/SSC</li>
                <li>• UP, Bihar, WB State Boards</li>
                <li>• JEE Main & NEET syllabus blueprints</li>
              </ul>
            </motion.div>

            {/* 3. Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -6 }}
              className="bento-card p-6 group cursor-pointer border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center mb-4
                              group-hover:bg-cyan-400/20 transition-all duration-300 border border-cyan-400/20">
                <Trophy className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors">
                Leaderboard & Mock Tests
              </h3>
              <ul className="space-y-1.5 text-slate-300 text-xs leading-relaxed">
                <li>• Live testing console with timer</li>
                <li>• Strictly 3-hints limit tests</li>
                <li>• All-India percentile rank benchmark</li>
              </ul>
            </motion.div>

            {/* 4. Smart Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -6 }}
              className="bento-card p-6 group cursor-pointer border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center mb-4
                              group-hover:bg-cyan-400/20 transition-all duration-300 border border-cyan-400/20">
                <Zap className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors">
                AI Diagnostic Tutor
              </h3>
              <ul className="space-y-1.5 text-slate-300 text-xs leading-relaxed">
                <li>• Instant doubt resolution with math symbols</li>
                <li>• Dynamic exam generator (Gemini 3.6 Flash)</li>
                <li>• Weak-topic revision trackers</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
