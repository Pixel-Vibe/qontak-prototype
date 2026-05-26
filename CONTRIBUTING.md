# Contributing

This is a UI prototyping app for Mekari Qontak. Sidebar, navbar, and layout shell are fixed — contributors add/update content pages and menu items.

---

## 🎨 Designer Vibe Coding Guide

This section is for designers contributing via AI (Claude Code or similar).

### Mindset

You own the **content area only**. The sidebar, navbar, and layout are stable infrastructure — treat them like a browser chrome. Your job is the page inside.

### Starting a new page

1. Find the right route in `app/pages/` (matches the URL)
2. If the page exists, it likely already uses `DefaultPageContent` — edit that file
3. If the page doesn't exist yet, ask AI to create it using the template below

**Prompt template for a new page:**

```
I'm working on the Qontak prototype app (Nuxt 4, Vue 3, @mekari/pixel3 design system).
Create a new page at app/pages/[your-route].vue.
Start from DefaultPageContent template.
The page should show: [describe your layout/content].
Use only Pixel 3 components (MpFlex, MpText, MpButton, MpTable, etc).
Do not touch sidebar, navbar, or layout files.
```

### Telling AI what you want

Be specific about **structure**, not styling details. AI knows Pixel 3 tokens.

✅ Good prompts:

- "Add a data table with columns: Name, Status, Created At, Actions"
- "Add a filter bar above the table with a search input and a status dropdown"
- "Show an empty state illustration when the list is empty"
- "Add a drawer that opens when clicking a row"

❌ Avoid:

- "Make it look nice" — too vague
- "Use blue color #1A56DB" — use tokens, not hex
- "Add a custom sidebar item" — sidebar is off limits
- "Install [some UI library]" — Pixel 3 only

### What AI already knows about this project

The project has a `CLAUDE.md` that Claude reads automatically. It knows:

- Stack: Nuxt 4, Vue 3, TypeScript, `@mekari/pixel3`
- Pixel 3 MCP is available — Claude can look up components and tokens live
- Which files are stable and shouldn't be touched

You don't need to repeat these in every prompt.

### Pixel 3 design system

This project has a **Pixel skill** that Claude reads automatically. It knows every component API, icon name, design token, and styling rule. You don't need to look these up manually.

Ask Claude like this:

```
What Pixel 3 component should I use for a data table?
What's the icon name for download in Pixel 3?
Show me MpDrawer usage with a form inside.
```

Or browse the docs: https://pixel.mekari.com

### Common patterns

**Page with header + content area:**

```vue
<template>
  <DefaultPageContent />
</template>
```

`activePageTitle` auto-reads from the menu config — no need to hardcode the title.

**Page with card grid:**

```vue
<template>
  <BoxedPageContent />
</template>
```

**Implementing a page — do not edit the template component:**

When a page still shows placeholder content, it imports `DefaultPageContent` directly. To implement it, replace the page file contents — not the template component.

```vue
<!-- BEFORE: app/pages/campaigns/whatsapp.vue (placeholder) -->
<template>
  <DefaultPageContent />
</template>
<script setup lang="ts">
import DefaultPageContent from "~/components/template/DefaultPageContent.vue";
</script>

<!-- AFTER: replace with your actual UI -->
<template>
  <main style="padding-top: var(--pixel-navbar-height); min-height: 100svh; width: 100%">
    <!-- your content here -->
  </main>
</template>
<script setup lang="ts">
// your imports and logic here
</script>
```

`DefaultPageContent.vue` and `BoxedPageContent.vue` must stay untouched — they serve all unbuilt pages simultaneously.

**Custom layout — ask AI with this context:**

```
Using @mekari/pixel3, create a page layout with:
- A sticky top bar (height 60px) with title and action button
- A scrollable content area below
Use css() for static styles, :style binding for pixel values from variables.
```

### Before you push — checklist

