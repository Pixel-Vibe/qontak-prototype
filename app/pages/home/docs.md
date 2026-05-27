# Home Page — Generation Docs

## Overview

| Field      | Value                      |
| ---------- | -------------------------- |
| Model      | Claude Sonnet 4.6 (medium) |
| Skill      | `pixel` (Figma path)       |
| Figma file | `mdGkkYJ4ogCILwvDD7qxX5`   |
| Figma node | `6470:53430`               |
| Token mode | Pixel 2.4                  |

---

## User Prompts

### Session 1 — Initial implementation

```
implement this figma https://www.figma.com/design/mdGkkYJ4ogCILwvDD7qxX5/Home?node-id=6470-53430&t=sGgYCJRsXY5Rh5Oj-4
(update the navbar, no need update the sidebar) and update the homepage with /pixel
```

Follow-up prompts:

- `"this page should be /home so when user open / it will be redirect to /home first"`
- `"why not put in /pages/home folder ? did the contibuting file not mention this ?"`
- `"did u use skill or mcp when generate this ? i want u to create docs.md in folder home"`
- `"why sonet 4.5 ? it is sonet 4.6 medium"`
- `"there several bug after this update, switch app drawer not show, online status popover width no right"`

### Session 2 — Re-implementation fix

```
ulangi implementasi dari figma, font size, background color tidak sesuai. hanya pakai skill /pixel
```

---

## Skills Invoked

| Session | Skill                           | Purpose                                              |
| ------- | ------------------------------- | ---------------------------------------------------- |
| 1       | `implement-to-pixel` (Branch B) | Initial Figma-to-code                                |
| 2       | `pixel`                         | Full re-implementation fixing font sizes + bg colors |

---

## MCP Tool Calls

### Session 1

#### Figma MCP

| Call                 | Args                            | Purpose                              |
| -------------------- | ------------------------------- | ------------------------------------ |
| `get_design_context` | fileKey, nodeId `6470:53430`    | Full component tree + reference code |
| `get_screenshot`     | same node, `maxDimension: 2048` | Visual reference                     |

#### Pixel MCP

| Call            | Query                     | Purpose                             |
| --------------- | ------------------------- | ----------------------------------- |
| `get-component` | `Button`                  | Validate MpButton props/variants    |
| `get-component` | `Badge`                   | Validate MpBadge `for`/`type` props |
| `get-component` | `Icon`                    | Confirm MpIcon props                |
| `get-icon-name` | `chevron-down`            | → `chevrons-down`                   |
| `get-icon-name` | `broadcast campaign`      | → `broadcast` ✓                     |
| `get-icon-name` | `building company`        | → `company` ✓                       |
| `get-icon-name` | `deal handshake crm`      | no match → used `pipeline`          |
| `get-icon-name` | `ticket`                  | no match → used `task-todo`         |
| `get-icon-name` | `customer contact person` | → `contact` ✓                       |
| `get-icon-name` | `calendar clock time`     | → `calendar`, `time`                |
| `get-icon-name` | `chart bar line pipeline` | → `chart-bar-line`, `pipeline` ✓    |
| `get-icon-name` | `task support help`       | → `task-todo` ✓                     |

#### Preview MCP

| Call                     | Purpose                               |
| ------------------------ | ------------------------------------- |
| `preview_start`          | Start Nuxt dev server                 |
| `preview_screenshot` × 5 | Visual checks per fix                 |
| `preview_console_logs`   | Runtime error check                   |
| `preview_eval` × 6       | Scroll, DOM inspection, verify drawer |

### Session 2

#### Figma MCP

| Call                 | Args                               | Purpose                                |
| -------------------- | ---------------------------------- | -------------------------------------- |
| `get_design_context` | `6470:53430`                       | Re-extract full design tree (101.8 KB) |
| `get_screenshot`     | `6470:53430`, `maxDimension: 2048` | Visual reference for diff              |

#### Pixel MCP

| Call            | Query     | Purpose                                       |
| --------------- | --------- | --------------------------------------------- |
| `get-component` | `MpText`  | Validate size values (h3, label, label-small) |
| `get-component` | `MpBadge` | Validate badge type values                    |

---

## Files Changed

| File                                     | Action                                                  |
| ---------------------------------------- | ------------------------------------------------------- |
| `app/pages/home/index.vue`               | Created (session 1), re-implemented (session 2)         |
| `app/pages/index.vue`                    | Replaced — redirect to `/home`                          |
| `app/components/navbar/index.vue`        | Updated — removed SelectApp/Divider, added OnlineStatus |
| `app/components/navbar/OnlineStatus.vue` | Created — Online/Busy/Offline pill dropdown             |
| `app/data/menu.ts`                       | Updated — Home route `"/"` → `"/home"`                  |
| `app/pages/home/docs.md`                 | Created + updated                                       |

---

## Bugs Fixed

### Session 1 — Initial

