'use client'

import { motion } from 'framer-motion'
import { FileCheck2, Clock, CheckCircle2, Play, Sparkles, BookOpen, RotateCcw } from 'lucide-react'
import Link from 'next/link'

export default function PracticeTestsPage() {
  const tests = [
    { 
      id: 'cbse-12-physics-2024',
      title: 'Electrostatics & Gauss Theorem (High Yield)', 
      subject: 'Physics', 
      qCount: 7, 
      time: '45 mins', 
      status: 'Ready to Start', 
      score: 'N/A',
      level: 'Class 12 Board',
      marks: 35
    },
    { 
      id: 'jee-main-pcm-mock',
      title: 'Calculus, Limits & Differential Equations', 
      subject: 'Mathematics', 
      qCount: 6, 
      time: '60 mins', 
      status: 'Ready to Start', 
      score: 'N/A',
      level: 'JEE Main Prep',
      marks: 24
    },
    { 
      id: 'cbse-10-science-2024',
      title: 'Light: Reflection, Refraction & Electricity', 
      subject: 'Science', 
      qCount: 5, 
      time: '40 mins', 
      status: 'Ready to Start', 
      score: 'N/A',
      level: 'Class 10 Board',
      marks: 25
    }
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Topic-Level Practice Sets
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Practice <span className="gradient-text">Tests</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Topic-wise practice sets to benchmark your chapter-by-chapter mastery.</p>
        </div>

        <Link href="/ai-generator">
          <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-cyan-400 text-xs font-bold transition-all flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Generate Topic Test
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl glow-hover flex flex-col justify-between h-72 bento-card">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-cyan-400 bg-cyan-400/10 px-2.5 py-0.5 rounded-full border border-cyan-400/20">
                  {test.subject}
                </span>
                <span className="text-[11px] font-semibold text-gray-400 bg-white/5 px-2.5 py-0.5 rounded-full">
                  {test.level}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mt-4 leading-snug">{test.title}</h3>
              
              <div className="flex gap-4 text-xs text-gray-400 mt-3 font-semibold">
                <span className="flex items-center gap-1.5"><FileCheck2 className="w-4 h-4 text-cyan-400" /> {test.qCount} Questions</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-cyan-400" /> {test.time}</span>
              </div>

              <div className="text-[11px] text-gray-500 font-semibold mt-2">
                Total: {test.marks} Marks
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
              <span className="text-xs text-gray-400">Status: <strong className="text-green-400 font-semibold">{test.status}</strong></span>
              
              <Link href={`/dashboard/mock-exams/${test.id}`}>
                <button className="px-4 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-midnight-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,212,255,0.2)] cursor-pointer">
                  <Play className="w-3.5 h-3.5 fill-midnight-900" />
                  Start Test
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
