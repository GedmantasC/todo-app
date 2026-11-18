import type { Metadata } from "next";
import { cookies } from "next/headers";
import { THEME_COOKIE, parseTheme } from "@/features/theme/theme";
import { ThemeToggle } from "@/features/theme/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Best App",
  description: "A small to-do app, organised the way a real project is.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = parseTheme((await cookies()).get(THEME_COOKIE)?.value);

  return (
    <html lang="en" data-theme={theme}>
      <body>
        <main className="app">
          <header className="app-header">
            <h1>The Best App</h1>
            <ThemeToggle initial={theme} />
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
