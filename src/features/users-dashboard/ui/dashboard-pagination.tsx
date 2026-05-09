import { ChevronLeft, ChevronRight } from 'lucide-react'

import type { DashboardPage } from '@/features/users-dashboard/model/dashboard.types'
import { Button } from '@/shared/ui/button'

interface DashboardPaginationProps {
  dashboardPage: DashboardPage
  onPageChange: (page: number) => void
}

function getVisibleRangeLabel(dashboardPage: DashboardPage) {
  if (dashboardPage.visibleUsers === 0) {
    return 'No profiles to show'
  }

  return `Showing ${dashboardPage.startIndex + 1}–${dashboardPage.endIndex} of ${dashboardPage.visibleUsers} profiles`
}

export function DashboardPagination({
  dashboardPage,
  onPageChange,
}: DashboardPaginationProps) {
  if (dashboardPage.visibleUsers === 0) {
    return null
  }

  return (
    <nav
      aria-label="Users pagination"
      className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl shadow-slate-950/20 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="space-y-1">
        <p className="text-sm font-medium text-slate-200">
          {getVisibleRangeLabel(dashboardPage)}
        </p>
        <p className="text-xs text-slate-500">
          Page {dashboardPage.page} of {dashboardPage.totalPages}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(dashboardPage.page - 1)}
          disabled={!dashboardPage.hasPreviousPage}
          aria-label="Go to previous page"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          Previous
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(dashboardPage.page + 1)}
          disabled={!dashboardPage.hasNextPage}
          aria-label="Go to next page"
        >
          Next
          <ChevronRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </nav>
  )
}
