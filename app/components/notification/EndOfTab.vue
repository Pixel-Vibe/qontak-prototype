<template>
  <MpFlex flexDirection="column" justifyContent="center" alignItems="center" gap="2" py="3">
    <MpIcon name="inbox" variant="fill" color="icon.brand" />
    <MpText size="label-small" color="text.secondary">
      <slot>You have viewed all your notifications from the past 90 days.</slot>
    </MpText>
  </MpFlex>
</template>

<script setup lang="ts">
import { MpFlex, MpIcon, MpText } from "@mekari/pixel3";
</script>
