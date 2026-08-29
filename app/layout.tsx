import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'StatXam - AI-Powered Exam Engineering Portal',
  description: 'AI-driven education platform for Indian State Boards, JEE, NEET, and Competitive Exams',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
