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

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Start Learning', href: '/dashboard/learn', icon: BookOpen },
  { name: 'AI Assistant', href: '/dashboard/ai-assistant', icon: Brain },
  { name: 'Practice Tests', href: '/dashboard/practice-tests', icon: FileCheck2 },
  { name: 'Previous Year Papers', href: '/dashboard/previous-year', icon: History },
  { name: 'Mock Exams', href: '/dashboard/mock-exams', icon: Award },
  { name: 'Notes', href: '/dashboard/notes', icon: ScrollText },
  { name: 'Doubts', href: '/dashboard/doubts', icon: HelpCircle },
  { name: 'Leaderboard', href: '/dashboard/leaderboard', icon: Trophy },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-midnight-900 border-r border-cyan-400/20 h-screen sticky top-0 flex flex-col justify-between p-4 overflow-y-auto">
      <div className="space-y-6">
        <Link href="/" className="flex items-center gap-3 px-2 py-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 
                          flex items-center justify-center glow-border">
            <span className="text-lg font-bold gradient-text">S</span>
          </div>
          <span className="text-lg font-bold">
            Stat<span className="text-cyan-400">Xam</span>
          </span>
        </Link>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <div className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group cursor-pointer ${
                  isActive 
                    ? 'text-cyan-400 bg-cyan-400/10' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}>
                  {isActive && (
                    <motion.div 
                      layoutId="active-nav-glow" 
                      className="absolute inset-0 border border-cyan-400/40 rounded-xl glow-border pointer-events-none"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-cyan-400' : 'text-gray-400 group-hover:text-cyan-400'}`} />
                  {item.name}
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-cyan-400/10">
        <Link href="/ai-generator">
          <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-2xl hover:glow-border transition-all group cursor-pointer text-sm font-semibold text-cyan-400">
            <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
            Try AI Generator
          </div>
        </Link>
      </div>
    </aside>
  )
}
