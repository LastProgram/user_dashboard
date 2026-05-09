'use client'

import { Badge } from '@/shared/ui/badge'

import { useUsersDashboard } from '@/features/users-dashboard/api/use-users-dashboard'

export function UsersDashboard() {
  const { users, isLoading, isError } = useUsersDashboard()

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-50 sm:px-8 lg:px-10">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
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
                Public dataset, safe boundary, ready for summary cards and
                filters.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="default">Safe boundary</Badge>
              <Badge variant="neutral">Public data</Badge>
              <Badge variant="neutral">Normalized</Badge>
            </div>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/20">
          <p className="text-sm font-medium text-slate-200">
            {isLoading && 'Loading normalized users...'}
            {isError && 'Unable to load normalized users.'}
            {!isLoading && !isError && `${users.length} normalized users loaded.`}
          </p>
        </section>
      </section>
    </main>
  )
}
