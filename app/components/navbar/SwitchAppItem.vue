<template>
  <component
    :is="props.as"
    class="group"
    :class="
      css({
        display: 'flex',
        borderRadius: 'sm',
        padding: '2',
        minHeight: '20',
        transition: 'all 200ms ease',
        _hover: {
          backgroundColor: 'background.neutral.subtle',
          color: 'text.brand',
          cursor: 'pointer'
        }
      })
    "
  >
    <MpFlex gap="3" alignItems="center" flex="1">
      <div
        :class="
          css({
            bg: 'background.stage',
            borderWidth: '1px',
            borderColor: 'border.default',
            borderRadius: 'md',
            padding: '2',
            flexShrink: '0',
            _groupHover: { backgroundColor: 'background.neutral' }
          })
        "
      >
        <MpIcon :name="icon" size="sm" />
      </div>

      <MpFlex direction="column" flex="1" minWidth="0">
        <MpText size="body-small" weight="semiBold" color="text.default">
          {{ title }}
        </MpText>
        <MpText size="label-small" color="text.secondary">
          {{ description }}
        </MpText>
      </MpFlex>

      <MpIcon
        v-if="newtab"
        name="newtab"
        size="sm"
        :class="css({ color: 'icon.default', flexShrink: '0' })"
      />
    </MpFlex>
  </component>
</template>

<script setup lang="ts">
import { MpFlex, MpIcon, MpText, css, type IconName } from "@mekari/pixel3";
import type { PropType } from "vue";

const props = defineProps({
  as: {
    type: String,
    default: "div"
  },
  title: [String],
  description: [String],
  icon: { type: String as PropType<IconName | undefined> },
  newtab: {
    type: Boolean,
    default: false
  }
});
</script>
