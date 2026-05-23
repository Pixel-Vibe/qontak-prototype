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
      >
        <MpAvatar
          :name="accountInformation.fullName"
          :src="accountInformation.userPhoto"
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
        <MpFlex gap="2" mt="2">
          <MpBadge for="tableStatus" type="information">Admin</MpBadge>
          <MpBadge for="tableStatus" type="information">Full</MpBadge>
        </MpFlex>
      </MpFlex>

      <MpPopoverList>
        <MpPopoverListItem>
          Account settings
          <MpIcon name="newtab" size="sm" />
        </MpPopoverListItem>
        <MpPopoverListItem>
          Company info
          <MpIcon name="newtab" size="sm" />
        </MpPopoverListItem>
        <MpPopoverListItem is-arrow @click="onToggleContent('companyList')">
          Company list
        </MpPopoverListItem>
        <MpPopoverListItem @click="onToggleContent('changeLanguage')">
          Change language
          <MpText color="text.secondary">English</MpText>
        </MpPopoverListItem>
      </MpPopoverList>

      <MpDivider />

      <MpPopoverList>
        <MpPopoverListItem is-arrow @click="onToggleContent('switchAccount')">
          Switch account
        </MpPopoverListItem>
        <MpPopoverListItem is-arrow @click="onToggleContent('switchThemes')">
          Themes
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
      >
        <MpButton
          aria-label="back"
          left-icon="arrows-left"
          variant="ghost"
          size="sm"
          @click="onToggleContent('parent')"
        />
        <MpText weight="semiBold">Daftar perusahaan</MpText>
      </MpFlex>

      <MpPopoverList>
        <MpPopoverListItem>
          See the company list
          <MpIcon name="newtab" size="sm" />
        </MpPopoverListItem>
      </MpPopoverList>

      <MpDivider :class="css({ marginY: '0' })" />

      <MpPopoverList>
        <MpPopoverListItem>
          <div>
            <MpText weight="semiBold">Company name 1</MpText>
            <MpText color="text.secondary">Company id : 377750</MpText>
          </div>
          <MpIcon name="check" size="sm" />
        </MpPopoverListItem>
        <MpPopoverListItem>
          <div>
            <MpText>Company name 2</MpText>
            <MpText color="text.secondary">Company id : 377751</MpText>
          </div>
        </MpPopoverListItem>
        <MpPopoverListItem>
          <div>
            <MpText>Company name 3</MpText>
            <MpText color="text.secondary">Company id : 377752</MpText>
          </div>
        </MpPopoverListItem>
        <MpFlex justifyContent="center" pt="2" borderTopWidth="1" borderColor="border.default">
          <MpTextlink variant="primary">+ Create new company</MpTextlink>
        </MpFlex>
      </MpPopoverList>
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
        <MpPopoverListItem>
          <MpText weight="semiBold">English</MpText>
          <MpIcon name="check" size="sm" />
        </MpPopoverListItem>
        <MpPopoverListItem>
          <MpText>Indonesia</MpText>
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
        <MpPopoverListItem>
          <MpText weight="semiBold">dimas.raka@mekari.com</MpText>
          <MpIcon name="check" size="sm" />
        </MpPopoverListItem>
        <MpPopoverListItem><MpText>sastra.nababan@mekari.com</MpText></MpPopoverListItem>
        <MpPopoverListItem><MpText>dirga.prakhesa@mekari.com</MpText></MpPopoverListItem>
        <MpPopoverListItem><MpText>ahmad.zakiy@mekari.com</MpText></MpPopoverListItem>
        <MpFlex justifyContent="center" pt="2" borderTopWidth="1" borderColor="border.default">
          <MpTextlink variant="primary">+ Add new account</MpTextlink>
        </MpFlex>
      </MpPopoverList>
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
          <MpText>Auto (System settings)</MpText>
          <MpIcon v-if="currentTheme === 'auto'" name="check" size="sm" />
        </MpPopoverListItem>

        <MpPopoverListItem
          :is-active="currentTheme === 'light'"
          @click="[setTheme('light'), onClosePopover?.()]"
        >
          <MpText>Light</MpText>
          <MpIcon v-if="currentTheme === 'light'" name="check" size="sm" />
        </MpPopoverListItem>

        <MpPopoverListItem
          :is-active="currentTheme === 'dark'"
          @click="[setTheme('dark'), onClosePopover?.()]"
        >
          <MpText>Dark</MpText>
          <MpIcon v-if="currentTheme === 'dark'" name="check" size="sm" />
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
  MpTextlink,
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

const showToggleContent = ref<ContentType>("parent");

function onToggleContent(content: ContentType) {
  showToggleContent.value = content;
}
</script>
