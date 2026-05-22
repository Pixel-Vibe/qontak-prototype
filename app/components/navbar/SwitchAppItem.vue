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
          color: 'background.brand.selected',
          cursor: 'pointer'
        }
      })
    "
  >
    <MpFlex gap="3" alignItems="center" :class="css({ flex: '1' })">
      <div
        :class="css({
          bg: 'background.stage',
          borderWidth: '1px',
          borderColor: 'border.default',
          borderRadius: 'md',
          padding: '2',
          flexShrink: '0',
          _groupHover: { backgroundColor: 'background.neutral' }
        })"
      >
        <MpIcon :name="icon" size="sm" />
      </div>

      <MpFlex direction="column" :class="css({ flex: '1', minWidth: '0' })">
        <MpText weight="semiBold" :class="css({ fontSize: 'sm', lineHeight: '5', color: 'text.default' })">
          {{ title }}
        </MpText>
        <MpText size="label-small" color="text.secondary">
          {{ description }}
        </MpText>
      </MpFlex>

      <MpIcon v-if="newtab" name="newtab" size="sm" :class="css({ color: 'icon.default', flexShrink: '0' })" />
    </MpFlex>
  </component>
</template>

<script setup lang="ts">
import { MpFlex, MpIcon, MpText, css } from "@mekari/pixel3";

const props = defineProps({
  as: {
    type: String,
    default: "div"
  },
  title: [String],
  description: [String],
  icon: [String],
  newtab: {
    type: Boolean,
    default: false
  }
});
</script>
