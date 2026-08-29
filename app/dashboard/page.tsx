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

      {/* Quick Action Navigation Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={action.name} href={action.href}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`border rounded-2xl p-4 flex gap-4 items-center cursor-pointer transition-all hover:scale-102 ${action.color}`}
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <action.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{action.name}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{action.desc}</p>
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
