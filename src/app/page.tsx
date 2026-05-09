export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-50 sm:px-8 lg:px-10">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30 sm:p-8">
          <div className="flex max-w-3xl flex-col gap-4">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300">
              Users Dashboard
            </p>

            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Normalized user data
              </h1>

              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Public dataset, safe boundary, ready for summary cards and filters.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
                Safe boundary
              </span>
              <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                Public data
              </span>
              <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                Normalized
              </span>
            </div>
          </div>
        </header>
      </section>
    </main>
  )
}
