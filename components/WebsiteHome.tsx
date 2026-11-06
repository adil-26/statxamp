'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Download, Smartphone } from 'lucide-react'
import { DRIVE_COLLECTIONS, DRIVE_PAPER_COUNT } from '@/lib/drive-papers'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const APK_URL = 'https://github.com/adil-26/statxamp/releases/latest/download/StatXam-v1.0.0.apk'

export function WebsiteHome() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isIOS, setIsIOS] = useState(false)
  const boards = Array.from(new Set(DRIVE_COLLECTIONS.map((collection) => collection.board)))

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase()
    setIsIOS(/iphone|ipad|ipod/.test(ua))
    const onPrompt = (event: Event) => {
      setDeferredPrompt(event as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    return () => window.removeEventListener('beforeinstallprompt', onPrompt)
  }, [])

  const install = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
  }

  return (
    <div className="min-h-screen bg-cream-50 text-neutral-900">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
        <p className="font-heading text-2xl font-black">
          Stat<span className="text-coral-500">Xam</span>
        </p>
        <div className="flex items-center gap-3">
          <Link href="/sign-in" className="text-sm font-extrabold text-neutral-700">
            Sign in
          </Link>
          <a href="#install" className="rounded-full bg-coral-500 px-4 py-2 text-sm font-extrabold text-white">
            Install app
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 pb-16">
        <section className="grid items-center gap-10 py-8 lg:grid-cols-2 lg:py-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-coral-600">Class 10 and Class 12</p>
            <h1 className="mt-3 font-heading text-4xl font-black leading-tight sm:text-5xl">
              Board papers, mocks, and an AI tutor in one student app.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600">
              StatXam is for board exam prep. Open previous-year papers for your board, run a short mock, and ask StatXam AI when a question does not make sense. The website tells you what the app does. The installed app starts by asking you to sign up.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#install" className="rounded-2xl bg-coral-500 px-5 py-3 text-sm font-extrabold text-white shadow-glow-coral">
                Install the app
              </a>
              <Link href="/sign-up" className="rounded-2xl border border-cream-300 bg-white px-5 py-3 text-sm font-extrabold">
                Create an account
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-cream-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide text-neutral-400">Inside the app</p>
            <ol className="mt-4 space-y-4">
              {[
                ['1', 'Sign up', 'Name, email, class, and board. That account is stored in Supabase.'],
                ['2', 'Pick a paper', 'Board, then year, then subject. The PDF opens in the app.'],
                ['3', 'Practice', 'Ten-minute mocks, weightage trends, and the StatXam AI doubt tutor.'],
              ].map(([step, title, copy]) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coral-500 text-sm font-black text-white">{step}</span>
                  <span>
                    <span className="block font-extrabold">{title}</span>
                    <span className="mt-0.5 block text-sm text-neutral-600">{copy}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            [`${DRIVE_PAPER_COUNT.toLocaleString('en-IN')} papers`, 'Previous-year files from the boards below, grouped in the app by year and subject.'],
            [`${boards.length} boards`, 'State boards plus CBSE and ICSE, for Class 10 and Class 12 where a folder exists.'],
            ['Your account', 'Coins, streak, board, and class follow the student who signed in.'],
          ].map(([title, copy]) => (
            <article key={title} className="rounded-3xl border border-cream-200 bg-white p-5">
              <h2 className="font-heading text-xl font-black">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{copy}</p>
            </article>
          ))}
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-2xl font-black">Boards in the library</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {boards.map((board) => (
              <span key={board} className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-neutral-700 shadow-sm">
                {board}
              </span>
            ))}
          </div>
        </section>

        <section id="install" className="mt-12 rounded-3xl bg-neutral-900 px-6 py-8 text-white sm:px-8">
          <div className="flex items-start gap-3">
            <Smartphone className="mt-1 h-6 w-6 text-coral-400" />
            <div>
              <h2 className="font-heading text-2xl font-black">Install StatXam</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/75">
                After install, the app opens on the sign-up screen. Create the account once, then the home screen is your board, papers, and practice.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {deferredPrompt && (
              <button onClick={install} className="rounded-2xl bg-coral-500 px-5 py-3 text-sm font-extrabold">
                Install on this device
              </button>
            )}
            <a href={APK_URL} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-neutral-900">
              <Download className="h-4 w-4" />
              Download Android APK
            </a>
          </div>
          {isIOS && (
            <p className="mt-4 text-sm text-white/75">
              On iPhone, open this page in Safari, tap Share, then Add to Home Screen.
            </p>
          )}
          {!deferredPrompt && !isIOS && (
            <p className="mt-4 text-sm text-white/75">
              On Android Chrome, use the browser menu and choose Install app, or download the APK.
            </p>
          )}
        </section>
      </main>
    </div>
  )
}
