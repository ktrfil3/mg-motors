import React from 'react'

// ─── Spinner — Loading indicator ──────────────────────────────────────────────

export type SpinnerSize = 'sm' | 'md' | 'lg'

const sizeMap: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-10 h-10 border-4',
}

export function Spinner({
  size = 'md',
  className = '',
}: {
  size?: SpinnerSize
  className?: string
}) {
  return (
    <span
      role="status"
      aria-label="Carregando..."
      className={[
        'inline-block rounded-full border-brand-mid border-t-accent animate-spin',
        sizeMap[size],
        className,
      ].join(' ')}
    />
  )
}
