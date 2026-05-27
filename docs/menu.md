# Menu And Page Architecture

## Overview

Nuxt 4 SPA with file-based routing. One global default layout wraps all authenticated pages. `login.vue` is the only page that opts out.

## Key Files

```txt
app/data/menu.ts                      ← source of truth for all routes + labels
app/composables/useAppMenu.ts         ← active route matching + page title derivation
app/composables/usePixelLayout.ts     ← sidebar/navbar shared state (singleton)
app/layouts/default.vue               ← shell: navbar + sidebar + slot
app/components/navbar/index.vue       ← top navbar
app/components/sidebar/index.vue      ← primary sidebar
app/components/sidebar/SidebarChild.vue      ← submenu panel
app/components/sidebar/SidebarChildItems.vue ← generic submenu list renderer
app/components/inbox/InboxFilter.vue  ← inbox-specific submenu (special case)
app/components/template/DefaultPageContent.vue ← scaffold for unbuilt pages
```

## Menu Data Model

Defined in `app/data/menu.ts`:

```ts
type AppMenuGroup = AppMenuItem[];

type AppMenuItem = {
  id: string;
  icon: IconName;
  label: string;
  route: string;
  badge?: boolean;
  isExternal?: boolean;
  submenu?: {
    title: string;
    items: AppMenuChild[];
  };
};

type AppMenuChild = {
  id: string;
  label: string;
  route: string;
  query?: Record<string, string>;
  count?: string | number;
  newTab?: boolean;
  children?: AppMenuChild[];
};
```

Exports: `APP_MENU_GROUPS` (grouped for sidebar rendering), `APP_MENU_ITEMS` (flat for route matching).

## Composables

### `useAppMenu`

Handles all active-state and title derivation. Call in layout or components that need route awareness.

```ts
const {
  menuGroups, // APP_MENU_GROUPS — for sidebar rendering
  menuItems, // APP_MENU_ITEMS — flat list
  activeTopMenu, // currently active top-level item
  activeSubmenu, // activeTopMenu if it has submenu, else null
  activeChildMenu, // deepest matching child item
  activePageTitle, // label of deepest active item
  getFirstChildRoute, // resolves default child for a menu item
  isRouteActive // (itemRoute: string) => boolean
} = useAppMenu();
```

Route matching: `startsWith(route + "/")` except `/` which must match exactly.

### `usePixelLayout`

Sidebar collapse state, navbar height CSS var, account info. Singleton module-level state.

```ts
const {
  accountInformation, // readonly ref: fullName, companyName, companyId, userPhoto
  setAccountInformation, // update account info (called by auth)
  isSidebarCollapsed,
  isSidebarHovered,
  useSidebar, // { toggle, setCollapse, calculateCssVar, setLoading }
  isSidebarChildCollapsed,
  useSidebarChild, // { toggle }
  navbarNode,
  sidebarNode,
  pixelContentAttrs // style attrs for main content wrapper
} = usePixelLayout();
```

## Layout Behavior (`default.vue`)

```
TheNavbar (fixed, full width)
└── bg-surface flex row
    ├── TheSidebar (collapsed when submenu active)
    ├── SidebarChild (visible when activeSubmenu exists)
    │   ├── InboxFilter      (when activeTopMenu.id === 'inbox')
    │   └── SidebarChildItems (all other routes with submenu)
    └── <slot /> ← page content
```

- When route has a submenu: sidebar auto-collapses (`useSidebar.setCollapse(true)`), `SidebarChild` opens.
- When route has no submenu: sidebar full width, no `SidebarChild`.
- Pages do not set `definePageMeta({ layout: "default" })` — Nuxt uses default layout automatically.
- Only exception: `login.vue` sets `definePageMeta({ layout: false })`.

## Dimensions

From `app/data/constants.ts`:

