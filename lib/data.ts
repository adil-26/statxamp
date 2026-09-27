import {
  UserProfile,
  Board,
  CompetitiveExam,
  Shortcut,
  SampleNote,
  PYQPaper,
  SolverQuestion,
  MockQuestion,
  TrendItem,
  GuaranteedFormat,
  LeaderboardEntry,
  StoreItem,
  PeerActivity
} from '@/types';

export const USER_DATA: UserProfile = {
  name: "Atik Imteyaz",
  classLevel: "Class 10 (SSC)",
  stream: "General / Science & Tech",
  board: "Maharashtra State Board (MSBSHSE)",
  boardCode: "MH-SSC",
  language: "English (Bilingual Marathi)",
  coins: 340,
  streak: 5,
  rankDistrict: 14,
  district: "Pune",
  state: "Maharashtra",
  solvedPYQs: 42,
  accuracy: 88,
  dailyGoalPercent: 65,
  dailyMinutesLeft: 5,
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  badges: [
    { id: "math_slayer", title: "Math Slayer", icon: "Calculator", color: "#FF5E3A", desc: "Solved 30+ Algebra & Geometry PYQs" },
    { id: "streak_5", title: "5-Day Streak", icon: "Flame", color: "#FFB800", desc: "Practiced consistently 5 days in a row" },
    { id: "speed_tester", title: "Speed Demon", icon: "Zap", color: "#7C5CFC", desc: "Finished a Speed Mock in under 8 mins" },
    { id: "board_topper", title: "Board Contender", icon: "Trophy", color: "#00C49F", desc: "Top 20 in Pune District Mock Leaderboard" },
    { id: "ai_pioneer", title: "AI Scholar", icon: "Brain", color: "#6366F1", desc: "Mastered 15 doubts with Arya AI Tutor" }
  ]
};

export const BOARDS_DATA: Board[] = [
  { code: "MH-SSC", name: "Maharashtra State Board (SSC - Class 10)", region: "Maharashtra", classes: ["Class 9", "Class 10 (SSC)"], defLang: "Marathi / English" },
  { code: "MH-HSC", name: "Maharashtra State Board (HSC - Class 11-12)", region: "Maharashtra", classes: ["Class 11 (Sci/Arts/Com)", "Class 12 (HSC)"], defLang: "English / Marathi" },
  { code: "UP-BOARD", name: "Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP)", region: "Uttar Pradesh", classes: ["Class 10", "Class 12"], defLang: "Hindi / English" },
  { code: "BIHAR-BSEB", name: "Bihar School Examination Board (BSEB)", region: "Bihar", classes: ["Matric (10th)", "Inter (12th)"], defLang: "Hindi / English" },
  { code: "TN-SSLC", name: "Tamil Nadu Directorate of Govt Exams (TNDGE)", region: "Tamil Nadu", classes: ["SSLC (10th)", "HSC (+2)"], defLang: "Tamil / English" },
  { code: "KARNATAKA-KSEAB", name: "Karnataka School Examination Board (KSEAB)", region: "Karnataka", classes: ["SSLC (10th)", "2nd PUC (12th)"], defLang: "Kannada / English" },
  { code: "CBSE", name: "Central Board of Secondary Education (CBSE)", region: "All India", classes: ["Class 10", "Class 12"], defLang: "English / Hindi" }
];

export const COMPETITIVE_EXAMS_DATA: CompetitiveExam[] = [
  {
    id: "mht-cet",
    name: "MHT-CET 2025",
    category: "Engineering & Pharmacy",
    state: "Maharashtra",
    badge: "High Competition",
    color: "#FF5E3A",
    tagline: "PCM & PCB Official Shift Papers with Calculus Shortcuts",
    papersCount: 48,
    markingRule: "+1/+2 marks, NO negative marking",
    duration: "180 mins",
    topShortcuts: "King Property for Definite Integrals, Inverse Trig substitutions",
    icon: "Atom"
  },
  {
    id: "jee-main",
    name: "JEE Main 2025",
    category: "National Engineering (NTA)",
    state: "All India",
    badge: "Official NTA Format",
    color: "#7C5CFC",
    tagline: "Previous 10 Years Session-1 & Session-2 Shift Papers",
    papersCount: 84,
    markingRule: "+4 for correct, -1 negative marking",
    duration: "180 mins",
    topShortcuts: "Dimensional Elimination, Boundary Value Checks",
    icon: "Cpu"
  },
  {
    id: "neet-ug",
    name: "NEET-UG 2025",
    category: "Medical Entrance (NTA)",
    state: "All India",
    badge: "720/720 NCERT Drill",
    color: "#00C49F",
    tagline: "100% NCERT Biology & High-Yield Physics-Chemistry Drills",
    papersCount: 62,
    markingRule: "+4 for correct, -1 negative marking",
    duration: "200 mins",
    topShortcuts: "Genetic Cross Punnett Elimination, Steric Number Hybridization",
    icon: "Dna"
  },
  {
    id: "nda-cuet",
    name: "NDA & CUET (UG)",
    category: "Defence & Central Universities",
    state: "All India",
    badge: "General Aptitude",
    color: "#FFB800",
    tagline: "UPSC NDA Math + GAT & CUET Domain Subject PYQs",
    papersCount: 36,
    markingRule: "Exam specific negative marking",
    duration: "150 mins",
    topShortcuts: "Determinant row operations, Rapid Antonym elimination",
    icon: "Shield"
  },
  {
    id: "ntse-olympiad",
    name: "NTSE & Olympiads",
    category: "Scholarship & Foundation",
    state: "National / State Level",
    badge: "Mental Ability",
    color: "#EC4899",
    tagline: "MAT (Mental Ability Test) & SAT (Scholastic Aptitude Test)",
    papersCount: 30,
    markingRule: "+1 mark, No negative marking",
    duration: "120 mins",
    topShortcuts: "Mirror image symmetry, Number series differences",
    icon: "GraduationCap"
  }
];

