import type { User } from '@/entities/user/model/user.types'
import { DASHBOARD_PAGE_SIZE } from '@/features/users-dashboard/model/dashboard.constants'
import type {
  DashboardPage,
  DashboardQuery,
} from '@/features/users-dashboard/model/dashboard.types'

const FIRST_PAGE = 1

function getTotalPages(totalItems: number, pageSize: number) {
  return Math.max(FIRST_PAGE, Math.ceil(totalItems / pageSize))
}

function clampPage(page: number, totalPages: number) {
  return Math.min(Math.max(page, FIRST_PAGE), totalPages)
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
