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
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> 10-Year Verified Question Archive
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Previous Year <span className="text-blue-600">& Specimen Papers</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Access authentic 10-year official board & competitive papers with chapter-wise mark analysis.
          </p>
        </div>

        <Link href="/dashboard/mock-exams">
          <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-xs cursor-pointer">
            <Play className="w-3.5 h-3.5 fill-white" />
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
            className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold flex items-center justify-between shadow-xs"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>{downloadNotice}</span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Cloud Storage Sync</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter & Search Bar Controls */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-xs">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by subject, year, chapter (e.g. 'Optics', 'Physics 2024', 'Calculus')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 bg-slate-50/80 border border-slate-200/90 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {/* Class Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            {(['All', 'Class 12', 'Class 10', 'Competitive'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => setClassFilter(lvl)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  classFilter === lvl 
                    ? 'bg-blue-600 text-white shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            {(['All', 'Board', 'Specimen'] as const).map(tp => (
              <button
                key={tp}
                onClick={() => setTypeFilter(tp)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  typeFilter === tp 
                    ? 'bg-purple-600 text-white shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tp === 'All' ? 'All Types' : `${tp} Papers`}
              </button>
            ))}
          </div>

          {/* Subject Dropdown */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">Subject:</span>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer"
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
            className="bg-white border border-slate-200/90 hover:border-slate-300 p-6 rounded-2xl shadow-xs hover:shadow-card flex flex-col justify-between space-y-4 transition-all group"
          >
            <div>
              {/* Header tags */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/70">
                    {paper.board} • {paper.classLevel}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    paper.examType === 'Specimen' 
                      ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {paper.examType}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" /> {paper.year}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-900 mt-3 group-hover:text-blue-600 transition-colors">
                {paper.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">{paper.summary}</p>

              {/* 10-Year Weightage Breakdown Box */}
              <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                  <span className="flex items-center gap-1 text-blue-700">
                    <TrendingUp className="w-3.5 h-3.5" /> High-Yield Topic Weightage:
                  </span>
                  <span className="text-slate-500 font-semibold">Total: {paper.totalMarks} Marks</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {paper.highYieldTopics.map((topic, i) => (
                    <span key={i} className="text-[10px] font-medium bg-white border border-slate-200 text-slate-800 px-2.5 py-1 rounded-lg shadow-2xs">
                      {topic.topic} • <strong className="text-blue-600">{topic.marks}M</strong>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Size: {paper.size}</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActivePreviewPaper(paper)}
                  className="px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-200/80 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-600" /> Quick View
                </button>

                <button
                  onClick={() => handleDownload(paper)}
                  className="px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 hover:text-blue-700 hover:bg-slate-200/80 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>

                <Link href="/dashboard/mock-exams">
                  <button className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1 shadow-xs cursor-pointer">
                    <Play className="w-3 h-3 fill-white" /> Practice
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPapers.length === 0 && (
        <div className="text-center py-16 bg-white border border-slate-200/90 rounded-2xl space-y-3 shadow-xs">
          <History className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">No Question Papers Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keywords or switching filters to view other classes and subjects.
          </p>
        </div>
      )}

      {/* Quick View Paper Preview Modal */}
      <AnimatePresence>
        {activePreviewPaper && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      {activePreviewPaper.board} • {activePreviewPaper.classLevel}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Year {activePreviewPaper.year}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mt-2">{activePreviewPaper.title}</h2>
                </div>
                <button
                  onClick={() => setActivePreviewPaper(null)}
                  className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Blueprint & Instructions Preview */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider">Exam Blueprint & Guidelines:</h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {activePreviewPaper.summary}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">10-Year Mark Allocation Analysis:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activePreviewPaper.highYieldTopics.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                        <span className="text-slate-700 font-medium">{item.topic}</span>
                        <span className="font-bold text-blue-700">{item.marks} Marks</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    handleDownload(activePreviewPaper)
                    setActivePreviewPaper(null)
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-200/70 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>

                <Link href="/dashboard/mock-exams">
                  <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all flex items-center gap-1 shadow-xs cursor-pointer">
                    <Play className="w-3.5 h-3.5 fill-white" /> Start Practice Test
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
