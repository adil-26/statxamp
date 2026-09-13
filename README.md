# 🎓 StatXam (Statxamp) - AI-Powered Exam Prep & Past Paper Analysis Platform

> **Comprehensive Developer Handover & Project Dossier**  
> *This documentation serves as the master blueprint and chronological record of StatXam. Any developer or AI tool (Google Antigravity, Cursor, OpenAI Codex, Claude Code, Lovable, GitHub Copilot) can read this file to understand the exact motive, architectural foundation, past decisions, and immediate implementation tasks.*

---

## 📌 1. Project Motive & Core Vision

### The Problem
Students preparing for **Class 10 and Class 12 Board Exams** (CBSE, ICSE, State Boards) and **Competitive Entrance Exams** (JEE Main/Advanced, NEET, CUET, etc.) face a major hurdle:
- Past 10-year question papers, specimen papers, and official marking schemes are scattered across hundreds of disorganized websites, forums, and unofficial blogs.
- Students spend hours hunting down PDFs instead of studying.
- Raw PDFs don't provide actionable insights—students don't know which chapters carry the **highest marks** or which question patterns repeat every year.

### The Solution (StatXam Initiative)
StatXam bridges this gap by creating an all-in-one AI-driven intelligent exam ecosystem:
1. **Centralized 10-Year Question Bank & Specimen Archive**:
   - Host official question papers and specimen papers from the past 10+ years (currently collected in Google Drive / Cloud Storage) directly in the app.
2. **AI Question Extraction from PDFs**:
   - Multimodal AI extracts questions, options, formulas, diagrams, and marking schemes directly from past question paper PDFs.
3. **10-Year Trend & High-Weightage Analysis**:
   - The AI analyzes paper trends across the past decade to reveal high-yield chapters, recurring question patterns, and marks distribution.
4. **Adaptive AI Mock Test Generator**:
   - Generates tailored, realistic mock exams combining syllabus blueprints, 10-year weightage data, and online sources.
5. **Interactive CBT Exam Room & Auto-Graded MCQs**:
   - A dedicated computer-based testing (CBT) simulator with live countdown timer, question palette, instant MCQ grading, negative marking calculation, and step-by-step solutions.
6. **Future-Proof Multi-Platform Design**:
   - Optimized for **Vercel** serverless deployment.
   - Synchronized with **GitHub** for compatibility with **Lovable** and cloud IDEs.
   - Architected for instant conversion to **Android/iOS mobile apps** via Capacitor.js.

---

## 📜 2. Project Origin & History

### Initial Phase (Frontend Shell)
The project started as a Next.js 14 application focused on a sleek, high-tech cyber aesthetic:
- **Framework**: Next.js 14 (App Router) + TypeScript.
- **Styling**: Tailwind CSS + Custom CSS (Midnight dark theme `#080C14`, cyan neon glow borders, glassmorphism, cyber-grid).
- **Interactivity**: Framer Motion animations and Lucide React icons.
- **State**: The user interface was visually appealing but functioned purely as a mockup:
  - `app/ai-generator/page.tsx` simulated generation using `setTimeout(() => {...}, 2000)` with hardcoded mock questions.
  - `app/dashboard/previous-year/page.tsx` contained 4 static mock paper cards without real PDF viewing or filtering.
  - `app/dashboard/mock-exams/page.tsx` had an *"Enter Exam Room"* button with no linked test player.
  - No backend (`app/api/`), no database, and no real AI API connection.

---

## 🤖 3. User Directives & AI Architectural Contributions

### User Directives (Commands Given by Project Creator)
1. **Perform Full Codebase Audit**:
   - Analyze the entire project structure, review what is finished, and identify what backend and database components are missing.
2. **Define Product Roadmap for Exam Preparation**:
   - Target Class 10 & 12 Boards and Competitive exams.
   - Utilize past 10-year papers and specimen papers stored in Google Drive as the source dataset.
   - Design an AI pipeline to extract questions from PDFs and analyze high-mark chapter trends.
   - Create an interactive mock test window with automated MCQ evaluation and answer keys.
3. **Establish Developer Handover Documentation**:
   - Maintain a master `README.md` containing all prompts, decisions, logs, and architecture so that switching to **Cursor, Codex, Lovable, or Antigravity** retains 100% context.
