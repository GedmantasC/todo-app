/** Light and dark mode. index.html applies the saved theme before first paint. */
export type Theme = "light" | "dark";

export const THEME_KEY = "theme";

export function currentTheme(): Theme {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme, toggle: HTMLButtonElement): void {
  document.documentElement.setAttribute("data-theme", theme);
  toggle.textContent = theme === "dark" ? "☀️" : "🌙";
  toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
}

export function setupThemeToggle(toggle: HTMLButtonElement): void {
  applyTheme(currentTheme(), toggle);
  toggle.addEventListener("click", () => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next, toggle);
  });
}
