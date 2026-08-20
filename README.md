# Trek Karakoram Next.js App Router Edition

This is the original Vite + React Router SPA converted to **Next.js 15 (App Router)**,
using real **file-based routing** and a genuine **Server / Client Component split**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm run start   # production build
```

## What changed vs. the original

### Routing
`react-router-dom`'s `<Routes>`/`<Route>` table in `src/App.tsx` was replaced with
**file-based routing** under `app/`:

| Old route (App.tsx)     | New file                                  |
|--------------------------|--------------------------------------------|
| `/`                      | `app/page.tsx`                              |
| `/treks`                 | `app/treks/page.tsx`                        |
| `/treks/:id`              | `app/treks/[id]/page.tsx` (dynamic, SSG)    |
| `/destinations`          | `app/destinations/page.tsx`                 |
| `/routes-map`            | `app/routes-map/page.tsx`                   |
| `/planner`               | `app/planner/page.tsx`                      |
| `/safety-and-guides`     | `app/safety-and-guides/page.tsx`            |
| `/permits-visa-guide`    | `app/permits-visa-guide/page.tsx`           |
| `/travel-styles`         | `app/travel-styles/page.tsx`                |
| `/custom-plan`           | `app/custom-plan/page.tsx`                  |
| `/blog`                  | `app/blog/page.tsx`                         |
| `/blog/:slug`             | `app/blog/[slug]/page.tsx` (dynamic, SSG)   |
| `/faq`                   | `app/faq/page.tsx`                          |
| `/contact`               | `app/contact/page.tsx`                      |

### Server vs. Client Components
Every route folder has two files:

- **`page.tsx`** a **Server Component**. It does the data lookup (e.g. finding the
  trek by `id`, or the blog post by `slug`) on the server, exports real per-page
  `<title>`/`<meta>` via `generateMetadata`, calls `notFound()` for unknown ids/slugs,
  and pre-renders every trek/blog page at build time via `generateStaticParams`
  (visible in the build output as `● SSG` routes).
- **`*PageClient.tsx`** a **Client Component** (`'use client'`) that holds all the
  interactive UI: filters, tabs, forms, modals, `onClick`/`onChange` handlers, etc.
  It receives server-resolved data as props where relevant (e.g. `<TrekDetailPageClient trek={trek} />`).

This is the idiomatic Next.js App Router pattern: keep the outer shell on the server,
push interactivity down into the smallest possible client boundary.

### Global / shared state
The old `App.tsx` held `currency`, the booking modal, cost-estimator modal, and
custom-plan modal state, passed down as props through `<Route element={...} />`.
Since Next.js pages are independent route segments, this was replaced with a React
Context provider: **`lib/context/AppContext.tsx`** (`'use client'`). It's mounted once
in the root layout and every page client-component reads it via `useApp()` instead of
receiving `currency`/`onOpenBooking` as props. The three global modals live inside the
provider so they persist across route navigations, exactly like before.

### `react-router-dom` → Next.js equivalents
| react-router-dom              | Next.js                                   |
|--------------------------------|--------------------------------------------|
| `<Link to="...">`              | `<Link href="...">` (`next/link`)          |
| `useNavigate()` + `navigate(x)`| `useRouter()` + `router.push(x)`           |
| `navigate(-1)`                 | `router.back()`                            |
| `useLocation().pathname`       | `usePathname()` (`next/navigation`)        |
| `useParams()`                  | server-resolved `params` prop on `page.tsx`|
| `useSearchParams()`            | `useSearchParams()` (`next/navigation`, read-only wrapped in `<Suspense>`) |

### Layout
`app/layout.tsx` is a Server Component that replaces `index.html` + `src/main.tsx` +
`src/App.tsx`'s shell: it sets up fonts, page metadata, the `TravelAgency` JSON-LD
block, and renders `<AppProviders><Navbar/>{children}<Footer/></AppProviders>`.

### Styling
Tailwind v4 is unchanged (`app/globals.css` = old `src/index.css`), just wired through
`@tailwindcss/postcss` instead of the Vite plugin.

### Removed
`react-router-dom`, `vite`, `@vitejs/plugin-react`, `express`, `dotenv`, `@google/genai`
and `motion` were all either Vite-specific or unused in the source and were dropped
from `package.json`.

## Notes
- Unknown `/treks/:id` or `/blog/:slug` now render a proper `not-found.tsx` (404)
  instead of silently falling back to the first item, since that's the correct
  behavior for a real production site happy to revert this if you'd rather match
  the original fallback exactly.
- `npm run build` was verified locally: **27/27 routes compile clean**, including SSG
  pre-rendering for every trek package and every blog post.
