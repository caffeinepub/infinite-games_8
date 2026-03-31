import { useEffect } from "react";

export function useTabCloak() {
  useEffect(() => {
    // Cloak tab as Google
    document.title = "Google";

    // Set favicon to Google's favicon
    const existingFavicon =
      document.querySelector<HTMLLinkElement>('link[rel*="icon"]');
    if (existingFavicon) {
      existingFavicon.href = "https://www.google.com/favicon.ico";
    } else {
      const link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/x-icon";
      link.href = "https://www.google.com/favicon.ico";
      document.head.appendChild(link);
    }
  }, []);
}
