'use client'

import { useCallback, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
  applyDashboardQuery,
  buildDashboardQueryUrl,
  getDashboardDepartmentOptions,
  mergeDashboardQuery,
  parseDashboardQueryFromUrl,
} from '@/features/users-dashboard/lib/dashboard-query'
import {
  buildUsersCsv,
  downloadUsersCsv,
} from '@/features/users-dashboard/lib/users-export'
import { useUsersDashboard } from '@/features/users-dashboard/api/use-users-dashboard'
import type { DashboardQuery } from '@/features/users-dashboard/model/dashboard.types'
import { UserDetailsDrawer } from '@/features/users-dashboard/ui/user-details-drawer'

import { DashboardLoadErrorState } from './dashboard-load-error-state'
import { DashboardHero } from './dashboard-hero'
import { DashboardLoadingSurface } from './dashboard-loading-surface'
import { DashboardResultsSurface } from './dashboard-results-surface'

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

  const exportVisibleUsers = useCallback(() => {
    if (dashboardPage.filteredUsers.length === 0) {
      return
    }

    const csv = buildUsersCsv(dashboardPage.filteredUsers)

    downloadUsersCsv(csv, 'users-dashboard-profiles.csv')
  }, [dashboardPage.filteredUsers])

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-50 sm:px-8 lg:px-10">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <DashboardHero />

        {isLoading && <DashboardLoadingSurface />}

        {isError && (
          <DashboardLoadErrorState
            message={error}
            onRetry={reload}
          />
        )}

        {!isLoading && !isError && (
          <DashboardResultsSurface
            allUsers={users}
            dashboardPage={dashboardPage}
            dashboardQuery={dashboardQuery}
            departmentOptions={departmentOptions}
            onSearchChange={(search) => updateDashboardQuery({ search })}
            onRoleChange={(role) => updateDashboardQuery({ role })}
            onDepartmentChange={(department) =>
              updateDashboardQuery({ department })
            }
            onExportUsers={exportVisibleUsers}
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
