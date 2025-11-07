"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const energyProfiles = [
  {
    id: "low",
    label: "Grounded",
    description:
      "Use gentle structure to rebuild momentum. Stack small, no-fail actions.",
    palette: "from-amber-500/30 to-rose-500/30"
  },
  {
    id: "medium",
    label: "Centered",
    description:
      "You have bandwidth for disciplined execution. Protect a meaningful block.",
    palette: "from-indigo-500/30 to-blue-500/30"
  },
  {
    id: "high",
    label: "Primed",
    description:
      "Leverage your peak state for deep work. Aim for strategic, uncomfortable reps.",
    palette: "from-emerald-500/30 to-cyan-500/30"
  }
] as const;

const blockSuggestions: Record<
  (typeof energyProfiles)[number]["id"],
  {
    warmup: string;
    focus: string;
    reinforcement: string;
    weeklyMilestone: string;
  }
> = {
  low: {
    warmup: "3-minute breathing ramp + 5-minute tidy/reset of workspace.",
    focus: "25-minute task sprint on the smallest meaningful deliverable.",
    reinforcement:
      "Score progress (0-5) and document one lesson in your capture system.",
    weeklyMilestone: "Complete 5 consecutive daily sprints without breaking."
  },
  medium: {
    warmup: "Review goals + rewrite today's top three outcomes.",
    focus:
      "50-minute deep work block with distraction audit and explicit halftime check-in.",
    reinforcement:
      "Send an accountability note summarizing output and next move.",
    weeklyMilestone:
      "Ship an iterative improvement that others can see or touch."
  },
  high: {
    warmup:
      "5-minute visualization of success and failure scenarios, then commit aloud.",
    focus:
      "90-minute deep work or training block targeting the hardest, highest-leverage task.",
    reinforcement:
      "Embed a forcing function (public demo, scheduled review, deliverable).",
    weeklyMilestone:
      "Deliver a signature piece of work that pushes your identity forward."
  }
};

const capacityArchetypes = [
  {
    id: "dawn",
    label: "Morning Peak",
    cue: "Protect the first 90 minutes after waking.",
    reset: "Night-before shutdown ritual with a written next action."
  },
  {
    id: "midday",
    label: "Midday Warrior",
    cue: "Block 11a-1p as a focus fortress. Fuel 30 minutes before.",
    reset: "Schedule a 10-minute walk immediately after the block."
  },
  {
    id: "evening",
    label: "Evening Builder",
    cue: "Stack environment cues (lighting, music) to switch contexts fast.",
    reset: "Close with a gratitude note to someone impacted by your work."
  }
];

function generateRoutine({
  minutes,
  profile
}: {
  minutes: number;
  profile: (typeof energyProfiles)[number]["id"];
}) {
  if (minutes < 30) {
    return [
      "Set a 20-minute timer. Do a single micro-deliverable with no context switching.",
      "Spend the final 3 minutes logging what you just finished and the next first step."
    ];
  }
  if (minutes < 60) {
    return [
      "Bookend the block with a one-minute breath set and a one-minute note to future you.",
      blockSuggestions[profile].focus
    ];
  }
  if (minutes < 90) {
    return [
      blockSuggestions[profile].warmup,
      blockSuggestions[profile].focus,
      "Insert a 5-minute midpoint audit: what is the friction? Remove it immediately."
    ];
  }
  return [
    blockSuggestions[profile].warmup,
    blockSuggestions[profile].focus,
    blockSuggestions[profile].reinforcement
  ];
}

export function RoutineBuilder() {
  const [minutes, setMinutes] = useState(75);
  const [profile, setProfile] =
    useState<(typeof energyProfiles)[number]["id"]>("medium");
  const [capacity, setCapacity] = useState("dawn");

  const recommendations = useMemo(
    () =>
      generateRoutine({
        minutes,
        profile
      }),
    [minutes, profile]
  );

  const suggestedMilestone = blockSuggestions[profile].weeklyMilestone;

  return (
    <section className="glass-panel relative overflow-hidden p-8">
      <div className="absolute inset-0 opacity-80">
        <div className="gridlines absolute inset-0" />
      </div>
      <div className="relative space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Routine Forge</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-300">
              Turn available time + energy into a reliable execution plan.
              Discipline loves clarity.
            </p>
          </div>
          <div className="text-right">
            <p className="section-heading mb-1">Available minutes</p>
            <p className="text-3xl font-semibold text-primary-200">
              {minutes}m
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700/40 bg-slate-950/80 p-5">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <label className="flex-1 text-sm text-slate-200">
              Choose the block length you can consistently protect.
              <input
                type="range"
                min={15}
                max={150}
                step={5}
                value={minutes}
                onChange={(event) => setMinutes(Number(event.target.value))}
                className="mt-3 w-full accent-primary-400"
              />
            </label>
            <div className="flex flex-1 flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
                Energy profile
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {energyProfiles.map(({ id, label, description, palette }) => {
                  const active = profile === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setProfile(id)}
                      className={`relative overflow-hidden rounded-xl border px-4 py-3 text-left transition-all ${
                        active
                          ? "border-primary-300/80 bg-primary-500/10 shadow-glow"
                          : "border-slate-700/40 bg-slate-900/50 hover:border-slate-500/80"
                      }`}
                    >
                      <div
                        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${palette} opacity-60`}
                      />
                      <div className="relative">
                        <p className="text-sm font-semibold text-white">
                          {label}
                        </p>
                        <p className="mt-1 text-xs text-slate-200/90">
                          {description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-700/40 bg-slate-950/70 p-6">
            <p className="section-heading mb-2">Capacity Anchor</p>
            <div className="grid gap-4">
              {capacityArchetypes.map(({ id, label, cue, reset }) => {
                const active = capacity === id;
                return (
                  <button
                    key={id}
                    onClick={() => setCapacity(id)}
                    className={`rounded-xl border p-4 text-left transition-all ${
                      active
                        ? "border-primary-300/70 bg-primary-500/15 shadow-glow"
                        : "border-slate-800/70 bg-slate-900/50 hover:border-slate-600/70"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-base font-semibold text-white">
                        {label}
                      </p>
                      {active && (
                        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-200">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-slate-300">{cue}</p>
                    <p className="mt-2 text-xs text-slate-400">
                      Reset ritual: {reset}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-700/40 bg-slate-950/70 p-6">
            <p className="section-heading mb-2">Your Routine Recipe</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${profile}-${minutes}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-3 text-sm text-slate-200"
              >
                {recommendations.map((recommendation) => (
                  <div
                    key={recommendation}
                    className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-4"
                  >
                    {recommendation}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
            <div className="mt-6 rounded-xl border border-primary-400/30 bg-primary-500/10 p-4 text-sm text-primary-100">
              <p className="text-xs uppercase tracking-[0.3em] text-primary-200">
                Weekly milestone
              </p>
              {suggestedMilestone}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
