import { AlertTriangle, UserRound } from 'lucide-react'

import type { User } from '@/entities/user/model/user.types'
import { Badge } from '@/shared/ui/badge'
import { ErrorState } from '@/shared/ui/error-state'
import { Skeleton } from '@/shared/ui/skeleton'

interface UserDetailsErrorStateProps {
  message: string | null
  onRetry: () => void
}

interface UserDetailsLoadedStateProps {
  user: User
}

function getInitials(fullName: string) {
  return fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((namePart) => namePart[0]?.toUpperCase())
    .join('')
}

function UserDetailsAvatar({ user }: { user: User }) {
  const initials = getInitials(user.fullName)

  return (
    <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-slate-700 bg-slate-800 text-lg font-semibold text-cyan-200">
      {user.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.image}
          alt=""
          className="size-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      ) : (
        <span aria-hidden="true">{initials || 'U'}</span>
      )}
    </div>
  )
}

export function UserDetailsLoadingState() {
  return (
    <div className="space-y-5" aria-busy="true" aria-label="Loading details">
      <div className="flex items-center gap-4">
        <Skeleton variant="avatar" className="size-16 rounded-3xl" />
        <div className="w-full max-w-60 space-y-3">
          <Skeleton variant="text" className="h-6 w-48" />
          <Skeleton variant="text" className="w-60" />
        </div>
      </div>

      <div className="grid gap-4">
        <Skeleton variant="card" />
        <Skeleton variant="card" />
        <Skeleton variant="card" />
      </div>
    </div>
  )
}

export function UserDetailsErrorState({
  message,
  onRetry,
}: UserDetailsErrorStateProps) {
  return (
    <ErrorState
      title="Unable to load profile"
      description={
        message ??
        'The selected profile could not be loaded. Try again to refresh the details.'
      }
      icon={<AlertTriangle className="size-7" aria-hidden="true" />}
      retryLabel="Try again"
      onRetry={onRetry}
      className="border-slate-800 bg-slate-900/70"
    />
  )
}

export function UserDetailsLoadedState({ user }: UserDetailsLoadedStateProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <div className="flex items-start gap-4">
        <UserDetailsAvatar user={user} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-xl font-semibold tracking-[-0.02em] text-white">
              {user.fullName}
            </h3>
            <Badge variant={user.role}>{user.role}</Badge>
          </div>

          <p className="mt-1 truncate text-sm text-slate-400">{user.email}</p>

          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/50 px-3 py-2 text-sm text-slate-300">
            <UserRound className="size-4 text-cyan-200" aria-hidden="true" />
            Profile details are ready.
          </div>
        </div>
      </div>
    </section>
  )
}
