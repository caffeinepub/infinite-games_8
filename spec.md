# Infinite Games

## Current State
The app has a hardcoded `games.ts` with 20 math educational website links (Coolmath Games, Khan Academy, etc.). GameCard shows a text-only card with emoji icon and genre badge. Games open via iframe wrapper pointing to external URLs.

## Requested Changes (Diff)

### Add
- Dynamic game loading from `https://cdn.jsdelivr.net/gh/gn-math/assets@main/zones.json`
- Cover image thumbnails for each game card using `https://cdn.jsdelivr.net/gh/gn-math/covers@main/{id}.png`
- Loading state while fetching zones from CDN
- Game play logic: fetch the game's HTML from `https://cdn.jsdelivr.net/gh/gn-math/html@main/{id}.html` then write it into a blank tab's iframe

### Modify
- `Game` interface in `games.ts`: replace hardcoded list with CDN-based interface matching `{ id, name, cover, url, author, authorLink, special?, featured? }`
- `GamesSection.tsx`: fetch games from CDN JSON on mount; show loading/error states; display all games dynamically
- `GameCard.tsx`: show cover image thumbnail instead of emoji icon; display game name and author; clicking plays via CDN HTML fetch
- `App.tsx`: update `handlePlay` to fetch game HTML from CDN URL then write to blank tab

### Remove
- Hardcoded `GAMES` array of 20 math website links

## Implementation Plan
1. Rewrite `src/frontend/src/data/games.ts` - new `Game` interface, CDN URL constants, helper to resolve cover/html URLs
2. Rewrite `src/frontend/src/components/GamesSection.tsx` - useEffect to fetch zones.json, loading/error states, pass fetched games to grid
3. Rewrite `src/frontend/src/components/GameCard.tsx` - cover image thumbnail, game name/author display
4. Update `src/frontend/src/App.tsx` - update handlePlay: for games with http URLs open directly, for CDN HTML games fetch the HTML and write to blank tab
