-- ==========================================================
-- StatXam - Supabase Database Schema & Storage Setup
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ==========================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Papers Table (10-Year Question Papers & Specimen Papers)
CREATE TABLE IF NOT EXISTS public.papers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    exam_type TEXT NOT NULL,         -- 'Board', 'Specimen', 'Competitive'
    board TEXT NOT NULL,             -- 'CBSE', 'ICSE', 'WB Board', 'NTA'
    class_level TEXT NOT NULL,       -- 'Class 10', 'Class 12', 'Competitive'
    subject TEXT NOT NULL,           -- 'Physics', 'Chemistry', 'Mathematics', 'Biology', etc.
    year INT NOT NULL,               -- 2014 - 2024
    file_url TEXT NOT NULL,          -- Direct URL to PDF in Supabase Storage Bucket or Drive
    size TEXT DEFAULT '3.0 MB',
    total_marks INT DEFAULT 100,
    high_yield_topics JSONB DEFAULT '[]'::jsonb, -- Array of { topic: string, marks: number }
    summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Granular Question Bank (Parsed from 10-Year PDFs)
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    paper_id UUID REFERENCES public.papers(id) ON DELETE CASCADE,
    chapter TEXT NOT NULL,
    topic TEXT,
    question_type TEXT NOT NULL DEFAULT 'MCQ', -- 'MCQ', 'Assertion-Reason', 'Short', 'Numerical'
    question_text TEXT NOT NULL,
    options JSONB,                  -- ["Option A", "Option B", "Option C", "Option D"]
    correct_answer INT NOT NULL DEFAULT 0, -- 0-indexed (0=A, 1=B, 2=C, 3=D)
    explanation TEXT,               -- Step-by-step mathematical/conceptual solution
    marks INT DEFAULT 1,
    negative_marks INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Mock Tests
CREATE TABLE IF NOT EXISTS public.mock_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    title TEXT NOT NULL,
    exam_type TEXT NOT NULL,
    class_level TEXT NOT NULL,
    board TEXT NOT NULL,
    subject TEXT NOT NULL,
    duration_minutes INT DEFAULT 45,
    total_marks INT NOT NULL,
    questions JSONB NOT NULL,       -- List of full question objects
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Student Test Attempts
CREATE TABLE IF NOT EXISTS public.test_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mock_test_id UUID REFERENCES public.mock_tests(id) ON DELETE SET NULL,
    user_id UUID,
    score INT NOT NULL,
    total_marks INT NOT NULL,
    accuracy_percentage NUMERIC(5,2),
    time_taken_seconds INT NOT NULL,
    submitted_answers JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Enable Row Level Security (RLS) for Production Safety
ALTER TABLE public.papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_attempts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to papers and questions
CREATE POLICY "Allow public read on papers" ON public.papers FOR SELECT USING (true);
CREATE POLICY "Allow public read on questions" ON public.questions FOR SELECT USING (true);
CREATE POLICY "Allow public read on mock_tests" ON public.mock_tests FOR SELECT USING (true);
CREATE POLICY "Allow public read on test_attempts" ON public.test_attempts FOR SELECT USING (true);
CREATE POLICY "Allow public insert on test_attempts" ON public.test_attempts FOR INSERT WITH CHECK (true);

-- ==========================================================
-- Storage Bucket Setup for Past Question Paper PDFs
-- ==========================================================
-- Insert 'question-papers' storage bucket if using Supabase Storage
INSERT INTO storage.buckets (id, name, public) 
VALUES ('question-papers', 'question-papers', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow public download of question-papers" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'question-papers');
