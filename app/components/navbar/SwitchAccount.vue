<template>
  <MpPopover v-slot="{ onClosePopover }" :isKeepAlive="false">
    <MpPopoverTrigger>
      <MpFlex
        gap="2"
        alignItems="center"
        px="2"
        py="1"
        borderRadius="md"
        cursor="pointer"
        :_hover="{ bg: 'background.neutral.hovered' }"
      >
        <MpAvatar :name="accountInformation.fullName" variant-color="sky" />

        <div :class="css({ textAlign: 'left' })">
          <MpText weight="semiBold">
            {{ accountInformation.fullName }}
          </MpText>

          <MpText size="label-small" color="text.secondary">
            {{ accountInformation.companyName }}
          </MpText>
        </div>
      </MpFlex>
    </MpPopoverTrigger>

    <MpPopoverContent :class="css({ width: '65', p: 0 })">
      <slot :onClosePopover="onClosePopover" />
    </MpPopoverContent>
  </MpPopover>
</template>

<script setup lang="ts">
import {
  MpAvatar,
  MpFlex,
  MpPopover,
  MpPopoverContent,
  MpPopoverTrigger,
  MpText,
  css
} from "@mekari/pixel3";
import { usePixelLayout } from "~/composables/usePixelLayout";

const { accountInformation } = usePixelLayout();
</script>
