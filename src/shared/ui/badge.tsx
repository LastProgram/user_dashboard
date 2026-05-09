import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/shared/lib/cn'

type BadgeVariant = 'default' | 'neutral' | 'admin' | 'moderator' | 'user'

interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
  variant?: BadgeVariant
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200',
  neutral: 'border-slate-700 bg-slate-800 text-slate-300',
  admin: 'border-cyan-400/50 bg-cyan-400/10 text-cyan-200',
  moderator: 'border-amber-300/50 bg-amber-300/10 text-amber-200',
  user: 'border-slate-600 bg-slate-800/80 text-slate-300',
}

export function Badge({
  variant = 'default',
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium capitalize',
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  )
}
