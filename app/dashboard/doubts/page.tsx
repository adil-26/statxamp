'use client'

import { motion } from 'framer-motion'
import { MessageSquare, HelpCircle, Send, Brain } from 'lucide-react'
import { useState } from 'react'

export default function DoubtsPage() {
  const [doubtText, setDoubtText] = useState('')
  const [resolvedList, setResolvedList] = useState<Array<{ doubt: string; answer: string; loading?: boolean }>>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!doubtText.trim() || isSubmitting) return
    const text = doubtText.trim()
    setDoubtText('')
    setIsSubmitting(true)

    const tempItem = { doubt: text, answer: '', loading: true }
    setResolvedList((prev) => [tempItem, ...prev])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      })
      const data = await res.json()
      setResolvedList((prev) => 
        prev.map((item) => 
          item.doubt === text 
            ? { doubt: text, answer: data.reply || data.error || 'No answer received.', loading: false } 
            : item
        )
      )
    } catch (err) {
      setResolvedList((prev) => 
        prev.map((item) => 
          item.doubt === text 
            ? { doubt: text, answer: 'Error connecting to Gemini AI. Please check your network or try again.', loading: false } 
            : item
        )
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Syllabus <span className="gradient-text">Doubts</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">Submit specific study doubts and receive step-by-step AI solutions instantly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 rounded-3xl glow-hover h-fit space-y-6">
          <h3 className="font-bold text-white text-lg">Submit Doubt</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={doubtText}
              onChange={(e) => setDoubtText(e.target.value)}
              placeholder="e.g. Differentiate Schottky defects vs Frenkel defects in crystals, or solve ∫ x*ln(x) dx"
              className="w-full h-36 p-4 bg-midnight-900 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-cyan-400/50 text-white resize-none"
            />
            <button 
              type="submit" 
              disabled={isSubmitting || !doubtText.trim()}
              className="w-full h-12 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-midnight-900 font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all text-xs cursor-pointer shadow-[0_0_12px_rgba(0,212,255,0.2)]"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'AI is solving...' : 'Ask AI Assistant'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-7 bg-white/5 border border-white/10 p-6 rounded-3xl glow-hover min-h-[300px] flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-white text-lg">Resolution Logs</h3>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {resolvedList.length > 0 ? (
                resolvedList.map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-3">
                    <span className="text-xs text-white font-bold block bg-white/5 p-2.5 rounded-xl border border-white/10">
                      Q: {item.doubt}
                    </span>
                    <div className="flex gap-3 text-xs text-gray-200 font-medium bg-cyan-400/5 p-4 rounded-xl border border-cyan-400/20">
                      <Brain className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div className="space-y-1 w-full">
                        <span className="font-bold text-cyan-400 block text-[11px]">Gemini AI Solution:</span>
                        {item.loading ? (
                          <div className="flex items-center gap-2 text-cyan-300 py-1">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                            <span>Synthesizing step-by-step solution...</span>
                          </div>
                        ) : (
                          <p className="leading-relaxed whitespace-pre-line text-gray-300">{item.answer}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500 text-xs">
                  No active doubts submitted. Type a question on the left to get instant AI answers.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
