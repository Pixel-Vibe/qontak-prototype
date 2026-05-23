<template>
  <MpButton
    v-tooltip="'Switch app'"
    aria-label="Switch app button"
    left-icon="shortcuts"
    variant="ghost"
    @click="isOpen = true"
  />

  <MpDrawer
    id="drawer-switch-app"
    :isOpen="isOpen"
    size="sm"
    placement="right"
    is-close-on-overlay-click
    style="z-index: 99999"
    @close="isOpen = false"
  >
    <MpDrawerContent>
      <MpDrawerBody :class="css({ padding: '0', overflow: 'hidden auto' })">
        <MpFlex justifyContent="flex-end" px="6" py="4">
          <MpButton
            aria-label="close drawer"
            left-icon="close"
            variant="ghost"
            size="sm"
            @click="isOpen = false"
          />
        </MpFlex>

        <MpFlex direction="column" gap="6" px="6" pb="6">
          <slot />
        </MpFlex>
      </MpDrawerBody>
    </MpDrawerContent>

    <MpDrawerOverlay />
  </MpDrawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  MpButton,
  MpDrawer,
  MpDrawerBody,
  MpDrawerContent,
  MpDrawerOverlay,
  MpFlex,
  css
} from "@mekari/pixel3";

const isOpen = ref(false);
</script>
