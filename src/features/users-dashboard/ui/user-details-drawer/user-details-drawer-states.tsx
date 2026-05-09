import { AlertTriangle } from 'lucide-react'

import { ErrorState } from '@/shared/ui/error-state'
import { Skeleton } from '@/shared/ui/skeleton'

interface UserDetailsErrorStateProps {
  message: string | null
  onRetry: () => void
}

export function UserDetailsLoadingState() {
  return (
    <div className="space-y-5" aria-busy="true" aria-label="Loading details">
      <div className="flex items-center gap-4">
        <Skeleton variant="avatar" className="size-16 rounded-3xl" />
        <div className="w-full max-w-60 space-y-3">
          <Skeleton variant="text" className="h-6 w-48" />
          <Skeleton variant="text" className="w-60" />
        </div>
      </div>

      <div className="grid gap-4">
        <Skeleton variant="card" />
        <Skeleton variant="card" />
        <Skeleton variant="card" />
      </div>
    </div>
  )
}

export function UserDetailsErrorState({
  message,
  onRetry,
}: UserDetailsErrorStateProps) {
  return (
    <ErrorState
      title="Unable to load profile"
      description={
        message ??
        'The selected profile could not be loaded. Try again to refresh the details.'
      }
      icon={<AlertTriangle className="size-7" aria-hidden="true" />}
      retryLabel="Try again"
      onRetry={onRetry}
      className="border-slate-800 bg-slate-900/70"
    />
  )
}
