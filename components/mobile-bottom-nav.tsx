'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  BookOpen, 
  Sparkles, 
  FileCheck2, 
  HelpCircle,
  Award,
  User
} from 'lucide-react'

interface MobileNavItem {
  name: string
  href: string
  icon: any
  badge?: string
  isCenterPill?: boolean
}

const navItems: MobileNavItem[] = [
  { name: 'Home', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Learn', href: '/dashboard/learn', icon: BookOpen, badge: 'Proofs' },
  { name: 'AI Studio', href: '/ai-generator', icon: Sparkles, isCenterPill: true },
  { name: 'Tests', href: '/dashboard/mock-exams', icon: FileCheck2 },
  { name: 'Doubts', href: '/dashboard/doubts', icon: HelpCircle }
]

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav 
      aria-label="Mobile Bottom App Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-midnight-950/95 backdrop-blur-2xl border-t border-cyan-400/20 px-3 py-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_rgba(0,0,0,0.8)]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          const Icon = item.icon

          // Center AI Studio Raised Button (iOS / Android Style Float)
          if (item.isCenterPill) {
            return (
              <Link key={item.name} href={item.href} className="relative -top-5 focus:outline-none">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center"
                >
                  <div className={`w-13 h-13 rounded-2xl p-0.5 bg-gradient-to-tr from-cyan-500 via-cyan-400 to-blue-500 shadow-[0_0_20px_rgba(0,212,255,0.5)] flex items-center justify-center ${
                    isActive ? 'ring-2 ring-white/60' : ''
                  }`}>
                    <div className="w-full h-full rounded-[14px] bg-midnight-900 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-cyan-300 animate-pulse" />
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-cyan-300 mt-1 tracking-tight">
                    {item.name}
                  </span>
                </motion.div>
              </Link>
            )
          }

          return (
            <Link key={item.name} href={item.href} className="flex-1 focus:outline-none">
              <motion.div
                whileTap={{ scale: 0.92 }}
                className={`relative flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
                  isActive ? 'text-cyan-400' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {/* Active Indicator Glow Pill */}
                {isActive && (
                  <motion.div
                    layoutId="mobile-active-glow"
                    className="absolute -top-2 w-8 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(0,212,255,0.8)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : 'stroke-2'}`} />
                  {item.badge && !isActive && (
                    <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-cyan-400 text-midnight-950 font-black text-[8px] rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>

                <span className={`text-[10px] mt-1 font-semibold transition-all ${
                  isActive ? 'font-bold text-cyan-300' : 'text-gray-400'
                }`}>
                  {item.name}
                </span>
              </motion.div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
