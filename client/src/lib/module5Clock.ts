export type PracticeClock = {
  mode: "timed" | "untimed";
  budgetSeconds: number;
  status: "idle" | "running" | "paused" | "finished";
  elapsedMs: number;
  startedAt: number | null;
};
export function freshClock(minutes = 10): PracticeClock {
  return {
    mode: "timed",
    budgetSeconds: minutes * 60,
    status: "idle",
    elapsedMs: 0,
    startedAt: null,
  };
}
export function elapsedMs(clock: PracticeClock, now: number) {
  return (
    clock.elapsedMs +
    (clock.status === "running" && clock.startedAt !== null
      ? Math.max(0, now - clock.startedAt)
      : 0)
  );
}
export function clockSeconds(clock: PracticeClock, now: number) {
  return Math.floor(elapsedMs(clock, now) / 1000);
}
export function clockView(clock: PracticeClock, now: number) {
  const elapsed = clockSeconds(clock, now);
  const remaining = Math.max(0, clock.budgetSeconds - elapsed);
  return {
    elapsed,
    remaining,
    overtime: Math.max(0, elapsed - clock.budgetSeconds),
    expired: clock.mode === "timed" && elapsed >= clock.budgetSeconds,
  };
}
export function startClock(clock: PracticeClock, now: number): PracticeClock {
  if (clock.status === "running" || clock.status === "finished") return clock;
  return { ...clock, status: "running", startedAt: now };
}
export function pauseClock(clock: PracticeClock, now: number): PracticeClock {
  return clock.status === "running"
    ? {
        ...clock,
        status: "paused",
        elapsedMs: elapsedMs(clock, now),
        startedAt: null,
      }
    : clock;
}
export function finishClock(clock: PracticeClock, now: number): PracticeClock {
  return clock.status === "idle" || clock.status === "finished"
    ? clock
    : {
        ...clock,
        status: "finished",
        elapsedMs: elapsedMs(clock, now),
        startedAt: null,
      };
}
export function formatClock(seconds: number) {
  const whole = Math.max(0, Math.floor(seconds));
  return `${Math.floor(whole / 60)
    .toString()
    .padStart(2, "0")}:${(whole % 60).toString().padStart(2, "0")}`;
}
export function parseClock(value: unknown, minutes: number): PracticeClock {
  const fallback = freshClock(minutes);
  if (!value || typeof value !== "object" || Array.isArray(value))
    return fallback;
  const c = value as Partial<PracticeClock>;
  const status = ["idle", "running", "paused", "finished"].includes(
    String(c.status)
  )
    ? c.status!
    : "idle";
  const elapsed =
    typeof c.elapsedMs === "number" &&
    Number.isFinite(c.elapsedMs) &&
    c.elapsedMs >= 0
      ? c.elapsedMs
      : 0;
  const start =
    typeof c.startedAt === "number" &&
    Number.isFinite(c.startedAt) &&
    c.startedAt >= 0
      ? c.startedAt
      : null;
  return {
    mode: c.mode === "untimed" ? "untimed" : "timed",
    budgetSeconds:
      typeof c.budgetSeconds === "number" &&
      Number.isInteger(c.budgetSeconds) &&
      c.budgetSeconds >= 60 &&
      c.budgetSeconds <= 7200
        ? c.budgetSeconds
        : fallback.budgetSeconds,
    status: status === "running" && start === null ? "paused" : status,
    elapsedMs: status === "idle" ? 0 : elapsed,
    startedAt: status === "running" ? start : null,
  };
}
