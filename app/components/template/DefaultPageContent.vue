<template>
  <main
    data-pixel-component="PixelContent"
    style="padding-top: var(--pixel-navbar-height); min-height: 100svh; width: 100%"
  >
    <MpFlex justify="space-between" align-items="center" px="6" py="1.063rem">
      <MpText size="h1" weight="semiBold">{{ activePageTitle }}</MpText>
      <MpButton>Action</MpButton>
    </MpFlex>

    <div
      :class="
        css({
          bg: 'background.neutral',
          borderTopWidth: '1px',
          borderLeftWidth: '1px',
          borderColor: 'border.default',
          roundedTopLeft: 'md',
          p: 6,
          minH: '100svh'
        })
      "
    >
      <MpText>Place content here...</MpText>
    </div>
  </main>
</template>

<script setup lang="ts">
import { MpButton, MpFlex, MpText, css } from "@mekari/pixel3";
import { useAppMenu } from "~/composables/useAppMenu";

const { activePageTitle } = useAppMenu();
</script>
