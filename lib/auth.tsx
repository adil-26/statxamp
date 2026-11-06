'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'

export interface StudentProfile {
  id: string
  full_name: string
  email: string | null
  board: string
  class_level: string
  coins: number
  streak: number
}

interface AuthState {
  ready: boolean
  configured: boolean
  session: Session | null
  user: User | null
  profile: StudentProfile | null
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthState>({
  ready: false,
  configured: false,
  session: null,
  user: null,
  profile: null,
  signOut: async () => {},
  refreshProfile: async () => {},
})

async function loadProfile(userId: string): Promise<StudentProfile | null> {
  if (!supabase) return null
  const { data } = await supabase
    .from('profiles')
    .select('id, full_name, email, board, class_level, coins, streak')
    .eq('id', userId)
    .maybeSingle()
  return (data as StudentProfile | null) ?? null
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<StudentProfile | null>(null)
  const configured = isSupabaseConfigured()

  const refreshProfile = async () => {
    if (!session?.user) {
      setProfile(null)
      return
    }
    setProfile(await loadProfile(session.user.id))
  }

  useEffect(() => {
    if (!supabase) {
      setReady(true)
      return
    }

    let active = true
    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return
      setSession(data.session)
      if (data.session?.user) setProfile(await loadProfile(data.session.user.id))
      setReady(true)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession)
      if (nextSession?.user) setProfile(await loadProfile(nextSession.user.id))
      else setProfile(null)
    })

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut()
    setSession(null)
    setProfile(null)
  }

  return (
    <AuthContext.Provider
      value={{
        ready,
        configured,
        session,
        user: session?.user ?? null,
        profile,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
