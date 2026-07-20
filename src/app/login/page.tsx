"use client";

import { Suspense, useEffect } from "react";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    document.title = "Sign In | DevArchify";
  }, []);
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const u = await login(email, password);
      toast.success("Login successful!");
      if (u.role === "admin") {
        router.push("/admin");
      } else {
        router.push(redirect || "/dashboard");
      }
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response: { data: { message: string } } }).response?.data
              ?.message
          : "Invalid credentials";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);

    const DEMO_EMAIL = "demo@23gmail.com";
    const DEMO_PASS = "Password123";

    try {
      const u = await login(DEMO_EMAIL, DEMO_PASS);
      toast.success("Welcome back!");
      if (u.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch {
      toast.error("Demo login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
      <div className="mb-8 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-blue-500">
          Welcome Back
        </p>
        <h1 className="mt-3 text-3xl font-black text-white">Sign In</h1>
        <p className="mt-2 text-sm text-slate-400">
          Enter your credentials to access your dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            className="text-sm font-semibold text-slate-300"
            htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            placeholder="name@example.com"
          />
        </div>

        <div>
          <label
            className="text-sm font-semibold text-slate-300"
            htmlFor="password">
            Password
          </label>
          <div className="relative mt-2">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/50 px-4 py-3 pr-12 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="********"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-400 hover:text-white transition"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-blue-600 px-4 py-3.5 font-bold text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-700 disabled:opacity-70">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-slate-800" />
        <span className="text-xs font-medium text-slate-500">OR</span>
        <div className="flex-1 h-px bg-slate-800" />
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleDemoLogin}
          disabled={loading}
          className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3.5 font-bold text-slate-300 transition hover:bg-slate-800 disabled:opacity-70">
          Demo Login
        </button>

        <button
          onClick={() =>
            authClient.signIn.social({
              provider: "google",
              callbackURL: window.location.origin + "/auth/callback",
            })
          }
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3.5 font-bold text-slate-300 transition hover:bg-slate-800 disabled:opacity-70">
          <svg className="size-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign in with Google
        </button>
      </div>

      <p className="mt-7 text-center text-sm text-slate-400">
        Don&apos;t have an account?{" "}
        <Link
          className="font-bold text-blue-500 hover:text-blue-400"
          href="/register">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-950 pt-16">
      <div className="w-full max-w-md px-4">
        <Suspense
          fallback={
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center">
              <p className="text-slate-400">Loading...</p>
            </div>
          }>
          <LoginForm />
        </Suspense>
      </div>
    </section>
  );
}
