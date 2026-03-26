"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Suppress known next-themes / Next.js 15 Turbopack hydration console error
if (typeof window !== "undefined") {
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes(
        "Encountered a script tag while rendering React component",
      )
    ) {
      return; // Ignore harmless next-themes script injection warning
    }
    originalConsoleError.apply(console, args);
  };
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
