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
    <aside className="w-64 bg-white border-r border-slate-200/90 h-screen sticky top-0 flex flex-col justify-between p-4 overflow-y-auto z-30 shadow-xs">
      <div className="space-y-6">
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-3 px-2 py-1.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 
                          flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform text-white">
            <span className="text-base font-black">S</span>
          </div>
          <div>
            <span className="text-lg font-bold text-slate-900 tracking-tight block leading-tight">
              Stat<span className="text-blue-600">Xam</span>
            </span>
            <span className="text-[10px] font-medium text-slate-400 tracking-wide uppercase">
              Exam Platform
            </span>
          </div>
        </Link>

        {/* Navigation Sections */}
        <div className="space-y-5">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <h4 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {section.title}
              </h4>
              <div className="space-y-0.5 pt-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon

                  return (
                    <Link key={item.name} href={item.href}>
                      <div className={`relative flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                        isActive 
                          ? 'text-blue-700 bg-blue-50/80 border border-blue-200/70 font-semibold shadow-xs' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
                      }`}>
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 transition-transform group-hover:scale-105 ${
                            isActive ? 'text-blue-600 stroke-[2.5]' : 'text-slate-400 group-hover:text-slate-600 stroke-2'
                          }`} />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                            isActive 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
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

      {/* Bottom AI Generator Card */}
      <div className="pt-4 border-t border-slate-200/80">
        <Link href="/ai-generator">
          <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 rounded-xl hover:border-blue-300 hover:shadow-xs transition-all group cursor-pointer text-xs font-semibold text-blue-900">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 group-hover:rotate-12 transition-transform" />
                AI Exam Generator
              </span>
              <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">
                New
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-normal mt-1 leading-snug">
              Generate custom chapter tests & marking schemes
            </p>
          </div>
        </Link>
      </div>
    </aside>
  )
}
