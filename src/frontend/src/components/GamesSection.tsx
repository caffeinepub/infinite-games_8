import { useEffect, useState } from "react";
import { ZONES_URL } from "../data/games";
import type { Game } from "../data/games";
import { GameCard } from "./GameCard";

interface GamesSectionProps {
  recentGames: Game[];
  onPlay: (game: Game) => void;
}

export function GamesSection({ recentGames, onPlay }: GamesSectionProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(ZONES_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: Game[]) => {
        if (cancelled) return;
        // Filter out the Discord link (id = -1) and any non-game entries
        const filtered = data.filter((z) => z.id >= 0);
        setGames(filtered);
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message || "Failed to load games");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredGames = games.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section
      id="games"
      className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Recently Played */}
      {recentGames.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-accent to-[oklch(0.62_0.25_300)]" />
            <h2 className="text-sm uppercase tracking-widest font-semibold text-accent">
              Recently Played
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {recentGames.map((game) => (
              <GameCard
                key={`recent-${game.id}`}
                game={game}
                onPlay={onPlay}
                isRecent
              />
            ))}
          </div>
        </div>
      )}

      {/* Search + heading */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-accent to-[oklch(0.62_0.25_300)]" />
          <h2 className="text-lg uppercase tracking-widest font-bold text-foreground">
            All Games
          </h2>
          {!loading && (
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {filteredGames.length}
            </span>
          )}
        </div>
        <div className="relative w-full sm:w-72">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
            data-ocid="games.search_input"
          />
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div
          className="flex flex-col items-center justify-center py-24 gap-4"
          data-ocid="games.loading_state"
        >
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-accent/20" />
            <div className="absolute inset-0 rounded-full border-2 border-t-accent border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          </div>
          <p className="text-sm text-muted-foreground">Loading games…</p>
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div
          className="flex flex-col items-center justify-center py-20 gap-3"
          data-ocid="games.error_state"
        >
          <div className="text-4xl">⚠️</div>
          <p className="text-sm text-muted-foreground">
            Failed to load games: {error}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-xs text-accent hover:underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Games grid */}
      {!loading &&
        !error &&
        (filteredGames.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredGames.map((game, i) => (
              <GameCard
                key={game.id}
                game={game}
                onPlay={onPlay}
                data-ocid={`games.item.${i + 1}`}
              />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="games.empty_state"
          >
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-sm">No games found for &ldquo;{search}&rdquo;</p>
            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-3 text-xs text-accent hover:underline"
            >
              Clear search
            </button>
          </div>
        ))}
    </section>
  );
}
