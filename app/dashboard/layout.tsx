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
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface DrawerCategory {
  title: string
  items: {
    name: string
    href: string
    icon: any
    badge?: string
  }[]
}

const mobileDrawerSections: DrawerCategory[] = [
  {
    title: 'Study Hub',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Start Learning (Proofs)', href: '/dashboard/learn', icon: BookOpen, badge: 'Proofs' },
      { name: 'Practice Topic Tests', href: '/dashboard/practice-tests', icon: FileCheck2 },
      { name: 'Previous 10-Yr Papers', href: '/dashboard/previous-year', icon: History },
      { name: 'Full Mock Exams', href: '/dashboard/mock-exams', icon: Award },
      { name: 'Revision Notes', href: '/dashboard/notes', icon: ScrollText },
    ]
  },
  {
    title: 'AI Superpowers',
    items: [
      { name: 'AI Study Assistant', href: '/dashboard/ai-assistant', icon: Brain },
      { name: 'Ask Doubts (AI Tutor)', href: '/dashboard/doubts', icon: HelpCircle, badge: 'Live' },
      { name: 'AI Mock Generator', href: '/ai-generator', icon: Sparkles, badge: 'AI' },
    ]
  },
  {
    title: 'Performance & Growth',
    items: [
      { name: 'National Leaderboard', href: '/dashboard/leaderboard', icon: Trophy },
      { name: 'Performance Analytics', href: '/dashboard/analytics', icon: BarChart3 },
      { name: 'My Profile', href: '/dashboard/profile', icon: User },
      { name: 'Settings & Board', href: '/dashboard/settings', icon: Settings },
    ]
  }
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sightComfort, setSightComfort] = useState(false)
  const pathname = usePathname()

  // Load and persist sight comfort preference
  useEffect(() => {
    const saved = localStorage.getItem('statxam_sight_comfort')
    if (saved === 'true') {
      setSightComfort(true)
      document.documentElement.classList.add('sight-comfortable')
    }
  }, [])

  const toggleSightComfort = () => {
    const next = !sightComfort
    setSightComfort(next)
    if (next) {
      document.documentElement.classList.add('sight-comfortable')
      localStorage.setItem('statxam_sight_comfort', 'true')
    } else {
      document.documentElement.classList.remove('sight-comfortable')
      localStorage.setItem('statxam_sight_comfort', 'false')
    }
  }

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row antialiased ${sightComfort ? 'sight-comfortable' : ''}`}>
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
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            {/* Drawer Sheet */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-4/5 max-w-xs bg-white border-r border-slate-200 h-full flex flex-col justify-between p-5 z-10 overflow-y-auto shadow-xl"
            >
              <div className="space-y-6">
                {/* Header with App Brand & Close Button */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <Link 
                    href="/dashboard" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-black text-white text-sm shadow-xs">
                      S
                    </div>
                    <span className="font-extrabold text-base tracking-tight text-slate-900">
                      Stat<span className="text-blue-600">Xam</span>
                    </span>
                  </Link>

                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close navigation menu"
                    className="p-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile User Profile Card */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0 border border-blue-200">
                    AI
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-900 text-sm truncate">Atik Imteyaz</h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-full">
                        Rank #124
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">Class 12 • CBSE</span>
                    </div>
                  </div>
                </div>

                {/* Navigation Links Grouped by Category */}
                <nav className="space-y-4">
                  {mobileDrawerSections.map(sec => (
                    <div key={sec.title} className="space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">
                        {sec.title}
                      </div>
                      <div className="space-y-0.5">
                        {sec.items.map(item => {
                          const isActive = pathname === item.href
                          const Icon = item.icon

                          return (
                            <Link 
                              key={item.name} 
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <div className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                                isActive 
                                  ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200/70 shadow-xs' 
                                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                              }`}>
                                <div className="flex items-center gap-2.5">
                                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                                  <span>{item.name}</span>
                                </div>
                                {item.badge && (
                                  <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-blue-600 text-white">
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
                </nav>
              </div>

              {/* Bottom Quick Action */}
              <div className="pt-4 border-t border-slate-200 mt-6 space-y-2">
                <button
                  onClick={toggleSightComfort}
                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-xs font-semibold transition-all ${
                    sightComfort 
                      ? 'bg-blue-50 border-blue-300 text-blue-700' 
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    Sight Comfort Mode
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-bold">
                    {sightComfort ? 'ON' : 'OFF'}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main App Canvas */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* App-Style Header (Sticky on Mobile & Desktop) */}
        <header className="h-14 sm:h-16 border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-xs">
          {/* Left: Mobile App Bar Header / Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)} 
              aria-label="Open Navigation Drawer"
              className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200/70 active:scale-95 transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Mobile Brand Title */}
            <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-xs">
                S
              </div>
              <span className="text-sm font-extrabold text-slate-900">
                Stat<span className="text-blue-600">Xam</span>
              </span>
            </Link>

            {/* Desktop Search Bar */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search chapters, formulas, tests..." 
                className="w-80 h-9.5 pl-10 pr-4 bg-slate-100/80 border border-slate-200/90 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
              />
            </div>
          </div>

          {/* Right Header Badges & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sight Comfort Quick Toggle */}
            <button
              onClick={toggleSightComfort}
              title="Toggle Sight Comfort (Enlarges formulas and optimizes reading contrast)"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                sightComfort
                  ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-xs'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/70'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${sightComfort ? 'text-blue-600' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Sight Comfort</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-bold">
                {sightComfort ? 'Aa+' : 'Aa'}
              </span>
            </button>

            {/* Rank / Streak Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] font-semibold text-amber-800">
              <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span>Rank #124</span>
            </div>

            {/* AI Generator CTA (Desktop) */}
            <Link href="/ai-generator" className="hidden sm:block">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 border border-blue-600 rounded-xl cursor-pointer transition-all font-semibold text-xs text-white shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                AI Generator
              </motion.div>
            </Link>

            {/* Notification Bell */}
            <button 
              aria-label="View notifications"
              className="relative w-9 h-9 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 active:scale-95 transition-all"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
            </button>

            {/* Profile Avatar */}
            <Link href="/dashboard/profile" className="flex items-center gap-2.5 pl-1">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs border border-blue-200 shadow-xs">
                AI
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">Atik Imteyaz</div>
                <div className="text-[10px] text-slate-500 font-medium">CBSE • Class 12</div>
              </div>
            </Link>
          </div>
        </header>

        {/* Dashboard Main Page Content Wrapper (with pb-28 on mobile for bottom dock!) */}
        <main className="flex-1 p-4 sm:p-6 pb-28 lg:pb-8 relative overflow-x-hidden max-w-7xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
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

