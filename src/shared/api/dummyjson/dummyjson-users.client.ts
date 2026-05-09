import type {
  RawDummyJsonUser,
  RawDummyJsonUsersResponse,
} from '@/entities/user/model/user.schema'

import { fetchDummyJson } from './dummyjson-client'

export const USERS_SELECT_FIELDS = [
  'id',
  'firstName',
  'lastName',
  'age',
  'gender',
  'email',
  'phone',
  'image',
  'company',
  'role',
  'address',
  'university',
] as const

const USERS_SELECT_PARAM = USERS_SELECT_FIELDS.join(',')

export function fetchDummyJsonUsers(signal?: AbortSignal) {
  return fetchDummyJson<RawDummyJsonUsersResponse>('/users', {
    signal,
    searchParams: {
      limit: 0,
      select: USERS_SELECT_PARAM,
    },
  })
}

export function fetchDummyJsonUserById(id: number, signal?: AbortSignal) {
  return fetchDummyJson<RawDummyJsonUser>(`/users/${id}`, {
    signal,
    searchParams: {
      select: USERS_SELECT_PARAM,
    },
  })
}
