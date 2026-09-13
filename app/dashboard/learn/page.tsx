'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Sparkles, 
  Play, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Lightbulb, 
  CheckCircle2, 
  XCircle, 
  Calculator, 
  Layers, 
  GraduationCap, 
  Compass, 
  Clock, 
  Award,
  ArrowRight,
  TrendingUp,
  Brain,
  HelpCircle
} from 'lucide-react'
import { MathRenderer } from '@/components/math-renderer'
import Link from 'next/link'

interface CalculationStep {
  stepNumber: number
  title: string
  formula: string
  explanation: string
  activeHighlight: string
  visualState: string
}

interface ChapterData {
  id: string
  title: string
  subject: string
  standard: 'Class 10' | 'Class 12' | 'Competitive'
  weightageMarks: string
  description: string
  formulaOverview: { name: string; latex: string }[]
  animationTopic: string
  calculationSteps: CalculationStep[]
  interactiveSandbox: {
    defaultParam: number
    label: string
    unit: string
    options: number[]
    computeFormula: (val: number) => { step1: string; step2: string; step3: string; result: string }
  }
  testQuestions: {
    id: number
    question: string
    options: string[]
    correctAnswer: number
    hint: string
    explanation: string
  }[]
}

const CHAPTERS_DATABASE: ChapterData[] = [
  {
    id: 'math-trigonometry',
    title: 'Trigonometry & Identities',
    subject: 'Mathematics',
    standard: 'Class 10',
    weightageMarks: '12 Marks (Board Blueprint)',
    description: 'Master right-triangle ratios, Pythagorean identities, and step-by-step derivations with animated calculation proofs.',
    formulaOverview: [
      { name: 'Fundamental Pythagorean Identity', latex: '\\sin^2(\\theta) + \\cos^2(\\theta) = 1' },
      { name: 'Secant-Tangent Identity', latex: '1 + \\tan^2(\\theta) = \\sec^2(\\theta)' },
      { name: 'Cosecant-Cotangent Identity', latex: '1 + \\cot^2(\\theta) = \\csc^2(\\theta)' },
      { name: 'Double Angle Sine', latex: '\\sin(2\\theta) = 2\\sin(\\theta)\\cos(\\theta)' }
    ],
    animationTopic: 'Step-by-Step Derivation of sin²(θ) + cos²(θ) = 1',
    calculationSteps: [
      {
        stepNumber: 1,
        title: 'Step 1: Construct Right-Angled Triangle ABC',
        formula: 'AB^2 + BC^2 = AC^2 \\quad \\text{(Pythagoras Theorem)}',
        explanation: 'Consider a right triangle ABC right-angled at B with angle θ at vertex A. Let AB = Base, BC = Perpendicular (opposite), and AC = Hypotenuse.',
        activeHighlight: 'AC = Hypotenuse, BC = Perpendicular, AB = Base',
        visualState: 'Triangle defined with sides a, b, and hypotenuse c.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Define Basic Trigonometric Ratios',
        formula: '\\sin(\\theta) = \\frac{\\text{Perpendicular}}{\\text{Hypotenuse}} = \\frac{BC}{AC}, \\quad \\cos(\\theta) = \\frac{\\text{Base}}{\\text{Hypotenuse}} = \\frac{AB}{AC}',
        explanation: 'By the definitions of sine and cosine in right-angled trigonometry, sine represents opposite/hypotenuse and cosine represents adjacent/hypotenuse.',
        activeHighlight: 'sin(θ) = BC/AC and cos(θ) = AB/AC',
        visualState: 'Ratios expressed in terms of triangle sides.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Square and Add Both Ratios',
        formula: '\\sin^2(\\theta) + \\cos^2(\\theta) = \\left(\\frac{BC}{AC}\\right)^2 + \\left(\\frac{AB}{AC}\\right)^2 = \\frac{BC^2 + AB^2}{AC^2}',
        explanation: 'Squaring both fractions yields denominators of AC². Combining the fractions over a common denominator gives (BC² + AB²) / AC².',
        activeHighlight: 'Common denominator AC²',
        visualState: 'Fractions combined into a single algebraic quotient.'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Apply Pythagoras Theorem to Numerator',
        formula: '\\text{Since } BC^2 + AB^2 = AC^2 \\implies \\frac{AC^2}{AC^2} = \\mathbf{1}',
        explanation: 'From Pythagoras theorem, the sum of squares of perpendicular and base equals the square of hypotenuse (BC² + AB² = AC²). Substituting AC² in the numerator gives AC² / AC² = 1. Proven!',
        activeHighlight: 'Numerator cancels with denominator = 1',
        visualState: 'Q.E.D. Identity confirmed for all real angles θ.'
      }
    ],
    interactiveSandbox: {
      defaultParam: 30,
      label: 'Select Angle (θ)',
      unit: '°',
      options: [0, 30, 45, 60, 90],
      computeFormula: (angle) => {
        const rad = (angle * Math.PI) / 180
        const sinVal = Math.sin(rad)
        const cosVal = Math.cos(rad)
        const sinSq = (sinVal * sinVal).toFixed(4)
        const cosSq = (cosVal * cosVal).toFixed(4)
        const total = (parseFloat(sinSq) + parseFloat(cosSq)).toFixed(2)

        return {
          step1: `\\sin(${angle}^\\circ) = ${sinVal.toFixed(3)}, \\quad \\cos(${angle}^\\circ) = ${cosVal.toFixed(3)}`,
          step2: `\\sin^2(${angle}^\\circ) = (${sinVal.toFixed(3)})^2 = ${sinSq}`,
          step3: `\\cos^2(${angle}^\\circ) = (${cosVal.toFixed(3)})^2 = ${cosSq}`,
          result: `${sinSq} + ${cosSq} = \\mathbf{${total}} \\equiv 1`
        }
      }
    },
    testQuestions: [
      {
        id: 1,
        question: 'If $\\sin(\\theta) = \\frac{3}{5}$ in a standard right-angled triangle, what is the exact value of $\\cos(\\theta)$?',
        options: ['\\frac{4}{5}', '\\frac{5}{4}', '\\frac{3}{4}', '\\frac{1}{5}'],
        correctAnswer: 0,
        hint: 'Use the fundamental identity: $\\cos(\\theta) = \\sqrt{1 - \\sin^2(\\theta)}$. Compute $1 - (3/5)^2$.',
        explanation: 'Using $\\sin^2\\theta + \\cos^2\\theta = 1$, we have $\\cos\\theta = \\sqrt{1 - (3/5)^2} = \\sqrt{1 - 9/25} = \\sqrt{16/25} = 4/5$.'
      },
      {
        id: 2,
        question: 'Simplify the expression: $(1 + \\tan^2\\theta) \\cdot \\cos^2\\theta$',
        options: ['1', '\\sin^2\\theta', '\\tan^2\\theta', '\\sec^2\\theta'],
        correctAnswer: 0,
        hint: 'Remember that $1 + \\tan^2\\theta = \\sec^2\\theta$, and $\\sec\\theta = \\frac{1}{\\cos\\theta}$.',
        explanation: 'Substitute the secant identity: $(1 + \\tan^2\\theta) = \\sec^2\\theta$. Then $\\sec^2\\theta \\cdot \\cos^2\\theta = \\frac{1}{\\cos^2\\theta} \\cdot \\cos^2\\theta = 1$.'
      },
      {
        id: 3,
        question: 'What is the value of $\\frac{\\sin(60^\\circ)}{\\cos(30^\\circ)} + \\tan(45^\\circ)$?',
        options: ['2', '1', '\\sqrt{3}', '0'],
        correctAnswer: 0,
        hint: 'Recall that $\\sin(60^\\circ) = \\frac{\\sqrt{3}}{2}$, $\\cos(30^\\circ) = \\frac{\\sqrt{3}}{2}$, and $\\tan(45^\\circ) = 1$.',
        explanation: 'Since $\\sin(60^\\circ) = \\cos(30^\\circ) = \\sqrt{3}/2$, their ratio is $1$. Adding $\\tan(45^\\circ) = 1$ gives $1 + 1 = 2$.'
      },
      {
        id: 4,
        question: 'Which of the following is equivalent to $\\frac{1 - \\cos(2\\theta)}{2}$?',
        options: ['\\sin^2(\\theta)', '\\cos^2(\\theta)', '\\tan^2(\\theta)', '\\sin(\\theta)'],
        correctAnswer: 0,
        hint: 'Use the double-angle cosine formula: $\\cos(2\\theta) = 1 - 2\\sin^2(\\theta)$ and isolate $\\sin^2(\\theta)$.',
        explanation: 'From $\\cos(2\\theta) = 1 - 2\\sin^2\\theta$, rearranging gives $2\\sin^2\\theta = 1 - \\cos(2\\theta) \\implies \\sin^2\\theta = \\frac{1 - \\cos(2\\theta)}{2}$.'
      }
    ]
  },
  {
    id: 'math-calculus',
    title: 'Calculus: Derivatives & Limits',
    subject: 'Mathematics',
    standard: 'Class 12',
    weightageMarks: '35 Marks (Board + JEE)',
    description: 'Understand limits, chain rule differentiation, and rate of change derivations step-by-step.',
    formulaOverview: [
      { name: 'First Principle Derivative', latex: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}' },
      { name: 'Power Rule', latex: '\\frac{d}{dx}(x^n) = n x^{n-1}' },
      { name: 'Product Rule (Leibniz)', latex: '\\frac{d}{dx}(u \\cdot v) = u \\frac{dv}{dx} + v \\frac{du}{dx}' },
      { name: 'Chain Rule', latex: '\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}' }
    ],
    animationTopic: 'First Principle Derivation of d/dx (x²)',
    calculationSteps: [
      {
        stepNumber: 1,
        title: 'Step 1: Set up the Definition of Derivative',
        formula: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}, \\quad \\text{where } f(x) = x^2',
        explanation: 'The instantaneous rate of change is defined as the limiting value of the average slope as step-size h approaches 0.',
        activeHighlight: 'Definition of derivative limit quotient',
        visualState: 'Secant line transitioning into tangent slope.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Expand f(x+h) using Binomial Theorem',
        formula: 'f(x+h) = (x+h)^2 = x^2 + 2xh + h^2',
        explanation: 'Expand the squared term algebraically to express the numerator in terms of powers of x and h.',
        activeHighlight: 'Expansion: x² + 2xh + h²',
        visualState: 'Square geometric area breakdown into x², 2xh, and h².'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Substitute and Subtract f(x)',
        formula: '\\frac{f(x+h) - f(x)}{h} = \\frac{(x^2 + 2xh + h^2) - x^2}{h} = \\frac{2xh + h^2}{h}',
        explanation: 'Notice that x² cancels with -x², eliminating the constant term and leaving terms containing h.',
        activeHighlight: 'x² cancels out, leaving (2xh + h²)/h',
        visualState: 'Algebraic cancellation.'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Factor Out h and Evaluate the Limit',
        formula: '\\lim_{h \\to 0} \\frac{h(2x + h)}{h} = \\lim_{h \\to 0} (2x + h) = \\mathbf{2x}',
        explanation: 'Dividing numerator and denominator by h yields (2x + h). As h -> 0, the term h vanishes, leaving 2x. Thus d/dx (x²) = 2x!',
        activeHighlight: 'Limit evaluation: 2x + 0 = 2x',
        visualState: 'Exact tangent slope function derived.'
      }
    ],
    interactiveSandbox: {
      defaultParam: 3,
      label: 'Evaluate Tangent Slope at x',
      unit: '',
      options: [1, 2, 3, 4, 5],
      computeFormula: (val) => {
        const slope = 2 * val
        return {
          step1: `\\text{Function: } f(x) = x^2 \\implies f(${val}) = ${val * val}`,
          step2: `\\text{Derivative Function: } f'(x) = 2x`,
          step3: `\\text{Substitute } x = ${val}: f'(${val}) = 2 \\times ${val}`,
          result: `\\text{Slope of Tangent at } x = ${val} \\text{ is } \\mathbf{${slope}}`
        }
      }
    },
    testQuestions: [
      {
        id: 1,
        question: 'Evaluate the derivative of $f(x) = x^3 - 5x + 7$ at $x = 2$.',
        options: ['7', '12', '5', '9'],
        correctAnswer: 0,
        hint: 'First find $f\'(x) = 3x^2 - 5$. Then substitute $x = 2$.',
        explanation: '$f\'(x) = 3x^2 - 5$. For $x = 2$, $f\'(2) = 3(2)^2 - 5 = 3(4) - 5 = 12 - 5 = 7$.'
      },
      {
        id: 2,
        question: 'What is the limit: $\\lim_{x \\to 0} \\frac{\\sin(3x)}{x}$?',
        options: ['3', '1', '0', '\\frac{1}{3}'],
        correctAnswer: 0,
        hint: 'Use the standard limit $\\lim_{u \\to 0} \\frac{\\sin(u)}{u} = 1$. Multiply and divide by 3.',
        explanation: '$\\lim_{x \\to 0} \\frac{\\sin(3x)}{x} = 3 \\cdot \\lim_{x \\to 0} \\frac{\\sin(3x)}{3x} = 3 \\cdot 1 = 3$.'
      }
    ]
  },
  {
    id: 'phy-optics',
    title: 'Ray Optics & Refraction',
    subject: 'Physics',
    standard: 'Class 12',
    weightageMarks: '14 Marks (Board Blueprint)',
    description: 'Snell\'s law, total internal reflection, lens maker formula derivations, and step-by-step ray tracing.',
    formulaOverview: [
      { name: 'Snell\'s Law of Refraction', latex: 'n_1 \\sin(\\theta_1) = n_2 \\sin(\\theta_2)' },
      { name: 'Lens Maker\'s Formula', latex: '\\frac{1}{f} = (n - 1) \\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)' },
      { name: 'Critical Angle for TIR', latex: '\\sin(\\theta_c) = \\frac{n_2}{n_1} \\quad (n_1 > n_2)' }
    ],
    animationTopic: 'Step-by-Step Derivation of Critical Angle & Total Internal Reflection',
    calculationSteps: [
      {
        stepNumber: 1,
        title: 'Step 1: Ray Propagating from Denser to Rarer Medium',
        formula: 'n_1 \\sin(\\theta_1) = n_2 \\sin(\\theta_2), \\quad \\text{where } n_1 > n_2',
        explanation: 'When light travels from an optically denser medium (refractive index n1) into a rarer medium (n2), the refracted ray bends away from the normal.',
        activeHighlight: 'n1 > n2 implies θ2 > θ1',
        visualState: 'Ray bending away from the normal.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Condition for Critical Angle (θ1 = θc)',
        formula: '\\text{At } \\theta_1 = \\theta_c, \\quad \\text{Angle of Refraction } \\theta_2 = 90^\\circ',
        explanation: 'As the incident angle increases, the angle of refraction reaches 90 degrees, grazing along the interface boundary.',
        activeHighlight: 'θ2 = 90° (sin(90°) = 1)',
        visualState: 'Refracted ray grazes the boundary line.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Substitute into Snell\'s Law',
        formula: 'n_1 \\sin(\\theta_c) = n_2 \\sin(90^\\circ) = n_2 \\cdot 1',
        explanation: 'Substitute sin(90°) = 1 into the Snell\'s law formulation.',
        activeHighlight: 'n1 · sin(θc) = n2',
        visualState: 'Algebraic substitution completed.'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Solve for Critical Angle θc',
        formula: '\\sin(\\theta_c) = \\frac{n_2}{n_1} \\implies \\mathbf{\\theta_c = \\sin^{-1}\\left(\\frac{n_2}{n_1}\\right)}',
        explanation: 'For any angle of incidence greater than θc, no refraction can occur and the entire energy reflects back into the denser medium (TIR).',
        activeHighlight: 'θc = arcsin(n2 / n1)',
        visualState: 'Total internal reflection condition verified.'
      }
    ],
    interactiveSandbox: {
      defaultParam: 1.5,
      label: 'Denser Medium Refractive Index (n₁)',
      unit: '',
      options: [1.33, 1.5, 1.6, 2.42],
      computeFormula: (n1) => {
        const n2 = 1.0 // Air
        const ratio = n2 / n1
        const angleDeg = (Math.asin(ratio) * 180 / Math.PI).toFixed(2)
        return {
          step1: `\\text{Denser Medium } n_1 = ${n1}, \\quad \\text{Air } n_2 = 1.0`,
          step2: `\\sin(\\theta_c) = \\frac{n_2}{n_1} = \\frac{1.0}{${n1}} = ${ratio.toFixed(4)}`,
          step3: `\\theta_c = \\sin^{-1}(${ratio.toFixed(4)})`,
          result: `\\text{Critical Angle } \\theta_c = \\mathbf{${angleDeg}^\\circ}`
        }
      }
    },
    testQuestions: [
      {
        id: 1,
        question: 'Calculate the critical angle for glass with refractive index $n = 1.5$ entering air ($n = 1$).',
        options: ['41.8^\\circ', '30^\\circ', '45^\\circ', '60^\\circ'],
        correctAnswer: 0,
        hint: '$\\sin(\\theta_c) = \\frac{1}{1.5} = \\frac{2}{3} \\approx 0.6667$. Find $\\arcsin(0.6667)$.',
        explanation: '$\\sin\\theta_c = 1 / 1.5 = 2/3 \\approx 0.6667$. Thus $\\theta_c = \\sin^{-1}(2/3) \\approx 41.8^\\circ$.'
      }
    ]
  }
]

