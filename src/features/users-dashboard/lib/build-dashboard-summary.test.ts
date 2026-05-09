import { describe, expect, it } from 'vitest'

import {
  buildDashboardSummary,
  getDashboardSummaryRoleEntries,
} from '@/features/users-dashboard/lib/build-dashboard-summary'
import { createUserFixture } from '@/test/factories/user.factory'

const users = [
  createUserFixture({
    id: 1,
    age: 20,
    role: 'admin',
  }),
  createUserFixture({
    id: 2,
    age: 30,
    role: 'moderator',
  }),
  createUserFixture({
    id: 3,
    age: 40,
    role: 'user',
  }),
  createUserFixture({
    id: 4,
    age: 50,
    role: 'user',
  }),
]

describe('buildDashboardSummary', () => {
  it('builds totals from all users and metrics from visible users', () => {
    const summary = buildDashboardSummary(users, [users[1], users[2]])

    expect(summary).toEqual({
      totalUsers: 4,
      visibleUsers: 2,
      averageAge: 35,
      roleCounts: {
        admin: 0,
        moderator: 1,
        user: 1,
      },
    })
  })

  it('returns zero metrics for an empty visible user set', () => {
    const summary = buildDashboardSummary(users, [])

    expect(summary).toEqual({
      totalUsers: 4,
      visibleUsers: 0,
      averageAge: 0,
      roleCounts: {
        admin: 0,
        moderator: 0,
        user: 0,
      },
    })
  })
})

describe('getDashboardSummaryRoleEntries', () => {
  it('returns role entries in the dashboard display order', () => {
    const summary = buildDashboardSummary(users, users)

    const roleEntries = getDashboardSummaryRoleEntries(summary)

    expect(roleEntries).toEqual([
      {
        role: 'admin',
        count: 1,
      },
      {
        role: 'moderator',
        count: 1,
      },
      {
        role: 'user',
        count: 2,
      },
    ])
  })
})
