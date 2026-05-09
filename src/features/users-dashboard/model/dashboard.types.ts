import type { User, UserRole } from '@/entities/user/model/user.types'
import type {
  DASHBOARD_ROLE_FILTER_VALUES,
  DASHBOARD_SORT_VALUES,
} from '@/features/users-dashboard/model/dashboard.constants'

export type DashboardRoleFilter =
  (typeof DASHBOARD_ROLE_FILTER_VALUES)[number]

export type UsersSort = (typeof DASHBOARD_SORT_VALUES)[number]

export interface DashboardQuery {
  search: string
  role: DashboardRoleFilter
  department: string
  sort: UsersSort
  page: number
}

export interface DashboardPage {
  users: User[]
  filteredUsers: User[]
  totalUsers: number
  visibleUsers: number
  page: number
  pageSize: number
  totalPages: number
  startIndex: number
  endIndex: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export interface DashboardSummary {
  totalUsers: number
  visibleUsers: number
  averageAge: number
  roleCounts: Record<UserRole, number>
}
