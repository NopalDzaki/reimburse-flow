"use client";

import { createContext, useContext } from "react";
import { mockUsers } from "@/data/mock-data";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { User, UserRole } from "@/types";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  loginAsRole: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>("reimburse-auth", null);

  const loginAsRole = (role: UserRole) => {
    const found = mockUsers.find((u) => u.role === role) ?? mockUsers[0];
    setUser(found);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    loginAsRole,
    logout: () => setUser(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus di dalam AuthProvider");
  return ctx;
}