export const SHORTCUTS_DATA: Shortcut[] = [
  {
    id: "sc-king",
    title: "Definite Integrals — King's Property 30s Hack",
    exam: "MHT-CET & JEE Main",
    subject: "Mathematics",
    formula: "\\int_{a}^{b} f(x)dx = \\int_{a}^{b} f(a+b-x)dx",
    trick: "Whenever finding \\int_{a}^{b} \\frac{f(x)}{f(x) + f(a+b-x)} dx, the answer is ALWAYS \\frac{b - a}{2} without calculating antiderivatives!",
    example: "Evaluate: \\int_{2}^{8} \\frac{\\sqrt{x}}{\\sqrt{x} + \\sqrt{10-x}} dx",
    instantAnswer: "\\frac{8 - 2}{2} = \\frac{6}{2} = 3",
    timeSaved: "Save ~2.5 minutes per question"
  },
  {
    id: "sc-dim",
    title: "Dimensional Elimination for Physics Numericals",
    exam: "NEET & JEE Main",
    subject: "Physics",
    formula: "[T] = [m]^a [k]^b \\implies T = 2\\pi \\sqrt{\\frac{m}{k}}",
    trick: "In 4-option time period or velocity formulas, check unit balance on RHS. Usually 2 out of 4 options have incorrect dimensional powers!",
    example: "Which formula represents velocity of sound in gas? A) \\sqrt{\\frac{\\rho}{\\gamma P}}  B) \\sqrt{\\frac{\\gamma P}{\\rho}}",
    instantAnswer: "Dimension of [P/\\rho] = [L^2 T^{-2}]. Square root yields [LT^{-1}] (velocity). Option B matches instantly!",
    timeSaved: "Save ~90 seconds"
  },
  {
    id: "sc-steric",
    title: "Instant Hybridization & Geometry via Steric Number",
    exam: "MHT-CET / NEET-UG",
    subject: "Chemistry",
    formula: "\\text{Steric No.} = \\frac{1}{2} [V + M - C + A]",
    trick: "Steric 2: sp (Linear), Steric 3: sp^2 (Trigonal Planar), Steric 4: sp^3 (Tetrahedral), Steric 5: sp^3d, Steric 6: sp^3d^2.",
    example: "Find hybridization of SF_4: V=6, M=4 \\implies \\text{SN} = \\frac{6+4}{2} = 5",
    instantAnswer: "sp^3d hybridization with See-Saw geometry (1 lone pair)",
    timeSaved: "Save ~60 seconds"
  },
  {
    id: "sc-cramer",
    title: "Cramer's Rule Determinant Shortcut for SSC Class 10",
    exam: "Maharashtra SSC Board",
    subject: "Algebra",
    formula: "x = \\frac{D_x}{D}, \\quad y = \\frac{D_y}{D}",
    trick: "Always verify a_1 b_2 - a_2 b_1 \\neq 0 first. If D=0, system is either inconsistent or infinitely many solutions without drawing graphs.",
    example: "3x - 4y = 10, \\quad 4x + 3y = 5",
    instantAnswer: "D = (3)(3) - (-4)(4) = 9 + 16 = 25; D_x = 50 \\implies x = 2, y = -1",
    timeSaved: "Full 3-mark guarantee in 40s"
  }
];export const SAMPLE_NOTES_DATA: SampleNote[] = [
  {
    id: "note-phys-newton",
    title: "Physics: Newton's 2nd Law of Motion (F = ma)",
    subject: "Science & Technology Part 1 / Physics",
    chapter: "Laws of Motion & Gravitation",
    ocrText: "Rate of change of momentum is proportional to applied force and takes place in the direction of force.\nP = mv => dP/dt = m(dv/dt) = ma\nF = k * ma (k=1 in SI) => F = ma (Newton)",
    previewImg: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=600&q=80",
    analysis: {
      englishSummary: "Newton's Second Law mathematically relates force, mass, and acceleration ($F = ma$). In SI units, 1 Newton is defined as 1 kg * 1 m/s^2. In CGS units, 1 Dyne = 10^-5 N.",
      marathiSummary: "न्यूटनचा गतीविषयक दुसरा नियम: संवेग परिवर्तनाचा दर प्रयुक्त बलाशी समानुपाती असतो आणि संवेगाचे परिवर्तन बलाच्या दिशेने होते. F = ma. SI पद्धतीत बलाचे एकक न्यूटन (N) आणि CGS पद्धतीत डाइन (Dyne) आहे. 1 N = 10^5 Dyne.",
      steps: [
        { step: 1, title: "Definition of Momentum", math: "p = m \\cdot v", desc: "Momentum (p) is the product of mass (m) and velocity (v)." },
        { step: 2, title: "Rate of Change of Momentum", math: "\\frac{\\Delta p}{\\Delta t} = \\frac{m(v - u)}{t} = m \\cdot a", desc: "Since rate of change of velocity (v-u)/t = a (acceleration)." },
        { step: 3, title: "Derivation of Force Formula", math: "F \\propto m \\cdot a \\implies F = k \\cdot ma \\implies F = ma", desc: "With constant k = 1 by SI convention, unit of Force is Newton." }
      ],
      eli5: "Imagine pushing an empty shopping cart vs a heavy cart filled with bricks. You need more push (Force) to accelerate the heavy cart at the same speed. That is F = ma!",
      markingScheme: "Statement: 1 Mark | Mathematical Derivation: 1.5 Marks | SI & CGS Units: 0.5 Mark (Total: 3 Marks)"
    }
  },
  {
    id: "note-math-trig",
    title: "Mathematics: Fundamental Trig Identity sin^2(theta) + cos^2(theta) = 1",
    subject: "Mathematics Part 2 (Geometry)",
    chapter: "Trigonometry",
    ocrText: "In triangle ABC, angle B = 90 deg.\nsin(theta) = AB/AC, cos(theta) = BC/AC\nAB^2 + BC^2 = AC^2 (Pythagoras)\n(AB/AC)^2 + (BC/AC)^2 = 1 => sin^2(theta) + cos^2(theta) = 1",
    previewImg: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
    analysis: {
      englishSummary: "Geometric proof of the primary Pythagorean trigonometric identity using a right-angled triangle ABC with hypotenuse AC.",
      marathiSummary: "त्रिकोणमितीय मूलभूत नित्यसमीकरण सिद्धता: काटकोन त्रिकोण ABC मध्ये पायथागोरसच्या प्रमेयानुसार AB^2 + BC^2 = AC^2. दोन्ही बाजूंना AC^2 ने भागल्यास sin^2(theta) + cos^2(theta) = 1 सिद्ध होते.",
      steps: [
        { step: 1, title: "Define Ratios in Right Triangle", math: "\\sin\\theta = \\frac{AB}{AC}, \\quad \\cos\\theta = \\frac{BC}{AC}", desc: "State trigonometric ratios clearly with labeled diagram." },
        { step: 2, title: "Apply Pythagoras Theorem", math: "AB^2 + BC^2 = AC^2", desc: "In triangle ABC, sum of squares of legs equals square of hypotenuse." },
        { step: 3, title: "Divide both sides by AC^2", math: "\\left(\\frac{AB}{AC}\\right)^2 + \\left(\\frac{BC}{AC}\\right)^2 = \\frac{AC^2}{AC^2} \\implies \\sin^2\\theta + \\cos^2\\theta = 1", desc: "Substitute ratios to complete formal proof." }
      ],
      eli5: "Think of a ladder leaning on a wall. The height it reaches squared plus the base distance squared always equals the ladder length squared.",
      markingScheme: "Labeled Diagram: 0.5 Mark | Ratio Definitions: 1 Mark | Pythagoras Substitution: 1.5 Marks (Total: 3 Marks)"
    }
  },
  {
    id: "note-marathi-samas",
    title: "मराठी व्याकरण: कर्मधारय व द्विगु समास (Board Marking Format)",
    subject: "Marathi (Second / First Language)",
    chapter: "मराठी व्याकरण व भाषाभ्यास (समास)",
    ocrText: "१. कर्मधारय समास: ज्या तत्पुरुष समासातील दोन्ही पदे एकाच विभक्तीत असतात व पहिले पद विशेषण असते. उदा. महादेव = महान असा देव\n२. द्विगु समास: ज्या कर्मधारय समासातील पहिले पद संख्याविशेषण असते. उदा. नवरात्र = नऊ रात्रींचा समूह",
    previewImg: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
    analysis: {
      englishSummary: "Marathi Grammar Guide on Karmadharaya & Dvigu Compound Words (Samas) with standard board exam vigrah rules.",
      marathiSummary: "दहावी व बारावी बोर्ड परीक्षेसाठी २ गुणांचा हक्काचा प्रश्न: कर्मधारय समासात विशेषण-विशेष्य संबंध असतो तर द्विगु समासात पहिले पद संख्या दर्शवून समूहाचा बोध होतो.",
      steps: [
        { step: 1, title: "कर्मधारय समास ओळख", math: "\\text{विशेषण} + \\text{नाम/विशेष्य} \\implies \\text{महादेव = महान असा देव}", desc: "उदा. रक्तचंदन, घनश्याम, महाराष्ट्र." },
        { step: 2, title: "द्विगु समास ओळख", math: "\\text{संख्या} + \\text{समूहाचा अर्थ} \\implies \\text{नवरात्र = ९ रात्रींचा समूह}", desc: "उदा. त्रैलोक्य, पंचवटी, चौघडा." },
        { step: 3, title: "परीक्षेत अचूक विग्रह", math: "\\text{सामासिक शब्द} \\rightarrow \\text{विग्रह} \\rightarrow \\text{समासाचे नाव}", desc: "नेहमी तीनही स्तंभ अचूक लिहिल्यास पूर्ण २ पैकी २ गुण मिळतात." }
      ],
      eli5: "कर्मधारय म्हणजे वर्णन करणे (जसे की महान देव), आणि द्विगु म्हणजे संख्या मोजून समूह बनवणे (जसे की नऊ रात्रींचा समूह नवरात्र)!",
      markingScheme: "विग्रह करणे: १ गुण | समासाचे नाव अचूक ओळखणे: १ गुण (एकूण: २ गुण)"
    }
  }
];

