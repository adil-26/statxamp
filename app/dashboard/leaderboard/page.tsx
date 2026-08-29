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
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          National <span className="gradient-text">Leaderboard</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">Compete with student peers nationwide and earn weekly rewards.</p>
      </div>

      {/* Top 3 Podiums */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-8">
        {topStudents.map((stud) => {
          const isFirst = stud.rank === 1
          return (
            <motion.div
              key={stud.rank}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: stud.rank * 0.1 }}
              className={`bg-white/5 border rounded-3xl p-6 text-center relative flex flex-col justify-between overflow-hidden bento-card ${
                isFirst 
                  ? 'border-cyan-400/50 h-[380px] order-first md:order-none bg-cyan-400/5 glow-border shadow-[0_0_30px_rgba(0,212,255,0.15)]' 
                  : 'border-white/10 h-[320px]'
              }`}
            >
              {isFirst && (
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_20px_#00d4ff]" />
              )}

              <div className="space-y-4">
                <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-lg border-2 ${
                    stud.rank === 1 
                      ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 border-yellow-400 text-midnight-900' 
                      : stud.rank === 2 
                      ? 'bg-gradient-to-br from-gray-300 to-gray-500 border-gray-300 text-midnight-900' 
                      : 'bg-gradient-to-br from-amber-600 to-amber-800 border-amber-600 text-white'
                  }`}>
                    {stud.avatar}
                  </div>
                  {/* Medal badge */}
                  <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center border-2 ${
                    stud.rank === 1 
                      ? 'bg-yellow-400 border-yellow-500 text-midnight-900' 
                      : stud.rank === 2 
                      ? 'bg-gray-300 border-gray-400 text-midnight-900' 
                      : 'bg-amber-700 border-amber-800 text-white'
                  }`}>
                    <Trophy className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-lg text-white">{stud.name}</h3>
                  <span className="text-xs text-gray-400 font-semibold">{stud.class}</span>
                </div>
              </div>

              <div>
                <div className="text-2xl font-extrabold text-cyan-400 mt-4">
                  {stud.points.toLocaleString()} <span className="text-xs text-gray-400">pts</span>
                </div>
                <div className="text-xs text-gray-500 mt-1 font-semibold">Rank #{stud.rank}</div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Current User Rank highlight Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4 glow-border"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
            <Star className="w-6 h-6 text-cyan-400 fill-cyan-400" />
          </div>
          <div>
            <h4 className="font-extrabold text-white text-lg">Your Standings</h4>
            <p className="text-xs text-gray-400">You are in the top 5% of students in your region.</p>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="text-center">
            <span className="text-xs text-gray-400 block font-semibold">Current Rank</span>
            <span className="text-2xl font-extrabold text-cyan-400 mt-1 block">#124</span>
          </div>
          <div className="text-center">
            <span className="text-xs text-gray-400 block font-semibold">Weekly Points</span>
            <span className="text-2xl font-extrabold text-cyan-400 mt-1 block">4,820</span>
          </div>
          <div className="text-center">
            <span className="text-xs text-gray-400 block font-semibold">Monthly Rewards</span>
            <span className="text-2xl font-extrabold text-cyan-400 mt-1 block">2 Free Mock Tests</span>
          </div>
        </div>
      </motion.div>

      {/* Weekly Points table list */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 overflow-hidden">
        <h3 className="text-lg font-bold text-white mb-4">National Rankings</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 font-semibold">
                <th className="pb-3 w-16">Rank</th>
                <th className="pb-3">Student</th>
                <th className="pb-3 text-right">Points</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rankings.map((rank) => (
                <tr key={rank.rank} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 font-bold text-gray-400">#{rank.rank}</td>
                  <td className="py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-cyan-400">
                      {rank.avatar}
                    </div>
                    <span className="font-bold text-white">{rank.name}</span>
                  </td>
                  <td className="py-4 text-right font-bold text-white">{rank.points.toLocaleString()} pts</td>
                  <td className="py-4 text-right">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold ${
                      rank.changeType === 'up' 
                        ? 'text-green-400' 
                        : rank.changeType === 'down' 
                        ? 'text-red-400' 
                        : 'text-gray-400'
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
