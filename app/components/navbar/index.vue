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
      <MpFlex alignItems="center">
        <NuxtLink to="/">
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
        <MpDivider orientation="vertical" :class="css({ height: 6, mr: '4', ml: '6' })" />
        <SelectApp
          :model-value="{ id: 1, label: 'Omnichannel', isSelected: true }"
          :items="[
            { id: 1, label: 'Omnichannel', isSelected: true },
            { id: 2, label: 'CRM' },
            { id: 3, label: 'Knowledge Base', isNew: true }
          ]"
          @update:model-value="(val) => console.log('app switched:', val)"
        />
      </MpFlex>
    </div>

    <div data-slot="rightContent" :class="css({ display: 'flex', gap: '2', alignItems: 'center' })">
      <MpButton
        v-tooltip="'Help center'"
        aria-label="help button"
        left-icon="help"
        variant="ghost"
      />

      <Notification>
        <NotificationContent />
      </Notification>

      <SwitchApp>
        <div :class="css({ paddingBottom: '20', paddingX: '6' })">
          <MpText :class="css({ marginBottom: '2' })"
            >Hi Christin, your apps are listed here.</MpText
          >
          <SwitchAppItem
            title="Mekari Talenta"
            description="Advanced payroll automation & HR solution"
            icon="talenta-brand"
          />
          <SwitchAppItem
            title="Mekari Jurnal"
            description="Integrated online accounting software"
            icon="jurnal-brand"
          />
          <MpDivider :class="css({ marginTop: '2', marginBottom: '2' })" />
          <MpText :class="css({ marginBottom: '2' })"
            >Other apps by Mekari that might suit your business needs.</MpText
          >
          <SwitchAppItem
            title="Mekari Klikpajak"
            description="Simple tax management platform"
            icon="klikpajak-brand"
          />
          <SwitchAppItem
            title="Mekari Flex"
            description="Flexible employee benefits management"
            icon="flex-brand"
          />
          <SwitchAppItem
            title="Mekari Sign"
            description="Digital signature app"
            icon="sign-brand"
          />
          <MpDivider :class="css({ marginTop: '2', marginBottom: '2' })" />
          <MpText :class="css({ marginBottom: '2' })">More from Mekari.</MpText>
          <SwitchAppItem
            title="Mekari University"
            description="Professional learning platform"
            icon="mekari-brand"
          />
          <SwitchAppItem title="Mekari Hub" description="Launchpad" icon="mekari-brand" />
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
import { css, MpButton, MpDivider, MpFlex, MpText } from "@mekari/pixel3";
import { usePixelLayout } from "~/composables/usePixelLayout";
import { NAVBAR_HEIGHT } from "~/data/constants";
import SelectApp from "~/components/navbar/SelectApp.vue";
import Notification from "~/components/navbar/Notification.vue";
import NotificationContent from "~/components/navbar/NotificationContent.vue";
import SwitchApp from "~/components/navbar/SwitchApp.vue";
import SwitchAppItem from "~/components/navbar/SwitchAppItem.vue";
import SwitchAccount from "~/components/navbar/SwitchAccount.vue";
import SwitchAccountContent from "~/components/navbar/SwitchAccountContent.vue";
import SidebarMobile from "~/components/sidebar/SidebarMobile.vue";

const { navbarNode, setAccountInformation } = usePixelLayout();

setAccountInformation({
  companyId: "12345678",
  companyName: "PT Central Perk Indonesia",
  fullName: "Christin Purnama Sari",
  userPhoto: ""
});
</script>
