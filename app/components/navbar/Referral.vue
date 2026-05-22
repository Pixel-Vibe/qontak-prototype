<template>
  <MpButton
    v-tooltip="'Referral'"
    as="a"
    aria-label="referral button"
    left-icon="gift"
    variant="ghost"
    :href="props.url"
    target="_blank"
  />
</template>

<script setup lang="ts">
import { MpButton } from "@mekari/pixel3";

const props = defineProps({
  url: String
});
</script>
