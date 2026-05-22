<template>
  <div>
    <!-- Parent view -->
    <template v-if="showToggleContent === 'parent'">
      <div :class="profileRootClass">
        <div :class="profileContentClass">
          <MpAvatar
            :class="css({ marginBottom: '2' })"
            :name="accountInformation.fullName"
            :src="accountInformation.userPhoto"
            size="lg"
          />
          <MpText weight="semiBold">{{ accountInformation.fullName }}</MpText>
          <MpText color="text.secondary">{{ accountInformation.companyName }}</MpText>
        </div>
      </div>

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

      <MpDivider :class="css({ marginY: '0' })" />

      <MpPopoverList>
        <MpPopoverListItem is-arrow @click="onToggleContent('switchAccount')">
          Switch account
        </MpPopoverListItem>
        <MpPopoverListItem is-arrow @click="onToggleContent('switchThemes')">
          Themes
        </MpPopoverListItem>
        <MpPopoverListItem>Sign out</MpPopoverListItem>
      </MpPopoverList>

      <div :class="footerRootClass">
        <MpText :class="footerFontClass">Privacy</MpText>
        <MpText :class="footerFontClass">Terms of Use</MpText>
        <MpText :class="footerFontClass">About Mekari Account</MpText>
        <MpText :class="footerFontClass">Mekari © 2022</MpText>
      </div>
    </template>

    <!-- Company list -->
    <template v-if="showToggleContent === 'companyList'">
      <div :class="popoverHeaderStyle">
        <MpButton
          aria-label="back"
          left-icon="arrows-left"
          variant="ghost"
          size="sm"
          @click="onToggleContent('parent')"
        />
        <MpText weight="semiBold">Daftar perusahaan</MpText>
      </div>

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
        <button
          :class="
            css({
              cursor: 'pointer',
              width: 'full',
              textAlign: 'center',
              pt: 2,
              borderTopWidth: '1px',
              borderColor: 'border.default',
              color: 'text.link',
              _hover: { color: 'text.link' }
            })
          "
        >
          + Create new company
        </button>
      </MpPopoverList>
    </template>

    <!-- Change language -->
    <template v-if="showToggleContent === 'changeLanguage'">
      <div :class="popoverHeaderStyle">
        <MpButton
          aria-label="back"
          left-icon="arrows-left"
          variant="ghost"
          size="sm"
          @click="onToggleContent('parent')"
        />
        <MpText weight="semiBold">Change language</MpText>
      </div>

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
      <div :class="popoverHeaderStyle">
        <MpButton
          aria-label="back"
          left-icon="arrows-left"
          variant="ghost"
          size="sm"
          @click="onToggleContent('parent')"
        />
        <MpText weight="semiBold">Switch account</MpText>
      </div>

      <MpPopoverList>
        <MpPopoverListItem>
          <MpText weight="semiBold">dimas.raka@mekari.com</MpText>
          <MpIcon name="check" size="sm" />
        </MpPopoverListItem>
        <MpPopoverListItem><MpText>sastra.nababan@mekari.com</MpText></MpPopoverListItem>
        <MpPopoverListItem><MpText>dirga.prakhesa@mekari.com</MpText></MpPopoverListItem>
        <MpPopoverListItem><MpText>ahmad.zakiy@mekari.com</MpText></MpPopoverListItem>
        <button
          :class="
            css({
              cursor: 'pointer',
              width: 'full',
              textAlign: 'center',
              pt: 2,
              borderTopWidth: '1px',
              borderColor: 'border.default',
              color: 'text.link'
            })
          "
        >
          + Add new account
        </button>
      </MpPopoverList>
    </template>

    <!-- Switch themes -->
    <template v-if="showToggleContent === 'switchThemes'">
      <div :class="popoverHeaderStyle">
        <MpButton
          aria-label="back"
          left-icon="arrows-left"
          variant="ghost"
          size="sm"
          @click="onToggleContent('parent')"
        />
        <MpText weight="semiBold">Themes</MpText>
      </div>

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
          <MpFlex align="center" gap="2">
            Dark
            <MpBadge type="critical" size="sm">BETA</MpBadge>
          </MpFlex>
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
  css
} from "@mekari/pixel3";
import { usePixelLayout } from "~/composables/usePixelLayout";
import { usePixelThemeSwitcher } from "~/composables/usePixelThemeSwitcher";

defineProps({
  onClosePopover: {
    type: Function
  }
});

const { accountInformation } = usePixelLayout();
const { setTheme, currentTheme } = usePixelThemeSwitcher();

const popoverHeaderStyle = css({
  display: "flex",
  gap: 2,
  alignItems: "center",
  py: 2,
  px: 3,
  roundedTop: "md",
  backgroundColor: "background.neutral.subtle",
  borderBottomWidth: "1px",
  borderColor: "border.default"
});

const profileRootClass = css({
  backgroundColor: "background.neutral",
  borderBottomWidth: "1px",
  borderColor: "border.default",
  borderTopRadius: "md",
  py: 4
});

const profileContentClass = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column"
});

const footerRootClass = css({
  display: "flex",
  gap: "3",
  flexWrap: "wrap",
  px: "3",
  py: "4"
});

const footerFontClass = css({
  fontSize: "xs",
  color: "text.secondary"
});

type ContentType = "parent" | "companyList" | "changeLanguage" | "switchAccount" | "switchThemes";
const showToggleContent = ref<ContentType>("parent");

function onToggleContent(content: ContentType) {
  showToggleContent.value = content;
}
</script>
