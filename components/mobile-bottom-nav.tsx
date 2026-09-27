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
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-3 py-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg"
    >
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          const Icon = item.icon

          // Center AI Studio Raised Button
          if (item.isCenterPill) {
            return (
              <Link key={item.name} href={item.href} className="relative -top-4 focus:outline-none">
                <motion.div
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white shadow-md flex items-center justify-center border-2 border-white">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 mt-1 tracking-tight">
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
                  isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {/* Active Indicator Top Pill */}
                {isActive && (
                  <motion.div
                    layoutId="mobile-active-glow"
                    className="absolute -top-2 w-8 h-1 bg-blue-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-105 stroke-[2.5]' : 'stroke-2'}`} />
                  {item.badge && !isActive && (
                    <span className="absolute -top-1 -right-2 px-1.5 py-0.2 bg-blue-600 text-white font-bold text-[8px] rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>

                <span className={`text-[10px] mt-1 transition-all ${
                  isActive ? 'font-bold text-blue-700' : 'font-medium text-slate-500'
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
