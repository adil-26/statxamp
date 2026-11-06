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
DROP POLICY IF EXISTS "Allow public read on papers" ON public.papers;
DROP POLICY IF EXISTS "Allow public read on questions" ON public.questions;
DROP POLICY IF EXISTS "Allow public read on mock_tests" ON public.mock_tests;
DROP POLICY IF EXISTS "Allow public read on test_attempts" ON public.test_attempts;
DROP POLICY IF EXISTS "Allow public insert on test_attempts" ON public.test_attempts;
CREATE POLICY "Allow public read on papers" ON public.papers FOR SELECT USING (true);
CREATE POLICY "Allow public read on questions" ON public.questions FOR SELECT USING (true);
CREATE POLICY "Allow public read on mock_tests" ON public.mock_tests FOR SELECT USING (true);

-- ==========================================================
-- Storage Bucket Setup for Past Question Paper PDFs
-- ==========================================================
-- Insert 'question-papers' storage bucket if using Supabase Storage
INSERT INTO storage.buckets (id, name, public) 
VALUES ('question-papers', 'question-papers', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Allow public download of question-papers" ON storage.objects;
CREATE POLICY "Allow public download of question-papers" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'question-papers');

-- 7. Student profiles (one row per Supabase Auth user)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL DEFAULT '',
    email TEXT,
    board TEXT NOT NULL DEFAULT '',
    class_level TEXT NOT NULL DEFAULT 'Class 10',
    coins INT NOT NULL DEFAULT 0,
    streak INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Students read their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Students insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Students update their own profile" ON public.profiles;

CREATE POLICY "Students read their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Students insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Students update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, board, class_level)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'board', ''),
        COALESCE(NEW.raw_user_meta_data->>'class_level', 'Class 10')
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. Student details shown in the app
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS stream TEXT NOT NULL DEFAULT '';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'English';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS district TEXT NOT NULL DEFAULT '';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS state TEXT NOT NULL DEFAULT '';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS school TEXT NOT NULL DEFAULT '';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT NOT NULL DEFAULT '';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS theme TEXT NOT NULL DEFAULT 'light';

ALTER TABLE public.mock_tests
    ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.test_attempts
    ALTER COLUMN user_id SET NOT NULL;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'mock_tests_user_id_fkey'
    ) THEN
        ALTER TABLE public.mock_tests
            ADD CONSTRAINT mock_tests_user_id_fkey
            FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'test_attempts_user_id_fkey'
    ) THEN
        ALTER TABLE public.test_attempts
            ADD CONSTRAINT test_attempts_user_id_fkey
            FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;
END $$;

DROP POLICY IF EXISTS "Students read their own mocks" ON public.mock_tests;
DROP POLICY IF EXISTS "Students insert their own mocks" ON public.mock_tests;
DROP POLICY IF EXISTS "Students read their own attempts" ON public.test_attempts;
DROP POLICY IF EXISTS "Students insert their own attempts" ON public.test_attempts;
CREATE POLICY "Students read their own mocks" ON public.mock_tests
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Students insert their own mocks" ON public.mock_tests
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Students read their own attempts" ON public.test_attempts
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Students insert their own attempts" ON public.test_attempts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    paper_key TEXT NOT NULL,
    title TEXT NOT NULL DEFAULT '',
    board TEXT NOT NULL DEFAULT '',
    class_level TEXT NOT NULL DEFAULT '',
    subject TEXT NOT NULL DEFAULT '',
    year TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (user_id, paper_key)
);

