/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [],
  theme: {
    extend: {
      // ─── Paleta Troller ────────────────────────────────────────────────────
      colors: {
        // Neutros escuros (base da UI)
        brand: {
          black:    '#0A0A0A',
          darkest:  '#111111',
          darker:   '#1A1A1A',
          dark:     '#222222',
          mid:      '#333333',
          muted:    '#555555',
          subtle:   '#888888',
          light:    '#CCCCCC',
          lightest: '#F5F5F5',
          white:    '#FFFFFF',
        },
        // Acento primário — Rojo MG Motors Venezuela (#CD0000)
        accent: {
          DEFAULT:  '#CD0000',
          light:    '#E61919',
          dark:     '#A60000',
          glow:     'rgba(205, 0, 0, 0.25)',
        },
        // Feedback
        success:  '#22C55E',
        warning:  '#F59E0B',
        error:    '#EF4444',
        info:     '#3B82F6',
      },

      // ─── Tipografia ────────────────────────────────────────────────────────
      fontFamily: {
        sans:        ['Outfit', 'sans-serif'],
        condensed:   ['Barlow Condensed', 'sans-serif'],
        mono:        ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['4.5rem',  { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'display-xl':  ['3.75rem', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'display-lg':  ['3rem',    { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'display-md':  ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-sm':  ['1.875rem',{ lineHeight: '1.15' }],
      },

      // ─── Espaciado ─────────────────────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '100': '25rem',
        '120': '30rem',
        '140': '35rem',
        '160': '40rem',
      },

      // ─── Transições ────────────────────────────────────────────────────────
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'ease-in-expo':  'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
      },

      // ─── Animações ─────────────────────────────────────────────────────────
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%':   { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(205, 0, 0, 0.4)' },
          '50%':       { boxShadow: '0 0 0 12px rgba(205, 0, 0, 0)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up':         'fade-up 0.6s cubic-bezier(0.19, 1, 0.22, 1) both',
        'fade-in':         'fade-in 0.4s ease-out both',
        'slide-in-right':  'slide-in-right 0.5s cubic-bezier(0.19, 1, 0.22, 1) both',
        'pulse-glow':      'pulse-glow 2s ease-in-out infinite',
        'shimmer':         'shimmer 2s linear infinite',
      },

      // ─── Sombras ───────────────────────────────────────────────────────────
      boxShadow: {
        'glow-accent': '0 0 20px rgba(205, 0, 0, 0.3)',
        'glow-white':  '0 0 20px rgba(255, 255, 255, 0.1)',
        'card-dark':   '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover':  '0 8px 40px rgba(0, 0, 0, 0.6)',
      },

      // ─── Bordas ────────────────────────────────────────────────────────────
      borderRadius: {
        'none': '0',
        'sm': '2px',
        DEFAULT: '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      },

      // ─── Blur ──────────────────────────────────────────────────────────────
      backdropBlur: {
        xs: '2px',
      },

      // ─── Aspect ratio ──────────────────────────────────────────────────────
      aspectRatio: {
        'vehicle': '16 / 9',
        'vehicle-card': '4 / 3',
        'hero': '21 / 9',
      },
    },
  },
  plugins: [],
}
