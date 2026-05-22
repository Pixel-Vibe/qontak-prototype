<template>
  <TheNavbar />
  <div :class="css({ bg: 'background.surface', minH: '100vh', display: 'flex' })">
    <TheSidebar :has-child="hasSidebarChild" />
    <SidebarChild v-if="hasSidebarChild">
      <InboxFilter v-if="activeTopMenu?.id === 'inbox'" />
      <SidebarChildItems v-else />
    </SidebarChild>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { css } from "@mekari/pixel3";
import { usePixelLayout } from "~/composables/usePixelLayout";
import { useAppMenu } from "~/composables/useAppMenu";
import TheNavbar from "~/components/navbar/index.vue";
import TheSidebar from "~/components/sidebar/index.vue";
import SidebarChild from "~/components/sidebar/SidebarChild.vue";
import SidebarChildItems from "~/components/sidebar/SidebarChildItems.vue";
import InboxFilter from "~/components/inbox/InboxFilter.vue";

const { useSidebar } = usePixelLayout();
const { activeSubmenu, activeTopMenu } = useAppMenu();

const hasSidebarChild = computed(() => Boolean(activeSubmenu.value));

watch(
  hasSidebarChild,
  (value) => {
    useSidebar.setCollapse(value);
  },
  { immediate: true }
);
</script>
