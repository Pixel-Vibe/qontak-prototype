<template>
  <div>
    <!-- Parent view -->
    <template v-if="showToggleContent === 'parent'">
      <MpFlex
        direction="column"
        alignItems="center"
        bg="background.neutral.subtle"
        borderBottomWidth="1"
        borderColor="border.default"
        px="3"
        py="4"
        roundedTop="md"
      >
        <MpAvatar
          :name="accountInformation.fullName"
          size="lg"
          variant-color="sky"
          :class="css({ mb: '2' })"
        />
        <MpText weight="semiBold">
          {{ accountInformation.fullName }}
        </MpText>
        <MpText color="text.secondary">
          {{ accountInformation.companyName }}
        </MpText>
      </MpFlex>

      <MpPopoverList>
        <MpPopoverListItem>
          Account settings
        </MpPopoverListItem>
        <MpPopoverListItem is-arrow @click="onToggleContent('companyList')">
          Company list
        </MpPopoverListItem>
      </MpPopoverList>

      <MpDivider :class="css({ marginY: '0' })" />

      <MpPopoverList>
        <MpPopoverListItem @click="openMekariAccount">
          Go to Mekari Account
          <MpIcon name="newtab" size="sm" />
        </MpPopoverListItem>
        <MpPopoverListItem is-arrow @click="onToggleContent('switchAccount')">
          Switch account
        </MpPopoverListItem>
        <MpPopoverListItem is-arrow @click="onToggleContent('changeLanguage')">
          Change language
        </MpPopoverListItem>
        <MpPopoverListItem @click="onToggleContent('switchThemes')">
          Themes
          <MpFlex alignItems="center" gap="1">
            <MpText size="overline" color="text.secondary">{{ THEME_LABELS[currentTheme] }}</MpText>
            <MpIcon name="chevrons-right" size="sm" />
          </MpFlex>
        </MpPopoverListItem>
        <MpPopoverListItem @click="logout">Sign out</MpPopoverListItem>
      </MpPopoverList>

      <MpFlex direction="column" gap="1" px="3" py="4">
        <MpFlex gap="3" width="full">
          <MpText size="overline" color="text.secondary">Privacy</MpText>
          <MpText size="overline" color="text.secondary">Terms of Use</MpText>
          <MpText size="overline" color="text.secondary">About Mekari Account</MpText>
        </MpFlex>
        <MpText size="overline" color="text.secondary">Mekari © 2026</MpText>
      </MpFlex>
    </template>

    <!-- Company list -->
    <template v-if="showToggleContent === 'companyList'">
      <MpFlex
        gap="2"
        alignItems="center"
        py="2"
        px="3"
        bg="background.neutral.subtle"
        borderBottomWidth="1"
        borderColor="border.default"
        roundedTop="md"
      >
        <MpButton
          aria-label="back"
          left-icon="arrows-left"
          variant="ghost"
          size="sm"
          @click="onToggleContent('parent')"
        />
        <MpText weight="semiBold">Company list</MpText>
      </MpFlex>

      <MpPopoverList>
        <MpPopoverListItem is-active>
          <MpText weight="semiBold">{{ accountInformation.companyName }}</MpText>
          <MpIcon name="check" size="sm" :class="css({ color: 'icon.selected' })" />
        </MpPopoverListItem>
        <MpPopoverListItem>
          PT Talenta Digital Indonesia
        </MpPopoverListItem>
      </MpPopoverList>

      <MpFlex px="3" pb="3">
        <MpButton variant="primary" :class="css({ width: 'full' })">
          Add new company
        </MpButton>
      </MpFlex>
    </template>

    <!-- Change language -->
    <template v-if="showToggleContent === 'changeLanguage'">
      <MpFlex
        gap="2"
        alignItems="center"
        py="2"
        px="3"
        bg="background.neutral.subtle"
        borderBottomWidth="1"
        borderColor="border.default"
        roundedTop="md"
      >
        <MpButton
          aria-label="back"
          left-icon="arrows-left"
          variant="ghost"
          size="sm"
          @click="onToggleContent('parent')"
        />
        <MpText weight="semiBold">Change language</MpText>
      </MpFlex>

      <MpPopoverList>
        <MpPopoverListItem is-active>
          <MpText weight="semiBold">English</MpText>
          <MpIcon name="check" size="sm" :class="css({ color: 'icon.selected' })" />
        </MpPopoverListItem>
        <MpPopoverListItem>
          <MpText>Bahasa</MpText>
        </MpPopoverListItem>
      </MpPopoverList>
    </template>

    <!-- Switch account -->
    <template v-if="showToggleContent === 'switchAccount'">
      <MpFlex
        gap="2"
        alignItems="center"
        py="2"
        px="3"
        bg="background.neutral.subtle"
        borderBottomWidth="1"
        borderColor="border.default"
        roundedTop="md"
      >
        <MpButton
          aria-label="back"
          left-icon="arrows-left"
          variant="ghost"
          size="sm"
          @click="onToggleContent('parent')"
        />
        <MpText weight="semiBold">Switch account</MpText>
      </MpFlex>

      <MpPopoverList>
        <MpPopoverListItem><MpText>dimas.raka@mekari.com</MpText></MpPopoverListItem>
        <MpPopoverListItem><MpText>sastra.nababan@mekari.com</MpText></MpPopoverListItem>
        <MpPopoverListItem><MpText>dirga.prakhesa@mekari.com</MpText></MpPopoverListItem>
        <MpPopoverListItem is-active>
          <MpText weight="semiBold">ahmad.zakiy@mekari.com</MpText>
          <MpIcon name="check" size="sm" :class="css({ color: 'icon.selected' })" />
        </MpPopoverListItem>
      </MpPopoverList>

      <MpFlex px="3" pb="3">
        <MpButton variant="primary" :class="css({ width: 'full' })">
          Add new account
        </MpButton>
      </MpFlex>
    </template>

    <!-- Switch themes -->
    <template v-if="showToggleContent === 'switchThemes'">
      <MpFlex
        gap="2"
        alignItems="center"
        py="2"
        px="3"
        bg="background.neutral.subtle"
        borderBottomWidth="1"
        borderColor="border.default"
        roundedTop="md"
      >
        <MpButton
          aria-label="back"
          left-icon="arrows-left"
          variant="ghost"
          size="sm"
          @click="onToggleContent('parent')"
        />
        <MpText weight="semiBold">Themes</MpText>
      </MpFlex>

      <MpPopoverList>
        <MpPopoverListItem
          :is-active="currentTheme === 'auto'"
          @click="[setTheme('auto'), onClosePopover?.()]"
        >
          <MpText :weight="currentTheme === 'auto' ? 'semiBold' : 'regular'">Auto (System settings)</MpText>
          <MpIcon v-if="currentTheme === 'auto'" name="check" size="sm" :class="css({ color: 'icon.selected' })" />
        </MpPopoverListItem>

        <MpPopoverListItem
          :is-active="currentTheme === 'light'"
          @click="[setTheme('light'), onClosePopover?.()]"
        >
          <MpText :weight="currentTheme === 'light' ? 'semiBold' : 'regular'">Light</MpText>
          <MpIcon v-if="currentTheme === 'light'" name="check" size="sm" :class="css({ color: 'icon.selected' })" />
        </MpPopoverListItem>

        <MpPopoverListItem
          :is-active="currentTheme === 'dark'"
          @click="[setTheme('dark'), onClosePopover?.()]"
        >
          <MpFlex alignItems="center" gap="2">
            <MpText :weight="currentTheme === 'dark' ? 'semiBold' : 'regular'">Dark</MpText>
            <MpBadge for="additionalInformation" type="critical" size="sm">Beta</MpBadge>
          </MpFlex>
          <MpIcon v-if="currentTheme === 'dark'" name="check" size="sm" :class="css({ color: 'icon.selected' })" />
        </MpPopoverListItem>
      </MpPopoverList>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  MpAvatar,
  MpBadge,
  MpButton,
  MpDivider,
  MpFlex,
  MpIcon,
  MpPopoverList,
  MpPopoverListItem,
  MpText,
  css
} from "@mekari/pixel3";
import { usePixelLayout } from "~/composables/usePixelLayout";
import { useAuth } from "~/composables/useAuth";
import { usePixelThemeSwitcher } from "~/composables/usePixelThemeSwitcher";

type ContentType = "parent" | "companyList" | "changeLanguage" | "switchAccount" | "switchThemes";

defineProps({
  onClosePopover: {
    type: Function
  }
});

const { accountInformation } = usePixelLayout();
const { setTheme, currentTheme } = usePixelThemeSwitcher();
const { logout } = useAuth();

const THEME_LABELS: Record<string, string> = {
  auto: "Auto",
  light: "Light",
  dark: "Dark"
};

const showToggleContent = ref<ContentType>("parent");

function onToggleContent(content: ContentType) {
  showToggleContent.value = content;
}

function openMekariAccount() {
  window.open("https://mekari.com", "_blank", "noopener,noreferrer");
}
</script>
