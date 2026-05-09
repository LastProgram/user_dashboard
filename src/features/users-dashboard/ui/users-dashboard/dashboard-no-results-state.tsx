import { RefreshCcw, SearchX } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import { EmptyState } from '@/shared/ui/empty-state'

interface DashboardNoResultsStateProps {
  onReset: () => void
}

export function DashboardNoResultsState({
  onReset,
}: DashboardNoResultsStateProps) {
  return (
    <EmptyState
      title="No matching profiles"
      description="No profiles match the current search or filters. Clear the filters to return to the full directory."
      icon={<SearchX className="size-7" aria-hidden="true" />}
      action={
        <Button variant="secondary" onClick={onReset}>
          <RefreshCcw className="size-4" aria-hidden="true" />
          Reset filters
        </Button>
      }
    />
  )
}
