import React from 'react'

// ─── Badge — Etiqueta de status/categoria ─────────────────────────────────────

export type BadgeVariant = 'accent' | 'success' | 'warning' | 'error' | 'neutral'

export interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const badgeClasses: Record<BadgeVariant, string> = {
  accent:  'bg-accent/20 text-accent border border-accent/30',
  success: 'bg-success/20 text-success border border-success/30',
  warning: 'bg-warning/20 text-warning border border-warning/30',
  error:   'bg-error/20 text-error border border-error/30',
  neutral: 'bg-brand-mid/40 text-brand-light border border-brand-mid/50',
}

export function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center px-2.5 py-0.5 rounded-sm',
        'text-xs font-semibold font-condensed uppercase tracking-wider',
        badgeClasses[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
