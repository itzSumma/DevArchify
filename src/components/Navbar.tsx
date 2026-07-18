"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket, Bot, Menu, X, LogOut } from "lucide-react";

export default function Navbar({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Brand/Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <span className="text-3xl font-black tracking-tighter text-blue-600 transition-all group-hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.6)]">
                Dev
              </span>
              <span className="text-3xl font-black tracking-tighter text-foreground transition-all group-hover:text-blue-500">
                Archify
              </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {!isLoggedIn ? (
            // Logged-Out Routes (3 Routes)
            <>
              <Link href="/" className="text-sm font-medium text-white transition-colors hover:text-blue-500">Home</Link>
              <Link href="/#features" className="text-sm font-medium text-white transition-colors hover:text-blue-500">Features</Link>
              <Link href="/login" className="text-sm font-medium text-white transition-colors hover:text-blue-500">Login</Link>
            </>
          ) : (
            // Logged-In Routes (5 Routes)
            <>
              <Link href="/dashboard" className="text-sm font-medium text-white hover:text-blue-500 transition-colors">Dashboard</Link>
              <Link href="/manage" className="text-sm font-medium text-white hover:text-blue-500 transition-colors">Manage Items</Link>
              <Link href="/blueprints" className="text-sm font-medium text-white hover:text-blue-500 transition-colors">My Blueprints</Link>
              <Link href="/chat" className="text-sm font-medium text-blue-500 flex items-center gap-2 hover:text-blue-400">
                <Bot className="size-4" /> AI Chat
              </Link>
              <Link href="/settings" className="text-sm font-medium text-white hover:text-blue-500 transition-colors">Settings</Link>
            </>
          )}
        </div>

        {/* Auth CTA */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20">
              <Rocket className="size-4" /> Get Started
            </Button>
          ) : (
            <Button size="sm" variant="outline" className="gap-2 border-white/10 hover:bg-white/5">
              <LogOut className="size-4" /> Logout
            </Button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-950 p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
           {!isLoggedIn ? (
             <>
               <Link href="/" className="text-white hover:text-blue-500 py-1" onClick={() => setIsOpen(false)}>Home</Link>
               <Link href="/#features" className="text-white hover:text-blue-500 py-1" onClick={() => setIsOpen(false)}>Features</Link>
               <Link href="/login" className="text-white hover:text-blue-500 py-1" onClick={() => setIsOpen(false)}>Login</Link>
             </>
           ) : (
             <>
               <Link href="/dashboard" className="text-white py-1" onClick={() => setIsOpen(false)}>Dashboard</Link>
               <Link href="/manage" className="text-white py-1" onClick={() => setIsOpen(false)}>Manage Items</Link>
               <Link href="/blueprints" className="text-white py-1" onClick={() => setIsOpen(false)}>My Blueprints</Link>
               <Link href="/chat" className="text-blue-500 py-1" onClick={() => setIsOpen(false)}>AI Chat</Link>
               <Link href="/settings" className="text-white py-1" onClick={() => setIsOpen(false)}>Settings</Link>
             </>
           )}
           <Button className="w-full gap-2 mt-2">
             {isLoggedIn ? <><LogOut className="size-4"/> Logout</> : <><Rocket className="size-4" /> Get Started</>}
           </Button>
        </div>
      )}
    </header>
  );
}