import {
  DASHBOARD_QUERY_PARAM_NAMES,
  DEFAULT_DASHBOARD_QUERY,
} from '@/features/users-dashboard/model/dashboard.constants'
import { DashboardQuerySchema } from '@/features/users-dashboard/model/dashboard-query.schema'
import type { DashboardQuery } from '@/features/users-dashboard/model/dashboard.types'

type DashboardSearchParams = Pick<URLSearchParams, 'get'>

export type DashboardQueryPatch = Partial<DashboardQuery>

const pageResetQueryKeys: Array<keyof DashboardQuery> = [
  'search',
  'role',
  'department',
  'sort',
]

function hasPatchValue(queryPatch: DashboardQueryPatch, key: keyof DashboardQuery) {
  return Object.prototype.hasOwnProperty.call(queryPatch, key)
}

function shouldResetPage(queryPatch: DashboardQueryPatch) {
  return pageResetQueryKeys.some((key) => hasPatchValue(queryPatch, key))
}

function setSearchParam(
  searchParams: URLSearchParams,
  key: string,
  value: string | number,
  defaultValue: string | number,
) {
  if (value === defaultValue) {
    return
  }

  searchParams.set(key, String(value))
}

export function parseDashboardQueryFromUrl(
  searchParams: DashboardSearchParams,
): DashboardQuery {
  return DashboardQuerySchema.parse({
    search: searchParams.get(DASHBOARD_QUERY_PARAM_NAMES.search),
    role: searchParams.get(DASHBOARD_QUERY_PARAM_NAMES.role),
    department: searchParams.get(DASHBOARD_QUERY_PARAM_NAMES.department),
    sort: searchParams.get(DASHBOARD_QUERY_PARAM_NAMES.sort),
    page: searchParams.get(DASHBOARD_QUERY_PARAM_NAMES.page),
  })
}

export function buildDashboardQuerySearchParams(query: DashboardQuery) {
  const parsedQuery = DashboardQuerySchema.parse(query)
  const searchParams = new URLSearchParams()

  setSearchParam(
    searchParams,
    DASHBOARD_QUERY_PARAM_NAMES.search,
    parsedQuery.search,
    DEFAULT_DASHBOARD_QUERY.search,
  )

  setSearchParam(
    searchParams,
    DASHBOARD_QUERY_PARAM_NAMES.role,
    parsedQuery.role,
    DEFAULT_DASHBOARD_QUERY.role,
  )

  setSearchParam(
    searchParams,
    DASHBOARD_QUERY_PARAM_NAMES.department,
    parsedQuery.department,
    DEFAULT_DASHBOARD_QUERY.department,
  )

  setSearchParam(
    searchParams,
    DASHBOARD_QUERY_PARAM_NAMES.sort,
    parsedQuery.sort,
    DEFAULT_DASHBOARD_QUERY.sort,
  )

  setSearchParam(
    searchParams,
    DASHBOARD_QUERY_PARAM_NAMES.page,
    parsedQuery.page,
    DEFAULT_DASHBOARD_QUERY.page,
  )

  return searchParams
}

export function buildDashboardQueryUrl(
  pathname: string,
  query: DashboardQuery,
) {
  const searchParams = buildDashboardQuerySearchParams(query)
  const queryString = searchParams.toString()

  return queryString ? `${pathname}?${queryString}` : pathname
}

export function mergeDashboardQuery(
  currentQuery: DashboardQuery,
  queryPatch: DashboardQueryPatch,
): DashboardQuery {
  const nextQuery = {
    ...currentQuery,
    ...queryPatch,
    page: shouldResetPage(queryPatch)
      ? DEFAULT_DASHBOARD_QUERY.page
      : queryPatch.page ?? currentQuery.page,
  }

  return DashboardQuerySchema.parse(nextQuery)
}
