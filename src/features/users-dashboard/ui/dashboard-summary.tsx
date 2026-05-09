import type { ReactNode } from 'react'
import { Eye, Gauge, ShieldCheck, Users } from 'lucide-react'

import type { UserRole } from '@/entities/user/model/user.types'
import { getDashboardSummaryRoleEntries } from '@/features/users-dashboard/lib/build-dashboard-summary'
import type { DashboardSummary as DashboardSummaryModel } from '@/features/users-dashboard/model/dashboard.types'
import { cn } from '@/shared/lib/cn'
import { Badge } from '@/shared/ui/badge'

interface DashboardSummaryProps {
  summary: DashboardSummaryModel
}

interface SummaryMetricCardProps {
  title: string
  value: string | number
  description: string
  icon: ReactNode
  children?: ReactNode
}

const roleLabels: Record<UserRole, string> = {
  admin: 'Admin',
  moderator: 'Moderators',
  user: 'Users',
}

function SummaryMetricCard({
  title,
  value,
  description,
  icon,
  children,
}: SummaryMetricCardProps) {
  return (
    <article
      className={cn(
        'rounded-2xl border bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20 transition-colors',
        'border-slate-800',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-2">
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="text-3xl font-semibold tracking-[-0.04em] text-white">
            {value}
          </p>
          <p className="text-sm leading-6 text-slate-500">{description}</p>
        </div>

        <div
          className={cn(
            'flex size-12 shrink-0 items-center justify-center rounded-2xl border',
            'border-slate-700 bg-slate-800 text-slate-300',
          )}
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>

      {children && <div className="mt-5">{children}</div>}
    </article>
  )
}

export function DashboardSummary({ summary }: DashboardSummaryProps) {
  const roleEntries = getDashboardSummaryRoleEntries(summary)

  return (
    <section aria-labelledby="dashboard-summary-title" className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
            At a glance
          </p>
          <h2
            id="dashboard-summary-title"
            className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white"
          >
            People overview
          </h2>
        </div>

        <p className="max-w-xl text-sm leading-6 text-slate-400">
          At a glance of the currently displayed users.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryMetricCard
          title="Total users"
          value={summary.totalUsers}
          description="All profiles currently available in the dashboard."
          icon={<Users className="size-6" />}
        />

        <SummaryMetricCard
          title="Visible users"
          value={summary.visibleUsers}
          description="Profiles shown in the current view."
          icon={<Eye className="size-6" />}
        />

        <SummaryMetricCard
          title="Average age"
          value={`${summary.averageAge} years`}
          description="Average age across the current profiles."
          icon={<Gauge className="size-6" />}
        />

        <SummaryMetricCard
          title="Role distribution"
          value={summary.totalUsers}
          description="Breakdown by profile role."
          icon={<ShieldCheck className="size-6" />}
        >
          <div className="space-y-2">
            {roleEntries.map(({ role, count }) => (
              <div
                key={role}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <Badge variant={role}>{roleLabels[role]}</Badge>
                <span className="font-medium text-slate-200">{count}</span>
              </div>
            ))}
          </div>
        </SummaryMetricCard>
      </div>
    </section>
  )
}
