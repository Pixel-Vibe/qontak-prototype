<!--
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Mekari Qontak — Create Template Drawer
  Source: Figma 5E00CpqLOYCKxiar9vSW9j / 10572:66837
  Token mode: Pixel 2.4
  Patterns used: drawer, selectable-cards
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  STATES INCLUDED:
    - Default: "Campaign message" pre-selected
    - Hover state on cards
    - Selected state (brand border + subtle bg)
-->
<template>
  <MpDrawer
    id="drawer-create-template"
    :is-open="isOpen"
    placement="right"
    size="md"
    :is-close-on-overlay-click="true"
    :is-close-on-esc="true"
    @close="emit('close')"
  >
    <MpDrawerContent>
      <MpDrawerHeader>
        Create template
        <MpDrawerCloseButton />
      </MpDrawerHeader>

      <MpDrawerBody>
        <MpText color="text.secondary" :class="css({ mb: '4' })">Create template for</MpText>

        <!-- ═════ Selectable option cards ═════ -->
        <MpFlex direction="column" gap="3">
          <div
            v-for="option in TEMPLATE_OPTIONS"
            :key="option.value"
            :class="cardClass(option.value)"
            @click="handleSelect(option.value)"
          >
            <MpIcon
              :name="option.icon"
              size="md"
              :color="selected === option.value ? 'background.brand.bold' : 'icon.default'"
            />
            <div>
              <MpText
                weight="semiBold"
                :color="selected === option.value ? 'text.link' : 'text.default'"
              >
                {{ option.label }}
              </MpText>
              <MpText size="body-small" color="text.secondary" :class="css({ mt: '1' })">
                {{ option.description }}
              </MpText>
            </div>
          </div>
        </MpFlex>
      </MpDrawerBody>
    </MpDrawerContent>

    <MpDrawerOverlay />
  </MpDrawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  MpDrawer,
  MpDrawerContent,
  MpDrawerHeader,
  MpDrawerBody,
  MpDrawerCloseButton,
  MpDrawerOverlay,
  MpFlex,
  MpText,
  MpIcon,
  css
} from "@mekari/pixel3";

defineProps<{ isOpen: boolean }>();
const emit = defineEmits<{ close: []; select: [value: string] }>();

const selected = ref("");

const TEMPLATE_OPTIONS = [
  {
    value: "campaign-message",
    label: "Campaign message",
    description: "Fully customizable message to broadcast your marketing messages.",
    icon: "broadcast"
  },
  {
    value: "phone-number-request",
    label: "Phone number request",
    description: "META predefined message to request customer's phone number.",
    icon: "mobile"
  }
];

function cardClass(value: string) {
  const isSelected = selected.value === value;
  return css({
    display: "flex",
    alignItems: "flex-start",
    gap: "3",
    p: "4",
    borderWidth: "1px",
    borderRadius: "md",
    cursor: "pointer",
    transition: "all 0.15s",
    borderColor: isSelected ? "background.brand.bold" : "border.default",
    bg: isSelected ? "background.brand.subtle" : "background.default",
    _hover: {
      bg: isSelected ? "background.brand.subtle" : "background.neutral.hovered"
    },
    _active: {
      bg: isSelected ? "background.brand.subtle" : "background.neutral.pressed"
    }
  });
}

function handleSelect(value: string) {
  selected.value = value;
  emit("select", value);
}
</script>
