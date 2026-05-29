-- Run this SQL in your Supabase Dashboard SQL Editor
-- https://supabase.com/dashboard/project/grqshtimqjbbarfjpkaz/sql/new

-- ===== Users table =====
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT DEFAULT '',
  course TEXT NOT NULL,
  qualification TEXT NOT NULL,
  gender TEXT NOT NULL,
  package TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  payment_number TEXT NOT NULL,
  transaction_id TEXT NOT NULL,
  referral_code TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  screenshot_url TEXT DEFAULT '',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  premium_unlocked BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== Referrals table =====
CREATE TABLE IF NOT EXISTS referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  referred_by TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== Contacts table =====
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== Indexes =====
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_package ON users(package);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_by ON referrals(referred_by);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- ===== Storage: create payments bucket =====
INSERT INTO storage.buckets (id, name, public) VALUES ('payments', 'payments', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public select on payments bucket
DROP POLICY IF EXISTS "anon_select_payments" ON storage.objects;
CREATE POLICY "anon_select_payments" ON storage.objects FOR SELECT TO anon USING (bucket_id = 'payments');

-- Allow public insert/update on payments bucket
DROP POLICY IF EXISTS "anon_insert_payments" ON storage.objects;
CREATE POLICY "anon_insert_payments" ON storage.objects FOR INSERT TO anon WITH CHECK (bucket_id = 'payments');

DROP POLICY IF EXISTS "anon_update_payments" ON storage.objects;
CREATE POLICY "anon_update_payments" ON storage.objects FOR UPDATE TO anon USING (bucket_id = 'payments') WITH CHECK (bucket_id = 'payments');

-- ===== RLS: allow public insert/select (disable row-level security for anonymous access) =====
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert into users
DROP POLICY IF EXISTS "anon_insert_users" ON users;
CREATE POLICY "anon_insert_users" ON users FOR INSERT TO anon WITH CHECK (true);

-- Allow anyone to select from users (needed for admin panel)
DROP POLICY IF EXISTS "anon_select_users" ON users;
CREATE POLICY "anon_select_users" ON users FOR SELECT TO anon USING (true);

-- Allow anyone to update users (needed for admin approve/reject)
DROP POLICY IF EXISTS "anon_update_users" ON users;
CREATE POLICY "anon_update_users" ON users FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- Allow anyone to delete users (needed for admin)
DROP POLICY IF EXISTS "anon_delete_users" ON users;
CREATE POLICY "anon_delete_users" ON users FOR DELETE TO anon USING (true);

-- Referrals policies
DROP POLICY IF EXISTS "anon_insert_referrals" ON referrals;
CREATE POLICY "anon_insert_referrals" ON referrals FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "anon_select_referrals" ON referrals;
CREATE POLICY "anon_select_referrals" ON referrals FOR SELECT TO anon USING (true);

-- Contacts policies
DROP POLICY IF EXISTS "anon_insert_contacts" ON contacts;
CREATE POLICY "anon_insert_contacts" ON contacts FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "anon_select_contacts" ON contacts;
CREATE POLICY "anon_select_contacts" ON contacts FOR SELECT TO anon USING (true);
