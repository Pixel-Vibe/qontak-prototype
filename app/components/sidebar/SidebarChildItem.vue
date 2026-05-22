<template>
  <div :class="itemClass">
    <MpText :class="css({ color: 'inherit', fontWeight: 'inherit', minWidth: '0' })">
      <slot />
    </MpText>
    <MpText v-if="counter" as="span" color="text.secondary" :class="css({ marginLeft: '2' })">
      {{ counter }}
    </MpText>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";
import { MpText, css } from "@mekari/pixel3";

const props = defineProps({
  as: String,
  to: String,
  isActive: Boolean,
  variant: {
    type: String as PropType<"item" | "accordionItem">,
    default: "item"
  },
  counter: String
});

const itemClass = computed(() => {
  const v = props.variant || "item";
  const active = props.isActive;

  const base = {
    cursor: "pointer",
    flex: "1",
    borderRadius: "md",
    p: "2",
    transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0s",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  } as const;

  if (v === "item" && !active) {
    return css({
      ...base,
      background: "transparent",
      color: "text.default",
      fontWeight: "regular",
      _hover: { color: "text.selected" }
    });
  }
  if (v === "item" && active) {
    return css({
      ...base,
      background: "background.brand.selected",
      color: "text.selected",
      fontWeight: "semiBold"
    });
  }
  if (v === "accordionItem" && !active) {
    return css({
      ...base,
      background: "transparent",
      color: "text.secondary",
      fontWeight: "regular",
      _hover: { color: "text.selected" }
    });
  }
  // accordionItem + active
  return css({
    ...base,
    background: "transparent",
    color: "text.default",
    fontWeight: "semiBold"
  });
});
</script>
