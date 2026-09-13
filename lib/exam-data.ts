export interface ExamQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number // 0-indexed
  explanation: string
  chapter: string
  marks: number
  negativeMarks: number
  type?: 'MCQ' | 'Assertion-Reason' | 'Numerical'
}

export interface MockExam {
  id: string
  title: string
  type: 'Board Exam' | 'Competitive' | 'Practice Test'
  classLevel: 'Class 10' | 'Class 12' | 'Competitive'
  board: 'CBSE' | 'ICSE' | 'NTA (JEE/NEET)' | 'State Board'
  subject: string
  durationMinutes: number
  totalMarks: number
  questionsCount: number
  dateBadge: string
  description: string
  highWeightageTopics: string[]
  questions: ExamQuestion[]
}

export interface PastPaper {
  id: string
  title: string
  year: number
  examType: 'Board' | 'Specimen' | 'Competitive'
  board: 'CBSE' | 'ICSE' | 'WB Board' | 'NTA'
  classLevel: 'Class 10' | 'Class 12' | 'Competitive'
  subject: string
  size: string
  downloadUrl: string
  previewUrl: string
  totalMarks: number
  highYieldTopics: { topic: string; marks: number }[]
  summary: string
}

export const MOCK_EXAMS_DATABASE: Record<string, MockExam> = {
  'cbse-12-physics-2024': {
    id: 'cbse-12-physics-2024',
    title: 'CBSE Class 12 Physics Full Board Mock',
    type: 'Board Exam',
    classLevel: 'Class 12',
    board: 'CBSE',
    subject: 'Physics',
    durationMinutes: 45,
    totalMarks: 35,
    questionsCount: 7,
    dateBadge: 'Live Now',
    description: 'Exact CBSE 2024–2025 blueprint covering Section A (MCQs & Assertion-Reason) with 10-year recurring concepts.',
    highWeightageTopics: ['Optics (14M)', 'Electrostatics (8M)', 'Current Electricity (7M)', 'Semiconductors (7M)'],
    questions: [
      {
        id: 1,
        question: 'Two point charges +3 µC and +8 µC repel each other with a force of 40 N. If a charge of -5 µC is added to each of them, the force between them will become:',
        options: ['-10 N (attractive)', '+10 N (repulsive)', '-20 N (attractive)', '+20 N (repulsive)'],
        correctAnswer: 0,
        explanation: 'Initial charges: q1 = +3 µC, q2 = +8 µC, product q1*q2 = 24. Force F1 = 40 N. When -5 µC is added: q1\' = 3 - 5 = -2 µC, q2\' = 8 - 5 = +3 µC. New product q1\'*q2\' = -6. Since F ∝ q1*q2, F2 = F1 * (-6 / 24) = 40 * (-1/4) = -10 N (Negative sign denotes an attractive force).',
        chapter: 'Electrostatics',
        marks: 1,
        negativeMarks: 0,
        type: 'MCQ'
      },
      {
        id: 2,
        question: 'A wire of resistance R is stretched to double its original length keeping its volume constant. Its new resistance will be:',
        options: ['R / 2', '2R', '4R', 'R / 4'],
        correctAnswer: 2,
        explanation: 'Resistance R = ρ * (L / A). Since volume V = A * L is constant, when length doubles (L\' = 2L), the cross-sectional area halves (A\' = A / 2). New resistance R\' = ρ * (2L / (A / 2)) = 4 * (ρL / A) = 4R.',
        chapter: 'Current Electricity',
        marks: 1,
        negativeMarks: 0,
        type: 'MCQ'
      },
      {
        id: 3,
        question: 'In Young’s double slit experiment, if the entire apparatus is immersed in water (refractive index µ = 4/3), the fringe width will:',
        options: ['Increase by 33%', 'Decrease to 3/4 of its original value', 'Remain unchanged', 'Double'],
        correctAnswer: 1,
        explanation: 'Fringe width β = (λ * D) / d. In a medium of refractive index µ, the wavelength becomes λ\' = λ / µ. Therefore, the new fringe width β\' = β / µ = β / (4/3) = (3/4)β (decreases to 75% of original width).',
        chapter: 'Wave Optics',
        marks: 1,
        negativeMarks: 0,
        type: 'MCQ'
      },
      {
        id: 4,
        question: 'An alternating current in a circuit is given by I = 10 * sin(100πt) A. The frequency of the alternating current is:',
        options: ['100 Hz', '50 Hz', '25 Hz', '200 Hz'],
        correctAnswer: 1,
        explanation: 'Comparing with standard equation I = I0 * sin(ωt): angular frequency ω = 100π. Since ω = 2πf, 2πf = 100π => f = 50 Hz.',
        chapter: 'Alternating Current',
        marks: 1,
        negativeMarks: 0,
        type: 'MCQ'
      },
      {
        id: 5,
        question: 'Assertion (A): The resistivity of a semiconductor decreases with an increase in temperature.\nReason (R): As temperature increases, more covalent bonds break, generating more electron-hole charge carriers.',
        options: [
          'Both (A) and (R) are true and (R) is the correct explanation of (A).',
          'Both (A) and (R) are true but (R) is NOT the correct explanation of (A).',
          '(A) is true but (R) is false.',
          '(A) is false but (R) is true.'
        ],
        correctAnswer: 0,
        explanation: 'In semiconductors, the increase in charge carrier density n with temperature far outweighs the slight decrease in relaxation time τ. Hence resistivity ρ = m / (n * e^2 * τ) decreases exponentially with temperature.',
        chapter: 'Semiconductor Electronics',
        marks: 1,
        negativeMarks: 0,
        type: 'Assertion-Reason'
      },
      {
        id: 6,
        question: 'The de-Broglie wavelength associated with an electron accelerated through a potential difference of 100 V is approximately:',
        options: ['1.227 Å', '0.123 Å', '12.27 Å', '122.7 Å'],
        correctAnswer: 0,
        explanation: 'The de-Broglie wavelength for an electron is given by λ = 12.27 / √V Å. For V = 100 V, λ = 12.27 / √100 = 12.27 / 10 = 1.227 Å (or 0.123 nm).',
        chapter: 'Dual Nature of Radiation and Matter',
        marks: 1,
        negativeMarks: 0,
        type: 'MCQ'
      },
      {
        id: 7,
        question: 'When light travels from glass (µ = 1.5) into water (µ = 1.33), the critical angle for total internal reflection is:',
        options: ['sin⁻¹(1.33 / 1.5)', 'sin⁻¹(1.5 / 1.33)', 'sin⁻¹(1 / 1.5)', '90°'],
        correctAnswer: 0,
        explanation: 'Critical angle θc is defined when going from denser medium 1 to rarer medium 2: sin(θc) = µ2 / µ1. Here µ2 = 1.33 (water) and µ1 = 1.5 (glass), so θc = sin⁻¹(1.33 / 1.5) ≈ sin⁻¹(8/9).',
        chapter: 'Ray Optics',
        marks: 1,
        negativeMarks: 0,
        type: 'MCQ'
      }
    ]
  },

  'jee-main-pcm-mock': {
    id: 'jee-main-pcm-mock',
    title: 'JEE Main High-Weightage PCM Mock Test',
    type: 'Competitive',
    classLevel: 'Competitive',
    board: 'NTA (JEE/NEET)',
    subject: 'PCM (Physics, Chem, Math)',
    durationMinutes: 60,
    totalMarks: 24,
    questionsCount: 6,
    dateBadge: 'High Yield',
    description: 'Curated using 2015–2024 JEE Main question frequency: includes standard +4 / -1 negative marking rules.',
    highWeightageTopics: ['Calculus (35%)', 'Organic Chemistry (30%)', 'Modern Physics (20%)', 'Electrochemistry (15%)'],
    questions: [
      {
        id: 1,
        question: 'Evaluate the limit: lim (x -> 0) [ (sin x - x) / x³ ]',
        options: ['-1/6', '1/6', '0', '-1/3'],
        correctAnswer: 0,
        explanation: 'Using Taylor expansion of sin x = x - x³/3! + x⁵/5! - ... We have: (sin x - x) / x³ = (-x³/6 + O(x⁵)) / x³ = -1/6 as x -> 0. Alternatively, applying L\'Hôpital\'s Rule three times yields -1/6.',
        chapter: 'Limits & Calculus',
        marks: 4,
        negativeMarks: 1,
        type: 'MCQ'
      },
      {
        id: 2,
        question: 'Which of the following compounds exhibits optical isomerism (enantiomerism)?',
        options: ['2-Chlorobutane', '1-Chlorobutane', '2-Chloropropane', 'Methanol'],
        correctAnswer: 0,
        explanation: '2-Chlorobutane (CH3-CH(Cl)-CH2-CH3) contains a chiral carbon at C-2 bonded to four distinct groups: -H, -Cl, -CH3, and -C2H5. Hence it is chiral and optically active.',
        chapter: 'Organic Chemistry (Haloalkanes)',
        marks: 4,
        negativeMarks: 1,
        type: 'MCQ'
      },
      {
        id: 3,
        question: 'A Carnot engine works between temperatures 300 K and 600 K. If it absorbs 800 J of heat from the source per cycle, the work output per cycle is:',
        options: ['400 J', '600 J', '200 J', '800 J'],
        correctAnswer: 0,
        explanation: 'Carnot efficiency η = 1 - (Tc / Th) = 1 - (300 / 600) = 0.5 (50%). Work Output W = η * Qin = 0.5 * 800 J = 400 J.',
        chapter: 'Thermodynamics',
        marks: 4,
        negativeMarks: 1,
        type: 'MCQ'
      },
      {
        id: 4,
        question: 'If A and B are two independent events such that P(A) = 0.4 and P(A ∪ B) = 0.7, then P(B) is equal to:',
        options: ['0.5', '0.3', '0.6', '0.4'],
        correctAnswer: 0,
        explanation: 'For independent events, P(A ∩ B) = P(A) * P(B). We know P(A ∪ B) = P(A) + P(B) - P(A ∩ B) = P(A) + P(B)(1 - P(A)). Substituting values: 0.7 = 0.4 + P(B)(1 - 0.4) => 0.3 = P(B) * 0.6 => P(B) = 0.3 / 0.6 = 0.5.',
        chapter: 'Probability',
        marks: 4,
        negativeMarks: 1,
        type: 'MCQ'
      },
      {
        id: 5,
        question: 'The magnetic field at the center of a circular coil of radius R carrying current I is B. The magnetic field at an axial point at a distance R from the center is:',
        options: ['B / (2√2)', 'B / 2', 'B / 4', 'B / √2'],
        correctAnswer: 0,
        explanation: 'Bcenter = (µ0 * I) / (2R). Axial field Bax = (µ0 * I * R²) / (2 * (R² + x²)^(3/2)). When x = R, Bax = (µ0 * I * R²) / (2 * (2R²)^(3/2)) = (µ0 * I) / (2R * 2√2) = B / (2√2).',
        chapter: 'Magnetic Effects of Current',
        marks: 4,
        negativeMarks: 1,
        type: 'MCQ'
      },
      {
        id: 6,
        question: 'The oxidation state of Fe in [Fe(H2O)5(NO)]SO4 (brown ring complex) is:',
        options: ['+1', '+2', '+3', '0'],
        correctAnswer: 0,
        explanation: 'In the brown ring complex, NO coordinates as a nitrosonium cation (NO+). SO4 is -2, H2O is neutral (0). Therefore: x + 5(0) + (+1) - 2 = 0 => x = +1. Fe is in the +1 oxidation state (d7 configuration).',
        chapter: 'Coordination Compounds',
        marks: 4,
        negativeMarks: 1,
        type: 'MCQ'
      }
    ]
  },

  'cbse-10-science-2024': {
    id: 'cbse-10-science-2024',
    title: 'CBSE Class 10 Science Board Blueprint Exam',
    type: 'Board Exam',
    classLevel: 'Class 10',
    board: 'CBSE',
    subject: 'Science',
    durationMinutes: 40,
    totalMarks: 25,
    questionsCount: 5,
    dateBadge: 'Board Pattern',
    description: 'Designed for Class 10 Board aspirants featuring high-recurrence questions in Light, Chemical Reactions, Electricity, and Life Processes.',
    highWeightageTopics: ['Light Reflection & Refraction (10M)', 'Electricity (8M)', 'Life Processes (9M)', 'Acids, Bases & Salts (6M)'],
    questions: [
      {
        id: 1,
        question: 'An object is placed at a distance of 20 cm in front of a concave mirror of focal length 15 cm. The image formed is:',
        options: ['Real, inverted, and magnified', 'Real, inverted, and diminished', 'Virtual, erect, and magnified', 'Real, inverted, and same size'],
        correctAnswer: 0,
        explanation: 'Here focal length f = -15 cm, radius of curvature C = 2f = -30 cm. Object distance u = -20 cm lies between the focus (F) and center of curvature (C). When an object is placed between F and C of a concave mirror, the image formed is beyond C, real, inverted, and enlarged (magnified).',
        chapter: 'Light: Reflection & Refraction',
        marks: 1,
        negativeMarks: 0,
        type: 'MCQ'
      },
      {
        id: 2,
        question: 'Which of the following reactions is an example of a Redox and Exothermic combination reaction?',
        options: [
          '2Mg + O2 -> 2MgO + Heat',
          'CaCO3 -> CaO + CO2',
          'AgCl -> Ag + Cl2 (in sunlight)',
          'NaOH + HCl -> NaCl + H2O'
        ],
        correctAnswer: 0,
        explanation: 'Burning of magnesium ribbon in air combines Mg and O2 to form MgO while releasing light and heat energy (exothermic). Magnesium gets oxidized (0 to +2) and oxygen is reduced (0 to -2), making it a redox combination reaction.',
        chapter: 'Chemical Reactions and Equations',
        marks: 1,
        negativeMarks: 0,
        type: 'MCQ'
      },
      {
        id: 3,
        question: 'In the human digestive system, bile juice secreted by the liver performs which critical function?',
        options: [
          'Emulsification of large fat globules and making medium alkaline',
          'Digestion of proteins into amino acids',
          'Breakdown of starch into maltose',
          'Absorption of water in large intestine'
        ],
        correctAnswer: 0,
        explanation: 'Bile juice contains bile salts that emulsify large fat globules into smaller micelles, increasing surface area for pancreatic lipase action, and neutralizes acidic chyme from the stomach.',
        chapter: 'Life Processes',
        marks: 1,
        negativeMarks: 0,
        type: 'MCQ'
      },
      {
        id: 4,
        question: 'Three resistors of 2 Ω, 3 Ω, and 6 Ω are connected in parallel. What is the equivalent resistance of the combination?',
        options: ['1 Ω', '11 Ω', '2.5 Ω', '0.5 Ω'],
        correctAnswer: 0,
        explanation: '1 / Req = 1/2 + 1/3 + 1/6 = (3 + 2 + 1) / 6 = 6 / 6 = 1 Ω. Therefore Req = 1 Ω.',
        chapter: 'Electricity',
        marks: 1,
        negativeMarks: 0,
        type: 'MCQ'
      },
      {
        id: 5,
        question: 'Assertion (A): The inner lining of the small intestine has numerous finger-like projections called villi.\nReason (R): Villi increase the surface area for rapid absorption of digested food.',
        options: [
          'Both (A) and (R) are true and (R) is the correct explanation of (A).',
          'Both (A) and (R) are true but (R) is NOT the correct explanation of (A).',
          '(A) is true but (R) is false.',
          'Both (A) and (R) are false.'
        ],
        correctAnswer: 0,
        explanation: 'Villi are richly supplied with blood vessels and greatly amplify the absorptive surface area of the ileum.',
        chapter: 'Life Processes',
        marks: 1,
        negativeMarks: 0,
        type: 'Assertion-Reason'
      }
    ]
  }
}

