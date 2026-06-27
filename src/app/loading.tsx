export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-overlay flex flex-col items-center justify-center bg-bg-primary"
      aria-label="Loading page content"
      role="status"
    >
      {/* Decorative radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Animated logo / spinner */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Pulsing heart icon */}
        <div className="relative">
          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            className="animate-barbie-float text-accent"
            aria-hidden="true"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="currentColor"
            />
          </svg>
          {/* Sparkle ring */}
          <div className="absolute inset-0 -m-3 rounded-full border-2 border-accent/30 animate-[skeleton-pulse_1.5s_ease-in-out_infinite]" />
        </div>

        {/* Shimmer bar */}
        <div className="w-48 h-1.5 rounded-full bg-bg-elevated overflow-hidden">
          <div className="h-full w-full animate-barbie-shimmer rounded-full" />
        </div>

        {/* Loading text */}
        <p className="font-body text-sm text-text-muted tracking-wide animate-[skeleton-pulse_2s_ease-in-out_infinite]">
          Loading...
        </p>
      </div>

      {/* Screen reader live region */}
      <span className="sr-only" aria-live="polite">
        Page is loading, please wait.
      </span>
    </div>
  );
}