4. **Ensure Cloud & Mobile Readiness**:
   - Prepare architecture for Vercel deployment, TypeScript strict typing, GitHub sync, Lovable workflows, and future mobile app conversion.

### AI Strategic Contributions & Ideas Proposed
1. **Multimodal PDF Ingestion via Gemini 1.5/2.0 Flash**:
   - Rather than relying on traditional, error-prone OCR/regex tools, leverage Google Gemini's native PDF input capability. Gemini can ingest raw exam PDFs and return clean, structured JSON containing question text, LaTeX equations, options, marks, and topic tags.
2. **Structured Relational Database (Supabase PostgreSQL)**:
   - Recommended Supabase for zero-maintenance PostgreSQL, row-level security (RLS), built-in student authentication (Google Sign-In), and storage buckets for past paper PDFs.
3. **Interactive CBT Exam Room (Test Simulator)**:
   - Designed a full Computer-Based Test (CBT) player featuring a live countdown clock, question palette (Answered, Unanswered, Marked for Review), section filters, instant MCQ auto-evaluation, and detailed solution reviews.
4. **10-Year Weightage & Trend Analyzer**:
   - Proposed a data analytics module calculating historical chapter weightage (e.g., *"In Class 12 Physics, Optics averages 14 marks annually, appearing in 8 of the last 10 years"*), helping students prioritize high-yield topics.
5. **Mobile Conversion via Capacitor.js**:
   - Instead of rewriting the app in React Native, wrap the existing Next.js web application using `@capacitor/core` and `@capacitor/android` to compile native Android APKs with minimal overhead.

---

## 🏗️ 4. System Architecture Blueprint

```
                     [Past 10-Year Exam PDFs (Google Drive / Storage)]
                                          │
                                          ▼
                      [Gemini Multimodal PDF Parsing Pipeline]
                                          │
                        (Structured Questions, Years, Marks)
                                          │
                                          ▼
                         [Supabase PostgreSQL Database]
                         ├── papers (metadata & PDF URLs)
                         ├── questions (questions, options, answers)
                         ├── mock_tests (generated exam blueprints)
                         └── test_attempts (scores, time, answers)
                                          │
                  ┌───────────────────────┴───────────────────────┐
                  ▼                                               ▼
      [AI Trend & Weightage Engine]                   [Next.js 14 API Layer]
   (High-yield topics & repeat rates)             (/api/generate-exam, /api/evaluate)
                  │                                               │
                  └───────────────────────┬───────────────────────┘
                                          │
                                          ▼
                       [StatXam Frontend Experience (Vercel)]
      ├── 10-Year Paper Library & PDF Viewer (/dashboard/previous-year)
      ├── Trend Analytics & High-Yield Charts (/dashboard/analytics)
      ├── Dynamic Mock Test Generator (/ai-generator)
      └── Interactive CBT Exam Room Window (/dashboard/mock-exams/[id])
```

---

## 🗄️ 5. Database Schema Blueprint (PostgreSQL / Supabase)

