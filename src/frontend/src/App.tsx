import { useRef, useState } from "react";
import { GamesSection } from "./components/GamesSection";
import { Header } from "./components/Header";
import { InfinitySymbol } from "./components/InfinitySymbol";
import { ParticleCanvas } from "./components/ParticleCanvas";
import { ProxyBrowser } from "./components/ProxyBrowser";
import { SettingsModal } from "./components/SettingsModal";
import type { Game } from "./data/games";
import { useRecentlyPlayed } from "./hooks/useRecentlyPlayed";
import { useSettings } from "./hooks/useSettings";
import { useTabCloak } from "./hooks/useTabCloak";

function openInBlankTab(url: string) {
  const w = window.open("", "_blank");
  if (w) {
    w.document.write(
      `<html><head><title>Game</title><style>*{margin:0;padding:0;overflow:hidden}</style></head><body><iframe src="${url}" style="width:100%;height:100vh;border:none" allow="fullscreen"></iframe></body></html>`,
    );
    w.document.close();
  }
}

export default function App() {
  useTabCloak();

  const { settings, saveSettings } = useSettings();
  const { recentGames, addGame } = useRecentlyPlayed();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");
  const [heroInput, setHeroInput] = useState("");

  const gamesRef = useRef<HTMLDivElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    if (section === "games" && gamesRef.current) {
      gamesRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "browser" && browserRef.current) {
      browserRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Only track game — the actual launch is handled inside GameCard via launchGame()
  const handlePlay = (game: Game) => {
    addGame(game);
  };

  const handleHeroGo = () => {
    const val = heroInput.trim();
    if (!val) return;
    let url: string;
    if (val.startsWith("http://") || val.startsWith("https://")) {
      url = val;
    } else if (val.includes(".") && !val.includes(" ")) {
      url = `https://${val}`;
    } else {
      url = `https://duckduckgo.com/?q=${encodeURIComponent(val)}`;
    }
    openInBlankTab(url);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Layer 0: Particle canvas */}
      <ParticleCanvas />

      {/* Layer 1: Infinity symbol */}
      <InfinitySymbol />

      {/* Layer 2: Content */}
      <div className="relative z-10">
        <Header
          onOpenSettings={() => setSettingsOpen(true)}
          currentSection={currentSection}
          onNavigate={handleNavigate}
        />

        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left: Large infinity symbol hero display */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                <svg
                  width="400"
                  height="200"
                  viewBox="0 0 400 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="infinity-bg"
                  style={{
                    filter: "drop-shadow(0 0 40px oklch(0.55 0.22 293 / 0.6))",
                  }}
                  aria-label="Animated infinity symbol"
                  role="img"
                >
                  <title>Animated infinity symbol</title>
                  <defs>
                    <linearGradient
                      id="heroInfinityGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#5B2EA6" />
                      <stop offset="40%" stopColor="#A855F7" />
                      <stop offset="60%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#5B2EA6" />
                    </linearGradient>
                    <filter id="heroGlow">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <path
                    d="M200 100 C200 65 225 38 258 38 C291 38 320 65 320 100 C320 135 291 162 258 162 C225 162 200 135 200 100 Z M200 100 C200 65 175 38 142 38 C109 38 80 65 80 100 C80 135 109 162 142 162 C175 162 200 135 200 100 Z"
                    stroke="url(#heroInfinityGrad)"
                    strokeWidth="10"
                    fill="none"
                    filter="url(#heroGlow)"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[oklch(0.55_0.22_293/0.15)] blur-2xl" />
                <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[oklch(0.62_0.25_300/0.15)] blur-2xl" />
              </div>
            </div>

            {/* Right: Hero text + proxy input */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none text-foreground mb-4">
                Unlimited
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.55_0.22_293)] via-[oklch(0.65_0.27_300)] to-[oklch(0.55_0.22_293)]">
                  Adventures
                </span>
                <br />
                Await.
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-md">
                Play 100+ unblocked games, browse the web anonymously, and enjoy
                a distraction-free gaming experience.
              </p>

              {/* Quick proxy input in hero */}
              <div className="flex gap-2 max-w-md">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    🔍
                  </span>
                  <input
                    type="text"
                    placeholder="Search or enter URL..."
                    value={heroInput}
                    onChange={(e) => setHeroInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleHeroGo();
                    }}
                    className="w-full pl-9 pr-4 py-3 rounded-xl bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                    data-ocid="hero.search_input"
                  />
                </div>
                <button
                  type="button"
                  className="px-5 py-3 rounded-xl font-semibold text-white text-sm bg-gradient-to-r from-[oklch(0.38_0.18_293)] to-[oklch(0.62_0.25_300)] hover:from-[oklch(0.45_0.20_293)] hover:to-[oklch(0.68_0.28_300)] transition-all duration-200 shadow-[0_0_15px_oklch(0.55_0.22_293/0.3)]"
                  onClick={handleHeroGo}
                  data-ocid="hero.primary_button"
                >
                  Go
                </button>
              </div>

              <div className="mt-5 flex flex-wrap gap-3 justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={() => handleNavigate("games")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-accent/30 text-accent hover:bg-accent/10 transition-colors"
                  data-ocid="nav.games.link"
                >
                  🎮 Browse Games
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("browser")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-border text-muted-foreground hover:text-foreground hover:border-accent/30 transition-colors"
                  data-ocid="nav.browser.link"
                >
                  🦆 Proxy Browser
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Games Section */}
        <div ref={gamesRef}>
          <GamesSection recentGames={recentGames} onPlay={handlePlay} />
        </div>

        {/* Proxy Browser Section */}
        <div ref={browserRef}>
          <ProxyBrowser />
        </div>

        {/* Footer */}
        <footer className="relative z-10 border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <svg
                  width="20"
                  height="10"
                  viewBox="0 0 32 16"
                  fill="none"
                  aria-label="Infinity logo"
                >
                  <title>Infinity logo</title>
                  <path
                    d="M16 8 C16 4 18.7 1 22 1 C25.3 1 28 4 28 8 C28 12 25.3 15 22 15 C18.7 15 16 12 16 8 Z M16 8 C16 4 13.3 1 10 1 C6.7 1 4 4 4 8 C4 12 6.7 15 10 15 C13.3 15 16 12 16 8 Z"
                    stroke="oklch(0.62 0.25 300)"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                <span className="text-xs font-semibold uppercase tracking-widest text-foreground">
                  Infinite Games
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} &mdash; Built with{" "}
                <span aria-label="love">♥</span> using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  caffeine.ai
                </a>
              </p>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setSettingsOpen(true)}
                  className="text-xs text-muted-foreground hover:text-accent transition-colors"
                  data-ocid="footer.settings.button"
                >
                  Settings
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("games")}
                  className="text-xs text-muted-foreground hover:text-accent transition-colors"
                  data-ocid="footer.games.link"
                >
                  Games
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("browser")}
                  className="text-xs text-muted-foreground hover:text-accent transition-colors"
                  data-ocid="footer.browser.link"
                >
                  Browser
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onSave={(newSettings) => {
          saveSettings(newSettings);
          setSettingsOpen(false);
        }}
      />
    </div>
  );
}
