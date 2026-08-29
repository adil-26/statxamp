'use client'

import { motion } from 'framer-motion'
import { Settings, Shield, Bell, Eye } from 'lucide-react'

export default function SettingsPage() {
  const options = [
    { title: 'Notifications', desc: 'Manage email and system push alert rules', icon: Bell },
    { title: 'Account Privacy', desc: 'Secure database parameters and key access', icon: Shield },
    { title: 'Interface Theme', desc: 'Customize dark neon colors, layouts, graphics', icon: Eye }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          System <span className="gradient-text">Settings</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">Configure account options, alerts, and proctoring parameters.</p>
      </div>

      <div className="space-y-4">
        {options.map((opt, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex justify-between items-center hover:border-cyan-400/40 transition-all group cursor-pointer">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center border border-cyan-400/20 group-hover:border-cyan-400/50 transition-colors">
                <opt.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">{opt.title}</h4>
                <p className="text-xs text-gray-400 mt-1 font-semibold">{opt.desc}</p>
              </div>
            </div>
            <button className="px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5 text-xs text-white transition-all font-semibold">Configure</button>
          </div>
        ))}
      </div>
    </div>
  )
}
