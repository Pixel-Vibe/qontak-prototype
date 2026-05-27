<!--
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Mekari Qontak — Home
  Source: Figma mdGkkYJ4ogCILwvDD7qxX5 node 6470:53430
  Token mode: Pixel 2.4
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  CONVENTION OVERRIDES:
    - Training card header: gradient bg replaces Figma image assets (not embeddable)
    - Open Tickets icon bg: #fff1ff (Figma raw hex, no semantic token)
    - Open Inbox icon bg: #f1f7ff (Figma raw hex, no semantic token)
-->
<template>
  <!-- ═════ Page shell (background.stage = white, matches Figma stage) ═════ -->
  <main :class="pageShell">
    <!-- ═════ Welcome header ═════ -->
    <section :class="welcomeSection">
      <MpText color="text.default">
        Welcome back, {{ accountInformation.fullName }}
      </MpText>
      <MpText size="h3" weight="semiBold" color="text.default" :class="css({ mt: '1' })">
        What activity would you like to do?
      </MpText>
    </section>

    <!-- ═════ Quick actions ═════ -->
    <section :class="contentSection">
      <div :class="quickActionsGrid">
        <div
          v-for="action in QUICK_ACTIONS"
          :key="action.label"
          :class="actionCard"
          style="min-width: 0"
          @click="navigateTo(action.to)"
        >
          <div :class="actionIconWrap(action.iconBg)">
            <MpIcon :name="action.icon" size="sm" :class="css({ color: action.iconColor })" />
          </div>
          <div :class="css({ flex: '1', minWidth: '0' })">
            <MpText weight="semiBold" color="text.default">
              {{ action.label }}
            </MpText>
            <MpText size="label-small" color="text.secondary">
              {{ action.description }}
            </MpText>
          </div>
        </div>
      </div>
    </section>

    <!-- ═════ Feature highlights ═════ -->
    <section :class="contentSection">
      <!-- Title is outside the bordered list container (matches Figma structure) -->
      <MpText size="h3" weight="semiBold" color="text.default" :class="css({ mb: '3' })">
        Feature highlights
      </MpText>

      <div :class="featureListContainer">
        <div
          v-for="(item, idx) in FEATURE_HIGHLIGHTS"
          :key="idx"
          :class="featureRow"
        >
          <div :class="featureIconCircle">
            <MpIcon :name="item.icon" size="sm" :class="css({ color: 'icon.default' })" />
          </div>

          <div :class="css({ flex: '1', minWidth: '0' })">
            <MpFlex gap="1" alignItems="center" :class="css({ mb: '1' })">
              <!-- 12px regular text.default (Figma: pxl-font-size-sm, regular) -->
              <MpText size="label-small" color="text.default">
                {{ item.title }}
              </MpText>
              <MpBadge for="additionalInformation" :type="item.badgeType" size="sm">
                {{ item.badge }}
              </MpBadge>
            </MpFlex>
            <MpFlex gap="1" alignItems="center">
              <!-- 14px regular text.default (Figma: pxl-font-size-md, regular) -->
              <MpText color="text.default" :class="css({ flex: '1' })">
                {{ item.description }}
              </MpText>
              <MpTextlink right-icon="newtab">
                {{ item.linkText }}
              </MpTextlink>
            </MpFlex>
            <MpText size="label-small" color="text.secondary" :class="css({ mt: '1' })">
              {{ item.date }}
            </MpText>
          </div>
        </div>

        <div :class="css({ px: '2', py: '3' })">
          <MpTextlink right-icon="newtab">View all updates</MpTextlink>
        </div>
      </div>
    </section>

    <!-- ═════ Upcoming training ═════ -->
    <section :class="contentSection">
      <MpText size="h3" weight="semiBold" color="text.default" :class="css({ mb: '4' })">
        Upcoming training session
      </MpText>

      <div :class="trainingGrid">
        <div
          v-for="session in TRAINING_SESSIONS"
          :key="session.title"
          :class="trainingCard"
        >
          <!-- Card header image area (gradient replaces Figma illustration assets) -->
          <div :class="trainingCardHeader" :style="{ background: session.headerColor }" />

          <!-- Card body -->
          <div :class="css({ p: '4', display: 'flex', flexDir: 'column', gap: '2', flex: '1' })">
            <MpText size="body-small" weight="semiBold" color="text.default">
              {{ session.title }}
            </MpText>
            <MpText size="label-small" color="text.secondary">
              {{ session.description }}
            </MpText>

            <MpFlex gap="2" alignItems="center">
              <MpIcon name="calendar" size="sm" :class="css({ color: 'icon.secondary' })" />
              <MpText size="label-small" color="text.secondary">{{ session.date }}</MpText>
            </MpFlex>
            <MpFlex gap="2" alignItems="center">
              <MpIcon name="time" size="sm" :class="css({ color: 'icon.secondary' })" />
              <MpText size="label-small" color="text.secondary">{{ session.time }}</MpText>
            </MpFlex>

            <div :class="css({ mt: 'auto', pt: '2' })">
              <MpButton variant="secondary" size="sm" right-icon="newtab" is-full-width>
                Register now
              </MpButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { MpBadge, MpButton, MpFlex, MpIcon, MpText, MpTextlink, css } from "@mekari/pixel3";
