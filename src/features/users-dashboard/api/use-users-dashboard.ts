'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { dummyJsonUsersDataSource } from '@/entities/user/api/users-data-source'
import type { User } from '@/entities/user/model/user.types'

type UsersDashboardStatus = 'loading' | 'success' | 'error'

interface UsersDashboardState {
  users: User[]
  status: UsersDashboardStatus
  error: string | null
}

export interface UseUsersDashboardResult extends UsersDashboardState {
  isLoading: boolean
  isError: boolean
  reload: () => void
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  return 'Unable to load users.'
}

export function useUsersDashboard(): UseUsersDashboardResult {
  const requestIdRef = useRef(0)
  const [reloadToken, setReloadToken] = useState(0)
  const [state, setState] = useState<UsersDashboardState>({
    users: [],
    status: 'loading',
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()
    const requestId = requestIdRef.current + 1

    requestIdRef.current = requestId

    dummyJsonUsersDataSource
      .getUsers(controller.signal)
      .then((users) => {
        if (controller.signal.aborted || requestIdRef.current !== requestId) {
          return
        }

        setState({
          users,
          status: 'success',
          error: null,
        })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted || requestIdRef.current !== requestId) {
          return
        }

        setState({
          users: [],
          status: 'error',
          error: getErrorMessage(error),
        })
      })

    return () => {
      controller.abort()
    }
  }, [reloadToken])

  const reload = useCallback(() => {
    setState((currentState) => ({
      ...currentState,
      status: 'loading',
      error: null,
    }))
    setReloadToken((currentToken) => currentToken + 1)
  }, [])

  return {
    ...state,
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    reload,
  }
}
