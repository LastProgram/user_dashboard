import { AlertTriangle } from 'lucide-react'

import { ErrorState } from '@/shared/ui/error-state'

interface DashboardLoadErrorStateProps {
  message: string | null
  onRetry: () => void
}

export function DashboardLoadErrorState({
  message,
  onRetry,
}: DashboardLoadErrorStateProps) {
  return (
    <ErrorState
      title="Unable to load users"
      description={
        message ??
        'The dashboard could not load user profiles. Try again to refresh the data.'
      }
      icon={<AlertTriangle className="size-7" aria-hidden="true" />}
      retryLabel="Try again"
      onRetry={onRetry}
    />
  )
}
