<template>
  <!-- Section title -->
  <MpFlex justify="space-between" alignItems="center" height="36px">
    <MpText
      :class="css({ letterSpacing: '2px', p: 2, textTransform: 'uppercase' })"
      size="label-small"
      weight="semiBold"
      color="text.link"
    >
      {{ submenu?.title }}
    </MpText>
  </MpFlex>

  <!-- Items -->
  <template v-if="submenu">
    <template v-for="item in submenu.items" :key="item.id">
      <SidebarChildItemAccordion
        v-if="item.children"
        :is-active="isRouteActive(item.route)"
        :default-is-open="isRouteActive(item.route)"
      >
        <template #header>{{ item.label }}</template>
        <template #content>
          <SidebarChildItem
            v-for="child in item.children"
            :key="child.id"
            variant="accordionItem"
            :is-active="isChildActive(child)"
            :counter="child.count ? String(child.count) : undefined"
            @click="openItem(child)"
          >
            {{ child.label }}
          </SidebarChildItem>
        </template>
      </SidebarChildItemAccordion>

      <SidebarChildItem
        v-else
        :is-active="isChildActive(item)"
        :counter="item.count ? String(item.count) : undefined"
        @click="openItem(item)"
      >
        {{ item.label }}
      </SidebarChildItem>
    </template>
  </template>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { css, MpFlex, MpText } from "@mekari/pixel3";
import { useAppMenu } from "~/composables/useAppMenu";
import SidebarChildItem from "~/components/sidebar/SidebarChildItem.vue";
import SidebarChildItemAccordion from "~/components/sidebar/SidebarChildItemAccordion.vue";
import type { AppMenuChild } from "~/data/menu";

const route = useRoute();
const router = useRouter();
const { activeSubmenu, getFirstChildRoute, isRouteActive } = useAppMenu();

const submenu = computed(() => activeSubmenu.value?.submenu ?? null);
const defaultChildId = computed(() => submenu.value?.items[0]?.id ?? null);

function isChildActive(item: AppMenuChild): boolean {
  const parentRoute = activeSubmenu.value?.route;
  if (parentRoute && route.path === parentRoute) {
    return item.id === defaultChildId.value;
  }
  return isRouteActive(item.route);
}

function openItem(item: AppMenuChild) {
  if (item.newTab) {
    window.open(getFirstChildRoute(item), "_blank");
    return;
  }
  router.push(getFirstChildRoute(item));
}
</script>
