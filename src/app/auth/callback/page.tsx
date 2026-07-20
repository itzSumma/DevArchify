"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { setUserFromOAuth } = useAuth();
  const [status, setStatus] = useState("Completing sign-in...");

  useEffect(() => {
    async function handleCallback() {
      const { data: session } = await authClient.getSession();

      if (!session?.user) {
        setStatus("No session found. Redirecting...");
        setTimeout(() => router.push("/login"), 2000);
        return;
      }

      const { user } = session;
      const res = await api.post("/auth/better-auth-exchange", {
        email: user.email,
        name: user.name,
        image: user.image,
      });

      const { token, user: appUser } = res.data.data;
      setUserFromOAuth(appUser, token);

      router.push(appUser.role === "admin" ? "/admin" : "/dashboard");
    }

    handleCallback().catch(() => {
      setStatus("Something went wrong. Redirecting...");
      setTimeout(() => router.push("/login"), 2000);
    });
  }, [router, setUserFromOAuth]);

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="size-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        <p className="text-sm text-slate-400">{status}</p>
      </div>
    </section>
  );
}
