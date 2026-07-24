# DevArchify — Frontend

AI-powered software architecture blueprint platform. Generate, browse, and manage architecture blueprints from natural language ideas.

## Real-World Problems It Solves

| Problem | Solution |
|---------|----------|
| **Architecture Paralysis** — Developers spend hours deciding project structure, tech stacks, and system design before writing a single line of code. | AI generates a complete, production-ready architecture blueprint from a one-line idea — instantly eliminating analysis paralysis. |
| **Inconsistent Architecture Knowledge** — Junior developers lack experience designing scalable systems, leading to poor architectural decisions. | The platform provides battle-tested architecture templates and an AI assistant to guide developers through design decisions. |
| **Blueprint Discoverability** — Good architecture references are scattered across blog posts, GitHub repos, and YouTube videos with no unified search. | A centralized, searchable marketplace of community-submitted blueprints with filtering by category, tech stack, and complexity. |
| **Context Switching During Design** — Developers constantly context-switch between documentation, whiteboarding tools, and code editors. | An integrated AI chat assistant provides on-demand architectural advice without leaving the platform. |
| **No Iterative Design Feedback** — Solo developers have no second opinion on their architecture decisions. | The AI assistant reviews and critiques user blueprints, offering improvements and alternative approaches. |
| **Blueprint Management Overhead** — No easy way to version, revisit, or share your past architecture designs. | Full CRUD management with per-user blueprint dashboards, enabling save, edit, delete, and revisit workflows. |
| **Collaboration Barriers** — Teams need a shared reference point when discussing system design. | Blueprints can be shared via unique URLs, serving as a single source of truth during architectural discussions. |
| **Admin Overhead for Platforms** — User management, content moderation, and platform analytics require dedicated tooling. | Built-in admin dashboard with user management, role assignment, and platform analytics (user growth, blueprint counts, category distribution). |

## Core Features

- **AI Blueprint Generation** — Describe your project idea in natural language; AI returns a full architecture blueprint (system design, component tree, data flow, tech stack recommendations).
- **Blueprint Marketplace** — Browse, search, and filter community-submitted blueprints by category, tech stack, and popularity.
- **AI Chat Assistant** — Floating chatbot that answers architecture questions via SSE streaming, with conversation history and context from your saved blueprints.
- **User Authentication** — Email/password registration and Google OAuth via Better Auth.
- **User Dashboard** — Manage your submitted blueprints with inline editing and deletion.
- **Explore & Discovery** — Paginated grid view with search bar, category filters, and sorting.
- **Admin Panel** — Platform statistics, user listing, role management (user/admin), moderation tools.
- **Responsive Design** — Full mobile responsiveness with Tailwind CSS 4 and shadcn/ui components.
- **Dark Mode** — Dark theme throughout using Tailwind's `darkMode: "class"` strategy.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI | React 19, Tailwind CSS 4, shadcn/ui, HeroUI, Framer Motion |
| State | TanStack React Query |
| Forms | React Hook Form + Zod |
| Auth | Better Auth (MongoDB adapter, Google OAuth) |
| Charts | Recharts |
| HTTP | Axios |
| Icons | Lucide React, React Icons |

## Project Structure

```
src/
  app/                          # Next.js App Router pages
    admin/page.tsx              # Admin dashboard (role-protected)
    auth/callback/page.tsx      # OAuth callback
    blueprint/[id]/page.tsx     # Blueprint detail view
    dashboard/page.tsx          # User dashboard
    explore/page.tsx            # Blueprint explorer with search/filter/pagination
    items/add/page.tsx          # Submit a new blueprint
    items/manage/page.tsx       # Manage user's blueprints
    layout.tsx                  # Root layout (Navbar, Footer, Providers, AIChat)
    login/page.tsx              # Login (email/password, Google, demo)
    page.tsx                    # Landing page
    register/page.tsx           # Registration
  components/
    AddBlueprintForm.tsx        # Blueprint submission form
    admin/                      # Admin panel components
    AIChat.tsx                  # Floating AI chat assistant (SSE)
    BlueprintCard.tsx           # Blueprint card for grid display
    ExploreGrid.tsx             # Explore page grid
    ManageBlueprintTable.tsx    # CRUD table for user blueprints
    Navbar.tsx                  # Responsive nav with auth-aware dropdown
    Providers.tsx               # Client providers (Query, HeroUI, Auth, Toast)
    RolesCheck.tsx              # Route protection by role
    ui/                         # shadcn/ui primitives (button, card, input, table, etc.)
  context/
    AuthContext.tsx             # Auth context/provider
  lib/
    api.ts                     # Axios instance with JWT interceptors
    auth-client.ts             # Better Auth client
    auth.ts                    # Better Auth server config
    mock-data.ts               # Mock blueprint data
    utils.ts                   # cn() utility
  proxy.ts                     # Next.js middleware for route protection
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Better Auth server URL |
| `BETTER_AUTH_SECRET` | Auth secret |
| `MONGODB_URI` | MongoDB connection string |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Production build
npm run lint       # ESLint
```

## Known Errors & Solutions

### 1. `Module not found: Can't resolve 'react-dom'`
**Cause:** React 19 RC / peer dependency mismatch with some libraries.
**Fix:** Ensure all React packages are on the same version. Run `npm install react@latest react-dom@latest`.

### 2. `TypeError: (0 , react__WEBPACK_IMPORTED_MODULE_0__) is not a function`
**Cause:** Component is default-exported but imported as a named export (or vice versa).
**Fix:** Check the export/import style in the offending component and correct it.

### 3. `Error: Invalid src prop on next/image` (in production)
**Cause:** External image URL not whitelisted in `next.config.ts`.
**Fix:** Add the domain to `remotePatterns` in `next.config.ts`:
```ts
images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] }
```

### 4. Tailwind CSS classes not applying
**Cause:** Tailwind v4 uses `@import "tailwindcss"` instead of `@tailwind` directives. Content paths are auto-detected.
**Fix:** Ensure `globals.css` starts with `@import "tailwindcss"` and that `postcss.config.mjs` uses `@tailwindcss/postcss`.

### 5. `localStorage is not defined` (SSR error)
**Cause:** Code referencing `localStorage` runs during server-side rendering.
**Fix:** Wrap in `typeof window !== 'undefined'` check or use `useEffect`.

### 6. Better Auth session not persisting across pages
**Cause:** Missing `AuthProvider` wrapper or incorrect Better Auth client configuration.
**Fix:** Verify `Providers.tsx` wraps the app and `auth-client.ts` uses the correct `baseURL`.

### 7. OAuth callback redirect loops
**Cause:** Mismatched `NEXT_PUBLIC_BETTER_AUTH_URL` and the actual deployed URL.
**Fix:** Set `NEXT_PUBLIC_BETTER_AUTH_URL` to the exact backend deployment URL (e.g., `https://dev-archify-server.vercel.app`).

### 8. `react-compiler-runtime` build error
**Cause:** The `reactCompiler: true` option in `next.config.ts` requires specific Babel plugins.
**Fix:** Ensure `babel-plugin-react-compiler` is installed, or disable `reactCompiler` in config.

### 9. shadcn/ui `cn()` not merging classes properly
**Cause:** Using an older version of `tailwind-merge` or incorrect `clsx` import.
**Fix:** Verify `src/lib/utils.ts` uses `clsx` + `tailwind-merge` correctly:
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
```

### 10. Toast notifications not appearing
**Cause:** `ToastContainer` not rendered or missing `react-toastify` CSS import.
**Fix:** Add `<ToastContainer />` in `Providers.tsx` and import `react-toastify/dist/ReactToastify.css`.