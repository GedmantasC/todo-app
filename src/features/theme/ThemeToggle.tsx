"use client";

import { useState } from "react";
import { THEME_COOKIE, type Theme } from "./theme";

/**
 * `initial` comes from the cookie, read by the server in the root layout, so the first paint
 * already has the right colours. Without a cookie, the CSS follows the system setting.
 *
 * The browser writes the cookie itself, at once. (A Server Action would also work, but a click
 * followed straight by navigation cancels its request and the choice is lost.)
 */
export function ThemeToggle({ initial }: { initial?: Theme }) {
  const [theme, setTheme] = useState<Theme | undefined>(initial);

  function toggle() {
    const current = theme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next: Theme = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    setTheme(next);
  }

  const isDark = theme === "dark";
  return (
    <button
      type="button"
      id="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