| Bug                                      | Cause                                                                   | Fix                                                                |
| ---------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Quick actions showed 2 cols instead of 3 | `flex-wrap` + fixed `width: 330px` overflowed                           | Switched to `display: grid; grid-template-columns: repeat(3, 1fr)` |
| Training card header gradient invisible  | Returned array `[css(), { style }]` from fn — invalid Vue class binding | Separated `:class` + `:style`                                      |
| `clock` icon not found                   | Icon doesn't exist in Pixel 3                                           | Replaced with `time`                                               |
| SwitchApp drawer appeared broken         | Testing/timing issue with preview tool                                  | Confirmed working via DOM inspection + eval click                  |
| OnlineStatus popover width wrong         | Used `width: '44'` not applying                                         | Changed to `minWidth: '44'`                                        |

### Session 2 — Re-implementation

| Bug / Deviation                        | Root Cause                                                          | Fix                                                                                |
| -------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Page background gray instead of white  | `pageShell` used `background.surface` instead of `background.stage` | Changed to `background.stage`                                                      |
| "Welcome back" text wrong size + color | Used `size="label-small" color="text.secondary"` (12px gray)        | Changed to default size (14px) + `color="text.default"`                            |
| "What activity" heading wrong size     | Used raw `css({ fontSize: 'xl' })`                                  | Changed to `size="h3" weight="semiBold"` (20px)                                    |
| "Feature highlights" title too small   | Used default MpText (14px)                                          | Changed to `size="h3" weight="semiBold"` (20px) — matches Figma `pxl-font-size-xl` |
| Feature item title was semiBold        | Used `size="body-small" weight="semiBold"`                          | Figma: 12px regular — changed to `size="label-small"` (no weight)                  |
| Feature item description too small     | Used `size="label-small"` (12px)                                    | Figma: 14px — removed size prop (defaults to 14px)                                 |
| "New" badge wrong color                | Used `type="announcement"` (orange)                                 | Figma: danger red — changed to `type="critical"`                                   |
| Action card bg wrong                   | Used `background.stage`                                             | Figma: `background.neutral`                                                        |
| Add company icon bg wrong              | Used `background.information`                                       | Figma: `background.warning` (#fdf6dd)                                              |
| Create deal icon bg wrong              | Used `background.warning`                                           | Figma: `background.highlight` (#f3f1fc)                                            |
| Open Tickets icon bg wrong             | Used `background.announcement`                                      | Figma raw hex: `#fff1ff`                                                           |
| Open Inbox icon bg wrong               | Used `background.information`                                       | Figma raw hex: `#f1f7ff`                                                           |
| Training grid broken                   | Used `gridTemplateColumns: "3"` (invalid CSS)                       | Fixed to `"repeat(3, 1fr)"`                                                        |
| Used `MpButton` for textlinks          | Should use `MpTextlink` for inline text links                       | Replaced with `MpTextlink` in feature highlights                                   |

---

## Key Design Values from Figma

### Typography

| Element                                       | Size                      | Weight   | Color            |
| --------------------------------------------- | ------------------------- | -------- | ---------------- |
| "Welcome back"                                | 14px (`pxl-font-size-md`) | regular  | `text.default`   |
| "What activity" heading                       | 20px (`pxl-font-size-xl`) | semibold | `text.default`   |
| Section titles (Feature highlights, Training) | 20px                      | semibold | `text.default`   |
| Action card label                             | 14px                      | semibold | `text.default`   |
| Action card description                       | 12px                      | regular  | `text.secondary` |
| Feature item name                             | 12px                      | regular  | `text.default`   |
| Feature item description                      | 14px                      | regular  | `text.default`   |
| Feature item date                             | 12px                      | regular  | `text.secondary` |

### Background Colors

| Element              | Token                        | Hex       |
| -------------------- | ---------------------------- | --------- |
| Page stage           | `background.stage`           | white     |
| Action card          | `background.neutral`         | white     |
| Create campaign icon | `background.success`         | `#f2f9f6` |
| Add customer icon    | `background.brand`           | `#eef0fc` |
| Add company icon     | `background.warning`         | `#fdf6dd` |
| Create deal icon     | `background.highlight`       | `#f3f1fc` |
| Open Tickets icon    | _(raw)_                      | `#fff1ff` |
| Open Inbox icon      | _(raw)_                      | `#f1f7ff` |
| Feature icon circle  | `background.neutral-pressed` | `#f0f1f3` |

### Badge Types

| Label         | Pixel type    | Color  |
| ------------- | ------------- | ------ |
| New           | `critical`    | red    |
| Improvement   | `information` | blue   |
| System update | `warning`     | yellow |

---

## Known Deviations from Figma

| Element               | Figma                                     | Implemented                                           |
| --------------------- | ----------------------------------------- | ----------------------------------------------------- |
| Training card header  | Actual illustration images (Figma assets) | CSS gradient per card                                 |
| User name in greeting | "Rizal Candra" (Figma placeholder)        | Reads from `accountInformation.fullName` (composable) |
| Open Tickets icon bg  | `#fff1ff` (no Pixel token)                | Raw hex via `css()` `as any`                          |
| Open Inbox icon bg    | `#f1f7ff` (no Pixel token)                | Raw hex via `css()` `as any`                          |
