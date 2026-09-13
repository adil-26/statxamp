'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Zap, ShieldAlert, Play, Sparkles, Filter, Clock, CheckCircle2, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { MOCK_EXAMS_DATABASE } from '@/lib/exam-data'

export default function MockExamsPage() {
  const [selectedTab, setSelectedTab] = useState<'All' | 'Class 12' | 'Class 10' | 'Competitive'>('All')

  const examsList = Object.values(MOCK_EXAMS_DATABASE)

  const filteredExams = examsList.filter(exam => {
    if (selectedTab === 'All') return true
    return exam.classLevel === selectedTab
  })

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            AI-Formulated <span className="gradient-text">Mock Exams</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Simulate authentic Computer-Based Tests (CBT) built from 10-year past paper weightage trends.
          </p>
        </div>

        <Link href="/ai-generator">
          <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-400/40 text-cyan-400 font-semibold text-xs flex items-center gap-2 hover:bg-cyan-400/30 transition-all glow-border">
            <Sparkles className="w-4 h-4" />
            Generate Custom Exam
          </button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        {(['All', 'Class 12', 'Class 10', 'Competitive'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedTab === tab
                ? 'bg-cyan-400 text-midnight-900 shadow-[0_0_15px_rgba(0,212,255,0.3)]'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab === 'All' ? 'All Mock Exams' : tab === 'Competitive' ? 'Competitive (JEE/NEET)' : `${tab} Boards`}
          </button>
        ))}
      </div>

      {/* Exam Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 p-6 rounded-3xl glow-hover flex flex-col justify-between relative bento-card overflow-hidden"
          >
            {/* Live / Status Badge */}
            {exam.dateBadge && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-midnight-900 font-black text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                {exam.dateBadge}
              </div>
            )}

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-cyan-400 bg-cyan-400/10 px-2.5 py-0.5 rounded-full border border-cyan-400/20">
                  {exam.board}
                </span>
                <span className="text-xs font-bold text-purple-400 bg-purple-400/10 px-2.5 py-0.5 rounded-full border border-purple-400/20">
                  {exam.subject}
                </span>
                <span className="text-[11px] font-semibold text-gray-400">
                  {exam.classLevel}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mt-3 leading-snug">{exam.title}</h3>
              <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">{exam.description}</p>

              {/* 10-Year Weightage Pills */}
              <div className="mt-4 pt-3 border-t border-white/5">
                <span className="text-[10px] font-bold text-gray-400 block mb-1.5 uppercase tracking-wider">
                  Recurring 10-Year Focus:
                </span>
                <div className="flex flex-wrap gap-1">
                  {exam.highWeightageTopics.slice(0, 3).map((topic, idx) => (
                    <span key={idx} className="text-[10px] bg-white/5 text-cyan-300 px-2 py-0.5 rounded-md border border-white/5">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  {exam.durationMinutes} Mins • {exam.questionsCount} Qs
                </span>
                <span className="text-[11px] font-semibold text-gray-500 block">
                  Total: {exam.totalMarks} Marks
                </span>
              </div>

              <Link href={`/dashboard/mock-exams/${exam.id}`}>
                <button className="px-4 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-midnight-900 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(0,212,255,0.25)] cursor-pointer">
                  <Play className="w-3.5 h-3.5 fill-midnight-900" />
                  Enter Exam Room
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
