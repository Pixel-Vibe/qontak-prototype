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
          display: 'grid',
          gridTemplateColumns: '3',
          gap: '3',
          pr: '6',
          pb: '3'
        })
      "
    >
      <div :class="card"><MpText>Place content here...</MpText></div>
      <div :class="card"><MpText>Place content here...</MpText></div>
      <div :class="card"><MpText>Place content here...</MpText></div>
      <div :class="[card, css({ gridColumn: '3' })]">
        <MpText>Place content here...</MpText>
      </div>
      <div :class="[card, css({ gridColumn: '3' })]">
        <MpText>Place content here...</MpText>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { MpButton, MpFlex, MpText, css } from "@mekari/pixel3";
import { useAppMenu } from "~/composables/useAppMenu";

const { activePageTitle } = useAppMenu();

const card = css({
  bg: "background.neutral",
  borderWidth: "1px",
  borderColor: "border.default",
  rounded: "md",
  p: 6,
  h: "250px"
});
</script>
