"use client";

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Always initialize with initialValue to prevent hydration mismatch (SSR vs Client)
  const [value, setValue] = useState<T>(initialValue);
  const [mounted, setMounted] = useState(false);

  // Hydrate client-side state from local storage securely after first mount
  useEffect(() => {
    setMounted(true);
    try {
      const stored = window.localStorage.getItem(key);
      if (stored) {
        setValue(JSON.parse(stored) as T);
      }
    } catch (e) {
      console.error("Failed to parse localStorage on mount", e);
    }
  }, [key]);

  // Keep localStorage perfectly synced on subsequent generic updates
  useEffect(() => {
    if (mounted) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.error("Failed to write to localStorage", e);
      }
    }
  }, [key, value, mounted]);

  return [value, setValue] as const;
}
