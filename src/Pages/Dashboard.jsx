 
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const tasks = [
  { title: "Complete project proposal", category: "Work" },
  { title: "Review weekly performance", category: "Planning" },
  { title: "Update project documentation", category: "Work" },
  { title: "Prepare next week goals", category: "Personal" },
  { title: "Organize pending activities", category: "Planning" },
];

const projects = [
  { title: "Website Redesign", subtitle: "Design & development", value: 80, color: "bg-cyan-600" },
  { title: "Marketing Campaign", subtitle: "Content & outreach", value: 65, color: "bg-violet-500" },
  { title: "Mobile Application", subtitle: "Product development", value: 45, color: "bg-amber-500" },
];

const activities = [
  { icon: "✓", title: "Completed a task", detail: "Weekly planning updated", time: "Today · 10:30 AM", color: "bg-emerald-100 text-emerald-700" },
  { icon: "◈", title: "Account accessed", detail: "You logged in to DashFlow", time: "Today · 09:15 AM", color: "bg-cyan-100 text-cyan-700" },
  { icon: "▦", title: "Project workspace", detail: "Your workspace is ready", time: "Yesterday", color: "bg-violet-100 text-violet-700" },
];

const navItems = [
  { name: "Dashboard", icon: "▦", id: "overview" },
  { name: "Projects", icon: "▤", id: "projects" },
  { name: "My Tasks", icon: "✓", id: "tasks" },
  { name: "Activity", icon: "◷", id: "activity" },
  { name: "Settings", icon: "⚙", id: "account" },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("Dashboard");
  const [completedTasks, setCompletedTasks] = useState([
    true, true, false, false, false,
  ]);

  if (!user) return <Navigate to="/login" replace />;

  const completedCount = completedTasks.filter(Boolean).length;
  const pendingCount = tasks.length - completedCount;
  const productivity = Math.round((completedCount / tasks.length) * 100);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  function selectSection(name, id) {
    setActivePage(name);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  const stats = [
    {
      title: "Total Projects",
      value: "12",
      note: "Projects in your workspace",
      icon: "▦",
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Tasks Completed",
      value: String(26 + completedCount),
      note: "Great progress so far",
      icon: "✓",
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Pending Tasks",
      value: String(pendingCount),
      note: "Ready for your attention",
      icon: "◷",
      color: "bg-amber-50 text-amber-700",
    },
    {
      title: "Productivity",
      value: `${productivity}%`,
      note: "Your task completion",
      icon: "↗",
      color: "bg-purple-50 text-purple-700",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800">
      <div className="flex min-h-screen flex-col lg:flex-row">

        {/* SIDEBAR */}
        <aside className="flex w-full shrink-0 flex-col bg-[#111c36] text-white lg:sticky lg:top-0 lg:h-screen lg:w-64">
          <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-teal-600 text-2xl font-bold">
              ◈
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-wide">DashFlow</h2>
              <p className="text-xs text-slate-400">Workspace dashboard</p>
            </div>
          </div>

          <div className="px-4 py-5">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Workspace
            </p>

            <nav className="flex gap-2 overflow-x-auto lg:flex-col">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => selectSection(item.name, item.id)}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                    activePage === item.name
                      ? "bg-[#087d98] text-white shadow-lg"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}

                  {item.name === "My Tasks" && (
                    <span className="ml-auto rounded-full bg-white/15 px-2 py-0.5 text-xs">
                      {pendingCount}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto hidden px-4 pb-5 lg:block">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/15 text-lg text-amber-300">
                ✦
              </div>
              <p className="font-semibold">Keep growing!</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                Small steps every day lead to great results.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="mt-4 w-full rounded-xl px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-red-500/15 hover:text-red-300"
            >
              ↪ &nbsp; Log Out
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="min-w-0 flex-1">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-8 lg:px-10">
            <div>
              <p className="text-xs font-medium text-slate-500">{today}</p>
              <h1 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                {activePage === "Dashboard" ? "Dashboard Overview" : activePage}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                <p className="max-w-48 truncate text-xs text-slate-500">{user.email}</p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-700 text-lg font-bold text-white ring-4 ring-cyan-50">
                {(user.name || "U").charAt(0).toUpperCase()}
              </div>

              <button
                onClick={handleLogout}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-red-50 hover:text-red-600 lg:hidden"
              >
                Exit
              </button>
            </div>
          </header>

          <div className="mx-auto max-w-7xl space-y-8 px-5 py-7 sm:px-8 sm:py-9 lg:px-10">

            {/* WELCOME BANNER */}
            <section
              id="overview"
              className="scroll-mt-6 overflow-hidden rounded-3xl bg-gradient-to-r from-[#111c36] via-[#123b59] to-[#087d83] p-7 text-white shadow-xl sm:p-10"
            >
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-cyan-100">
                ✦ YOUR PERSONAL WORKSPACE
              </span>

              <div className="mt-5 flex flex-col justify-between gap-7 md:flex-row md:items-center">
                <div className="max-w-2xl">
                  <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                    Welcome back, {user.name}!
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-slate-200 sm:text-base">
                    Stay organized, track your progress, and turn your goals
                    into achievements. Your workspace is ready for you.
                  </p>
                  <button
                    onClick={() => selectSection("My Tasks", "tasks")}
                    className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#123b59] shadow-md transition hover:-translate-y-0.5 hover:bg-cyan-50"
                  >
                    View My Tasks →
                  </button>
                </div>

                <div className="hidden h-36 w-36 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-7xl md:flex">
                  ◈
                </div>
              </div>
            </section>

            {/* STATISTICS */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.title}
                  className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${stat.color}`}>
                      {stat.icon}
                    </div>
                    <span className="text-xs font-semibold text-emerald-600">
                      ● Active
                    </span>
                  </div>
                  <p className="mt-5 text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>
                  <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">{stat.note}</p>
                </div>
              ))}
            </section>

            {/* WEEKLY ACTIVITY AND PROJECTS */}
            <section className="grid gap-6 xl:grid-cols-5">
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm xl:col-span-3 sm:p-7">
                <h3 className="text-lg font-bold text-slate-900">
                  Weekly Activity
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Your productivity at a glance
                </p>

                <div className="mt-8 flex h-52 items-end justify-around gap-3 border-b border-slate-100 pb-2">
                  {[
                    { day: "Mon", value: 48 },
                    { day: "Tue", value: 75 },
                    { day: "Wed", value: 58 },
                    { day: "Thu", value: 90 },
                    { day: "Fri", value: 68 },
                    { day: "Sat", value: 38 },
                    { day: "Sun", value: 55 },
                  ].map((item) => (
                    <div
                      key={item.day}
                      className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                    >
                      <div className="flex h-full w-full items-end justify-center">
                        <div
                          title={`${item.value}% activity`}
                          className={`w-full max-w-9 rounded-t-lg transition-all hover:opacity-75 ${
                            item.day === "Thu" ? "bg-[#087d98]" : "bg-cyan-100"
                          }`}
                          style={{ height: `${item.value}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">{item.day}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 p-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Keep the momentum going
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      A little progress every day adds up.
                    </p>
                  </div>
                  <span className="text-2xl text-[#087d98]">↗</span>
                </div>
              </div>

              <div
                id="projects"
                className="scroll-mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm xl:col-span-2 sm:p-7"
              >
                <h3 className="text-lg font-bold text-slate-900">
                  Project Progress
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  A snapshot of your workspace
                </p>

                <div className="mt-7 space-y-6">
                  {projects.map((project) => (
                    <div key={project.title}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {project.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {project.subtitle}
                          </p>
                        </div>
                        <span className="text-sm font-bold text-slate-700">
                          {project.value}%
                        </span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${project.color}`}
                          style={{ width: `${project.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-7 rounded-xl bg-cyan-50 p-3 text-xs leading-5 text-cyan-900">
                  Tip: Break larger projects into smaller tasks to make progress easier to track.
                </p>
              </div>
            </section>

            {/* TASKS AND RECENT ACTIVITY */}
            <section className="grid gap-6 xl:grid-cols-5">
              <div
                id="tasks"
                className="scroll-mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm xl:col-span-3 sm:p-7"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">My Tasks</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Check off tasks as you finish them
                    </p>
                  </div>
                  <span className="rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-[#087d98]">
                    {completedCount}/{tasks.length} completed
                  </span>
                </div>

                <div className="mt-5 space-y-2">
                  {tasks.map((task, index) => {
                    const categoryColors = {
                      Work: "bg-blue-100 text-blue-700",
                      Planning: "bg-purple-100 text-purple-700",
                      Personal: "bg-amber-100 text-amber-700",
                    };

                    return (
                      <label
                        key={task.title}
                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-transparent p-3 transition hover:border-slate-100 hover:bg-slate-50"
                      >
                        <input
                          type="checkbox"
                          checked={completedTasks[index]}
                          onChange={() =>
                            setCompletedTasks((previous) =>
                              previous.map((done, i) =>
                                i === index ? !done : done
                              )
                            )
                          }
                          className="h-4 w-4 shrink-0 accent-[#087d98]"
                        />
                        <span
                          className={`min-w-0 flex-1 text-sm font-medium ${
                            completedTasks[index]
                              ? "text-slate-400 line-through"
                              : "text-slate-700"
                          }`}
                        >
                          {task.title}
                        </span>
                        <span
                          className={`hidden rounded-full px-2.5 py-1 text-xs font-medium sm:inline ${categoryColors[task.category]}`}
                        >
                          {task.category}
                        </span>
                      </label>
                    );
                  })}
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 transition-all duration-300"
                    style={{ width: `${productivity}%` }}
                  />
                </div>
                <p className="mt-2 text-right text-xs text-slate-500">
                  {productivity}% complete
                </p>
              </div>

              <div
                id="activity"
                className="scroll-mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm xl:col-span-2 sm:p-7"
              >
                <h3 className="text-lg font-bold text-slate-900">
                  Recent Activity
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Your latest workspace updates
                </p>

                <div className="mt-6 space-y-6">
                  {activities.map((activity) => (
                    <div key={activity.title} className="flex gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${activity.color}`}
                      >
                        {activity.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800">
                          {activity.title}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {activity.detail}
                        </p>
                        <p className="mt-2 text-xs text-slate-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ACCOUNT INFORMATION */}
            <section
              id="account"
              className="scroll-mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Account Information
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Your profile details for this session
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-50 text-xl font-bold text-[#087d98]">
                  {(user.name || "U").charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Full Name
                  </p>
                  <p className="mt-2 break-words font-semibold text-slate-900">
                    {user.name}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Email Address
                  </p>
                  <p className="mt-2 break-words font-semibold text-slate-900">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <div>
                  <p className="text-sm font-semibold text-emerald-900">
                    Account status
                  </p>
                  <p className="mt-1 text-xs text-emerald-700">
                    You are signed in and ready to work.
                  </p>
                </div>
                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-emerald-700">
                  ● Active
                </span>
              </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="rounded-2xl bg-gradient-to-r from-cyan-50 to-white p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Ready for your next goal?
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    Review your tasks, celebrate completed work, and make a plan for what comes next.
                  </p>
                </div>
                <button
                  onClick={() => selectSection("My Tasks", "tasks")}
                  className="shrink-0 rounded-xl bg-[#087d98] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#06677d]"
                >
                  Review Tasks →
                </button>
              </div>
            </section>
          </div>

          {/* COLORED FOOTER */}
          <footer className="bg-gradient-to-r from-[#111c36] via-[#123b59] to-[#087d83] px-5 py-8 text-white sm:px-8 lg:px-10">
            <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-xl font-bold tracking-wide">
                  <span className="mr-2 text-cyan-300">◈</span>
                  DashFlow
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Organize your work. Achieve your goals.
                </p>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-200">
                {navItems
                  .filter((item) => item.name !== "Settings")
                  .map((item) => (
                    <button
                      key={item.name}
                      onClick={() => selectSection(item.name, item.id)}
                      className="transition hover:text-cyan-300"
                    >
                      {item.name}
                    </button>
                  ))}

                <button
                  onClick={handleLogout}
                  className="transition hover:text-rose-300"
                >
                  Log Out
                </button>
              </div>
            </div>

            {/* COPYRIGHT LINE ABOVE THE COPYRIGHT TEXT */}
            <div className="mx-auto mt-6 max-w-7xl border-t border-white/15 pt-5 text-center text-xs text-slate-300">
              <p>
                © {new Date().getFullYear()} DashFlow. All rights reserved.
              </p>

              <p className="mt-3 text-sm font-medium text-white">
                Made with <span className="text-rose-400">♥</span> by{" "}
                <span className="font-bold text-cyan-200">
                  Hania Waseem Khan
                </span>
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
