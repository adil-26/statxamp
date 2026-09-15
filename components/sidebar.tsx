'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  BookOpen, 
  Brain, 
  FileCheck2, 
  History, 
  Award, 
  ScrollText, 
  HelpCircle, 
  Trophy, 
  BarChart3, 
  User, 
  Settings,
  Sparkles
} from 'lucide-react'

interface NavSection {
  title: string
  items: {
    name: string
    href: string
    icon: any
    badge?: string
  }[]
}

const navSections: NavSection[] = [
  {
    title: 'Study Hub',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Start Learning', href: '/dashboard/learn', icon: BookOpen, badge: 'Proofs' },
      { name: 'Practice Tests', href: '/dashboard/practice-tests', icon: FileCheck2 },
      { name: 'Previous Year Papers', href: '/dashboard/previous-year', icon: History },
      { name: 'Mock Exams', href: '/dashboard/mock-exams', icon: Award },
      { name: 'Revision Notes', href: '/dashboard/notes', icon: ScrollText },
    ]
  },
  {
    title: 'AI Superpowers',
    items: [
      { name: 'AI Study Assistant', href: '/dashboard/ai-assistant', icon: Brain },
      { name: 'Ask Doubts (AI Tutor)', href: '/dashboard/doubts', icon: HelpCircle, badge: 'Live' },
    ]
  },
  {
    title: 'Performance & Growth',
    items: [
      { name: 'National Leaderboard', href: '/dashboard/leaderboard', icon: Trophy },
      { name: 'Analytics & Insights', href: '/dashboard/analytics', icon: BarChart3 },
      { name: 'My Profile', href: '/dashboard/profile', icon: User },
      { name: 'Settings & Board', href: '/dashboard/settings', icon: Settings },
    ]
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-midnight-900/90 backdrop-blur-xl border-r border-cyan-400/20 h-screen sticky top-0 flex flex-col justify-between p-4 overflow-y-auto z-30">
      <div className="space-y-6">
        <Link href="/" className="flex items-center gap-3 px-2 py-1 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 
                          flex items-center justify-center glow-border group-hover:scale-105 transition-transform">
            <span className="text-lg font-bold gradient-text">S</span>
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            Stat<span className="text-cyan-400">Xam</span>
          </span>
        </Link>

        <div className="space-y-5">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <h4 className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                {section.title}
              </h4>
              <div className="space-y-0.5 pt-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon

                  return (
                    <Link key={item.name} href={item.href}>
                      <div className={`relative flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group cursor-pointer ${
                        isActive 
                          ? 'text-cyan-300 bg-cyan-400/15 border border-cyan-400/30 shadow-[0_0_12px_rgba(0,212,255,0.15)]' 
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}>
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-cyan-400 stroke-[2.5]' : 'text-slate-400 group-hover:text-cyan-300'}`} />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-black ${
                            isActive 
                              ? 'bg-cyan-400 text-midnight-950' 
                              : 'bg-white/10 text-cyan-300 border border-cyan-400/20'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-cyan-400/15">
        <Link href="/ai-generator">
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 border border-cyan-400/30 rounded-2xl hover:glow-border transition-all group cursor-pointer text-xs font-bold text-cyan-300 shadow-sm">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
              AI Mock Generator
            </span>
            <span className="text-[10px] bg-cyan-400/20 px-1.5 py-0.5 rounded-md border border-cyan-400/30 font-extrabold text-cyan-300">
              Pro
            </span>
          </div>
        </Link>
      </div>
    </aside>
  )
}
