import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Elimina: import { Database } from '@/types/supabase'
// Y quita <Database>

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { /* ... */ } }
  )
}