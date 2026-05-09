import type { User, UserRole } from '@/entities/user/model/user.types'
import type { DashboardSummary } from '@/features/users-dashboard/model/dashboard.types'

const USER_ROLES: UserRole[] = ['admin', 'moderator', 'user']

function createEmptyRoleCounts(): Record<UserRole, number> {
  return {
    admin: 0,
    moderator: 0,
    user: 0,
  }
}

function calculateAverageAge(users: User[]) {
  if (users.length === 0) {
    return 0
  }

  const totalAge = users.reduce((sum, user) => sum + user.age, 0)

  return Math.round(totalAge / users.length)
}

function countUsersByRole(users: User[]) {
  const roleCounts = createEmptyRoleCounts()

  users.forEach((user) => {
    roleCounts[user.role] += 1
  })

  return roleCounts
}

export function buildDashboardSummary(
  allUsers: User[],
  visibleUsers: User[],
): DashboardSummary {
  return {
    totalUsers: allUsers.length,
    visibleUsers: visibleUsers.length,
    averageAge: calculateAverageAge(visibleUsers),
    roleCounts: countUsersByRole(visibleUsers),
  }
}

export function getDashboardSummaryRoleEntries(summary: DashboardSummary) {
  return USER_ROLES.map((role) => ({
    role,
    count: summary.roleCounts[role],
  }))
}
