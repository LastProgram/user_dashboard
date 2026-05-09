import { Badge } from '@/shared/ui/badge'

export function DashboardHero() {
  return (
    <header className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30 sm:p-8">
      <div className="flex max-w-3xl flex-col gap-4">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300">
          User directory
        </p>

        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            Users Dashboard
          </h1>

          <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Browse a clean public user dataset with summary insights and
            responsive views.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <Badge variant="default">Public dataset</Badge>
          <Badge variant="neutral">Clean profiles</Badge>
          <Badge variant="neutral">Responsive views</Badge>
        </div>
      </div>
    </header>
  )
}
