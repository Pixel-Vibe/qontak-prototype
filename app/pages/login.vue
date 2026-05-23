<template>
  <MpFlex
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    backgroundColor="background.surface"
    padding="6"
  >
    <MpFlex
      direction="column"
      backgroundColor="background.stage"
      borderRadius="lg"
      borderWidth="1"
      borderStyle="solid"
      borderColor="border.default"
      padding="10"
      width="full"
      maxWidth="400px"
      shadow="lg"
    >
      <!-- Logo -->
      <MpFlex justifyContent="center" :class="css({ mb: '6' })">
        <img
          :class="css({ display: 'block', _dark: { display: 'none' } })"
          src="https://cdn.mekari.design/logo/qontak/default.svg"
          alt="Mekari Qontak"
          height="40"
        />
        <img
          :class="css({ display: 'none', _dark: { display: 'block' } })"
          src="https://cdn.mekari.design/logo/qontak/white.svg"
          alt="Mekari Qontak"
          height="40"
        />
      </MpFlex>

      <!-- Heading -->
      <MpText size="h2" :class="css({ mb: '1' })"> Sign in to Qontak Prototype </MpText>
      <MpText color="text.secondary" :class="css({ mb: '6' })">
        Enter credentials to access the platform.
      </MpText>

      <!-- Form -->
      <form @submit.prevent="handleSubmit">
        <MpFlex direction="column" gap="4">
          <!-- Email -->
          <MpFormControl id="login-email" is-required :is-invalid="!!errorMessage">
            <MpFormLabel>Email</MpFormLabel>
            <MpInput
              v-model="email"
              type="email"
              placeholder="e.g. john@mekari.com"
              is-full-width
              :is-disabled="isLoading"
            />
            <MpFormErrorMessage>Email or password is incorrect.</MpFormErrorMessage>
          </MpFormControl>

          <!-- Password -->
          <MpFormControl id="login-password" is-required :is-invalid="!!errorMessage">
            <MpFormLabel>Password</MpFormLabel>
            <MpInputGroup id="login-password-group" size="md">
              <MpInput
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                is-full-width
                :is-disabled="isLoading"
              />
              <MpInputRightAddon id="login-password-toggle">
                <MpIcon
                  :name="showPassword ? 'hide' : 'show'"
                  size="sm"
                  :class="css({ cursor: 'pointer', color: 'icon.default' })"
                  @click="showPassword = !showPassword"
                />
              </MpInputRightAddon>
            </MpInputGroup>
          </MpFormControl>

          <!-- Submit -->
          <MpButton
            variant="primary"
            is-full-width
            :is-loading="isLoading"
            :is-disabled="isLoading"
            type="submit"
            :class="css({ mt: '2' })"
          >
            Sign in
          </MpButton>
        </MpFlex>
      </form>
    </MpFlex>
  </MpFlex>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  css,
  MpButton,
  MpFlex,
  MpFormControl,
  MpFormErrorMessage,
  MpFormLabel,
  MpIcon,
  MpInput,
  MpInputGroup,
  MpInputRightAddon,
  MpText
} from "@mekari/pixel3";
import { useAuth } from "~/composables/useAuth";

definePageMeta({ layout: false });

const { login } = useAuth();

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");

async function handleSubmit() {
  errorMessage.value = "";
  isLoading.value = true;

  await new Promise((resolve) => setTimeout(resolve, 600));

  const success = login(email.value, password.value);

  if (success) {
    await navigateTo("/");
  } else {
    errorMessage.value = "Email or password is incorrect.";
  }

  isLoading.value = false;
}
</script>
