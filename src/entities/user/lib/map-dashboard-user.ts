import type { RawDummyJsonUser } from '@/entities/user/model/user.schema'
import type { User } from '@/entities/user/model/user.types'

const UNKNOWN_USER_NAME = 'Unknown user'
const UNKNOWN_GENDER = 'unknown'
const UNKNOWN_COMPANY = 'Unknown company'
const UNKNOWN_COMPANY_TITLE = 'Unknown title'
const UNKNOWN_DEPARTMENT = 'Unassigned'

function normalizeOptionalText(value: string | null | undefined) {
  const trimmedValue = value?.trim()

  return trimmedValue ? trimmedValue : null
}

function normalizeRequiredText(
  value: string | null | undefined,
  fallback: string,
) {
  return normalizeOptionalText(value) ?? fallback
}

function buildFullName(rawUser: RawDummyJsonUser) {
  const nameParts = [
    normalizeOptionalText(rawUser.firstName),
    normalizeOptionalText(rawUser.lastName),
  ].filter((namePart): namePart is string => Boolean(namePart))

  return nameParts.join(' ') || UNKNOWN_USER_NAME
}

export function mapDashboardUser(rawUser: RawDummyJsonUser): User {
  return {
    id: rawUser.id,
    fullName: buildFullName(rawUser),
    email: normalizeRequiredText(rawUser.email, ''),
    age: rawUser.age,
    gender: normalizeRequiredText(rawUser.gender, UNKNOWN_GENDER),
    phone: normalizeOptionalText(rawUser.phone),
    image: normalizeOptionalText(rawUser.image),
    role: rawUser.role,
    companyName: normalizeRequiredText(
      rawUser.company?.name,
      UNKNOWN_COMPANY,
    ),
    companyTitle: normalizeRequiredText(
      rawUser.company?.title,
      UNKNOWN_COMPANY_TITLE,
    ),
    department: normalizeRequiredText(
      rawUser.company?.department,
      UNKNOWN_DEPARTMENT,
    ),
    city: normalizeOptionalText(rawUser.address?.city),
    country: normalizeOptionalText(rawUser.address?.country),
    university: normalizeOptionalText(rawUser.university),
  }
}
