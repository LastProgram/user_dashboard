import type { User } from '@/entities/user/model/user.types'
import type { DashboardQuery } from '@/features/users-dashboard/model/dashboard.types'

const ALL_FILTER_VALUE = 'all'

function normalizeSearchValue(value: string) {
  return value.trim().toLowerCase()
}

function compareText(leftValue: string, rightValue: string) {
  return leftValue.localeCompare(rightValue)
}

function compareUsersByName(leftUser: User, rightUser: User) {
  return compareText(leftUser.fullName, rightUser.fullName)
}

function compareUsersByAge(leftUser: User, rightUser: User) {
  return leftUser.age - rightUser.age
}

function compareUsersByCompany(leftUser: User, rightUser: User) {
  const companyCompareResult = compareText(
    leftUser.companyName,
    rightUser.companyName,
  )

  if (companyCompareResult !== 0) {
    return companyCompareResult
  }

  return compareUsersByName(leftUser, rightUser)
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

export function sortDashboardUsers(users: User[], sort: DashboardQuery['sort']) {
  const sortedUsers = [...users]

  switch (sort) {
    case 'name-asc':
      return sortedUsers.sort(compareUsersByName)

    case 'name-desc':
      return sortedUsers.sort((leftUser, rightUser) =>
        compareUsersByName(rightUser, leftUser),
      )

    case 'age-asc':
      return sortedUsers.sort(compareUsersByAge)

    case 'age-desc':
      return sortedUsers.sort((leftUser, rightUser) =>
        compareUsersByAge(rightUser, leftUser),
      )

    case 'company-asc':
      return sortedUsers.sort(compareUsersByCompany)

    case 'company-desc':
      return sortedUsers.sort((leftUser, rightUser) =>
        compareUsersByCompany(rightUser, leftUser),
      )
  }
}
