import type { User } from '@/entities/user/model/user.types'
import { DASHBOARD_PAGE_SIZE } from '@/features/users-dashboard/model/dashboard.constants'
import type {
  DashboardPage,
  DashboardQuery,
} from '@/features/users-dashboard/model/dashboard.types'

const ALL_FILTER_VALUE = 'all'
const FIRST_PAGE = 1

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

function getTotalPages(totalItems: number, pageSize: number) {
  return Math.max(FIRST_PAGE, Math.ceil(totalItems / pageSize))
}

function clampPage(page: number, totalPages: number) {
  return Math.min(Math.max(page, FIRST_PAGE), totalPages)
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

export function paginateDashboardUsers(
  allUsers: User[],
  filteredUsers: User[],
  query: DashboardQuery,
  pageSize = DASHBOARD_PAGE_SIZE,
): DashboardPage {
  const totalPages = getTotalPages(filteredUsers.length, pageSize)
  const currentPage = clampPage(query.page, totalPages)
  const startIndex = (currentPage - FIRST_PAGE) * pageSize
  const endIndex = Math.min(startIndex + pageSize, filteredUsers.length)
  const pageUsers = filteredUsers.slice(startIndex, endIndex)

  return {
    users: pageUsers,
    filteredUsers,
    totalUsers: allUsers.length,
    visibleUsers: filteredUsers.length,
    page: currentPage,
    pageSize,
    totalPages,
    startIndex,
    endIndex,
    hasPreviousPage: currentPage > FIRST_PAGE,
    hasNextPage: currentPage < totalPages,
  }
}

export function applyDashboardQuery(
  users: User[],
  query: DashboardQuery,
): DashboardPage {
  const filteredUsers = applyDashboardSearchAndFilters(users, query)
  const sortedUsers = sortDashboardUsers(filteredUsers, query.sort)

  return paginateDashboardUsers(users, sortedUsers, query)
}
