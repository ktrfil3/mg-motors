import React from 'react'

// ─── Button — Componente base Troller ─────────────────────────────────────────
// Variantes: primary (acento laranja), secondary (outline), ghost

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-accent text-white border border-accent',
    'hover:bg-accent-dark hover:border-accent-dark',
    'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black',
    'active:scale-[0.98]',
  ].join(' '),
  secondary: [
    'bg-transparent text-white border border-brand-mid',
    'hover:border-accent hover:text-accent',
    'focus-visible:ring-2 focus-visible:ring-brand-mid focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black',
    'active:scale-[0.98]',
  ].join(' '),
  ghost: [
    'bg-transparent text-brand-light border border-transparent',
    'hover:text-white hover:bg-brand-dark',
    'focus-visible:ring-2 focus-visible:ring-brand-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black',
    'active:scale-[0.98]',
  ].join(' '),
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm font-medium tracking-wide',
  md: 'px-6 py-3 text-base font-semibold tracking-wide',
  lg: 'px-8 py-4 text-lg font-bold tracking-wider uppercase',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center gap-2',
        'font-condensed transition-all duration-300 ease-out-expo',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  )
}
