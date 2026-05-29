<template>
  <div id="notification-center-popover">
    <!-- Header -->
    <MpFlex alignItems="center" justifyContent="space-between" pt="4" pb="2" px="4">
      <MpText size="h2">Notifications</MpText>
      <MpToggle v-model:is-checked="isShowUnreadOnly">Show unread only</MpToggle>
    </MpFlex>

    <!-- Tabs -->
    <MpFlex>
      <MpTabs
        v-model="currentTab"
        is-manual
        :class="css({ width: 'full', mb: '0' })"
        @change="handleChangeTab"
      >
        <!-- Sticky tab header -->
        <div
          :class="css({ position: 'sticky', top: '0', zIndex: '1', bg: 'background.stage' })"
          :style="{ boxShadow: isScrolled ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }"
        >
          <MpTabList :class="css({ '& > div': { mb: '0', px: '4' } })">
            <MpTab v-for="(tab, i) in TABS" :key="i">
              {{ tab.name }}
              <MpBadge
                v-if="tab.unreadCount > 0"
                for="additionalInformation"
                type="critical"
                :class="css({ ml: '2' })"
              >
                {{ tab.unreadCount }}
              </MpBadge>
            </MpTab>
          </MpTabList>

          <!-- Filter + Mark all -->
          <MpFlex alignItems="center" justifyContent="space-between" py="2" px="4">
            <MpFlex width="216px">
              <MpAutocomplete v-model="generalFilter" :data="currentFilterData" />
            </MpFlex>
            <MpButton variant="textLink" @click="handleMarkAllAsRead">Mark all as read</MpButton>
          </MpFlex>
        </div>

        <!-- Tab panels -->
        <MpTabPanels>
          <MpTabPanel>
            <TabGeneral
              :is-loading="isLoading"
              :is-show-unread-only="isShowUnreadOnly"
              :general-filter="generalFilter"
              :notifications="generalTabNotifications"
              @notification-click="handleNotificationClick"
              @mark-as-read="handleMarkAsRead"
            />
          </MpTabPanel>

          <MpTabPanel>
            <TabInbox
              :is-loading="isLoading"
              :is-show-unread-only="isShowUnreadOnly"
              :general-filter="generalFilter"
              :notifications="inboxTabNotifications"
              @notification-click="handleNotificationClick"
              @mark-as-read="handleMarkAsRead"
            />
          </MpTabPanel>

          <MpTabPanel>
            <TabApproval
              :is-loading="isLoading"
              :is-show-unread-only="isShowUnreadOnly"
              :general-filter="generalFilter"
              :notifications="approvalTabNotifications"
              @notification-click="handleNotificationClick"
              @mark-as-read="handleMarkAsRead"
            />
          </MpTabPanel>
        </MpTabPanels>
      </MpTabs>
    </MpFlex>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  css,
  MpAutocomplete,
  MpBadge,
  MpButton,
  MpFlex,
  MpTab,
  MpTabList,
  MpTabs,
  MpTabPanels,
  MpTabPanel,
  MpText,
  MpToggle
} from "@mekari/pixel3";
import TabGeneral from "./TabGeneral.vue";
import TabInbox from "./TabInbox.vue";
import TabApproval from "./TabApproval.vue";
import { defineNotifications, type Notification } from "./utils";

defineProps<{ isScrolled: boolean }>();

// ── State ───────────────────────────────────────────────────────
const currentTab = ref(0);
const isLoading = ref(false);
const generalFilter = ref("All general notifications");
const isShowUnreadOnly = ref(false);

// ── Filter data ─────────────────────────────────────────────────
const generalFilterData = [
  "All general notifications",
  "Reminder",
  "Mention",
  "Assignment",
  "Update",
  "Download & upload"
];
const inboxFilterData = [
  "All inbox notifications",
  "Incoming chats",
  "Chat assignments",
  "Resolved chats",
  "Blocked contacts"
];
const approvalFilterData = ["All request", "Deals", "Expenses"];

const TABS = [
  { name: "General", unreadCount: 8 },
  { name: "Inbox", unreadCount: 12 },
  { name: "Approval", unreadCount: 3 }
];

const currentFilterData = computed(() => {
  if (currentTab.value === 1) return inboxFilterData;
  if (currentTab.value === 2) return approvalFilterData;
  return generalFilterData;
});

