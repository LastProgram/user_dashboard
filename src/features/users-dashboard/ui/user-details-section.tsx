import type { ReactNode } from 'react'

interface UserDetailsSectionProps {
  title: string
  icon: ReactNode
  children: ReactNode
}

interface UserDetailsItemProps {
  label: string
  value: string | number | null | undefined
}

const NOT_PROVIDED = 'Not provided'

export function UserDetailsSection({
  title,
  icon,
  children,
}: UserDetailsSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-cyan-200">
          {icon}
        </div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">
          {title}
        </h3>
      </div>

      <dl className="grid gap-3">{children}</dl>
    </section>
  )
}

export function UserDetailsItem({ label, value }: UserDetailsItemProps) {
  return (
    <div className="grid gap-1">
      <dt className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
        {label}
      </dt>
      <dd className="text-sm leading-6 text-slate-100">
        {value ?? NOT_PROVIDED}
      </dd>
    </div>
  )
}
