export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-50">
      <section className="mx-auto flex max-w-5xl flex-col gap-6">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300">
          Users Dashboard
        </p>

        <div className="space-y-4">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
            A maintainable user dashboard foundation.
          </h1>

          <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            The platform shell is ready.
          </p>
        </div>
      </section>
    </main>
  )
}
