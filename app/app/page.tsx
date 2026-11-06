'use client'

import { Suspense } from 'react'
import { StatXamApp } from '@/components/StatXamApp'

export default function BrowserAppPage() {
  return (
    <Suspense fallback={null}>
      <StatXamApp />
    </Suspense>
  )
}
