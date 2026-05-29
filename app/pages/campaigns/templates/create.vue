<!--
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Mekari Qontak — Create Campaign Template (Wizard)
  Source: Figma 5E00CpqLOYCKxiar9vSW9j / 6067:4199 + 6068:40274
  Token mode: Pixel 2.4
  Patterns used: form-view, split-layout, wizard-stepper
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  STATES INCLUDED:
    - Step 1: empty form, validation (required fields), filled
    - Step 2: media type = none (default)
    - Step 2: media type = image (file upload + checkbox appear)
    - Step 2: variable sample inputs appear when {{n}} detected in message
    - Step 2: live preview updates as user types
    - Submit: loading state

  COPY DEFAULTS:
    - Account options: placeholder only (wire to API)
    - Language options: id, en, ms
    - Max message length: 550 chars

  CONVENTION OVERRIDES:
    - MpStepper does not exist in Pixel 3 — custom inline stepper with token-styled circles
    - Rich text toolbar is simulated (textarea only, no contenteditable)
    - File upload uses hidden <input type="file"> triggered by Browse button
    - Cancel/Back buttons: ghost variant (not text link) to match visual weight in wizard footer

  OPEN ITEMS for product/design follow-up:
    - Wire account and language selects to real API
    - Implement actual rich text formatting (suggest Tiptap or Quill)
    - Handle video/document upload and preview
    - Implement interactive action sub-forms (call to action / quick reply)
