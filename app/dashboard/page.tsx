'use client'

import { StatCard } from '@/components/stat-card'
import { WeeklyStudyGraph, SubjectProgress, PerformanceAnalytics } from '@/components/chart-components'
import { Clock, Zap, BookOpen, Trophy, Play, Award, Brain, ScrollText } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function DashboardHome() {
  const quickActions = [
    { name: 'Continue Learning', icon: Play, href: '/dashboard/learn', desc: 'Pick up where you left off', color: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10' },
    { name: 'Start Mock Test', icon: Award, href: '/dashboard/mock-exams', desc: 'Test your understanding', color: 'border-purple-500/30 text-purple-400 bg-purple-500/5 hover:bg-purple-500/10' },
    { name: 'Ask AI Assistant', icon: Brain, href: '/dashboard/ai-assistant', desc: 'Resolve doubts instantly', color: 'border-green-500/30 text-green-400 bg-green-500/5 hover:bg-green-500/10' },
    { name: 'View Saved Notes', icon: ScrollText, href: '/dashboard/notes', desc: 'Read your generated notes', color: 'border-orange-500/30 text-orange-400 bg-orange-500/5 hover:bg-orange-500/10' },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-extrabold text-white tracking-tight"
          >
            Welcome back, <span className="gradient-text">Atik Imteyaz</span> 👋
          </motion.h1>
          <p className="text-gray-400 text-sm mt-1">Here is a summary of your study stats and progress for today.</p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-xs font-semibold text-cyan-400 shadow-[0_0_10px_rgba(0,212,255,0.1)]">
            <Zap className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
            Active Streak: 12 Days
          </span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Study Time" 
          value={46} 
          suffix=" hrs"
          trend="+5.4% this week" 
          trendType="up" 
          icon={Clock} 
        />
        <StatCard 
          title="Daily Streak" 
          value={12} 
          suffix=" Days"
          trend="+2 days boost" 
          trendType="up" 
          icon={Zap} 
        />
        <StatCard 
          title="Subjects Completed" 
          value={3} 
          trend="Steady" 
          trendType="neutral" 
          icon={BookOpen} 
        />
        <StatCard 
          title="Current Rank" 
          value={124} 
          prefix="#"
          trend="+15 positions" 
          trendType="up" 
          icon={Trophy} 
        />
      </div>

      {/* Resume Learning Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-3xl bg-gradient-to-r from-cyan-500/15 via-midnight-800 to-blue-600/15 border border-cyan-400/30 shadow-[0_0_25px_rgba(0,212,255,0.08)] relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider bg-cyan-400 text-midnight-950 uppercase">
              Current Syllabus Focus
            </span>
            <span className="text-xs text-cyan-300 font-semibold">
              CBSE Class 12 • Mathematics
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Runge-Kutta 4th Order & Calculus Proofs
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Step 3 of 4 in progress: $y_{'{n+1}'} = y_n + \frac{'{1}'}{'{6}'}(k_1 + 2k_2 + 2k_3 + k_4)$. Interactive step animation and derivation sandbox ready.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <Link href="/dashboard/learn">
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-midnight-950 font-black text-xs rounded-xl shadow-[0_0_15px_rgba(0,212,255,0.3)] flex items-center gap-2 transition-all cursor-pointer">
              <Play className="w-4 h-4 fill-midnight-950" />
              Resume Proof Step-by-Step
            </button>
          </Link>
          <Link href="/dashboard/mock-exams">
            <button className="px-4 py-3 bg-white/5 hover:bg-white/10 text-white font-bold text-xs rounded-xl border border-white/10 transition-all">
              Test Mastery
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Quick Action Navigation Grid */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Essential Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={action.name} href={action.href}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`border rounded-2xl p-4 flex gap-4 items-center cursor-pointer transition-all hover:scale-[1.02] shadow-xs ${action.color}`}
              >
                <div className="p-3 rounded-xl bg-white/10 border border-white/15 shrink-0">
                  <action.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white tracking-tight">{action.name}</h4>
                  <p className="text-xs text-slate-300 mt-0.5 leading-snug">{action.desc}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <WeeklyStudyGraph />
        <SubjectProgress />
        <PerformanceAnalytics />
      </div>
    </div>
  )
}
