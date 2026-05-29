# Unified Notification Center — Implementation Docs

## Overview

| Field      | Value                                  |
| ---------- | -------------------------------------- |
| Model      | Claude Sonnet 4.6 (medium)             |
| Skill      | `pixel` + `get-pattern unified-notification` |
| Pattern    | `unified-notification` (Pixel MCP)     |
| Session    | 2025-05-29                             |

---

## User Prompt

```
yes, ubah implementasi notification yang sekarang dengan yang dari unified-notification

setelah selesai but summarize di folder `docs/unified-notifications.md` isi nya sama seperti doc.md di home
```

---

## Skills / MCP Calls

| Tool | Call | Purpose |
|------|------|---------|
| Pixel MCP | `get-pattern unified-notification` | Fetch full pattern code (components, data, composable) |
| Pixel MCP | `get-icon-name whatsapp instagram email channel` | Validate channel icon names |
| Pixel MCP | `get-icon-name shopee tokopedia google download upload task` | Validate remaining icon names |

---

## Files Changed

### Created

| File | Purpose |
|------|---------|
| `app/components/notification/utils.ts` | Types (`NotificationCategory`, `Notification`), utility functions (`defineNotifications`, `getCategoryGroup`, `getNotificationBackground`, `getNotificationIconName`, `getInitialName`, `groupNotificationsByDate`) |
| `app/components/notification/NotificationCenter.vue` | Main trigger: MpPopover + bell button + unread badge + scroll tracking |
| `app/components/notification/NotificationCenterPopover.vue` | Popover content: sticky tab header (General/Inbox/Approval), filter autocomplete, Mark all, tab panels with mock data |
| `app/components/notification/NotificationIcon.vue` | Per-category icon: avatar → colored circle with initials; others → MpIcon with brand icon + colored bg |
| `app/components/notification/NotificationItem.vue` | Single notification row: icon + title + message + timestamp + change indicator + unread dot |
| `app/components/notification/NotificationLoading.vue` | Skeleton: 3-row loading placeholder using MpSkeleton |
| `app/components/notification/BlankState.vue` | Single blank state: illustration + title + subtitle |
| `app/components/notification/NotificationBlankStates.vue` | All blank state variants: no-notification, all-read, not-found |
| `app/components/notification/EndOfTab.vue` | Bottom of list indicator with inbox icon + text |
| `app/components/notification/TabGeneral.vue` | General tab: TODAY/OLDER groups, unread filter, notification items |
| `app/components/notification/TabInbox.vue` | Inbox tab: same structure as TabGeneral |
| `app/components/notification/TabApproval.vue` | Approval tab: same structure, includes previousCondition/currentCondition items |
| `app/composables/useNotificationTab.ts` | Shared tab logic: `hasNotifications`, `hasViewedAll`, `hasNoResult`, click/read handlers |
| `docs/unified-notifications.md` | This file |

### Updated

| File | Change |
|------|--------|
| `app/components/navbar/index.vue` | Replaced `<Notification><NotificationContent /></Notification>` with `<NotificationCenter />` |

### Deleted

| File | Reason |
|------|--------|
| `app/components/navbar/Notification.vue` | Replaced by `NotificationCenter.vue` |
| `app/components/navbar/NotificationContent.vue` | Replaced by `NotificationCenterPopover.vue` |

---

## Architecture

```
NotificationCenter.vue              ← navbar entry point (popover trigger + badge)
└── NotificationCenterPopover.vue   ← full popover (tabs, filter, data)
    ├── TabGeneral.vue              ← General tab
    ├── TabInbox.vue                ← Inbox tab
    └── TabApproval.vue             ← Approval tab
        └── NotificationItem.vue   ← single notification row
            └── NotificationIcon.vue ← colored circle with icon/initials
        └── NotificationLoading.vue  ← skeleton
        └── NotificationBlankStates.vue
            └── BlankState.vue
        └── EndOfTab.vue

app/composables/useNotificationTab.ts  ← shared computed + handlers (all tabs)
app/components/notification/utils.ts   ← types + pure utility functions
```

---

## Notification Categories

| Category | Group | Icon | Background |
|----------|-------|------|-----------|
| `avatar` | avatar | initials text | `#387ceb` (blue) |
| `reminder` | reminder | `time` | `#f59e0b` (amber) |
| `channel-whatsapp` | channel | `WhatsApp` | `#25d366` |
| `channel-instagram` | channel | `Instagram` | `#e1306c` |
| `channel-shopee` | channel | `Shopee` | `#f84d1e` |
| `channel-tokopedia` | channel | `Tokopedia` | `#00aa5b` |
| `channel-google-business` | channel | `Google` | `#4285f4` |
| `channel-email` | channel | `email-sent` | `#3b82f6` |
| `channel-blocked-contact` | channel | `block` | `#8b97a9` |
| `assignment-task` | assignment | `task-todo` | `#387ceb` |
| `download-upload-general` | download-upload | `download` | `#22c55e` |
| `update-general` | update | `settings` | `#6366f1` |

---

## Tabs & Unread Counts (Mock Data)

| Tab | Unread | Items |
|-----|--------|-------|
| General | 8 | reminders, mentions, assignments, downloads, updates |
| Inbox | 12 | channel messages (WhatsApp, Instagram, Shopee, Tokopedia, Google, email, blocked) |
| Approval | 3 | deal/expense requests, approvals, rejections with previousCondition → currentCondition |

---

## Key Design Decisions

| Decision | Reason |
|----------|--------|
| Raw hex for icon backgrounds | Pixel token paths for `chart.cat01-bold`, `warning.bold` etc unverified — raw hex safer |
| `token.var()` not used for bg | Same reason — avoided to prevent runtime failures |
| `usePixelTheme` from `@mekari/pixel3` | Project imports it from `@mekari/pixel3`, not `@mekari/pixel3-utils` |
| `groupNotificationsByDate` heuristic | Prototype: "today" = timestamps containing `Just now`, `minutes ago`, `hour(s)` |
| `hasViewedAll` always false | Prototype: no scroll tracking for "all viewed" state |
| `hasNoResult` always false | Prototype: filter is visual-only, no actual filtering logic |
| BlankState uses single CDN image | No local `/illustrations/` folder — reuses existing Mekari CDN illustration |
| `is-close-on-select` not on popover | Notification list stays open after clicking an item (UX: read more) |

---

## Known Deviations from Pattern

| Pattern | Implemented |
|---------|-------------|
| `getChannelIcon()` returns SVG Vue component | Removed — all channels use MpIcon with brand icon names |
| `getSpecialChannelIcon()` separate function | Merged into single `getNotificationIconName()` |
| Images from `/illustrations/*.png` (local) | Uses `cdn.mekari.design` URL (same image for all blank state variants) |
| `'../compasables/useNotificationTab'` import path | Fixed typo → `~/composables/useNotificationTab` |
| `usePixelTheme` from `@mekari/pixel3-utils` | Changed to `@mekari/pixel3` (project convention) |
| 15+ notifications per tab | Trimmed to 7–8 per tab for readability |
