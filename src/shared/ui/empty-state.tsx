import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'

interface EmptyStateProps {
  title: string
  description: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <section
      className={cn(
        'rounded-2xl border border-slate-800 bg-slate-900/70 px-6 py-14 text-center shadow-xl shadow-slate-950/30',
        className,
      )}
    >
      {icon && (
        <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 text-slate-300">
          {icon}
        </div>
      )}

      <div className="mx-auto max-w-md space-y-3">
        <h2 className="text-xl font-semibold tracking-[-0.02em] text-slate-50">
          {title}
        </h2>
        <p className="text-sm leading-6 text-slate-400">{description}</p>
      </div>

      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </section>
  )
}
