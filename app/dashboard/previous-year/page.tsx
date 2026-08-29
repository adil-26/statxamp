'use client'

import { motion } from 'framer-motion'
import { History, Download, Eye, Calendar } from 'lucide-react'

export default function PreviousYearPapersPage() {
  const papers = [
    { title: 'CBSE Class 12 Physics Board Paper', year: 2024, subject: 'Physics', size: '2.4 MB' },
    { title: 'WB Class 12 Mathematics Board Paper', year: 2023, subject: 'Mathematics', size: '3.1 MB' },
    { title: 'JEE Main Phase 1 Consolidated Paper', year: 2024, subject: 'JEE Prep', size: '4.8 MB' },
    { title: 'CBSE Class 12 Chemistry Board Paper', year: 2023, subject: 'Chemistry', size: '2.1 MB' }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Previous Year <span className="gradient-text">Papers</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">Official Board and National competitive exam papers library.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {papers.map((paper, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex justify-between items-center hover:border-cyan-400/40 transition-all group">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center border border-cyan-400/20 group-hover:border-cyan-400/50 transition-colors">
                <History className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">{paper.title}</h4>
                <div className="flex items-center gap-3 text-xs text-gray-400 mt-1 font-semibold">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Year: {paper.year}</span>
                  <span>{paper.size}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                <Eye className="w-4.5 h-4.5" />
              </button>
              <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                <Download className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
