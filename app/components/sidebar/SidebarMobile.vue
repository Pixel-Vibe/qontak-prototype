<template>
  <div
    :class="
      css({
        display: { base: 'flex', md: 'none' }
      })
    "
  >
    <button
      :class="
        css({
          cursor: 'pointer',
          height: '9.5',
          minWidth: '9.5',
          padding: '1.5',
          rounded: 'sm',
          transition: 'all 250ms ease 0s',
          _hover: { background: 'background.neutral.hovered' }
        })
      "
      @click="isOpen = !isOpen"
    >
      <MpIcon :name="isOpen ? 'close' : 'burger'" size="md" />
    </button>

    <MpDrawer :isOpen="isOpen" size="full" @close="isOpen = false">
      <MpDrawerContent>
        <MpDrawerBody
          :class="
            css({
              maxHeight: 'calc(100vh)',
              overflow: 'hidden auto',
              padding: 0,
              marginTop: ['4', '20'],
              backgroundColor: 'background'
            })
          "
        >
          <!-- User info -->
          <MpFlex
            alignItems="center"
            borderRadius="none"
            paddingX="4"
            paddingY="2.5"
            backgroundColor="white"
          >
            <MpAvatar
              :name="accountInformation.fullName"
              :src="accountInformation.userPhoto"
              size="md"
              :class="css({ marginRight: '2' })"
            />
            <MpFlex flexDirection="column">
              <MpText weight="semiBold">{{ accountInformation.fullName }}</MpText>
              <MpText size="label-small" color="text.secondary">{{
                accountInformation.companyName
              }}</MpText>
            </MpFlex>
          </MpFlex>

          <!-- Menus -->
          <div :class="css({ paddingX: '2', paddingY: '4', backgroundColor: 'white' })">
            <ul :class="css({ display: 'flex', flexDirection: 'column' })">
              <template v-for="menu in menuItems" :key="menu.id">
                <li
                  class="group"
                  :class="
                    css({
                      flex: '1',
                      borderRadius: 'sm',
                      transition: 'all 200ms ease',
                      px: '2',
                      py: '2',
                      backgroundColor: isRouteActive(menu.route)
                        ? 'background.brand.selected'
                        : 'transparent',
                      color: isRouteActive(menu.route) ? 'text.selected' : 'text.default',
                      _hover: {
                        backgroundColor: 'background.brand.subtle',
                        cursor: 'pointer'
                      }
                    })
                  "
                  @click="handleSelectMenu(menu)"
                >
                  <MpFlex alignItems="center" justifyContent="space-between">
                    <MpFlex gap="2" alignItems="center">
                      <MpIcon
                        :name="menu.icon || 'empty'"
                        :variant="isRouteActive(menu.route) ? 'fill' : 'outline'"
                        :color="isRouteActive(menu.route) ? 'icon.brand' : 'icon.default'"
                      />
                      <MpText
                        :color="isRouteActive(menu.route) ? 'text.selected' : 'text.default'"
                        :weight="isRouteActive(menu.route) ? 'semiBold' : 'regular'"
                      >
                        {{ menu.label }}
                      </MpText>
                    </MpFlex>
                    <MpIcon v-if="menu.submenu" name="chevrons-right" />
                  </MpFlex>
                </li>
              </template>
            </ul>
          </div>

          <!-- Bottom actions -->
          <div :class="css({ padding: '4' })">
            <MpFlex flexDirection="column">
              <MpText as="a" href="#" color="text.secondary" :class="css({ py: '2' })"
                >Account settings</MpText
              >
              <MpText as="a" href="#" color="text.secondary" :class="css({ py: '2' })"
                >Company info</MpText
              >
              <MpText as="a" href="#" color="text.secondary" :class="css({ py: '2' })">
                Company list
                <MpIcon name="chevrons-right" :class="css({ float: 'right' })" />
              </MpText>
              <MpText as="a" href="#" color="text.secondary" :class="css({ py: '2' })"
                >Help & Support</MpText
              >
              <MpText as="a" href="#" color="text.secondary" :class="css({ py: '2' })"
                >Change language</MpText
              >
              <MpDivider />
              <MpText as="a" href="#" color="text.secondary" :class="css({ py: '2' })">
                Switch account
                <MpIcon name="chevrons-right" :class="css({ float: 'right' })" />
              </MpText>
              <MpText as="a" href="#" color="text.secondary" :class="css({ py: '2' })">
                Sign out
                <MpIcon name="chevrons-right" :class="css({ float: 'right' })" />
              </MpText>
              <MpDivider />
              <MpText as="a" href="#" color="text.secondary" :class="css({ py: '2' })"
                >Privacy</MpText
              >
              <MpText as="a" href="#" color="text.secondary" :class="css({ py: '2' })"
                >Terms of Use</MpText
              >
              <MpText as="a" href="#" color="text.secondary" :class="css({ py: '2' })"
                >About Mekari Account</MpText
              >
              <MpText color="text.secondary" :class="css({ py: '2' })">Mekari © 2026</MpText>
            </MpFlex>
          </div>
        </MpDrawerBody>
      </MpDrawerContent>

      <MpDrawerOverlay />
    </MpDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  MpAvatar,
  MpDivider,
  MpDrawer,
  MpDrawerBody,
  MpDrawerContent,
  MpDrawerOverlay,
  MpFlex,
  MpIcon,
  MpText,
  css
} from "@mekari/pixel3";
import { usePixelLayout } from "~/composables/usePixelLayout";
import { useAppMenu } from "~/composables/useAppMenu";
import type { AppMenuItem } from "~/data/menu";

const router = useRouter();
const { accountInformation } = usePixelLayout();
const { menuItems, isRouteActive } = useAppMenu();

const isOpen = ref(false);

function handleSelectMenu(menu: AppMenuItem) {
  router.push(menu.route);
  isOpen.value = false;
}
</script>
