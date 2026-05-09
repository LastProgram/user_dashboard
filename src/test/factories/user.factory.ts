import type { RawDummyJsonUser } from '@/entities/user/model/user.schema'
import type { User } from '@/entities/user/model/user.types'

export function createUserFixture(overrides: Partial<User> = {}): User {
  return {
    id: 1,
    fullName: 'Jane Cooper',
    email: 'jane.cooper@example.com',
    age: 29,
    gender: 'female',
    phone: '+1 555 0100',
    image: 'https://example.com/jane.png',
    role: 'admin',
    companyName: 'Acme Corp',
    companyTitle: 'Product Manager',
    department: 'Product',
    city: 'New York',
    country: 'United States',
    university: 'Example University',
    ...overrides,
  }
}

export function createRawDummyJsonUserFixture(
  overrides: Partial<RawDummyJsonUser> = {},
): RawDummyJsonUser {
  return {
    id: 1,
    firstName: 'Jane',
    lastName: 'Cooper',
    age: 29,
    gender: 'female',
    email: 'jane.cooper@example.com',
    phone: '+1 555 0100',
    image: 'https://example.com/jane.png',
    role: 'admin',
    company: {
      name: 'Acme Corp',
      title: 'Product Manager',
      department: 'Product',
    },
    address: {
      city: 'New York',
      country: 'United States',
    },
    university: 'Example University',
    ...overrides,
  }
}
