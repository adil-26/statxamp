import { NextResponse } from 'next/server'
import { supabaseFromRequest } from '@/lib/supabase-server'

export async function GET(request: Request) {
  const { data, error } = await supabaseFromRequest(request)
  if (error) {
    return NextResponse.json(error.toJSON(), { status: error.status })
  }

  return NextResponse.json({
    id: data.userClaims?.id ?? null,
    email: data.userClaims?.email ?? null,
  })
}
