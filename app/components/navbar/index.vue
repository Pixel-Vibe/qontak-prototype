<template>
  <nav
    ref="navbarNode"
    data-pixel-component="TheNavbar"
    data-slot="root"
    :class="
      css({
        position: 'fixed',
        zIndex: '101',
        width: 'full',
        bg: 'background.stage',
        px: '6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: '1px',
        borderColor: 'border.default',
        py: '2',
        height: `${NAVBAR_HEIGHT}px`
      })
    "
  >
    <div data-slot="leftContent" :class="css({ display: 'flex', gap: '2', alignItems: 'center' })">
      <NuxtLink to="/home">
        <img
          :class="css({ display: 'block', _dark: { display: 'none' } })"
          src="https://cdn.mekari.design/logo/qontak/default.svg"
          alt="Mekari Qontak"
          height="56"
          width="auto"
        />
        <img
          :class="css({ display: 'none', _dark: { display: 'block' } })"
          src="https://cdn.mekari.design/logo/qontak/white.svg"
          alt="Mekari Qontak"
          height="56"
          width="auto"
        />
      </NuxtLink>
    </div>

    <div data-slot="rightContent" :class="css({ display: 'flex', gap: '2', alignItems: 'center' })">
      <OnlineStatus />

      <Notification>
        <NotificationContent />
      </Notification>

      <SwitchApp>
        <div>
          <MpText :class="css({ mb: '2', color: 'text.default' })">
            Hi {{ accountInformation.fullName }}, your apps are listed here.
          </MpText>
          <SwitchAppItem
            title="Qontak Omnichannel"
            description="No. 1 Omnichannel apps in Indonesia"
            icon="qontak-brand"
          />
        </div>

        <MpDivider :class="css({ marginY: '0' })" />

        <div>
          <MpText :class="css({ mb: '2', color: 'text.default' })">
            Other product by Mekari that might suit your business needs.
          </MpText>
          <SwitchAppItem
            newtab
            title="Mekari Talenta"
            description="Advanced payroll automation & HR solution"
            icon="talenta-brand"
          />
          <SwitchAppItem
            newtab
            title="Mekari Jurnal"
            description="Integrated online accounting software"
            icon="jurnal-brand"
          />
          <SwitchAppItem
            newtab
            title="Mekari Klikpajak"
            description="Simple tax management platform"
            icon="klikpajak-brand"
          />
          <SwitchAppItem
            newtab
            title="Mekari Flex"
            description="Flexible employee benefits management"
            icon="flex-brand"
          />
          <SwitchAppItem
            newtab
            title="Mekari eSign"
            description="Digital signing solution"
            icon="sign-brand"
          />
        </div>

        <MpDivider :class="css({ marginY: '0' })" />

        <div>
          <MpText :class="css({ mb: '2', color: 'text.default' })">More from Mekari</MpText>
          <SwitchAppItem
            newtab
            title="Mekari University"
            description="Professional learning platform"
            icon="mekari-brand"
          />
          <SwitchAppItem
            newtab
            title="Mekari Account"
            description="Your account"
            icon="mekari-brand"
          />
        </div>
      </SwitchApp>

      <SwitchAccount v-slot="{ onClosePopover }">
        <SwitchAccountContent :on-close-popover="onClosePopover" />
      </SwitchAccount>

      <SidebarMobile />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { css } from "@mekari/pixel3";
import { usePixelLayout } from "~/composables/usePixelLayout";
import { NAVBAR_HEIGHT } from "~/data/constants";
import OnlineStatus from "~/components/navbar/OnlineStatus.vue";
import Notification from "~/components/navbar/Notification.vue";
import NotificationContent from "~/components/navbar/NotificationContent.vue";
import SwitchApp from "~/components/navbar/SwitchApp.vue";
import SwitchAppItem from "~/components/navbar/SwitchAppItem.vue";
import SwitchAccount from "~/components/navbar/SwitchAccount.vue";
import SwitchAccountContent from "~/components/navbar/SwitchAccountContent.vue";
import SidebarMobile from "~/components/sidebar/SidebarMobile.vue";

const { navbarNode, accountInformation } = usePixelLayout();
</script>
