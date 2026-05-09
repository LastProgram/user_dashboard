import type { UserRole } from '@/entities/user/model/user.types'

export interface DashboardSummary {
  totalUsers: number
  visibleUsers: number
  averageAge: number
  roleCounts: Record<UserRole, number>
}
