import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'
import { Button } from '@/shared/ui/button'

interface ErrorStateProps {
  title: string
  description: string
  icon?: ReactNode
  retryLabel?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title,
  description,
  icon,
  retryLabel = 'Try again',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <section
      className={cn(
        'rounded-2xl border border-rose-400/20 bg-rose-950/20 px-6 py-14 text-center shadow-xl shadow-slate-950/30',
        className,
      )}
      role="alert"
    >
      {icon && (
        <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl border border-rose-300/20 bg-rose-400/10 text-rose-200">
          {icon}
        </div>
      )}

      <div className="mx-auto max-w-md space-y-3">
        <h2 className="text-xl font-semibold tracking-[-0.02em] text-slate-50">
          {title}
        </h2>
        <p className="text-sm leading-6 text-slate-300">{description}</p>
      </div>

      {onRetry && (
        <div className="mt-6 flex justify-center">
          <Button variant="secondary" onClick={onRetry}>
            {retryLabel}
          </Button>
        </div>
      )}
    </section>
  )
}