// ── Notification data ────────────────────────────────────────────
const generalTabNotifications = defineNotifications([
  {
    category: "reminder",
    title: "Deals due soon on 20 June 2025, 11:11",
    message: "24 June 2025 - Blanco Coffee Blok M",
    timestamp: "Just now",
    isRead: false
  },
  {
    category: "avatar",
    name: "Christin Purnama Sari",
    title: "Christin Purnama Sari mentioned you in Deals",
    message: "1234ABCD - Espresso machine bulk sales",
    timestamp: "2 minutes ago",
    isRead: false
  },
  {
    category: "assignment-task",
    name: "Rizal Chandra",
    title: "Rizal Chandra assigned you a task",
    message: "Coffee machine warranty void procedure guideline",
    timestamp: "5 minutes ago",
    isRead: false
  },
  {
    category: "download-upload-general",
    title: "File ready to download",
    message: "Deals export - 30 Jul 2025",
    timestamp: "15 minutes ago",
    isRead: false
  },
  {
    category: "update-general",
    title: "System update completed",
    message: "Platform has been updated to version 2.5.1 with new features",
    timestamp: "20 minutes ago",
    isRead: false
  },
  {
    category: "avatar",
    name: "Ahmad Rahman",
    title: "Ahmad Rahman mentioned you in Deals",
    message: "5678WXYZ - Premium coffee subscription service",
    timestamp: "25 minutes ago",
    isRead: true
  },
  {
    category: "reminder",
    title: "Task deadline approaching",
    message: "Complete customer feedback analysis by 5 PM today",
    timestamp: "3 hours ago",
    isRead: true
  },
  {
    category: "assignment-task",
    name: "Sari Dewi",
    title: "Sari Dewi assigned you a checklist in Tasks",
    message: "Customer database update verification steps",
    timestamp: "20 Jul 2025 at 16:15",
    isRead: false
  }
]);

const inboxTabNotifications = defineNotifications([
  {
    category: "channel-whatsapp",
    title: "Indra Pangestu sent a message",
    message: '"Kak kapan bisa cair refundnya ya?"',
    timestamp: "Just now",
    isRead: false
  },
  {
    category: "channel-instagram",
    title: "Siti Aisyah Putri commented",
    message: '"Berapa lama pengiriman untuk wilayah Jakarta?"',
    timestamp: "5 minutes ago",
    isRead: false
  },
  {
    category: "channel-shopee",
    title: "Maya Sari Putri sent a message",
    message: '"Berapa lama pengiriman untuk wilayah Jakarta?"',
    timestamp: "15 minutes ago",
    isRead: false
  },
  {
    category: "channel-tokopedia",
    title: "Andi Setiawan sent a message",
    message: '"Apakah ada diskon untuk pembelian dalam jumlah besar?"',
    timestamp: "20 minutes ago",
    isRead: true
  },
  {
    category: "channel-google-business",
    title: "Rudi Setiawan left a review",
    message: '"A very nice and vintage place to grab the most delicious coffee in Jogja."',
    timestamp: "30 minutes ago",
    isRead: false
  },
  {
    category: "channel-email",
    title: "Tri Wulandari sent an email",
    message:
      '"Variant yang saya beli kemarin ternyata beda ukuran dengan dripper yang saya punya..."',
    timestamp: "2 hours ago",
    isRead: false
  },
  {
    category: "channel-blocked-contact",
    name: "Jessie Tan",
    title: "Jessie Tan blocked a contact",
    message: "Sari Ayu",
    timestamp: "19 Jul 2025 at 16:30",
    isRead: false
  }
]);

const approvalTabNotifications = defineNotifications([
  {
    category: "avatar",
    name: "Ali Imran",
    title: "Ali Imran request to add a deals on Sales Pipeline",
    message: "7890UIIAI - Refund broken coffee machine",
    timestamp: "Just now",
    isRead: false
  },
  {
    category: "avatar",
    name: "Galih Prakoso",
    title: "Galih Prakoso request to add an expense",
    message: "Business trip to Tokyo 12 Agustus 2025",
    timestamp: "2 minutes ago",
    isRead: false
  },
  {
    category: "avatar",
    name: "Rizal Chandra",
    title: "Rizal Chandra approved your request to create a deals",
    message: "4567UUIAI - Origami paper filter 100 pcs",
    timestamp: "10 minutes ago",
    isRead: true
  },
  {
    category: "avatar",
    name: "Rizal Chandra",
    title: "Rizal Chandra request to edit expense amount",
    message: "Business trip to Tokyo 12 Agustus 2025",
    timestamp: "15 minutes ago",
    isRead: false,
    previousCondition: "IDR 20.000.000",
    currentCondition: "IDR 32.000.000"
  },
  {
    category: "avatar",
    name: "Jessie Tan",
    title: "Jessie Tan approved your request to move a deals",
    message: "4567UUIAI - Origami paper filter 100 pcs",
    timestamp: "2 hours ago",
    isRead: true,
    previousCondition: "Lead Qualification",
    currentCondition: "Proposal Sent"
  }
]);

// ── Lifecycle ────────────────────────────────────────────────────
onMounted(() => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 1500);
});

// ── Handlers ─────────────────────────────────────────────────────
function handleChangeTab() {
  const defaults = [
    "All general notifications",
    "All inbox notifications",
    "All request"
  ];
  generalFilter.value = defaults[currentTab.value] ?? defaults[0];
}

function handleMarkAllAsRead() {
  console.log("[NotificationCenter] mark all as read");
}

function handleNotificationClick(notification: Notification) {
  console.log("[NotificationCenter] clicked:", notification);
}

function handleMarkAsRead(notification: Notification) {
  console.log("[NotificationCenter] mark as read:", notification);
}
</script>
