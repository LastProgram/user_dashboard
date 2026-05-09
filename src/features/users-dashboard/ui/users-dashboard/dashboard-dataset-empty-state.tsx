import { RefreshCcw, SearchX } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import { EmptyState } from '@/shared/ui/empty-state'

interface DashboardDatasetEmptyStateProps {
  onReload: () => void
}

export function DashboardDatasetEmptyState({ onReload }: DashboardDatasetEmptyStateProps) {
  return (
    <EmptyState
      title="No users available"
      description="No user profiles are available right now. Try reloading the data."
      icon={<SearchX className="size-7" aria-hidden="true" />}
      action={
        <Button variant="secondary" onClick={onReload}>
          <RefreshCcw className="size-4" aria-hidden="true" />
          Reload profiles
        </Button>
      }
    />
  )
}
