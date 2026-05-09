import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/shared/lib/cn'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string
  helperText?: string
  error?: string
  wrapperClassName?: string
}

export function Input({
  label,
  helperText,
  error,
  className,
  wrapperClassName,
  ...props
}: InputProps) {
  const input = (
    <input
      className={cn(
        'min-h-11 w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 text-sm text-slate-50',
        'placeholder:text-slate-500',
        'focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30',
        'disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-rose-400 focus:border-rose-300 focus:ring-rose-400/30',
        className,
      )}
      aria-invalid={error ? true : undefined}
      {...props}
    />
  )

  if (!label) {
    return input
  }

  return (
    <label className={cn('block space-y-2', wrapperClassName)}>
      <span className="text-sm font-medium text-slate-200">{label}</span>
      {input}
      {(error || helperText) && (
        <span className={cn('block text-xs', error ? 'text-rose-300' : 'text-slate-400')}>
          {error ?? helperText}
        </span>
      )}
    </label>
  )
}
