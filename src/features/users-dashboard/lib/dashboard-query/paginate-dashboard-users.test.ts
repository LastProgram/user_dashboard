import { describe, expect, it } from 'vitest'

import { paginateDashboardUsers } from '@/features/users-dashboard/lib/dashboard-query/paginate-dashboard-users'
import type { DashboardQuery } from '@/features/users-dashboard/model/dashboard.types'
import { createUserFixture } from '@/test/factories/user.factory'

const defaultQuery: DashboardQuery = {
  search: '',
  role: 'all',
  department: 'all',
  sort: 'name-asc',
  page: 1,
}

const users = [
  createUserFixture({ id: 1 }),
  createUserFixture({ id: 2 }),
  createUserFixture({ id: 3 }),
  createUserFixture({ id: 4 }),
  createUserFixture({ id: 5 }),
]

describe('paginateDashboardUsers', () => {
  it('returns the requested page users and range metadata', () => {
    const dashboardPage = paginateDashboardUsers(
      users,
      users,
      {
        ...defaultQuery,
        page: 2,
      },
      2,
    )

    expect(dashboardPage).toMatchObject({
      users: [users[2], users[3]],
      filteredUsers: users,
      totalUsers: 5,
      visibleUsers: 5,
      page: 2,
      pageSize: 2,
      totalPages: 3,
      startIndex: 2,
      endIndex: 4,
      hasPreviousPage: true,
      hasNextPage: true,
    })
  })

  it('clamps an overlarge page to the last available page', () => {
    const dashboardPage = paginateDashboardUsers(
      users,
      users,
      {
        ...defaultQuery,
        page: 10,
      },
      2,
    )

    expect(dashboardPage).toMatchObject({
      users: [users[4]],
      page: 3,
      totalPages: 3,
      startIndex: 4,
      endIndex: 5,
      hasPreviousPage: true,
      hasNextPage: false,
    })
  })

  it('keeps an empty filtered result safe for rendering', () => {
    const dashboardPage = paginateDashboardUsers(
      users,
      [],
      {
        ...defaultQuery,
        page: 3,
      },
      2,
    )

    expect(dashboardPage).toMatchObject({
      users: [],
      filteredUsers: [],
      totalUsers: 5,
      visibleUsers: 0,
      page: 1,
      pageSize: 2,
      totalPages: 1,
      startIndex: 0,
      endIndex: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    })
  })
})
