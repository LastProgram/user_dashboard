export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-50 sm:px-8 lg:px-10">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30 sm:p-8">
          <div className="space-y-4">
            <div className="h-4 w-56 animate-pulse rounded-md bg-cyan-300/20" />
            <div className="h-12 w-full max-w-xl animate-pulse rounded-xl bg-slate-800" />
            <div className="h-5 w-full max-w-2xl animate-pulse rounded-md bg-slate-800" />
            <div className="h-5 w-full max-w-lg animate-pulse rounded-md bg-slate-800" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="h-32 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/70" />
          <div className="h-32 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/70" />
          <div className="h-32 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/70" />
          <div className="h-32 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/70" />
        </div>
      </section>
    </main>
  )
}
