'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  BookOpen, 
  Video, 
  FileText, 
  HelpCircle, 
  History, 
  CheckSquare, 
  Play, 
  Brain, 
  Code, 
  ChevronRight, 
  ChevronLeft, 
  Send,
  MessageSquare,
  Sparkles
} from 'lucide-react'

// Mock subjects data
const subjectsData = [
  {
    id: 'phy',
    name: 'Physics',
    color: 'from-blue-500/20 to-cyan-500/20 border-cyan-500/30',
    progress: 75,
    chaptersCount: 12,
    videosCount: 48,
    notesCount: 24,
    mcqsCount: 300,
    pyqsCount: 15,
    testsCount: 6,
    difficulty: 'Hard',
    timeEst: '45 hrs',
    chapters: [
      { id: 'phy1', name: 'Electrostatics', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', summary: 'Study of electric charges at rest. Explains Coulomb\'s law, electric field, and potential.', notes: 'Electric field is given by E = F/q. Coulomb\'s Law: F = k * (q1 * q2) / r^2.', formulas: ['F = k*q1*q2/r^2', 'E = F/q', 'V = W/q'], questions: ['Derive electric field due to dipole', 'State Gauss Theorem and prove it'], quiz: [{ q: 'What is the SI unit of electric charge?', o: ['Coulomb', 'Ampere', 'Volt', 'Ohm'], a: 0 }] },
      { id: 'phy2', name: 'Current Electricity', videoUrl: 'https://www.w3schools.com/html/movie.mp4', summary: 'Focuses on electric current, Ohm\'s law, Kirchhoff\'s laws, and resistance circuits.', notes: 'Ohm\'s law: V = IR. Kirchhoff\'s Current Law (KCL) & Voltage Law (KVL).', formulas: ['V = I*R', 'P = V*I = I^2*R', 'R = ρ*L/A'], questions: ['Explain Wheatstone Bridge network', 'State Kirchhoff\'s Laws'], quiz: [{ q: 'Ohm\'s law is valid for which conductors?', o: ['Ohmic', 'Non-ohmic', 'Semiconductors', 'All'], a: 0 }] }
    ]
  },
  {
    id: 'chm',
    name: 'Chemistry',
    color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    progress: 60,
    chaptersCount: 10,
    videosCount: 35,
    notesCount: 20,
    mcqsCount: 250,
    pyqsCount: 12,
    testsCount: 5,
    difficulty: 'Medium',
    timeEst: '38 hrs',
    chapters: [
      { id: 'chm1', name: 'Solid State', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', summary: 'Classification of solids, unit cells, close packing, and defects.', notes: 'Crystalline and amorphous solids. Cubic lattices (SCC, BCC, FCC).', formulas: ['Density = (z * M) / (a^3 * Na)', 'Packing efficiency of FCC = 74%'], questions: ['What are Schottky and Frenkel defects?', 'Calculate packing efficiency of BCC'], quiz: [{ q: 'Which unit cell has coordination number 12?', o: ['FCC', 'BCC', 'SCC', 'None'], a: 0 }] }
    ]
  },
  {
    id: 'mat',
    name: 'Mathematics',
    color: 'from-orange-500/20 to-red-500/20 border-orange-500/30',
    progress: 90,
    chaptersCount: 15,
    videosCount: 60,
    notesCount: 30,
    mcqsCount: 450,
    pyqsCount: 20,
    testsCount: 8,
    difficulty: 'Hard',
    timeEst: '55 hrs',
    chapters: [
      { id: 'mat1', name: 'Calculus', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', summary: 'Limits, continuity, differentiation, integration, and applications.', notes: 'Fundamental theorem of calculus. Chain rule and substitution.', formulas: ['d/dx (x^n) = n*x^(n-1)', '∫ x^n dx = x^(n+1)/(n+1) + C'], questions: ['Prove Mean Value Theorem', 'Integrate x * sin(x) dx'], quiz: [{ q: 'What is d/dx of ln(x)?', o: ['1/x', 'e^x', 'x', 'ln(x)'], a: 0 }] }
    ]
  },
  {
    id: 'bio',
    name: 'Biology',
    color: 'from-green-500/20 to-emerald-500/20 border-emerald-500/30',
    progress: 45,
    chaptersCount: 14,
    videosCount: 40,
    notesCount: 28,
    mcqsCount: 350,
    pyqsCount: 18,
    testsCount: 7,
    difficulty: 'Medium',
    timeEst: '42 hrs',
    chapters: [
      { id: 'bio1', name: 'Genetics', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', summary: 'Mendelian inheritance, DNA structure, replication, transcription, translation.', notes: 'Mendel\'s laws of inheritance. Double helix DNA structure model.', formulas: ['Hardy-Weinberg: p^2 + 2pq + q^2 = 1'], questions: ['State Mendel\'s Law of Segregation', 'Explain DNA Replication process'], quiz: [{ q: 'What is the start codon for translation?', o: ['AUG', 'UAA', 'UGA', 'UAG'], a: 0 }] }
    ]
  },
  {
    id: 'eng',
    name: 'English',
    color: 'from-blue-500/20 to-indigo-500/20 border-indigo-500/30',
    progress: 85,
    chaptersCount: 8,
    videosCount: 20,
    notesCount: 15,
    mcqsCount: 150,
    pyqsCount: 10,
    testsCount: 4,
    difficulty: 'Easy',
    timeEst: '20 hrs',
    chapters: [
      { id: 'eng1', name: 'Grammar rules', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', summary: 'Tenses, active/passive voice, direct/indirect speech, subject-verb agreement.', notes: 'Rules for active and passive voices. Modal auxiliary verbs.', formulas: ['Subject + Verb + Object'], questions: ['Change to indirect: He said, "I am writing."', 'Explain tenses with examples'], quiz: [{ q: 'Identify correct sentence:', o: ['He don\'t know.', 'He doesn\'t know.', 'He doesn\'t knows.', 'He don\'t knows.'], a: 1 }] }
    ]
  },
  {
    id: 'cs',
    name: 'Computer Science',
    color: 'from-cyan-500/20 to-teal-500/20 border-teal-500/30',
    progress: 95,
    chaptersCount: 11,
    videosCount: 38,
    notesCount: 22,
    mcqsCount: 280,
    pyqsCount: 14,
    testsCount: 5,
    difficulty: 'Medium',
    timeEst: '32 hrs',
    chapters: [
      { id: 'cs1', name: 'Data Structures', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', summary: 'Arrays, Linked Lists, Stacks, Queues, Trees, and Graph implementations.', notes: 'Stack is LIFO. Queue is FIFO. Node-based tree traversal methods.', formulas: ['Time Complexity: O(log N)', 'Space Complexity'], questions: ['Implement stack using array', 'Differentiate stack and queue'], quiz: [{ q: 'Which structure works on FIFO principle?', o: ['Queue', 'Stack', 'Tree', 'Graph'], a: 0 }] }
    ]
  }
]

