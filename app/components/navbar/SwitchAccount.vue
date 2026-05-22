<template>
  <MpPopover v-slot="{ onClosePopover }" :isKeepAlive="false">
    <MpPopoverTrigger>
      <MpButton variant="ghost" size="sm">
        <MpAvatar :name="accountInformation.fullName" :src="accountInformation.userPhoto" />

        <div :class="css({ textAlign: 'left' })">
          <MpText weight="semiBold">
            {{ accountInformation.fullName }}
          </MpText>

          <MpText size="label-small" color="text.secondary">
            {{ accountInformation.companyName }}
          </MpText>
        </div>
      </MpButton>
    </MpPopoverTrigger>

    <MpPopoverContent :class="css({ width: '65', p: 0 })">
      <slot :onClosePopover="onClosePopover" />
    </MpPopoverContent>
  </MpPopover>
</template>

<script setup lang="ts">
import {
  MpAvatar,
  MpButton,
  MpPopover,
  MpPopoverContent,
  MpPopoverTrigger,
  MpText,
  css
} from "@mekari/pixel3";
import { usePixelLayout } from "~/composables/usePixelLayout";

const { accountInformation } = usePixelLayout();
</script>
