'use client'

import { motion } from 'framer-motion'
import { FileCheck2, Clock, CheckCircle2, Play } from 'lucide-react'

export default function PracticeTestsPage() {
  const tests = [
    { title: 'Electrostatics Part 1 (Basic)', subject: 'Physics', qCount: 20, time: '30 mins', status: 'Completed', score: '85%' },
    { title: 'Calculus Limits & Continuity', subject: 'Mathematics', qCount: 15, time: '25 mins', status: 'In Progress', score: 'N/A' },
    { title: 'Organic Chemistry Revision', subject: 'Chemistry', qCount: 30, time: '45 mins', status: 'Not Started', score: 'N/A' }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Practice <span className="gradient-text">Tests</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">Topic-wise practice sets to benchmark understanding.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl glow-hover flex flex-col justify-between h-64 bento-card">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-cyan-400 bg-cyan-400/10 px-2.5 py-0.5 rounded-full">{test.subject}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  test.status === 'Completed' ? 'bg-green-500/10 text-green-400' : test.status === 'In Progress' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-white/5 text-gray-400'
                }`}>{test.status}</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-4">{test.title}</h3>
              <div className="flex gap-4 text-xs text-gray-400 mt-2 font-semibold">
                <span className="flex items-center gap-1"><FileCheck2 className="w-4 h-4 text-cyan-400" /> {test.qCount} Questions</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-cyan-400" /> {test.time}</span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              {test.status === 'Completed' ? (
                <>
                  <span className="text-xs text-gray-500">Score: <strong className="text-cyan-400 text-sm">{test.score}</strong></span>
                  <button className="px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5 text-xs text-white transition-all font-semibold">Review Answers</button>
                </>
              ) : (
                <>
                  <span className="text-xs text-gray-500">Not Attempted</span>
                  <button className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-midnight-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1">
                    <Play className="w-3.5 h-3.5 fill-midnight-900" />
                    Start Test
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
