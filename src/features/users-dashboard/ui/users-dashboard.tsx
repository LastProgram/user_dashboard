'use client'

import type { User } from '@/entities/user/model/user.types'
import { useCallback, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { AlertTriangle, RefreshCcw, SearchX } from 'lucide-react'

import {
  applyDashboardQuery,
  getDashboardDepartmentOptions,
} from '@/features/users-dashboard/lib/apply-dashboard-query'
import { buildDashboardSummary } from '@/features/users-dashboard/lib/build-dashboard-summary'
import {
  buildDashboardQueryUrl,
  mergeDashboardQuery,
  parseDashboardQueryFromUrl,
} from '@/features/users-dashboard/lib/dashboard-query-url'
import { useUsersDashboard } from '@/features/users-dashboard/api/use-users-dashboard'
import type {
  DashboardPage,
  DashboardQuery,
  DashboardRoleFilter,
  UsersSort,
} from '@/features/users-dashboard/model/dashboard.types'
import { DashboardSummary } from '@/features/users-dashboard/ui/dashboard-summary'
import { DashboardPagination } from '@/features/users-dashboard/ui/dashboard-pagination'
import { DashboardToolbar } from '@/features/users-dashboard/ui/dashboard-toolbar'
import { UserCardList } from '@/features/users-dashboard/ui/user-card-list'
import { UserDetailsDrawer } from '@/features/users-dashboard/ui/user-details-drawer'
import { UsersTable } from '@/features/users-dashboard/ui/users-table'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { EmptyState } from '@/shared/ui/empty-state'
import { ErrorState } from '@/shared/ui/error-state'
import { Skeleton } from '@/shared/ui/skeleton'

const SUMMARY_SKELETON_COUNT = 4
const TABLE_SKELETON_ROWS = 6

function DashboardHeader() {
  return (
    <header className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30 sm:p-8">
      <div className="flex max-w-3xl flex-col gap-4">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300">
          User directory
        </p>

        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            Users Dashboard
          </h1>

          <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Browse a clean public user dataset with summary insights and
            responsive views.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <Badge variant="default">Public dataset</Badge>
          <Badge variant="neutral">Clean profiles</Badge>
          <Badge variant="neutral">Responsive views</Badge>
        </div>
      </div>
    </header>
  )
}

function DashboardLoadingState() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading users">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: SUMMARY_SKELETON_COUNT }, (_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="w-full max-w-40 space-y-4">
                <Skeleton variant="text" className="w-24" />
                <Skeleton variant="text" className="h-8 w-16" />
              </div>
              <Skeleton variant="avatar" className="size-12 rounded-2xl" />
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="space-y-3">
            <Skeleton variant="text" className="h-5 w-48" />
            <Skeleton variant="text" className="w-72 max-w-full" />
          </div>
          <Skeleton variant="block" className="hidden h-10 w-32 sm:block" />
        </div>

        <div className="space-y-3">
          {Array.from({ length: TABLE_SKELETON_ROWS }, (_, index) => (
            <Skeleton key={index} variant="block" className="h-14" />
          ))}
        </div>
      </section>
    </div>
  )
}

function DashboardErrorState({
  message,
  onRetry,
}: {
  message: string | null
  onRetry: () => void
}) {
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

function DashboardEmptyState({ onReload }: { onReload: () => void }) {
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

function DashboardQueryEmptyState({ onReset }: { onReset: () => void }) {
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

function DashboardReadyState({
  allUsers,
  dashboardPage,
  dashboardQuery,
  departmentOptions,
  onDepartmentChange,
  onPageChange,
  onReload,
  onResetQuery,
  onRoleChange,
  onSearchChange,
  onSortChange,
  onViewDetails,
}: {
  allUsers: User[]
  dashboardPage: DashboardPage
  dashboardQuery: DashboardQuery
  departmentOptions: string[]
  onDepartmentChange: (value: string) => void
  onPageChange: (page: number) => void
  onReload: () => void
  onResetQuery: () => void
  onRoleChange: (value: DashboardRoleFilter) => void
  onSearchChange: (value: string) => void
  onSortChange: (value: UsersSort) => void
  onViewDetails: (userId: number) => void
}) {
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
          onSearchChange={onSearchChange}
          onRoleChange={onRoleChange}
          onDepartmentChange={onDepartmentChange}
          onSortChange={onSortChange}
          onReset={onResetQuery}
        />
      )}

      {dashboardPage.totalUsers === 0 && (
        <DashboardEmptyState onReload={onReload} />
      )}

      {dashboardPage.totalUsers > 0 && dashboardPage.visibleUsers === 0 && (
        <DashboardQueryEmptyState onReset={onResetQuery} />
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

export function UsersDashboard() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { users, isLoading, isError, error, reload } = useUsersDashboard()
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const dashboardQuery = useMemo(
    () => parseDashboardQueryFromUrl(searchParams),
    [searchParams],
  )

  const dashboardPage = useMemo(
    () => applyDashboardQuery(users, dashboardQuery),
    [users, dashboardQuery],
  )

  const departmentOptions = useMemo(
    () => getDashboardDepartmentOptions(users),
    [users],
  )

  const updateDashboardQuery = useCallback(
    (queryPatch: Partial<DashboardQuery>) => {
      const nextQuery = mergeDashboardQuery(dashboardQuery, queryPatch)
      const nextUrl = buildDashboardQueryUrl(pathname, nextQuery)

      router.replace(nextUrl, { scroll: false })
    },
    [dashboardQuery, pathname, router],
  )

  const resetDashboardQuery = useCallback(() => {
    router.replace(pathname, { scroll: false })
  }, [pathname, router])

  const closeUserDetails = useCallback(() => {
    setSelectedUserId(null)
  }, [])

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-50 sm:px-8 lg:px-10">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <DashboardHeader />

        {isLoading && <DashboardLoadingState />}

        {isError && (
          <DashboardErrorState
            message={error}
            onRetry={reload}
          />
        )}

        {!isLoading && !isError && (
          <DashboardReadyState
            allUsers={users}
            dashboardPage={dashboardPage}
            dashboardQuery={dashboardQuery}
            departmentOptions={departmentOptions}
            onSearchChange={(search) => updateDashboardQuery({ search })}
            onRoleChange={(role) => updateDashboardQuery({ role })}
            onDepartmentChange={(department) =>
              updateDashboardQuery({ department })
            }
            onPageChange={(page) => updateDashboardQuery({ page })}
            onSortChange={(sort) => updateDashboardQuery({ sort })}
            onResetQuery={resetDashboardQuery}
            onReload={reload}
            onViewDetails={setSelectedUserId}
          />
        )}
      </section>

      <UserDetailsDrawer
        userId={selectedUserId}
        isOpen={selectedUserId !== null}
        onClose={closeUserDetails}
      />
    </main>
  )
}
