import type { User } from '@/entities/user/model/user.types'
import { Badge } from '@/shared/ui/badge'

interface UserCardListProps {
  users: User[]
}

const NOT_PROVIDED = 'Not provided'

function getInitials(fullName: string) {
  return fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((namePart) => namePart[0]?.toUpperCase())
    .join('')
}

function formatLocation(user: User) {
  const locationParts = [user.city, user.country].filter(Boolean)

  return locationParts.length > 0 ? locationParts.join(', ') : NOT_PROVIDED
}

function UserAvatar({ user }: { user: User }) {
  const initials = getInitials(user.fullName)

  return (
    <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 text-base font-semibold text-cyan-200">
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

function UserCard({ user }: { user: User }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl shadow-slate-950/20 transition-colors hover:border-cyan-400/40">
      <div className="flex items-start gap-4">
        <UserAvatar user={user} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-slate-50">
                {user.fullName}
              </h3>
              <p className="truncate text-sm text-slate-400">{user.email}</p>
            </div>

            <Badge variant={user.role}>{user.role}</Badge>
          </div>

          <div className="mt-4 space-y-1">
            <p className="text-sm font-medium text-slate-100">
              {user.companyTitle}
            </p>
            <p className="text-sm text-slate-400">{user.companyName}</p>
            <p className="text-sm text-slate-500">{user.department}</p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-400">
            <span>{user.age} years</span>
            <span aria-hidden="true">•</span>
            <span>{formatLocation(user)}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export function UserCardList({ users }: UserCardListProps) {
  return (
    <section
      aria-labelledby="users-card-list-title"
      className="space-y-4 md:hidden"
    >
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
          Directory
        </p>
        <h2
          id="users-card-list-title"
          className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white"
        >
          User cards
        </h2>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </section>
  )
}
