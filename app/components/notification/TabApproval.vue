<template>
  <NotificationLoading v-if="isLoading" />

  <template v-if="!isLoading && hasNotifications && !hasViewedAll && !hasNoResult">
    <MpFlex p="2" flexDirection="column">
      <template
        v-for="(groupedNotifications, dateGroup) in groupNotificationsByDate(notifications)"
        :key="dateGroup"
      >
        <template v-if="groupedNotifications.length > 0">
          <MpText
            size="overline"
            color="text.secondary"
            weight="semiBold"
            :class="css({ py: '1', px: '2', letterSpacing: '2px' })"
          >
            {{ dateGroup === "today" ? "TODAY" : "OLDER" }}
          </MpText>
          <NotificationItem
            v-for="(notification, idx) in groupedNotifications.filter(
              (n) => !isShowUnreadOnly || !n.isRead
            )"
            :key="`${dateGroup}-${idx}`"
            :category="notification.category"
            :name="notification.name"
            :title="notification.title"
            :message="notification.message"
            :timestamp="notification.timestamp"
            :has-read="notification.isRead"
            :previous-condition="notification.previousCondition"
            :current-condition="notification.currentCondition"
            @click="handleNotificationClick"
            @mark-as-read="handleMarkAsRead"
          />
        </template>
      </template>
    </MpFlex>
    <EndOfTab v-if="isShowUnreadOnly">
      You have viewed all your <strong>unread notifications</strong> from the past 90 days.
    </EndOfTab>
    <EndOfTab v-else />
  </template>

  <NotificationBlankStates
    :is-loading="isLoading"
    :has-notifications="hasNotifications"
    :has-viewed-all="hasViewedAll"
    :has-no-result="hasNoResult"
    :general-filter="generalFilter"
  />
</template>

<script setup lang="ts">
import { css, MpFlex, MpText } from "@mekari/pixel3";
import NotificationLoading from "./NotificationLoading.vue";
import NotificationItem from "./NotificationItem.vue";
import NotificationBlankStates from "./NotificationBlankStates.vue";
import EndOfTab from "./EndOfTab.vue";
import { groupNotificationsByDate } from "./utils";
import { useNotificationTab, type NotificationTabProps, type NotificationTabEmits } from "~/composables/useNotificationTab";

const props = defineProps<NotificationTabProps>();
const emit = defineEmits<NotificationTabEmits>();
const { hasNotifications, hasViewedAll, hasNoResult, handleNotificationClick, handleMarkAsRead } =
  useNotificationTab(props, (event, notification) => emit(event, notification));
</script>
