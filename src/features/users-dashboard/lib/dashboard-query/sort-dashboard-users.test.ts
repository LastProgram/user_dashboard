import { describe, expect, it } from 'vitest'

import { sortDashboardUsers } from '@/features/users-dashboard/lib/dashboard-query/sort-dashboard-users'
import { createUserFixture } from '@/test/factories/user.factory'

const users = [
  createUserFixture({
    id: 1,
    fullName: 'Charlie Stone',
    age: 41,
    companyName: 'Beta Labs',
  }),
  createUserFixture({
    id: 2,
    fullName: 'Alice Morgan',
    age: 29,
    companyName: 'Acme Corp',
  }),
  createUserFixture({
    id: 3,
    fullName: 'Bob Cooper',
    age: 35,
    companyName: 'Acme Corp',
  }),
]

describe('sortDashboardUsers', () => {
  it('sorts users by name ascending', () => {
    const sortedUsers = sortDashboardUsers(users, 'name-asc')

    expect(sortedUsers.map((user) => user.id)).toEqual([2, 3, 1])
  })

  it('sorts users by name descending', () => {
    const sortedUsers = sortDashboardUsers(users, 'name-desc')

    expect(sortedUsers.map((user) => user.id)).toEqual([1, 3, 2])
  })

  it('sorts users by age ascending', () => {
    const sortedUsers = sortDashboardUsers(users, 'age-asc')

    expect(sortedUsers.map((user) => user.id)).toEqual([2, 3, 1])
  })

  it('sorts users by age descending', () => {
    const sortedUsers = sortDashboardUsers(users, 'age-desc')

    expect(sortedUsers.map((user) => user.id)).toEqual([1, 3, 2])
  })

  it('sorts users by company and falls back to name', () => {
    const sortedUsers = sortDashboardUsers(users, 'company-asc')

    expect(sortedUsers.map((user) => user.id)).toEqual([2, 3, 1])
  })

  it('sorts users by company descending', () => {
    const sortedUsers = sortDashboardUsers(users, 'company-desc')

    expect(sortedUsers.map((user) => user.id)).toEqual([1, 3, 2])
  })

  it('does not mutate the source users array', () => {
    sortDashboardUsers(users, 'name-asc')

    expect(users.map((user) => user.id)).toEqual([1, 2, 3])
  })
})
