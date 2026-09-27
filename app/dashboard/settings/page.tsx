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
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          System <span className="text-blue-600">Settings</span>
        </h1>
        <p className="text-slate-500 text-sm mt-1">Configure account options, alerts, and proctoring parameters.</p>
      </div>

      <div className="space-y-4">
        {options.map((opt, i) => (
          <div key={i} className="bg-white border border-slate-200/90 p-5 rounded-2xl flex justify-between items-center hover:border-blue-300 hover:shadow-card transition-all group cursor-pointer shadow-xs">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-200/70 group-hover:border-blue-300 transition-colors shrink-0">
                <opt.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{opt.title}</h4>
                <p className="text-xs text-slate-500 mt-1 font-medium">{opt.desc}</p>
              </div>
            </div>
            <button className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-xs text-slate-700 hover:text-slate-900 transition-all font-semibold cursor-pointer shadow-xs">Configure</button>
          </div>
        ))}
      </div>
    </div>
  )
}
