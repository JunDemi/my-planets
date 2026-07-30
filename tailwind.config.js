/** @type {import('tailwindcss').Config} */

import scrollbarhide from 'tailwind-scrollbar-hide';

module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#0f1115',
        foreground: '#f5f7fb',
        muted: '#cbd5e1',
        surface: {
          DEFAULT: '#080c14',
          deep: '#03060c',
          mid: '#07111f',
          bottom: '#04070d',
          scene: '#050816',
        },
        accent: {
          DEFAULT: '#8fd3ff',
          soft: 'rgba(103, 232, 249, 0.8)',
          glow: '#4cc9f0',
          emissive: '#0b3b5c',
          wash: 'rgba(91, 157, 255, 0.28)',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.1)',
        },
        'gray-modern-30': '#FCFCFD',
      },

      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },

      fontSize: {
        '14m': [
          '14px',
          {
            fontWeight: '500',
            lineHeight: '20px',
            letterSpacing: '0.3em',
          },
        ],
        '36m': [
          '36px',
          {
            fontWeight: '600',
            lineHeight: '40px',
            letterSpacing: '-0.04em',
          },
        ],
        '40sb': [
          '40px',
          {
            fontWeight: '600',
            lineHeight: '44px',
            letterSpacing: '-0.04em',
          },
        ],
        '16r': [
          '16px',
          {
            fontWeight: '400',
            lineHeight: '20px',
          },
        ],
        '18r': [
          '18px',
          {
            fontWeight: '400',
            lineHeight: '22px',
          },
        ],
      },

      letterSpacing: {
        '14m': '-0.02em',
        '36m': '-0.02em',
        '40sb': '-0.02em',
        '16r': '-0.02em',
        '18r': '-0.02em',
      },

      backgroundImage: {
        'page-hero': 'linear-gradient(180deg, #0f1115 0%, #07111f 48%, #04070d 100%)',
        'scene-panel':
          'radial-gradient(circle at top, rgba(91, 157, 255, 0.28), transparent 40%), linear-gradient(180deg, rgba(8, 12, 20, 0.98), rgba(3, 6, 12, 0.95))',
      },

      boxShadow: {
        scene: '0 25px 50px -12px rgba(8, 51, 68, 0.3)',
      },

      animation: {},
      keyframes: {},
    },
    screens: {
      md: { max: '1279px' },
      sm: { max: '750px' },
    },
  },
  plugins: [scrollbarhide],
};
