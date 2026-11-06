'use client'

import { useEffect } from 'react'

function isNativeShell() {
  if (typeof window === 'undefined') return false
  const ua = window.navigator.userAgent || ''
  const capacitor = (window as Window & { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor
  return /StatXamApp/i.test(ua) || Boolean(capacitor?.isNativePlatform?.())
}

export function NativeApp() {
  useEffect(() => {
    if (!isNativeShell()) return
    document.documentElement.classList.add('native-app')
    return () => document.documentElement.classList.remove('native-app')
  }, [])

  return null
}
