export function InfinitySymbol() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[1] pointer-events-none select-none"
      aria-hidden="true"
    >
      <svg
        className="infinity-bg"
        width="600"
        height="300"
        viewBox="0 0 600 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.18 }}
        aria-label="Decorative infinity symbol"
        role="img"
      >
        <title>Decorative infinity symbol</title>
        <defs>
          <filter
            id="infinityGlow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="infinityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5B2EA6" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <path
          d="M300 150 C300 100 340 60 390 60 C440 60 480 100 480 150 C480 200 440 240 390 240 C340 240 300 200 300 150 Z M300 150 C300 100 260 60 210 60 C160 60 120 100 120 150 C120 200 160 240 210 240 C260 240 300 200 300 150 Z"
          stroke="url(#infinityGrad)"
          strokeWidth="12"
          fill="none"
          filter="url(#infinityGlow)"
        />
        <path
          d="M300 150 C300 118 328 90 360 90 C392 90 420 118 420 150 C420 182 392 210 360 210 C328 210 300 182 300 150 Z M300 150 C300 118 272 90 240 90 C208 90 180 118 180 150 C180 182 208 210 240 210 C272 210 300 182 300 150 Z"
          stroke="#6D28D9"
          strokeWidth="3"
          fill="none"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
