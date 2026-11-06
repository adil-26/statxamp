'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { isInstalledApp } from '@/lib/shell'
import { AuthScreen } from '@/components/AuthScreen'
import { StatXamApp } from '@/components/StatXamApp'
import { WebsiteHome } from '@/components/WebsiteHome'

export default function HomePage() {
  const router = useRouter()
  const { user, ready } = useAuth()
  const [installed, setInstalled] = useState<boolean | null>(null)
  const [sendingToApp, setSendingToApp] = useState(false)

  useEffect(() => {
    const native = isInstalledApp()
    const screen = new URLSearchParams(window.location.search).get('screen')
    if (!native && screen) {
      setSendingToApp(true)
      router.replace(`/app?screen=${encodeURIComponent(screen)}`)
      return
    }
    setInstalled(native)
  }, [router])

  if (sendingToApp || installed === null || (installed && !ready)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream-50">
        <p className="font-heading text-2xl font-black text-neutral-900">
          Stat<span className="text-coral-500">Xam</span>
        </p>
      </main>
    )
  }

  if (!installed) return <WebsiteHome />
  if (!user) return <AuthScreen mode="sign-up" />
  return (
    <Suspense fallback={null}>
      <StatXamApp />
    </Suspense>
  )
}
