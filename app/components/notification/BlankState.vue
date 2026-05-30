<template>
  <MpFlex
    v-if="showBlankState"
    :class="
      css({
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mb: '6'
      })
    "
  >
    <img
      :class="css({ height: '240px', width: 'auto' })"
      :src="variantImage"
      alt="blank state illustration"
    />
    <MpText size="h3" weight="semiBold" :class="css({ mb: '1' })">
      {{ title }}
    </MpText>
    <MpText color="text.secondary">
      {{ subtitle }}
    </MpText>
  </MpFlex>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { css, MpFlex, MpText } from "@mekari/pixel3";

const BLANK_IMG = "https://cdn.mekari.design/illustration/blank-slate/NoInbox_PB_M_01.png";

withDefaults(
  defineProps<{
    showBlankState: boolean;
    variant?: "no-notification" | "all-read" | "not-found";
    title: string;
    subtitle: string;
  }>(),
  { variant: "no-notification" }
);

// Prototype: all variants use the same CDN illustration
const variantImage = computed(() => BLANK_IMG);
</script>
