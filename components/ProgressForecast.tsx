"use client";

import { useMemo, useState } from "react";

function calculateMomentumScore({
  streakDays,
  habitStrength,
  misses
}: {
  streakDays: number;
  habitStrength: number;
  misses: number;
}) {
  const streakFactor = Math.min(streakDays / 21, 1); // 3-week streak plateau
  const consistencyPenalty = Math.max(0, 1 - misses * 0.18);
  const strengthFactor = habitStrength / 100;
  return Math.round(
    (0.45 * streakFactor + 0.35 * strengthFactor + 0.2 * consistencyPenalty) *
      100
  );
}

const milestoneMap = [
  {
    range: [0, 40],
    headline: "Design a fail-proof environment.",
    action:
      "Audit friction points. Remove one distraction, add one pre-commitment cue."
  },
  {
    range: [41, 70],
    headline: "Increase accountability surface area.",
    action:
      "Share daily check-ins with a partner or public tracker. Celebrate consistency streaks."
  },
  {
    range: [71, 85],
    headline: "Sharpen feedback loops.",
    action:
      "Track leading indicators, not just streaks. Adjust weekly experiment targets."
  },
  {
    range: [86, 100],
    headline: "Compound identity upgrades.",
    action:
      "Mentor someone else. Teaching your system reinforces your own standards."
  }
];

const horizonProjections = [
  { weeks: 2, multiplier: 1.08 },
  { weeks: 6, multiplier: 1.18 },
  { weeks: 12, multiplier: 1.28 }
];

function getMilestone(score: number) {
  return (
    milestoneMap.find(
      ({ range: [min, max] }) => score >= min && score <= max
    ) ?? milestoneMap[0]
  );
}

export function ProgressForecast() {
  const [streak, setStreak] = useState(6);
  const [habitStrength, setHabitStrength] = useState(55);
  const [weeklyMisses, setWeeklyMisses] = useState(1);

  const momentumScore = useMemo(
    () =>
      calculateMomentumScore({
        streakDays: streak,
        habitStrength,
        misses: weeklyMisses
      }),
    [streak, habitStrength, weeklyMisses]
  );

  const milestone = useMemo(
    () => getMilestone(momentumScore),
    [momentumScore]
  );

  return (
    <section className="glass-panel relative overflow-hidden p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,118,246,0.4),transparent_55%)] opacity-80" />
      <div className="relative space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Momentum Forecast
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-300">
              Small numbers reveal where discipline will stick or slip. Adjust
              your system before motivation fades.
            </p>
          </div>
          <div className="text-right">
            <p className="section-heading mb-1">Momentum score</p>
            <p className="text-4xl font-semibold text-primary-200">
              {momentumScore}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-5 rounded-2xl border border-slate-700/50 bg-slate-950/70 p-6">
            <div>
              <label className="flex items-center justify-between text-sm text-slate-200">
                Streak days
                <span className="text-base font-semibold text-primary-200">
                  {streak}
                </span>
              </label>
              <input
                type="range"
                min={0}
                max={60}
                value={streak}
                onChange={(event) => setStreak(Number(event.target.value))}
                className="mt-2 w-full accent-primary-400"
              />
            </div>
            <div>
              <label className="flex items-center justify-between text-sm text-slate-200">
                Habit strength (self-rated)
                <span className="text-base font-semibold text-primary-200">
                  {habitStrength}
                </span>
              </label>
              <input
                type="range"
                min={10}
                max={100}
                value={habitStrength}
                onChange={(event) => setHabitStrength(Number(event.target.value))}
                className="mt-2 w-full accent-primary-400"
              />
            </div>
            <div>
              <label className="flex items-center justify-between text-sm text-slate-200">
                Misses per week
                <span className="text-base font-semibold text-primary-200">
                  {weeklyMisses}
                </span>
              </label>
              <input
                type="range"
                min={0}
                max={4}
                value={weeklyMisses}
                onChange={(event) =>
                  setWeeklyMisses(Number(event.target.value))
                }
                className="mt-2 w-full accent-primary-400"
              />
            </div>
          </div>

          <div className="space-y-5 rounded-2xl border border-slate-700/50 bg-slate-950/70 p-6">
            <div className="rounded-xl border border-primary-400/40 bg-primary-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.32em] text-primary-200">
                Next move
              </p>
              <p className="mt-2 text-lg font-semibold text-primary-50">
                {milestone.headline}
              </p>
              <p className="mt-2 text-sm text-primary-100/80">
                {milestone.action}
              </p>
            </div>
            <div className="space-y-3 rounded-xl border border-slate-800/70 bg-slate-900/60 p-4">
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
                Trajectory
              </p>
              {horizonProjections.map(({ weeks, multiplier }) => {
                const projected = Math.min(
                  100,
                  Math.round(momentumScore * multiplier)
                );
                return (
                  <div
                    key={weeks}
                    className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-950/60 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">
                        +{weeks} weeks
                      </p>
                      <p className="text-xs text-slate-400">
                        Assuming you sustain today&apos;s consistency.
                      </p>
                    </div>
                    <span className="text-xl font-semibold text-primary-200">
                      {projected}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
