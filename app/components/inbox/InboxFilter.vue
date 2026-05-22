<template>
  <!-- INBOX header -->
  <MpFlex justify="space-between" alignItems="center" height="36px">
    <MpText
      :class="css({ letterSpacing: '2.88px', p: 2 })"
      size="label-small"
      weight="semiBold"
      color="text.link"
    >
      INBOX
    </MpText>
    <MpFlex gap="1">
      <MpButton
        aria-label="add"
        left-icon="add"
        variant="ghost"
        size="sm"
        :class="css({ color: 'icon.brand' })"
      />
      <MpButton
        aria-label="search"
        left-icon="search"
        variant="ghost"
        size="sm"
        :class="css({ color: 'icon.brand' })"
      />
    </MpFlex>
  </MpFlex>

  <!-- Filter items -->
  <SidebarChildItem
    v-for="item in INBOX_FILTER_ITEMS"
    :key="item.id"
    :is-active="isItemActive(item)"
    :counter="item.count ? String(item.count) : undefined"
    @click="navigateToItem(item)"
  >
    {{ item.label }}
  </SidebarChildItem>

  <MpDivider :class="css({ mt: 2, mb: 2 })" />

  <!-- CUSTOM VIEW header -->
  <MpFlex justify="space-between" alignItems="center" height="36px">
    <MpText
      :class="css({ letterSpacing: '2px', p: 2 })"
      size="label-small"
      weight="semiBold"
      color="text.link"
    >
      CUSTOM VIEW
    </MpText>

    <MpPopover
      id="popover-custom-view"
      v-slot="{ onClosePopover }"
      trigger="click"
      placement="right-start"
      :is-close-on-select="true"
    >
      <MpPopoverTrigger>
        <MpButton
          aria-label="add custom view"
          left-icon="add"
          variant="ghost"
          size="sm"
          :class="css({ color: 'icon.brand' })"
        />
      </MpPopoverTrigger>
      <MpPopoverContent
        :class="
          css({
            width: '176px',
            maxWidth: '280px',
            maxHeight: '196px',
            overflowY: 'auto'
          })
        "
      >
        <MpPopoverList>
          <MpPopoverListItem>🤯 L2 follow up</MpPopoverListItem>
          <MpPopoverListItem>🥊 Baku hantam</MpPopoverListItem>
          <MpPopoverListItem>💰️ Large enterprise</MpPopoverListItem>
          <MpPopoverListItem>⏰ SLA at risk</MpPopoverListItem>
          <MpPopoverListItem>🛠️ Tech support</MpPopoverListItem>
        </MpPopoverList>
        <MpButton
          variant="ghost"
          size="sm"
          left-icon="add"
          :class="
            css({
              width: 'full',
              justifyContent: 'flex-start',
              borderTopWidth: '1px',
              borderColor: 'border.default',
              rounded: 'none',
              color: 'text.link'
            })
          "
          @click="handleShowCreateCustomView(onClosePopover)"
        >
          Create a view
        </MpButton>
      </MpPopoverContent>
    </MpPopover>
  </MpFlex>

  <!-- Custom view items -->
  <SidebarChildItem
    v-for="item in CUSTOM_VIEW_ITEMS"
    :key="item.id"
    :is-active="isItemActive(item)"
    :counter="item.count ? String(item.count) : undefined"
    @click="navigateToItem(item)"
  >
    {{ item.label }}
  </SidebarChildItem>

  <!-- Create Custom View drawer -->
  <CreateCustomView :is-open="isOpenCreateCustomView" @close="isOpenCreateCustomView = false" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  css,
  MpButton,
  MpDivider,
  MpFlex,
  MpPopover,
  MpPopoverContent,
  MpPopoverList,
  MpPopoverListItem,
  MpPopoverTrigger,
  MpText
} from "@mekari/pixel3";
import SidebarChildItem from "~/components/sidebar/SidebarChildItem.vue";
import CreateCustomView from "~/components/inbox/CreateCustomView.vue";

interface FilterItem {
  id: string;
  label: string;
  route: string;
  query?: Record<string, string>;
  count?: string | number;
}

const INBOX_FILTER_ITEMS: FilterItem[] = [
  {
    id: "all-chats",
    label: "All chats",
    route: "/inbox",
    query: { status: "all_chats" },
    count: "99+"
  },
  { id: "my-chats", label: "My chats", route: "/inbox", query: { status: "my_chats" }, count: 4 },
  {
    id: "unassigned",
    label: "Unassigned",
    route: "/inbox",
    query: { status: "unassigned" },
    count: 2
  },
  { id: "assigned", label: "Assigned", route: "/inbox", query: { status: "assigned" }, count: 10 },
  { id: "resolved", label: "Resolved", route: "/inbox", query: { status: "resolved" } }
];

const CUSTOM_VIEW_ITEMS: FilterItem[] = [
  { id: "customer-support", label: "🎧 Customer support", route: "/inbox", query: { view: "customer-support" }, count: 12 },
  { id: "sales", label: "💰 Sales", route: "/inbox", query: { view: "sales" }, count: 2 }
];

const route = useRoute();
const router = useRouter();
const isOpenCreateCustomView = ref(false);

function isItemActive(item: FilterItem): boolean {
  const hasRouteQuery = Object.keys(route.query).length > 0;
  if (!hasRouteQuery && route.path === item.route) {
    return item.id === INBOX_FILTER_ITEMS[0]?.id;
  }
  if (!item.query) return false;
  return (
    route.path === item.route && Object.entries(item.query).every(([k, v]) => route.query[k] === v)
  );
}

function navigateToItem(item: FilterItem) {
  router.push({ path: item.route, query: item.query });
}

function handleShowCreateCustomView(closePopover: () => void) {
  isOpenCreateCustomView.value = true;
  closePopover();
}
</script>
