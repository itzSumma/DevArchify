"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const { error: signUpError } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
      });

      if (signUpError) {
        throw new Error(signUpError.message || "Registration failed");
      }

      setMessage("Account created. Taking you to login...");
      setTimeout(() => router.push("/login"), 900);
    } catch (registerError) {
      setError(registerError instanceof Error ? registerError.message : "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-950">
      <section className="w-full max-w-md rounded-[28px] border border-slate-800 bg-slate-900/50 p-7 shadow-2xl backdrop-blur-sm sm:p-9">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-blue-500">
            Start fresh
          </p>
          <h1 className="mt-3 text-4xl font-black text-white">
            Create Account
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Join our developer community to start generating blueprints.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="text-sm font-semibold text-slate-300" htmlFor="name">Full name</label>
            <input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="Your name"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="text-sm font-semibold text-slate-300" htmlFor="image">Profile Image URL</label>
            <input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-slate-300" htmlFor="email">Email address</label>
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

          {/* Password */}
          <div>
            <div className="flex items-center justify-between gap-3">
              <label className="text-sm font-semibold text-slate-300" htmlFor="password">Password</label>
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
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-400 transition hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="rounded-2xl bg-red-950/30 px-4 py-3 text-sm font-medium text-red-400 border border-red-900/50">
              {error}
            </p>
          )}
          {message && (
            <p className="rounded-2xl bg-emerald-950/30 px-4 py-3 text-sm font-medium text-emerald-400 border border-emerald-900/50">
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
      </section>
    </div>
  );
}