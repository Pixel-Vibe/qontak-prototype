<template>
  <MpPopover id="notification-center">
    <MpPopoverTrigger>
      <MpFlex position="relative" alignItems="center">
        <MpTooltip placement="bottom" :label="tooltipLabel" use-portal>
          <MpButton left-icon="notification" variant="ghost" aria-label="notifications" />
        </MpTooltip>
        <MpBadge
          v-if="unreadCountTotal > 0"
          :class="css({ position: 'absolute', top: '0', right: '-4px' })"
          for="additionalInformation"
          type="critical"
          size="sm"
        >
          {{ unreadCountTotal > 99 ? "99+" : unreadCountTotal }}
        </MpBadge>
      </MpFlex>
    </MpPopoverTrigger>

    <MpPopoverContent
      :class="
        css({
          w: '480px',
          minHeight: '368px',
          maxHeight: 'calc(100vh - 80px)',
          overflowY: 'auto',
          bg: 'background.stage',
          p: '0'
        })
      "
      @scroll="handleScroll"
    >
      <NotificationCenterPopover :is-scrolled="isScrolled" />
    </MpPopoverContent>
  </MpPopover>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import {
  css,
  MpBadge,
  MpButton,
  MpFlex,
  MpPopover,
  MpPopoverContent,
  MpPopoverTrigger,
  MpTooltip
} from "@mekari/pixel3";
import NotificationCenterPopover from "./NotificationCenterPopover.vue";

const unreadCountTotal = ref(23);
const isScrolled = ref(false);

const tooltipLabel = computed(() =>
  unreadCountTotal.value > 0
    ? `View ${unreadCountTotal.value} unread notifications.`
    : "No new notifications yet."
);

function handleScroll(e: Event) {
  const target = e.target as HTMLElement;
  isScrolled.value = target.scrollTop > 50;
}
</script>
