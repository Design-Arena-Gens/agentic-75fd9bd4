"use client";

import { useMemo, useState } from "react";

type FocusKey = "mindset" | "health" | "craft" | "relationships";

const focuses: Record<
  FocusKey,
  {
    title: string;
    description: string;
    keystoneHabit: string;
    microHabits: string[];
    mantra: string;
  }
> = {
  mindset: {
    title: "Mental Clarity",
    description:
      "Improve focus and emotional control so you execute with intention instead of impulse.",
    keystoneHabit: "10-minute reflection block",
    microHabits: [
      "Start each day with a single-line intention",
      "Capture distractions in a trusted inbox",
      "Rate your focus at midday and adjust"
    ],
    mantra: "Discipline is choosing what matters more."
  },
  health: {
    title: "Energy Foundation",
    description:
      "Create physical consistency so your body supports the work your goals demand.",
    keystoneHabit: "Anchor bedtime & wake time",
    microHabits: [
      "Front-load hydration within 2 hours of waking",
      "Prep tomorrow’s first meal the night before",
      "Move for at least 5 minutes every 90 minutes"
    ],
    mantra: "Energy is earned the day before."
  },
  craft: {
    title: "Deep Work Rhythm",
    description:
      "Produce meaningful output daily by protecting your peak creative or strategic window.",
    keystoneHabit: "Daily 90-minute deep work block",
    microHabits: [
      "Plan deep work the evening prior",
      "Shut down all notifications during the block",
      "Document outcomes + the next first step"
    ],
    mantra: "Creative momentum beats perfect conditions."
  },
  relationships: {
    title: "Accountability Loop",
    description:
      "Keep commitments visible by involving the people who matter and asking for feedback.",
    keystoneHabit: "Weekly honesty review call",
    microHabits: [
      "Share the top 3 weekly priorities every Monday",
      "Review wins + misses together on Friday",
      "Ask for one candid improvement suggestion"
    ],
    mantra: "Discipline grows when others can see it."
  }
};

const identityAnchors: Record<FocusKey, string[]> = {
  mindset: [
    "I track every promise I make to myself.",
    "I close each day with an audit of my attention.",
    "I remove one friction point every week."
  ],
  health: [
    "I schedule recovery with the same respect as work.",
    "I celebrate consistency more than intensity.",
    "I leave every environment slightly better than I found it."
  ],
  craft: [
    "I document my process so tomorrow is easier.",
    "I warm up with 5-minute starter reps before deep work.",
    "I end every block by queuing the next action."
  ],
  relationships: [
    "I tell people what I’m doing before I do it.",
    "I invite accountability instead of hiding mistakes.",
    "I express gratitude for feedback even when it stings."
  ]
};

export function HabitFocusSelector() {
  const [selected, setSelected] = useState<FocusKey>("craft");
  const [identityIndex, setIdentityIndex] = useState(0);

  const focus = focuses[selected];
  const anchors = identityAnchors[selected];

  const nextMantra = useMemo(() => {
    const nextIndex = (identityIndex + 1) % anchors.length;
    return anchors[nextIndex];
  }, [anchors, identityIndex]);

  return (
    <section className="glass-panel relative overflow-hidden p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/40 via-transparent to-purple-500/30 opacity-70" />
      <div className="relative space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-white">Focus Map</h2>
          <span className="rounded-full border border-primary-400/50 bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-200">
            Choose your lever
          </span>
        </div>
        <div className="grid gap-3 text-sm text-slate-300 md:grid-cols-4">
          {(Object.keys(focuses) as FocusKey[]).map((key) => {
            const option = focuses[key];
            const active = selected === key;

            return (
              <button
                key={key}
                onClick={() => {
                  setSelected(key);
                  setIdentityIndex(0);
                }}
                className={`rounded-xl border px-4 py-3 text-left transition-all ${
                  active
                    ? "border-primary-400/80 bg-primary-500/20 text-white shadow-glow"
                    : "border-slate-700/50 bg-slate-900/40 hover:border-slate-500/70"
                }`}
              >
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
                  {option.title.split(" ")[0]}
                </p>
                <p className="mt-1 text-base font-semibold text-slate-100">
                  {option.title}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed">
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-700/40 bg-slate-950/60 p-5">
            <p className="section-heading mb-2">Keystone Habit</p>
            <h3 className="text-xl font-semibold text-white">
              {focus.keystoneHabit}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Anchor one habit that naturally enforces all other commitments in
              this pillar. Make that habit unskippable and you&apos;ll reinforce
              your identity daily.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              {focus.microHabits.map((habit) => (
                <li
                  key={habit}
                  className="flex items-start gap-3 rounded-lg border border-slate-800/80 bg-slate-900/60 p-3"
                >
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary-400" />
                  <span>{habit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-700/40 bg-slate-950/60 p-5">
            <p className="section-heading mb-2">Identity Anchor</p>
            <h3 className="text-lg font-semibold text-white">
              {anchors[identityIndex]}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Repeat this statement when you make your plan for the day and
              before your keystone habit. Identity-first discipline helps your
              brain believe the behaviors belong to you.
            </p>
            <button
              onClick={() =>
                setIdentityIndex((prev) => (prev + 1) % anchors.length)
              }
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary-400/50 bg-primary-500/20 px-4 py-2 text-sm font-medium text-primary-100 transition hover:border-primary-300 hover:bg-primary-500/30"
            >
              Rotate Mantra
            </button>
            <div className="mt-6 rounded-xl border border-primary-400/40 bg-primary-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-primary-200">
                Daily mantra
              </p>
              <p className="mt-2 text-base font-semibold text-primary-50">
                “{focus.mantra}”
              </p>
              <p className="mt-2 text-sm text-primary-100/80">
                Next up: {nextMantra}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
