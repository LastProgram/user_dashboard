export const DASHBOARD_PAGE_SIZE = 6

export const DASHBOARD_QUERY_PARAM_NAMES = {
  search: 'search',
  role: 'role',
  department: 'department',
  sort: 'sort',
  page: 'page',
} as const

export const DASHBOARD_ROLE_FILTER_VALUES = [
  'all',
  'admin',
  'moderator',
  'user',
] as const

export const DASHBOARD_SORT_VALUES = [
  'name-asc',
  'name-desc',
  'age-asc',
  'age-desc',
  'company-asc',
  'company-desc',
] as const

export const DEFAULT_DASHBOARD_QUERY = {
  search: '',
  role: 'all',
  department: 'all',
  sort: 'name-asc',
  page: 1,
} as const
