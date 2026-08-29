'use client'

import { motion } from 'framer-motion'
import { User, Award, Shield, Mail } from 'lucide-react'

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          User <span className="gradient-text">Profile</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">Manage personal info, study benchmarks, and settings.</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 glow-hover flex flex-col md:flex-row items-center gap-8 relative overflow-hidden bento-card">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-3xl font-bold text-midnight-900 border-4 border-cyan-400/50 shadow-[0_0_20px_rgba(0,212,255,0.3)]">
          AI
        </div>

        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-2xl font-extrabold text-white">Atik Imteyaz</h2>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="text-xs font-bold text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">Class 12</span>
            <span className="text-xs font-bold text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full border border-purple-400/20">CBSE Board</span>
          </div>
          <p className="text-xs text-gray-400 flex items-center gap-1.5 justify-center md:justify-start pt-1 font-semibold">
            <Mail className="w-4 h-4 text-cyan-400" />
            statxamp@gmail.com
          </p>
        </div>
      </div>
    </div>
  )
}
