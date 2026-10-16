
export default function AuthLayout({ children, eyebrow = "WELCOME BACK" }) {
  return (
    <main className="min-h-screen bg-[#eef3f8] p-3 sm:p-6 lg:p-7">
      <div className="mx-auto grid min-h-[calc(100vh-56px)] max-w-[1380px] overflow-hidden rounded-[30px] bg-white shadow-xl lg:grid-cols-2">
        <section className="flex flex-col justify-between bg-gradient-to-br from-[#050b23] via-[#192e59] to-[#087083] p-7 text-white sm:p-12 lg:p-16">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl">
              ◈
            </div>
            <span className="text-2xl font-bold">DashFlow</span>
          </div>

          <div className="my-12">
            <p className="mb-6 text-sm font-bold tracking-[0.3em] text-cyan-300">
              {eyebrow}
            </p>

            <h2 className="max-w-xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Manage your work, all in one place.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-9 text-blue-100">
              Access your dashboard, monitor your activity, and keep
              everything organized in one place.
            </p>
          </div>

          <p className="text-sm text-blue-100">
            React · Tailwind CSS · Context API
          </p>
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-16">
          <div className="w-full max-w-xl">{children}</div>
        </section>
      </div>
    </main>
  );
}
