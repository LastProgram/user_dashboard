import {
  BriefcaseBusiness,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from 'lucide-react'

import type { User } from '@/entities/user/model/user.types'
import { Badge } from '@/shared/ui/badge'

import {
  UserDetailsItem,
  UserDetailsSection,
} from './user-details-section'

interface UserDetailsContentProps {
  user: User
}

const NOT_PROVIDED = 'Not provided'

function formatOptionalText(value: string | null | undefined) {
  const trimmedValue = value?.trim()

  return trimmedValue || NOT_PROVIDED
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

export function UserDetailsContent({ user }: UserDetailsContentProps) {
  return (
    <div className="space-y-5">
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
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {user.companyTitle} · {user.companyName}
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-4">
        <UserDetailsSection
          title="Profile"
          icon={<UserRound className="size-4" aria-hidden="true" />}
        >
          <UserDetailsItem label="Age" value={user.age} />
          <UserDetailsItem label="Gender" value={user.gender} />
          <UserDetailsItem label="Role" value={user.role} />
        </UserDetailsSection>

        <UserDetailsSection
          title="Contact"
          icon={<Phone className="size-4" aria-hidden="true" />}
        >
          <UserDetailsItem label="Email" value={user.email} />
          <UserDetailsItem label="Phone" value={formatOptionalText(user.phone)} />
        </UserDetailsSection>

        <UserDetailsSection
          title="Company"
          icon={<BriefcaseBusiness className="size-4" aria-hidden="true" />}
        >
          <UserDetailsItem label="Company" value={user.companyName} />
          <UserDetailsItem label="Title" value={user.companyTitle} />
          <UserDetailsItem label="Department" value={user.department} />
        </UserDetailsSection>

        <UserDetailsSection
          title="Location"
          icon={<MapPin className="size-4" aria-hidden="true" />}
        >
          <UserDetailsItem label="City" value={formatOptionalText(user.city)} />
          <UserDetailsItem
            label="Country"
            value={formatOptionalText(user.country)}
          />
        </UserDetailsSection>

        <UserDetailsSection
          title="Education"
          icon={<GraduationCap className="size-4" aria-hidden="true" />}
        >
          <UserDetailsItem
            label="University"
            value={formatOptionalText(user.university)}
          />
        </UserDetailsSection>

        <UserDetailsSection
          title="Contact action"
          icon={<Mail className="size-4" aria-hidden="true" />}
        >
          <UserDetailsItem label="Primary email" value={user.email} />
        </UserDetailsSection>
      </div>
    </div>
  )
}
