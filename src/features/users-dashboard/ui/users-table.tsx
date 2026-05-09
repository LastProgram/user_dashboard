import type { User } from '@/entities/user/model/user.types'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'

interface UsersTableProps {
  users: User[]
  onViewDetails: (userId: number) => void
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

function formatNullableText(value: string | null) {
  return value ?? NOT_PROVIDED
}

function formatLocation(user: User) {
  const locationParts = [user.city, user.country].filter(Boolean)

  return locationParts.length > 0 ? locationParts.join(', ') : NOT_PROVIDED
}

function UserAvatar({ user }: { user: User }) {
  const initials = getInitials(user.fullName)

  return (
    <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 text-sm font-semibold text-cyan-200">
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

export function UsersTable({ users, onViewDetails }: UsersTableProps) {
  return (
    <section
      aria-labelledby="users-table-title"
      className="hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl shadow-slate-950/20 md:block"
    >
      <div className="flex flex-col gap-2 border-b border-slate-800 px-6 py-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
            Profiles
          </p>
          <h2
            id="users-table-title"
            className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white"
          >
            People directory
          </h2>
        </div>

        <p className="text-sm text-slate-400">{users.length} profiles</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1080px] border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-left text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
              <th scope="col" className="px-6 py-4">
                User
              </th>
              <th scope="col" className="px-6 py-4">
                Role
              </th>
              <th scope="col" className="px-6 py-4">
                Age
              </th>
              <th scope="col" className="px-6 py-4">
                Gender
              </th>
              <th scope="col" className="px-6 py-4">
                Department
              </th>
              <th scope="col" className="px-6 py-4">
                Company
              </th>
              <th scope="col" className="px-6 py-4">
                Location
              </th>
              <th scope="col" className="px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {users.map((user) => (
              <tr
                key={user.id}
                className="transition-colors hover:bg-slate-800/40"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <UserAvatar user={user} />

                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-50">
                        {user.fullName}
                      </p>
                      <p className="truncate text-sm text-slate-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <Badge variant={user.role}>{user.role}</Badge>
                </td>

                <td className="px-6 py-4 text-sm text-slate-200">
                  {user.age}
                </td>

                <td className="px-6 py-4 text-sm capitalize text-slate-200">
                  {user.gender}
                </td>

                <td className="px-6 py-4 text-sm text-slate-200">
                  {user.department}
                </td>

                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-50">
                    {user.companyName}
                  </p>
                  <p className="text-sm text-slate-400">{user.companyTitle}</p>
                </td>

                <td className="px-6 py-4">
                  <p className="text-sm text-slate-200">
                    {formatLocation(user)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatNullableText(user.university)}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(user.id)}
                  >
                    View details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
