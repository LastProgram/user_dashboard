'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { dummyJsonUsersDataSource } from '@/entities/user/api/users-data-source'
import type { User } from '@/entities/user/model/user.types'

type UserDetailsStatus = 'idle' | 'loading' | 'success' | 'error'

interface UserDetailsState {
  requestKey: string | null
  user: User | null
  error: string | null
}

export interface UseUserDetailsResult {
  user: User | null
  status: UserDetailsStatus
  isIdle: boolean
  isLoading: boolean
  isError: boolean
  error: string | null
  reload: () => void
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  return 'Unable to load user details.'
}

function getUserDetailsStatus(
  userId: number | null,
  requestKey: string | null,
  state: UserDetailsState,
): UserDetailsStatus {
  if (userId === null) {
    return 'idle'
  }

  if (state.requestKey !== requestKey) {
    return 'loading'
  }

  if (state.error) {
    return 'error'
  }

  return state.user ? 'success' : 'loading'
}

export function useUserDetails(userId: number | null): UseUserDetailsResult {
  const requestIdRef = useRef(0)
  const [reloadToken, setReloadToken] = useState(0)
  const [state, setState] = useState<UserDetailsState>({
    requestKey: null,
    user: null,
    error: null,
  })

  const requestKey = userId === null ? null : `${userId}:${reloadToken}`

  useEffect(() => {
    if (userId === null || requestKey === null) {
      return
    }

    const controller = new AbortController()
    const requestId = requestIdRef.current + 1

    requestIdRef.current = requestId

    dummyJsonUsersDataSource
      .getUserById(userId, controller.signal)
      .then((user) => {
        if (controller.signal.aborted || requestIdRef.current !== requestId) {
          return
        }

        setState({
          requestKey,
          user,
          error: null,
        })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted || requestIdRef.current !== requestId) {
          return
        }

        setState({
          requestKey,
          user: null,
          error: getErrorMessage(error),
        })
      })

    return () => {
      controller.abort()
    }
  }, [requestKey, userId])

  const reload = useCallback(() => {
    if (userId !== null) {
      setReloadToken((currentToken) => currentToken + 1)
    }
  }, [userId])

  const status = getUserDetailsStatus(userId, requestKey, state)

  return {
    user: status === 'success' ? state.user : null,
    status,
    isIdle: status === 'idle',
    isLoading: status === 'loading',
    isError: status === 'error',
    error: status === 'error' ? state.error : null,
    reload,
  }
}
