"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  image?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (name: string, email: string, password: string) => Promise<AuthUser>;
  logout: () => void;
  setUserFromOAuth: (u: AuthUser, token: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("auth_user");
  return raw ? JSON.parse(raw) : null;
}

function setAuthCookie(token: string) {
  if (typeof window === "undefined") return;
  document.cookie = `auth_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
}

function removeAuthCookie() {
  if (typeof window === "undefined") return;
  document.cookie = "auth_token=; path=/; max-age=0; SameSite=Lax";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(getStoredUser);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setIsLoading(false);
      return;
    }
    api
      .get("/auth/me")
      .then((res) => {
        const u = res.data.data;
        setUser(u);
        localStorage.setItem("auth_user", JSON.stringify(u));
      })
      .catch(() => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        removeAuthCookie();
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log("[LOGIN] sending POST to:", api.defaults.baseURL + "/auth/login");
      const res = await api.post("/auth/login", { email, password });
      console.log("[LOGIN] response status:", res.status);
      console.log("[LOGIN] response data:", JSON.stringify(res.data, null, 2));
      const { token, user: u } = res.data.data;
      localStorage.setItem("auth_token", token);
      localStorage.setItem("auth_user", JSON.stringify(u));
      setAuthCookie(token);
      setUser(u);
      return u;
    } catch (err: unknown) {
      const e = err as { response?: { status?: number; data?: unknown }; message?: string };
      console.error("[LOGIN] error:", {
        message: e.message,
        status: e.response?.status,
        data: JSON.stringify(e.response?.data),
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await api.post("/auth/register", { name, email, password });
      const { token, user: u } = res.data.data;
      localStorage.setItem("auth_token", token);
      localStorage.setItem("auth_user", JSON.stringify(u));
      setAuthCookie(token);
      setUser(u);
      return u;
    } catch (err: unknown) {
      const e = err as { response?: { status?: number; data?: unknown }; message?: string };
      console.error("[REGISTER] error:", {
        message: e.message,
        status: e.response?.status,
        data: JSON.stringify(e.response?.data),
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    removeAuthCookie();
    setUser(null);
    router.push("/");
  }, [router]);

  const setUserFromOAuth = useCallback((u: AuthUser, token: string) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_user", JSON.stringify(u));
    setAuthCookie(token);
    setUser(u);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, setUserFromOAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
