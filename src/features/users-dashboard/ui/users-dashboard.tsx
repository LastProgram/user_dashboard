'use client'

import { AlertTriangle, Database, RefreshCcw } from 'lucide-react'

import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { ErrorState } from '@/shared/ui/error-state'
import { Skeleton } from '@/shared/ui/skeleton'

import { useUsersDashboard } from '@/features/users-dashboard/api/use-users-dashboard'

const SUMMARY_SKELETON_COUNT = 4
const TABLE_SKELETON_ROWS = 6

function DashboardHeader() {
  return (
    <header className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30 sm:p-8">
      <div className="flex max-w-3xl flex-col gap-4">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300">
          Normalized user data
        </p>

        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            Users Dashboard
          </h1>

          <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Public dataset, safe boundary, ready for summary cards and filters.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <Badge variant="default">Safe boundary</Badge>
          <Badge variant="neutral">Public data</Badge>
          <Badge variant="neutral">Normalized</Badge>
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
        'The dashboard could not load the normalized users dataset. Retry the request to fetch fresh data.'
      }
      icon={<AlertTriangle className="size-7" aria-hidden="true" />}
      retryLabel="Retry loading users"
      onRetry={onRetry}
    />
  )
}

function DashboardReadyState({ usersCount }: { usersCount: number }) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
            Dataset ready
          </p>
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">
            {usersCount} normalized users loaded.
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-slate-400">
            Summary cards, desktop table, mobile cards, and empty state will be
            connected in the next dashboard-core commits.
          </p>
        </div>

        <div className="flex size-12 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-200">
          <Database className="size-6" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

export function UsersDashboard() {
  const { users, isLoading, isError, error, reload } = useUsersDashboard()

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
          <DashboardReadyState usersCount={users.length} />
        )}

        {!isLoading && !isError && users.length === 0 && (
          <div className="flex justify-end">
            <Button variant="secondary" onClick={reload}>
              <RefreshCcw className="size-4" aria-hidden="true" />
              Reload users
            </Button>
          </div>
        )}
      </section>
    </main>
  )
}
