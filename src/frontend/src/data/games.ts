export interface Game {
  id: number;
  name: string;
  cover: string; // raw from CDN e.g. "{COVER_URL}/0.png"
  url: string; // raw from CDN e.g. "{HTML_URL}/0.html" or "https://..."
  author?: string;
  authorLink?: string;
  featured?: boolean;
  special?: string[];
}

export const COVER_URL = "https://cdn.jsdelivr.net/gh/gn-math/covers@main";
export const HTML_URL = "https://cdn.jsdelivr.net/gh/gn-math/html@main";
export const ZONES_URL =
  "https://cdn.jsdelivr.net/gh/gn-math/assets@main/zones.json";

export function resolveCover(cover: string): string {
  return cover
    .replace("{COVER_URL}", COVER_URL)
    .replace("{HTML_URL}", HTML_URL);
}

export function resolveUrl(url: string): string {
  return url.replace("{COVER_URL}", COVER_URL).replace("{HTML_URL}", HTML_URL);
}

export function isDirectUrl(url: string): boolean {
  return url.startsWith("https://") || url.startsWith("http://");
}

export async function launchGame(url: string): Promise<void> {
  if (isDirectUrl(url)) {
    window.open(url, "_blank");
  } else {
    const resolved = resolveUrl(url);
    const response = await fetch(`${resolved}?t=${Date.now()}`);
    const html = await response.text();
    const w = window.open("", "_blank");
    if (w) {
      w.document.open();
      w.document.write(html);
      w.document.close();
    }
  }
}
