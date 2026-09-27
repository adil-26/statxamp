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
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Topic-Level Practice Sets
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Practice <span className="text-blue-600">Tests</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">Topic-wise practice sets to benchmark your chapter-by-chapter mastery.</p>
        </div>

        <Link href="/ai-generator">
          <button className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all flex items-center gap-2 shadow-xs cursor-pointer">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Generate Topic Test
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test, i) => (
          <div key={i} className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-card flex flex-col justify-between h-72 hover:border-blue-300 transition-all">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/70">
                  {test.subject}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/60">
                  {test.level}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mt-4 leading-snug">{test.title}</h3>
              
              <div className="flex gap-4 text-xs text-slate-500 mt-3 font-medium">
                <span className="flex items-center gap-1.5"><FileCheck2 className="w-4 h-4 text-blue-600" /> {test.qCount} Questions</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-blue-600" /> {test.time}</span>
              </div>

              <div className="text-[11px] text-slate-400 font-semibold mt-2">
                Total: {test.marks} Marks
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500">Status: <strong className="text-emerald-600 font-semibold">{test.status}</strong></span>
              
              <Link href={`/dashboard/mock-exams/${test.id}`}>
                <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer">
                  <Play className="w-3.5 h-3.5 fill-current" />
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
