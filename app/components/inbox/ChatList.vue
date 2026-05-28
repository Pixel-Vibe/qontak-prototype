<template>
  <MpFlex
    as="li"
    tabindex="0"
    flex="none"
    gap="2"
    width="full"
    minWidth="76px"
    height="auto"
    py="2"
    px="3"
    cursor="pointer"
    borderBottom="1px"
    borderColor="border.default"
    :_focusVisible="{
      background: 'background.neutral.hovered',
      outline: 'none'
    }"
    :style="{ background: getChatBackground }"
    @mouseenter="
      () => {
        isHovered = true;
        emits('hover', id, true);
      }
    "
    @mouseleave="
      () => {
        isHovered = false;
        emits('hover', id, false);
      }
    "
    @click="emits('click', id)"
    @keyup.enter="emits('click', id)"
  >
    <!-- Avatar / Checkbox -->
    <MpFlex
      flex="none"
      alignItems="center"
      justifyContent="center"
      width="7"
      height="7"
      rounded="full"
      bg="background.neutral.subtle"
    >
      <div
        v-if="isChecked || isHovered"
        :class="
          css({
            display: 'flex',
            alignItems: 'center',
            '& > label': { gap: '0' }
          })
        "
      >
        <MpCheckbox
          v-model:is-checked="isChecked"
          @click="() => emits('checked', id, !isChecked)"
        />
      </div>
      <MpIcon v-else size="sm" :name="iconName" />
    </MpFlex>

    <!-- Content -->
    <MpFlex gap="0.5" direction="column" width="full">
      <!-- Row 1: sender + SLA / timestamp -->
      <MpFlex gap="2" justifyContent="space-between" alignItems="center" width="full">
        <MpText
          v-tooltip="{ label: senderName, placement: 'right' }"
          :weight="isUnread ? 'semiBold' : 'regular'"
          is-truncated
          >{{ senderName }}</MpText
        >
        <MpBadge v-if="isShowSLA" for="tableStatus" type="critical" size="sm">
          <MpIcon
            name="timer"
            size="sm"
            color="inherit"
            :class="css({ height: '14px', width: '3', mr: '0.5' })"
          />
          {{ sla }}
        </MpBadge>
        <MpText v-else size="label-small" color="text.secondary" style="flex: none">{{
          timeStamp
        }}</MpText>
      </MpFlex>

      <!-- Row 2: content preview + unread badge -->
      <MpFlex gap="1" justifyContent="space-between" alignItems="center" width="full">
        <MpText v-if="isShowReplies" color="text.secondary">↩︎</MpText>
        <MpIcon v-if="contentType !== 'text'" size="sm" :name="contentIcon()" />
        <MpText
          v-tooltip="{ label: content, placement: 'right' }"
          color="text.secondary"
          is-truncated
          >{{ content }}</MpText
        >
        <MpBadge v-if="isUnread" for="indicator" type="critical" style="flex: none" />
      </MpFlex>

      <!-- Row 3: channel + status -->
      <MpFlex gap="2" justifyContent="space-between" alignItems="center" width="full">
        <MpText
          v-tooltip="{ label: channelName, placement: 'right' }"
          size="label-small"
          color="text.placeholder"
          is-truncated
          >{{ channelName }}</MpText
        >
        <MpText
          v-if="status"
          size="overline"
          weight="semiBold"
          :style="{
            '--mp-text-color': getStatusColor,
            textTransform: 'capitalize'
          }"
          >{{ status }}</MpText
        >
      </MpFlex>

      <!-- Row 4: tag -->
      <MpFlex v-if="tag" gap="2" justifyContent="space-between" alignItems="center" width="full">
        <MpText
          v-tooltip="{ label: tag, placement: 'right' }"
          size="overline"
          color="text.secondary"
          is-truncated
          >{{ tag }}</MpText
        >
      </MpFlex>
    </MpFlex>
  </MpFlex>
</template>

<script setup lang="ts">
import { ref, computed, type PropType } from "vue";
import {
  css,
  MpText,
  MpFlex,
  MpIcon,
  MpBadge,
  MpCheckbox,
  token,
  type IconName
} from "@mekari/pixel3";
import type { ChatContent, ChatStatus } from "~/data/chat";

const props = defineProps({
  id: { type: String, default: "" },
  iconName: { type: String as PropType<IconName>, default: "qontak-brand" },
  senderName: { type: String, default: "" },
  timeStamp: { type: String, default: "" },
  sla: { type: String, default: "" },
  content: { type: String, default: "" },
  channelName: { type: String, default: "" },
  contentUnread: { type: String, default: "" },
  tag: { type: String, default: "" },
  contentType: { type: String as PropType<ChatContent>, default: "text" },
  status: { type: String as PropType<ChatStatus>, default: "" },
  isActive: { type: Boolean, default: false },
  isShowSLA: { type: Boolean, default: false },
  isShowReplies: { type: Boolean, default: false }
});

const emits = defineEmits(["click", "checked", "hover"]);

const isHovered = ref(false);
const isChecked = ref(false);

const isUnread = computed(() => props.contentUnread !== "");

const getChatBackground = computed(() => {
  if (isChecked.value) return token.var("colors.background.brand.pressed");
  if (props.isActive) return token.var("colors.background.brand.selected");
  if (isHovered.value) return token.var("colors.background.neutral.hovered");
  return token("colors.background.neutral");
});

const getStatusColor = computed(() => {
  if (props.status === "unassigned") return token.var("colors.text.warning");
  if (props.status === "assigned") return token.var("colors.text.information");
  if (props.status === "resolved") return token.var("colors.text.success");
  return "";
});

function contentIcon() {
  if (props.contentType === "document") return "doc";
  if (props.contentType === "image") return "img";
  if (props.contentType === "video") return "empty";
  if (props.contentType === "map") return "location";
  if (props.contentType === "contact") return "contact";
  return "doc";
}
</script>
