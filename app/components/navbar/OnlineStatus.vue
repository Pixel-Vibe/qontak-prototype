<template>
  <MpPopover is-close-on-select>
    <MpPopoverTrigger>
      <MpButton :class="pill" variant="ghost" size="sm" right-icon="chevrons-down">
        {{ statusLabel }}
      </MpButton>
    </MpPopoverTrigger>

    <MpPopoverContent :class="popoverContent">
      <MpPopoverList>
        <MpPopoverListItem
          v-for="opt in STATUS_OPTIONS"
          :key="opt.value"
          :is-active="currentStatus === opt.value"
          @click="currentStatus = opt.value"
        >
          <MpFlex justifyContent="space-between" alignItems="center" gap="2" width="full">
            <div>
              <MpText color="text.default">{{ opt.label }}</MpText>
              <MpText size="label-small" color="text.secondary">{{ opt.description }}</MpText>
            </div>
            <MpIcon
              v-if="currentStatus === opt.value"
              name="check"
              size="sm"
              :class="css({ color: 'icon.default', flexShrink: '0' })"
            />
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
  MpIcon,
  MpPopover,
  MpPopoverContent,
  MpPopoverList,
  MpPopoverListItem,
  MpPopoverTrigger,
  MpText,
  css
} from "@mekari/pixel3";

// ── Status options (Figma: Online + Offline only) ───────────────
const STATUS_OPTIONS = [
  {
    value: "online",
    label: "Online",
    description: "Enables auto assignment."
  },
  {
    value: "offline",
    label: "Offline",
    description: "Disables auto assignment."
  }
] as const;

type Status = (typeof STATUS_OPTIONS)[number]["value"];

const currentStatus = ref<Status>("online");

const statusLabel = computed(
  () => STATUS_OPTIONS.find((o) => o.value === currentStatus.value)?.label ?? "Online"
);

// ── Pill trigger styles per status ──────────────────────────────
// Figma: rounded-full pill, pl-16 pr-12 py-8, no border
// Online:  bg-success (#f2f9f6), text-success (#186f4a)
// Offline: bg-neutral-subtle (#f0f1f3), text-secondary (#656f80)
const pillStyles: Record<Status, string> = {
  online: css({
    bg: "background.success",
    color: "text.success",
    rounded: "full",
    _hover: { bg: "background.success.hovered" }
  }),
  offline: css({
    bg: "background.neutral.subtle",
    color: "text.secondary",
    rounded: "full",
    _hover: { bg: "background.neutral.hovered" }
  })
};

const pill = computed(() => pillStyles[currentStatus.value]);

// ── Popover content: 220px, border.bold, no padding ────────────
const popoverContent = css({
  w: "220px",
  p: "0",
  borderColor: "border.bold"
});
</script>
