export function isInstalledApp() {
  if (typeof window === 'undefined') return false
  const ua = window.navigator.userAgent || ''
  const nav = window.navigator as Navigator & { standalone?: boolean }
  const capacitor = (window as Window & { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor
  return (
    /StatXamApp/i.test(ua) ||
    Boolean(capacitor?.isNativePlatform?.()) ||
    window.matchMedia('(display-mode: standalone)').matches ||
    nav.standalone === true
  )
}