export const PYQ_PAPERS_DATA: PYQPaper[] = [
  // Class 10 (SSC / 10th Board) Papers
  {
    id: "mh-math1-2024",
    title: "Maharashtra SSC 2024: Mathematics Part 1 (Algebra)",
    board: "MH-SSC",
    classLevel: "Class 10",
    year: "2024",
    subject: "Mathematics",
    marks: 40,
    duration: "120 mins",
    solved: true,
    solvedCount: "14.2k students",
    difficulty: "Medium",
    languages: ["English", "Marathi"],
    highYieldTopics: ["Cramer's Rule", "Quadratic Formula", "Arithmetic Progression sum"],
    questionsCount: 16
  },
  {
    id: "mh-math2-2024",
    title: "Maharashtra SSC 2024: Mathematics Part 2 (Geometry)",
    board: "MH-SSC",
    classLevel: "Class 10",
    year: "2024",
    subject: "Mathematics",
    marks: 40,
    duration: "120 mins",
    solved: true,
    solvedCount: "11.8k students",
    difficulty: "Hard",
    languages: ["English", "Marathi"],
    highYieldTopics: ["Basic Proportionality Theorem", "Pythagoras Theorem", "Trigonometric Heights"],
    questionsCount: 15
  },
  {
    id: "mh-sci1-2024",
    title: "Maharashtra SSC 2024: Science & Technology Part 1",
    board: "MH-SSC",
    classLevel: "Class 10",
    year: "2024",
    subject: "Science & Technology",
    marks: 40,
    duration: "120 mins",
    solved: false,
    solvedCount: "18.5k students",
    difficulty: "Medium",
    languages: ["English", "Marathi"],
    highYieldTopics: ["Refraction Snell's Law", "Periodic Table Dobereiner Triads", "Lenses ray diagrams"],
    questionsCount: 18
  },
  {
    id: "mh-sci2-2024",
    title: "Maharashtra SSC 2024: Science & Technology Part 2",
    board: "MH-SSC",
    classLevel: "Class 10",
    year: "2024",
    subject: "Science & Technology",
    marks: 40,
    duration: "120 mins",
    solved: false,
    solvedCount: "16.1k students",
    difficulty: "Medium",
    languages: ["English", "Marathi"],
    highYieldTopics: ["Heredity & Evolution", "Life Processes in Living Organisms", "Environmental Management"],
    questionsCount: 16
  },
  {
    id: "mh-marathi-2023",
    title: "Maharashtra SSC 2023: Marathi (कुमारभारती)",
    board: "MH-SSC",
    classLevel: "Class 10",
    year: "2023",
    subject: "Marathi",
    marks: 80,
    duration: "180 mins",
    solved: false,
    solvedCount: "9.6k students",
    difficulty: "Easy",
    languages: ["Marathi"],
    highYieldTopics: ["समास व वाक्प्रचार", "स्थूलवाचन", "निबंध व पत्रलेखन"],
    questionsCount: 14
  },
  {
    id: "mh-soc-2023",
    title: "Maharashtra SSC 2023: Social Sciences (History & Pol Sci)",
    board: "MH-SSC",
    classLevel: "Class 10",
    year: "2023",
    subject: "Social Sciences",
    marks: 40,
    duration: "120 mins",
    solved: true,
    solvedCount: "8.9k students",
    difficulty: "Easy",
    languages: ["English", "Marathi"],
    highYieldTopics: ["Mass Media & History", "Applied History", "Electoral Process"],
    questionsCount: 12
  },
  {
    id: "cbse-math-10-2024",
    title: "CBSE Class 10 2024: Standard Mathematics",
    board: "CBSE",
    classLevel: "Class 10",
    year: "2024",
    subject: "Mathematics",
    marks: 80,
    duration: "180 mins",
    solved: false,
    solvedCount: "38.2k students",
    difficulty: "Medium",
    languages: ["English", "Hindi"],
    highYieldTopics: ["Trigonometric Identities", "Triangles Similarity Proof", "Surface Areas & Volumes"],
    questionsCount: 38
  },

  // Class 12 (HSC / 12th Board) Papers
  {
    id: "mh-hsc-phys-2024",
    title: "Maharashtra HSC 2024: Physics (Theory & Derivations)",
    board: "MH-HSC",
    classLevel: "Class 12",
    year: "2024",
    subject: "Physics",
    marks: 70,
    duration: "180 mins",
    solved: true,
    solvedCount: "22.4k students",
    difficulty: "Hard",
    languages: ["English", "Marathi"],
    highYieldTopics: ["Rotational Dynamics Moment of Inertia", "Wave Optics Double Slit", "Semiconductor Diodes"],
    questionsCount: 31
  },
  {
    id: "mh-hsc-chem-2024",
    title: "Maharashtra HSC 2024: Chemistry (Organic & Physical)",
    board: "MH-HSC",
    classLevel: "Class 12",
    year: "2024",
    subject: "Chemistry",
    marks: 70,
    duration: "180 mins",
    solved: false,
    solvedCount: "19.8k students",
    difficulty: "Hard",
    languages: ["English", "Marathi"],
    highYieldTopics: ["Chemical Thermodynamics & Enthalpy", "Aldehydes & Ketones Reactions", "Coordination Compounds"],
    questionsCount: 31
  },
  {
    id: "mh-hsc-math-2024",
    title: "Maharashtra HSC 2024: Mathematics & Statistics",
    board: "MH-HSC",
    classLevel: "Class 12",
    year: "2024",
    subject: "Mathematics",
    marks: 80,
    duration: "180 mins",
    solved: true,
    solvedCount: "27.5k students",
    difficulty: "Hard",
    languages: ["English"],
    highYieldTopics: ["Definite Integration & Areas", "Vectors & 3D Lines", "Differential Equations order/degree"],
    questionsCount: 34
  },
  {
    id: "mh-hsc-bio-2024",
    title: "Maharashtra HSC 2024: Biology (Botany & Zoology)",
    board: "MH-HSC",
    classLevel: "Class 12",
    year: "2024",
    subject: "Biology",
    marks: 70,
    duration: "180 mins",
    solved: false,
    solvedCount: "15.3k students",
    difficulty: "Medium",
    languages: ["English", "Marathi"],
    highYieldTopics: ["Reproduction in Lower & Higher Plants", "Inheritance and Variation", "Biotechnology Principles"],
    questionsCount: 31
  },
  {
    id: "cbse-phys-12-2024",
    title: "CBSE Class 12 2024: Physics Official Board Paper",
    board: "CBSE",
    classLevel: "Class 12",
    year: "2024",
    subject: "Physics",
    marks: 70,
    duration: "180 mins",
    solved: false,
    solvedCount: "41.9k students",
    difficulty: "Challenging",
    languages: ["English", "Hindi"],
    highYieldTopics: ["Electrostatics Gauss Law", "Electromagnetic Induction AC", "Ray & Wave Optics"],
    questionsCount: 33
  },

  // Competitive Exam Papers
  {
    id: "mht-cet-pcm-2024",
    title: "MHT-CET 2024: Math & Physics Shift-1 Solved Paper",
    board: "MHT-CET",
    classLevel: "Competitive",
    year: "2024",
    subject: "Competitive PCM",
    marks: 150,
    duration: "180 mins",
    solved: true,
    solvedCount: "32.4k students",
    difficulty: "Challenging",
    languages: ["English"],
    highYieldTopics: ["Calculus King Property", "Matrices Inverses", "Rotational Dynamics"],
    questionsCount: 50
  },
  {
    id: "jee-session1-2024",
    title: "JEE Main 2024 Session-1: Official NTA Solved Paper",
    board: "JEE Main",
    classLevel: "Competitive",
    year: "2024",
    subject: "Competitive PCM",
    marks: 300,
    duration: "180 mins",
    solved: false,
    solvedCount: "45.1k students",
    difficulty: "Very Hard",
    languages: ["English", "Hindi"],
    highYieldTopics: ["3D Geometry planes", "Chemical Bonding MO theory", "Current Electricity Kirchoff"],
    questionsCount: 75
  },
  {
    id: "neet-ug-bio-2024",
    title: "NEET-UG 2024: Biology 100 Qs NCERT Booster Paper",
    board: "NEET-UG",
    classLevel: "Competitive",
    year: "2024",
    subject: "Competitive PCB",
    marks: 360,
    duration: "100 mins",
    solved: true,
    solvedCount: "52.8k students",
    difficulty: "High Accuracy",
    languages: ["English", "Hindi"],
    highYieldTopics: ["Genetics & Evolution", "Human Physiology", "Ecology & Biomolecules"],
    questionsCount: 100
  }
];

