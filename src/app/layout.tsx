import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ThemeToggle } from "@/features/theme/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Best App",
  description: "A small to-do app.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // The theme the user picked last time, saved in a cookie.
  const saved = (await cookies()).get("theme")?.value;
  const theme = saved === "light" || saved === "dark" ? saved : undefined;

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
