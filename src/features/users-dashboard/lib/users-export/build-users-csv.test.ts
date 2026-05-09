import { describe, expect, it } from 'vitest'

import type { User } from '@/entities/user/model/user.types'
import { buildUsersCsv } from '@/features/users-dashboard/lib/users-export'
import { createUserFixture } from '@/test/factories/user.factory'

describe('buildUsersCsv', () => {
  it('builds a stable header row for safe user fields', () => {
    const csv = buildUsersCsv([])

    expect(csv).toBe(
      'ID,Full name,Email,Age,Gender,Phone,Role,Company,Title,Department,City,Country,University',
    )
  })

  it('builds a full user row in the exported column order', () => {
    const user = {
      id: 7,
      fullName: 'Alice Morgan',
      email: 'alice.morgan@example.com',
      age: 34,
      gender: 'female',
      phone: null,
      image: 'https://example.com/alice.png',
      role: 'moderator',
      companyName: 'Northwind',
      companyTitle: 'Operations Lead',
      department: 'Operations',
      city: null,
      country: 'United States',
      university: null,
    } satisfies User

    const csv = buildUsersCsv([user])

    expect(csv).toBe(
      [
        'ID,Full name,Email,Age,Gender,Phone,Role,Company,Title,Department,City,Country,University',
        '7,Alice Morgan,alice.morgan@example.com,34,female,Not provided,moderator,Northwind,Operations Lead,Operations,Not provided,United States,Not provided',
      ].join('\n'),
    )
  })

  it('escapes comma, quote, and newline characters in CSV values', () => {
    const csv = buildUsersCsv([
      createUserFixture({
        fullName: 'Jane, "JJ"\nCooper',
      }),
    ])

    expect(csv).toContain('"Jane, ""JJ""\nCooper"')
  })

  it('neutralizes values that spreadsheet apps may interpret as formulas', () => {
    const csv = buildUsersCsv([
      createUserFixture({
        fullName: '=IMPORTXML("https://example.com")',
        phone: '+1 555 0100',
        companyName: '-Example Company',
        companyTitle: '@Example Title',
      }),
    ])

    expect(csv).toContain(
      '"\'=IMPORTXML(""https://example.com"")",jane.cooper@example.com,29,female,\'+1 555 0100,admin,\'-Example Company,\'@Example Title',
    )
  })

  it('neutralizes formula-leading values after leading spaces', () => {
    const csv = buildUsersCsv([
      createUserFixture({
        fullName: '   =SUM(A1:A2)',
      }),
    ])

    expect(csv).toContain("'   =SUM(A1:A2)")
  })
})