export default function StartLearningPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('All')
  const [selectedBoard, setSelectedBoard] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')

  const [activeSubject, setActiveSubject] = useState<any>(null)
  const [activeChapter, setActiveChapter] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('video') // 'video', 'summary', 'notes', 'formulas', 'questions', 'quiz', 'doubts'

  // Doubt section state
  const [doubtText, setDoubtText] = useState('')
  const [doubtsList, setDoubtsList] = useState<string[]>([])

  // Quiz submission state
  const [selectedQuizAns, setSelectedQuizAns] = useState<number | null>(null)
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  // Filters calculation
  const filteredSubjects = subjectsData.filter((sub) => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = selectedDifficulty === 'All' || sub.difficulty === selectedDifficulty
    return matchesSearch && matchesDifficulty
  })

  const handleSendDoubt = () => {
    if (!doubtText.trim()) return
    setDoubtsList([...doubtsList, doubtText])
    setDoubtText('')
  }

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        {!activeSubject ? (
          // 1. Subjects Grid Browser
          <motion.div
            key="grid"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            {/* Search and Filters Header */}
            <div className="flex flex-col gap-6 bg-white/5 border border-white/10 p-6 rounded-2xl glow-hover">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <h1 className="text-3xl font-extrabold text-white tracking-tight">
                  Start <span className="gradient-text">Learning</span>
                </h1>
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search subject..."
                    className="w-full h-10 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-cyan-400/50 transition-all font-medium text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs text-gray-400 font-semibold block mb-1.5">Class</label>
                  <select 
                    value={selectedClass} 
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full h-10 px-3 bg-midnight-900 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-cyan-400/50 text-white"
                  >
                    <option>All</option>
                    <option>Class 10</option>
                    <option>Class 11</option>
                    <option>Class 12</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-semibold block mb-1.5">Board</label>
                  <select 
                    value={selectedBoard} 
                    onChange={(e) => setSelectedBoard(e.target.value)}
                    className="w-full h-10 px-3 bg-midnight-900 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-cyan-400/50 text-white"
                  >
                    <option>All</option>
                    <option>Andhra Pradesh Board</option>
                    <option>Bihar School Examination Board (BSEB)</option>
                    <option>Central Board of Secondary Education (CBSE)</option>
                    <option>Chhattisgarh Board (CGBSE)</option>
                    <option>Council for the Indian School Certificate Examinations (CISCE)</option>
                    <option>Gujarat Secondary and Higher Secondary Education Board (GSEB)</option>
                    <option>Haryana Board (BSEH)</option>
                    <option>Jharkhand Academic Council (JAC)</option>
                    <option>Karnataka Secondary Education Examination Board (KSEEB)</option>
                    <option>Kerala Board (DHSE / SCERT)</option>
                    <option>Madhya Pradesh Board (MPBSE)</option>
                    <option>Maharashtra State Board (MSBSHSE)</option>
                    <option>National Institute of Open Schooling (NIOS)</option>
                    <option>Odisha Board (BSE Odisha)</option>
                    <option>Punjab School Education Board (PSEB)</option>
                    <option>Rajasthan Board (RBSE)</option>
                    <option>Tamil Nadu State Board</option>
                    <option>Telangana State Board</option>
                    <option>Uttar Pradesh Board (UPMSP)</option>
                    <option>West Bengal Board (WBBSE / WBCHSE)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-semibold block mb-1.5">Difficulty</label>
                  <select 
                    value={selectedDifficulty} 
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full h-10 px-3 bg-midnight-900 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-cyan-400/50 text-white"
                  >
                    <option>All</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-semibold block mb-1.5">Sort By</label>
                  <select className="w-full h-10 px-3 bg-midnight-900 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-cyan-400/50 text-white">
                    <option>Progress</option>
                    <option>Difficulty</option>
                    <option>Alphabetical</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Subjects Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSubjects.map((sub, index) => (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  onClick={() => {
                    setActiveSubject(sub)
                    setActiveChapter(sub.chapters[0] || null)
                  }}
                  className={`bg-gradient-to-br ${sub.color} border rounded-3xl p-6 cursor-pointer flex flex-col justify-between h-96 relative group bento-card overflow-hidden`}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        sub.difficulty === 'Hard' 
                          ? 'bg-red-500/20 text-red-400' 
                          : sub.difficulty === 'Medium' 
                          ? 'bg-orange-500/20 text-orange-400' 
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {sub.difficulty}
                      </span>
                      <span className="text-xs font-bold text-gray-400">{sub.timeEst}</span>
                    </div>

                    <h3 className="text-2xl font-extrabold text-white mt-4">{sub.name}</h3>

                    {/* Subject metrics breakdown */}
                    <div className="grid grid-cols-3 gap-2 mt-6">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-2 text-center">
                        <Video className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                        <span className="text-xs font-extrabold text-white">{sub.videosCount}</span>
                        <div className="text-[10px] text-gray-400">Videos</div>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-2 text-center">
                        <FileText className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                        <span className="text-xs font-extrabold text-white">{sub.notesCount}</span>
                        <div className="text-[10px] text-gray-400">Notes</div>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-2 text-center">
                        <HelpCircle className="w-4 h-4 text-green-400 mx-auto mb-1" />
                        <span className="text-xs font-extrabold text-white">{sub.mcqsCount}</span>
                        <div className="text-[10px] text-gray-400">MCQs</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* Progress Bar */}
                    <div className="space-y-1.5 mt-6">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-cyan-400">{sub.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 border border-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyan-400" 
                          style={{ width: `${sub.progress}%` }} 
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between text-cyan-400 text-xs font-bold group-hover:text-cyan-300 transition-colors">
                      <span>View Chapter List</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          // 2. Main Expanded Subject View with Chapter Study Portal
          <motion.div
            key="portal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left side: Chapter select list */}
            <div className="lg:col-span-4 bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col space-y-4 h-[calc(100vh-120px)] sticky top-20 overflow-y-auto">
              <button 
                onClick={() => {
                  setActiveSubject(null)
                  setActiveChapter(null)
                }}
                className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors self-start mb-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Subjects
              </button>

              <div>
                <h2 className="text-2xl font-extrabold text-white">{activeSubject.name}</h2>
                <p className="text-xs text-gray-400 mt-1">Study chapters and syllabus list</p>
              </div>

              <div className="flex-1 space-y-2 overflow-y-auto pt-2">
                {activeSubject.chapters.map((ch: any) => {
                  const isCurrent = activeChapter?.id === ch.id
                  return (
                    <div
                      key={ch.id}
                      onClick={() => {
                        setActiveChapter(ch)
                        setDoubtText('')
                        setDoubtsList([])
                        setSelectedQuizAns(null)
                        setQuizSubmitted(false)
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                        isCurrent 
                          ? 'border-cyan-400/50 bg-cyan-400/10 text-cyan-400 glow-border' 
                          : 'border-white/5 bg-white/5 text-gray-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <span className="text-sm font-bold">{ch.name}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right side: Detailed Workspace tabs (Video, summary, quiz, notes, formulas) */}
            <div className="lg:col-span-8 space-y-6">
              {activeChapter ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
                  {/* Tab Navigation header */}
                  <div className="flex border-b border-white/10 overflow-x-auto bg-midnight-900/40">
                    {[
                      { id: 'video', label: 'Video Player', icon: Play },
                      { id: 'summary', label: 'AI Summary', icon: Brain },
                      { id: 'notes', label: 'Key Notes', icon: FileText },
                      { id: 'formulas', label: 'Formula Box', icon: Code },
                      { id: 'questions', label: 'Important Qs', icon: HelpCircle },
                      { id: 'quiz', label: 'Practice Quiz', icon: CheckSquare },
                      { id: 'doubts', label: 'Doubt Solver', icon: MessageSquare }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-3 text-xs font-extrabold border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
                          activeTab === tab.id
                            ? 'border-cyan-400 text-cyan-400 bg-cyan-400/5'
                            : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <tab.icon className="w-3.5 h-3.5" />
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content window */}
                  <div className="p-6 h-[450px] overflow-y-auto">
                    {activeTab === 'video' && (
                      <div className="w-full h-full flex flex-col justify-between">
                        <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center relative group">
                          <video 
                            src={activeChapter.videoUrl} 
                            controls 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-bold text-white mt-4">{activeChapter.name} Video Lecture</h3>
                      </div>
                    )}

                    {activeTab === 'summary' && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-xs font-semibold text-cyan-400 self-start w-fit">
                          <Sparkles className="w-4.5 h-4.5" />
                          Generated by Gemini AI
                        </div>
                        <h3 className="text-xl font-bold text-white">{activeChapter.name} AI Synopsis</h3>
                        <p className="text-gray-300 leading-relaxed text-sm">{activeChapter.summary}</p>
                      </div>
                    )}

                    {activeTab === 'notes' && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">Study Notes</h3>
                        <p className="text-gray-300 leading-relaxed text-sm bg-white/5 border border-white/10 p-4 rounded-xl">{activeChapter.notes}</p>
                      </div>
                    )}

                    {activeTab === 'formulas' && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">Formula cheatsheet</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {activeChapter.formulas.map((form: string, i: number) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl font-mono text-cyan-400 font-bold">
                              {form}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'questions' && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">Important conceptual questions</h3>
                        <div className="space-y-3">
                          {activeChapter.questions.map((q: string, i: number) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl">
                              <span className="text-xs font-bold text-cyan-400">Q{i+1}: {q}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'quiz' && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white">Quick Review Quiz</h3>
                        {activeChapter.quiz.map((qObj: any, index: number) => (
                          <div key={index} className="space-y-4">
                            <span className="text-sm font-bold text-white">{qObj.q}</span>
                            <div className="grid grid-cols-1 gap-2">
                              {qObj.o.map((opt: string, optI: number) => {
                                const isSelected = selectedQuizAns === optI
                                const isCorrect = optI === qObj.a
                                return (
                                  <button
                                    key={optI}
                                    disabled={quizSubmitted}
                                    onClick={() => setSelectedQuizAns(optI)}
                                    className={`p-3 rounded-xl border text-left text-sm transition-all ${
                                      quizSubmitted
                                        ? isCorrect
                                          ? 'border-green-500/50 bg-green-500/10 text-green-400'
                                          : isSelected
                                          ? 'border-red-500/50 bg-red-500/10 text-red-400'
                                          : 'border-white/5 bg-white/5 text-gray-500'
                                        : isSelected
                                        ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400'
                                        : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                )
                              })}
                            </div>
                            {!quizSubmitted ? (
                              <button
                                onClick={() => setQuizSubmitted(true)}
                                disabled={selectedQuizAns === null}
                                className="px-6 py-2.5 bg-cyan-400 text-midnight-900 rounded-xl font-bold hover:bg-cyan-300 disabled:opacity-50 transition-all text-xs"
                              >
                                Submit Answer
                              </button>
                            ) : (
                              <div className="text-xs font-bold text-cyan-400 animate-pulse">
                                Answer submitted! Review the accuracy markers.
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'doubts' && (
                      <div className="flex flex-col h-full justify-between">
                        <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                          <div className="bg-cyan-400/10 border border-cyan-400/20 p-4 rounded-xl text-xs text-cyan-400 leading-relaxed">
                            💡 Ask AI any question regarding this chapter (e.g. explain formula derivations, solve math equations, summarize specific topics).
                          </div>
                          {doubtsList.map((d, i) => (
                            <div key={i} className="space-y-2">
                              <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-xs text-right text-gray-300 w-fit ml-auto">
                                {d}
                              </div>
                              <div className="bg-cyan-400/10 border border-cyan-400/20 p-3 rounded-xl text-xs text-left text-cyan-400 w-fit">
                                AI Assistant answer summary has been computed for &quot;{d}&quot;. Contact AI Assistant page to detailed workspace layout.
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={doubtText}
                            onChange={(e) => setDoubtText(e.target.value)}
                            placeholder="Type your question..."
                            className="flex-1 h-10 px-4 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-cyan-400/50 text-white"
                          />
                          <button 
                            onClick={handleSendDoubt}
                            className="w-10 h-10 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-midnight-900 flex items-center justify-center transition-all"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Next Chapter footer controls */}
                  <div className="border-t border-white/10 p-4 flex justify-between bg-midnight-900/40">
                    <button className="px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5 text-xs text-gray-400">
                      Previous Chapter
                    </button>
                    <button className="px-4 py-2 bg-cyan-400/20 border border-cyan-400/50 text-cyan-400 rounded-xl hover:bg-cyan-400/30 text-xs font-bold glow-border">
                      Next Chapter
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-gray-400">
                  Select a chapter on the left sidebar to start learning.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
