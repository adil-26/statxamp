'use client'

import { Sidebar } from '@/components/sidebar'
import { motion } from 'framer-motion'
import { Search, Bell, Menu, Sparkles } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-midnight-900 text-white flex">
      {/* Sidebar for desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Sidebar for mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-midnight-900/90 backdrop-blur-md flex lg:hidden">
          <div className="w-64 border-r border-cyan-400/20">
            <Sidebar />
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main Page Content Wrapper */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-cyan-400/10 px-6 flex items-center justify-between bg-midnight-900/80 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-cyan-400"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search chapters, topics, tests..." 
                className="w-80 h-10 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-cyan-400/50 transition-all font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/ai-generator">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-xl cursor-pointer hover:bg-cyan-400/20 transition-all font-semibold text-sm text-cyan-400 glow-border"
              >
                <Sparkles className="w-4 h-4" />
                AI Generator
              </motion.div>
            </Link>

            <button className="relative w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all text-gray-400 hover:text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 ring-4 ring-midnight-900" />
            </button>

            {/* Profile Avatar */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-midnight-900 font-bold border-2 border-cyan-400/50 shadow-[0_0_10px_rgba(0,212,255,0.3)]">
                AI
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-white leading-tight">Atik Imteyaz</div>
                <div className="text-xs text-gray-400 font-medium">Rank #124</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Pages */}
        <main className="flex-1 p-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
