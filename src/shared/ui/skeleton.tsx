import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/shared/lib/cn'

type SkeletonVariant = 'block' | 'text' | 'avatar' | 'card'

interface SkeletonProps extends ComponentPropsWithoutRef<'div'> {
  variant?: SkeletonVariant
}

const skeletonVariants: Record<SkeletonVariant, string> = {
  block: 'h-10 w-full rounded-xl',
  text: 'h-4 w-full rounded-md',
  avatar: 'size-10 rounded-full',
  card: 'h-32 w-full rounded-2xl',
}

export function Skeleton({
  variant = 'block',
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-pulse bg-slate-800/80 shadow-inner shadow-white/5',
        skeletonVariants[variant],
        className,
      )}
      {...props}
    />
  )
}
