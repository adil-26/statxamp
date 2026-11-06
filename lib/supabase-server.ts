import { createSupabaseContext } from '@supabase/server'

export function supabaseFromRequest(request: Request) {
  return createSupabaseContext(request, { auth: 'user' })
}
