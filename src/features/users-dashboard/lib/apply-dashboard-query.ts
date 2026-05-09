import type { User } from '@/entities/user/model/user.types'
import type { DashboardQuery } from '@/features/users-dashboard/model/dashboard.types'

const ALL_FILTER_VALUE = 'all'

function normalizeSearchValue(value: string) {
  return value.trim().toLowerCase()
}

function matchesSearchQuery(user: User, searchQuery: string) {
  if (!searchQuery) {
    return true
  }

  return [
    user.fullName,
    user.email,
    user.companyName,
    user.companyTitle,
  ].some((value) => value.toLowerCase().includes(searchQuery))
}

function matchesRoleFilter(user: User, role: DashboardQuery['role']) {
  return role === ALL_FILTER_VALUE || user.role === role
}

function matchesDepartmentFilter(
  user: User,
  department: DashboardQuery['department'],
) {
  return department === ALL_FILTER_VALUE || user.department === department
}

export function getDashboardDepartmentOptions(users: User[]) {
  return Array.from(new Set(users.map((user) => user.department))).sort((a, b) =>
    a.localeCompare(b),
  )
}

export function applyDashboardSearchAndFilters(
  users: User[],
  query: DashboardQuery,
) {
  const searchQuery = normalizeSearchValue(query.search)

  return users.filter(
    (user) =>
      matchesSearchQuery(user, searchQuery) &&
      matchesRoleFilter(user, query.role) &&
      matchesDepartmentFilter(user, query.department),
  )
}
