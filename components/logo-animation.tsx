'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface LogoAnimationProps {
  size?: number
}

// Particle explosion effect for logo entrance
function ParticleExplosion({ size, active }: { size: number; active: boolean }) {
  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    angle: (i / 16) * 360,
    distance: size * 0.8 + Math.random() * size * 0.4,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 0.3,
    duration: 1.2 + Math.random() * 0.8,
  }))

  return (
    <AnimatePresence>
      {active && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                background: `radial-gradient(circle, 
                  ${['#00d4ff', '#00f0ff', '#00a8ff', '#00ffff'][particle.id % 4]} 0%, 
                  transparent 70%)`,
                boxShadow: `0 0 ${particle.size * 2}px ${['#00d4ff', '#00f0ff', '#00a8ff', '#00ffff'][particle.id % 4]}`,
                left: '50%',
                top: '50%',
                marginLeft: -particle.size / 2,
                marginTop: -particle.size / 2,
              }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={{
                x: Math.cos((particle.angle * Math.PI) / 180) * particle.distance,
                y: Math.sin((particle.angle * Math.PI) / 180) * particle.distance,
                scale: [0, 1.5, 0.5, 0],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

// Quantum energy ring component
function QuantumRing({ size, delay, reverse }: { size: number; delay: number; reverse?: boolean }) {
  return (
    <motion.div
      className="absolute rounded-full border-2 border-cyan-400/40"
      style={{
        width: size,
        height: size,
        left: '50%',
        top: '50%',
        marginLeft: -size / 2,
        marginTop: -size / 2,
        boxShadow: '0 0 30px rgba(0, 212, 255, 0.3), inset 0 0 30px rgba(0, 212, 255, 0.1)',
      }}
      initial={{ scale: 0, opacity: 0, rotateX: 60 }}
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: [0.4, 0.8, 0.4],
        rotate: reverse ? -360 : 360,
        rotateX: [60, 75, 60],
      }}
      transition={{
        scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
        rotateX: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
      }}
    />
  )
}

// Floating atom component
function FloatingAtom({ delay, size }: { delay: number; size: number }) {
  return (
    <motion.div
      className="absolute"
      style={{
        width: size,
        height: size,
        left: `${20 + Math.random() * 60}%`,
        top: `${20 + Math.random() * 60}%`,
      }}
      animate={{
        y: [0, -20, 0, 20, 0],
        x: [0, 15, 0, -15, 0],
        rotate: [0, 360],
      }}
      transition={{
        y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay },
        x: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay },
        rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
      }}
    >
      <div className="w-full h-full rounded-full bg-cyan-400/30 blur-md" />
    </motion.div>
  )
}

