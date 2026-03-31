import { useState } from "react";
import { launchGame, resolveCover } from "../data/games";
import type { Game } from "../data/games";

interface GameCardProps {
  game: Game;
  onPlay: (game: Game) => void;
  isRecent?: boolean;
}

export function GameCard({ game, onPlay, isRecent }: GameCardProps) {
  const [launching, setLaunching] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handlePlay = async () => {
    onPlay(game);
    setLaunching(true);
    try {
      await launchGame(game.url);
    } catch {
      // Silently fail — popup might be blocked
    } finally {
      setLaunching(false);
    }
  };

  const coverSrc = resolveCover(game.cover);

  return (
    <article
      className={`group relative flex flex-col rounded-xl overflow-hidden border border-border bg-card transition-all duration-200 hover:border-accent hover:shadow-[0_0_20px_oklch(0.55_0.22_293/0.25)] cursor-pointer ${
        isRecent ? "ring-1 ring-accent/30" : ""
      }`}
    >
      {/* Cover image */}
      <div className="relative w-full aspect-video overflow-hidden bg-muted flex-shrink-0">
        {!imgError ? (
          <img
            src={coverSrc}
            alt={game.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[oklch(0.15_0.05_293)] to-[oklch(0.20_0.08_300)]">
            <span className="text-3xl opacity-50">🎮</span>
          </div>
        )}
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        {/* Featured badge */}
        {game.featured && (
          <span className="absolute top-2 left-2 text-[9px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded bg-[oklch(0.55_0.22_293/0.85)] text-white">
            ✦ Featured
          </span>
        )}
        {/* Special tags */}
        {game.special && game.special.length > 0 && (
          <div className="absolute top-2 right-2 flex gap-1">
            {game.special.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-black/60 text-muted-foreground border border-border/50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-3 gap-1">
        <h3 className="font-bold text-foreground text-sm leading-tight line-clamp-2 group-hover:text-accent transition-colors">
          {game.name}
        </h3>
        {game.author && (
          <p className="text-[11px] text-muted-foreground truncate">
            {game.author}
          </p>
        )}
      </div>

      {/* Play button footer */}
      <div className="px-3 pb-3">
        <button
          type="button"
          disabled={launching}
          className="w-full py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[oklch(0.38_0.18_293)] to-[oklch(0.62_0.25_300)] hover:from-[oklch(0.45_0.20_293)] hover:to-[oklch(0.68_0.28_300)] transition-all duration-200 shadow-[0_0_10px_oklch(0.55_0.22_293/0.3)] hover:shadow-[0_0_20px_oklch(0.55_0.22_293/0.5)] disabled:opacity-60 disabled:cursor-wait"
          onClick={handlePlay}
          data-ocid="game.primary_button"
        >
          {launching ? "Loading…" : "Play Now"}
        </button>
      </div>
    </article>
  );
}
