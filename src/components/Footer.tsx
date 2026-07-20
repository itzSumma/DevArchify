import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 pb-8 pt-16 text-slate-400">
      <div className="container mx-auto px-4">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="group mb-4 flex items-center gap-1">
              <span className="text-3xl font-black tracking-tighter text-blue-600 transition-all group-hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.6)]">
                Dev
              </span>
              <span className="text-3xl font-black tracking-tighter text-white transition-all group-hover:text-blue-500">
                Archify
              </span>
            </Link>
            <p className="max-w-xs text-sm">
              Empowering developers with AI-driven blueprints. Plan smarter, code
              faster, and build with confidence.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/#features" className="transition-colors hover:text-blue-500">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="transition-colors hover:text-blue-500">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="transition-colors hover:text-blue-500">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="transition-colors hover:text-blue-500">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-blue-500">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/explore" className="transition-colors hover:text-blue-500">
                  Explore
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="transition-colors hover:text-blue-500" aria-label="GitHub">
                <FaGithub size={20} />
              </a>
              <a href="#" className="transition-colors hover:text-blue-500" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="transition-colors hover:text-blue-500" aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-xs">
          &copy; {new Date().getFullYear()} DevArchify. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
