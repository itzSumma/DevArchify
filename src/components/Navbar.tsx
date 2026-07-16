"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Rocket, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
          <Link href="/features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-blue-600">
            Features
          </Link>
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-blue-600">
            <LayoutDashboard className="size-4" />
            Dashboard
          </Link>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Login
          </Link>
          <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20">
            <Rocket className="size-4" />
            Get Started
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-foreground" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <Link href="/features" className="text-base font-medium px-2 py-1" onClick={() => setIsOpen(false)}>
            Features
          </Link>
          <Link href="/dashboard" className="text-base font-medium px-2 py-1" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
          <Link href="/login" className="text-base font-medium px-2 py-1" onClick={() => setIsOpen(false)}>
            Login
          </Link>
          <Button className="w-full gap-2 mt-2">
            <Rocket className="size-4" /> Get Started
          </Button>
        </div>
      )}
    </header>
  );
}