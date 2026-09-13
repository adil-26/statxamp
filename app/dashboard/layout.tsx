'use client'

import { Sidebar } from '@/components/sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Bell, 
  Menu, 
  Sparkles, 
  X, 
  Flame, 
  ChevronRight,
  BookOpen,
  LayoutDashboard,
  Brain,
  FileCheck2,
  History,
  Award,
  ScrollText,
  HelpCircle,
  Trophy,
  BarChart3,
  User,
  Settings
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const mobileDrawerNav = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Start Learning (Proofs)', href: '/dashboard/learn', icon: BookOpen, badge: 'New' },
  { name: 'AI Study Assistant', href: '/dashboard/ai-assistant', icon: Brain },
  { name: 'AI Mock Generator', href: '/ai-generator', icon: Sparkles, badge: 'AI' },
  { name: 'Practice Topic Tests', href: '/dashboard/practice-tests', icon: FileCheck2 },
  { name: 'Previous 10-Yr Papers', href: '/dashboard/previous-year', icon: History },
  { name: 'Full Mock Exams', href: '/dashboard/mock-exams', icon: Award },
  { name: 'Revision Notes', href: '/dashboard/notes', icon: ScrollText },
  { name: 'Ask Doubts (AI Tutor)', href: '/dashboard/doubts', icon: HelpCircle },
  { name: 'National Leaderboard', href: '/dashboard/leaderboard', icon: Trophy },
  { name: 'Performance Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'My Profile', href: '/dashboard/profile', icon: User },
  { name: 'Settings & Board', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-midnight-950 text-white flex flex-col lg:flex-row antialiased select-none-touch">
      {/* Sidebar for desktop screens */}
      <div className="hidden lg:block shrink-0">
        <Sidebar />
      </div>

      {/* App-like Slide-Over Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            {/* Backdrop blur overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Drawer Sheet */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-4/5 max-w-xs bg-midnight-900 border-r border-cyan-400/20 h-full flex flex-col justify-between p-5 z-10 overflow-y-auto shadow-2xl"
            >
              <div className="space-y-6">
                {/* Header with App Brand & Close Button */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <Link 
                    href="/dashboard" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-black text-midnight-950 text-sm shadow-[0_0_10px_rgba(0,212,255,0.4)]">
                      S
                    </div>
                    <span className="font-extrabold text-base tracking-tight text-white">
                      Stat<span className="gradient-text">Xam</span>
                    </span>
                  </Link>

                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile User Profile Card */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-white/5 to-cyan-400/10 border border-cyan-400/20 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-midnight-950 font-black text-sm shrink-0 border border-cyan-300/50 shadow-[0_0_12px_rgba(0,212,255,0.3)]">
                    AI
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-extrabold text-white text-sm truncate">Atik Imteyaz</h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] font-bold text-cyan-300 bg-cyan-400/20 px-2 py-0.2 rounded-full">
                        Rank #124
                      </span>
                      <span className="text-[10px] text-gray-400">Class 12</span>
                    </div>
                  </div>
                </div>

                {/* Navigation Links Group */}
                <nav className="space-y-1">
                  {mobileDrawerNav.map(item => {
                    const isActive = pathname === item.href
                    const Icon = item.icon

                    return (
                      <Link 
                        key={item.name} 
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          isActive 
                            ? 'bg-cyan-400/15 text-cyan-300 border border-cyan-400/30' 
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}>
                          <div className="flex items-center gap-3">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
                            <span>{item.name}</span>
                          </div>
                          {item.badge && (
                            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-cyan-400 text-midnight-950">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </Link>
                    )
                  })}
                </nav>
              </div>

              {/* Bottom Quick Action */}
              <div className="pt-4 border-t border-white/10 mt-6">
                <Link href="/ai-generator" onClick={() => setMobileMenuOpen(false)}>
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-between text-xs font-bold text-cyan-300">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 animate-spin text-cyan-400" /> Open AI Engine
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main App Canvas */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* App-Style Header (Sticky on Mobile & Desktop) */}
        <header className="h-14 sm:h-16 border-b border-cyan-400/10 px-4 sm:px-6 flex items-center justify-between bg-midnight-950/90 backdrop-blur-xl sticky top-0 z-40">
          {/* Left: Mobile App Bar Header / Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)} 
              aria-label="Open Navigation Drawer"
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-cyan-400 active:scale-95 transition-transform"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Mobile Brand Title */}
            <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-midnight-950 font-black text-xs shadow-[0_0_8px_rgba(0,212,255,0.4)]">
                S
              </div>
              <span className="text-sm font-extrabold text-white">
                Stat<span className="text-cyan-400">Xam</span>
              </span>
            </Link>

            {/* Desktop Search Bar */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search chapters, formulas, tests..." 
                className="w-80 h-10 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-cyan-400/50 transition-all font-medium"
              />
            </div>
          </div>

          {/* Right Header Badges & Actions */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Rank / Streak Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-xl bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 text-[11px] font-bold text-orange-300">
              <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
              <span>Rank #124</span>
            </div>

            {/* AI Generator CTA (Desktop) */}
            <Link href="/ai-generator" className="hidden sm:block">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-cyan-400/10 border border-cyan-400/30 rounded-xl cursor-pointer hover:bg-cyan-400/20 transition-all font-semibold text-xs text-cyan-400"
              >
                <Sparkles className="w-3.5 h-3.5" />
                AI Generator
              </motion.div>
            </Link>

            {/* Notification Bell */}
            <button className="relative w-9 h-9 sm:w-10 sm:h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-300 active:scale-95 transition-transform">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 ring-4 ring-midnight-950" />
            </button>

            {/* Profile Avatar */}
            <Link href="/dashboard/profile" className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-midnight-950 font-extrabold text-xs sm:text-sm border border-cyan-300/40 shadow-[0_0_10px_rgba(0,212,255,0.3)]">
                AI
              </div>
              <div className="hidden md:block">
                <div className="text-xs font-bold text-white leading-tight">Atik Imteyaz</div>
                <div className="text-[10px] text-gray-400 font-medium">CBSE • Class 12</div>
              </div>
            </Link>
          </div>
        </header>

        {/* Dashboard Main Page Content Wrapper (with pb-28 on mobile for bottom dock!) */}
        <main className="flex-1 p-3.5 sm:p-6 pb-28 lg:pb-8 relative overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Native App-Style Bottom Navigation Dock for Mobile Devices */}
      <MobileBottomNav />
    </div>
  )
}