export default function LearnBySubjectsPage() {
  const [selectedStandard, setSelectedStandard] = useState<'All' | 'Class 10' | 'Class 12' | 'Competitive'>('All')
  const [selectedSubject, setSelectedSubject] = useState<string>('Mathematics')
  const [activeChapterId, setActiveChapterId] = useState<string>('math-trigonometry')
  const [activeViewTab, setActiveViewTab] = useState<'animation' | 'sandbox' | 'test'>('animation')

  // Animation Step Player State
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false)

  // Sandbox Parameter State
  const activeChapter = useMemo(() => {
    return CHAPTERS_DATABASE.find(c => c.id === activeChapterId) || CHAPTERS_DATABASE[0]
  }, [activeChapterId])

  const [sandboxValue, setSandboxValue] = useState<number>(activeChapter.interactiveSandbox.defaultParam)

  // Dynamic AI Questions State + 3-HINTS Limit!
  const [currentQuestions, setCurrentQuestions] = useState<Array<{
    id: number
    question: string
    options: string[]
    correctAnswer: number
    hint: string
    explanation: string
  }>>(activeChapter.testQuestions)
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false)
  const [aiNotice, setAiNotice] = useState<string | null>(null)

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [revealedHints, setRevealedHints] = useState<Record<number, boolean>>({})
  const [hintsRemaining, setHintsRemaining] = useState<number>(3)
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false)
  const [hintAlertMsg, setHintAlertMsg] = useState<string | null>(null)

  // Auto-step animation loop
  useEffect(() => {
    let interval: any
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= activeChapter.calculationSteps.length - 1) {
            setIsAutoPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 3500)
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying, activeChapter])

  // Reset states when changing chapter
  useEffect(() => {
    setCurrentStepIdx(0)
    setIsAutoPlaying(false)
    setSandboxValue(activeChapter.interactiveSandbox.defaultParam)
    setCurrentQuestions(activeChapter.testQuestions)
    setSelectedAnswers({})
    setRevealedHints({})
    setHintsRemaining(3)
    setTestSubmitted(false)
    setHintAlertMsg(null)
    setAiNotice(null)
  }, [activeChapterId, activeChapter])

  // Generate fresh questions via Gemini AI Search Engine
  const handleGenerateAiQuestions = async () => {
    try {
      setIsAiGenerating(true)
      setHintAlertMsg(null)
      const res = await fetch('/api/generate-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: `${activeChapter.subject}: ${activeChapter.title}`,
          classLevel: activeChapter.standard === 'Competitive' ? 'Class 12' : activeChapter.standard,
          board: 'CBSE',
          difficulty: 'Medium',
          format: 'MCQ Quiz',
          count: 4
        })
      })

      if (!res.ok) throw new Error('Failed to fetch from AI')
      const data = await res.json()

      if (data.items && Array.isArray(data.items) && data.items.length > 0) {
        const formatted = data.items.map((item: any, idx: number) => ({
          id: idx + 1,
          question: item.question,
          options: item.options || [],
          correctAnswer: typeof item.correctAnswer === 'number' ? item.correctAnswer : 0,
          hint: item.hint || 'Review the step-by-step calculation formulas in the Animation tab.',
          explanation: item.explanation || 'Refer to the textbook standard derivation steps.'
        }))
        setCurrentQuestions(formatted)
        setSelectedAnswers({})
        setRevealedHints({})
        setHintsRemaining(3)
        setTestSubmitted(false)
        setAiNotice('⚡ Generated fresh exam questions via Google Gemini AI!')
      }
    } catch (err) {
      console.error('Error generating AI test:', err)
      setHintAlertMsg('Could not connect to AI generator. Switched to curated board blueprint questions.')
    } finally {
      setIsAiGenerating(false)
    }
  }

  // Filtered chapters
  const filteredChapters = useMemo(() => {
    return CHAPTERS_DATABASE.filter(chap => {
      const matchStd = selectedStandard === 'All' || chap.standard === selectedStandard
      const matchSubj = chap.subject.toLowerCase() === selectedSubject.toLowerCase()
      return matchStd && matchSubj
    })
  }, [selectedStandard, selectedSubject])

  // 3-Hints Request Handler
  const handleRequestHint = (qId: number) => {
    if (revealedHints[qId]) return // Already revealed for this question
    if (hintsRemaining <= 0) {
      setHintAlertMsg('⚠️ You have used all 3 hints allowed for this test! Apply your mastery.')
      setTimeout(() => setHintAlertMsg(null), 3000)
      return
    }

    setRevealedHints(prev => ({ ...prev, [qId]: true }))
    setHintsRemaining(prev => prev - 1)
  }

  // Calculate Test Score
  const scoreReport = useMemo(() => {
    let correct = 0
    currentQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++
      }
    })
    return {
      score: correct,
      total: currentQuestions.length,
      percentage: Math.round((correct / currentQuestions.length) * 100),
      hintsUsed: 3 - hintsRemaining
    }
  }, [currentQuestions, selectedAnswers, hintsRemaining])

  const sandboxResult = useMemo(() => {
    return activeChapter.interactiveSandbox.computeFormula(sandboxValue)
  }, [activeChapter, sandboxValue])

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Concept & Calculation Studio
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Learn by <span className="gradient-text">Subjects & Chapters</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Explore step-by-step animated calculation proofs, interactive formula sandboxes, and AI tests with 3-hint limits.
          </p>
        </div>

        {/* Standard Selector Filter */}
        <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-2xl border border-white/10 text-xs">
          {(['All', 'Class 10', 'Class 12', 'Competitive'] as const).map(std => (
            <button
              key={std}
              onClick={() => setSelectedStandard(std)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                selectedStandard === std 
                  ? 'bg-cyan-400 text-midnight-900 shadow-md' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {std}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Pills Row */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 border-b border-white/10">
        {['Mathematics', 'Physics', 'Chemistry', 'Biology'].map(subj => (
          <button
            key={subj}
            onClick={() => {
              setSelectedSubject(subj)
              // Select first chapter of that subject if available
              const firstMatch = CHAPTERS_DATABASE.find(c => c.subject.toLowerCase() === subj.toLowerCase())
              if (firstMatch) setActiveChapterId(firstMatch.id)
            }}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 shrink-0 ${
              selectedSubject === subj
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-midnight-900 shadow-[0_0_15px_rgba(0,212,255,0.3)]'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            {subj}
          </button>
        ))}
      </div>

      {/* Main Learning Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Chapters Navigation List */}
        <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-3xl p-5 space-y-4 backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> {selectedSubject} Chapters
            </span>
            <span className="text-[11px] text-gray-500 font-semibold">{filteredChapters.length} Chapters</span>
          </div>

          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {filteredChapters.map(chap => {
              const isActive = chap.id === activeChapterId
              return (
                <div
                  key={chap.id}
                  onClick={() => setActiveChapterId(chap.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isActive
                      ? 'bg-cyan-400/15 border-cyan-400 shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full border border-cyan-400/20">
                      {chap.standard}
                    </span>
                    <span className="text-[10px] font-bold text-green-400 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> {chap.weightageMarks}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-white text-sm leading-snug">{chap.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{chap.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Interactive Subject Detail Hub */}
        <div className="lg:col-span-8 space-y-6">
          {/* Chapter Details Banner */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-7 backdrop-blur-xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-cyan-400 bg-cyan-400/10 px-2.5 py-0.5 rounded-full">
                    {activeChapter.subject} • {activeChapter.standard}
                  </span>
                  <span className="text-xs text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full font-semibold">
                    {activeChapter.weightageMarks}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white mt-2">{activeChapter.title}</h2>
                <p className="text-xs text-gray-300 mt-1">{activeChapter.description}</p>
              </div>

              {/* View Tabs Selector */}
              <div className="flex items-center gap-1.5 bg-midnight-900/80 p-1.5 rounded-2xl border border-white/10 text-xs shrink-0">
                <button
                  onClick={() => setActiveViewTab('animation')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                    activeViewTab === 'animation'
                      ? 'bg-cyan-400 text-midnight-900 shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Calculation Steps
                </button>
                <button
                  onClick={() => setActiveViewTab('sandbox')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                    activeViewTab === 'sandbox'
                      ? 'bg-cyan-400 text-midnight-900 shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Interactive Sandbox
                </button>
                <button
                  onClick={() => setActiveViewTab('test')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                    activeViewTab === 'test'
                      ? 'bg-cyan-400 text-midnight-900 shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  AI Test (3 Hints)
                </button>
              </div>
            </div>

            {/* TAB 1: Step-by-Step Animated Calculation Engine */}
            {activeViewTab === 'animation' && (
              <div className="mt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> {activeChapter.animationTopic}
                  </span>
                  
                  {/* Step Control Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        isAutoPlaying
                          ? 'bg-purple-500 text-white animate-pulse'
                          : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white'
                      }`}
                    >
                      <Play className="w-3 h-3 fill-current" />
                      {isAutoPlaying ? 'Pause Auto Step' : 'Auto Play Derivation'}
                    </button>
                    <button
                      onClick={() => setCurrentStepIdx(prev => Math.max(0, prev - 1))}
                      disabled={currentStepIdx === 0}
                      className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-30"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono font-bold text-cyan-400 px-2">
                      {currentStepIdx + 1} / {activeChapter.calculationSteps.length}
                    </span>
                    <button
                      onClick={() => setCurrentStepIdx(prev => Math.min(activeChapter.calculationSteps.length - 1, prev + 1))}
                      disabled={currentStepIdx === activeChapter.calculationSteps.length - 1}
                      className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-30"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Step Progress Tracker */}
                <div className="grid grid-cols-4 gap-2">
                  {activeChapter.calculationSteps.map((step, idx) => (
                    <div
                      key={idx}
                      onClick={() => setCurrentStepIdx(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        idx === currentStepIdx
                          ? 'bg-cyan-400 shadow-[0_0_10px_rgba(0,212,255,0.6)]'
                          : idx < currentStepIdx
                          ? 'bg-green-500'
                          : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>

                {/* Animated Calculation Display Card */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStepIdx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="bg-midnight-900/90 border border-cyan-400/30 rounded-2xl p-6 space-y-4 shadow-xl"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-xs font-black text-cyan-300 bg-cyan-400/10 px-3 py-1 rounded-xl">
                        {activeChapter.calculationSteps[currentStepIdx].title}
                      </span>
                      <span className="text-[11px] text-green-400 font-bold bg-green-500/10 px-2.5 py-0.5 rounded-full">
                        Visual Step Verified
                      </span>
                    </div>

                    {/* Rendered Math Formula */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                      <MathRenderer 
                        content={`$$ ${activeChapter.calculationSteps[currentStepIdx].formula} $$`}
                      />
                    </div>

                    {/* Step Explanation Text */}
                    <p className="text-sm text-gray-200 leading-relaxed font-sans">
                      {activeChapter.calculationSteps[currentStepIdx].explanation}
                    </p>

                    {/* Step Highlight Box */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 bg-cyan-400/5 p-3 rounded-xl border border-cyan-400/15">
                      <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Key Mathematical Logic: <strong>{activeChapter.calculationSteps[currentStepIdx].activeHighlight}</strong></span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Formula Cheat Sheet Overview */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Formula Reference Matrix</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeChapter.formulaOverview.map((f, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                        <span className="text-[11px] font-semibold text-gray-400">{f.name}</span>
                        <MathRenderer content={`$$ ${f.latex} $$`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Interactive Calculation Sandbox */}
            {activeViewTab === 'sandbox' && (
              <div className="mt-6 space-y-6">
                <div className="p-5 rounded-2xl bg-midnight-900/80 border border-cyan-400/20 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-extrabold text-white text-base">Interactive Formula Simulator</h3>
                      <p className="text-xs text-gray-400">Change parameters below to watch mathematical steps compute dynamically.</p>
                    </div>
                    
                    {/* Parameter Options */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-cyan-400 font-bold">{activeChapter.interactiveSandbox.label}:</span>
                      <div className="flex gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                        {activeChapter.interactiveSandbox.options.map(val => (
                          <button
                            key={val}
                            onClick={() => setSandboxValue(val)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              sandboxValue === val
                                ? 'bg-cyan-400 text-midnight-900 shadow-md'
                                : 'text-gray-400 hover:text-white'
                            }`}
                          >
                            {val}{activeChapter.interactiveSandbox.unit}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Computed Step-by-Step Breakdown */}
                  <div className="space-y-3 pt-3 border-t border-white/10">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-semibold">1. Evaluate Trigonometric Values:</span>
                      <MathRenderer content={`$ ${sandboxResult.step1} $`} />
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-semibold">2. Calculate Square of Sine:</span>
                      <MathRenderer content={`$ ${sandboxResult.step2} $`} />
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-semibold">3. Calculate Square of Cosine:</span>
                      <MathRenderer content={`$ ${sandboxResult.step3} $`} />
                    </div>

                    <div className="p-4 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-between">
                      <span className="text-xs text-cyan-300 font-extrabold">Final Verified Sum:</span>
                      <MathRenderer content={`$ ${sandboxResult.result} $`} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Chapter AI Test with 3-HINTS Limit! */}
            {activeViewTab === 'test' && (
              <div className="mt-6 space-y-6">
                {/* 3 Hints Counter & AI Generator Status Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-cyan-400/10 border border-cyan-400/30">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-cyan-400" />
                      <h3 className="font-extrabold text-white text-base">
                        Chapter Mastery Assessment
                      </h3>
                      {aiNotice && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 animate-pulse">
                          AI Live Exam
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-300">
                      Solve the 10-year recurring board exam questions below. You have **strictly 3 hints** for this test.
                    </p>
                  </div>

                  {/* Actions & Hints Remaining Badge */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleGenerateAiQuestions}
                      disabled={isAiGenerating || testSubmitted}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-midnight-900 font-extrabold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all cursor-pointer"
                    >
                      <Sparkles className={`w-3.5 h-3.5 ${isAiGenerating ? 'animate-spin' : ''}`} />
                      {isAiGenerating ? 'Synthesizing with AI...' : 'Generate New Questions with AI'}
                    </button>

                    <div className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 border ${
                      hintsRemaining > 1
                        ? 'bg-cyan-400/20 text-cyan-300 border-cyan-400/40 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                        : hintsRemaining === 1
                        ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40 animate-pulse'
                        : 'bg-red-500/20 text-red-300 border-red-500/40'
                    }`}>
                      <Lightbulb className="w-4 h-4" />
                      <span>{hintsRemaining} of 3 Hints Remaining</span>
                    </div>
                  </div>
                </div>

                {/* AI Notice Banner */}
                {aiNotice && (
                  <div className="p-3 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-xs flex items-center justify-between">
                    <span className="flex items-center gap-2 font-medium">
                      <Sparkles className="w-3.5 h-3.5" />
                      {aiNotice}
                    </span>
                    <button
                      onClick={() => {
                        setCurrentQuestions(activeChapter.testQuestions)
                        setSelectedAnswers({})
                        setRevealedHints({})
                        setHintsRemaining(3)
                        setTestSubmitted(false)
                        setAiNotice(null)
                      }}
                      className="text-[11px] underline text-gray-400 hover:text-white"
                    >
                      Reset to Standard 10-Yr Blueprint
                    </button>
                  </div>
                )}

                {/* Alert Toast if out of hints */}
                {hintAlertMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-semibold text-center"
                  >
                    {hintAlertMsg}
                  </motion.div>
                )}

                {/* Question List */}
                <div className="space-y-6">
                  {currentQuestions.map((q, idx) => {
                    const isHintRevealed = revealedHints[q.id]
                    const studentAns = selectedAnswers[q.id]
                    const isCorrect = testSubmitted && studentAns === q.correctAnswer
                    const isIncorrect = testSubmitted && studentAns !== undefined && studentAns !== q.correctAnswer

                    return (
                      <div
                        key={q.id}
                        className={`p-6 rounded-3xl border transition-all space-y-4 ${
                          isCorrect
                            ? 'bg-green-500/10 border-green-500/40'
                            : isIncorrect
                            ? 'bg-red-500/10 border-red-500/40'
                            : 'bg-white/5 border-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-xl">
                            Question {idx + 1}
                          </span>

                          {/* Hint Button */}
                          {!testSubmitted && (
                            <button
                              onClick={() => handleRequestHint(q.id)}
                              disabled={isHintRevealed || hintsRemaining <= 0}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                                isHintRevealed
                                  ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                                  : hintsRemaining > 0
                                  ? 'bg-white/5 border border-white/10 text-gray-300 hover:text-cyan-300 hover:bg-cyan-400/10'
                                  : 'opacity-40 cursor-not-allowed bg-white/5 border border-white/10 text-gray-500'
                              }`}
                            >
                              <Lightbulb className="w-3.5 h-3.5" />
                              {isHintRevealed ? 'Hint Active' : `Use Hint (${hintsRemaining} left)`}
                            </button>
                          )}
                        </div>

                        {/* Question Text */}
                        <MathRenderer content={q.question} className="text-base font-semibold text-white" />

                        {/* Revealed Hint Box */}
                        {isHintRevealed && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="p-3.5 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 text-xs space-y-1"
                          >
                            <span className="font-bold flex items-center gap-1.5 text-yellow-300">
                              <Lightbulb className="w-3.5 h-3.5" /> AI Guidance Hint:
                            </span>
                            <MathRenderer content={q.hint} />
                          </motion.div>
                        )}

                        {/* Options Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = studentAns === optIdx
                            const isActual = q.correctAnswer === optIdx

                            let optStyle = 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                            if (testSubmitted) {
                              if (isActual) optStyle = 'bg-green-500/20 border-green-500 text-green-300 font-bold'
                              else if (isSelected && !isActual) optStyle = 'bg-red-500/20 border-red-500 text-red-300 line-through'
                            } else if (isSelected) {
                              optStyle = 'bg-cyan-400/20 border-cyan-400 text-white shadow-[0_0_12px_rgba(0,212,255,0.2)]'
                            }

                            return (
                              <button
                                key={optIdx}
                                type="button"
                                disabled={testSubmitted}
                                onClick={() => setSelectedAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                                className={`p-3.5 rounded-xl border text-xs text-left flex items-center gap-3 transition-all cursor-pointer ${optStyle}`}
                              >
                                <span className="w-6 h-6 rounded-lg bg-black/30 flex items-center justify-center font-bold shrink-0">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <MathRenderer content={opt} className="flex-1" />
                              </button>
                            )
                          })}
                        </div>

                        {/* Explanation after submission */}
                        {testSubmitted && (
                          <div className="mt-3 p-3.5 rounded-xl bg-cyan-400/5 border border-cyan-400/15 space-y-1 text-xs">
                            <span className="font-bold text-cyan-400 block">Explanation:</span>
                            <MathRenderer content={q.explanation} />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Bottom Test Controls */}
                {!testSubmitted ? (
                  <div className="flex justify-end pt-4 border-t border-white/10">
                    <button
                      onClick={() => setTestSubmitted(true)}
                      disabled={Object.keys(selectedAnswers).length === 0}
                      className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-midnight-900 font-extrabold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Submit & Grade Assessment
                    </button>
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-midnight-900/90 border border-cyan-400/40 space-y-4 text-center">
                    <h3 className="text-xl font-extrabold text-white">
                      Your Score: <span className="gradient-text">{scoreReport.score}</span> / {scoreReport.total} ({scoreReport.percentage}%)
                    </h3>
                    <p className="text-xs text-gray-400">
                      Hints Used: {scoreReport.hintsUsed} / 3 • {scoreReport.percentage >= 75 ? '🎉 Great job on this chapter!' : 'Review the steps in the Animation tab to boost your concepts.'}
                    </p>
                    <button
                      onClick={() => {
                        setSelectedAnswers({})
                        setRevealedHints({})
                        setHintsRemaining(3)
                        setTestSubmitted(false)
                      }}
                      className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs inline-flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Retake Chapter Test
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
