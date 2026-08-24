# mfe-platform

A shell application and its microfrontends, built with Angular 22 and
[Native Federation](https://www.npmjs.com/package/@angular-architects/native-federation).
One repo, but every app underneath is a fully independent Angular CLI
workspace — its own `package.json`, its own `angular.json`, its own build —
so any of them can be built, tested, and deployed on its own.

## Apps

| App              | Port | Role                                                              |
| ----------------- | ---- | ------------------------------------------------------------------ |
| `shell-app`       | 4200 | Host. Owns the Router and the page layout; loads every remote.     |
| `sidebar-mfe`     | 4201 | Nav menu, mounted outside the router. Triggers navigation itself.  |
| `footer-mfe`      | 4202 | Static footer, mounted outside the router.                         |
| `login-mfe`       | 4203 | Exposes `/login`, `/signup`, `/forgot-password` as a route group.  |
| `articles-mfe`    | 4204 | `/articles` page.                                                   |
| `contact-us-mfe`  | 4205 | `/contact-us` page.                                                 |
| `about-us-mfe`    | 4206 | `/about-us` page.                                                   |
| `mfe-shared`      | —    | Library, not an app. `shared-state` package (see below).           |

## Shared library: `shared-state`

Published from `mfe-shared/projects/shared-state`, consumed by every app via
`npm link` and shared at runtime as a **Native Federation singleton** (see
`shared: shareAll(...)` in each app's `federation.config.mjs`) — so `shell`,
`sidebar-mfe`, and `login-mfe` all observe the *same live instance* of
`AuthService` (signal-based, holds the current user, persists to
`localStorage`). It also exports the `User`/`NavItem` type contracts. It does
**not** hold any route paths — those belong to whichever app owns that
routing decision (see below).

Every app also links the existing [`ui-components`](../ui-components) library
the same way, for a consistent look (`natiUiInput`, `natiUiButton`,
`natiUiHeading`, etc.) — see that repo's own README for the component list.

## How the shell composes everything

- `shell-app/src/app/nav-config.ts` is the single place the site's page list
  (`ROUTE_PATHS`, `NAV_ITEMS`) is defined — the shell owns routing, so it
  owns this, rather than it living in a shared library every remote has to
  import from.
- `shell-app/public/federation.manifest.json` lists every remote's
  `remoteEntry.json` URL. `main.ts` calls `initFederation('/federation.manifest.json')`
  before bootstrapping.
- `sidebar-mfe` and `footer-mfe` aren't tied to a route — they're mounted by
  a small generic `RemoteOutletComponent`
  (`shell-app/src/app/remote-outlet/remote-outlet.component.ts`) that calls
  `loadRemoteModule()`, creates the component dynamically, and applies an
  `inputs` record via `componentRef.setInput()`. `sidebar-mfe`'s
  `RemoteEntryComponent` takes `navItems`/`loginPath` as `input()`s — it
  renders whatever the shell hands it, rather than importing path constants
  itself. Every remote exposes its root component under the same name,
  `RemoteEntryComponent`, so this stays generic.
- `articles-mfe` / `contact-us-mfe` / `about-us-mfe` are wired as ordinary
  lazy routes (`loadComponent: () => loadRemoteModule(...)`) in
  `shell-app/src/app/app.routes.ts`.
- `login-mfe` is wired as `loadChildren`, exposing a `./Routes` module
  (`LOGIN_ROUTES`) instead of a single component, so its three pages
  (`/login`, `/signup`, `/forgot-password`) become normal child routes of
  the shell's router. Those three path segments are `login-mfe`'s own
  concern — defined locally in `login-mfe/src/app/login-paths.ts`, not
  shared, since only `login-mfe` itself links between those pages. After
  login/signup it navigates to `/`, letting the shell's own default-route
  redirect (in `nav-config.ts`) decide where that lands.

Because `@angular/router` is shared as a federation singleton, `routerLink`
inside `sidebar-mfe` and `login-mfe` navigates the shell's *own* Router —
there's only ever one Router instance on the page.

## Running it

Every app also runs standalone at its own port (useful for isolated dev),
but to see the whole thing composed:

```bash
npm run link:shared   # build shared-state and register the npm link (do this once, or after changing it)
npm run dev            # starts all 7 apps together (shell + 6 remotes) via concurrently
```

Then open `http://localhost:4200`. Rebuilding `ui-components` uses its own
`npm run link:lib` in that repo.

## Adding a new remote

1. `ng new <name>-mfe --style=scss --routing=false --ssr=false`
2. `npm link ui-components shared-state`, and add both to `dependencies` in
   `package.json` (so `shareAll()` in `federation.config.mjs` picks them up
   as shared singletons — plain `npm link` alone doesn't touch `package.json`).
3. `ng add @angular-architects/native-federation --type remote --port <next port>`
4. Export the root component as `RemoteEntryComponent` (matches the
   convention every other remote uses) and add its manifest entry in
   `shell-app/public/federation.manifest.json` plus a route in
   `shell-app/src/app/app.routes.ts`.
