<template>
  <MpPopover>
    <MpPopoverTrigger>
      <MpButton :class="pill" variant="ghost" size="sm" right-icon="chevrons-down">
        {{ statusLabel }}
      </MpButton>
    </MpPopoverTrigger>

    <MpPopoverContent :class="css({ minWidth: '180px', p: '0' })">
      <MpPopoverList>
        <MpPopoverListItem
          v-for="opt in statusOptions"
          :key="opt.value"
          @click="currentStatus = opt.value"
        >
          <MpFlex gap="2" alignItems="center">
            <span :class="css({ w: '2', h: '2', rounded: 'full', flexShrink: '0', bg: opt.dot })" />
            {{ opt.label }}
          </MpFlex>
        </MpPopoverListItem>
      </MpPopoverList>
    </MpPopoverContent>
  </MpPopover>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  MpButton,
  MpFlex,
  MpPopover,
  MpPopoverContent,
  MpPopoverList,
  MpPopoverListItem,
  MpPopoverTrigger,
  css
} from "@mekari/pixel3";

const statusOptions = [
  { value: "online", label: "Online", dot: "background.success-bold" },
  { value: "busy", label: "Busy", dot: "background.warning-bold" },
  { value: "offline", label: "Offline", dot: "background.neutral-pressed" }
] as const;

type Status = (typeof statusOptions)[number]["value"];

const currentStatus = ref<Status>("online");

const statusLabel = computed(
  () => statusOptions.find((o) => o.value === currentStatus.value)?.label ?? "Online"
);

const pillStyles: Record<Status, string> = {
  online: css({ bg: "background.success", color: "text.success", rounded: "full", _hover: { bg: "background.success.hovered" } }),
  busy: css({ bg: "background.danger", color: "text.danger", rounded: "full", _hover: { bg: "background.danger.hovered" } }),
  offline: css({ bg: "background.neutral.subtle", color: "text.secondary", rounded: "full", _hover: { bg: "background.neutral.hovered" } })
};

const pill = computed(() => pillStyles[currentStatus.value]);
</script>
