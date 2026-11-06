import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Plus_Jakarta_Sans, Poppins } from 'next/font/google';
import './globals.css';
import { NativeApp } from '@/components/NativeApp';
import { AuthProvider } from '@/lib/auth';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const heading = Poppins({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#FBF8F3',
};

export const metadata: Metadata = {
  title: 'StatXam - Smart State Board & Competitive Exam Preparation',
  description: 'AI-Powered PYQ Library, Step-by-Step Solver, 24/7 Voice AI Tutor and Speed Mock Test Engine for State Boards & Competitive Exams.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'StatXam',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" className={`${sans.variable} ${heading.variable} ${mono.variable}`}>
      <body className="antialiased min-h-screen overscroll-none font-sans">
        <AuthProvider>
          <NativeApp />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
