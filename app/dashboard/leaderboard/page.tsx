'use client'

import { motion } from 'framer-motion'
import { Trophy, Award, Zap, ChevronUp, Star } from 'lucide-react'

export default function LeaderboardPage() {
  const topStudents = [
    { rank: 2, name: 'Suhail Khan', points: 14200, avatar: 'SK', class: 'Class 12', change: '+2', changeType: 'up' },
    { rank: 1, name: 'Aatik Rahman', points: 15600, avatar: 'AR', class: 'Class 12', change: 'Steady', changeType: 'neutral' },
    { rank: 3, name: 'Priya Sen', points: 13850, avatar: 'PS', class: 'Class 12', change: '+5', changeType: 'up' }
  ]

  const rankings = [
    { rank: 4, name: 'Rajesh Das', points: 12900, avatar: 'RD', change: '+1', changeType: 'up' },
    { rank: 5, name: 'Vikram Roy', points: 12500, avatar: 'VR', change: '-2', changeType: 'down' },
    { rank: 6, name: 'Ananya Dey', points: 12100, avatar: 'AD', change: 'Steady', changeType: 'neutral' },
    { rank: 7, name: 'Sourav Paul', points: 11800, avatar: 'SP', change: '+4', changeType: 'up' },
    { rank: 8, name: 'Kushal Guha', points: 11500, avatar: 'KG', change: '-1', changeType: 'down' }
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          National <span className="text-blue-600">Leaderboard</span>
        </h1>
        <p className="text-slate-500 text-sm mt-1">Compete with student peers nationwide and earn weekly rewards.</p>
      </div>

      {/* Top 3 Podiums */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4">
        {topStudents.map((stud) => {
          const isFirst = stud.rank === 1
          return (
            <motion.div
              key={stud.rank}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: stud.rank * 0.1 }}
              className={`border rounded-2xl p-6 text-center relative flex flex-col justify-between overflow-hidden shadow-card ${
                isFirst 
                  ? 'border-amber-300 bg-amber-50/30 h-[380px] order-first md:order-none ring-1 ring-amber-300/50' 
                  : 'bg-white border-slate-200/90 h-[320px]'
              }`}
            >
              {isFirst && (
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 to-amber-500" />
              )}

              <div className="space-y-4">
                <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-lg border-2 ${
                    stud.rank === 1 
                      ? 'bg-amber-100 border-amber-300 text-amber-900' 
                      : stud.rank === 2 
                      ? 'bg-slate-100 border-slate-300 text-slate-800' 
                      : 'bg-orange-100 border-orange-300 text-orange-900'
                  }`}>
                    {stud.avatar}
                  </div>
                  {/* Medal badge */}
                  <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center border-2 shadow-sm ${
                    stud.rank === 1 
                      ? 'bg-amber-400 border-amber-500 text-amber-950' 
                      : stud.rank === 2 
                      ? 'bg-slate-200 border-slate-300 text-slate-800' 
                      : 'bg-orange-400 border-orange-500 text-white'
                  }`}>
                    <Trophy className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-slate-900">{stud.name}</h3>
                  <span className="text-xs text-slate-500 font-medium">{stud.class}</span>
                </div>
              </div>

              <div>
                <div className="text-2xl font-extrabold text-blue-600 mt-4">
                  {stud.points.toLocaleString()} <span className="text-xs text-slate-400 font-semibold">pts</span>
                </div>
                <div className="text-xs text-slate-500 mt-1 font-semibold">Rank #{stud.rank}</div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Current User Rank highlight Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 bg-blue-50/70 border border-blue-200/90 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-card"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0">
            <Star className="w-6 h-6 text-blue-600 fill-blue-600" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-lg">Your Standings</h4>
            <p className="text-xs text-slate-600">You are in the top 5% of students in your region.</p>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="text-center">
            <span className="text-xs text-slate-500 block font-medium">Current Rank</span>
            <span className="text-2xl font-extrabold text-blue-700 mt-1 block">#124</span>
          </div>
          <div className="text-center">
            <span className="text-xs text-slate-500 block font-medium">Weekly Points</span>
            <span className="text-2xl font-extrabold text-blue-700 mt-1 block">4,820</span>
          </div>
          <div className="text-center">
            <span className="text-xs text-slate-500 block font-medium">Monthly Rewards</span>
            <span className="text-2xl font-extrabold text-blue-700 mt-1 block">2 Free Mock Tests</span>
          </div>
        </div>
      </motion.div>

      {/* Weekly Points table list */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 overflow-hidden shadow-card">
        <h3 className="text-lg font-bold text-slate-900 mb-4">National Rankings</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 font-semibold text-xs">
                <th className="pb-3 w-16">Rank</th>
                <th className="pb-3">Student</th>
                <th className="pb-3 text-right">Points</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rankings.map((rank) => (
                <tr key={rank.rank} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 font-bold text-slate-400">#{rank.rank}</td>
                  <td className="py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-xs font-bold text-blue-700 shrink-0">
                      {rank.avatar}
                    </div>
                    <span className="font-semibold text-slate-900">{rank.name}</span>
                  </td>
                  <td className="py-4 text-right font-bold text-slate-800">{rank.points.toLocaleString()} pts</td>
                  <td className="py-4 text-right">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold ${
                      rank.changeType === 'up' 
                        ? 'text-emerald-600' 
                        : rank.changeType === 'down' 
                        ? 'text-rose-600' 
                        : 'text-slate-400'
                    }`}>
                      {rank.changeType === 'up' && <ChevronUp className="w-4 h-4" />}
                      {rank.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
