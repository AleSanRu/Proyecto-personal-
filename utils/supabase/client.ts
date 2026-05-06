import { createBrowserClient } from '@supabase/ssr'

// Elimina la línea: import { Database } from '@/types/supabase'
// Y quita <Database> de la línea de abajo

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}