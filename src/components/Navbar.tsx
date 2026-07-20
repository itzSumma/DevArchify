"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X, Shield, FileEdit } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);
  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";

  const handleSignOut = () => {
    logout();
    setMobileOpen(false);
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/#features", label: "Features" },
    { href: "/explore", label: "Explore" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4" role="navigation" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-1 group" aria-label="DevArchify home">
          <span className="text-3xl font-black tracking-tighter text-blue-600">Dev</span>
          <span className="text-3xl font-black tracking-tighter text-white">Archify</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300" role="menubar">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-blue-500 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 rounded-lg" role="menuitem">
              {link.label}
            </Link>
          ))}

          {mounted && isLoggedIn && (
            <Link href="/items/manage" className="hover:text-blue-500 transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-blue-500 rounded-lg" role="menuitem">
              <FileEdit className="size-4" /> Manage
            </Link>
          )}

          {mounted && isAdmin && (
            <Link href="/admin" className="hover:text-blue-500 transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-blue-500 rounded-lg" role="menuitem">
              <Shield className="size-4" /> Admin
            </Link>
          )}

          {(!mounted || !isLoggedIn) && (
            <Link href="/login" className="hover:text-blue-500 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 rounded-lg" role="menuitem">
              Login
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {!mounted || !isLoggedIn ? (
            <Link href="/register" className="hidden md:inline">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Register</Button>
            </Link>
          ) : (
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl" aria-label="User menu">
                    <span className="text-sm font-semibold text-white">
                      {user?.name || "User"}
                    </span>
                    <div className="size-9 rounded-full overflow-hidden border border-slate-700 flex items-center justify-center bg-slate-800 text-blue-500 font-bold">
                      {user?.image ? (
                        <img src={user.image} alt="" className="size-full object-cover" />
                      ) : (
                        <span aria-hidden="true">{user?.name?.charAt(0).toUpperCase() || "U"}</span>
                      )}
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-0 mt-2 bg-slate-900 border border-slate-800 shadow-xl rounded-xl" align="end">
                  <div className="px-4 py-3 border-b border-slate-800">
                    <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">Welcome!</p>
                    <p className="text-sm font-semibold text-white">{user?.name}</p>
                  </div>
                  <div className="p-1">
                    <Link href="/items/manage">
                      <DropdownMenuItem className="cursor-pointer hover:bg-slate-800 text-slate-200 py-2.5 px-3 flex items-center">
                        <FileEdit className="mr-3 size-4" /> My Blueprints
                      </DropdownMenuItem>
                    </Link>
                    {isAdmin && (
                      <Link href="/admin">
                        <DropdownMenuItem className="cursor-pointer hover:bg-slate-800 text-slate-200 py-2.5 px-3 flex items-center">
                          <Shield className="mr-3 size-4" /> Admin Panel
                        </DropdownMenuItem>
                      </Link>
                    )}
                    <DropdownMenuSeparator className="bg-slate-800 my-1" />
                    <DropdownMenuItem className="cursor-pointer hover:bg-slate-800 text-red-400 py-2.5 px-3 flex items-center" onClick={handleSignOut}>
                      <LogOut className="mr-3 size-4" /> Sign out
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-md overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500"
                  role="menuitem"
                >
                  {link.label}
                </Link>
              ))}

              {mounted && isLoggedIn && (
                <Link
                  href="/items/manage"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500"
                  role="menuitem"
                >
                  My Blueprints
                </Link>
              )}

              {mounted && isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500"
                  role="menuitem"
                >
                  Admin Panel
                </Link>
              )}

              {mounted && isLoggedIn ? (
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-3 rounded-xl text-red-400 hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500"
                  role="menuitem"
                >
                  Sign out
                </button>
              ) : (
                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => { router.push("/login"); setMobileOpen(false); }}
                    className="block w-full text-left px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500"
                    role="menuitem"
                  >
                    Login
                  </button>
                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center px-4 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500"
                    role="menuitem"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
