'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  History, 
  Download, 
  Eye, 
  Calendar, 
  Search, 
  Filter, 
  Sparkles, 
  FileText, 
  X, 
  Play, 
  TrendingUp,
  BookOpen,
  Award,
  CheckCircle2
} from 'lucide-react'
import Link from 'next/link'
import { PAST_PAPERS_DATABASE, PastPaper } from '@/lib/exam-data'

export default function PreviousYearPapersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [classFilter, setClassFilter] = useState<'All' | 'Class 10' | 'Class 12' | 'Competitive'>('All')
  const [subjectFilter, setSubjectFilter] = useState<string>('All')
  const [typeFilter, setTypeFilter] = useState<'All' | 'Board' | 'Specimen' | 'Competitive'>('All')
  
  // Quick View Modal state
  const [activePreviewPaper, setActivePreviewPaper] = useState<PastPaper | null>(null)
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null)

  const subjectsList = ['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science', 'PCM (Physics, Chem, Math)']

  // Filtered dataset
  const filteredPapers = useMemo(() => {
    return PAST_PAPERS_DATABASE.filter(paper => {
      const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            paper.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            paper.summary.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesClass = classFilter === 'All' || paper.classLevel === classFilter
      const matchesSubject = subjectFilter === 'All' || paper.subject.toLowerCase().includes(subjectFilter.toLowerCase())
      const matchesType = typeFilter === 'All' || paper.examType === typeFilter

      return matchesSearch && matchesClass && matchesSubject && matchesType
    })
  }, [searchQuery, classFilter, subjectFilter, typeFilter])

  const handleDownload = (paper: PastPaper) => {
    setDownloadNotice(`Downloading: ${paper.title} (${paper.size})...`)
    setTimeout(() => {
      setDownloadNotice(null)
    }, 3500)
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" /> 10-Year Verified Question Archive
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Previous Year <span className="gradient-text">& Specimen Papers</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Access authentic 10-year official board & competitive papers with AI chapter-wise mark analysis.
          </p>
        </div>

        <Link href="/dashboard/mock-exams">
          <button className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-midnight-900 font-bold text-xs flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,212,255,0.25)]">
            <Play className="w-3.5 h-3.5 fill-midnight-900" />
            Take Mock Tests
          </button>
        </Link>
      </div>

      {/* Download Alert Toast */}
      <AnimatePresence>
        {downloadNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 rounded-2xl bg-cyan-400/15 border border-cyan-400/40 text-cyan-300 text-xs font-semibold flex items-center justify-between shadow-[0_0_20px_rgba(0,212,255,0.2)]"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>{downloadNotice}</span>
            </div>
            <span className="text-[10px] text-gray-400">Drive Cloud Storage Sync</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter & Search Bar Controls */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by subject, year, chapter (e.g. 'Optics', 'Physics 2024', 'Calculus')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-all font-medium"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* Class Filter */}
          <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
            {(['All', 'Class 12', 'Class 10', 'Competitive'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => setClassFilter(lvl)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  classFilter === lvl 
                    ? 'bg-cyan-400 text-midnight-900 shadow-sm' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
            {(['All', 'Board', 'Specimen'] as const).map(tp => (
              <button
                key={tp}
                onClick={() => setTypeFilter(tp)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  typeFilter === tp 
                    ? 'bg-purple-500 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tp === 'All' ? 'All Types' : `${tp} Papers`}
              </button>
            ))}
          </div>

          {/* Subject Dropdown */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-gray-400 font-semibold">Subject:</span>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="bg-midnight-900 border border-white/10 text-white text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-400/50"
            >
              {subjectsList.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Question Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPapers.map((paper) => (
          <motion.div
            key={paper.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 p-6 rounded-3xl glow-hover flex flex-col justify-between space-y-4 relative bento-card"
          >
            <div>
              {/* Header tags */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-cyan-400 bg-cyan-400/10 px-2.5 py-0.5 rounded-full border border-cyan-400/20">
                    {paper.board} • {paper.classLevel}
                  </span>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    paper.examType === 'Specimen' 
                      ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' 
                      : 'bg-white/10 text-gray-300'
                  }`}>
                    {paper.examType}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" /> {paper.year}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mt-3">{paper.title}</h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed line-clamp-2">{paper.summary}</p>

              {/* 10-Year Weightage Breakdown Box */}
              <div className="mt-4 p-3.5 rounded-2xl bg-cyan-400/5 border border-cyan-400/15 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-cyan-400">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> High-Yield Topic Weightage:
                  </span>
                  <span>Total: {paper.totalMarks} Marks</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {paper.highYieldTopics.map((topic, i) => (
                    <span key={i} className="text-[10px] font-medium bg-midnight-900/60 border border-cyan-400/30 text-gray-200 px-2.5 py-1 rounded-lg">
                      {topic.topic} • <strong className="text-cyan-400">{topic.marks}M</strong>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-gray-500 font-semibold">Size: {paper.size}</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActivePreviewPaper(paper)}
                  className="px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" /> Quick View
                </button>

                <button
                  onClick={() => handleDownload(paper)}
                  className="px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-cyan-400 hover:bg-white/10 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>

                <Link href="/dashboard/mock-exams">
                  <button className="px-3.5 py-2 bg-cyan-400 hover:bg-cyan-300 text-midnight-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-[0_0_10px_rgba(0,212,255,0.2)] cursor-pointer">
                    <Play className="w-3 h-3 fill-midnight-900" /> Practice
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPapers.length === 0 && (
        <div className="text-center py-16 bg-white/5 border border-white/10 rounded-3xl space-y-3">
          <History className="w-10 h-10 text-gray-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Question Papers Found</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Try adjusting your search keywords or switching filters to view other classes and subjects.
          </p>
        </div>
      )}

      {/* Quick View Paper Preview Modal */}
      <AnimatePresence>
        {activePreviewPaper && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-midnight-900 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-cyan-400 bg-cyan-400/10 px-2.5 py-0.5 rounded-full border border-cyan-400/20">
                      {activePreviewPaper.board} • {activePreviewPaper.classLevel}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">Year {activePreviewPaper.year}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mt-2">{activePreviewPaper.title}</h2>
                </div>
                <button
                  onClick={() => setActivePreviewPaper(null)}
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Blueprint & Instructions Preview */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Exam Blueprint & Guidelines:</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {activePreviewPaper.summary}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">10-Year Mark Allocation Analysis:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activePreviewPaper.highYieldTopics.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                        <span className="text-gray-300 font-medium">{item.topic}</span>
                        <span className="font-extrabold text-cyan-400">{item.marks} Marks</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    handleDownload(activePreviewPaper)
                    setActivePreviewPaper(null)
                  }}
                  className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-xs hover:bg-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Download Full PDF
                </button>

                <Link href="/dashboard/mock-exams">
                  <button className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-midnight-900 font-bold text-xs transition-all flex items-center gap-1 shadow-[0_0_10px_rgba(0,212,255,0.2)] cursor-pointer">
                    <Play className="w-3.5 h-3.5 fill-midnight-900" /> Start CBT Mock Practice
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
