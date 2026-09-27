'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: number
  prefix?: string
  suffix?: string
  trend: string
  trendType: 'up' | 'down' | 'neutral'
  icon: LucideIcon
}

export function StatCard({ title, value, prefix = '', suffix = '', trend, trendType, icon: Icon }: StatCardProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: (latest) => setCount(Math.floor(latest)),
    })
    return () => controls.stop()
  }, [value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-card hover:border-slate-300 transition-all duration-200 group cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</span>
          <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1.5 tracking-tight">
            {prefix}
            {count.toLocaleString()}
            {suffix}
          </h4>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-all">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-2">
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
          trendType === 'up' 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80' 
            : trendType === 'down' 
            ? 'bg-rose-50 text-rose-700 border-rose-200/80' 
            : 'bg-slate-100 text-slate-600 border-slate-200'
        }`}>
          {trend}
        </span>
        <span className="text-[11px] text-slate-400 font-medium">vs last week</span>
      </div>
    </motion.div>
  )
}