export const SOLVER_QUESTION_DATA: SolverQuestion = {
  id: "q-cramer-2024",
  board: "Maharashtra SSC 2024 Exam • 3 Marks Question",
  chapter: "Linear Equations in Two Variables (Chapter 1)",
  questionEn: "Solve the following simultaneous equations using Cramer's Rule:\n$$3x - 4y = 10, \\quad 4x + 3y = 5$$",
  questionMr: "खालील एकसामयिक समीकरणे क्रेमरच्या पद्धतीने सोडवा:\n$$3x - 4y = 10, \\quad 4x + 3y = 5$$",
  steps: [
    {
      stepNum: 1,
      title: "Write equations in standard form ax + by = c and calculate determinant D",
      math: "D = \\begin{vmatrix} 3 & -4 \\\\ 4 & 3 \\end{vmatrix} = (3 \\times 3) - (-4 \\times 4) = 9 - (-16) = 9 + 16 = 25",
      desc: "Compare with a_1 x + b_1 y = c_1 and a_2 x + b_2 y = c_2. Here D = 25 != 0, so unique solution exists.",
      whyThisStep: "Why calculate D first? Determinant D ensures lines are not parallel. A non-zero determinant guarantees a single intersection point."
    },
    {
      stepNum: 2,
      title: "Calculate D_x by replacing x-coefficients with constant terms (c_1, c_2)",
      math: "D_x = \\begin{vmatrix} 10 & -4 \\\\ 5 & 3 \\end{vmatrix} = (10 \\times 3) - (-4 \\times 5) = 30 - (-20) = 30 + 20 = 50",
      desc: "In the first column, substitute constants 10 and 5 while keeping y-coefficients -4 and 3 in the second column.",
      whyThisStep: "Why replace column 1? By replacing x-coefficients with constants, the determinant directly isolates the x-shift magnitude."
    },
    {
      stepNum: 3,
      title: "Calculate D_y by replacing y-coefficients with constant terms (c_1, c_2)",
      math: "D_y = \\begin{vmatrix} 3 & 10 \\\\ 4 & 5 \\end{vmatrix} = (3 \\times 5) - (10 \\times 4) = 15 - 40 = -25",
      desc: "In the second column, substitute constants 10 and 5 while retaining original x-coefficients 3 and 4 in the first column.",
      whyThisStep: "Why is Dy negative? Because 15 - 40 = -25, reflecting that the y-coordinate lies below the x-axis in quadrant 4."
    },
    {
      stepNum: 4,
      title: "Apply Cramer's Rule Formula for x and y",
      math: "x = \\frac{D_x}{D} = \\frac{50}{25} = 2, \\quad y = \\frac{D_y}{D} = \\frac{-25}{25} = -1",
      desc: "Final Solution set is (x, y) = (2, -1). Verification: 3(2) - 4(-1) = 6 + 4 = 10 (Verified!).",
      whyThisStep: "Verification Check: Always plug (2, -1) back into both equations to guarantee 100% full board marks!"
    }
  ],
  eli5: "Imagine two balancing scales. Instead of guessing numbers or drawing grid lines, Cramer's Rule uses determinant cross-multiplication shortcuts to pinpoint exact weights (x=2, y=-1) instantly!",
  markingGuide: "D calculation: 1 Mark | Dx and Dy calculation: 1 Mark | Final (x, y) with Cramer's formula: 1 Mark (Total: 3 Marks)."
};export const MOCK_QUESTIONS_DATA: MockQuestion[] = [
  {
    id: 1,
    chapter: "Linear Equations in Two Variables",
    question: "For simultaneous equations in $x$ and $y$, if $D_x = 49$, $D_y = -63$, and $D = 7$, then what is the value of $y$?",
    options: ["$7$", "$-9$", "$9$", "$-7$"],
    correct: 1,
    explanation: "By Cramer's Rule, $y = \\frac{D_y}{D} = \\frac{-63}{7} = -9$."
  },
  {
    id: 2,
    chapter: "Quadratic Equations",
    question: "Which of the following is a quadratic equation whose roots are $3$ and $-10$?",
    options: [
      "$x^2 - 7x - 30 = 0$",
      "$x^2 + 7x - 30 = 0$",
      "$x^2 - 7x + 30 = 0$",
      "$x^2 + 7x + 30 = 0$"
    ],
    correct: 1,
    explanation: "Sum of roots $\\alpha + \\beta = 3 + (-10) = -7$. Product $\\alpha\\beta = 3 \\times (-10) = -30$. Equation: $x^2 - (\\alpha+\\beta)x + \\alpha\\beta = x^2 + 7x - 30 = 0$."
  },
  {
    id: 3,
    chapter: "Arithmetic Progression",
    question: "For an A.P., if $a = 3.5$, $d = 0$, then what is the value of $t_{101}$?",
    options: ["$0$", "$3.5$", "$103.5$", "$350$"],
    correct: 1,
    explanation: "Formula: $t_n = a + (n-1)d = 3.5 + 100(0) = 3.5$."
  },
  {
    id: 4,
    chapter: "Trigonometry",
    question: "If $\\tan\\theta = \\frac{3}{4}$, then what is the value of $\\cos\\theta$?",
    options: ["$\\frac{4}{5}$", "$\\frac{3}{5}$", "$\\frac{5}{4}$", "$\\frac{4}{3}$"],
    correct: 0,
    explanation: "Opposite = 3, Adjacent = 4, Hypotenuse = 5. $\\cos\\theta = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}} = \\frac{4}{5}$."
  },
  {
    id: 5,
    chapter: "Probability",
    question: "A die is rolled once. What is the probability of getting an odd prime number?",
    options: ["$\\frac{1}{2}$", "$\\frac{1}{3}$", "$\\frac{2}{3}$", "$\\frac{1}{6}$"],
    correct: 1,
    explanation: "Sample space = {1, 2, 3, 4, 5, 6}. Odd prime numbers = {3, 5}. Probability = 2/6 = 1/3."
  },
  {
    id: 6,
    chapter: "Pythagoras Theorem",
    question: "In $\\triangle ABC$, $\\angle B = 90^\\circ$. If $AB = 6\\text{ cm}$ and $BC = 8\\text{ cm}$, find length of hypotenuse $AC$.",
    options: ["$10\\text{ cm}$", "$14\\text{ cm}$", "$12\\text{ cm}$", "$9\\text{ cm}$"],
    correct: 0,
    explanation: "$AC^2 = 6^2 + 8^2 = 36 + 64 = 100 \\implies AC = 10\\text{ cm}$."
  },
  {
    id: 7,
    chapter: "Science: Gravitation",
    question: "What is the value of universal gravitational constant $G$ in SI units?",
    options: [
      "$6.673 \\times 10^{-11} \\text{ N m}^2/\\text{kg}^2$",
      "$9.8 \\text{ m/s}^2$",
      "$6.673 \\times 10^{11} \\text{ N m}^2/\\text{kg}^2$",
      "$1.6 \\times 10^{-19} \\text{ C}$"
    ],
    correct: 0,
    explanation: "Universal Gravitational constant $G = 6.673 \\times 10^{-11} \\text{ N m}^2/\\text{kg}^2$."
  },
  {
    id: 8,
    chapter: "Science: Chemical Reactions",
    question: "When iron nails are dipped in copper sulphate solution ($\\text{CuSO}_4$), what type of reaction takes place?",
    options: [
      "Displacement Reaction",
      "Combination Reaction",
      "Decomposition Reaction",
      "Double Displacement Reaction"
    ],
    correct: 0,
    explanation: "$\\text{Fe} + \\text{CuSO}_4 \\rightarrow \\text{FeSO}_4 + \\text{Cu}$. Iron is more reactive, hence displacement reaction."
  },
  {
    id: 9,
    chapter: "Competitive Calculus (MHT-CET / JEE)",
    question: "Evaluate: $\\int_{0}^{\\pi/2} \\frac{\\sin^{2025} x}{\\sin^{2025} x + \\cos^{2025} x} dx$",
    options: ["$\\frac{\\pi}{4}$", "$\\frac{\\pi}{2}$", "$1$", "$0$"],
    correct: 0,
    explanation: "Using King's property: $\\frac{b-a}{2} = \\frac{\\pi/2 - 0}{2} = \\frac{\\pi}{4}$."
  },
  {
    id: 10,
    chapter: "Statistics & Data",
    question: "If Mean $= 25$ and Median $= 26$, find Mode using empirical formula $\\text{Mode} = 3\\text{Median} - 2\\text{Mean}$.",
    options: ["$28$", "$27$", "$26$", "$30$"],
    correct: 0,
    explanation: "$\\text{Mode} = 3(26) - 2(25) = 78 - 50 = 28$."
  }
];

