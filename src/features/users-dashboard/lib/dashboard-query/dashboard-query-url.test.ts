import { describe, expect, it } from 'vitest'

import {
  buildDashboardQueryUrl,
  mergeDashboardQuery,
  parseDashboardQueryFromUrl,
} from '@/features/users-dashboard/lib/dashboard-query'
import { DEFAULT_DASHBOARD_QUERY } from '@/features/users-dashboard/model/dashboard.constants'
import type { DashboardQuery } from '@/features/users-dashboard/model/dashboard.types'

function createSearchParams(queryString: string) {
  return new URLSearchParams(queryString)
}

const activeDashboardQuery: DashboardQuery = {
  search: 'Jane',
  role: 'admin',
  department: 'Product',
  sort: 'age-desc',
  page: 3,
}

describe('dashboard query URL helpers', () => {
  it('parses valid URL params into a dashboard query', () => {
    const searchParams = createSearchParams(
      'search=Jane&role=admin&department=Product&sort=age-desc&page=3',
    )

    const query = parseDashboardQueryFromUrl(searchParams)

    expect(query).toEqual(activeDashboardQuery)
  })

  it('falls back to the default query for invalid URL params', () => {
    const searchParams = createSearchParams(
      'role=owner&sort=unknown&page=-10',
    )

    const query = parseDashboardQueryFromUrl(searchParams)

    expect(query).toEqual(DEFAULT_DASHBOARD_QUERY)
  })

  it('omits default query values from the URL', () => {
    const url = buildDashboardQueryUrl('/dashboard', DEFAULT_DASHBOARD_QUERY)

    expect(url).toBe('/dashboard')
  })

  it('builds a URL with non-default query values', () => {
    const url = buildDashboardQueryUrl('/dashboard', activeDashboardQuery)

    expect(url).toBe(
      '/dashboard?search=Jane&role=admin&department=Product&sort=age-desc&page=3',
    )
  })

  it('resets page when a search value changes', () => {
    const query = mergeDashboardQuery(activeDashboardQuery, {
      search: 'Alice',
    })

    expect(query).toMatchObject({
      search: 'Alice',
      page: 1,
    })
  })

  it('resets page when a filter value changes', () => {
    const query = mergeDashboardQuery(activeDashboardQuery, {
      department: 'Engineering',
    })

    expect(query).toMatchObject({
      department: 'Engineering',
      page: 1,
    })
  })

  it('preserves direct page changes', () => {
    const query = mergeDashboardQuery(activeDashboardQuery, {
      page: 2,
    })

    expect(query).toMatchObject({
      search: 'Jane',
      page: 2,
    })
  })
})
