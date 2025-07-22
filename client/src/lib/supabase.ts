import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface ContactMessage {
  id?: string
  first_name: string
  last_name: string
  email: string
  phone: string
  course_interest?: string
  message: string
  user_id?: string
  created_at?: string
}

export interface CourseApplication {
  id?: string
  full_name: string
  email: string
  phone: string
  course_name: string
  experience_level: string
  interest_message: string
  user_id?: string
  created_at?: string
}

export interface User {
  id: string
  email: string
  created_at: string
}