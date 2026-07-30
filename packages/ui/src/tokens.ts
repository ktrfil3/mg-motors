// ─── Design Tokens — Troller UI ───────────────────────────────────────────────
// Tokens programáticos espelhando o tailwind.config.base.js

export const colors = {
  accent: {
    DEFAULT: '#E85D04',
    light:   '#F48C06',
    dark:    '#C44D03',
    glow:    'rgba(232, 93, 4, 0.15)',
  },
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
} as const

export const fonts = {
  sans:      'Outfit, sans-serif',
  condensed: 'Barlow Condensed, sans-serif',
  mono:      'JetBrains Mono, monospace',
} as const

export type AccentColor = keyof typeof colors.accent
export type BrandColor = keyof typeof colors.brand
