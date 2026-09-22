/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0D0B0E',
          secondary: '#131118',
          tertiary: '#1A1520',
          hover: '#252030',
          elevated: '#1E1825',
          input: '#1A1520',
        },
        brand: {
          pink: '#F531AB',
          'pink-hover': '#E02A9C',
          'pink-glow': 'rgba(245,49,171,0.25)',
          'pink-soft': 'rgba(245,49,171,0.08)',
          'pink-border': 'rgba(245,49,171,0.3)',
        },
        long: {
          green: '#10B981',
          'green-hover': '#0EA472',
          'green-bg': 'rgba(16,185,129,0.10)',
          'green-bg2': 'rgba(16,185,129,0.06)',
        },
        short: {
          red: '#EF4444',
          'red-hover': '#DC2626',
          'red-bg': 'rgba(239,68,68,0.10)',
          'red-bg2': 'rgba(239,68,68,0.06)',
        },
        border: {
          default: '#2B2228',
          hover: '#3D3545',
          active: '#F531AB',
          divider: '#1F1A25',
          subtle: '#1A1520',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'pink-glow': '0 0 20px rgba(245,49,171,0.3)',
        'pink-glow-sm': '0 0 10px rgba(245,49,171,0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
