"use client";

import { useState } from "react";

type Theme = "light" | "dark";

// Switches light and dark mode and saves the choice in a cookie, so the server knows it next time.
export function ThemeToggle({ initial }: { initial?: Theme }) {
  const [theme, setTheme] = useState<Theme | undefined>(initial);

  function toggle() {
    const current = theme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next: Theme = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.cookie = `theme=${next}; path=/; max-age=31536000; samesite=lax`;
    setTheme(next);
  }

  return (
    <button type="button" id="theme-toggle" onClick={toggle} aria-label="Switch light or dark mode">
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
