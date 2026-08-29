import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          900: '#0a0a1a',
          800: '#0d0d24',
          700: '#12122e',
        },
        cyan: {
          400: '#00d4ff',
          300: '#33dfff',
          600: '#0094b3',
        },
      },
    },
  },
  plugins: [],
}

export default config