// Energy beam effect
function EnergyBeam({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute h-1 rounded-full"
      style={{
        width: '100%',
        top: '50%',
        background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
        boxShadow: '0 0 20px #00d4ff',
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{
        scaleX: [0, 1, 1, 0],
        opacity: [0, 1, 1, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

// Scan line effect
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px bg-cyan-400/50 z-10"
      style={{
        boxShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff',
      }}
      animate={{
        top: ['0%', '100%', '0%'],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}

export function LogoAnimation({ size = 280 }: LogoAnimationProps) {
  const [showExplosion, setShowExplosion] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowExplosion(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Main cyber grid container */}
      <div 
        className="absolute inset-0 rounded-3xl overflow-hidden"
        style={{
          background: `
            linear-gradient(rgba(0, 212, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.08) 1px, transparent 1px),
            rgba(0, 10, 20, 0.9)
          `,
          backgroundSize: '20px 20px',
          border: '2px solid rgba(0, 212, 255, 0.5)',
        }}
      >
        {/* Pulsing Aura */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          animate={{
            boxShadow: [
              'inset 0 0 60px rgba(0, 212, 255, 0.1), 0 0 60px rgba(0, 212, 255, 0.3)',
              'inset 0 0 100px rgba(0, 212, 255, 0.3), 0 0 100px rgba(0, 212, 255, 0.6)',
              'inset 0 0 60px rgba(0, 212, 255, 0.1), 0 0 60px rgba(0, 212, 255, 0.3)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Scan Line */}
        <ScanLine />

        {/* Energy Beams */}
        <EnergyBeam delay={0} />
        <EnergyBeam delay={1} />

        {/* Floating Atoms */}
        <FloatingAtom delay={0} size={8} />
        <FloatingAtom delay={2} size={6} />
        <FloatingAtom delay={4} size={10} />

        {/* Particle Explosion on Load */}
        <ParticleExplosion size={size} active={showExplosion} />

        {/* Quantum Rings */}
        <QuantumRing size={size * 1.4} delay={0} />
        <QuantumRing size={size * 1.2} delay={1} reverse />
        <QuantumRing size={size * 1.6} delay={2} />

        {/* Main logo container */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: 'spring',
            stiffness: 100,
            damping: 20,
            delay: 0.5 
          }}
        >
          {/* Outer glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* AI Atom Symbol with orbiting particles */}
          <motion.div
            className="absolute inset-8 rounded-full border-2 border-cyan-400/60"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{
              boxShadow: '0 0 40px rgba(0, 212, 255, 0.4), inset 0 0 40px rgba(0, 212, 255, 0.2)',
            }}
          >
            {/* 4 Orbiting electrons */}
            {[0, 90, 180, 270].map((angle, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-cyan-400"
                style={{
                  boxShadow: '0 0 20px #00d4ff',
                }}
                animate={{
                  x: [
                    Math.cos((angle * Math.PI) / 180) * (size * 0.35),
                    Math.cos(((angle + 360) * Math.PI) / 180) * (size * 0.35),
                  ],
                  y: [
                    Math.sin((angle * Math.PI) / 180) * (size * 0.35),
                    Math.sin(((angle + 360) * Math.PI) / 180) * (size * 0.35),
                  ],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>

          {/* AI Badge with orbiting electron */}
          <motion.div 
            className="absolute -top-2 -right-2 w-14 h-14 rounded-full flex items-center justify-center z-20"
            style={{
              background: 'rgba(0, 20, 30, 0.95)',
              border: '2px solid rgba(0, 212, 255, 0.8)',
            }}
          >
            {/* Orbiting electron around AI badge */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <motion.div
                className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 -top-0.5 left-1/2 -translate-x-1/2"
                style={{ boxShadow: '0 0 8px #00d4ff' }}
              />
            </motion.div>
            <motion.span 
              className="text-xs font-bold text-cyan-400"
              animate={{ 
                textShadow: [
                  '0 0 10px rgba(0, 212, 255, 0.8)',
                  '0 0 20px rgba(0, 212, 255, 1)',
                  '0 0 10px rgba(0, 212, 255, 0.8)',
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              AI
            </motion.span>
          </motion.div>

          {/* Blockchain Cubes */}
          <div className="absolute top-0 left-1/4 flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-5 h-5 rounded-sm"
                style={{
                  background: 'rgba(0, 212, 255, 0.3)',
                  border: '1px solid rgba(0, 212, 255, 0.7)',
                  boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
                }}
                animate={{ 
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1],
                  y: [0, -5, 0],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          {/* Central S with trend arrow */}
          <motion.div
            className="relative z-10"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span 
              className="text-7xl font-bold"
              style={{
                color: '#00d4ff',
                textShadow: '0 0 30px rgba(0, 212, 255, 1), 0 0 60px rgba(0, 212, 255, 0.8), 0 0 90px rgba(0, 212, 255, 0.6)',
              }}
            >
              S
            </span>
            
            {/* Trend arrow */}
            <motion.div
              className="absolute -bottom-2 -right-2"
              animate={{ y: [0, -5, 0], x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="3">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

interface AnimatedTextProps {
  text: string
  className?: string
}

export function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.03 }}
          style={{ 
            display: 'inline-block',
            textShadow: '0 0 20px rgba(0, 212, 255, 0.8)',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}
