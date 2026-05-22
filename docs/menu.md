# Menu And Page Architecture

This doc captures how `/Users/mekari/Desktop/dev/qontak-design/app` builds Qontak sidebar navigation and how we should implement the same pattern here.

## Source Findings

The reference app uses Nuxt file-based routing with one global default layout:

- `app/layouts/default.vue` owns top navbar, sidebar, submenu panel, page header, and content offset.
- `app/composables/usePixelLayout.ts` exports shared layout constants and `contentAreaClass`.
- `app/pages/**` mirrors route paths. Most pages are thin placeholders using `contentAreaClass`.
- Parent routes such as `/inbox`, `/reports`, `/settings/account`, and `/loyalty/members` redirect to first useful child with `await navigateTo(..., { replace: true })`.
- Page-level actions are controlled by `definePageMeta({ pageAction })`. Example: subscription sets `pageAction: { label: 'Top up quota', icon: null }`; knowledge base hides action with `{ label: null, icon: null }`.

## Reference Menu Model

The reference layout keeps menu data inline as `navGroups`. Shape:

```ts
type NavGroup = NavItem[];

type NavItem = {
  icon: string;
  label: string;
  route: string;
  badge?: boolean;
  submenu?: {
    title: string;
    items: SubmenuItem[];
  };
};

type SubmenuItem = {
  label: string;
  route: string;
  count?: number;
  newTab?: boolean;
  hasArrow?: boolean;
  children?: SubmenuItem[];
};
```

Current top-level menu groups:

- Main: Home, Inbox, Calls, Campaigns, Bot & automation.
- CRM/reporting: Customers, Loyalty, Reports.
- Work: Deals, Tickets, Tasks.
- Operations: Commerce, Resources, Documents, Products, Expenses.
- Custom: Custom solutions.
- Account: Subscription, Settings.

Submenus support two levels:

- Regular child item: click navigates to `route`.
- Accordion parent: click expands and navigates to first child route.

## Layout Behavior

The default layout derives all navigation UI from menu config:

- If current route starts with a top-level route that has `submenu`, the sidebar collapses to icon width and a second submenu panel opens.
- If no submenu is active, sidebar stays full width.
- `activePageTitle` is computed from the matching deepest menu item label.
- Active top-level item uses `route.path.startsWith(item.route)`, except `/` must match exactly.
- Submenu accordion auto-expands when current route starts with the accordion parent route.
- Main content `margin-left` switches between full sidebar width and collapsed-sidebar plus submenu width.
- Header action reads `route.meta.pageAction`; missing meta falls back to default `Action` button.

Reference dimensions:

- Topbar: `56px`.
- Full sidebar: `240px`.
- Collapsed icon sidebar: `52px`.
- Submenu panel: `212px`.
- Page header: `72px`.

## Recommended Implementation

Use same behavior, but split data and layout responsibilities earlier so future pages stay easy to add.

Create these files:

```txt
app/data/menu.ts
app/composables/useMenuState.ts
app/composables/usePixelLayout.ts
app/layouts/default.vue
app/pages/**
```

Keep `app/data/menu.ts` as source of truth for:

- Menu groups.
- Top-level routes.
- Submenu routes.
- Default child route for parent redirects.
- Display labels used by page header.
- Badges, counts, new-tab flags, and accordion children.

Keep `app/layouts/default.vue` focused on rendering:

- Top navbar.
- Primary sidebar.
- Submenu panel.
- Page header.
- `<slot />` content area.

Move matching logic into `useMenuState.ts`:

- `activeTopItem`.
- `activeSubmenu`.
- `activeAccordion`.
- `activePageTitle`.
- `isActiveRoute(route)`.
- `getDefaultRoute(item)`.

This keeps layout readable and makes route behavior testable without parsing template code.

## Page Creation Rules

For a menu item with no submenu:

```txt
route: /calls
file: app/pages/calls.vue
```

Page skeleton:

```vue
<template>
  <div :class="contentAreaClass">
    <MpText color="text.secondary">Place content here...</MpText>
  </div>
</template>

<script setup lang="ts">
import { MpText } from "@mekari/pixel3";
import { contentAreaClass } from "~/composables/usePixelLayout";

definePageMeta({ layout: "default" });
</script>
```

For a menu item with submenu:

```txt
route: /inbox
redirect file: app/pages/inbox/index.vue
first child file: app/pages/inbox/all-chats.vue
```

Redirect skeleton:

```vue
<script setup lang="ts">
definePageMeta({ layout: "default" });
await navigateTo("/inbox/all-chats", { replace: true });
</script>
```

For accordion submenu:

```txt
route: /settings/account
redirect file: app/pages/settings/account/index.vue
first child file: app/pages/settings/account/users.vue
```

Use same redirect skeleton. Parent route should not render content unless product requires a real overview page.

## Page Action Rules

Default layout can show one primary header action.

Use default action:

```ts
definePageMeta({ layout: "default" });
```

Customize action:

```ts
definePageMeta({
  layout: "default",
  pageAction: { label: "Top up quota", icon: null }
});
```

Hide action:

```ts
definePageMeta({
  layout: "default",
  pageAction: { label: null, icon: null }
});
```

Keep complex page-specific actions inside page content, not global layout, unless they belong in every view of that route family.

## Implementation Checklist

When adding a new menu/page:

1. Add item to `app/data/menu.ts`.
2. Add matching `app/pages/**` file.
3. If item has submenu, add parent `index.vue` redirect to first child.
4. If item has accordion children, add group `index.vue` redirect to first child.
5. Use `definePageMeta({ layout: 'default' })`.
6. Use `contentAreaClass` for standard body background, border, radius, and padding.
7. Only add `pageAction` when page header button differs from default.
8. Verify active state, submenu open state, title, and redirect route in browser.

## Guardrails

- Do not hardcode menu labels in pages. Page title should come from menu config.
- Do not duplicate route matching in template. Keep route logic in composable.
- Do not create parent pages that only duplicate first child content. Redirect instead.
- Do not add third menu level unless product needs it. Current pattern supports top-level, submenu, and accordion child.
- Do not put large page-specific UI into layout. Layout stays shell-only.
- Keep Pixel tokens and components for layout chrome. Avoid custom CSS unless Pixel utility cannot express needed state.
