import {
  fetchDummyJsonUserById,
  fetchDummyJsonUsers,
} from '@/shared/api/dummyjson/dummyjson-users.client'

import { mapDashboardUser } from '@/entities/user/lib/map-dashboard-user'
import {
  RawDummyJsonUserSchema,
  RawDummyJsonUsersResponseSchema,
} from '@/entities/user/model/user.schema'
import type { User } from '@/entities/user/model/user.types'

export interface UsersDataSource {
  getUsers(signal?: AbortSignal): Promise<User[]>
  getUserById(id: number, signal?: AbortSignal): Promise<User>
}

export const dummyJsonUsersDataSource: UsersDataSource = {
  async getUsers(signal) {
    const rawResponse = await fetchDummyJsonUsers(signal)
    const parsedResponse = RawDummyJsonUsersResponseSchema.parse(rawResponse)

    return parsedResponse.users.map(mapDashboardUser)
  },

  async getUserById(id, signal) {
    const rawUser = await fetchDummyJsonUserById(id, signal)
    const parsedUser = RawDummyJsonUserSchema.parse(rawUser)

    return mapDashboardUser(parsedUser)
  },
}
