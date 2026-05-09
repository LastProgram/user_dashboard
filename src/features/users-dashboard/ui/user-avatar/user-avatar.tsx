import type { User } from '@/entities/user/model/user.types'
import { cn } from '@/shared/lib/cn'

type UserAvatarSize = 'sm' | 'md' | 'lg'

interface UserAvatarProps {
  user: User
  size?: UserAvatarSize
  className?: string
}

const avatarSizes: Record<UserAvatarSize, string> = {
  sm: 'size-11 rounded-2xl text-sm',
  md: 'size-14 rounded-2xl text-base',
  lg: 'size-16 rounded-3xl text-lg',
}

function getInitials(fullName: string) {
  return fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((namePart) => namePart[0]?.toUpperCase())
    .join('')
}

export function UserAvatar({
  user,
  size = 'md',
  className,
}: UserAvatarProps) {
  const initials = getInitials(user.fullName)

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center overflow-hidden border border-slate-700 bg-slate-800 font-semibold text-cyan-200',
        avatarSizes[size],
        className,
      )}
    >
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