- [ ] Run `pnpm dev` and visually check the page at its route
- [ ] No changes to `navbar/`, `sidebar/`, `layouts/`, `usePixelLayout.ts`
- [ ] No hardcoded colors or external UI libraries added
- [ ] Page title shows correctly in the sidebar (comes from menu config)
- [ ] Run `pnpm lint:fix && pnpm format` (or just try pushing — hook runs it)

### When AI gets it wrong

| Problem                                   | Fix                                                                           |
| ----------------------------------------- | ----------------------------------------------------------------------------- |
| Adds `` `${CONSTANT}px` `` inside `css()` | Move to `:style` binding — PandaCSS can't scan it                             |
| Imports from wrong path                   | Paths use `~/` alias, e.g. `~/components/template/...`                        |
| Modifies sidebar, navbar, or layout       | Revert those files, re-prompt with "do not touch sidebar/navbar/layout files" |

---

## Prerequisites

- Node.js v22+
- pnpm v9+

```bash
nvm use 22
pnpm install
```

## Branch naming

Always branch off `main`. Use these prefixes:

| Prefix      | When to use                            |
| ----------- | -------------------------------------- |
| `feat/`     | New page, new menu item, new component |
| `fix/`      | Bug fix, visual correction             |
| `chore/`    | Tooling, config, dependency update     |
| `refactor/` | Code restructure, no behavior change   |

```bash
git checkout main
git pull origin main
git checkout -b feat/your-feature-name
```

Examples:

- `feat/inbox-conversation-page`
- `feat/add-reports-menu`
- `fix/sidebar-collapse-icon`

## Development

```bash
pnpm dev
```

App runs at `http://localhost:3000`.

## What to keep stable

Do **not** modify these without discussion:

- `app/components/navbar/` — navbar shell
- `app/components/sidebar/` — sidebar shell
- `app/layouts/default.vue` — layout composition
- `app/composables/usePixelLayout.ts` — sidebar/navbar state
- `app/data/constants.ts` — layout constants

Safe to add/edit:

- `app/pages/**` — page content
- `app/data/menu.ts` — add menu items
- `app/components/template/` — reusable page templates

## Adding a menu item

Edit `app/data/menu.ts`. Add to `APP_MENU_ITEMS` and wire into `APP_MENU_GROUPS`. Create the corresponding page under `app/pages/`.

## Page templates

Use these ready-made templates instead of writing from scratch:

```vue
<!-- Default single-column page -->
<template>
  <DefaultPageContent />
</template>
<script setup lang="ts">
import DefaultPageContent from "~/components/template/DefaultPageContent.vue";
</script>

<!-- Boxed grid page -->
<template>
  <BoxedPageContent />
</template>
<script setup lang="ts">
import BoxedPageContent from "~/components/template/BoxedPageContent.vue";
</script>
```

## Pixel 3 design system

Use `@mekari/pixel3` components only. Do not add external UI libraries.

The project has a **Pixel skill** pre-configured — Claude uses it automatically for component APIs, tokens, icons, and styling rules.

**One project-specific rule the skill doesn't enforce:**
Never use imported constants inside `css()` as template literals. PandaCSS scans statically and won't generate the class.

```ts
// ❌ breaks — PandaCSS can't scan this
css({ width: `${SIDEBAR_WIDTH}px` })

// ✅ correct — use :style for dynamic pixel values
:style="{ width: `${SIDEBAR_WIDTH}px` }"

// ✅ also correct — string literals work
css({ width: '216px' })
```

## Linting & formatting

Run before committing:

```bash
pnpm lint:fix
pnpm format
```

Pre-push hook runs these automatically and blocks push on failure.

## Creating a Pull Request

1. Push your branch:

   ```bash
   git push origin feat/your-feature-name
   ```

2. Open a PR against `main` on GitHub.

3. PR title format: `[feat] Short description` / `[fix] Short description`

4. Fill in the PR description:
   - What changed and why
   - Screenshot or screen recording if visual change
   - Pages/routes affected

5. At least one review required before merge.

6. Squash merge into `main`.

## Commit message

```
feat: add campaigns whatsapp page
fix: sidebar collapse button position
chore: update pixel3 to 1.0.13
```

Keep it short, imperative, lowercase.
