import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

export interface Settings {
  theme: Theme;
  panicKey: string;
}

const STORAGE_KEY = "infinite_games_settings";

const defaultSettings: Settings = {
  theme: "dark",
  panicKey: "Escape",
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultSettings, ...JSON.parse(stored) };
      }
    } catch {
      // ignore
    }
    return defaultSettings;
  });

  // Apply theme to html element
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", settings.theme);
    if (settings.theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [settings.theme]);

  // Panic key listener
  useEffect(() => {
    if (!settings.panicKey) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = settings.panicKey.toLowerCase();
      const pressed = e.key.toLowerCase();
      if (pressed === key) {
        window.location.href = "https://www.google.com";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [settings.panicKey]);

  const updateTheme = useCallback((theme: Theme) => {
    setSettings((prev) => ({ ...prev, theme }));
  }, []);

  const updatePanicKey = useCallback((panicKey: string) => {
    setSettings((prev) => ({ ...prev, panicKey }));
  }, []);

  const saveSettings = useCallback((newSettings: Settings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    } catch {
      // ignore
    }
  }, []);

  return { settings, updateTheme, updatePanicKey, saveSettings };
}
