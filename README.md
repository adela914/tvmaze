# TVMaze

This app lets you browse TV shows in a simple, friendly way. The home page groups shows by genre and presents each group in a horizontal carousel. Results are globally sorted by rating (highest first), and more shows load seamlessly as you paginate. A header search provides instant, inline results. Click any show to open its detail page. Lightweight toast notifications surface errors. The UI is designed to be quick, clear, and easy to use.

## Architecture decisions

- **Vue 3 + Vite + TypeScript** — Modern SFCs and Composition API with fast HMR and build times from Vite, plus TypeScript for safer refactors and better IDE support
- **Pinia** — Official Vue 3 store: minimal boilerplate, great TypeScript inference, and easy-to-test modular stores that sharing state across components makes easier
- **Vue Router** — Declarative, first-class navigation (named routes, params, guards) and simple programmatic navigation from components
- **Minimal scaffolding & dependencies (per assignment)** — Kept the stack vanilla to showcase my own implementation and keep the bundle lean
  - No UI kits (e.g., PrimeVue, Vuetify, Tailwind) or component libraries
  - No utility libraries (e.g., Lodash); implemented a small custom `debounce`
  - Base components (Carousel, Input, Toaster) are hand-rolled and reusable, with no embedded business logic
  - Reusable CSS variables in `main.css` for spacing, colors, and styles.
- **Testing stack: Vitest + Vue Testing Library + MSW + Playwright**
  - **Vitest** for fast unit/integration runs with TypeScript.
  - **Vue Testing Library** to assert user-visible behavior (roles, text) rather than implementation details.
  - **MSW** to mock HTTP at the boundary for deterministic integration tests.
  - **Playwright** for smoke E2E against the real API to validate the critical path.
- **Conventions** — Follows Vue’s official [Style Guide](https://vuejs.org/style-guide/) for naming, structure, and component patterns.

## State management

### Stores & responsibilities

- **`showsListStore`** — TV shows list + pagination
  - **state:** `shows`, `page`, `isLoading`, `error`
  - **actions:** `fetchShows()` appends next page; guards concurrent calls

- **`searchShowsStore`** — search query + results
  - **state:** `searchInput`, `searchResults`
  - **actions:** `findShows()` executes the current query; the header triggers it via a **400 ms debounce**
  - **behavior:** when `searchInput` is truthy, the Home view switches from carousels to the search results block

- **`showDetailsStore`** — details for a single show
  - **state:** `showDetails`, `isLoading`, `error`
  - **actions:** `fetchShowById(id)`; uses `showsListStore` cache (`showsObjectById`) first, else fetches; on error sets `error` and shows a toast

- **`toast`** — transient UI feedback
  - **state:** `toasts: { id, message, type }[]`
  - **actions:** `show(msg, type = 'error', duration)` with auto-dismiss

### Scaling note: server vs. client state

For a larger app:

- **Server state → TanStack Query (Vue Query):** caching, deduped requests, pagination/infinite scroll, retries, background refetch, optional SSR hydration
- **Client/global state → Pinia (minimal):** only true app-level state (auth/session, feature flags, theme, toasts, small UI flags)

## Testing scope

This repository includes:

- **Unit & integration tests** (Vitest + Vue Testing Library + Pinia + MSW) covering the main behaviors: fetching, grouping by genre, pagination (“load more”), navigation, search, and store logic. Network calls are mocked with MSW for determinism.
- **E2E tests** (Playwright) at **smoke** level. They demonstrate the approach and validate the critical happy path (home loads → click a show → navigate; header search toggle). For this assignment, the tests hit the **live TVMaze API**; in a real application, E2E would target a **dedicated test/staging API** or use **MSW** in the browser for determinism and isolation.

**Future E2E additions** (out of scope here, but planned in a real project):

- Full cover of tests, both for happy and unhappy paths
- Error-state UIs (network failures, empty states)
- Accessibility flows (keyboard nav across components)
- Deeper search result interactions
- Visual/trace capture on failures

## Notes

Since this application was built for a coding assignment, I focused on meeting the given requirements as closely as possible. For features like sorting, however, in a real-world scenario I would typically coordinate with the backend team to implement a sorting query on the API side, rather than performing all computations in the frontend.

## Requirements

- **Node.js:** 24.x (tested with **v24.9.0**)
- **npm:** 11.x (tested with **11.6.0**)

```bash
node -v   # v24.9.0
npm  -v   # 11.6.0
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
