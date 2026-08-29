'use client'

import { motion } from 'framer-motion'
import { Award, Zap, ShieldAlert, Play } from 'lucide-react'

export default function MockExamsPage() {
  const exams = [
    { title: 'National Level Mock JEE Main Exam', type: 'Competitive', subject: 'PCM', time: '180 mins', date: 'Live Now' },
    { title: 'CBSE Physics Class 12 Full Mock Exam', type: 'Board Exam', subject: 'Physics', time: '180 mins', date: 'July 2, 2026' }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Mock <span className="gradient-text">Exams</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">Simulate real examination conditions with AI proctoring parameters.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exams.map((exam, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl glow-hover flex flex-col justify-between h-72 relative bento-card overflow-hidden">
            {exam.date === 'Live Now' && (
              <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider animate-pulse">
                Live Now
              </div>
            )}
            <div>
              <div className="flex gap-2">
                <span className="text-xs font-bold text-cyan-400 bg-cyan-400/10 px-2.5 py-0.5 rounded-full">{exam.type}</span>
                <span className="text-xs font-bold text-purple-400 bg-purple-400/10 px-2.5 py-0.5 rounded-full">{exam.subject}</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-4">{exam.title}</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">Full syllabus assessment mimicking structural questions, markings, and time constraints.</p>
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <ShieldAlert className="w-4 h-4 text-cyan-400" />
                Time: {exam.time}
              </span>
              <button className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-midnight-900 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(0,212,255,0.2)]">
                <Play className="w-3.5 h-3.5 fill-midnight-900" />
                Enter Exam Room
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
