"use client";

import { useEffect, FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Create Account | DevArchify";
  }, []);

  const passwordStrength = useMemo(() => {
    if (password.length >= 10) return "Strong";
    if (password.length >= 8) return "Good";
    return "Too short";
  }, [password]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const u = await register(name, email, password);
      setMessage("Account created! Redirecting...");
      setTimeout(() => router.push(u.role === "admin" ? "/admin" : "/dashboard"), 900);
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response: { data: { message: string } } }).response?.data?.message
          : "Registration failed";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-950 pt-16">
      <div className="w-full max-w-md px-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
          <div className="mb-6 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-blue-500">
              Start fresh
            </p>
            <h1 className="mt-3 text-3xl font-black text-white">Create Account</h1>
            <p className="mt-2 text-sm text-slate-400">
              Join our developer community to start generating blueprints.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-300" htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-300" htmlFor="email">
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
              <div className="flex items-center justify-between gap-3">
                <label className="text-sm font-semibold text-slate-300" htmlFor="password">
                  Password
                </label>
                <span className="text-xs font-bold text-blue-500">
                  {password ? passwordStrength : "At least 8 characters"}
                </span>
              </div>
              <div className="relative mt-2">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/50 px-4 py-3 pr-12 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-400 hover:text-white transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-2xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm font-medium text-red-400">
                {error}
              </p>
            )}
            {message && (
              <p className="rounded-2xl border border-emerald-900/50 bg-emerald-950/30 px-4 py-3 text-sm font-medium text-emerald-400">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-blue-600 px-4 py-3.5 font-bold text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-700 disabled:opacity-70"
            >
              {isSubmitting ? "Creating account..." : "Register account"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-400">
            Already registered?{" "}
            <Link className="font-bold text-blue-500 hover:text-blue-400" href="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
