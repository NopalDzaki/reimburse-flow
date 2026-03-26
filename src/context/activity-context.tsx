"use client";

import { createContext, useContext } from "react";
import { mockActivities } from "@/data/mock-data";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { ActivityLog } from "@/types";

interface ActivityContextValue {
  activities: ActivityLog[];
  addActivity: (
    activity: Omit<ActivityLog, "id" | "createdAt"> & { createdAt?: string },
  ) => void;
}

const ActivityContext = createContext<ActivityContextValue | undefined>(
  undefined,
);

export function ActivityProvider({ children }: { children: React.ReactNode }) {
  const [activities, setActivities] = useLocalStorage<ActivityLog[]>(
    "reimburse-activities",
    mockActivities,
  );

  const addActivity: ActivityContextValue["addActivity"] = (activity) => {
    setActivities((prev) => [
      {
        id: crypto.randomUUID(),
        createdAt: activity.createdAt ?? new Date().toISOString(),
        ...activity,
      },
      ...prev,
    ]);
  };

  const value = { activities, addActivity };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const ctx = useContext(ActivityContext);
  if (!ctx) throw new Error("useActivity harus di dalam ActivityProvider");
  return ctx;
}
