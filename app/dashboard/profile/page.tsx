'use client'

import { motion } from 'framer-motion'
import { User, Award, Shield, Mail } from 'lucide-react'

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          User <span className="text-blue-600">Profile</span>
        </h1>
        <p className="text-slate-500 text-sm mt-1">Manage personal info, study benchmarks, and settings.</p>
      </div>

      <div className="bg-white border border-slate-200/90 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden shadow-card">
        <div className="w-24 h-24 rounded-2xl bg-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-md">
          AI
        </div>

        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-2xl font-bold text-slate-900">Atik Imteyaz</h2>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/70">Class 12</span>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/70">CBSE Board</span>
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1.5 justify-center md:justify-start pt-1 font-medium">
            <Mail className="w-4 h-4 text-blue-600" />
            statxamp@gmail.com
          </p>
        </div>
      </div>
    </div>
  )
}
