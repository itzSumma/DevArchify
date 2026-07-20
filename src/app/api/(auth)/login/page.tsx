"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Invalid credentials");
    } else {
      toast.success("Login successful!");
      router.push("/");
    }
    setLoading(false);
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    const {data, error } = await authClient.signIn.email({
      email: "user@demo.com",
      password: "Password123",
      callbackURL: "/",
    });
    console.log("Login Response Data:", data); 
    console.log("Login Error:", error);
    if (error) {
      toast.error(error.message || "Demo login failed");
    } else {
      toast.success("Welcome back! 🎉");
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-950">
      <section className="w-full max-w-md rounded-[28px] border border-slate-800 bg-slate-900/50 p-7 shadow-2xl backdrop-blur-sm sm:p-9">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-blue-500">
            Welcome Back
          </p>
          <h1 className="mt-3 text-4xl font-black text-white">Sign In</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Enter your credentials to access your dashboard.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
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

          {/* Password */}
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
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-400 transition hover:text-white"
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

        {/* Separator */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-slate-800"></div>
          <span className="text-slate-500 text-xs font-medium">OR</span>
          <div className="flex-1 h-px bg-slate-800"></div>
        </div>

        {/* Demo Login Button */}
        <button
          onClick={handleDemoLogin}
          disabled={loading}
          className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3.5 font-bold text-slate-300 transition hover:bg-slate-800 disabled:opacity-70">
          Demo Login
        </button>

        <p className="mt-7 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link
            className="font-bold text-blue-500 hover:text-blue-400"
            href="/register">
            Sign up
          </Link>
        </p>
      </section>
    </div>
  );
}