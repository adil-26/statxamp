'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/auth'
import { isInstalledApp } from '@/lib/shell'

const BOARDS = [
  'CBSE',
  'ICSE',
  'Andhra Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Gujarat',
  'Haryana',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'UP Board',
  'West Bengal',
]

export function AuthScreen({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const { configured, refreshProfile } = useAuth()
  const [screen, setScreen] = useState<'sign-in' | 'sign-up'>(mode)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [board, setBoard] = useState('CBSE')
  const [classLevel, setClassLevel] = useState('Class 10')
  const [boardOpen, setBoardOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const isSignUp = screen === 'sign-up'

  const finish = async () => {
    await refreshProfile()
    router.push(isInstalledApp() ? '/' : '/app')
    router.refresh()
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setMessage('')
    if (!supabase || !configured) {
      setError('Add the Supabase URL and anon key in .env.local, then restart the app.')
      return
    }
    setBusy(true)
    try {
      if (isSignUp) {
        const { data, error: signError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName, board, class_level: classLevel } },
        })
        if (signError) throw signError
        if (data.user) {
          await supabase.from('profiles').upsert({
            id: data.user.id,
            full_name: fullName,
            email,
            board,
            class_level: classLevel,
          })
        }
        if (data.session) {
          await finish()
          return
        }
        setMessage('Account created. Confirm the email if asked, then sign in.')
        setScreen('sign-in')
      } else {
        const { error: signError } = await supabase.auth.signInWithPassword({ email, password })
        if (signError) throw signError
        await finish()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not continue.')
    } finally {
      setBusy(false)
    }
  }

  const sendReset = async () => {
    setError('')
    setMessage('')
    if (!supabase || !email) {
      setError('Enter the email first.')
      return
    }
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/sign-in`,
    })
    if (resetError) setError(resetError.message)
    else setMessage('Password reset email sent.')
  }

  return (
    <main className="min-h-screen bg-cream-50 text-neutral-900 dark:bg-surface-darkBg dark:text-cream-50">
      <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1.75rem,env(safe-area-inset-top))]">
        <p className="font-heading text-2xl font-black tracking-tight">
          Stat<span className="text-coral-500">Xam</span>
        </p>
        <h1 className="mt-8 font-heading text-3xl font-black leading-tight">
          {isSignUp ? 'Create your student account' : 'Welcome back'}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {isSignUp
            ? 'Tell us your class and board. Papers, mocks, and your progress stay on this account.'
            : 'Sign in with the email and password you used for StatXam.'}
        </p>

        <div className="mt-6 grid grid-cols-2 rounded-full bg-white p-1 shadow-sm dark:bg-surface-dark">
          <button
            type="button"
            onClick={() => { setScreen('sign-up'); setError(''); setMessage('') }}
            className={`rounded-full py-3 text-sm font-extrabold ${isSignUp ? 'bg-coral-500 text-white' : 'text-neutral-500'}`}
          >
            Sign up
          </button>
          <button
            type="button"
            onClick={() => { setScreen('sign-in'); setError(''); setMessage('') }}
            className={`rounded-full py-3 text-sm font-extrabold ${!isSignUp ? 'bg-coral-500 text-white' : 'text-neutral-500'}`}
          >
            Sign in
          </button>
        </div>

        <form onSubmit={submit} className="mt-6 flex flex-1 flex-col gap-4">
          {isSignUp && (
            <Field label="Full name" value={fullName} onChange={setFullName} type="text" autoComplete="name" placeholder="Your name" />
          )}
          <Field label="Email" value={email} onChange={setEmail} type="email" autoComplete="email" placeholder="you@email.com" />
          <Field label="Password" value={password} onChange={setPassword} type="password" autoComplete={isSignUp ? 'new-password' : 'current-password'} placeholder="At least 6 characters" />

          {isSignUp && (
            <>
              <div>
                <p className="text-xs font-bold text-neutral-600 dark:text-neutral-300">Class</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {['Class 10', 'Class 12'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setClassLevel(level)}
                      className={`rounded-2xl border py-4 text-sm font-extrabold ${
                        classLevel === level
                          ? 'border-coral-500 bg-coral-500 text-white'
                          : 'border-cream-200 bg-white text-neutral-800 dark:border-surface-darkCard dark:bg-surface-dark'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-neutral-600 dark:text-neutral-300">Board</p>
                <button
                  type="button"
                  onClick={() => setBoardOpen(true)}
                  className="mt-2 flex w-full items-center justify-between rounded-2xl border border-cream-200 bg-white px-4 py-4 text-left text-base font-bold dark:border-surface-darkCard dark:bg-surface-dark"
                >
                  <span>{board}</span>
                  <span className="text-xs font-extrabold text-coral-600">Change</span>
                </button>
              </div>
            </>
          )}

          {error && <p className="text-sm font-semibold text-coral-600">{error}</p>}
          {message && <p className="text-sm font-semibold text-mint-600">{message}</p>}

          <div className="mt-auto pt-4">
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-2xl bg-coral-500 py-4 text-base font-extrabold text-white shadow-glow-coral disabled:opacity-60"
            >
              {busy ? 'Please wait…' : isSignUp ? 'Create account' : 'Sign in'}
            </button>
            {!isSignUp && (
              <button type="button" onClick={sendReset} className="mt-3 w-full py-2 text-sm font-bold text-neutral-500">
                Forgot password
              </button>
            )}
          </div>
        </form>
      </div>

      {boardOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center">
          <div className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-cream-50 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] dark:bg-surface-dark sm:rounded-3xl">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-heading text-lg font-black">Choose your board</p>
              <button type="button" onClick={() => setBoardOpen(false)} className="text-sm font-extrabold text-coral-600">
                Close
              </button>
            </div>
            <div className="grid gap-2">
              {BOARDS.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => { setBoard(name); setBoardOpen(false) }}
                  className={`rounded-2xl px-4 py-3 text-left text-sm font-bold ${
                    board === name ? 'bg-coral-500 text-white' : 'bg-white dark:bg-surface-darkCard'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

function Field({
  label,
  value,
  onChange,
  type,
  autoComplete,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type: string
  autoComplete: string
  placeholder: string
}) {
  return (
    <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300">
      {label}
      <input
        required
        minLength={type === 'password' ? 6 : undefined}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-cream-200 bg-white px-4 py-4 text-base outline-none focus:border-coral-500 dark:border-surface-darkCard dark:bg-surface-dark"
      />
    </label>
  )
}
