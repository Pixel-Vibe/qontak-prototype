// ── Types ───────────────────────────────────────────────────────
export type NotificationCategory =
  | "avatar"
  | "reminder"
  | "channel-whatsapp"
  | "channel-instagram"
  | "channel-shopee"
  | "channel-tokopedia"
  | "channel-google-business"
  | "channel-email"
  | "channel-blocked-contact"
  | "assignment-task"
  | "download-upload-general"
  | "update-general";

export type Notification = {
  category: NotificationCategory;
  name?: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  previousCondition?: string | null;
  currentCondition?: string | null;
};

// ── Helpers ─────────────────────────────────────────────────────
export function defineNotifications(items: Notification[]): Notification[] {
  return items;
}

export function getCategoryGroup(category: NotificationCategory): string {
  if (category === "avatar") return "avatar";
  if (category === "reminder") return "reminder";
  if (category.startsWith("channel-")) return "channel";
  if (category.startsWith("assignment-")) return "assignment";
  if (category.startsWith("download-upload-")) return "download-upload";
  if (category.startsWith("update-")) return "update";
  return "reminder";
}

// Background colors per category (raw hex — channel brands, Pixel token fallback)
const CATEGORY_BG: Record<NotificationCategory, string> = {
  avatar: "#387ceb",
  reminder: "#f59e0b",
  "channel-whatsapp": "#25d366",
  "channel-instagram": "#e1306c",
  "channel-shopee": "#f84d1e",
  "channel-tokopedia": "#00aa5b",
  "channel-google-business": "#4285f4",
  "channel-email": "#3b82f6",
  "channel-blocked-contact": "#8b97a9",
  "assignment-task": "#387ceb",
  "download-upload-general": "#22c55e",
  "update-general": "#6366f1"
};

export function getNotificationBackground(category: NotificationCategory): string {
  return CATEGORY_BG[category] ?? "#8b97a9";
}

// MpIcon name per category (used for non-avatar categories)
const CATEGORY_ICON: Partial<Record<NotificationCategory, string>> = {
  reminder: "time",
  "channel-whatsapp": "WhatsApp",
  "channel-instagram": "Instagram",
  "channel-shopee": "Shopee",
  "channel-tokopedia": "Tokopedia",
  "channel-google-business": "Google",
  "channel-email": "email-sent",
  "channel-blocked-contact": "block",
  "assignment-task": "task-todo",
  "download-upload-general": "download",
  "update-general": "settings"
};

export function getNotificationIconName(category: NotificationCategory): string {
  return CATEGORY_ICON[category] ?? "notification";
}

export function getInitialName(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase();
}

// Groups notifications into { today, older } based on timestamp heuristic
export function groupNotificationsByDate(notifications: Notification[]): {
  today: Notification[];
  older: Notification[];
} {
  const todayKeywords = ["Just now", "minutes ago", "hour", "hours"];
  const today: Notification[] = [];
  const older: Notification[] = [];

  for (const n of notifications) {
    if (todayKeywords.some((kw) => n.timestamp.includes(kw))) {
      today.push(n);
    } else {
      older.push(n);
    }
  }
  return { today, older };
}
