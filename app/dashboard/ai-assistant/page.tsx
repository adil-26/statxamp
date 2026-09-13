'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Sparkles, Brain, Calculator, FileText, CheckSquare, Calendar, RefreshCw } from 'lucide-react'
import { MathRenderer } from '@/components/math-renderer'
import { VirtualScientificKeyboard } from '@/components/virtual-scientific-keyboard'

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: "Hello! I am your AI Study Assistant. I can explain complex syllabus concepts, solve maths with exact mathematical symbols, derive formulas, or organize a personalized study plan for you. What would you like to solve today?" }
  ])
  const [inputVal, setInputVal] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

  const capabilities = [
    { title: 'Explain concepts', desc: 'Break down complex theory', icon: Brain, prompt: 'Explain the theory of general relativity in simple terms.' },
    { title: 'Solve maths', desc: 'Step-by-step math solver', icon: Calculator, prompt: 'Solve: ∫ x * ln(x) dx step-by-step.' },
    { title: 'Generate notes', desc: 'Instant revision summaries', icon: FileText, prompt: 'Generate quick revision notes for organic chemistry aldehydes.' },
    { title: 'Create quizzes', desc: 'Mock quiz generator', icon: CheckSquare, prompt: 'Generate a 5-question multiple choice quiz on cell structures.' },
    { title: 'Daily study planner', desc: 'Schedule calendar rules', icon: Calendar, prompt: 'Help me plan a 4-hour daily study schedule for JEE exam prep.' }
  ]

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return
    const userMsg = text.trim()
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }])
    setInputVal('')
    setIsTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      })

      const data = await res.json()
      setMessages((prev) => [
        ...prev, 
        { sender: 'ai', text: data.reply || data.error || 'I was unable to process your request.' }
      ])
    } catch (err) {
      setMessages((prev) => [
        ...prev, 
        { sender: 'ai', text: 'Connection error while communicating with Gemini AI Assistant. Please check your network or try again.' }
      ])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-120px)]">
      {/* Left Column: Chat Area */}
      <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between overflow-hidden h-full">
        {/* Chat Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-midnight-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center border border-cyan-400/20">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Gemini AI Assistant</h3>
              <p className="text-[10px] text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                Online & Ready
              </p>
            </div>
          </div>
          <button 
            onClick={() => setMessages([{ sender: 'ai', text: "Hello! I am your AI Study Assistant. I can explain complex syllabus concepts, solve maths, write revision notes, create custom quizzes, or organize a personalized study plan for you. What would you like to build today?" }])}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Messages List Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed border ${
                m.sender === 'user'
                  ? 'bg-cyan-400/15 border-cyan-400/40 text-white rounded-tr-none shadow-[0_0_12px_rgba(0,212,255,0.15)]'
                  : 'bg-white/5 border-white/10 text-gray-200 rounded-tl-none'
              }`}>
                {m.sender === 'user' ? (
                  <div className="whitespace-pre-line font-medium">{m.text}</div>
                ) : (
                  <MathRenderer content={m.text} />
                )}
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-2 text-cyan-400 text-xs font-semibold">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                <span>StatXam AI is deriving step-by-step formulas...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input box with Virtual Scientific Keyboard */}
        <div className="p-4 border-t border-white/10 bg-midnight-900/60 space-y-3">
          <VirtualScientificKeyboard
            isOpen={isKeyboardOpen}
            onToggle={() => setIsKeyboardOpen(!isKeyboardOpen)}
            onInsert={(sym) => setInputVal((prev) => prev + sym)}
          />

          <form 
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage(inputVal)
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask math/physics formulas (e.g. Solve dy/dx = x+y using RK4, Dirac delta...)"
              className="flex-1 h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-cyan-400/50 text-white font-medium placeholder-gray-500"
            />
            <button 
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              className="w-12 h-12 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-midnight-900 font-bold rounded-xl flex items-center justify-center transition-all shadow-[0_0_15px_rgba(0,212,255,0.3)] cursor-pointer shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Right Column: Capabilities and Prompt Suggestions */}
      <div className="lg:col-span-4 space-y-4 overflow-y-auto h-full pr-1">
        <h3 className="font-extrabold text-sm text-cyan-400">Suggested Prompts</h3>
        <div className="grid grid-cols-1 gap-3">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              onClick={() => handleSendMessage(cap.prompt)}
              className="p-3.5 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-all flex gap-3 group bento-card text-left"
            >
              <div className="p-2.5 h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400/10 transition-colors">
                <cap.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">{cap.title}</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">{cap.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
