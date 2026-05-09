import type { ReactNode } from 'react'
import { X } from 'lucide-react'

import { Button } from '@/shared/ui/button'

interface UserDetailsDrawerShellProps {
  children: ReactNode
  onClose: () => void
}

export function UserDetailsDrawerShell({
  children,
  onClose,
}: UserDetailsDrawerShellProps) {
  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close user details"
        className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-details-title"
        className="absolute inset-x-0 bottom-0 max-h-[90vh] overflow-y-auto rounded-t-[2rem] border border-slate-800 bg-slate-950 p-5 shadow-2xl shadow-slate-950/60 md:inset-y-0 md:left-auto md:right-0 md:h-full md:max-h-none md:w-full md:max-w-xl md:rounded-l-[2rem] md:rounded-tr-none md:p-6"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
              Profile details
            </p>
            <h2
              id="user-details-title"
              className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white"
            >
              User profile
            </h2>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close details"
          >
            <X className="size-4" aria-hidden="true" />
          </Button>
        </div>

        {children}
      </aside>
    </div>
  )
}