import { usePixelLayout } from "~/composables/usePixelLayout";

const { accountInformation } = usePixelLayout();

// ── Quick actions ──────────────────────────────────────────────
// Icon bg values from Figma:
//   broadcast → background.success (#f2f9f6)
//   team      → background.brand (#eef0fc)
//   company   → background.warning (#fdf6dd)
//   sales     → background.highlight (#f3f1fc)
//   voucher   → #fff1ff (raw Figma hex)
//   inbox     → #f1f7ff (raw Figma hex)
const QUICK_ACTIONS = [
  {
    label: "Create campaign",
    description: "Promote offers, expand reach.",
    icon: "broadcast",
    iconBg: "background.success",
    iconColor: "icon.success",
    to: "/campaigns/whatsapp"
  },
  {
    label: "Add customer",
    description: "Manage contacts and relationships.",
    icon: "contact",
    iconBg: "background.brand",
    iconColor: "icon.brand",
    to: "/customers/all-customers"
  },
  {
    label: "Add company",
    description: "Centralize and associate customers.",
    icon: "company",
    iconBg: "background.warning",
    iconColor: "icon.warning",
    to: "/customers/all-companies"
  },
  {
    label: "Create deal",
    description: "Track pipelines, close sales.",
    icon: "pipeline",
    iconBg: "background.highlight",
    iconColor: "icon.brand",
    to: "/deals/all-deals"
  },
  {
    label: "Open Tickets",
    description: "Track and resolve your open tickets.",
    icon: "task-todo",
    iconBg: "#fff1ff",
    iconColor: "icon.brand",
    to: "/tickets/all-tickets"
  },
  {
    label: "Open Inbox",
    description: "Manage chats that assigned to you.",
    icon: "inbox",
    iconBg: "#f1f7ff",
    iconColor: "icon.information",
    to: "/inbox"
  }
] as const;

// ── Feature highlights ─────────────────────────────────────────
// Badge types from Figma:
//   "New"          → danger/red  → "critical"
//   "Improvement"  → blue       → "information"
//   "System update"→ yellow     → "warning"
type BadgeType = "completed" | "warning" | "critical" | "announcement" | "information";

const FEATURE_HIGHLIGHTS: {
  icon: string;
  title: string;
  badge: string;
  badgeType: BadgeType;
  description: string;
  linkText: string;
  date: string;
}[] = [
  {
    icon: "pipeline",
    title: "Deals",
    badge: "New",
    badgeType: "critical",
    description: "Create bulk deals with auto-assignment rules.",
    linkText: "Try bulk create",
    date: "10 Nov 2025"
  },
  {
    icon: "task-todo",
    title: "Bot & Automation",
    badge: "Improvement",
    badgeType: "information",
    description: "Improved fallback handling for unsupported queries",
    linkText: "Try bot",
    date: "4 Nov 2025"
  },
  {
    icon: "billing",
    title: "Billing",
    badge: "System update",
    badgeType: "warning",
    description: "Mekari has adjusted its billing. This update will be reflected in Mekari Qontak billing.",
    linkText: "View pricing details",
    date: "3 Nov 2025"
  },
  {
    icon: "chart-bar-line",
    title: "Reports",
    badge: "New",
    badgeType: "critical",
    description: "Gain actionable insights with comprehensive reports.",
    linkText: "View report",
    date: "2 Nov 2025"
  },
  {
    icon: "inbox",
    title: "Inbox",
    badge: "Improvement",
    badgeType: "information",
    description: "A new look, multi-channel search indexing for faster, more accurate results.",
    linkText: "Search conversations",
    date: "1 Nov 2025"
  }
];

