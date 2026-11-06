'use client'

import Link from 'next/link'
import { Mail } from 'lucide-react'
import { useAuth } from '@/lib/auth'

export default function ProfilePage() {
  const { ready, user, profile, signOut } = useAuth()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          User <span className="text-blue-600">Profile</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500">This account is stored in Supabase.</p>
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white p-8 shadow-card">
        {!ready ? (
          <p className="text-sm text-slate-500">Loading account…</p>
        ) : user ? (
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{profile?.full_name || 'Student'}</h2>
              <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Mail className="h-4 w-4 text-blue-600" />
                {user.email}
              </p>
              <p className="mt-2 text-xs font-bold text-slate-600">{profile?.board || 'Board not set'} · {profile?.class_level || 'Class not set'}</p>
            </div>
            <button
              type="button"
              onClick={() => signOut()}
              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">Sign in to see the student saved in Supabase.</p>
            <div className="flex gap-2">
              <Link href="/sign-in" className="rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white">Sign in</Link>
              <Link href="/sign-up" className="rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700">Sign up</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
