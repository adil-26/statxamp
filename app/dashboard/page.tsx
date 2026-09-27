'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-coral-500 to-gold-500 animate-spin" />
        <p className="text-xs font-semibold text-neutral-500">Loading StatXam Student Hub...</p>
      </div>
    </div>
  )
}
