import { z } from 'zod'

import {
  DASHBOARD_ROLE_FILTER_VALUES,
  DASHBOARD_SORT_VALUES,
  DEFAULT_DASHBOARD_QUERY,
} from '@/features/users-dashboard/model/dashboard.constants'
import type { DashboardQuery } from '@/features/users-dashboard/model/dashboard.types'

function normalizeText(value: string) {
  return value.trim()
}

export const DashboardQuerySchema = z.object({
  search: z
    .string()
    .catch(DEFAULT_DASHBOARD_QUERY.search)
    .transform(normalizeText),
  role: z
    .enum(DASHBOARD_ROLE_FILTER_VALUES)
    .catch(DEFAULT_DASHBOARD_QUERY.role),
  department: z
    .string()
    .catch(DEFAULT_DASHBOARD_QUERY.department)
    .transform(normalizeText),
  sort: z
    .enum(DASHBOARD_SORT_VALUES)
    .catch(DEFAULT_DASHBOARD_QUERY.sort),
  page: z.coerce
    .number()
    .int()
    .positive()
    .catch(DEFAULT_DASHBOARD_QUERY.page),
}) satisfies z.ZodType<DashboardQuery>