| Element             | Value                            |
| ------------------- | -------------------------------- |
| Navbar height       | 56px                             |
| Sidebar expanded    | 216px                            |
| Sidebar collapsed   | 52px (`SIDEBAR_COLLAPSED_WIDTH`) |
| Submenu panel       | 212px                            |
| Panel header height | 60px (`PANEL_HEADER_HEIGHT`)     |

## Page Structure Rules

**Convention: every page lives in its own folder as `index.vue`. No flat `.vue` files (except `login.vue`).**

### Unbuilt page (placeholder)

```vue
<template>
  <DefaultPageContent />
</template>
```

No script needed. `DefaultPageContent` auto-reads `activePageTitle` from `useAppMenu` and renders a standard header + content area shell.

### Built page (custom content)

Copy `DefaultPageContent` structure as starting point:

```vue
<template>
  <main
    data-pixel-component="PixelContent"
    style="padding-top: var(--pixel-navbar-height); min-height: 100svh; width: 100%"
  >
    <!-- page header -->
    <MpFlex justifyContent="space-between" alignItems="center" px="6" py="4">
      <MpText size="h1" weight="semiBold">{{ activePageTitle }}</MpText>
      <MpButton variant="primary">Action</MpButton>
    </MpFlex>

    <!-- content area -->
    <div
      :class="
        css({
          bg: 'background.neutral',
          borderTopWidth: '1px',
          borderLeftWidth: '1px',
          borderColor: 'border.default',
          roundedTopLeft: 'md',
          p: 6,
          minH: '100svh'
        })
      "
    >
      <!-- your content -->
    </div>
  </main>
</template>

<script setup lang="ts">
import { MpButton, MpFlex, MpText, css } from "@mekari/pixel3";
import { useAppMenu } from "~/composables/useAppMenu";

const { activePageTitle } = useAppMenu();
</script>
```

### Parent route redirect (submenu or accordion)

```vue
<script setup lang="ts">
await navigateTo("/inbox/all-chats", { replace: true });
</script>
```

No `definePageMeta` needed. Parent route should never render content — redirect to first child.

## File Locations

```txt
route: /calls
file:  app/pages/calls/index.vue

route: /inbox  (has submenu)
files: app/pages/inbox/index.vue          ← redirect to /inbox/all-chats
       app/pages/inbox/all-chats/index.vue
       app/pages/inbox/my-chats/index.vue
       ...

route: /settings/account  (accordion submenu)
files: app/pages/settings/account/index.vue  ← redirect to /settings/account/users
       app/pages/settings/account/users/index.vue
       ...
```

## Implementation Checklist

When adding a new menu item and page:

1. Add item to `app/data/menu.ts` (correct group, id, icon, route).
2. Create `app/pages/[route]/index.vue`.
3. If item has submenu: add `index.vue` redirect to first child route.
4. If item has accordion children: add group `index.vue` redirect to first child.
5. Start with `<DefaultPageContent />` — replace when building real content.
6. Verify: active highlight in sidebar, submenu opens/closes, page title correct, redirect works.

## Guardrails

- Do not use `definePageMeta({ layout: "default" })` — redundant, Nuxt uses it by default.
- Do not create flat `app/pages/foo.vue` files. Always use `app/pages/foo/index.vue`. Exception: `login.vue`.
- Do not hardcode page titles in pages. Use `activePageTitle` from `useAppMenu`.
- Do not duplicate route matching in components. Use `isRouteActive` from `useAppMenu`.
- Do not create parent pages that render content. Redirect to first child instead.
- Do not add a third menu level unless the product requires it. Current pattern: top-level → submenu → accordion children.
- Do not put page-specific UI into `default.vue`. Layout stays shell-only (navbar + sidebar + slot).
- Do not reference `useMenuState` — the composable is `useAppMenu`.
- Do not reference `contentAreaClass` from `usePixelLayout` — it does not exist. Use `pixelContentAttrs` or copy the `DefaultPageContent` structure.
