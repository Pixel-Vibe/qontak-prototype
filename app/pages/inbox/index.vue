<template>
  <main
    data-pixel-component="PixelContent"
    style="padding-top: var(--pixel-navbar-height); min-height: 100svh; width: 100%"
  >
    <div
      :class="
        css({
          display: 'flex',
          bg: 'background.surface',
          borderLeftWidth: '1px',
          borderColor: 'border.default',
          height: 'calc(100vh - var(--pixel-navbar-height))',
          overflow: 'hidden'
        })
      "
    >
      <!-- Chat list panel -->
      <MpFlex
        direction="column"
        width="288px"
        minWidth="288px"
        borderRightWidth="1"
        borderColor="border.default"
        bg="background.neutral"
      >
        <!-- Panel header: title -->
        <MpFlex
          alignItems="center"
          :height="`${PANEL_HEADER_HEIGHT}px`"
          px="4"
          borderBottomWidth="1"
          borderColor="border.default"
        >
          <MpText size="h2">{{ title }}</MpText>
        </MpFlex>

        <!-- Panel sub-header: sort + actions -->
        <MpFlex
          gap="2"
          alignItems="center"
          :height="`${PANEL_HEADER_HEIGHT}px`"
          px="4"
          borderBottomWidth="1"
          borderColor="border.default"
        >
          <MpSelect v-model="sortOrder">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="auto">Auto</option>
          </MpSelect>
          <MpButton aria-label="mark done" left-icon="done" variant="ghost" />
          <MpButton aria-label="read all" left-icon="empty" variant="ghost" />
          <MpButton aria-label="filter" left-icon="filter" variant="ghost" />
        </MpFlex>

        <!-- Chat list -->
        <MpFlex
          as="ul"
          direction="column"
          overflow="auto"
          height="calc(100vh - var(--pixel-navbar-height) - 120px)"
        >
          <ChatList
            v-for="(item, index) in CHAT_LIST_DATA"
            v-bind="item"
            :id="`chat-${index}`"
            :key="index"
            :is-active="`chat-${index}` === activeChatId"
            @click="(id) => (activeChatId = id)"
          />
        </MpFlex>
      </MpFlex>

      <!-- Main content: empty state -->
      <MpFlex justifyContent="center" alignItems="center" width="full">
        <MpFlex direction="column" alignItems="center" gap="1" width="376px">
          <MpImage
            src="https://cdn.mekari.design/illustration/blank-slate/StartChat_PI_L_01.png"
            layout="fixed"
            :width="288"
            :height="240"
          />
          <MpText size="h3">Conversation will appear here</MpText>
          <MpText color="text.secondary">
            Please select a conversation from the list on the left first.
          </MpText>
        </MpFlex>
      </MpFlex>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { css, MpButton, MpFlex, MpImage, MpSelect, MpText } from "@mekari/pixel3";
import { CHAT_LIST_DATA } from "~/data/chat";
import ChatList from "~/components/inbox/ChatList.vue";
import { PANEL_HEADER_HEIGHT } from "~/data/constants";

const title = ref("All inboxes");
const sortOrder = ref("newest");
const activeChatId = ref("");
</script>
