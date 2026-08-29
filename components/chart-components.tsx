'use client'

import { motion } from 'framer-motion'

// 1. WeeklyStudyGraph: Bar chart using pure CSS & Tailwind
export function WeeklyStudyGraph() {
  const data = [
    { day: 'Mon', hours: 4.5 },
    { day: 'Tue', hours: 6.2 },
    { day: 'Wed', hours: 5.8 },
    { day: 'Thu', hours: 8.0 },
    { day: 'Fri', hours: 7.1 },
    { day: 'Sat', hours: 9.5 },
    { day: 'Sun', hours: 5.0 },
  ]
  const maxHours = 10

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 glow-hover flex flex-col justify-between h-80">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">Weekly Study Time</h3>
        <p className="text-xs text-gray-400">Hours spent studying per day</p>
      </div>
      <div className="flex items-end justify-between h-48 pt-4">
        {data.map((d, index) => {
          const heightPercent = (d.hours / maxHours) * 100
          return (
            <div key={d.day} className="flex flex-col items-center group w-full">
              <div className="relative w-8 bg-cyan-400/10 border border-cyan-400/20 rounded-t-lg flex flex-col justify-end h-36 overflow-hidden">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: index * 0.1 }}
                  className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-md relative"
                >
                  {/* Glowing tip */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-white shadow-[0_0_10px_#fff]" />
                </motion.div>
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-midnight-900 border border-cyan-400/50 text-cyan-400 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                  {d.hours} hrs
                </div>
              </div>
              <span className="text-xs text-gray-400 mt-2 font-medium">{d.day}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// 2. SubjectProgress: SVG Donut chart
export function SubjectProgress() {
  const subjects = [
    { name: 'Physics', progress: 75, color: '#00d4ff' },
    { name: 'Chemistry', progress: 60, color: '#a855f7' },
    { name: 'Maths', progress: 90, color: '#f97316' },
    { name: 'Biology', progress: 45, color: '#22c55e' },
  ]

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 glow-hover flex flex-col justify-between h-80">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">Subject Progress</h3>
        <p className="text-xs text-gray-400">Percentage completion per subject</p>
      </div>
      <div className="grid grid-cols-2 gap-4 py-2">
        {subjects.map((sub, index) => {
          const radius = 24
          const circumference = 2 * Math.PI * radius
          const strokeDashoffset = circumference - (sub.progress / 100) * circumference

          return (
            <div key={sub.name} className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <svg className="w-16 h-16 transform -rotate-90">
                  {/* Track ring */}
                  <circle
                    cx="32"
                    cy="32"
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="4"
                    fill="transparent"
                  />
                  {/* Animated Progress ring */}
                  <motion.circle
                    cx="32"
                    cy="32"
                    r={radius}
                    stroke={sub.color}
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: index * 0.1 }}
                  />
                </svg>
                <span className="absolute text-xs font-bold text-white">{sub.progress}%</span>
              </div>
              <div>
                <div className="text-sm font-bold text-white">{sub.name}</div>
                <div className="text-xs text-gray-400">Chapters</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// 3. PerformanceAnalytics: SVG Line chart
export function PerformanceAnalytics() {
  const points = [
    { x: 10, y: 80 },
    { x: 25, y: 60 },
    { x: 40, y: 75 },
    { x: 55, y: 45 },
    { x: 70, y: 90 },
    { x: 85, y: 85 },
    { x: 100, y: 95 },
  ]
  const width = 300
  const height = 150

  // Build path string
  const pathData = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x}% ${100 - p.y}%` : `${acc} L ${p.x}% ${100 - p.y}%`
  }, '')

  // Area under path
  const areaData = `${pathData} L 100% 100% L 10% 100% Z`

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 glow-hover flex flex-col justify-between h-80">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">Performance Analytics</h3>
        <p className="text-xs text-gray-400">Score metrics history over mock tests</p>
      </div>
      <div className="relative w-full h-40 mt-4 border-l border-b border-white/10 pt-2 pl-2">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          {/* Grid lines */}
          <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.5" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.5" />
          <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.5" />

          {/* Area fill */}
          <defs>
            <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={areaData}
            fill="url(#gradient-area)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Line path */}
          <motion.path
            d={pathData}
            fill="transparent"
            stroke="#00d4ff"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />

          {/* Data point indicators */}
          {points.map((p, index) => (
            <circle
              key={index}
              cx={`${p.x}%`}
              cy={`${100 - p.y}%`}
              r="2"
              fill="#0a0a1a"
              stroke="#00d4ff"
              strokeWidth="1.5"
            />
          ))}
        </svg>
      </div>
    </div>
  )
}
