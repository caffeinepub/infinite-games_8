import { useState } from "react";

function openInBlankTab(url: string) {
  const w = window.open("", "_blank");
  if (w) {
    w.document.write(
      `<html><head><title>Browser</title><style>*{margin:0;padding:0;overflow:hidden}</style></head><body><iframe src="${url}" style="width:100%;height:100vh;border:none" allow="fullscreen"></iframe></body></html>`,
    );
    w.document.close();
  }
}

const QUICK_LINKS = [
  "youtube.com",
  "wikipedia.org",
  "github.com",
  "math games",
  "cool puzzles",
];

export function ProxyBrowser() {
  const [input, setInput] = useState("");

  const handleGo = () => {
    const val = input.trim();
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleGo();
  };

  return (
    <section
      id="browser"
      className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 rounded-full bg-gradient-to-b from-accent to-[oklch(0.62_0.25_300)]" />
        <h2 className="text-lg uppercase tracking-widest font-bold text-foreground">
          Proxy Browser
        </h2>
        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 font-semibold">
          DuckDuckGo
        </span>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_0_30px_oklch(0.55_0.22_293/0.1)]">
        <p className="text-sm text-muted-foreground mb-4">
          Enter a URL or search query below. It opens in a blank tab via iframe
          injection &mdash; keeping the appearance of a blank page.
        </p>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              🦆
            </span>
            <input
              type="text"
              placeholder="Search DuckDuckGo or enter a URL..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
            />
          </div>
          <button
            type="button"
            onClick={handleGo}
            className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[oklch(0.38_0.18_293)] to-[oklch(0.62_0.25_300)] hover:from-[oklch(0.45_0.20_293)] hover:to-[oklch(0.68_0.28_300)] transition-all duration-200 shadow-[0_0_15px_oklch(0.55_0.22_293/0.3)] hover:shadow-[0_0_25px_oklch(0.55_0.22_293/0.5)] whitespace-nowrap"
          >
            Go →
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {QUICK_LINKS.map((q) => (
            <button
              type="button"
              key={q}
              onClick={() => setInput(q)}
              className="text-xs px-3 py-1 rounded-full bg-muted hover:bg-accent/10 text-muted-foreground hover:text-accent border border-border hover:border-accent/30 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
