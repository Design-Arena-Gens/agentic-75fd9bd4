import { HabitFocusSelector } from "@/components/HabitFocusSelector";
import { ProgressForecast } from "@/components/ProgressForecast";
import { RoutineBuilder } from "@/components/RoutineBuilder";

const disciplinePrinciples = [
  {
    title: "Identity before outcome",
    description:
      "Decide who you are becoming, then stack habits that reinforce that identity every single day."
  },
  {
    title: "Plan the night before",
    description:
      "Make decisions while you are calm. Morning discipline is built by yesterday's clarity."
  },
  {
    title: "Protect the start & finish",
    description:
      "Opening rituals eliminate friction. Closing rituals lock in the lesson and the next step."
  },
  {
    title: "Systems beat willpower",
    description:
      "Environment cues, accountability, and measurement carry you when motivation dips."
  }
];

const stats = [
  { label: "Minimum viable streak", value: "14 days" },
  { label: "Deep work minimum", value: "90 min/week" },
  { label: "Check-in cadence", value: "Weekly" },
  { label: "Reflection time", value: "10 min/day" }
];

export default function Page() {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-12 lg:px-10">
      <header className="relative overflow-hidden rounded-3xl border border-slate-700/40 bg-slate-900/60 p-10 shadow-2xl shadow-slate-900/30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/40 via-transparent to-purple-500/20 opacity-80" />
        <div className="relative flex flex-col gap-6">
          <span className="section-heading text-primary-200">
            Discipline Companion
          </span>
          <h1 className="font-title text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            Build discipline that survives low motivation days.
          </h1>
          <p className="max-w-2xl text-base text-slate-200 md:text-lg">
            This playbook helps you design the cues, rituals, and accountability
            loops that make disciplined behavior feel inevitable. Use the tools
            below to choose your focus, design a daily routine, and forecast the
            momentum you are building.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-slate-200">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-700/60 bg-slate-950/60 px-4 py-3"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  {stat.label}
                </p>
                <p className="mt-1 text-lg font-semibold text-primary-100">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="grid gap-6 rounded-3xl border border-slate-700/40 bg-slate-900/50 p-8 md:grid-cols-2">
        {disciplinePrinciples.map((principle) => (
          <div
            key={principle.title}
            className="rounded-2xl border border-slate-800/70 bg-slate-950/60 p-6"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary-200">
              Principle
            </p>
            <h3 className="mt-2 text-lg font-semibold text-white">
              {principle.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {principle.description}
            </p>
          </div>
        ))}
      </section>

      <HabitFocusSelector />
      <RoutineBuilder />
      <ProgressForecast />

      <footer className="mb-6 rounded-3xl border border-slate-700/40 bg-slate-900/60 p-8 text-sm text-slate-300">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>
            Discipline grows when you measure, adjust, and show up anyway. Make
            today&apos;s plan visible, tell someone you trust, and close the day
            with an honest score.
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-primary-200">
            Execute with integrity.
          </p>
        </div>
      </footer>
    </div>
  );
}
