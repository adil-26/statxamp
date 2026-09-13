'use client'

import React, { useState } from 'react'
import { Calculator, X, Sparkles, BookOpen, Atom, FlaskConical, Hash } from 'lucide-react'

interface VirtualScientificKeyboardProps {
  onInsert: (symbol: string) => void
  isOpen: boolean
  onToggle: () => void
}

type TabType = 'math' | 'physics' | 'chemistry' | 'operators'

export function VirtualScientificKeyboard({ onInsert, isOpen, onToggle }: VirtualScientificKeyboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('math')

  const KEYBOARD_GROUPS: Record<TabType, Array<{ label: string; value: string; desc?: string }>> = {
    math: [
      { label: '∫ dx', value: '\\int f(x) \\, dx ', desc: 'Integral' },
      { label: '∫ₐᵇ', value: '\\int_{a}^{b} f(x) \\, dx ', desc: 'Definite Integral' },
      { label: 'dy/dx', value: '\\frac{dy}{dx}', desc: 'Derivative' },
      { label: '∂/∂x', value: '\\frac{\\partial}{\\partial x}', desc: 'Partial Derivative' },
      { label: 'lim', value: '\\lim_{x \\to 0} ', desc: 'Limit' },
      { label: '∑', value: '\\sum_{i=1}^{n} ', desc: 'Summation' },
      { label: '∏', value: '\\prod_{i=1}^{n} ', desc: 'Product' },
      { label: '√x', value: '\\sqrt{x}', desc: 'Square Root' },
      { label: '∛x', value: '\\sqrt[3]{x}', desc: 'Cube Root' },
      { label: 'a/b', value: '\\frac{a}{b}', desc: 'Fraction' },
      { label: 'x²', value: '^{2}', desc: 'Square' },
      { label: 'x³', value: '^{3}', desc: 'Cube' },
      { label: 'xⁿ', value: '^{n}', desc: 'Power' },
      { label: 'xₙ', value: '_{n}', desc: 'Subscript' },
      { label: 'π', value: '\\pi ', desc: 'Pi' },
      { label: '∞', value: '\\infty ', desc: 'Infinity' },
      { label: 'log', value: '\\log(x)', desc: 'Logarithm' },
      { label: 'ln', value: '\\ln(x)', desc: 'Natural Log' },
      { label: 'sin', value: '\\sin(\\theta)', desc: 'Sine' },
      { label: 'cos', value: '\\cos(\\theta)', desc: 'Cosine' },
      { label: 'tan', value: '\\tan(\\theta)', desc: 'Tangent' },
      { label: '|x|', value: '|x|', desc: 'Absolute' },
      { label: '$$ Math $$', value: '$$ \n  \n$$', desc: 'Display Math Block' },
      { label: '$x$', value: '$x$', desc: 'Inline Math' }
    ],
    physics: [
      { label: 'Δx', value: '\\Delta x ', desc: 'Delta Change' },
      { label: 'δ(x)', value: '\\delta(x) ', desc: 'Dirac Delta' },
      { label: 'λ', value: '\\lambda ', desc: 'Wavelength' },
      { label: 'θ', value: '\\theta ', desc: 'Angle Theta' },
      { label: 'ω', value: '\\omega ', desc: 'Angular Velocity' },
      { label: 'μ', value: '\\mu ', desc: 'Micro / Friction' },
      { label: 'ε₀', value: '\\varepsilon_0 ', desc: 'Permittivity' },
      { label: 'μ₀', value: '\\mu_0 ', desc: 'Permeability' },
      { label: 'ρ', value: '\\rho ', desc: 'Resistivity / Density' },
      { label: 'τ', value: '\\tau ', desc: 'Torque / Relaxation' },
      { label: 'φ', value: '\\phi ', desc: 'Phase / Flux' },
      { label: 'σ', value: '\\sigma ', desc: 'Conductivity / Stefan' },
      { label: 'ℏ', value: '\\hbar ', desc: 'Reduced Planck' },
      { label: 'Ω', value: '\\Omega ', desc: 'Ohms' },
      { label: 'F⃗', value: '\\vec{F} ', desc: 'Force Vector' },
      { label: 'v⃗', value: '\\vec{v} ', desc: 'Velocity Vector' },
      { label: 'E⃗', value: '\\vec{E} ', desc: 'Electric Field' },
      { label: 'B⃗', value: '\\vec{B} ', desc: 'Magnetic Field' },
      { label: '±', value: '\\pm ', desc: 'Plus Minus' },
      { label: '· (dot)', value: '\\cdot ', desc: 'Dot Product' },
      { label: '× (cross)', value: '\\times ', desc: 'Cross Product' }
    ],
    chemistry: [
      { label: '⇌', value: ' \\rightleftharpoons ', desc: 'Equilibrium' },
      { label: '→', value: ' \\rightarrow ', desc: 'Reaction Arrow' },
      { label: '↑ (gas)', value: ' \\uparrow ', desc: 'Gas Evolved' },
      { label: '↓ (ppt)', value: ' \\downarrow ', desc: 'Precipitate' },
      { label: 'ΔH', value: '\\Delta H ', desc: 'Enthalpy' },
      { label: 'pH', value: '\\text{pH} ', desc: 'pH level' },
      { label: 'K_eq', value: 'K_{\\text{eq}} ', desc: 'Equilibrium Constant' },
      { label: 'α', value: '\\alpha ', desc: 'Degree of Dissociation' },
      { label: 'β', value: '\\beta ', desc: 'Beta Particle' },
      { label: 'γ', value: '\\gamma ', desc: 'Gamma Ray' },
      { label: '⁺', value: '^{+} ', desc: 'Positive Ion' },
      { label: '⁻', value: '^{-} ', desc: 'Negative Ion' },
      { label: '²⁺', value: '^{2+} ', desc: 'Divalent Cation' },
      { label: 'H⁺', value: '\\text{H}^+ ', desc: 'Hydronium Ion' },
      { label: 'OH⁻', value: '\\text{OH}^- ', desc: 'Hydroxide Ion' }
    ],
    operators: [
      { label: '≤', value: '\\le ', desc: 'Less than or Equal' },
      { label: '≥', value: '\\ge ', desc: 'Greater than or Equal' },
      { label: '≠', value: '\\ne ', desc: 'Not Equal' },
      { label: '≈', value: '\\approx ', desc: 'Approximately' },
      { label: '∝', value: '\\propto ', desc: 'Proportional To' },
      { label: '∈', value: '\\in ', desc: 'Element of' },
      { label: '∉', value: '\\notin ', desc: 'Not in' },
      { label: '⊂', value: '\\subset ', desc: 'Subset of' },
      { label: '∪', value: '\\cup ', desc: 'Union' },
      { label: '∩', value: '\\cap ', desc: 'Intersection' },
      { label: '°', value: '^\\circ ', desc: 'Degree' },
      { label: '∠', value: '\\angle ', desc: 'Angle' },
      { label: '⊥', value: '\\perp ', desc: 'Perpendicular' },
      { label: '∥', value: '\\parallel ', desc: 'Parallel' },
      { label: '≡', value: '\\equiv ', desc: 'Identical / Equivalence' }
    ]
  }

  return (
    <div className="space-y-2">
      {/* Keyboard Trigger Button */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onToggle}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
            isOpen 
              ? 'bg-cyan-400 text-midnight-900 border-cyan-400 shadow-[0_0_12px_rgba(0,212,255,0.3)]' 
              : 'bg-white/5 border-white/10 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/30'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>{isOpen ? 'Close Math / Scientific Keypad' : 'Open Math / Scientific Keypad'}</span>
        </button>

        {isOpen && (
          <span className="text-[11px] text-gray-400">
            Click any symbol to insert into your question
          </span>
        )}
      </div>

      {/* Expanded Scientific Keyboard Console */}
      {isOpen && (
        <div className="bg-midnight-900/95 border border-cyan-400/30 rounded-2xl p-3 sm:p-4 space-y-3 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Subject Tabs */}
          <div className="flex items-center gap-1.5 border-b border-white/10 pb-2.5 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('math')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'math'
                  ? 'bg-cyan-400 text-midnight-900'
                  : 'text-gray-400 hover:text-white bg-white/5'
              }`}
            >
              <BookOpen className="w-3 h-3" />
              Calculus & Math
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('physics')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'physics'
                  ? 'bg-cyan-400 text-midnight-900'
                  : 'text-gray-400 hover:text-white bg-white/5'
              }`}
            >
              <Atom className="w-3 h-3" />
              Physics Symbols
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('chemistry')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'chemistry'
                  ? 'bg-cyan-400 text-midnight-900'
                  : 'text-gray-400 hover:text-white bg-white/5'
              }`}
            >
              <FlaskConical className="w-3 h-3" />
              Chemistry
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('operators')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'operators'
                  ? 'bg-cyan-400 text-midnight-900'
                  : 'text-gray-400 hover:text-white bg-white/5'
              }`}
            >
              <Hash className="w-3 h-3" />
              Operators & Logic
            </button>
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1.5 max-h-48 overflow-y-auto pr-1">
            {KEYBOARD_GROUPS[activeTab].map((keyItem, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onInsert(keyItem.value)}
                title={keyItem.desc}
                className="h-9 px-2 rounded-xl bg-white/5 hover:bg-cyan-400/20 hover:border-cyan-400/50 border border-white/10 text-cyan-200 font-mono text-xs font-bold flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                {keyItem.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
