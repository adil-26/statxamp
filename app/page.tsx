'use client'

import { motion } from 'framer-motion'
import { LogoAnimation, AnimatedText } from '@/components/logo-animation'
import { Footer } from '@/components/footer'
import { Sparkles, ArrowRight, BookOpen, Trophy, Brain, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-midnight-900 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 cyber-grid opacity-50" />
      
      {/* Floating Orbs - Reduced for performance */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-cyan-400/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-cyan-400/5 blur-3xl" />

      {/* Header navbar */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 glass-strong py-4 px-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 
                            flex items-center justify-center glow-border">
              <span className="text-xl font-bold gradient-text">S</span>
            </div>
            <span className="text-xl font-bold">
              Stat<span className="text-cyan-400">Xam</span>
            </span>
          </Link>
          <Link 
            href="/dashboard"
            className="neon-button px-6 py-2.5 rounded-xl bg-cyan-400/20 border border-cyan-400/50 
                       text-cyan-400 font-semibold flex items-center gap-2 hover:bg-cyan-400/30"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                           bg-cyan-400/10 border border-cyan-400/30"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 text-sm font-medium">AI-Powered Learning</span>
              </motion.div>

              {/* Title */}
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="gradient-text">Powered by</span>
                <br />
                <AnimatedText text="AI Excellence" className="text-white" />
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
                Everything you need to ace your exams.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/dashboard"
                  className="neon-button px-8 py-4 rounded-2xl bg-cyan-400 text-midnight-900 
                             font-bold text-lg flex items-center gap-3 hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="/ai-generator"
                  className="px-8 py-4 rounded-2xl border border-cyan-400/50 text-cyan-400 
                             font-semibold text-lg hover:bg-cyan-400/10 transition-all duration-300"
                >
                  Try AI Generator
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-4">
                {[
                  { value: '50K+', label: 'Students' },
                  { value: '95%', label: 'Success Rate' },
                  { value: '24/7', label: 'AI Support' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="text-3xl font-bold text-cyan-400">{stat.value}</div>
                    <div className="text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Animated Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center items-center"
            >
              <LogoAnimation size={320} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. AI Study Assistant */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bento-card p-6 group cursor-pointer border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-cyan-400/10 flex items-center justify-center mb-4
                              group-hover:bg-cyan-400/20 transition-all duration-300">
                <Brain className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                AI Study Assistant
              </h3>
              <ul className="space-y-1.5 text-gray-400 text-sm">
                <li>• Personalized study plans</li>
                <li>• AI chat support</li>
              </ul>
            </motion.div>

            {/* 2. State Boards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -10 }}
              className="bento-card p-6 group cursor-pointer border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-cyan-400/10 flex items-center justify-center mb-4
                              group-hover:bg-cyan-400/20 transition-all duration-300">
                <BookOpen className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                State Boards
              </h3>
              <ul className="space-y-1.5 text-gray-400 text-sm">
                <li>• WB, Bihar, UP</li>
                <li>• CBSE, ICSE</li>
                <li>• More boards</li>
              </ul>
            </motion.div>

            {/* 3. Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="bento-card p-6 group cursor-pointer border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-cyan-400/10 flex items-center justify-center mb-4
                              group-hover:bg-cyan-400/20 transition-all duration-300">
                <Trophy className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                Leaderboard
              </h3>
              <ul className="space-y-1.5 text-gray-400 text-sm">
                <li>• Nationwide rankings</li>
                <li>• Daily competition</li>
                <li>• Weekly rewards</li>
              </ul>
            </motion.div>

            {/* 4. Smart Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -10 }}
              className="bento-card p-6 group cursor-pointer border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-cyan-400/10 flex items-center justify-center mb-4
                              group-hover:bg-cyan-400/20 transition-all duration-300">
                <Zap className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                Smart Analytics
              </h3>
              <ul className="space-y-1.5 text-gray-400 text-sm">
                <li>• AI insights</li>
                <li>• Study progress</li>
                <li>• Performance charts</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
