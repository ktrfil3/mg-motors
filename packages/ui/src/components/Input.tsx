import React from 'react'

// ─── Input — Campo de formulário Troller ──────────────────────────────────────

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftAddon, rightAddon, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-brand-light font-sans"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftAddon && (
            <span className="absolute left-3 text-brand-subtle">{leftAddon}</span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={[
              'w-full bg-brand-darker border rounded px-4 py-3',
              'text-base text-white placeholder:text-brand-muted',
              'font-sans transition-all duration-200',
              'focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50',
              error
                ? 'border-error focus:border-error focus:ring-error/50'
                : 'border-brand-mid',
              leftAddon ? 'pl-10' : '',
              rightAddon ? 'pr-10' : '',
              className,
            ].join(' ')}
            {...props}
          />
          {rightAddon && (
            <span className="absolute right-3 text-brand-subtle">{rightAddon}</span>
          )}
        </div>
        {error && (
          <p className="text-xs text-error font-sans" role="alert">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-brand-subtle font-sans">{hint}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
