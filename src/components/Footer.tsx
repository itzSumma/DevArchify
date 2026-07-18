import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Branding Section */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-1 group mb-4">
              <span className="text-3xl font-black tracking-tighter text-blue-600 transition-all group-hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.6)]">
                Dev
              </span>
              <span className="text-3xl font-black tracking-tighter text-foreground transition-all group-hover:text-blue-500">
                Archify
              </span>
            </Link>
            <p className="text-sm max-w-xs">
              Empowering developers with AI-driven blueprints. 
              Plan smarter, code faster, and build with confidence.
            </p>
          </div>

          {/* Product Section */}
          <div>
            <h3 className="font-semibold text-sm text-white mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/features" className="hover:text-blue-500 transition-colors">Features</Link></li>
              <li><Link href="/dashboard" className="hover:text-blue-500 transition-colors">Dashboard</Link></li>
              <li><Link href="/generator" className="hover:text-blue-500 transition-colors">AI Generator</Link></li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="font-semibold text-sm text-white mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-500 transition-colors" aria-label="GitHub">
                <FaGithub size={20} />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors" aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs">
          &copy; {new Date().getFullYear()} DevArchify. All rights reserved.
        </div>
      </div>
    </footer>
  );
}