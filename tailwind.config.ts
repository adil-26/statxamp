import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FBF8F3',
          100: '#F5EFE6',
          200: '#ECE4D6',
          300: '#DFCDB4',
          400: '#CDB18B',
          500: '#BC9666',
        },
        coral: {
          400: '#FF7D5F',
          500: '#FF5E3A',
          600: '#E84D29',
        },
        sunset: '#FF9E00',
        mint: {
          400: '#34D399',
          500: '#00C49F',
          600: '#009B7D',
        },
        gold: {
          400: '#FFD166',
          500: '#FFB800',
          600: '#D97706',
        },
        royal: {
          400: '#9F7AEA',
          500: '#7C5CFC',
          600: '#6366F1',
        },
        surface: {
          light: '#FFFFFF',
          card: '#FFFDF9',
          dark: '#1E1A17',
          darkCard: '#26211D',
          darkBg: '#12100E'
        },
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        midnight: {
          950: '#f8fafc',
          900: '#ffffff',
          800: '#f1f5f9',
          700: '#e2e8f0',
        },
        cyan: {
          400: '#2563eb',
          300: '#3b82f6',
          600: '#1d4ed8',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-coral': '0 8px 24px rgba(255, 94, 58, 0.28)',
        'glow-ai': '0 8px 24px rgba(124, 92, 252, 0.28)',
        'glow-gold': '0 8px 24px rgba(255, 184, 0, 0.3)',
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        'card-hover': '0 4px 12px 0 rgb(0 0 0 / 0.08), 0 2px 4px -1px rgb(0 0 0 / 0.04)',
      },
    },
  },
  plugins: [],
}

export default config