export const TRENDS_INTELLIGENCE_DATA = {
  fiveYearTrends: [
    { chapter: "Linear Equations in Two Variables", weightage: "12 Marks", repeatProb: 98, status: "Guaranteed Every Year", tag: "Hot Topic" },
    { chapter: "Quadratic Equations", weightage: "12 Marks", repeatProb: 94, status: "Guaranteed 3-Mark Word Problem", tag: "High Yield" },
    { chapter: "Trigonometry & Heights", weightage: "10 Marks", repeatProb: 88, status: "Identity Proof Guaranteed", tag: "High Yield" },
    { chapter: "Pythagoras Theorem & Similarity", weightage: "10 Marks", repeatProb: 86, status: "Theorem Proof or Geometric Mean", tag: "High Yield" },
    { chapter: "Arithmetic Progression", weightage: "8 Marks", repeatProb: 82, status: "Sn and tn application", tag: "Standard" },
    { chapter: "Circle & Tangents Theorem", weightage: "12 Marks", repeatProb: 90, status: "Tangent Secant Theorem", tag: "Hot Topic" },
    { chapter: "Statistics & Probability", weightage: "12 Marks", repeatProb: 92, status: "Mean / Median Step Deviation", tag: "Score Booster" }
  ],
  top3GuaranteedFormats: [
    {
      rank: 1,
      title: "Cramer's Rule 3-Mark Numerical (D, Dx, Dy)",
      frequency: "100% in last 12 Board Exams",
      tip: "Keep signs strict when multiplying negative numbers: (-4) * (-4) = +16."
    },
    {
      rank: 2,
      title: "Pythagoras Theorem / Basic Proportionality Theorem Formal Proof",
      frequency: "Appeared in 9 out of 10 Board sessions",
      tip: "Draw labeled figure with construction line to lock the first 1 mark automatically."
    },
    {
      rank: 3,
      title: "Fleming's Left Hand Rule & Electric Motor Working",
      frequency: "85% appearance in Science 1 Section B",
      tip: "Remember mnemonic: FBI (Thumb = Force, Forefinger = Magnetic Field, Middle finger = Current)."
    }
  ],
  weakAreaDiagnostic: {
    studentWeakChapter: "Trigonometry Heights & Distances (Word Problems)",
    recentAccuracy: "62% (Missed angle of depression conversion)",
    recommendedAction: "Solve 4 PYQ Word Problems (2022-2024) with step-by-step angle diagram breakdown.",
    suggestedPaperId: "mh-math2-2024"
  }
};

