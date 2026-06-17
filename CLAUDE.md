# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev        # start dev server (http://localhost:3000)
npm run build      # runs prebuild (fetches product data) then next build
npm start          # serve production build
npm run lint       # eslint
```

There are no tests.

## Architecture

VoidThread is a Next.js 16 (App Router) e-commerce storefront for a premium streetwear brand. The backend API lives at `https://api.voidthread.in` (locally `http://localhost:8080`, set via `NEXT_PUBLIC_API_URL`).

### Component directories

Two separate component directories exist with different purposes:

- **`common/components/`** — shared layout and feature components used across multiple pages: `navbar`, `footer`, `cart` (full cart UI), `product/ProductCard`, `page-header`, `button/payment-button`
- **`components/`** — page-specific components (`home/`) and shadcn/ui primitives (`ui/`)

### Data flow: static catalog vs. live API

Product catalog data is split between build-time static data and runtime API data:

- **Build-time** (`scripts/prebuild.js`): Before every build, this script fetches all products and the `new-drops` collection from the production API and writes them to `temp/products.json` and `temp/new-drops.json`. These files are committed to `.gitignore` and regenerated on each build.
- **`utils/product.ts`**: `getProduct(slug)` reads from `temp/products.json` (static import). This is the only source of product metadata (name, price, images).
- **Runtime** (`hooks/variant.ts`): `useVariant(slug)` fetches live variant availability (color, size, stock) from `/api/v1/core/variants` via TanStack Query. The product detail page composes both.

### State management

- **TanStack Query** (`app/providers.tsx`): wraps the app; handles all server state for cart and variants with 60s staleTime.
- **Zustand** (`store/cart.ts`): `useCartStore` holds client-side cart state. It is synced from TanStack Query results inside `hooks/cart.ts` via `useEffect`.
- **`useAuth`** (`hooks/auth.ts`): plain React hook with local state; not wired into TanStack Query or Zustand.
- Cart fetching is gated on auth: `useCart(Boolean(user))` — the query is disabled when the user is not logged in.

### Cart hook pattern

`useCartMutation<TInput>(endpoint)` in `hooks/cart.ts` is a factory that creates mutations for cart operations. Each mutation invalidates the `["cart"]` query key on success, which re-fetches and re-syncs the Zustand store.

### Payment

`common/components/button/payment-button.tsx` uses the Cashfree JS SDK (`@cashfreepayments/cashfree-js`). It calls `/api/v1/payment/create` to get a `payment_session_id`, then initiates checkout. Currently hardcoded to `mode: "sandbox"`.

### API surface

All API calls go through `lib/api-client.ts` (axios wrapper, `withCredentials: true`):

- Auth: `/api/v1/auth/session|login|register|logout`
- Cart: `/api/v1/cart/get-cart|add-to-cart|update-quantity|remove-from-cart|clear-cart`
- Catalog: `/api/v1/core/products`, `/api/v1/core/collections/:slug/products`, `/api/v1/core/variants`
- Payment: `/api/v1/payment/create`

### Conventions

- Path alias `@/*` maps to the repo root.
- `ConditionalFooter` suppresses the footer on `/cart`.
- `COLOR_CODES` in `utils/product.ts` is the authoritative map of color name → hex used for variant swatches.
- Currency is always formatted as INR using `Intl.NumberFormat("en-IN")`.
- Images are served from Cloudinary (`res.cloudinary.com`) and Unsplash; both are allowlisted in `next.config.ts`.
