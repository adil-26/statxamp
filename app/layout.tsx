import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#080C14',
}

export const metadata: Metadata = {
  title: 'StatXam - AI-Powered Exam Engineering Portal',
  description: 'AI-driven education app for Indian State Boards, JEE, NEET, and Competitive Exams',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'StatXam',
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark bg-[#080C14]">
      <body className="antialiased bg-[#080C14] text-white min-h-screen overscroll-none select-none-touch">
        {children}
      </body>
    </html>
  )
}