// ── Training sessions ──────────────────────────────────────────
const TRAINING_SESSIONS = [
  {
    title: "[ONLINE] Qontak Training Marketing Omnichannel",
    description: "Master how to use Mekari Qontak through the marketing & use cases.",
    date: "Wed, 10 Dec 2025",
    time: "10:00 – 12:00 WIB",
    headerColor: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)"
  },
  {
    title: "[ONLINE] Qontak Training Customer Service",
    description: "Explore how to operate Mekari Qontak for customer service use cases.",
    date: "Wed, 17 Dec 2025",
    time: "10:00 – 12:00 WIB",
    headerColor: "linear-gradient(135deg, #d97706 0%, #fbbf24 100%)"
  },
  {
    title: "[ONLINE] Qontak Training Sales",
    description: "Discover how to streamline your sales processes with Mekari Qontak.",
    date: "Wed, 24 Dec 2025",
    time: "10:00 – 12:00 WIB",
    headerColor: "linear-gradient(135deg, #059669 0%, #34d399 100%)"
  }
];

// ── Styles ─────────────────────────────────────────────────────
// pageShell: background.stage (white) matches Figma stage area
const pageShell = css({
  paddingTop: "var(--pixel-navbar-height)",
  minHeight: "100svh",
  width: "100%",
  bg: "background.stage",
  display: "flex",
  flexDir: "column",
  alignItems: "center"
});

// Figma welcome section: pt-32px pb-16px px-104px, centered
const welcomeSection = css({
  width: "full",
  maxWidth: "1222px",
  px: "16",
  pt: "8",
  pb: "4",
  textAlign: "center"
});

const contentSection = css({
  width: "full",
  maxWidth: "1222px",
  px: "16",
  pb: "6"
});

// Figma: flex-wrap gap-12px justify-center items-start
const quickActionsGrid = css({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "3"
});

// Figma: bg-neutral border rounded-lg pl-12px pr-16px py-12px
const actionCard = css({
  display: "flex",
  alignItems: "center",
  gap: "3",
  bg: "background.neutral",
  borderWidth: "1px",
  borderColor: "border.default",
  rounded: "lg",
  pl: "3",
  pr: "4",
  py: "3",
  cursor: "pointer",
  transition: "all 200ms ease",
  _hover: {
    borderColor: "border.brand",
    boxShadow: "sm"
  }
});

// Icon wrap: size-36px rounded-md, bg varies per action
function actionIconWrap(bg: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return css({ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0", rounded: "md", size: "9", bg: bg as any });
}

// Feature highlights: list with bottom borders, no outer border card
const featureListContainer = css({
  borderWidth: "1px",
  borderColor: "border.default",
  rounded: "lg",
  overflow: "hidden"
});

// Figma: gap-12px items-center border-b pl-8px pr-16px py-12px
const featureRow = css({
  display: "flex",
  gap: "3",
  alignItems: "center",
  px: "2",
  py: "3",
  borderBottomWidth: "1px",
  borderColor: "border.default"
});

// Figma: size-38px rounded-full bg-neutral-pressed
const featureIconCircle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: "0",
  bg: "background.neutral-pressed",
  rounded: "full",
  size: "38px"
});

// Figma training section: gap-24px items-center, 3-column grid
const trainingGrid = css({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "3"
});

const trainingCard = css({
  bg: "background.neutral",
  borderWidth: "1px",
  borderColor: "border.default",
  rounded: "lg",
  overflow: "hidden",
  display: "flex",
  flexDir: "column"
});

const trainingCardHeader = css({ height: "120px", flexShrink: "0" });
</script>
