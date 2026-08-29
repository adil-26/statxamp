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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group cursor-pointer bento-card"
    >
      {/* Background glow orb */}
      <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-cyan-400/5 blur-2xl group-hover:bg-cyan-400/10 transition-colors duration-500" />
      
      <div className="flex justify-between items-start">
        <div>
          <span className="text-sm font-medium text-gray-400">{title}</span>
          <h4 className="text-3xl font-extrabold text-white mt-2 tracking-tight">
            {prefix}
            {count.toLocaleString()}
            {suffix}
          </h4>
        </div>
        <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center border border-cyan-400/20 group-hover:border-cyan-400/50 transition-all duration-300">
          <Icon className="w-6 h-6 text-cyan-400" />
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-2">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
          trendType === 'up' 
            ? 'bg-green-500/10 text-green-400' 
            : trendType === 'down' 
            ? 'bg-red-500/10 text-red-400' 
            : 'bg-white/10 text-gray-400'
        }`}>
          {trend}
        </span>
        <span className="text-xs text-gray-500 font-medium">vs last week</span>
      </div>
    </motion.div>
  )
}
