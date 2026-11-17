-- ==============================================================
-- SUPABASE SCHEMA FOR PERSONAL PORTFOLIO (project: personalPortfolio)
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ovmvzfakvxoshjnwsfcy/sql
-- ==============================================================

-- 1. Create the messages table for Contact Form submissions
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  focus TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- 3. Allow anonymous visitors to insert new contact messages
CREATE POLICY "Allow public anonymous inserts"
  ON public.messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 4. Only authenticated users / service_role can view submitted messages
CREATE POLICY "Allow authenticated read-only access"
  ON public.messages
  FOR SELECT
  TO authenticated
  USING (true);
