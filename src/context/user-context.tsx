"use client";

import { createContext, useContext } from "react";
import { mockUsers } from "@/data/mock-data";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { User, UserRole } from "@/types";

interface UserContextValue {
  users: User[];
  updateUserRole: (userId: string, role: UserRole) => void;
  deleteUser: (userId: string) => void;
  toggleActive: (userId: string) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useLocalStorage<User[]>("reimburse-users", mockUsers);

  const updateUserRole = (userId: string, role: UserRole) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)));
  };

  const deleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const toggleActive = (userId: string) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, isActive: !u.isActive } : u)));
  };

  const value = { users, updateUserRole, deleteUser, toggleActive };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUsers() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUsers harus di dalam UserProvider");
  return ctx;
}
