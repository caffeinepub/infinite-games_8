interface HeaderProps {
  onOpenSettings: () => void;
  currentSection: string;
  onNavigate: (section: string) => void;
}

export function Header({
  onOpenSettings,
  currentSection,
  onNavigate,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 relative flex items-center justify-center">
              <svg
                width="32"
                height="16"
                viewBox="0 0 32 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Infinity logo"
              >
                <title>Infinity logo</title>
                <path
                  d="M16 8 C16 4 18.7 1 22 1 C25.3 1 28 4 28 8 C28 12 25.3 15 22 15 C18.7 15 16 12 16 8 Z M16 8 C16 4 13.3 1 10 1 C6.7 1 4 4 4 8 C4 12 6.7 15 10 15 C13.3 15 16 12 16 8 Z"
                  stroke="oklch(0.62 0.25 300)"
                  strokeWidth="1.5"
                  fill="none"
                  className="drop-shadow-[0_0_4px_oklch(0.62_0.25_300/0.8)]"
                />
              </svg>
            </div>
            <span className="text-sm font-bold uppercase tracking-widest text-foreground group-hover:text-accent transition-colors">
              Infinite Games
            </span>
          </button>

          {/* Nav */}
          <nav className="hidden sm:flex items-center gap-1">
            {[
              { id: "home", label: "Home" },
              { id: "games", label: "Games" },
              { id: "browser", label: "Browser" },
            ].map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentSection === item.id
                    ? "text-accent bg-accent/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenSettings}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Settings"
            >
              <span>⚙️</span>
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
