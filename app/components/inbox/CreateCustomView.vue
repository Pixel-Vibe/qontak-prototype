<template>
  <MpDrawer
    :is-open="isDrawerOpen"
    placement="right"
    :is-keep-alive="false"
    @open="emit('open')"
    @close="
      () => {
        isDrawerOpen = false;
        emit('close');
      }
    "
  >
    <MpDrawerContent>
      <MpDrawerHeader>
        Create custom view
        <MpDrawerCloseButton />
      </MpDrawerHeader>

      <MpDrawerBody>
        <MpFlex direction="column" gap="3">
          <MpFormControl id="view-name-input" :class="css({ width: 'full' })">
            <MpFormLabel>
              <MpFlex justifyContent="space-between" alignItems="center" width="full">
                View Name
                <MpText size="label-small" color="text.secondary">{{
                  `${viewName.length}/24`
                }}</MpText>
              </MpFlex>
            </MpFormLabel>
            <MpInput
              v-model="viewName"
              placeholder="e.g. Sales regional"
              maxlength="24"
              :is-full-width="true"
            />
            <MpFormErrorMessage>You must fill in view name</MpFormErrorMessage>
            <MpFormHelpText>The view name field is required</MpFormHelpText>
          </MpFormControl>

          <MpDivider />

          <MpFormControl>
            <MpFormLabel>Filters</MpFormLabel>
            <MpPopover id="popover-add-filter">
              <MpPopoverTrigger>
                <MpButton variant="secondary" left-icon="add-circular">Add filter</MpButton>
              </MpPopoverTrigger>
              <MpPopoverContent
                :class="
                  css({
                    width: '200px',
                    maxWidth: '200px',
                    maxHeight: '400px',
                    overflowY: 'auto'
                  })
                "
              >
                <MpPopoverListItem v-for="i in 10" :key="i">Option {{ i }}</MpPopoverListItem>
              </MpPopoverContent>
            </MpPopover>
          </MpFormControl>
        </MpFlex>
      </MpDrawerBody>

      <MpDrawerFooter>
        <MpButtonGroup>
          <MpButton
            variant="secondary"
            @click="
              () => {
                isDrawerOpen = false;
                emit('close');
              }
            "
            >Cancel</MpButton
          >
          <MpButton>Save</MpButton>
        </MpButtonGroup>
      </MpDrawerFooter>
    </MpDrawerContent>
    <MpDrawerOverlay />
  </MpDrawer>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
  css,
  MpFlex,
  MpButton,
  MpButtonGroup,
  MpDivider,
  MpDrawer,
  MpDrawerBody,
  MpDrawerCloseButton,
  MpDrawerContent,
  MpDrawerFooter,
  MpDrawerHeader,
  MpDrawerOverlay,
  MpFormControl,
  MpFormLabel,
  MpFormHelpText,
  MpFormErrorMessage,
  MpInput,
  MpPopover,
  MpPopoverContent,
  MpPopoverListItem,
  MpPopoverTrigger,
  MpText
} from "@mekari/pixel3";

const props = defineProps({
  isOpen: { type: Boolean, default: false }
});

const emit = defineEmits<{
  close: [];
  open: [];
}>();

const viewName = ref("");
const isDrawerOpen = ref(props.isOpen);

watch(
  () => props.isOpen,
  (val) => {
    isDrawerOpen.value = val;
  }
);
</script>
