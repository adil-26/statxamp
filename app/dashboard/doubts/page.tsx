'use client'

import { motion } from 'framer-motion'
import { MessageSquare, HelpCircle, Send, Brain } from 'lucide-react'
import { useState } from 'react'

export default function DoubtsPage() {
  const [doubtText, setDoubtText] = useState('')
  const [resolvedList, setResolvedList] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!doubtText.trim()) return
    setResolvedList([doubtText, ...resolvedList])
    setDoubtText('')
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Syllabus <span className="gradient-text">Doubts</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">Submit specific study doubts or check resolution logs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 rounded-3xl glow-hover h-fit space-y-6">
          <h3 className="font-bold text-white text-lg">Submit Doubt</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={doubtText}
              onChange={(e) => setDoubtText(e.target.value)}
              placeholder="e.g. Differentiate Schottky defects vs Frenkel defects in crystals"
              className="w-full h-32 p-4 bg-midnight-900 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-cyan-400/50 text-white resize-none"
            />
            <button type="submit" className="w-full h-12 bg-cyan-400 hover:bg-cyan-300 text-midnight-900 font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all text-xs">
              <Send className="w-4 h-4" />
              Ask AI Assistant
            </button>
          </form>
        </div>

        <div className="lg:col-span-7 bg-white/5 border border-white/10 p-6 rounded-3xl glow-hover min-h-[300px] flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-white text-lg">Resolution Logs</h3>
            <div className="space-y-4">
              {resolvedList.length > 0 ? (
                resolvedList.map((doubt, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-2">
                    <span className="text-xs text-gray-400 font-bold block">Doubt: {doubt}</span>
                    <div className="flex gap-2 text-xs text-cyan-400 font-semibold bg-cyan-400/5 p-3 rounded-xl border border-cyan-400/10">
                      <Brain className="w-4 h-4 shrink-0 mt-0.5" />
                      <p>AI response has been dispatched. Please see detailed response inside AI Assistant page for full analysis.</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500">No active doubts submitted. Use the form to request resolution.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