export const PAST_PAPERS_DATABASE: PastPaper[] = [
  {
    id: 'cbse-12-phys-2024',
    title: 'CBSE Class 12 Physics Official Board Paper',
    year: 2024,
    examType: 'Board',
    board: 'CBSE',
    classLevel: 'Class 12',
    subject: 'Physics',
    size: '3.4 MB',
    downloadUrl: '#',
    previewUrl: '#',
    totalMarks: 70,
    highYieldTopics: [
      { topic: 'Ray & Wave Optics', marks: 14 },
      { topic: 'Electrostatics & Gauss Law', marks: 9 },
      { topic: 'Semiconductor Devices', marks: 7 },
      { topic: 'Current & Kirchhoff Laws', marks: 7 }
    ],
    summary: 'Contains Section A (16 MCQs including 4 Assertion-Reason), Section B (5 Very Short), Section C (7 Short Answers), Section D (2 Case Studies), and Section E (3 Long Answers).'
  },
  {
    id: 'cbse-12-math-2024',
    title: 'CBSE Class 12 Mathematics Board Paper',
    year: 2024,
    examType: 'Board',
    board: 'CBSE',
    classLevel: 'Class 12',
    subject: 'Mathematics',
    size: '2.8 MB',
    downloadUrl: '#',
    previewUrl: '#',
    totalMarks: 80,
    highYieldTopics: [
      { topic: 'Definite Integrals & Areas', marks: 18 },
      { topic: 'Vectors & 3D Geometry', marks: 14 },
      { topic: 'Matrices & Determinants', marks: 10 },
      { topic: 'Probability Bayes Theorem', marks: 8 }
    ],
    summary: 'Rigorous paper focusing heavily on Differential Equations applications, vector equations of skew lines, and Bayes theorem conditional probability.'
  },
  {
    id: 'cbse-12-chem-2024',
    title: 'CBSE Class 12 Chemistry Board Paper',
    year: 2024,
    examType: 'Board',
    board: 'CBSE',
    classLevel: 'Class 12',
    subject: 'Chemistry',
    size: '3.1 MB',
    downloadUrl: '#',
    previewUrl: '#',
    totalMarks: 70,
    highYieldTopics: [
      { topic: 'Aldehydes, Ketones & Acids', marks: 10 },
      { topic: 'Electrochemistry (Nernst Eq)', marks: 9 },
      { topic: 'Coordination Compounds', marks: 7 },
      { topic: 'Chemical Kinetics', marks: 7 }
    ],
    summary: 'High weightage on name reactions (Aldol, Cannizzaro, Clemmensen), Nernst cell potential calculations, and CFT isomerism.'
  },
  {
    id: 'jee-main-phase1-2024',
    title: 'JEE Main Phase 1 Consolidated All Shifts',
    year: 2024,
    examType: 'Competitive',
    board: 'NTA',
    classLevel: 'Competitive',
    subject: 'PCM (Physics, Chem, Math)',
    size: '6.5 MB',
    downloadUrl: '#',
    previewUrl: '#',
    totalMarks: 300,
    highYieldTopics: [
      { topic: 'Calculus & Vectors', marks: 44 },
      { topic: 'Modern Physics & Optics', marks: 36 },
      { topic: 'Coordination Chemistry', marks: 28 },
      { topic: 'Thermodynamics', marks: 24 }
    ],
    summary: 'Full NTA memory-based and official answer key verified compilation of January 2024 all 10 shifts.'
  },
  {
    id: 'cbse-10-science-2024',
    title: 'CBSE Class 10 Science Official Board Paper',
    year: 2024,
    examType: 'Board',
    board: 'CBSE',
    classLevel: 'Class 10',
    subject: 'Science',
    size: '2.5 MB',
    downloadUrl: '#',
    previewUrl: '#',
    totalMarks: 80,
    highYieldTopics: [
      { topic: 'Light Reflection & Refraction', marks: 10 },
      { topic: 'Electricity & Circuits', marks: 8 },
      { topic: 'Life Processes (Nutrition/Excretion)', marks: 9 },
      { topic: 'Carbon & Its Compounds', marks: 8 }
    ],
    summary: 'Official 2024 Class 10 science paper with balanced distribution across Physics, Chemistry, and Biology.'
  },
  {
    id: 'cbse-12-phys-2023',
    title: 'CBSE Class 12 Physics Board Paper',
    year: 2023,
    examType: 'Board',
    board: 'CBSE',
    classLevel: 'Class 12',
    subject: 'Physics',
    size: '2.9 MB',
    downloadUrl: '#',
    previewUrl: '#',
    totalMarks: 70,
    highYieldTopics: [
      { topic: 'Optics & Telescopes', marks: 14 },
      { topic: 'Electromagnetic Induction', marks: 8 },
      { topic: 'Dual Nature & Atoms', marks: 9 }
    ],
    summary: '2023 Board question paper featuring numerical problems on AC circuits, lens maker formula derivations, and logic gate truth tables.'
  },
  {
    id: 'cbse-12-phys-specimen-2024',
    title: 'CBSE Class 12 Physics Official Specimen Paper',
    year: 2024,
    examType: 'Specimen',
    board: 'CBSE',
    classLevel: 'Class 12',
    subject: 'Physics',
    size: '2.1 MB',
    downloadUrl: '#',
    previewUrl: '#',
    totalMarks: 70,
    highYieldTopics: [
      { topic: 'Wave Optics & Interference', marks: 12 },
      { topic: 'Magnetic Dipole & Toroid', marks: 8 },
      { topic: 'P-N Junction Diodes', marks: 7 }
    ],
    summary: 'The official model specimen paper issued by the central board outlining mark allocation and question typology.'
  },
  {
    id: 'neet-ug-2024',
    title: 'NEET UG National Medical Entrance Paper',
    year: 2024,
    examType: 'Competitive',
    board: 'NTA',
    classLevel: 'Competitive',
    subject: 'Biology, Physics, Chemistry',
    size: '5.2 MB',
    downloadUrl: '#',
    previewUrl: '#',
    totalMarks: 720,
    highYieldTopics: [
      { topic: 'Genetics & Evolution', marks: 72 },
      { topic: 'Human Physiology', marks: 68 },
      { topic: 'Plant Physiology & Ecology', marks: 60 },
      { topic: 'Organic Chemistry', marks: 56 }
    ],
    summary: 'Official 200 question paper (180 to attempt) featuring NCERT direct statement matching and diagram labels.'
  }
]
