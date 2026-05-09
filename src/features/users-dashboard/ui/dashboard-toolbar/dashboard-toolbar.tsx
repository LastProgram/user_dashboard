import { Download, RotateCcw, Search } from 'lucide-react'

import type {
  DashboardQuery,
  DashboardRoleFilter,
  UsersSort,
} from '@/features/users-dashboard/model/dashboard.types'
import { cn } from '@/shared/lib/cn'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Select } from '@/shared/ui/select'

interface DashboardToolbarProps {
  query: DashboardQuery
  departmentOptions: string[]
  totalUsers: number
  visibleUsers: number
  canExport?: boolean
  disabled?: boolean
  onExport?: () => void
  onSearchChange?: (value: string) => void
  onRoleChange?: (value: DashboardRoleFilter) => void
  onDepartmentChange?: (value: string) => void
  onSortChange?: (value: UsersSort) => void
  onReset?: () => void
}

const roleFilterOptions: Array<{
  value: DashboardRoleFilter
  label: string
}> = [
  { value: 'all', label: 'All roles' },
  { value: 'admin', label: 'Admins' },
  { value: 'moderator', label: 'Moderators' },
  { value: 'user', label: 'Users' },
]

const sortOptions: Array<{
  value: UsersSort
  label: string
}> = [
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'name-desc', label: 'Name Z–A' },
  { value: 'age-asc', label: 'Age low to high' },
  { value: 'age-desc', label: 'Age high to low' },
  { value: 'company-asc', label: 'Company A–Z' },
  { value: 'company-desc', label: 'Company Z–A' },
]

function hasActiveQuery(query: DashboardQuery) {
  return (
    query.search !== '' ||
    query.role !== 'all' ||
    query.department !== 'all' ||
    query.sort !== 'name-asc' ||
    query.page !== 1
  )
}

export function DashboardToolbar({
  query,
  departmentOptions,
  totalUsers,
  visibleUsers,
  canExport = false,
  disabled = false,
  onExport,
  onSearchChange,
  onRoleChange,
  onDepartmentChange,
  onSortChange,
  onReset,
}: DashboardToolbarProps) {
  const isResetDisabled = disabled || !hasActiveQuery(query)
  const isExportDisabled = disabled || !canExport || !onExport

  return (
    <section
      aria-labelledby="dashboard-toolbar-title"
      className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl shadow-slate-950/20 sm:p-5"
    >
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
            Browse profiles
          </p>
          <h2
            id="dashboard-toolbar-title"
            className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white"
          >
            Find people faster
          </h2>
        </div>

        <p className="text-sm text-slate-400">
          Showing {visibleUsers} of {totalUsers} profiles
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))_auto]">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500"
            aria-hidden="true"
          />
          <Input
            value={query.search}
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder="Search by name, email, or company"
            aria-label="Search users"
            disabled={disabled}
            className="pl-10"
          />
        </div>

        <Select
          value={query.role}
          onChange={(event) =>
            onRoleChange?.(event.target.value as DashboardRoleFilter)
          }
          aria-label="Filter by role"
          disabled={disabled}
        >
          {roleFilterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select
          value={query.department}
          onChange={(event) => onDepartmentChange?.(event.target.value)}
          aria-label="Filter by department"
          disabled={disabled}
        >
          <option value="all">All departments</option>
          {departmentOptions.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </Select>

        <Select
          value={query.sort}
          onChange={(event) => onSortChange?.(event.target.value as UsersSort)}
          aria-label="Sort users"
          disabled={disabled}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <div className="grid grid-cols-2 gap-2 lg:flex">
          <Button
            variant="secondary"
            onClick={onReset}
            disabled={isResetDisabled}
            className={cn('lg:min-w-28', disabled && 'opacity-60')}
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Reset
          </Button>

          <Button
            variant="secondary"
            onClick={onExport}
            disabled={isExportDisabled}
            className="lg:min-w-32"
          >
            <Download className="size-4" aria-hidden="true" />
            Export CSV
          </Button>
        </div>
      </div>
    </section>
  )
}