export const LEADERBOARDS_DATA: Record<string, LeaderboardEntry[]> = {
  district: [
    { rank: 1, name: "Pranav Joshi", district: "Pune", school: "Fergusson Jr. College", coins: 1420, streak: 28, avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80" },
    { rank: 2, name: "Tanvi Deshmukh", district: "Pune", school: "Abasaheb Garware High School", coins: 1290, streak: 24, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80" },
    { rank: 3, name: "Atharva Kulkarni", district: "Pune", school: "Modern High School", coins: 1180, streak: 21, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" },
    { rank: 4, name: "Snehal Shinde", district: "Pune", school: "Ramanbaug High School", coins: 940, streak: 18, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" },
    { rank: 5, name: "Omkar Patil", district: "Pune", school: "Nutan Marathi Vidyalaya", coins: 890, streak: 15, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" },
    { rank: 14, name: "Atik Imteyaz (You)", district: "Pune", school: "Camp High School", coins: 340, streak: 5, isUser: true, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" }
  ],
  state: [
    { rank: 1, name: "Ananya Kadam", district: "Mumbai", school: "Ruparel College", coins: 2850, streak: 42, avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80" },
    { rank: 2, name: "Rohit Shinde", district: "Nagpur", school: "St. John High School", coins: 2610, streak: 39, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80" },
    { rank: 3, name: "Aarohi Pawar", district: "Kolhapur", school: "Maharani Tarabai Vidyalaya", coins: 2430, streak: 35, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" },
    { rank: 4, name: "Pranav Joshi", district: "Pune", school: "Fergusson Jr. College", coins: 1420, streak: 28, avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80" },
    { rank: 82, name: "Atik Imteyaz (You)", district: "Pune", school: "Camp High School", coins: 340, streak: 5, isUser: true, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" }
  ],
  national: [
    { rank: 1, name: "Aditya Verma", district: "Lucknow, UP", school: "CMS Gomti Nagar", coins: 4120, streak: 60, avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80" },
    { rank: 2, name: "Kavya Sundaram", district: "Chennai, TN", school: "DAV Boys Gopalapuram", coins: 3890, streak: 55, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80" },
    { rank: 3, name: "Rishabh Pandey", district: "Patna, Bihar", school: "DPS Patna", coins: 3650, streak: 50, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" },
    { rank: 412, name: "Atik Imteyaz (You)", district: "Pune, MH", school: "Camp High School", coins: 340, streak: 5, isUser: true, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" }
  ]
};

export const SM_STORE_DATA: StoreItem[] = [
  {
    id: "item-streak-freeze",
    name: "Streak Freeze Shield",
    cost: 100,
    icon: "ShieldAlert",
    color: "#38BDF8",
    desc: "Protects your daily practice streak if you miss a day of solving.",
    badge: "Most Popular"
  },
  {
    id: "item-pro-mock",
    name: "Pro Mock Exam Pass",
    cost: 200,
    icon: "Crown",
    color: "#FFB800",
    desc: "Unlock advanced AI full-length 2025 predicted question sets.",
    badge: "High Value"
  },
  {
    id: "item-golden-frame",
    name: "Golden Topper Avatar Frame",
    cost: 500,
    icon: "Gem",
    color: "#EC4899",
    desc: "Display an exclusive glowing gold border on district leaderboards.",
    badge: "Cosmetic Exclusive"
  },
  {
    id: "item-ai-turbo",
    name: "Arya AI Turbo Solver Pack",
    cost: 150,
    icon: "Wand2",
    color: "#7C5CFC",
    desc: "Instant handwritten OCR answers with audio explanations.",
    badge: "Productivity"
  }
];

export const PEER_ACTIVITY_DATA: PeerActivity[] = [
  { name: "Tanvi D.", action: "just solved Maharashtra SSC 2024 Algebra Q.3", time: "1 min ago", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=60&q=80" },
  { name: "Atharva K.", action: "scored 90% in Trigonometry Mock Test", time: "3 mins ago", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80" },
  { name: "Ananya K.", action: "unlocked 'Math Slayer' Gold Badge", time: "6 mins ago", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=60&q=80" },
  { name: "Rohit S.", action: "practiced MHT-CET 2024 Integration shortcut", time: "9 mins ago", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=60&q=80" }
];