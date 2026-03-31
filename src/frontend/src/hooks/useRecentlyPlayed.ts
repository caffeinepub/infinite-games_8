import { useCallback, useState } from "react";
import type { Game } from "../data/games";

const STORAGE_KEY = "infinite_games_recent";
const MAX_RECENT = 10;

function loadRecent(): Game[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return [];
}

function saveRecent(games: Game[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
  } catch {
    // ignore
  }
}

export function useRecentlyPlayed() {
  const [recentGames, setRecentGames] = useState<Game[]>(loadRecent);

  const addGame = useCallback((game: Game) => {
    setRecentGames((prev) => {
      const filtered = prev.filter((g) => g.id !== game.id);
      const updated = [game, ...filtered].slice(0, MAX_RECENT);
      saveRecent(updated);
      return updated;
    });
  }, []);

  return { recentGames, addGame };
}
