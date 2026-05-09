'use client'

import { useUserDetails } from '@/features/users-dashboard/api/use-user-details'
import { UserDetailsContent } from './user-details-content'
import { UserDetailsDrawerShell } from './user-details-drawer-shell'
import {
  UserDetailsErrorState,
  UserDetailsLoadingState,
} from './user-details-drawer-states'

interface UserDetailsDrawerProps {
  userId: number | null
  isOpen: boolean
  onClose: () => void
}

export function UserDetailsDrawer({
  userId,
  isOpen,
  onClose,
}: UserDetailsDrawerProps) {
  const { user, isLoading, isError, error, reload } = useUserDetails(
    isOpen ? userId : null,
  )

  if (!isOpen) {
    return null
  }

  return (
    <UserDetailsDrawerShell onClose={onClose}>
      {isLoading && <UserDetailsLoadingState />}

      {isError && (
        <UserDetailsErrorState
          message={error}
          onRetry={reload}
        />
      )}

      {user && <UserDetailsContent user={user} />}
    </UserDetailsDrawerShell>
  )
}
