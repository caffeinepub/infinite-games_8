import { useEffect, useState } from "react";
import type { Settings, Theme } from "../hooks/useSettings";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSave: (settings: Settings) => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  settings,
  onSave,
}: SettingsModalProps) {
  const [localTheme, setLocalTheme] = useState<Theme>(settings.theme);
  const [localPanicKey, setLocalPanicKey] = useState(settings.panicKey);
  const [saved, setSaved] = useState(false);
  const [capturingKey, setCapturingKey] = useState(false);

  useEffect(() => {
    setLocalTheme(settings.theme);
    setLocalPanicKey(settings.panicKey);
  }, [settings]);

  useEffect(() => {
    if (!capturingKey) return;
    const handler = (e: KeyboardEvent) => {
      e.preventDefault();
      setLocalPanicKey(e.key);
      setCapturingKey(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [capturingKey]);

  const handleSave = () => {
    onSave({ theme: localTheme, panicKey: localPanicKey });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div className="relative w-full max-w-md mx-4 rounded-2xl border border-border bg-card shadow-[0_0_60px_oklch(0.55_0.22_293/0.3)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚙️</span>
            <h2 className="text-sm uppercase tracking-widest font-bold text-foreground">
              Settings
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close settings"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-6">
          {/* Theme */}
          <div>
            <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-3">
              Appearance
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Theme</span>
              <div className="flex rounded-lg overflow-hidden border border-border">
                <button
                  type="button"
                  onClick={() => setLocalTheme("dark")}
                  className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                    localTheme === "dark"
                      ? "bg-accent text-white"
                      : "bg-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  🌙 Dark
                </button>
                <button
                  type="button"
                  onClick={() => setLocalTheme("light")}
                  className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                    localTheme === "light"
                      ? "bg-accent text-white"
                      : "bg-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  ☀️ Light
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Panic Key */}
          <div>
            <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-1">
              Panic Key
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              Press this key to instantly redirect to Google.com. Useful for
              quick escapes.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={localPanicKey}
                  onChange={(e) => setLocalPanicKey(e.target.value)}
                  placeholder="e.g. Escape, F1, p"
                  className="w-full px-3 py-2 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              <button
                type="button"
                onClick={() => setCapturingKey(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  capturingKey
                    ? "bg-accent/20 border-accent text-accent animate-pulse"
                    : "bg-muted border-border text-muted-foreground hover:text-foreground hover:border-accent/40"
                }`}
              >
                {capturingKey ? "Press key..." : "Capture"}
              </button>
            </div>
            {localPanicKey && (
              <p className="mt-2 text-xs text-muted-foreground">
                Current key:{" "}
                <span className="font-mono text-accent px-1.5 py-0.5 bg-accent/10 rounded text-xs">
                  {localPanicKey}
                </span>
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Tab Cloak info */}
          <div>
            <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-1">
              Tab Cloak
            </p>
            <p className="text-xs text-muted-foreground">
              Tab is cloaked as{" "}
              <span className="text-foreground font-medium">Google</span> with
              Google&apos;s favicon. Active on page load.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className={`px-6 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 ${
              saved
                ? "bg-green-600 shadow-none"
                : "bg-gradient-to-r from-[oklch(0.38_0.18_293)] to-[oklch(0.62_0.25_300)] shadow-[0_0_15px_oklch(0.55_0.22_293/0.3)] hover:shadow-[0_0_25px_oklch(0.55_0.22_293/0.5)]"
            }`}
          >
            {saved ? "✓ Saved!" : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
