'use client'

import { useUserDetails } from '@/features/users-dashboard/api/use-user-details'
import { UserDetailsDrawerShell } from '@/features/users-dashboard/ui/user-details-drawer-shell'
import {
  UserDetailsErrorState,
  UserDetailsLoadedState,
  UserDetailsLoadingState,
} from '@/features/users-dashboard/ui/user-details-drawer-states'

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

      {user && <UserDetailsLoadedState user={user} />}
    </UserDetailsDrawerShell>
  )
}
