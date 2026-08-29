'use client'

import { motion } from 'framer-motion'
import { Sparkles, Brain, AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react'

export default function AnalyticsPage() {
  const weeklyStudyHours = [
    { day: 'Mon', hours: 4.5 },
    { day: 'Tue', hours: 6.2 },
    { day: 'Wed', hours: 5.8 },
    { day: 'Thu', hours: 8.0 },
    { day: 'Fri', hours: 7.1 },
    { day: 'Sat', hours: 9.5 },
    { day: 'Sun', hours: 5.0 }
  ]

  const subjectProgress = [
    { name: 'Physics', completed: 75, total: 12, color: 'bg-blue-500' },
    { name: 'Chemistry', completed: 60, total: 10, color: 'bg-purple-500' },
    { name: 'Mathematics', completed: 90, total: 15, color: 'bg-orange-500' },
    { name: 'Biology', completed: 45, total: 14, color: 'bg-green-500' },
    { name: 'Computer Science', completed: 95, total: 11, color: 'bg-cyan-500' }
  ]

  const weakTopics = [
    { subject: 'Physics', topic: 'Gauss Law Applications', score: '42%', recommend: 'Watch Electrostatics Chapter 1 video lecture and generate revision quiz questions.' },
    { subject: 'Mathematics', topic: 'Integration by Substitution', score: '55%', recommend: 'Solve Calculus MCQs practice sets and ask AI Assistant to break down step-by-step methods.' },
    { subject: 'Chemistry', topic: 'Point Defects in Solids', score: '38%', recommend: 'Review Solid State Key Notes cheatsheet and ask AI to summarize Frenkel defects differences.' }
  ]

  const accuracyRadius = 40
  const accuracyCircumference = 2 * Math.PI * accuracyRadius
  const accuracyStrokeOffset = accuracyCircumference - (78 / 100) * accuracyCircumference

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Performance <span className="gradient-text">Analytics</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">AI-driven analysis of your study habits, scores, and performance.</p>
      </div>

      {/* Row 1: Daily Study Hours & Accuracy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Daily Study Hours */}
        <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-3xl p-6 glow-hover flex flex-col justify-between h-96">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Daily Study Hours</h3>
            <p className="text-xs text-gray-400">Total time allocated to exam preparation this week</p>
          </div>
          <div className="flex items-end justify-between h-56 pt-4">
            {weeklyStudyHours.map((d, i) => {
              const heightPercent = (d.hours / 10) * 100
              return (
                <div key={d.day} className="flex flex-col items-center group w-full">
                  <div className="relative w-8 bg-cyan-400/10 border border-cyan-400/20 rounded-t-lg flex flex-col justify-end h-40 overflow-hidden">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPercent}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: i * 0.1 }}
                      className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-md relative"
                    >
                      <div className="absolute top-0 left-0 right-0 h-1 bg-white shadow-[0_0_10px_#fff]" />
                    </motion.div>
                  </div>
                  <span className="text-xs text-gray-400 mt-2 font-medium">{d.day}</span>
                  <span className="text-[10px] text-cyan-400 font-bold mt-0.5">{d.hours}h</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Accuracy Ring */}
        <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-3xl p-6 glow-hover flex flex-col justify-between h-96">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Practice Accuracy</h3>
            <p className="text-xs text-gray-400">Correct answers ratio on mock tests</p>
          </div>

          <div className="relative flex items-center justify-center py-6">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r={accuracyRadius}
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="10"
                fill="transparent"
              />
              <motion.circle
                cx="80"
                cy="80"
                r={accuracyRadius}
                stroke="#00d4ff"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={accuracyCircumference}
                initial={{ strokeDashoffset: accuracyCircumference }}
                animate={{ strokeDashoffset: accuracyStrokeOffset }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-3xl font-extrabold text-white">78%</span>
              <span className="text-[10px] text-gray-400 block font-semibold mt-1">Accuracy</span>
            </div>
          </div>

          <div className="flex justify-between items-center bg-white/5 border border-white/10 p-3 rounded-2xl text-xs">
            <span className="text-gray-400 font-semibold">Total MCQs Solved</span>
            <span className="font-extrabold text-white">1,480</span>
          </div>
        </div>
      </div>

      {/* Row 2: Subject Progress & Weak Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Subject wise progress list */}
        <div className="lg:col-span-6 bg-white/5 border border-white/10 rounded-3xl p-6 glow-hover space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">Subject Completion</h3>
            <p className="text-xs text-gray-400">Detailed completion status of curriculum</p>
          </div>

          <div className="space-y-4">
            {subjectProgress.map((sub) => (
              <div key={sub.name} className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-white">{sub.name}</span>
                  <span className="text-cyan-400">{sub.completed}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 border border-white/10 rounded-full overflow-hidden">
                  <div className={`h-full ${sub.color}`} style={{ width: `${sub.completed}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Topics & AI Recommendations */}
        <div className="lg:col-span-6 bg-white/5 border border-white/10 rounded-3xl p-6 glow-hover space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Weak Area analysis</h3>
              <p className="text-xs text-gray-400">Identified concepts below threshold performance</p>
            </div>
            <div className="p-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-4">
            {weakTopics.map((topic, i) => (
              <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2 relative overflow-hidden group">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white">{topic.subject} - {topic.topic}</span>
                  <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">{topic.score}</span>
                </div>
                <div className="flex gap-2 text-xs text-cyan-400 leading-relaxed font-semibold bg-cyan-400/5 p-3 rounded-xl border border-cyan-400/10 mt-1">
                  <Brain className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <p>{topic.recommend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
