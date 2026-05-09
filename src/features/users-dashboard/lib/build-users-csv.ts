import type { User } from '@/entities/user/model/user.types'

const NOT_PROVIDED = 'Not provided'

const USERS_CSV_HEADERS = [
  'ID',
  'Full name',
  'Email',
  'Age',
  'Gender',
  'Phone',
  'Role',
  'Company',
  'Title',
  'Department',
  'City',
  'Country',
  'University',
] as const

function formatOptionalCsvValue(value: string | number | null) {
  if (value === null) {
    return NOT_PROVIDED
  }

  return String(value)
}

function escapeCsvValue(value: string | number | null) {
  const csvValue = formatOptionalCsvValue(value)

  if (
    csvValue.includes(',') ||
    csvValue.includes('"') ||
    csvValue.includes('\n') ||
    csvValue.includes('\r')
  ) {
    return `"${csvValue.replaceAll('"', '""')}"`
  }

  return csvValue
}

function buildCsvRow(values: Array<string | number | null>) {
  return values.map(escapeCsvValue).join(',')
}

function getUserCsvValues(user: User) {
  return [
    user.id,
    user.fullName,
    user.email,
    user.age,
    user.gender,
    user.phone,
    user.role,
    user.companyName,
    user.companyTitle,
    user.department,
    user.city,
    user.country,
    user.university,
  ]
}

export function buildUsersCsv(users: User[]) {
  const headerRow = buildCsvRow([...USERS_CSV_HEADERS])
  const userRows = users.map((user) => buildCsvRow(getUserCsvValues(user)))

  return [headerRow, ...userRows].join('\n')
}