```sql
-- 1. Past Question Papers & Specimen Archive
CREATE TABLE papers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    exam_type TEXT NOT NULL,         -- 'CBSE', 'ICSE', 'JEE_MAIN', 'NEET', etc.
    class_level TEXT NOT NULL,       -- 'Class 10', 'Class 12', 'Dropper'
    subject TEXT NOT NULL,           -- 'Physics', 'Chemistry', 'Mathematics', 'Biology'
    year INT NOT NULL,               -- 2014 - 2024
    paper_type TEXT DEFAULT 'BOARD', -- 'BOARD', 'SPECIMEN', 'COMPARTMENT'
    file_url TEXT NOT NULL,          -- Direct link to PDF in Supabase Storage or Drive
    total_marks INT DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Granular Question Bank (Extracted from PDFs)
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    paper_id UUID REFERENCES papers(id) ON DELETE CASCADE,
    chapter TEXT NOT NULL,
    topic TEXT,
    question_type TEXT NOT NULL,     -- 'MCQ', 'ASSERTION_REASON', 'SHORT', 'NUMERICAL', 'LONG'
    question_text TEXT NOT NULL,
    options JSONB,                  -- ["Option A", "Option B", "Option C", "Option D"]
    correct_answer TEXT,            -- 'B' or exact string
    explanation TEXT,               -- Step-by-step solution
    marks INT DEFAULT 1,
    weightage_score INT DEFAULT 1   -- Historical recurrence frequency (1-5)
);

-- 3. Mock Tests Generated
CREATE TABLE mock_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    title TEXT NOT NULL,
    exam_type TEXT NOT NULL,
    duration_minutes INT DEFAULT 60,
    total_questions INT NOT NULL,
    questions JSONB NOT NULL,       -- Array of full question objects
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Student Test Attempts & Performance
CREATE TABLE test_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mock_test_id UUID REFERENCES mock_tests(id) ON DELETE CASCADE,
    user_id UUID,
    score INT NOT NULL,
    total_marks INT NOT NULL,
    accuracy_percentage NUMERIC(5,2),
    time_taken_seconds INT NOT NULL,
    submitted_answers JSONB NOT NULL,
    topic_breakdown JSONB,          -- Strong vs. weak chapters
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🗺️ 6. Phased Implementation Roadmap

### Phase 1: Interactive CBT Exam Room & Auto-Graded MCQs (Immediate Priority)
- [ ] Create dynamic exam route: `/dashboard/mock-exams/[id]`.
- [ ] Implement live countdown timer with auto-submit on expiration.
- [ ] Build question palette navigation (Answered, Unanswered, Marked for Review).
- [ ] Implement instant MCQ grading engine (score, accuracy %, negative marking).
- [ ] Create a comprehensive post-exam scorecard with question-by-question solution explanations.

### Phase 2: Live AI Integration (Gemini 1.5/2.0 API)
- [ ] Create `/api/generate-exam/route.ts` powered by Google Gemini SDK.
- [ ] Replace `setTimeout` simulation in `/ai-generator` with live AI prompt generation.
- [ ] Enforce strict JSON schema validation using **Zod** so questions never format incorrectly.
- [ ] Add support for Class 10 & 12 Board blueprints and JEE/NEET patterns.

### Phase 3: 10-Year Question Paper Library & PDF Management
- [ ] Upgrade `/dashboard/previous-year` with dynamic multi-tier filters (Board, Class, Subject, Year).
- [ ] Integrate PDF view/preview modal directly in the dashboard.
- [ ] Add 10-year weightage badges (e.g., "High Frequency Topic", "14 Marks Average").

### Phase 4: Backend & Database (Supabase + Auth)
- [ ] Initialize Supabase project and execute database migration scripts.
- [ ] Connect Supabase Client (`@supabase/supabase-js`, `@supabase/ssr`).
- [ ] Add Student Authentication (Google One-Tap / Email Auth).
- [ ] Persist test results, streaks, and saved notes to user profiles.

### Phase 5: Mobile App Conversion (Capacitor.js) & Vercel CI/CD
- [ ] Configure `output: 'export'` or Capacitor HTTP bridge for mobile.
- [ ] Install `@capacitor/core`, `@capacitor/cli`, and `@capacitor/android`.
- [ ] Generate Android Studio project with `npx cap add android`.
- [ ] Verify seamless deployment on Vercel and real-time synchronization with Lovable via GitHub.

---

## 🤝 7. Developer & AI Handover Instructions

If you are continuing development on this project using **Cursor**, **OpenAI Codex**, **Lovable**, or another IDE:

1. **Read this file (`README.md`) first** to understand the business logic, student user profile, and technology constraints.
2. **Current Tech Stack**:
   - Next.js 14 (App Router)
   - React 18
   - TypeScript
   - Tailwind CSS
   - Framer Motion
   - Lucide React
3. **Key Working Files**:
   - `app/page.tsx` — Landing page.
   - `app/ai-generator/page.tsx` — Study material & mock test configuration interface.
   - `app/dashboard/mock-exams/page.tsx` — Mock exam listings.
   - `app/dashboard/previous-year/page.tsx` — 10-year paper archive.
   - `components/sidebar.tsx` — Dashboard navigation.
4. **Rule for AI Assistants**:
   - Preserve existing midnight/cyber-glow styling tokens (`midnight-900`, `cyan-400`, `cyber-grid`, `glow-border`).
   - Do not replace working code with mock placeholders; implement functional, type-safe logic.

---

## 🚀 8. Quick Start & Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

*Project created and maintained by Atik Imteyaz. Enhanced and architected with AI pairing.*