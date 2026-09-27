'use client'

import { motion } from 'framer-motion'
import { MessageSquare, HelpCircle, Send, Brain } from 'lucide-react'
import { useState } from 'react'
import { MathRenderer } from '@/components/math-renderer'
import { VirtualScientificKeyboard } from '@/components/virtual-scientific-keyboard'

export default function DoubtsPage() {
  const [doubtText, setDoubtText] = useState('')
  const [resolvedList, setResolvedList] = useState<Array<{ doubt: string; answer: string; loading?: boolean }>>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

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
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Syllabus <span className="text-blue-600">Doubts</span>
        </h1>
        <p className="text-slate-500 text-sm mt-1">Submit specific study doubts and receive step-by-step AI solutions instantly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-white border border-slate-200/90 p-6 rounded-2xl shadow-card h-fit space-y-6">
          <h3 className="font-bold text-slate-900 text-lg">Submit Doubt</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <VirtualScientificKeyboard
              isOpen={isKeyboardOpen}
              onToggle={() => setIsKeyboardOpen(!isKeyboardOpen)}
              onInsert={(sym) => setDoubtText((prev) => prev + sym)}
            />

            <textarea
              value={doubtText}
              onChange={(e) => setDoubtText(e.target.value)}
              placeholder="e.g. Solve dy/dx = x+y using RK4, Dirac delta integrals, or explain Schottky defect"
              className="w-full h-36 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 text-slate-900 font-medium resize-none placeholder-slate-400"
            />
            <button 
              type="submit" 
              disabled={isSubmitting || !doubtText.trim()}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all text-xs cursor-pointer shadow-sm"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'AI is solving with step-by-step math...' : 'Ask AI Assistant'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-7 bg-white border border-slate-200/90 p-6 rounded-2xl shadow-card min-h-[300px] flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Resolution Logs</h3>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {resolvedList.length > 0 ? (
                resolvedList.map((item, i) => (
                  <div key={i} className="bg-white border border-slate-200 p-5 rounded-xl space-y-3 shadow-xs">
                    <span className="text-xs text-slate-900 font-bold block bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      Q: {item.doubt}
                    </span>
                    <div className="flex gap-3 text-xs text-slate-700 font-medium bg-blue-50/60 p-4 rounded-xl border border-blue-200/80">
                      <Brain className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div className="space-y-1 w-full">
                        <span className="font-bold text-blue-700 block text-[11px]">Gemini AI Solution:</span>
                        {item.loading ? (
                          <div className="flex items-center gap-2 text-blue-700 py-1">
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                            <span>Synthesizing step-by-step mathematical solution...</span>
                          </div>
                        ) : (
                          <MathRenderer content={item.answer} />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No active doubts submitted. Type a question or use the scientific keypad above to get instant AI answers.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
