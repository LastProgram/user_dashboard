import type { User } from '@/entities/user/model/user.types'
import { buildDashboardSummary } from '@/features/users-dashboard/lib/build-dashboard-summary'
import type {
  DashboardPage,
  DashboardQuery,
  DashboardRoleFilter,
  UsersSort,
} from '@/features/users-dashboard/model/dashboard.types'
import { DashboardPagination } from '@/features/users-dashboard/ui/dashboard-pagination'
import { DashboardSummary } from '@/features/users-dashboard/ui/dashboard-summary'
import { DashboardToolbar } from '@/features/users-dashboard/ui/dashboard-toolbar'
import { UserCardList } from '@/features/users-dashboard/ui/user-card-list'
import { UsersTable } from '@/features/users-dashboard/ui/users-table'

import { DashboardDatasetEmptyState } from './dashboard-dataset-empty-state'
import { DashboardNoResultsState } from './dashboard-no-results-state'

interface DashboardResultsSurfaceProps {
  allUsers: User[]
  dashboardPage: DashboardPage
  dashboardQuery: DashboardQuery
  departmentOptions: string[]
  onDepartmentChange: (value: string) => void
  onExportUsers: () => void
  onPageChange: (page: number) => void
  onReload: () => void
  onResetQuery: () => void
  onRoleChange: (value: DashboardRoleFilter) => void
  onSearchChange: (value: string) => void
  onSortChange: (value: UsersSort) => void
  onViewDetails: (userId: number) => void
}

export function DashboardResultsSurface({
  allUsers,
  dashboardPage,
  dashboardQuery,
  departmentOptions,
  onDepartmentChange,
  onExportUsers,
  onPageChange,
  onReload,
  onResetQuery,
  onRoleChange,
  onSearchChange,
  onSortChange,
  onViewDetails,
}: DashboardResultsSurfaceProps) {
  const summary = buildDashboardSummary(allUsers, dashboardPage.filteredUsers)

  return (
    <div className="space-y-6">
      <DashboardSummary summary={summary} />

      {dashboardPage.totalUsers > 0 && (
        <DashboardToolbar
          query={dashboardQuery}
          departmentOptions={departmentOptions}
          totalUsers={dashboardPage.totalUsers}
          visibleUsers={dashboardPage.visibleUsers}
          canExport={dashboardPage.visibleUsers > 0}
          onExport={onExportUsers}
          onSearchChange={onSearchChange}
          onRoleChange={onRoleChange}
          onDepartmentChange={onDepartmentChange}
          onSortChange={onSortChange}
          onReset={onResetQuery}
        />
      )}

      {dashboardPage.totalUsers === 0 && (
        <DashboardDatasetEmptyState onReload={onReload} />
      )}

      {dashboardPage.totalUsers > 0 && dashboardPage.visibleUsers === 0 && (
        <DashboardNoResultsState onReset={onResetQuery} />
      )}

      {dashboardPage.visibleUsers > 0 && (
        <>
          <UsersTable
            users={dashboardPage.users}
            onViewDetails={onViewDetails}
          />
          <UserCardList
            users={dashboardPage.users}
            onViewDetails={onViewDetails}
          />
          <DashboardPagination
            dashboardPage={dashboardPage}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  )
}
