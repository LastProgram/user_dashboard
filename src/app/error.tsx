'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-50 sm:px-8 lg:px-10">
      <section className="mx-auto flex max-w-3xl flex-col gap-6 rounded-[2rem] border border-rose-400/20 bg-rose-950/20 p-6 text-center shadow-2xl shadow-slate-950/30 sm:p-8">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-rose-300/20 bg-rose-400/10 text-rose-200">
          !
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-white">
            Unable to render dashboard
          </h1>
          <p className="text-sm leading-6 text-slate-300">
            The dashboard shell could not be rendered. Try refreshing this
            route.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 px-4 text-sm font-medium text-slate-50 transition-colors hover:border-cyan-400/60 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Try again
          </button>
        </div>
      </section>
    </main>
  )
}