CREATE TABLE IF NOT EXISTS public.badges (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    icon TEXT NOT NULL,
    color TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user_badges (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    badge_id TEXT NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (user_id, badge_id)
);

CREATE TABLE IF NOT EXISTS public.store_items (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    cost INT NOT NULL,
    icon TEXT NOT NULL,
    color TEXT NOT NULL,
    description TEXT NOT NULL,
    badge TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS public.store_purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    item_id TEXT NOT NULL REFERENCES public.store_items(id),
    cost INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.doubt_threads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'New doubt',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.doubt_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_id UUID NOT NULL REFERENCES public.doubt_threads(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('student', 'tutor')),
    body TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.saved_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    subject TEXT NOT NULL DEFAULT '',
    chapter TEXT NOT NULL DEFAULT '',
    body TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.practice_days (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    practice_date DATE NOT NULL,
    minutes INT NOT NULL DEFAULT 0,
    questions_solved INT NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id, practice_date)
);

INSERT INTO public.badges (id, title, icon, color, description) VALUES
    ('math_slayer', 'Math Slayer', 'Calculator', '#FF5E3A', 'Solved 30+ Algebra and Geometry papers'),
    ('streak_5', '5-Day Streak', 'Flame', '#FFB800', 'Practiced five days in a row'),
    ('speed_tester', 'Speed Demon', 'Zap', '#7C5CFC', 'Finished a speed mock in under 8 minutes'),
    ('board_topper', 'Board Contender', 'Trophy', '#00C49F', 'Reached the top 20 on the board leaderboard'),
    ('ai_pioneer', 'AI Scholar', 'Brain', '#6366F1', 'Worked through 15 doubts with StatXam AI')
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    icon = EXCLUDED.icon,
    color = EXCLUDED.color,
    description = EXCLUDED.description;

INSERT INTO public.store_items (id, name, cost, icon, color, description, badge) VALUES
    ('item-streak-freeze', 'Streak Freeze Shield', 100, 'ShieldAlert', '#38BDF8', 'Protects the practice streak for one missed day.', 'Most Popular'),
    ('item-pro-mock', 'Pro Mock Exam Pass', 200, 'Crown', '#FFB800', 'Unlocks a full-length predicted mock.', 'High Value'),
    ('item-golden-frame', 'Golden Topper Avatar Frame', 500, 'Gem', '#EC4899', 'Shows a gold frame on the leaderboard.', 'Rare')
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doubt_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doubt_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_days ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Students manage their bookmarks" ON public.bookmarks;
DROP POLICY IF EXISTS "Anyone can read badges" ON public.badges;
DROP POLICY IF EXISTS "Students read their badges" ON public.user_badges;
DROP POLICY IF EXISTS "Students earn their badges" ON public.user_badges;
DROP POLICY IF EXISTS "Anyone can read store items" ON public.store_items;
DROP POLICY IF EXISTS "Students read their purchases" ON public.store_purchases;
DROP POLICY IF EXISTS "Students insert their purchases" ON public.store_purchases;
DROP POLICY IF EXISTS "Students manage their doubts" ON public.doubt_threads;
DROP POLICY IF EXISTS "Students manage their doubt messages" ON public.doubt_messages;
DROP POLICY IF EXISTS "Students manage their notes" ON public.saved_notes;
DROP POLICY IF EXISTS "Students manage their practice days" ON public.practice_days;

CREATE POLICY "Students manage their bookmarks" ON public.bookmarks
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Anyone can read badges" ON public.badges
    FOR SELECT USING (true);
CREATE POLICY "Students read their badges" ON public.user_badges
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Students earn their badges" ON public.user_badges
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Anyone can read store items" ON public.store_items
    FOR SELECT USING (true);
CREATE POLICY "Students read their purchases" ON public.store_purchases
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Students insert their purchases" ON public.store_purchases
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Students manage their doubts" ON public.doubt_threads
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Students manage their doubt messages" ON public.doubt_messages
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Students manage their notes" ON public.saved_notes
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Students manage their practice days" ON public.practice_days
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.leaderboard_rows()
RETURNS TABLE (
    id UUID,
    full_name TEXT,
    board TEXT,
    class_level TEXT,
    district TEXT,
    school TEXT,
    coins INT,
    streak INT,
    avatar_url TEXT
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT p.id, p.full_name, p.board, p.class_level, p.district, p.school, p.coins, p.streak, p.avatar_url
    FROM public.profiles AS p
    ORDER BY p.coins DESC, p.streak DESC
    LIMIT 100;
$$;

GRANT EXECUTE ON FUNCTION public.leaderboard_rows() TO authenticated;
