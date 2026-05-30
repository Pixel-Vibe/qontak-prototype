<template>
  <MpFlex
    position="relative"
    flex="none"
    alignItems="center"
    justifyContent="center"
    height="9"
    width="9"
    borderRadius="full"
    :style="{ backgroundColor: getNotificationBackground(category) }"
  >
    <!-- Avatar: initials -->
    <MpText v-if="category === 'avatar'" size="body-small" weight="semiBold" color="text.inverse">
      {{ getInitialName(name || "") }}
    </MpText>

    <!-- All other categories: icon -->
    <MpIcon
      v-else
      :name="getNotificationIconName(category) as IconName"
      variant="fill"
      size="sm"
      color="icon.inverse"
    />
  </MpFlex>
</template>

<script setup lang="ts">
import { MpFlex, MpIcon, MpText, type IconName } from "@mekari/pixel3";
import {
  getNotificationBackground,
  getNotificationIconName,
  getInitialName,
  type NotificationCategory
} from "./utils";

withDefaults(
  defineProps<{
    category?: NotificationCategory;
    name?: string;
  }>(),
  {
    category: "reminder",
    name: undefined
  }
);
</script>
