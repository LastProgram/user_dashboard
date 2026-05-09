import { Skeleton } from '@/shared/ui/skeleton'

const SUMMARY_SKELETON_COUNT = 4
const TABLE_SKELETON_ROWS = 6

export function DashboardLoadingSurface() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading users">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: SUMMARY_SKELETON_COUNT }, (_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="w-full max-w-40 space-y-4">
                <Skeleton variant="text" className="w-24" />
                <Skeleton variant="text" className="h-8 w-16" />
              </div>
              <Skeleton variant="avatar" className="size-12 rounded-2xl" />
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="space-y-3">
            <Skeleton variant="text" className="h-5 w-48" />
            <Skeleton variant="text" className="w-72 max-w-full" />
          </div>
          <Skeleton variant="block" className="hidden h-10 w-32 sm:block" />
        </div>

        <div className="space-y-3">
          {Array.from({ length: TABLE_SKELETON_ROWS }, (_, index) => (
            <Skeleton key={index} variant="block" className="h-14" />
          ))}
        </div>
      </section>
    </div>
  )
}