-->
<template>
  <div
    :class="
      css({
        h: '100svh',
        display: 'flex',
        flexDirection: 'column',
        bg: 'background.default',
        overflow: 'hidden'
      })
    "
  >
    <!-- ═════ Wizard top bar ═════ -->
    <header
      :class="
        css({
          h: '56px',
          flexShrink: 0,
          borderBottomWidth: '1px',
          borderColor: 'border.default',
          display: 'flex',
          alignItems: 'center',
          px: '6',
          gap: '4',
          bg: 'background.default'
        })
      "
    >
      <MpText size="h3" weight="semiBold" :class="css({ flexShrink: 0 })">Create template</MpText>

      <!-- Custom inline stepper (Pixel 3 has no MpStepper) -->
      <MpFlex flex="1" justifyContent="center" alignItems="center" gap="2">
        <MpFlex alignItems="center" gap="2">
          <MpIcon name="bulk-send" variant="fill" size="sm" color="icon.brand" />
          <MpText
            size="body-small"
            :weight="step === 1 ? 'semiBold' : 'normal'"
            :color="step === 1 ? 'text.default' : 'text.secondary'"
          >
            Template setup
          </MpText>
        </MpFlex>

        <MpIcon name="arrows-right" size="sm" color="icon.default" />

        <MpFlex alignItems="center" gap="2">
          <MpIcon v-if="step === 2" name="edit" variant="fill" size="sm" color="icon.brand" />
          <MpIcon v-else name="edit" variant="outline" size="sm" color="icon.default" />
          <MpText
            size="body-small"
            :weight="step === 2 ? 'semiBold' : 'normal'"
            :color="step === 2 ? 'text.default' : 'text.secondary'"
          >
            Content editing
          </MpText>
        </MpFlex>
      </MpFlex>

      <MpFlex alignItems="center" gap="3" :class="css({ flexShrink: 0 })">
        <MpButton variant="textLink" size="sm" left-icon="support">
          {{ step === 1 ? HELP_LINK_SETUP : HELP_LINK_CONTENT }}
        </MpButton>
        <MpButton variant="ghost" size="sm" left-icon="close" @click="handleClose" />
      </MpFlex>
    </header>

    <!-- ═════ Step 1: Template Setup ═════ -->
    <div v-if="step === 1" :class="css({ flex: 1, overflowY: 'auto' })">
      <!-- Form + banner: centered, max-width 540px -->
      <div :class="css({ maxW: '540px', mx: 'auto', pt: '8', pb: '12', px: '4' })">
        <!-- Info banner (same width as form) -->
        <MpBanner id="banner-template-info" variant="info">
          <MpBannerIcon id="banner-icon-info" />
          <MpBannerDescription id="banner-desc-info">
            Boost WhatsApp marketing campaign delivery and reliability with new Meta API, built for
            higher reach, smarter targeting, and better conversions.
          </MpBannerDescription>
          <MpBannerLink id="banner-link-info">
            <MpText as="a" href="#" color="text.link" is-text-link>Get started</MpText>
            <MpText as="a" href="#" color="text.link" is-text-link>Learn more</MpText>
          </MpBannerLink>
        </MpBanner>

        <MpText size="h2" weight="semiBold" :class="css({ mb: '1', mt: '6' })"
          >Template setup</MpText
        >
        <MpText color="text.secondary" :class="css({ mb: '6' })">
          Fill template basic information, type and category.
        </MpText>

        <!-- Account -->
        <MpFormControl
          id="fc-account"
          is-required
          :is-invalid="submitted && !account"
          :class="css({ mb: '5' })"
        >
          <MpFormLabel>Account</MpFormLabel>
          <MpSelect id="select-account" v-model="account" placeholder="Select account">
            <option value="wa-account-1">WhatsApp Business Account 1</option>
            <option value="wa-account-2">WhatsApp Business Account 2</option>
          </MpSelect>
          <MpFormErrorMessage>Account is required</MpFormErrorMessage>
        </MpFormControl>

        <!-- Template name -->
        <MpFormControl
          id="fc-template-name"
          is-required
          :is-invalid="submitted && !templateName"
          :class="css({ mb: '5' })"
        >
          <MpFlex justifyContent="space-between" alignItems="center">
            <MpFormLabel>Template name</MpFormLabel>
            <MpText size="body-small" color="text.secondary">{{ templateName.length }}/512</MpText>
          </MpFlex>
          <MpInput
            id="input-template-name"
            v-model="templateName"
            placeholder="Enter template name"
            :maxlength="512"
          />
          <MpFormHelpText
            >Template name must be in lowercase, numbers and underscores</MpFormHelpText
          >
          <MpFormErrorMessage>Template name is required</MpFormErrorMessage>
        </MpFormControl>

        <!-- Type -->
        <MpFormControl id="fc-type" :class="css({ mb: '5' })">
          <MpFormLabel>Type</MpFormLabel>
          <MpFlex direction="column" gap="3">
            <MpRadio id="type-campaign" v-model="selectedType" value="campaign">
              Campaign
              <template #description>Broadcast messages to multiple recipients.</template>
            </MpRadio>
            <MpRadio id="type-marketing-optin" v-model="selectedType" value="marketing_optin">
              Marketing opt-in
              <template #description>
                Collect customer's consent to receive marketing campaign.
                <MpText as="a" href="#" color="text.link" is-text-link :class="css({ ml: '1' })"
                  >Learn more</MpText
                >
              </template>
            </MpRadio>
            <MpRadio id="type-followup" v-model="selectedType" value="followup">
              Follow-up
              <template #description>
                Reach out to recipients when conversation window is expired through inbox.
              </template>
            </MpRadio>
            <MpRadio id="type-carousel" v-model="selectedType" value="carousel">
              <MpFlex as="span" alignItems="center" gap="2">
                Carousel
                <MpBadge for="additionalInformation" type="critical">NEW</MpBadge>
              </MpFlex>
              <template #description>
                Send scrollable cards with images and buttons to showcase multiple products or
                offers.
              </template>
            </MpRadio>
          </MpFlex>
        </MpFormControl>

        <!-- Category -->
        <MpFormControl id="fc-category" :class="css({ mb: '5' })">
          <MpFormLabel>Category</MpFormLabel>
          <MpFlex direction="column" gap="3">
            <MpRadio id="cat-marketing" v-model="selectedCategory" value="marketing">
              Marketing
              <template #description>
                Send promotional offers, product announcements, and more to boost awareness and
                engagement.
              </template>
            </MpRadio>
            <MpRadio
              id="cat-utility"
              v-model="selectedCategory"
              value="utility"
              :is-disabled="isMarketingOptin || isCarousel"
            >
              Utility
              <template #description>
                Send account updates, order updates, alerts, and other important information.
              </template>
            </MpRadio>
            <MpRadio
              id="cat-authentication"
              v-model="selectedCategory"
              value="authentication"
              :is-disabled="isMarketingOptin || isFollowup || isCarousel"
            >
              Authentication
              <template #description>
                Send access codes to customers. Campaigns can only be sent via API.
              </template>
            </MpRadio>
          </MpFlex>
        </MpFormControl>

        <!-- Language -->
        <MpFormControl
          id="fc-language"
          is-required
          :is-invalid="submitted && !language"
          :class="css({ mb: '5' })"
        >
          <MpFormLabel>Language</MpFormLabel>
          <div style="width: 320px">
            <MpAutocomplete
              id="select-language"
              v-model="language"
              :data="LANGUAGE_OPTIONS"
              label-prop="label"
              value-prop="value"
              is-searchable
              is-clearable
              is-group-suggestions
              placeholder="Select language"
              :content-attrs="{ style: 'width: 320px; max-height: 284px; overflow-y: auto;' }"
            >
              <template #group="{ group }">
                <div :class="css({ px: '3', pt: '4', pb: '1' })">
                  <MpText
                    size="body-small"
                    color="text.secondary"
                    :class="css({ letterSpacing: 'wide' })"
                  >
                    {{ group.key }}
                  </MpText>
                </div>
              </template>
            </MpAutocomplete>
          </div>
          <MpFormErrorMessage>Language is required</MpFormErrorMessage>
        </MpFormControl>
      </div>
    </div>

    <!-- ═════ Step 2: Content Editing ═════ -->
    <div v-else :class="css({ flex: 1, display: 'flex', overflow: 'hidden' })">
      <!-- Left: form panel -->
      <div :class="css({ flex: 1, overflowY: 'auto', px: '12', py: '8' })">
        <MpText size="h2" weight="semiBold" :class="css({ mb: '1' })"
          >Content editing - Campaign</MpText
        >
        <MpText color="text.secondary" :class="css({ mb: '1' })">
          Use combination of text, media and interactive message to engage with your customers.
        </MpText>
        <MpText color="text.secondary" :class="css({ mb: '6' })">
          <MpText as="span" weight="semiBold">Important:</MpText>
          Once submitted for approval, message template cannot be edited.
        </MpText>

        <!-- ── Media content ── -->
        <MpText size="h3" weight="semiBold" :class="css({ mb: '4' })">Media content</MpText>

        <MpFormControl id="fc-media-type" :class="css({ mb: '4' })">
          <MpFormLabel>Type</MpFormLabel>
          <div style="width: 260px">
            <MpSelect id="select-media-type" v-model="mediaType">
              <option value="none">None</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="document">Document</option>
            </MpSelect>
          </div>
        </MpFormControl>

        <div v-if="mediaType !== 'none'" :class="css({ mb: '2' })">
          <MpFormControl id="fc-media-file" is-required>
            <MpFormLabel>{{ mediaFileLabel }}</MpFormLabel>
            <MpUpload
              id="upload-media-file"
              :accept="mediaFileAccept"
              placeholder="No file chosen"
              button-text="Browse file"
              :class="css({ maxW: '400px' })"
              @change="handleFileChange"
              @clear="handleFileClear"
            />
            <MpFormHelpText>{{ mediaFileHelper }}</MpFormHelpText>
          </MpFormControl>

          <div :class="css({ mt: '5' })">
            <MpCheckbox
              id="cb-save-media"
              :is-checked="saveMediaSample"
              @change="saveMediaSample = $event"
            >
              Save media sample to use in campaign
            </MpCheckbox>
          </div>
        </div>

        <div :class="css({ borderTopWidth: '1px', borderColor: 'border.default', my: '6' })" />

        <!-- ── Body ── -->
        <MpText size="h3" weight="semiBold" :class="css({ mb: '4' })">Body</MpText>

        <MpFormControl id="fc-message" is-required :is-invalid="submitted && !messageBodyText">
          <MpFlex justifyContent="space-between" alignItems="center">
            <MpFormLabel>Message</MpFormLabel>
            <MpText size="body-small" color="text.secondary"
              >{{ messageBodyText.length }}/{{ MESSAGE_MAX_LENGTH }}</MpText
            >
          </MpFlex>

          <MpRichTextEditor
            id="rte-message"
            :value="messageBodyHtml"
            placeholder="Enter message"
            :maxlength="MESSAGE_MAX_LENGTH"
            :is-invalid="submitted && !messageBodyText"
            has-border
            :options="RTE_OPTIONS"
            @change="handleRteChange"
            @action="handleRteAction"
          />
          <MpFormErrorMessage>Message is required</MpFormErrorMessage>
        </MpFormControl>

        <!-- Variable sample inputs -->
        <div v-if="detectedVariables.length > 0" :class="css({ mt: '5' })">
          <MpText size="body-small" weight="semiBold" :class="css({ mb: '1' })"
            >Variable content sample*</MpText
          >
          <MpText size="body-small" color="text.secondary" :class="css({ mb: '3' })">
            Add sample content to define this variable. Make sure your recipient list file includes
            a column that matches the variable number you've added in the template.
            <MpText as="a" href="#" color="text.link" is-text-link :class="css({ ml: '1' })"
              >Learn about template variables</MpText
            >
          </MpText>
          <MpFlex
            v-for="n in detectedVariables"
            :key="n"
            alignItems="center"
            gap="3"
            :class="css({ mb: '2' })"
          >
            <div
              :class="
                css({
                  w: '52px',
                  flexShrink: 0,
                  bg: 'background.stage',
                  borderWidth: '1px',
                  borderColor: 'border.default',
                  borderRadius: 'md',
                  px: '2',
                  py: '1',
                  textAlign: 'center'
                })
              "
            >
              <MpText size="body-small" color="text.link">{{ varTag(n) }}</MpText>
            </div>
            <MpInput
              :id="`var-sample-${n}`"
              :model-value="variableSamples[n] ?? ''"
              :placeholder="`Sample value for variable ${n}`"
              @update:model-value="
                (v: string) => {
                  variableSamples[n] = v;
                }
              "
            />
          </MpFlex>
        </div>

        <div :class="css({ borderTopWidth: '1px', borderColor: 'border.default', my: '6' })" />

        <!-- ── Interactive action ── -->
        <MpText size="h3" weight="semiBold" :class="css({ mb: '4' })">Interactive action</MpText>

        <MpFormControl id="fc-action-type" :class="css({ mb: '4' })">
          <MpFormLabel>Action type</MpFormLabel>
          <div style="width: 260px">
            <MpSelect id="select-action-type" v-model="actionType" placeholder="Select action type">
              <option value="call_to_action">Call to action</option>
              <option value="quick_reply">Quick reply</option>
            </MpSelect>
          </div>
        </MpFormControl>
      </div>

      <!-- Right: Preview panel -->
      <div
        :class="
          css({
            w: '460px',
            flexShrink: 0,
            borderLeftWidth: '1px',
            borderColor: 'border.default',
            bg: 'background.stage',
            overflowY: 'auto',
            p: '6'
          })
        "
      >
        <MpText size="h3" weight="semiBold" :class="css({ mb: '1' })">Preview</MpText>
        <MpText size="body-small" color="text.secondary" :class="css({ mb: '5' })">
          See how your campaign will look like from your customer's side
        </MpText>

        <!-- WhatsApp-style chat bubble -->
        <div
          class="wa-bg"
          :class="
            css({
              borderRadius: 'lg',
              p: '4',
              minH: '320px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            })
          "
        >
          <div
            :class="
              css({
                bg: 'background.default',
                borderRadius: 'md',
                p: '3',
                maxW: '88%',
                boxShadow: 'sm'
              })
            "
          >
            <!-- Media placeholder / image preview -->
            <img
              v-if="previewImageUrl && mediaType === 'image'"
              :src="previewImageUrl"
              :class="css({ w: 'full', borderRadius: 'sm', mb: '2', display: 'block' })"
              alt="Preview"
            />
            <div
              v-else-if="mediaType !== 'none'"
              :class="
                css({
                  bg: 'background.stage',
                  borderRadius: 'sm',
                  mb: '2',
                  h: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                })
              "
            >
              <MpIcon name="image" size="lg" color="icon.secondary" />
            </div>

            <!-- Message text -->
            <MpText
              v-if="previewMessage"
              size="body-small"
              :class="css({ whiteSpace: 'pre-wrap', wordBreak: 'break-word' })"
              >{{ previewMessage }}</MpText
            >
            <MpText v-else size="body-small" color="text.placeholder">Enter message</MpText>

            <MpFlex justifyContent="flex-end" :class="css({ mt: '1' })">
              <span style="font-size: 11px; color: var(--mp-colors-text-secondary)">09:45</span>
            </MpFlex>
          </div>
        </div>
      </div>
    </div>

    <!-- ═════ Footer ═════ -->
    <footer
      :class="
        css({
          flexShrink: 0,
          borderTopWidth: '1px',
          borderColor: 'border.default',
          px: '6',
          h: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '3',
          bg: 'background.default'
        })
      "
    >
      <template v-if="step === 1">
        <MpButton variant="ghost" @click="handleCancel">Cancel</MpButton>
        <MpButton variant="primary" @click="handleContinue">Continue</MpButton>
      </template>
      <template v-else>
        <MpButton variant="ghost" @click="step = 1">Back</MpButton>
        <MpButton variant="secondary" @click="handleSaveDraft">Save as draft</MpButton>
        <MpButton variant="primary" :is-loading="isSubmitting" @click="handleSubmit"
          >Submit</MpButton
        >
      </template>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from "vue";
import {
  MpButton,
  MpFlex,
  MpText,
  MpIcon,
  MpFormControl,
  MpFormLabel,
  MpFormHelpText,
  MpFormErrorMessage,
  MpInput,
  MpUpload,
  MpAutocomplete,
  MpRichTextEditor,
  MpSelect,
  MpRadio,
  MpCheckbox,
  MpBadge,
  MpBanner,
  MpBannerIcon,
  MpBannerDescription,
  MpBannerLink,
  css
} from "@mekari/pixel3";

definePageMeta({ layout: false });

// ─── Copy constants ────────────────────────────────────────────────────────────
const HELP_LINK_SETUP = "Learn about template category";
const HELP_LINK_CONTENT = "Learn about interactive message";
const MESSAGE_MAX_LENGTH = 550;

// WhatsApp Business API supported languages
// Most-used (id → Indonesian, en_US → English (US), ms → Malaysian) appear first
// WhatsApp Business API supported languages, grouped for dropdown display
const LANGUAGE_OPTIONS = [
  { value: "id", label: "Indonesian", group: "MOST USED" },
  { value: "en_US", label: "English (US)", group: "MOST USED" },
  { value: "ms", label: "Malaysian", group: "MOST USED" },
  { value: "af", label: "Afrikaans", group: "ALL LANGUAGES" },
  { value: "sq", label: "Albanian", group: "ALL LANGUAGES" },
  { value: "ar", label: "Arabic", group: "ALL LANGUAGES" },
  { value: "az", label: "Azerbaijani", group: "ALL LANGUAGES" },
  { value: "bn", label: "Bengali", group: "ALL LANGUAGES" },
  { value: "bg", label: "Bulgarian", group: "ALL LANGUAGES" },
  { value: "ca", label: "Catalan", group: "ALL LANGUAGES" },
  { value: "zh_CN", label: "Chinese (CHN)", group: "ALL LANGUAGES" },
  { value: "zh_HK", label: "Chinese (HKG)", group: "ALL LANGUAGES" },
  { value: "zh_TW", label: "Chinese (TAI)", group: "ALL LANGUAGES" },
  { value: "hr", label: "Croatian", group: "ALL LANGUAGES" },
  { value: "cs", label: "Czech", group: "ALL LANGUAGES" },
  { value: "da", label: "Danish", group: "ALL LANGUAGES" },
  { value: "nl", label: "Dutch", group: "ALL LANGUAGES" },
  { value: "en", label: "English", group: "ALL LANGUAGES" },
  { value: "en_GB", label: "English (UK)", group: "ALL LANGUAGES" },
  { value: "et", label: "Estonian", group: "ALL LANGUAGES" },
  { value: "fi", label: "Finnish", group: "ALL LANGUAGES" },
  { value: "fr", label: "French", group: "ALL LANGUAGES" },
  { value: "ka", label: "Georgian", group: "ALL LANGUAGES" },
  { value: "de", label: "German", group: "ALL LANGUAGES" },
  { value: "el", label: "Greek", group: "ALL LANGUAGES" },
  { value: "gu", label: "Gujarati", group: "ALL LANGUAGES" },
  { value: "ha", label: "Hausa", group: "ALL LANGUAGES" },
  { value: "he", label: "Hebrew", group: "ALL LANGUAGES" },
  { value: "hi", label: "Hindi", group: "ALL LANGUAGES" },
  { value: "hu", label: "Hungarian", group: "ALL LANGUAGES" },
  { value: "ga", label: "Irish", group: "ALL LANGUAGES" },
  { value: "it", label: "Italian", group: "ALL LANGUAGES" },
  { value: "ja", label: "Japanese", group: "ALL LANGUAGES" },
  { value: "kn", label: "Kannada", group: "ALL LANGUAGES" },
  { value: "kk", label: "Kazakh", group: "ALL LANGUAGES" },
  { value: "rw_RW", label: "Kinyarwanda", group: "ALL LANGUAGES" },
  { value: "ko", label: "Korean", group: "ALL LANGUAGES" },
  { value: "ky_KG", label: "Kyrgyz (Kyrgyzstan)", group: "ALL LANGUAGES" },
  { value: "lo", label: "Lao", group: "ALL LANGUAGES" },
  { value: "lv", label: "Latvian", group: "ALL LANGUAGES" },
  { value: "lt", label: "Lithuanian", group: "ALL LANGUAGES" },
  { value: "mk", label: "Macedonian", group: "ALL LANGUAGES" },
  { value: "ml", label: "Malayalam", group: "ALL LANGUAGES" },
  { value: "mr", label: "Marathi", group: "ALL LANGUAGES" },
  { value: "nb", label: "Norwegian", group: "ALL LANGUAGES" },
  { value: "or", label: "Oriya", group: "ALL LANGUAGES" },
  { value: "fa", label: "Persian", group: "ALL LANGUAGES" },
  { value: "pl", label: "Polish", group: "ALL LANGUAGES" },
  { value: "pt_BR", label: "Portuguese (BR)", group: "ALL LANGUAGES" },
  { value: "pt_PT", label: "Portuguese (PT)", group: "ALL LANGUAGES" },
  { value: "pa", label: "Punjabi", group: "ALL LANGUAGES" },
  { value: "ro", label: "Romanian", group: "ALL LANGUAGES" },
  { value: "ru", label: "Russian", group: "ALL LANGUAGES" },
  { value: "sr", label: "Serbian", group: "ALL LANGUAGES" },
  { value: "sk", label: "Slovak", group: "ALL LANGUAGES" },
  { value: "sl", label: "Slovenian", group: "ALL LANGUAGES" },
  { value: "es", label: "Spanish", group: "ALL LANGUAGES" },
  { value: "es_AR", label: "Spanish (ARG)", group: "ALL LANGUAGES" },
  { value: "es_ES", label: "Spanish (Spain)", group: "ALL LANGUAGES" },
  { value: "es_MX", label: "Spanish (MEX)", group: "ALL LANGUAGES" },
  { value: "sw", label: "Swahili", group: "ALL LANGUAGES" },
  { value: "sv", label: "Swedish", group: "ALL LANGUAGES" },
  { value: "ta", label: "Tamil", group: "ALL LANGUAGES" },
  { value: "te", label: "Telugu", group: "ALL LANGUAGES" },
  { value: "th", label: "Thai", group: "ALL LANGUAGES" },
  { value: "tr", label: "Turkish", group: "ALL LANGUAGES" },
  { value: "uk", label: "Ukrainian", group: "ALL LANGUAGES" },
  { value: "ur", label: "Urdu", group: "ALL LANGUAGES" },
  { value: "uz", label: "Uzbek", group: "ALL LANGUAGES" },
  { value: "vi", label: "Vietnamese", group: "ALL LANGUAGES" },
  { value: "zu", label: "Zulu", group: "ALL LANGUAGES" }
];

// Rich text editor toolbar — matching Figma Body section
const RTE_OPTIONS = [
  ["bold", "italic", "strike"],
  ["bulletList", "orderedList"],
  ["clear"],
  [{ value: "variable", tooltip: "Add variable" }]
];

// ─── Wizard state ───────────────────────────────────────────────────────────────
const step = ref<1 | 2>(1);
const submitted = ref(false);
const isSubmitting = ref(false);

// ─── Step 1 fields ─────────────────────────────────────────────────────────────
const account = ref("");
const templateName = ref("");
const selectedType = ref("campaign");
const selectedCategory = ref("marketing");
const language = ref("");

// ─── Step 2 fields ─────────────────────────────────────────────────────────────
const mediaType = ref("none");
const previewImageUrl = ref<string | null>(null);
const saveMediaSample = ref(false);
const messageBodyHtml = ref("");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rteEditorInstance = ref<any>(null);
const variableSamples = reactive<Record<number, string>>({});
const actionType = ref("");

// ─── Computed ──────────────────────────────────────────────────────────────────
const mediaFileLabel = computed(
  () =>
    ({
      image: "Image content sample",
      video: "Video content sample",
      document: "Document content sample"
    })[mediaType.value] ?? "File content sample"
);

const mediaFileHelper = computed(
  () =>
    ({
      image: "JPG, JPEG, and PNG with a maximum of 5 MB",
      video: "MP4 with a maximum of 16 MB",
      document: "PDF with a maximum of 100 MB"
    })[mediaType.value] ?? ""
);

const mediaFileAccept = computed(
  () =>
    ({
      image: ".jpg,.jpeg,.png",
      video: ".mp4",
      document: ".pdf"
    })[mediaType.value] ?? "*"
);

// When Marketing opt-in is selected, only Marketing category is allowed
const isMarketingOptin = computed(() => selectedType.value === "marketing_optin");

watch(isMarketingOptin, (val) => {
  if (val && selectedCategory.value !== "marketing") {
    selectedCategory.value = "marketing";
  }
});

// When Follow-up is selected, Authentication category is not allowed
const isFollowup = computed(() => selectedType.value === "followup");

watch(isFollowup, (val) => {
  if (val && selectedCategory.value === "authentication") {
    selectedCategory.value = "marketing";
  }
});

// When Carousel is selected, only Marketing category is allowed
const isCarousel = computed(() => selectedType.value === "carousel");

watch(isCarousel, (val) => {
  if (val && selectedCategory.value !== "marketing") {
    selectedCategory.value = "marketing";
  }
});

// Plain text extracted from RTE HTML (used for char count, validation, variable detection, preview)
const messageBodyText = computed(() => {
  return messageBodyHtml.value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
});

const detectedVariables = computed(() => {
  const matches = [...messageBodyText.value.matchAll(/\{\{(\d+)\}\}/g)];
  const nums = [...new Set(matches.map((m) => parseInt(m[1])))];
  return nums.sort((a, b) => a - b);
});

const previewMessage = computed(() => {
  if (!messageBodyText.value) return "";
  let text = messageBodyText.value;
  detectedVariables.value.forEach((n) => {
    text = text.replaceAll(`{{${n}}}`, variableSamples[n] || `{{${n}}}`);
  });
  return text;
});

// ─── Handlers ──────────────────────────────────────────────────────────────────
function varTag(n: number): string {
  return `{{${n}}}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleRteChange(content: string, editor: any) {
  messageBodyHtml.value = content;
  rteEditorInstance.value = editor;
}

function handleRteAction(action: string) {
  if (action === "variable") {
    const existing = detectedVariables.value;
    let n = 1;
    while (existing.includes(n)) n++;
    rteEditorInstance.value?.chain().focus().insertContent(`{{${n}}}`).run();
  }
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;
  if (mediaType.value === "image") {
    previewImageUrl.value = URL.createObjectURL(file);
  }
}

function handleFileClear() {
  previewImageUrl.value = null;
}

function handleClose() {
  navigateTo("/campaigns/templates");
}

function handleCancel() {
  navigateTo("/campaigns/templates");
}

function handleContinue() {
  submitted.value = true;
  if (!account.value || !templateName.value || !language.value) return;
  submitted.value = false;
  step.value = 2;
}

function handleSaveDraft() {
  navigateTo("/campaigns/templates");
}

async function handleSubmit() {
  submitted.value = true;
  if (!messageBodyText.value) return;
  isSubmitting.value = true;
  await new Promise((r) => setTimeout(r, 1000));
  isSubmitting.value = false;
  navigateTo("/campaigns/templates");
}
</script>

<style scoped>
/* Stepper circle number labels */
.step-num {
  font-size: 11px;
  color: white;
  font-weight: 600;
  line-height: 1;
}
.step-num-inactive {
  font-size: 11px;
  color: var(--mp-colors-text-secondary);
  font-weight: 600;
  line-height: 1;
}

/* Remove MpTextarea's own border since it sits inside our custom wrapper */
.editor-wrapper :deep(.mp-textarea) {
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  outline: none !important;
}

/* WhatsApp chat background colour */
.wa-bg {
  background-color: #e5ddd5;
}
</style>
