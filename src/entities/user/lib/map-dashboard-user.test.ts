import { describe, expect, it } from 'vitest'

import { mapDashboardUser } from '@/entities/user/lib/map-dashboard-user'
import { createRawDummyJsonUserFixture } from '@/test/factories/user.factory'

describe('mapDashboardUser', () => {
  it('maps raw profile, company, and location fields into safe user fields', () => {
    const rawUser = createRawDummyJsonUserFixture({
      firstName: 'Alice',
      lastName: 'Morgan',
      phone: '+1 555 0199',
      image: 'https://example.com/alice.png',
      company: {
        name: 'Northwind',
        title: 'Operations Lead',
        department: 'Operations',
      },
      address: {
        city: 'Boston',
        country: 'United States',
      },
      university: 'Northwind University',
    })

    const user = mapDashboardUser(rawUser)

    expect(user).toMatchObject({
      fullName: 'Alice Morgan',
      phone: '+1 555 0199',
      image: 'https://example.com/alice.png',
      companyName: 'Northwind',
      companyTitle: 'Operations Lead',
      department: 'Operations',
      city: 'Boston',
      country: 'United States',
      university: 'Northwind University',
    })
  })

  it('normalizes empty optional fields and required display fallbacks', () => {
    const rawUser = createRawDummyJsonUserFixture({
      firstName: ' ',
      lastName: ' ',
      gender: ' ',
      phone: ' ',
      image: ' ',
      company: {
        name: ' ',
        title: ' ',
        department: ' ',
      },
      address: {
        city: ' ',
        country: ' ',
      },
      university: ' ',
    })

    const user = mapDashboardUser(rawUser)

    expect(user).toMatchObject({
      fullName: 'Unknown user',
      gender: 'unknown',
      phone: null,
      image: null,
      companyName: 'Unknown company',
      companyTitle: 'Unknown title',
      department: 'Unassigned',
      city: null,
      country: null,
      university: null,
    })
  })
})
