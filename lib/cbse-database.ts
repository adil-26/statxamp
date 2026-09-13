export interface CalculationStep {
  stepNumber: number
  title: string
  formula: string
  explanation: string
  activeHighlight: string
  visualState: string
}

export const INDIAN_BOARDS_LIST = [
  'All Boards',
  'CBSE',
  'ICSE / ISC',
  'Maharashtra State Board (HSC/SSC)',
  'UP Board',
  'Karnataka State Board',
  'Tamil Nadu Board',
  'West Bengal Board',
  'NTA (JEE / NEET)'
] as const

export type IndianBoard = typeof INDIAN_BOARDS_LIST[number]

export interface ChapterData {
  id: string
  title: string
  subject: 'Mathematics' | 'Physics' | 'Chemistry' | 'Biology'
  standard: 'Class 10' | 'Class 12' | 'Competitive'
  boards?: string[]
  weightageMarks: string
  description: string
  topics: string[]
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

export const CBSE_CHAPTERS_CATALOG: ChapterData[] = [
  // ==========================================
  // CLASS 10 MATHEMATICS
  // ==========================================
  {
    id: 'class10-math-trigonometry',
    title: 'Introduction to Trigonometry & Identities',
    subject: 'Mathematics',
    standard: 'Class 10',
    weightageMarks: '12 Marks (High Weightage)',
    description: 'Master right-triangle ratios, values at standard angles (0°, 30°, 45°, 60°, 90°), and Pythagorean identities.',
    topics: ['Trigonometric Ratios', 'Values at Specific Angles', 'Trigonometric Identities (sin²θ + cos²θ = 1)', 'Complementary Angles Applications'],
    formulaOverview: [
      { name: 'Pythagorean Fundamental Identity', latex: '\\sin^2(\\theta) + \\cos^2(\\theta) = 1' },
      { name: 'Secant-Tangent Identity', latex: '1 + \\tan^2(\\theta) = \\sec^2(\\theta)' },
      { name: 'Cosecant-Cotangent Identity', latex: '1 + \\cot^2(\\theta) = \\csc^2(\\theta)' },
      { name: 'Tangent Ratio', latex: '\\tan(\\theta) = \\frac{\\sin(\\theta)}{\\cos(\\theta)}' }
    ],
    animationTopic: 'Geometric Proof: sin²(θ) + cos²(θ) = 1',
    calculationSteps: [
      {
        stepNumber: 1,
        title: 'Step 1: Construct Right-Angled Triangle ABC',
        formula: 'AB^2 + BC^2 = AC^2 \\quad \\text{(Pythagorean Theorem)}',
        explanation: 'In right triangle ABC right-angled at B with acute angle θ at vertex A, AB is Base (adjacent), BC is Perpendicular (opposite), and AC is Hypotenuse.',
        activeHighlight: 'AC = Hypotenuse, BC = Perpendicular, AB = Base',
        visualState: 'Base AB, Perpendicular BC, Hypotenuse AC form right triangle.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Express Trigonometric Ratios',
        formula: '\\sin(\\theta) = \\frac{BC}{AC}, \\quad \\cos(\\theta) = \\frac{AB}{AC}',
        explanation: 'By definition, sine is the ratio of opposite side to hypotenuse, and cosine is the ratio of adjacent side to hypotenuse.',
        activeHighlight: 'sin(θ) = BC/AC and cos(θ) = AB/AC',
        visualState: 'Ratios represented as side quotients.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Square and Add Both Ratios',
        formula: '\\sin^2(\\theta) + \\cos^2(\\theta) = \\left(\\frac{BC}{AC}\\right)^2 + \\left(\\frac{AB}{AC}\\right)^2 = \\frac{BC^2 + AB^2}{AC^2}',
        explanation: 'Squaring fractions produces a common denominator of AC². Adding them combines the numerators: BC² + AB².',
        activeHighlight: 'Common denominator AC²',
        visualState: 'Algebraic sum over AC².'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Substitute Pythagorean Equality',
        formula: '\\text{Since } BC^2 + AB^2 = AC^2 \\implies \\frac{AC^2}{AC^2} = \\mathbf{1}',
        explanation: 'By Pythagoras theorem, BC² + AB² = AC². The numerator cancels the denominator exactly, proving sin²θ + cos²θ = 1 for any angle θ.',
        activeHighlight: 'Numerator cancels denominator to yield 1',
        visualState: 'Identity proved for all 0° ≤ θ ≤ 90°.'
      }
    ],
    interactiveSandbox: {
      defaultParam: 30,
      label: 'Angle θ',
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
        question: 'If $\\sin(\\theta) = \\frac{3}{5}$, what is the exact value of $\\cos(\\theta)$ in standard right-angle trigonometry?',
        options: ['\\frac{4}{5}', '\\frac{5}{4}', '\\frac{3}{4}', '\\frac{1}{5}'],
        correctAnswer: 0,
        hint: 'Use the fundamental identity $\\cos(\\theta) = \\sqrt{1 - \\sin^2(\\theta)}$. Compute $1 - (3/5)^2$.',
        explanation: '$\\cos\\theta = \\sqrt{1 - (3/5)^2} = \\sqrt{1 - 9/25} = \\sqrt{16/25} = 4/5$.'
      },
      {
        id: 2,
        question: 'Evaluate $(1 + \\tan^2\\theta)(1 - \\sin^2\\theta)$.',
        options: ['1', '\\sin^2\\theta', '\\cos^2\\theta', '0'],
        correctAnswer: 0,
        hint: 'Recall $1 + \\tan^2\\theta = \\sec^2\\theta$ and $1 - \\sin^2\\theta = \\cos^2\\theta$.',
        explanation: 'Substitute identities: $(1 + \\tan^2\\theta)(1 - \\sin^2\\theta) = \\sec^2\\theta \\cdot \\cos^2\\theta = \\frac{1}{\\cos^2\\theta} \\cdot \\cos^2\\theta = 1$.'
      }
    ]
  },
  {
    id: 'class10-math-quadratic',
    title: 'Quadratic Equations',
    subject: 'Mathematics',
    standard: 'Class 10',
    weightageMarks: '6 Marks',
    description: 'Standard form ax² + bx + c = 0, discriminant D = b² - 4ac, nature of roots, and quadratic formula derivation.',
    topics: ['Standard Form ax² + bx + c = 0', 'Method of Factorization', 'Completing the Square', 'Nature of Roots (D > 0, D = 0, D < 0)', 'Word Problems on Ages & Speeds'],
    formulaOverview: [
      { name: 'Quadratic Formula', latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
      { name: 'Discriminant (D)', latex: 'D = b^2 - 4ac' },
      { name: 'Sum of Roots', latex: '\\alpha + \\beta = -\\frac{b}{a}' },
      { name: 'Product of Roots', latex: '\\alpha \\beta = \\frac{c}{a}' }
    ],
    animationTopic: 'Step-by-Step Derivation of the Quadratic Formula',
    calculationSteps: [
      {
        stepNumber: 1,
        title: 'Step 1: Divide by Leading Coefficient a',
        formula: 'ax^2 + bx + c = 0 \\implies x^2 + \\frac{b}{a}x + \\frac{c}{a} = 0',
        explanation: 'Normalize the equation by dividing all terms by a (assuming a ≠ 0). Move the constant term c/a to the right side.',
        activeHighlight: 'x² + (b/a)x = -c/a',
        visualState: 'Quadratic term has unit coefficient 1.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Complete the Square',
        formula: 'x^2 + \\frac{b}{a}x + \\left(\\frac{b}{2a}\\right)^2 = -\\frac{c}{a} + \\frac{b^2}{4a^2}',
        explanation: 'Add the square of half the coefficient of x, which is (b/2a)², to both sides to form a perfect square trinomial on the left.',
        activeHighlight: 'Added (b/2a)² = b²/(4a²) to both sides',
        visualState: 'Left side transforms into [x + b/(2a)]².'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Combine Right Side Over Common Denominator 4a²',
        formula: '\\left(x + \\frac{b}{2a}\\right)^2 = \\frac{b^2 - 4ac}{4a^2}',
        explanation: 'Multiply -c/a by 4a/4a to obtain -4ac/(4a²). Combining with b²/(4a²) yields (b² - 4ac)/(4a²).',
        activeHighlight: 'Discriminant D = b² - 4ac in numerator',
        visualState: 'Fraction with denominator (2a)².'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Extract Square Root & Isolate x',
        formula: 'x + \\frac{b}{2a} = \\pm \\frac{\\sqrt{b^2 - 4ac}}{2a} \\implies x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
        explanation: 'Taking the square root of both sides gives ±√(b² - 4ac)/(2a). Subtracting b/(2a) yields the famous Quadratic Formula.',
        activeHighlight: 'Two distinct or real roots determined by D',
        visualState: 'Final verified formula derived.'
      }
    ],
    interactiveSandbox: {
      defaultParam: 4,
      label: 'Select Constant c for 2x² - 6x + c = 0',
      unit: '',
      options: [1, 2, 4, 5],
      computeFormula: (c) => {
        const a = 2
        const b = -6
        const D = b * b - 4 * a * c
        const nature = D > 0 ? 'Two Distinct Real Roots' : D === 0 ? 'Two Equal Real Roots' : 'No Real Roots (Complex)'
        return {
          step1: `a = 2, \\quad b = -6, \\quad c = ${c}`,
          step2: `D = b^2 - 4ac = (-6)^2 - 4(2)(${c}) = 36 - ${8 * c}`,
          step3: `D = ${D} \\implies \\text{${nature}}`,
          result: `x = \\frac{6 \\pm \\sqrt{${D}}}{4}`
        }
      }
    },
    testQuestions: [
      {
        id: 1,
        question: 'If the quadratic equation $kx^2 - 4x + 1 = 0$ has real and equal roots, what is the value of $k$?',
        options: ['4', '16', '2', '1'],
        correctAnswer: 0,
        hint: 'For equal roots, set the discriminant $D = b^2 - 4ac = 0$. Here $b = -4, a = k, c = 1$.',
        explanation: '$D = (-4)^2 - 4(k)(1) = 16 - 4k = 0 \\implies 4k = 16 \\implies k = 4$.'
      }
    ]
  },
  {
    id: 'class10-math-ap',
    title: 'Arithmetic Progressions (AP)',
    subject: 'Mathematics',
    standard: 'Class 10',
    weightageMarks: '6 Marks',
    description: 'First term a, common difference d, nth term aₙ = a + (n-1)d, and sum of n terms Sₙ = n/2[2a + (n-1)d].',
    topics: ['Concept of AP & Common Difference d', 'General nth Term aₙ = a + (n - 1)d', 'Sum of First n Terms Sₙ', 'Applications in Daily Life Word Problems'],
    formulaOverview: [
      { name: 'nth Term of an AP', latex: 'a_n = a + (n - 1)d' },
      { name: 'Sum of n Terms', latex: 'S_n = \\frac{n}{2}[2a + (n - 1)d] = \\frac{n}{2}(a + l)' },
      { name: 'Common Difference', latex: 'd = a_k - a_{k-1}' }
    ],
    animationTopic: 'Derivation of Sum of n Terms: Gauss Inversion Proof',
    calculationSteps: [
      {
        stepNumber: 1,
        title: 'Step 1: Write Sum in Forward Order',
        formula: 'S_n = a + (a + d) + (a + 2d) + \\dots + (l - d) + l',
        explanation: 'Express the sum of the first n terms starting from first term a and finishing at the last term l.',
        activeHighlight: 'Forward sequence from a to l',
        visualState: 'Ascending summation.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Write Sum in Reverse Order',
        formula: 'S_n = l + (l - d) + (l - 2d) + \\dots + (a + d) + a',
        explanation: 'Reverse the order of terms. The total sum Sₙ remains unchanged because addition is commutative.',
        activeHighlight: 'Descending sequence from l to a',
        visualState: 'Two inverted parallel rows.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Add the Two Equations Column by Column',
        formula: '2S_n = (a + l) + (a + l) + (a + l) + \\dots + (a + l) \\quad \\text{(n times)}',
        explanation: 'Each corresponding pair adds up to exactly (a + l). Since there are n pairs, the total sum is n(a + l).',
        activeHighlight: 'Every column equals (a + l)',
        visualState: 'n copies of (a + l).'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Divide by 2 to Solve for Sₙ',
        formula: 'S_n = \\frac{n}{2}(a + l) = \\frac{n}{2}[2a + (n - 1)d]',
        explanation: 'Substituting the last term l = a + (n - 1)d yields Sₙ = (n/2)[2a + (n - 1)d]. Proven!',
        activeHighlight: 'Final master formula for sum of AP',
        visualState: 'Proven for all natural numbers n.'
      }
    ],
    interactiveSandbox: {
      defaultParam: 5,
      label: 'Number of Terms n (a=2, d=3)',
      unit: ' terms',
      options: [3, 5, 8, 10, 15],
      computeFormula: (n) => {
        const a = 2
        const d = 3
        const an = a + (n - 1) * d
        const Sn = (n * (2 * a + (n - 1) * d)) / 2
        return {
          step1: `a = 2, \\quad d = 3, \\quad n = ${n}`,
          step2: `a_{${n}} = 2 + (${n}-1)(3) = 2 + ${3 * (n - 1)} = ${an}`,
          step3: `S_{${n}} = \\frac{${n}}{2} \\times [4 + ${3 * (n - 1)}] = \\frac{${n}}{2} \\times ${4 + 3 * (n - 1)}`,
          result: `\\text{Total Sum } S_{${n}} = \\mathbf{${Sn}}`
        }
      }
    },
    testQuestions: [
      {
        id: 1,
        question: 'What is the 20th term of the AP: $2, 7, 12, 17, \\dots$?',
        options: ['97', '95', '102', '92'],
        correctAnswer: 0,
        hint: 'Identify $a = 2$, common difference $d = 7 - 2 = 5$. Compute $a_{20} = a + 19d$.',
        explanation: '$a_{20} = 2 + (20 - 1)(5) = 2 + 19 \\times 5 = 2 + 95 = 97$.'
      }
    ]
  },

  // ==========================================
  // CLASS 10 SCIENCE (PHYSICS & CHEMISTRY)
  // ==========================================
  {
    id: 'class10-science-electricity',
    title: 'Electricity & Ohm’s Law',
    subject: 'Physics',
    standard: 'Class 10',
    weightageMarks: '7 Marks',
    description: 'Electric current I = Q/t, potential difference V = W/Q, Ohm’s Law V = IR, resistance in series and parallel, and Joule’s heating effect.',
    topics: ['Electric Current & Charge', 'Electric Potential & Potential Difference', 'Ohm’s Law & Resistance Factors', 'Resistors in Series & Parallel', 'Electric Power & Commercial Units of Energy'],
    formulaOverview: [
      { name: 'Ohm’s Law', latex: 'V = I R' },
      { name: 'Resistance Formula', latex: 'R = \\rho \\frac{l}{A}' },
      { name: 'Series Resistance', latex: 'R_s = R_1 + R_2 + R_3' },
      { name: 'Parallel Resistance', latex: '\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2}' },
      { name: 'Joule Heating', latex: 'H = I^2 R t = V I t' }
    ],
    animationTopic: 'Derivation of Equivalent Resistance in Parallel Circuits',
    calculationSteps: [
      {
        stepNumber: 1,
        title: 'Step 1: Identify Potential Difference Across Parallel Branches',
        formula: 'V_1 = V_2 = V \\quad \\text{(Common Potential Difference across nodes)}',
        explanation: 'In a parallel combination, both resistors are connected across the exact same pair of nodes, so the voltage across each is identical to battery voltage V.',
        activeHighlight: 'Voltage V is constant for all parallel branches',
        visualState: 'Two branches connected across terminals A and B.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Apply Conservation of Charge for Total Current',
        formula: 'I = I_1 + I_2',
        explanation: 'By Kirchhoff’s junction rule (conservation of electric charge), the total incoming current I splits into branch currents I₁ and I₂.',
        activeHighlight: 'I splits into I₁ through R₁ and I₂ through R₂',
        visualState: 'Current bifurcation at junction node.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Express Branch Currents Using Ohm’s Law',
        formula: 'I_1 = \\frac{V}{R_1}, \\quad I_2 = \\frac{V}{R_2}, \\quad I = \\frac{V}{R_p}',
        explanation: 'Substitute Ohm’s law for each branch current and for total equivalent circuit current.',
        activeHighlight: 'Substitute V/R for every current term',
        visualState: 'V/R_p = V/R_1 + V/R_2.'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Divide Both Sides by Voltage V',
        formula: '\\frac{V}{R_p} = V \\left(\\frac{1}{R_1} + \\frac{1}{R_2}\\right) \\implies \\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2}',
        explanation: 'Dividing throughout by V yields the reciprocal rule for parallel circuits. The equivalent resistance is always smaller than the smallest individual resistor.',
        activeHighlight: '1/R_p = (R₁ + R₂)/(R₁R₂)',
        visualState: 'Parallel combination formula verified.'
      }
    ],
    interactiveSandbox: {
      defaultParam: 6,
      label: 'Resistance R₂ (with R₁ = 3 Ω)',
      unit: ' Ω',
      options: [2, 3, 6, 12],
      computeFormula: (r2) => {
        const r1 = 3
        const rp = (r1 * r2) / (r1 + r2)
        return {
          step1: `R_1 = 3\\,\\Omega, \\quad R_2 = ${r2}\\,\\Omega`,
          step2: `\\frac{1}{R_p} = \\frac{1}{3} + \\frac{1}{${r2}} = \\frac{${r1 + r2}}{${r1 * r2}}`,
          step3: `R_p = \\frac{3 \\times ${r2}}{3 + ${r2}} = \\frac{${3 * r2}}{${3 + r2}}`,
          result: `\\text{Equivalent } R_p = \\mathbf{${rp.toFixed(2)}\\,\\Omega}`
        }
      }
    },
    testQuestions: [
      {
        id: 1,
        question: 'Two resistors of $6\\,\\Omega$ and $3\\,\\Omega$ are connected in parallel across a $6\\text{V}$ battery. What is the total current drawn from the battery?',
        options: ['3 A', '2 A', '1 A', '0.67 A'],
        correctAnswer: 0,
        hint: 'First find equivalent resistance $R_p = \\frac{6 \\times 3}{6 + 3} = 2\\,\\Omega$. Then apply $I = V/R_p$.',
        explanation: '$R_p = \\frac{18}{9} = 2\\,\\Omega$. Current $I = \\frac{V}{R_p} = \\frac{6}{2} = 3\\text{ A}$.'
      }
    ]
  },
  {
    id: 'class10-science-light',
    title: 'Light – Reflection and Refraction',
    subject: 'Physics',
    standard: 'Class 10',
    weightageMarks: '7 Marks',
    description: 'Mirror formula 1/f = 1/v + 1/u, lens formula 1/f = 1/v - 1/u, magnification m, Snell’s law, and power of a lens P = 1/f.',
    topics: ['Reflection by Spherical Mirrors', 'Mirror Formula & Magnification', 'Refraction of Light & Snell’s Law', 'Refraction by Spherical Lenses', 'Lens Formula & Power of a Lens'],
    formulaOverview: [
      { name: 'Mirror Formula', latex: '\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}' },
      { name: 'Lens Formula', latex: '\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}' },
      { name: 'Snell’s Law of Refraction', latex: 'n_1 \\sin(i) = n_2 \\sin(r)' },
      { name: 'Lens Power', latex: 'P = \\frac{1}{f\\text{ (in metres)}} \\text{ Dioptres (D)}' }
    ],
    animationTopic: 'Step-by-Step Derivation of the Thin Lens Formula',
    calculationSteps: [
      {
        stepNumber: 1,
        title: 'Step 1: Ray Diagram Using Optical Centre O',
        formula: '\\triangle A B O \\sim \\triangle A\' B\' O \\implies \\frac{A\'B\'}{AB} = \\frac{OB\'}{OB} = \\frac{v}{-u}',
        explanation: 'Consider an object AB placed perpendicular to the principal axis of a thin convex lens. Ray through optical centre passes undeviated.',
        activeHighlight: 'Similar triangles ABO and A\'B\'O',
        visualState: 'Object AB, Real inverted image A\'B\'.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Parallel Ray Passing Through Focal Point F',
        formula: '\\triangle M O F \\sim \\triangle A\' B\' F \\implies \\frac{A\'B\'}{MO} = \\frac{FB\'}{OF}',
        explanation: 'A ray parallel to the principal axis refracts through the principal focus F. Since MO = AB, A\'B\'/AB = (v - f)/f.',
        activeHighlight: 'Similar triangles MOF and A\'B\'F',
        visualState: 'Ray focused through second focal point F.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Equate the Two Magnification Expressions',
        formula: '\\frac{v}{-u} = \\frac{v - f}{f} \\implies v f = -u(v - f) = -u v + u f',
        explanation: 'Cross-multiply to obtain vf = -uv + uf. Rearrange to get uv = uf - vf.',
        activeHighlight: 'Cross-multiplication uv = uf - vf',
        visualState: 'Algebraic terms involving u, v, and f.'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Divide Throughout by uvf',
        formula: '\\frac{uv}{uvf} = \\frac{uf}{uvf} - \\frac{vf}{uvf} \\implies \\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}',
        explanation: 'Dividing all terms by uvf simplifies to the standard Thin Lens Formula.',
        activeHighlight: '1/f = 1/v - 1/u (with Cartesian sign convention)',
        visualState: 'Standard CBSE thin lens equation.'
      }
    ],
    interactiveSandbox: {
      defaultParam: -30,
      label: 'Object Distance u (Convex Lens f = +20 cm)',
      unit: ' cm',
      options: [-60, -40, -30, -25, -15],
      computeFormula: (u) => {
        const f = 20
        const v = (f * u) / (u + f)
        const m = v / u
        return {
          step1: `f = +20\\text{ cm}, \\quad u = ${u}\\text{ cm}`,
          step2: `\\frac{1}{v} = \\frac{1}{f} + \\frac{1}{u} = \\frac{1}{20} + \\frac{1}{${u}}`,
          step3: `v = \\frac{(20)(${u})}{${u} + 20} = ${v.toFixed(1)}\\text{ cm}`,
          result: `\\text{Image Distance } v = \\mathbf{${v.toFixed(1)}\\text{ cm}}, \\quad m = ${m.toFixed(2)}`
        }
      }
    },
    testQuestions: [
      {
        id: 1,
        question: 'A convex lens has a focal length of $+20\\text{ cm}$. At what distance should an object be placed to form an image at $+60\\text{ cm}$?',
        options: ['-30 cm', '-15 cm', '-40 cm', '-25 cm'],
        correctAnswer: 0,
        hint: 'Use the lens formula: $\\frac{1}{u} = \\frac{1}{v} - \\frac{1}{f}$. Substitute $v = 60$ and $f = 20$.',
        explanation: '$\\frac{1}{u} = \\frac{1}{60} - \\frac{1}{20} = \\frac{1 - 3}{60} = -\\frac{2}{60} = -\\frac{1}{30} \\implies u = -30\\text{ cm}$.'
      }
    ]
  },

  // ==========================================
  // CLASS 12 PHYSICS
  // ==========================================
  {
    id: 'class12-physics-optics',
    title: 'Ray Optics & Optical Instruments',
    subject: 'Physics',
    standard: 'Class 12',
    weightageMarks: '14 Marks (Highest Weightage)',
    description: 'Total Internal Reflection, Lens Maker’s Formula, Prism Deviation, Compound Microscope, and Astronomical Telescope.',
    topics: ['Total Internal Reflection & Critical Angle', 'Refraction at Spherical Surfaces', 'Lens Maker’s Formula', 'Refraction Through a Prism', 'Compound Microscope & Astronomical Telescope'],
    formulaOverview: [
      { name: 'Critical Angle for TIR', latex: '\\sin(\\theta_c) = \\frac{n_2}{n_1}' },
      { name: 'Lens Maker’s Formula', latex: '\\frac{1}{f} = (n - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)' },
      { name: 'Prism Refractive Index', latex: 'n = \\frac{\\sin\\left(\\frac{A + D_m}{2}\\right)}{\\sin\\left(\\frac{A}{2}\\right)}' },
      { name: 'Astronomical Telescope Magnification', latex: 'm = -\\frac{f_o}{f_e}\\left(1 + \\frac{f_e}{D}\\right)' }
    ],
    animationTopic: 'Step-by-Step Derivation of the Lens Maker’s Formula',
    calculationSteps: [
      {
        stepNumber: 1,
        title: 'Step 1: Refraction at First Spherical Surface (Radius R₁)',
        formula: '\\frac{n_2}{v_1} - \\frac{n_1}{u} = \\frac{n_2 - n_1}{R_1}',
        explanation: 'A point object O in rarer medium (n₁) forms an intermediate virtual image at distance v₁ through the first refracting surface.',
        activeHighlight: 'Intermediate image distance v₁',
        visualState: 'First spherical interface bends light toward normal.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Refraction at Second Spherical Surface (Radius R₂)',
        formula: '\\frac{n_1}{v} - \\frac{n_2}{v_1} = \\frac{n_1 - n_2}{R_2} = -\\frac{n_2 - n_1}{R_2}',
        explanation: 'The intermediate image at v₁ acts as a virtual object for the second surface, forming final real image at v in medium n₁.',
        activeHighlight: 'Virtual object at v₁ refracted into final image at v',
        visualState: 'Second interface refracts ray to final image position.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Add the Equations for Both Surfaces',
        formula: '\\frac{n_1}{v} - \\frac{n_1}{u} = (n_2 - n_1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)',
        explanation: 'Adding both equations cancels the intermediate image term n₂/v₁ on the left-hand side.',
        activeHighlight: 'Intermediate term n₂/v₁ cancels out completely',
        visualState: 'Only object u, final image v, and radii remain.'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Divide by n₁ and Apply 1/f = 1/v - 1/u',
        formula: '\\frac{1}{f} = \\left(\\frac{n_2}{n_1} - 1\\right)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right) = (n - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)',
        explanation: 'When object is at infinity (u = ∞), image is at focal point (v = f). This gives the celebrated Lens Maker’s Formula.',
        activeHighlight: '1/f = (n - 1)(1/R₁ - 1/R₂)',
        visualState: 'CBSE Board master 5-mark derivation complete.'
      }
    ],
    interactiveSandbox: {
      defaultParam: 1.5,
      label: 'Lens Refractive Index n (Equiconvex R₁=20cm, R₂=-20cm)',
      unit: '',
      options: [1.33, 1.5, 1.6, 1.75],
      computeFormula: (n) => {
        const R1 = 20
        const R2 = -20
        const invF = (n - 1) * (1 / R1 - 1 / R2)
        const f = 1 / invF
        return {
          step1: `R_1 = +20\\text{ cm}, \\quad R_2 = -20\\text{ cm}, \\quad n = ${n}`,
          step2: `\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right) = \\frac{1}{20} - \\left(-\\frac{1}{20}\\right) = \\frac{2}{20} = 0.10\\text{ cm}^{-1}`,
          step3: `\\frac{1}{f} = (${n} - 1) \\times 0.10 = ${(n - 1).toFixed(2)} \\times 0.10`,
          result: `\\text{Focal Length } f = \\mathbf{+${f.toFixed(1)}\\text{ cm}}`
        }
      }
    },
    testQuestions: [
      {
        id: 1,
        question: 'An equiconvex lens of glass ($n = 1.5$) has radii of curvature $20\\text{ cm}$ each. What is its focal length in air?',
        options: ['+20 cm', '+10 cm', '+40 cm', '+15 cm'],
        correctAnswer: 0,
        hint: 'Use Lens Maker’s Formula: $\\frac{1}{f} = (1.5 - 1)\\left(\\frac{1}{20} - \\frac{1}{-20}\\right) = 0.5 \\times \\frac{2}{20}$.',
        explanation: '$\\frac{1}{f} = 0.5 \\times \\frac{1}{10} = \\frac{1}{20} \\implies f = +20\\text{ cm}$.'
      }
    ]
  },
  {
    id: 'class12-physics-electrostatics',
    title: 'Electric Charges and Fields & Gauss Law',
    subject: 'Physics',
    standard: 'Class 12',
    weightageMarks: '8 Marks',
    description: 'Coulomb’s law in vector form, electric dipole field, torque on dipole, Gauss’s theorem and its applications to infinite wire, plane sheet, and spherical shell.',
    topics: ['Coulomb’s Law & Superposition', 'Electric Dipole on Axial & Equatorial Lines', 'Torque on a Dipole in Uniform Field', 'Gauss’s Theorem Statement & Proof', 'Field Due to Infinitely Long Straight Wire & Thin Plane Sheet'],
    formulaOverview: [
      { name: 'Coulomb’s Law', latex: 'F = \\frac{1}{4\\pi\\varepsilon_0} \\frac{|q_1 q_2|}{r^2}' },
      { name: 'Gauss’s Theorem', latex: '\\oint \\mathbf{E} \\cdot d\\mathbf{A} = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0}' },
      { name: 'Field of Long Wire', latex: 'E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}' },
      { name: 'Field of Infinite Sheet', latex: 'E = \\frac{\\sigma}{2\\varepsilon_0}' }
    ],
    animationTopic: 'Derivation of Electric Field Due to Infinitely Long Straight Wire Using Gauss Law',
    calculationSteps: [
      {
        stepNumber: 1,
        title: 'Step 1: Choose Gaussian Surface (Cylinder of Radius r and Length L)',
        formula: '\\Phi_{\\text{total}} = \\int_{\\text{curved}} \\mathbf{E} \\cdot d\\mathbf{A} + \\int_{\\text{top}} \\mathbf{E} \\cdot d\\mathbf{A} + \\int_{\\text{bottom}} \\mathbf{E} \\cdot d\\mathbf{A}',
        explanation: 'By symmetry, the electric field points radially outwards everywhere. On the flat circular caps, E is perpendicular to dA, so flux through caps is zero.',
        activeHighlight: 'Flux through circular caps = 0 (cos 90° = 0)',
        visualState: 'Cylindrical Gaussian surface enclosing linear charge wire.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Compute Flux Through Curved Cylindrical Surface',
        formula: '\\Phi = \\int_{\\text{curved}} E \\, dA \\cos(0^\\circ) = E \\int dA = E (2\\pi r L)',
        explanation: 'At every point on the curved surface, E is constant and parallel to the area vector dA. Curved area of cylinder is 2πrL.',
        activeHighlight: 'Curved area = 2πrL, angle = 0°',
        visualState: 'Radially outward flux E · (2πrL).'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Calculate Enclosed Charge Using Linear Charge Density λ',
        formula: 'q_{\\text{enclosed}} = \\lambda L',
        explanation: 'Linear charge density λ represents charge per unit length. The cylinder of length L encloses exactly q = λL.',
        activeHighlight: 'q_enclosed = λL',
        visualState: 'Charge contained inside length L.'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Equate Gauss Law and Solve for E',
        formula: 'E (2\\pi r L) = \\frac{\\lambda L}{\\varepsilon_0} \\implies E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}',
        explanation: 'Length L cancels out. The electric field is inversely proportional to distance r from the wire.',
        activeHighlight: 'E ∝ 1/r, independent of Gaussian length L',
        visualState: 'Standard CBSE Board 3-mark derivation.'
      }
    ],
    interactiveSandbox: {
      defaultParam: 2,
      label: 'Radial Distance r',
      unit: ' m',
      options: [1, 2, 4, 5],
      computeFormula: (r) => {
        const lambda = 1e-6 // 1 uC/m
        const eps0 = 8.854e-12
        const E = lambda / (2 * Math.PI * eps0 * r)
        return {
          step1: `\\lambda = 1\\,\\mu\\text{C/m}, \\quad r = ${r}\\text{ m}`,
          step2: `E = \\frac{10^{-6}}{2\\pi (8.854 \\times 10^{-12}) \\times ${r}}`,
          step3: `2\\pi\\varepsilon_0 r = ${(2 * Math.PI * eps0 * r).toExponential(3)}`,
          result: `\\text{Electric Field } E = \\mathbf{${(E / 1000).toFixed(2)}\\text{ kN/C}}`
        }
      }
    },
    testQuestions: [
      {
        id: 1,
        question: 'What is the flux through a cube of side $a$ if a charge $q$ is placed at its geometric centre?',
        options: ['\\frac{q}{\\varepsilon_0}', '\\frac{q}{6\\varepsilon_0}', '\\frac{q}{8\\varepsilon_0}', '0'],
        correctAnswer: 0,
        hint: 'According to Gauss Law, total flux through any closed surface enclosing charge $q$ is $\\Phi = q/\\varepsilon_0$.',
        explanation: 'By Gauss’s Law, the total flux through any closed surface depends only on the enclosed charge: $\\Phi = q/\\varepsilon_0$.'
      }
    ]
  },

  // ==========================================
  // CLASS 12 MATHEMATICS
  // ==========================================
  {
    id: 'class12-math-calculus',
    title: 'Continuity, Differentiability & Derivatives',
    subject: 'Mathematics',
    standard: 'Class 12',
    weightageMarks: '14 Marks',
    description: 'Chain rule, logarithmic differentiation, parametric differentiation, Rolle’s and Mean Value Theorem, tangents and normals.',
    topics: ['Continuity at a Point & in Intervals', 'Chain Rule & Derivative of Composite Functions', 'Derivatives of Implicit & Parametric Functions', 'Logarithmic Differentiation', 'Second Order Derivatives'],
    formulaOverview: [
      { name: 'First Principle Derivative', latex: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}' },
      { name: 'Power Rule', latex: '\\frac{d}{dx}(x^n) = n x^{n-1}' },
      { name: 'Chain Rule', latex: '\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}' },
      { name: 'Product Rule', latex: '\\frac{d}{dx}(uv) = u \\frac{dv}{dx} + v \\frac{du}{dx}' }
    ],
    animationTopic: 'Step-by-Step Derivation of d/dx(x²) via First Principles',
    calculationSteps: [
      {
        stepNumber: 1,
        title: 'Step 1: Set Up the Newton Difference Quotient',
        formula: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h} = \\lim_{h \\to 0} \\frac{(x + h)^2 - x^2}{h}',
        explanation: 'Substitute f(x) = x² into the formal definition of the derivative as the limit of the secant slope as h approaches 0.',
        activeHighlight: 'Secant slope [(x + h)² - x²] / h',
        visualState: 'Secant line through (x, x²) and (x+h, (x+h)²).'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Expand (x + h)² Algebraically',
        formula: '(x + h)^2 = x^2 + 2xh + h^2 \\implies \\frac{(x^2 + 2xh + h^2) - x^2}{h}',
        explanation: 'Expand the binomial numerator. The leading x² cancels with -x².',
        activeHighlight: 'x² and -x² cancel out completely',
        visualState: 'Only terms containing h remain in numerator.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Factor out Infinitesimal h from Numerator',
        formula: '\\frac{2xh + h^2}{h} = \\frac{h(2x + h)}{h}',
        explanation: 'Factor out h from both 2xh and h². Since h approaches 0 but h ≠ 0, we can cancel h from numerator and denominator.',
        activeHighlight: 'h cancels between numerator and denominator',
        visualState: 'Removes the 0/0 indeterminate form.'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Evaluate the Direct Limit as h → 0',
        formula: '\\lim_{h \\to 0} (2x + h) = 2x + 0 = \\mathbf{2x}',
        explanation: 'Substitute h = 0 into the remaining polynomial. The tangent slope at any point x is exactly 2x. Power rule verified!',
        activeHighlight: 'Tangent slope = 2x',
        visualState: 'Q.E.D. Derivative established.'
      }
    ],
    interactiveSandbox: {
      defaultParam: 3,
      label: 'Evaluate Tangent Slope at x',
      unit: '',
      options: [1, 2, 3, 4, 5],
      computeFormula: (x) => {
        const y = x * x
        const slope = 2 * x
        return {
          step1: `\\text{Point on Parabola } P(${x}, ${y})`,
          step2: `f'(x) = \\frac{d}{dx}(x^2) = 2x`,
          step3: `m = 2(${x}) = ${slope}`,
          result: `\\text{Tangent Equation: } y - ${y} = ${slope}(x - ${x})`
        }
      }
    },
    testQuestions: [
      {
        id: 1,
        question: 'Find the derivative of $y = \\sin(x^2)$ with respect to $x$.',
        options: ['2x \\cos(x^2)', '\\cos(x^2)', '2x \\sin(x^2)', '-2x \\cos(x^2)'],
        correctAnswer: 0,
        hint: 'Apply the Chain Rule: $\\frac{d}{dx}[\\sin(u)] = \\cos(u) \\cdot \\frac{du}{dx}$, with $u = x^2$.',
        explanation: '$\\frac{dy}{dx} = \\cos(x^2) \\cdot \\frac{d}{dx}(x^2) = \\cos(x^2) \\cdot 2x = 2x \\cos(x^2)$.'
      }
    ]
  },
  {
    id: 'class12-math-matrices',
    title: 'Matrices & Determinants',
    subject: 'Mathematics',
    standard: 'Class 12',
    weightageMarks: '10 Marks',
    description: 'Matrix multiplication, transpose, symmetric and skew-symmetric matrices, adjoint, inverse A⁻¹ = (1/|A|) adj(A), solving systems of linear equations.',
    topics: ['Matrix Operations & Multiplication', 'Properties of Determinants', 'Adjoint & Inverse of a Square Matrix', 'Consistency of Systems of Linear Equations', 'Matrix Inversion Method (AX = B)'],
    formulaOverview: [
      { name: 'Matrix Inverse', latex: 'A^{-1} = \\frac{1}{|A|} \\operatorname{adj}(A)' },
      { name: 'Matrix Solution System', latex: 'A X = B \\implies X = A^{-1} B' },
      { name: 'Determinant Expansion (2x2)', latex: '\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc' }
    ],
    animationTopic: 'Derivation of 2x2 Matrix Inverse Formula',
    calculationSteps: [
      {
        stepNumber: 1,
        title: 'Step 1: Define 2x2 Matrix A and Identity I',
        formula: 'A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}, \\quad I = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}',
        explanation: 'The inverse matrix A⁻¹ is defined such that A · A⁻¹ = I.',
        activeHighlight: 'A · A⁻¹ = I',
        visualState: 'System of matrix equations.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Calculate Determinant |A|',
        formula: '|A| = \\det(A) = ad - bc \\neq 0',
        explanation: 'A matrix possesses an inverse if and only if it is non-singular (its determinant is non-zero).',
        activeHighlight: '|A| = ad - bc',
        visualState: 'Scalar determinant.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Compute Adjoint Matrix adj(A)',
        formula: '\\operatorname{adj}(A) = \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}',
        explanation: 'For a 2x2 matrix, swap diagonal elements (a and d), and reverse the signs of off-diagonal elements (b and c).',
        activeHighlight: 'Diagonal swapped, off-diagonals negated',
        visualState: 'Transposed cofactor matrix.'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Verify Product A · adj(A) = |A| · I',
        formula: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix} = \\begin{pmatrix} ad - bc & 0 \\\\ 0 & ad - bc \\end{pmatrix} = |A| I',
        explanation: 'Dividing both sides by |A| establishes A⁻¹ = (1/|A|) adj(A).',
        activeHighlight: 'A⁻¹ = (1/|A|) adj(A)',
        visualState: 'Proven inverse formula.'
      }
    ],
    interactiveSandbox: {
      defaultParam: 2,
      label: 'Element d (for a=4, b=2, c=3)',
      unit: '',
      options: [1, 2, 3, 5],
      computeFormula: (d) => {
        const a = 4
        const b = 2
        const c = 3
        const det = a * d - b * c
        return {
          step1: `A = \\begin{pmatrix} 4 & 2 \\\\ 3 & ${d} \\end{pmatrix}`,
          step2: `|A| = (4)(${d}) - (2)(3) = ${4 * d} - 6 = ${det}`,
          step3: `\\operatorname{adj}(A) = \\begin{pmatrix} ${d} & -2 \\\\ -3 & 4 \\end{pmatrix}`,
          result: det !== 0 ? `A^{-1} = \\frac{1}{${det}} \\begin{pmatrix} ${d} & -2 \\\\ -3 & 4 \\end{pmatrix}` : '\\text{Singular: No Inverse!}'
        }
      }
    },
    testQuestions: [
      {
        id: 1,
        question: 'If $A$ is a square matrix of order 3 such that $|A| = 5$, what is the value of $|\\operatorname{adj}(A)|$?',
        options: ['25', '125', '5', '15'],
        correctAnswer: 0,
        hint: 'Use the standard theorem: $|\\operatorname{adj}(A)| = |A|^{n-1}$, where $n$ is the matrix order (here $n = 3$).',
        explanation: '$|\\operatorname{adj}(A)| = |A|^{3 - 1} = |A|^2 = 5^2 = 25$.'
      }
    ]
  },

  // ==========================================
  // CLASS 12 CHEMISTRY
  // ==========================================
  {
    id: 'class12-chem-electrochemistry',
    title: 'Electrochemistry & Nernst Equation',
    subject: 'Chemistry',
    standard: 'Class 12',
    weightageMarks: '9 Marks',
    description: 'Galvanic cells, standard hydrogen electrode, Nernst equation, Kohlrausch’s law, electrolysis, and molar conductivity.',
    topics: ['Galvanic Cells & Cell Potential E°cell', 'Nernst Equation for Single Electrode & Cell', 'Kohlrausch’s Law of Independent Migration', 'Faraday’s Laws of Electrolysis', 'Batteries & Fuel Cells'],
    formulaOverview: [
      { name: 'Nernst Equation at 298 K', latex: 'E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n} \\log_{10}(Q)' },
      { name: 'Gibbs Free Energy & EMF', latex: '\\Delta G^\\circ = -n F E^\\circ_{\\text{cell}}' },
      { name: 'Kohlrausch’s Law', latex: '\\Lambda_m^\\circ = \\nu_+ \\lambda_+^\\circ + \\nu_- \\lambda_-^\\circ' },
      { name: 'Molar Conductivity', latex: '\\Lambda_m = \\frac{\\kappa \\times 1000}{M}' }
    ],
    animationTopic: 'Thermodynamic Derivation of the Nernst Equation',
    calculationSteps: [
      {
        stepNumber: 1,
        title: 'Step 1: Van ’t Hoff Reaction Isotherm',
        formula: '\\Delta G = \\Delta G^\\circ + R T \\ln(Q)',
        explanation: 'In chemical thermodynamics, the Gibbs free energy change ΔG under non-standard conditions is related to standard free energy ΔG° via reaction quotient Q.',
        activeHighlight: 'ΔG = ΔG° + RT ln(Q)',
        visualState: 'Thermodynamic equilibrium curve.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Relate Gibbs Energy to Electrical Work',
        formula: '\\Delta G = -n F E_{\\text{cell}}, \\quad \\Delta G^\\circ = -n F E^\\circ_{\\text{cell}}',
        explanation: 'Electrical work done by a galvanic cell equals the decrease in Gibbs free energy. F is Faraday’s constant (96,485 C/mol), n is moles of electrons transferred.',
        activeHighlight: 'ΔG = -nFE_cell',
        visualState: 'Transfer of n moles of electrons.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Substitute Electrical Terms into Isotherm',
        formula: '-n F E_{\\text{cell}} = -n F E^\\circ_{\\text{cell}} + R T \\ln(Q)',
        explanation: 'Divide the entire equation by -nF to isolate cell potential E_cell on the left.',
        activeHighlight: 'Divide throughout by -nF',
        visualState: 'E_cell = E° - (RT/nF) ln(Q).'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Substitute Constants at 298 K (25 °C)',
        formula: 'E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{2.303 R T}{n F} \\log_{10}(Q) = E^\\circ_{\\text{cell}} - \\frac{\\mathbf{0.0591}}{n} \\log_{10}(Q)',
        explanation: 'Substituting R = 8.314 J/(mol·K), T = 298.15 K, and F = 96485 C gives the constant 0.0591 V.',
        activeHighlight: '0.0591/n log₁₀(Q) at 298 K',
        visualState: 'Master CBSE Nernst Equation derived.'
      }
    ],
    interactiveSandbox: {
      defaultParam: 0.1,
      label: 'Concentration [Zn²⁺] / [Cu²⁺] Ratio Q',
      unit: '',
      options: [0.001, 0.01, 0.1, 1, 10],
      computeFormula: (Q) => {
        const E0 = 1.10
        const n = 2
        const logQ = Math.log10(Q)
        const Ecell = E0 - (0.0591 / n) * logQ
        return {
          step1: `E^\\circ_{\\text{cell}} = 1.10\\text{ V}, \\quad n = 2, \\quad Q = ${Q}`,
          step2: `\\log_{10}(${Q}) = ${logQ.toFixed(2)}`,
          step3: `E_{\\text{cell}} = 1.10 - \\frac{0.0591}{2}(${logQ.toFixed(2)}) = 1.10 - ${(0.02955 * logQ).toFixed(3)}`,
          result: `E_{\\text{cell}} = \\mathbf{${Ecell.toFixed(3)}\\text{ V}}`
        }
      }
    },
    testQuestions: [
      {
        id: 1,
        question: 'For a Daniell cell: $\\text{Zn}(s) + \\text{Cu}^{2+}(aq) \\to \\text{Zn}^{2+}(aq) + \\text{Cu}(s)$, how many electrons are transferred ($n$)?',
        options: ['2', '1', '4', '3'],
        correctAnswer: 0,
        hint: 'Write the half-cell oxidation: $\\text{Zn} \\to \\text{Zn}^{2+} + 2e^-$.',
        explanation: 'Zinc loses 2 electrons and Copper gains 2 electrons, so $n = 2$.'
      }
    ]
  },

  // ==========================================
  // CLASS 12 BIOLOGY
  // ==========================================
  {
    id: 'class12-bio-genetics',
    title: 'Principles of Inheritance & Variation',
    subject: 'Biology',
    standard: 'Class 12',
    weightageMarks: '10 Marks',
    description: 'Mendelian inheritance, monohybrid and dihybrid crosses, chromosomal theory, sex determination, and genetic disorders.',
    topics: ['Mendel’s Laws of Inheritance', 'Incomplete Dominance & Co-dominance', 'Dihybrid Cross & Law of Independent Assortment', 'Chromosomal Theory of Inheritance', 'Sex Determination & Mendelian Disorders (Hemophilia, Thalassemia)'],
    formulaOverview: [
      { name: 'Monohybrid Phenotypic Ratio', latex: '3 : 1 \\quad \\text{(F2 generation)}' },
      { name: 'Monohybrid Genotypic Ratio', latex: '1 : 2 : 1 \\quad (TT : Tt : tt)' },
      { name: 'Dihybrid Phenotypic Ratio', latex: '9 : 3 : 3 : 1' },
      { name: 'Recombination Frequency', latex: '\\text{RF} = \\frac{\\text{Recombinants}}{\\text{Total Offspring}} \\times 100\\%' }
    ],
    animationTopic: 'Step-by-Step Punnett Square Segregation in Dihybrid Cross',
    calculationSteps: [
      {
        stepNumber: 1,
        title: 'Step 1: True-Breeding Parental Cross (P Generation)',
        formula: 'RRYY \\text{ (Round Yellow)} \\times rryy \\text{ (Wrinkled Green)}',
        explanation: 'Gametes produced by parents are exclusively RY and ry. The resulting F1 generation is uniformly RrYy (Round Yellow).',
        activeHighlight: 'F1 Genotype: RrYy (100% heterozygous dominant)',
        visualState: 'Pure parents yield uniform F1 hybrids.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Gamete Formation in F1 Generation via Independent Assortment',
        formula: '\\text{F1 Gametes: } \\frac{1}{4} RY, \\quad \\frac{1}{4} Ry, \\quad \\frac{1}{4} rY, \\quad \\frac{1}{4} ry',
        explanation: 'According to Mendel’s third law, alleles of seed shape segregate independently of alleles of seed colour, yielding 4 equal gamete types.',
        activeHighlight: 'Four types of gametes with equal 25% probability',
        visualState: 'Punnett grid headers initialized.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: 4x4 Punnett Grid Fertilization (16 Combinations)',
        formula: '16 \\text{ Zygotic Combinations} = 9 \\text{ R_Y_} + 3 \\text{ R_yy} + 3 \\text{ rrY_} + 1 \\text{ rryy}',
        explanation: 'The 4 maternal gametes combine randomly with 4 paternal gametes to yield 16 zygotic boxes.',
        activeHighlight: '16 total squares filled with genotypes',
        visualState: '4x4 square filled with 16 genotypes.'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Consolidate Classical 9:3:3:1 Phenotypic Ratio',
        formula: '\\mathbf{9} \\text{ Round Yellow} : \\mathbf{3} \\text{ Round Green} : \\mathbf{3} \\text{ Wrinkled Yellow} : \\mathbf{1} \\text{ Wrinkled Green}',
        explanation: 'Proven! The 9:3:3:1 ratio is the hallmark signature of independent assortment in diploid eukaryotic genetics.',
        activeHighlight: '9:3:3:1 phenotypic distribution',
        visualState: 'F2 Phenotypic ratio verified.'
      }
    ],
    interactiveSandbox: {
      defaultParam: 1600,
      label: 'Total F2 Seeds Sampled',
      unit: ' seeds',
      options: [160, 400, 800, 1600],
      computeFormula: (total) => {
        const ry = Math.round((9 / 16) * total)
        const rg = Math.round((3 / 16) * total)
        const wy = Math.round((3 / 16) * total)
        const wg = Math.round((1 / 16) * total)
        return {
          step1: `\\text{Total Seeds Sampled } N = ${total}`,
          step2: `\\text{Round Yellow (9/16)} = ${ry}, \\quad \\text{Round Green (3/16)} = ${rg}`,
          step3: `\\text{Wrinkled Yellow (3/16)} = ${wy}, \\quad \\text{Wrinkled Green (1/16)} = ${wg}`,
          result: `${ry} : ${rg} : ${wy} : ${wg} \\equiv \\mathbf{9 : 3 : 3 : 1}`
        }
      }
    },
    testQuestions: [
      {
        id: 1,
        question: 'What is the phenotypic ratio in the F2 generation of a Mendelian dihybrid cross?',
        options: ['9:3:3:1', '3:1', '1:2:1', '1:1:1:1'],
        correctAnswer: 0,
        hint: 'Recall the independent assortment of seed shape (round/wrinkled) and seed colour (yellow/green).',
        explanation: 'A dihybrid cross produces 9 Round Yellow, 3 Round Green, 3 Wrinkled Yellow, and 1 Wrinkled Green (9:3:3:1).'
      }
    ]
  },

  // ==========================================
  // MAHARASHTRA STATE BOARD (HSC & SSC)
  // ==========================================
  {
    id: 'mah-hsc-rotational-dynamics',
    title: 'Rotational Dynamics & Moment of Inertia (Maharashtra Board HSC)',
    subject: 'Physics',
    standard: 'Class 12',
    boards: ['Maharashtra State Board (HSC/SSC)', 'All Boards'],
    weightageMarks: '7 Marks (Maharashtra HSC Blueprint)',
    description: 'Characteristics of circular motion, banking of roads, vertical circular motion, moment of inertia, and parallel & perpendicular axes theorems.',
    topics: ['Banking of Roads (v = √[rg tan θ])', 'Vertical Circular Motion & Tension Difference', 'Theorem of Parallel Axes', 'Theorem of Perpendicular Axes', 'Rolling Motion & Conservation of Angular Momentum'],
    formulaOverview: [
      { name: 'Theorem of Parallel Axes', latex: 'I_O = I_C + M h^2' },
      { name: 'Theorem of Perpendicular Axes', latex: 'I_Z = I_X + I_Y' },
      { name: 'Banking Speed (No Friction)', latex: 'v = \\sqrt{r g \\tan(\\theta)}' },
      { name: 'Tension Difference in VCM', latex: 'T_{\\text{bottom}} - T_{\\text{top}} = 6 M g' }
    ],
    animationTopic: 'Maharashtra HSC Derivation: Theorem of Parallel Axes (I_O = I_C + M h²)',
    calculationSteps: [
      {
        stepNumber: 1,
        title: 'Step 1: Consider Rigid Body Rotating About Parallel Axes',
        formula: 'I_O = \\int r_O^2 \\, dm, \\quad I_C = \\int r_C^2 \\, dm',
        explanation: 'Let C be the center of mass of a rigid body of mass M. Axis through O is parallel to axis through C at distance h. Consider mass element dm at point P.',
        activeHighlight: 'Distance between parallel axes = h',
        visualState: 'Two parallel axes through O and C separated by distance h.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Express Distance OP in Geometry Using Pythagoras',
        formula: 'OP^2 = ON^2 + PN^2 = (OC + CN)^2 + PN^2 = (h + x)^2 + y^2',
        explanation: 'Drop perpendicular PN onto OC extended. Expanding (h + x)² gives h² + 2hx + x² + y².',
        activeHighlight: 'OP² = h² + 2hx + (x² + y²)',
        visualState: 'Coordinate breakdown: CP² = x² + y².'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Integrate Over the Entire Mass of the Body',
        formula: 'I_O = \\int OP^2 \\, dm = \\int (x^2 + y^2) \\, dm + 2h \\int x \\, dm + h^2 \\int dm',
        explanation: 'Since CP² = x² + y², the first integral is I_C. The integral ∫ dm is total mass M.',
        activeHighlight: '∫ (x² + y²) dm = I_C and ∫ dm = M',
        visualState: 'I_O = I_C + 2h ∫ x dm + M h².'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Center of Mass Coordinate Property',
        formula: '\\int x \\, dm = 0 \\implies I_O = I_C + M h^2',
        explanation: 'Because C is the center of mass, the first moment of mass about C is zero: ∫ x dm = 0. This completes the classic Maharashtra Board 3-mark proof: I_O = I_C + M h².',
        activeHighlight: '∫ x dm = 0 eliminates middle term',
        visualState: 'Q.E.D. Parallel axis theorem verified.'
      }
    ],
    interactiveSandbox: {
      defaultParam: 0.2,
      label: 'Distance between axes h (Disc M = 2 kg, R = 0.4 m)',
      unit: ' m',
      options: [0.1, 0.2, 0.3, 0.4],
      computeFormula: (h) => {
        const M = 2
        const R = 0.4
        const Ic = 0.5 * M * R * R // 0.16
        const Mh2 = M * h * h
        const Io = Ic + Mh2
        return {
          step1: `M = 2\\text{ kg}, \\quad R = 0.4\\text{ m}, \\quad I_C = \\frac{1}{2} M R^2 = ${Ic.toFixed(3)}\\text{ kg}\\cdot\\text{m}^2`,
          step2: `h = ${h}\\text{ m} \\implies M h^2 = 2 \\times (${h})^2 = ${Mh2.toFixed(3)}\\text{ kg}\\cdot\\text{m}^2`,
          step3: `I_O = I_C + M h^2 = ${Ic.toFixed(3)} + ${Mh2.toFixed(3)}`,
          result: `I_O = \\mathbf{${Io.toFixed(3)}\\text{ kg}\\cdot\\text{m}^2}`
        }
      }
    },
    testQuestions: [
      {
        id: 1,
        question: 'According to the Maharashtra HSC syllabus, what is the maximum safe velocity on a banked road of radius $r$ without friction?',
        options: ['\\sqrt{r g \\tan(\\theta)}', '\\sqrt{r g \\sin(\\theta)}', '\\sqrt{\\frac{r g}{\\tan(\\theta)}}', 'r g \\cos(\\theta)'],
        correctAnswer: 0,
        hint: 'Resolve normal reaction $N \\sin\\theta = m v^2/r$ and $N \\cos\\theta = m g$, then divide the equations.',
        explanation: 'Dividing $N\\sin\\theta = mv^2/r$ by $N\\cos\\theta = mg$ gives $\\tan\\theta = v^2/(rg) \\implies v = \\sqrt{rg\\tan\\theta}$.'
      }
    ]
  },

  // ==========================================
  // ICSE / ISC BOARD
  // ==========================================
  {
    id: 'icse-class10-banking',
    title: 'Commercial Mathematics: Banking & Recurring Deposit (ICSE Class 10)',
    subject: 'Mathematics',
    standard: 'Class 10',
    boards: ['ICSE / ISC', 'All Boards'],
    weightageMarks: '8 Marks (Mandatory ICSE Question)',
    description: 'Recurring Deposit (RD) accounts, monthly deposits, total principal deposited, interest calculation, and maturity value formulation.',
    topics: ['Concept of Recurring Deposit (Cumulative Deposit)', 'Formula for Total Interest on RD Accounts', 'Maturity Value (MV = P·n + I)', 'Solving for Monthly Deposit P, Period n, and Rate r'],
    formulaOverview: [
      { name: 'Recurring Deposit Interest', latex: 'I = P \\times \\frac{n(n + 1)}{2 \\times 12} \\times \\frac{r}{100}' },
      { name: 'Maturity Value', latex: 'MV = (P \\times n) + I' },
      { name: 'Total Deposit', latex: '\\text{Total Principal} = P \\times n' }
    ],
    animationTopic: 'ICSE Step-by-Step Derivation of Recurring Deposit Interest Formula',
    calculationSteps: [
      {
        stepNumber: 1,
        title: 'Step 1: Time for Which Each Monthly Deposit Earns Interest',
        formula: '1^{\\text{st}} \\text{ deposit earns for } n \\text{ months}, \\; 2^{\\text{nd}} \\text{ for } (n-1) \\text{ months}, \\; \\dots, \\; n^{\\text{th}} \\text{ for } 1 \\text{ month}',
        explanation: 'Each installment of principal P stays in the bank for a different duration. The first deposit stays for n months, the last for 1 month.',
        activeHighlight: 'Variable deposit duration: n, n-1, ..., 1',
        visualState: 'Timeline of n monthly deposits.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Equivalent Principal for 1 Month (Sum of AP)',
        formula: '\\text{Total Equivalent Months} = n + (n-1) + (n-2) + \\dots + 1 = \\frac{n(n+1)}{2}',
        explanation: 'By the sum of the first n natural numbers, the cumulative principal corresponds to P earning interest for n(n+1)/2 months.',
        activeHighlight: 'Sum of n natural numbers = n(n+1)/2',
        visualState: 'Summation converted into closed formula.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Convert Months to Years',
        formula: 'T = \\frac{n(n+1)}{2 \\times 12} \\text{ years}',
        explanation: 'Since interest rate r is quoted per annum (annual), dividing by 12 converts months into years.',
        activeHighlight: 'Divide by 12 to convert months into years',
        visualState: 'Time T in years.'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Apply Simple Interest Formula I = (P · T · r) / 100',
        formula: 'I = P \\times \\frac{n(n+1)}{2 \\times 12} \\times \\frac{r}{100}',
        explanation: 'Proven! The total interest earned on any ICSE Recurring Deposit account is exactly P · n(n+1)/(24) · (r/100).',
        activeHighlight: 'Final verified ICSE board formula',
        visualState: 'Maturity value MV = P·n + I.'
      }
    ],
    interactiveSandbox: {
      defaultParam: 12,
      label: 'Deposit Duration n (Monthly P = ₹1,000, Rate r = 9% p.a.)',
      unit: ' months',
      options: [6, 12, 24, 36],
      computeFormula: (n) => {
        const P = 1000
        const r = 9
        const I = Math.round((P * n * (n + 1) * r) / (24 * 100))
        const totalPrincipal = P * n
        const MV = totalPrincipal + I
        return {
          step1: `P = ₹1,000, \\quad r = 9\\% \\text{ p.a.}, \\quad n = ${n}\\text{ months}`,
          step2: `\\text{Principal Deposited} = 1000 \\times ${n} = ₹${totalPrincipal.toLocaleString()}`,
          step3: `I = \\frac{1000 \\times ${n} \\times ${n+1} \\times 9}{2400} = ₹${I.toLocaleString()}`,
          result: `\\text{Maturity Value (MV)} = ₹${totalPrincipal.toLocaleString()} + ₹${I.toLocaleString()} = \\mathbf{₹${MV.toLocaleString()}}`
        }
      }
    },
    testQuestions: [
      {
        id: 1,
        question: 'In an ICSE Class 10 problem, a person deposits ₹500 per month for 2 years (24 months) at 10% p.a. in an RD account. What is the total interest earned?',
        options: ['₹1,250', '₹1,500', '₹1,000', '₹1,150'],
        correctAnswer: 0,
        hint: 'Use $I = P \\times \\frac{n(n+1)}{24} \\times \\frac{r}{100}$. Here $P = 500, n = 24, r = 10$.',
        explanation: '$I = 500 \\times \\frac{24 \\times 25}{24} \\times \\frac{10}{100} = 500 \\times 25 \\times 0.10 = 12500 \\times 0.10 = ₹1,250$.'
      }
    ]
  },
  {
    id: 'isc-class12-wave-optics',
    title: 'Wave Optics & Interference: YDSE (ISC Class 12)',
    subject: 'Physics',
    standard: 'Class 12',
    boards: ['ICSE / ISC', 'CBSE', 'All Boards'],
    weightageMarks: '9 Marks (ISC Board Blueprint)',
    description: 'Huygens’ principle, wavefronts, Young’s double slit experiment (YDSE), expression for fringe width β = λD/d, and diffraction.',
    topics: ['Huygens’ Wave Theory of Light', 'Interference of Light Waves & Coherent Sources', 'Derivation of Fringe Width in YDSE (β = λD/d)', 'Diffraction at a Single Slit', 'Polarisation of Light Waves'],
    formulaOverview: [
      { name: 'Fringe Width (YDSE)', latex: '\\beta = \\frac{\\lambda D}{d}' },
      { name: 'Path Difference for Bright Fringe', latex: '\\Delta x = n \\lambda' },
      { name: 'Path Difference for Dark Fringe', latex: '\\Delta x = (2n - 1)\\frac{\\lambda}{2}' },
      { name: 'Brewster’s Law', latex: '\\mu = \\tan(i_p)' }
    ],
    animationTopic: 'ISC Board Derivation: Fringe Width β = λD/d in Young’s Double Slit Experiment',
    calculationSteps: [
      {
        stepNumber: 1,
        title: 'Step 1: Geometric Setup of Slits S₁ and S₂',
        formula: 'S_1 S_2 = d, \\quad \\text{Screen Distance} = D, \\quad \\text{Point on Screen} = P(y)',
        explanation: 'Two coherent narrow slits S₁ and S₂ separated by small distance d emit light of wavelength λ onto a screen placed at distance D (where D >> d).',
        activeHighlight: 'Slit distance d, Screen distance D',
        visualState: 'Two coherent slit sources illuminating screen.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Path Difference Between Two Interfering Rays',
        formula: '\\Delta x = S_2 P - S_1 P = \\sqrt{D^2 + \\left(y + \\frac{d}{2}\\right)^2} - \\sqrt{D^2 + \\left(y - \\frac{d}{2}\\right)^2}',
        explanation: 'Expand using binomial approximation since y << D and d << D.',
        activeHighlight: 'S₂P² - S₁P² = 2yd',
        visualState: 'Path difference Δx represented geometrically.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Approximate Path Difference as Δx = y d / D',
        formula: '(S_2 P - S_1 P)(S_2 P + S_1 P) = 2yd \\implies \\Delta x (2D) = 2yd \\implies \\Delta x = \\frac{yd}{D}',
        explanation: 'Since S₂P + S₁P ≈ 2D, the path difference simplifies directly to yd/D.',
        activeHighlight: 'Path difference Δx = yd/D',
        visualState: 'Linear relation between path difference and position y.'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Separation Between Consecutive Bright Fringes (Fringe Width β)',
        formula: 'y_n = \\frac{n \\lambda D}{d} \\implies \\beta = y_{n+1} - y_n = \\frac{\\lambda D}{d}',
        explanation: 'Proven! The fringe width β is constant, proving that all interference fringes in YDSE are of equal width.',
        activeHighlight: 'β = λD/d (Uniform Fringe Width)',
        visualState: 'Alternating bright and dark interference pattern.'
      }
    ],
    interactiveSandbox: {
      defaultParam: 600,
      label: 'Light Wavelength λ (Slit d = 0.5 mm, Screen D = 1.0 m)',
      unit: ' nm',
      options: [400, 500, 600, 700],
      computeFormula: (lambdaNm) => {
        const d = 0.5e-3
        const D = 1.0
        const lambdaM = lambdaNm * 1e-9
        const betaM = (lambdaM * D) / d
        const betaMm = betaM * 1000
        return {
          step1: `\\lambda = ${lambdaNm}\\text{ nm} = ${lambdaM.toExponential(1)}\\text{ m}, \\quad D = 1.0\\text{ m}, \\quad d = 0.5\\text{ mm}`,
          step2: `\\beta = \\frac{\\lambda D}{d} = \\frac{(${lambdaM.toExponential(1)})(1.0)}{0.5 \\times 10^{-3}}`,
          step3: `\\beta = ${(betaM).toExponential(3)}\\text{ m}`,
          result: `\\text{Fringe Width } \\beta = \\mathbf{${betaMm.toFixed(2)}\\text{ mm}}`
        }
      }
    },
    testQuestions: [
      {
        id: 1,
        question: 'In Young’s double slit experiment, if the distance between the screen and slits ($D$) is doubled, the fringe width becomes:',
        options: ['Doubled', 'Halved', 'Four times', 'Remains unchanged'],
        correctAnswer: 0,
        hint: 'Use the fringe width formula: $\\beta = \\frac{\\lambda D}{d}$. Fringe width is directly proportional to $D$.',
        explanation: 'Since $\\beta \\propto D$, doubling $D$ doubles the fringe width $\\beta$.'
      }
    ]
  }
]

