<template>
  <MpFlex
    position="relative"
    gap="3"
    alignItems="start"
    py="3"
    px="2"
    borderRadius="lg"
    cursor="pointer"
    :_hover="{ bg: 'background.neutral.hovered' }"
    @click="handleClick"
  >
    <NotificationIcon :category="category" :name="name" />

    <!-- Content -->
    <MpFlex direction="column" gap="2px" width="full">
      <MpText size="label-small" weight="semiBold" color="text.default">
        {{ title }}
      </MpText>

      <MpText color="text.default" is-truncated line-clamp="2">
        {{ message }}
      </MpText>

      <MpText size="label-small" color="text.secondary">
        {{ timestamp }}
      </MpText>

      <!-- Change indicator (e.g. stage move, amount edit) -->
      <MpFlex
        v-if="previousCondition && currentCondition"
        mt="2"
        py="1"
        px="2"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="border.default"
      >
        <MpText size="body-small" color="text.secondary">
          {{ previousCondition }} → {{ currentCondition }}
        </MpText>
      </MpFlex>

      <slot />
    </MpFlex>

    <!-- Unread dot -->
    <div
      v-if="!hasRead"
      :class="css({ position: 'absolute', top: '4', right: '3' })"
      @click.stop="markAsRead"
    >
      <MpBadge v-tooltip="'Mark as read'" for="indicator" type="critical" />
    </div>
  </MpFlex>
</template>

<script setup lang="ts">
import { css, MpBadge, MpFlex, MpText } from "@mekari/pixel3";
import NotificationIcon from "./NotificationIcon.vue";
import type { NotificationCategory } from "./utils";

interface Props {
  category: NotificationCategory;
  name?: string;
  title: string;
  message: string;
  timestamp: string;
  previousCondition?: string | null;
  currentCondition?: string | null;
  hasRead: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  name: "",
  previousCondition: null,
  currentCondition: null
});

const emit = defineEmits<{
  click: [props: Props];
  markAsRead: [props: Props];
}>();

function handleClick() {
  emit("click", props);
  if (!props.hasRead) emit("markAsRead", props);
}

function markAsRead() {
  emit("markAsRead", props);
}
</script>
