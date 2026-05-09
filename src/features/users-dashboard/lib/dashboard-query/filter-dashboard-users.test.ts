import { describe, expect, it } from 'vitest'

import {
  filterDashboardUsers,
  getDashboardDepartmentOptions,
} from '@/features/users-dashboard/lib/dashboard-query/filter-dashboard-users'
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
  createUserFixture({
    id: 1,
    fullName: 'Jane Cooper',
    email: 'jane.cooper@example.com',
    role: 'admin',
    companyName: 'Acme Corp',
    companyTitle: 'Product Manager',
    department: 'Product',
  }),
  createUserFixture({
    id: 2,
    fullName: 'Alice Morgan',
    email: 'alice.morgan@example.com',
    role: 'moderator',
    companyName: 'Northwind',
    companyTitle: 'Operations Lead',
    department: 'Operations',
  }),
  createUserFixture({
    id: 3,
    fullName: 'Bob Stone',
    email: 'bob.stone@example.com',
    role: 'user',
    companyName: 'Contoso',
    companyTitle: 'Support Specialist',
    department: 'Support',
  }),
]

describe('filterDashboardUsers', () => {
  it('matches users by search text across profile and company fields', () => {
    const filteredUsers = filterDashboardUsers(users, {
      ...defaultQuery,
      search: 'operations',
    })

    expect(filteredUsers.map((user) => user.id)).toEqual([2])
  })

  it('filters users by role', () => {
    const filteredUsers = filterDashboardUsers(users, {
      ...defaultQuery,
      role: 'moderator',
    })

    expect(filteredUsers.map((user) => user.id)).toEqual([2])
  })

  it('filters users by department', () => {
    const filteredUsers = filterDashboardUsers(users, {
      ...defaultQuery,
      department: 'Support',
    })

    expect(filteredUsers.map((user) => user.id)).toEqual([3])
  })

  it('combines search, role, and department filters', () => {
    const filteredUsers = filterDashboardUsers(users, {
      ...defaultQuery,
      search: 'contoso',
      role: 'user',
      department: 'Support',
    })

    expect(filteredUsers.map((user) => user.id)).toEqual([3])
  })
})

describe('getDashboardDepartmentOptions', () => {
  it('returns sorted unique departments', () => {
    const departmentOptions = getDashboardDepartmentOptions([
      users[0],
      users[1],
      users[2],
      createUserFixture({
        id: 4,
        department: 'Product',
      }),
    ])

    expect(departmentOptions).toEqual(['Operations', 'Product', 'Support'])
  })
})
