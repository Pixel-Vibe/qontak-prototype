<template>
  <MpFlex
    justifyContent="space-between"
    alignItems="center"
    p="sm"
    m="lg"
    rounded="xl"
    shadow="xl"
    background="background.brand"
    borderColor="border.default"
    borderWidth="1px"
  >
    <MpText size="h1">Hello Pixel 3</MpText>
    <MpButton v-tooltip="'Start to Develop'" @click="handleShow">
      Start to Develop
    </MpButton>
  </MpFlex>
</template>

<script setup lang="ts">
import { toast, usePixelTheme } from "@mekari/pixel3";

const { setNextTheme, setDarkMode } = usePixelTheme();

setNextTheme(true); // Enable Design Token 2.4
setDarkMode(false); // Enable Dark Mode

function handleShow() {
  toast.notify({
    position: "bottom-center",
    variant: "success",
    title: "Click is successful."
  });
}
</script>
