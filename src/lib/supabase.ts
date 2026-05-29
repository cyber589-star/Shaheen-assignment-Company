import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://grqshtimqjbbarfjpkaz.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdycXNodGltcWpiYmFyZmpwa2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMzYwMzMsImV4cCI6MjA5NTYxMjAzM30.7pQupt97876pDIVZrwcAKZjhQbKDRbDp_eX0uHlSWOk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface User {
  id: string
  name: string
  whatsapp: string
  email: string
  course: string
  qualification: string
  gender: string
  package: string
  payment_method: string
  payment_number: string
  transaction_id: string
  referral_code: string
  notes: string
  screenshot_url?: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  premium_unlocked: boolean
}

export interface Referral {
  id: string
  user_id: string
  referred_by: string
  created_at: string
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
}

export function generateReferralCode(name: string): string {
  const clean = name.replace(/\s+/g, '').toUpperCase().slice(0, 4)
  const num = Math.floor(1000 + Math.random() * 9000)
  return `${clean}${num}`
}

// Users
export async function addUser(user: {
  name: string
  whatsapp: string
  email: string
  course: string
  qualification: string
  gender: string
  package: string
  payment_method: string
  payment_number: string
  transaction_id: string
  referral_code: string
  notes: string
}) {
  const { data, error } = await supabase
    .from('users')
    .insert([{ ...user, status: 'pending', premium_unlocked: false }])
    .select()
    .single()
  if (error) throw error
  return data as User
}

export async function getUsers() {
  const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false })
  if (error) {
    console.warn('getUsers error:', error.message)
    return []
  }
  return (data || []) as User[]
}

export async function getUserById(id: string) {
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single()
  if (error) return null
  return data as User
}

export async function getUserByReferralCode(code: string) {
  const { data, error } = await supabase.from('users').select('*').eq('referral_code', code).single()
  if (error) return null
  return data as User
}

export async function updateUser(id: string, updates: Partial<User>) {
  const { data, error } = await supabase.from('users').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as User
}

export async function deleteUser(id: string) {
  const { error } = await supabase.from('users').delete().eq('id', id)
  if (error) throw error
  return true
}

// Referrals
export async function addReferral(referredBy: string, userId: string) {
  const { data, error } = await supabase
    .from('referrals')
    .insert([{ user_id: userId, referred_by: referredBy }])
    .select()
    .single()
  if (error) throw error
  return data as Referral
}

export async function getReferralCount(userId: string) {
  const { count, error } = await supabase
    .from('referrals')
    .select('*', { count: 'exact', head: true })
    .eq('referred_by', userId)
  if (error) throw error
  return count || 0
}

// Analytics
export async function getAnalytics() {
  let us: User[] = []
  let refCount = 0

  const { data: users, error: ue } = await supabase.from('users').select('*')
  if (!ue && users) us = users as User[]
  else console.warn('getAnalytics users error:', ue?.message)

  const { count } = await supabase.from('referrals').select('*', { count: 'exact', head: true })
  if (count !== null) refCount = count

  return {
    totalUsers: us.length,
    pendingUsers: us.filter((u: User) => u.status === 'pending').length,
    approvedUsers: us.filter((u: User) => u.status === 'approved').length,
    premiumUsers: us.filter((u: User) => u.premium_unlocked).length,
    totalReferrals: refCount,
  }
}

// Contacts
export interface Contact {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

export async function addContact(data: { name: string; email: string; message: string }) {
  const { data: result, error } = await supabase
    .from('contacts')
    .insert([{ ...data }])
    .select()
    .single()
  if (error) throw error
  return result as Contact
}

// Screenshot upload
export async function uploadScreenshot(file: File, userId: string): Promise<string> {
  const ext = file.name.split('.').pop() || 'png'
  const path = `screenshots/${userId}.${ext}`
  // Remove old file if exists
  await supabase.storage.from('payments').remove([path]).catch(() => {})
  const { error: uploadError } = await supabase.storage.from('payments').upload(path, file, { upsert: true, contentType: file.type })
  if (uploadError) {
    console.error('Screenshot upload error:', uploadError.message)
    throw uploadError
  }
  const { data: urlData } = supabase.storage.from('payments').getPublicUrl(path)
  return urlData.publicUrl
}

export async function deleteScreenshot(userId: string): Promise<void> {
  // List and delete all screenshots for this user
  const { data: files } = await supabase.storage.from('payments').list('screenshots', { search: userId })
  if (files && files.length > 0) {
    const paths = files.map(f => `screenshots/${f.name}`)
    await supabase.storage.from('payments').remove(paths).catch(() => {})
  }
}

// Connectivity check — call once on app load
export async function checkTables(): Promise<{ ok: boolean; missing: string[] }> {
  const missing: string[] = []
  for (const table of ['users', 'referrals', 'contacts']) {
    const { error } = await supabase.from(table).select('id', { count: 'exact', head: true })
    if (error && error.message?.includes('does not exist')) missing.push(table)
  }
  if (missing.length > 0) {
    console.warn('Supabase tables missing:', missing.join(', '), '— run supabase-setup.sql')
    return { ok: false, missing }
  }
  return { ok: true, missing: [] }
}

export function adminLogin(password: string): boolean {
  return password === 'shaheen2024'
}
