import type { User } from '@/entities/user/model/user.types'
import type {
  DashboardPage,
  DashboardQuery,
} from '@/features/users-dashboard/model/dashboard.types'

import { filterDashboardUsers } from './filter-dashboard-users'
import { paginateDashboardUsers } from './paginate-dashboard-users'
import { sortDashboardUsers } from './sort-dashboard-users'

export function applyDashboardQuery(
  users: User[],
  query: DashboardQuery,
): DashboardPage {
  const filteredUsers = filterDashboardUsers(users, query)
  const sortedUsers = sortDashboardUsers(filteredUsers, query.sort)

  return paginateDashboardUsers(users, sortedUsers, query)
}

export { getDashboardDepartmentOptions } from './filter-dashboard-users'
export { paginateDashboardUsers } from './paginate-dashboard-users'
export { sortDashboardUsers } from './sort-dashboard-users'
