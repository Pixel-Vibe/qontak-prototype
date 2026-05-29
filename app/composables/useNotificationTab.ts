import { computed } from "vue";
import type { Notification } from "~/components/notification/utils";

export type NotificationTabProps = {
  isLoading: boolean;
  isShowUnreadOnly: boolean;
  generalFilter: string;
  notifications: Notification[];
};

export type NotificationTabEmits = {
  notificationClick: [notification: Notification];
  markAsRead: [notification: Notification];
};

export function useNotificationTab(
  props: NotificationTabProps,
  emit: (event: "notificationClick" | "markAsRead", notification: Notification) => void
) {
  const hasNotifications = computed(() => props.notifications.length > 0);

  // Prototype: never show "all viewed" state
  const hasViewedAll = computed(() => false);

  // No result: filter active but nothing matches (simplified — always false for prototype)
  const hasNoResult = computed(() => false);

  function handleNotificationClick(notification: Notification) {
    emit("notificationClick", notification);
  }

  function handleMarkAsRead(notification: Notification) {
    emit("markAsRead", notification);
  }

  return {
    hasNotifications,
    hasViewedAll,
    hasNoResult,
    handleNotificationClick,
    handleMarkAsRead
  };
}
