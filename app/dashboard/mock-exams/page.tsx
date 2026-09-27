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
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Official & AI-Formulated <span className="text-blue-600">Mock Exams</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Simulate authentic Computer-Based Tests (CBT) built from 10-year past paper weightage trends.
          </p>
        </div>

        <Link href="/ai-generator">
          <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-xs cursor-pointer">
            <Sparkles className="w-4 h-4" />
            Generate Custom Exam
          </button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {(['All', 'Class 12', 'Class 10', 'Competitive'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedTab === tab
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200/90 hover:border-slate-300 p-6 rounded-2xl shadow-xs hover:shadow-card flex flex-col justify-between relative overflow-hidden transition-all group"
          >
            {/* Live / Status Badge */}
            {exam.dateBadge && (
              <div className="absolute top-0 right-0 bg-blue-600 text-white font-bold text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow-2xs">
                {exam.dateBadge}
              </div>
            )}

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/70">
                  {exam.board}
                </span>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200/70">
                  {exam.subject}
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  {exam.classLevel}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mt-3 leading-snug group-hover:text-blue-600 transition-colors">
                {exam.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">{exam.description}</p>

              {/* 10-Year Weightage Pills */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block mb-1.5 uppercase tracking-wider">
                  Recurring 10-Year Focus:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {exam.highWeightageTopics.slice(0, 3).map((topic, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 font-medium">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs text-slate-600 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  {exam.durationMinutes} Mins • {exam.questionsCount} Qs
                </span>
                <span className="text-[11px] font-semibold text-slate-400 block">
                  Total: {exam.totalMarks} Marks
                </span>
              </div>

              <Link href={`/dashboard/mock-exams/${exam.id}`}>
                <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer">
                  <Play className="w-3.5 h-3.5 fill-white text-white" />
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
