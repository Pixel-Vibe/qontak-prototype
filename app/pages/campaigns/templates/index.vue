<!--
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Mekari Qontak — Campaign > WhatsApp > Templates
  Source: Figma 5E00CpqLOYCKxiar9vSW9j / node 6132:21406
  Token mode: Pixel 2.4
  Patterns used: index-view, filter, bulk-select
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  STATES INCLUDED:
    - Happy path: 10-row data table
    - Empty state: title "No templates yet" + helper + CTA
    - Loading: 5 skeleton rows

  COPY DEFAULTS (from Figma — iterate freely):
    - Section description links to WhatsApp template builder docs
    - Action menu items: Edit, Duplicate, Delete (assumed — confirm with product)
    - Quality dot colours map: High=completed, Medium=warning, Low=critical, Neutral=announcement

  CONVENTION OVERRIDES applied:
    - Action button: secondary variant (Figma outline-weight matched)
    - Quality column: badge dot + text (density convention over plain text)
    - No icon on "Create template" button (label already communicates action)

  OPEN ITEMS for product/design follow-up:
    - Confirm Action menu items per row
    - Wire filters and search to real API
    - Confirm Quality badge colour mapping with design
-->
<template>
  <!-- ═════ Layout shell ═════ -->
  <main
    data-pixel-component="PixelContent"
    style="padding-top: var(--pixel-navbar-height); min-height: 100svh; width: 100%"
  >
    <!-- ═════ Page header ═════ -->
    <MpFlex
      justifyContent="space-between"
      alignItems="center"
      px="6"
      :class="css({ h: '72px', flexShrink: 0 })"
    >
      <MpText size="h1" weight="semiBold">{{ PAGE_TITLE }}</MpText>
      <MpButton variant="primary" @click="handleCreateTemplate">
        {{ CTA_CREATE }}
      </MpButton>
    </MpFlex>

    <!-- ═════ Tabs ═════ -->
    <MpTabs id="templates-tabs" v-model="activeTab" is-manual :is-show-border="false">
      <MpTabList :class="css({ px: '6', pb: '0' })">
        <MpTab>{{ TAB_WHATSAPP }}</MpTab>
        <MpTab>{{ TAB_EMAIL }}</MpTab>
      </MpTabList>

      <MpTabPanels>
        <!-- ═════ WhatsApp tab panel ═════ -->
        <MpTabPanel>
          <div
            :class="
              css({
                bg: 'background.stage',
                borderTopWidth: '1px',
                borderLeftWidth: '1px',
                borderColor: 'border.default',
                roundedTopLeft: 'md',
                p: '6',
                minH: '100svh',
                display: 'flex',
                flexDirection: 'column',
                gap: '6'
              })
            "
          >
            <!-- ═════ Section header ═════ -->
            <div>
              <MpText size="h2" weight="semiBold" :class="css({ mb: '1' })">
                {{ SECTION_TITLE }}
              </MpText>
              <MpText color="text.secondary">
                {{ SECTION_DESCRIPTION }}
                <MpButton variant="textLink" as="a" href="#" target="_blank">Learn more</MpButton>
              </MpText>
            </div>

            <!-- ═════ Filter toolbar ═════ -->
            <MpFlex justifyContent="space-between" alignItems="center" gap="3" wrap="wrap">
              <MpFlex gap="3" alignItems="center">
                <MpSelect
                  id="filter-type"
                  v-model="filterType"
                  :class="css({ w: '160px' })"
                  placeholder="All types"
                >
                  <option value="">All types</option>
                  <option value="campaign">Campaign</option>
                  <option value="utility">Utility</option>
                  <option value="follow_up">Follow up</option>
                </MpSelect>

                <MpSelect
                  id="filter-category"
                  v-model="filterCategory"
                  :class="css({ w: '160px' })"
                  placeholder="All categories"
                >
                  <option value="">All categories</option>
                  <option value="marketing">Marketing</option>
                  <option value="authentication">Authentication</option>
                  <option value="utility">Utility</option>
                </MpSelect>

                <MpSelect
                  id="filter-status"
                  v-model="filterStatus"
                  :class="css({ w: '160px' })"
                  placeholder="All status"
                >
                  <option value="">All status</option>
                  <option value="approved">Approved</option>
                  <option value="in_review">In-review</option>
                  <option value="rejected">Rejected</option>
                  <option value="draft">Draft</option>
                  <option value="disabled">Disabled</option>
                </MpSelect>
              </MpFlex>

              <MpInputGroup id="search-template" size="md" :class="css({ w: '240px' })">
                <MpInputLeftAddon id="search-template-icon">
                  <MpIcon name="search" size="sm" />
                </MpInputLeftAddon>
                <MpInput
                  id="search-template-input"
                  v-model="searchQuery"
                  :placeholder="PLACEHOLDER_SEARCH"
                  is-clearable
                />
              </MpInputGroup>
            </MpFlex>

            <!-- ═════ Data table ═════ -->
            <MpTableContainer has-shadow :class="css({ w: 'full' })">
              <MpTable>
                <MpTableHead is-fixed>
                  <MpTableRow>
                    <!-- Fixed left: Template name -->
                    <MpTableCell
                      scope="col"
                      :class="css({ minW: '280px' })"
                    >
                      <MpFlex alignItems="center" gap="3">
                        <MpCheckbox
                          id="select-all"
                          :model-value="isAllSelected ? ['all'] : []"
                          value="all"
                          @update:model-value="(val: string[]) => toggleSelectAll(val.includes('all'))"
                        />
                        Template name
                      </MpFlex>
                    </MpTableCell>

                    <MpTableCell scope="col" :class="css({ minW: '120px' })">Type</MpTableCell>
                    <MpTableCell scope="col" :class="css({ minW: '120px' })">Category</MpTableCell>
                    <MpTableCell scope="col" :class="css({ minW: '140px' })">Status</MpTableCell>
                    <MpTableCell scope="col" :class="css({ minW: '140px' })">
                      <MpFlex alignItems="center" gap="1">
                        Quality
                        <MpIcon name="information" size="sm" />
                      </MpFlex>
                    </MpTableCell>
                    <MpTableCell scope="col" :class="css({ minW: '100px' })">Language</MpTableCell>

                    <!-- Fixed right: Action -->
                    <MpTableCell
                      scope="col"
                      is-fixed
                      :class="css({ boxShadow: borderFixedLeft })"
                    />
                  </MpTableRow>
                </MpTableHead>

                <!-- ═════ Loading state ═════ -->
                <MpTableBody v-if="isLoading">
                  <MpTableRow v-for="n in 5" :key="`skeleton-${n}`">
                    <MpTableCell
                      as="td"
                      :class="css({ minW: '280px' })"
                    >
                      <div :class="css({ h: '16px', w: '160px', bg: 'background.surface', rounded: 'sm' })" />
                    </MpTableCell>
                    <MpTableCell as="td" v-for="col in 5" :key="`sk-col-${col}`">
                      <div :class="css({ h: '16px', w: '80px', bg: 'background.surface', rounded: 'sm' })" />
                    </MpTableCell>
                    <MpTableCell
                      as="td"
                      is-fixed
                      :class="css({ boxShadow: borderFixedLeft })"
                    >
                      <div :class="css({ h: '32px', w: '90px', bg: 'background.surface', rounded: 'md' })" />
                    </MpTableCell>
                  </MpTableRow>
                </MpTableBody>

                <!-- ═════ Empty state ═════ -->
                <MpTableBody v-else-if="filteredTemplates.length === 0">
                  <MpTableRow>
                    <MpTableCell as="td" colspan="7">
                      <MpFlex
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        gap="3"
                        :class="css({ py: '16', textAlign: 'center' })"
                      >
                        <MpText weight="semiBold" size="lg">{{ EMPTY_TITLE }}</MpText>
                        <MpText color="text.secondary">{{ EMPTY_HELPER }}</MpText>
                        <MpButton variant="primary" @click="handleCreateTemplate">
                          {{ CTA_CREATE }}
                        </MpButton>
                      </MpFlex>
                    </MpTableCell>
                  </MpTableRow>
                </MpTableBody>

                <!-- ═════ Happy path rows ═════ -->
                <MpTableBody v-else>
                  <MpTableRow v-for="template in filteredTemplates" :key="template.id">
                    <!-- Template name -->
                    <MpTableCell
                      as="td"
                      :class="css({ minW: '280px' })"
                    >
                      <MpFlex alignItems="center" gap="3">
                        <MpCheckbox
                          :id="`select-${template.id}`"
                          v-model="selectedIds"
                          :value="template.id"
                        />
                        <MpButton variant="textLink" :class="css({ fontWeight: 'normal' })">
                          {{ template.name }}
                        </MpButton>
                      </MpFlex>
                    </MpTableCell>

                    <MpTableCell as="td">{{ template.type }}</MpTableCell>
                    <MpTableCell as="td">{{ template.category }}</MpTableCell>

                    <!-- Status badge -->
                    <MpTableCell as="td">
                      <MpBadge for="tableStatus" :type="statusBadgeType(template.status)">
                        {{ template.status }}
                      </MpBadge>
                    </MpTableCell>

                    <!-- Quality -->
                    <MpTableCell as="td">
                      <MpFlex alignItems="center" gap="2">
                        <MpBadge for="indicator" :type="qualityBadgeType(template.quality)" />
                        {{ template.quality }}
                      </MpFlex>
                    </MpTableCell>

                    <MpTableCell as="td">{{ template.language }}</MpTableCell>

                    <!-- Action dropdown (fixed right) -->
                    <MpTableCell
                      as="td"
                      is-fixed
                      :class="css({ boxShadow: borderFixedLeft })"
                    >
                      <MpPopover
                        :id="`action-${template.id}`"
                        placement="bottom-end"
                        is-close-on-select
                        use-portal
                      >
                        <MpPopoverTrigger>
                          <MpButton variant="secondary" right-icon="chevrons-down">
                            Action
                          </MpButton>
                        </MpPopoverTrigger>
                        <MpPopoverContent>
                          <MpPopoverList>
                            <MpPopoverListItem @click="handleEdit(template)">View details</MpPopoverListItem>
                            <MpPopoverListItem :class="css({ color: 'text.danger' })" @click="handleDelete(template)">Delete</MpPopoverListItem>
                          </MpPopoverList>
                        </MpPopoverContent>
                      </MpPopover>
                    </MpTableCell>
                  </MpTableRow>
                </MpTableBody>
              </MpTable>
            </MpTableContainer>

            <!-- ═════ Pagination ═════ -->
            <MpFlex
              justifyContent="space-between"
              alignItems="center"
              :class="css({ px: '2', py: '4' })"
            >
              <!-- Left: rows per page + count -->
              <MpFlex alignItems="center" gap="6">
                <MpFlex alignItems="center" gap="3">
                  <MpText color="text.secondary" size="sm">Rows per page</MpText>
                  <MpSelect
                    id="rows-per-page"
                    v-model="rowsPerPage"
                    size="sm"
                    :class="css({ w: '80px' })"
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </MpSelect>
                </MpFlex>
                <MpText color="text.secondary" size="sm">
                  Showing {{ paginationRange }} of {{ TOTAL_RECORDS }}
                </MpText>
              </MpFlex>

              <!-- Right: page selector + prev/next -->
              <MpFlex alignItems="center" gap="3">
                <MpFlex alignItems="center" gap="2">
                  <MpSelect
                    id="page-selector"
                    v-model="currentPage"
                    size="sm"
                    :class="css({ w: '80px' })"
                  >
                    <option v-for="p in totalPages" :key="p" :value="p">{{ p }}</option>
                  </MpSelect>
                  <MpText color="text.secondary" size="sm">of {{ totalPages }} pages</MpText>
                </MpFlex>
                <MpFlex gap="2">
                  <MpButton
                    variant="ghost"
                    left-icon="chevrons-left"
                    aria-label="First page"
                    :is-disabled="currentPage <= 1"
                    @click="currentPage = 1"
                  />
                  <MpButton
                    variant="ghost"
                    left-icon="chevrons-right"
                    aria-label="Last page"
                    :is-disabled="currentPage >= totalPages"
                    @click="currentPage = totalPages"
                  />
                </MpFlex>
              </MpFlex>
            </MpFlex>
          </div>
        </MpTabPanel>

        <!-- ═════ Email tab panel ═════ -->
        <MpTabPanel>
          <div
            :class="
              css({
                bg: 'background.stage',
                borderTopWidth: '1px',
                borderLeftWidth: '1px',
                borderColor: 'border.default',
                roundedTopLeft: 'md',
                p: '6',
                minH: '100svh'
              })
            "
          >
            <MpText color="text.secondary">Email templates — coming soon.</MpText>
          </div>
        </MpTabPanel>
      </MpTabPanels>
    </MpTabs>
  </main>

  <!-- ═════ Create template drawer ═════ -->
  <CampaignsCreateTemplateDrawer
    :is-open="isDrawerOpen"
    @close="isDrawerOpen = false"
    @select="handleDrawerSelect"
  />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import CampaignsCreateTemplateDrawer from "~/components/campaigns/CreateTemplateDrawer.vue";
import {
  MpButton,
  MpFlex,
  MpText,
  MpIcon,
  MpTabs,
  MpTabList,
  MpTab,
  MpTabPanels,
  MpTabPanel,
  MpSelect,
  MpInput,
  MpInputGroup,
  MpInputLeftAddon,
  MpCheckbox,
  MpBadge,
  MpTable,
  MpTableHead,
  MpTableBody,
  MpTableRow,
  MpTableCell,
  MpTableContainer,
  MpPopover,
  MpPopoverTrigger,
  MpPopoverContent,
  MpPopoverList,
  MpPopoverListItem,
  css,
} from "@mekari/pixel3";

// ─── Copy constants ────────────────────────────────────────────────────────────
const PAGE_TITLE = "Templates";
const CTA_CREATE = "Create template";
const TAB_WHATSAPP = "WhatsApp";
const TAB_EMAIL = "Email";
const SECTION_TITLE = "WhatsApp template";
const SECTION_DESCRIPTION =
  "Create template to send campaign and follow up messages to your customers.";
const PLACEHOLDER_SEARCH = "Search template name";
const EMPTY_TITLE = "No templates yet";
const EMPTY_HELPER =
  "Create your first WhatsApp template to start sending campaigns.";
const TOTAL_RECORDS = 242;

// ─── Token: sticky-column borders (Pixel 2.4) ────────────────────────────────
const borderFixedRight = "inset -2px 0px var(--mp-colors-border-default)";
const borderFixedLeft = "inset 2px 0px var(--mp-colors-border-default)";

// ─── State ─────────────────────────────────────────────────────────────────────
const isDrawerOpen = ref(false);
const activeTab = ref(0);
const isLoading = ref(false);
const searchQuery = ref("");
const filterType = ref("");
const filterCategory = ref("");
const filterStatus = ref("");
const selectedIds = ref<(number | string)[]>([]);
const rowsPerPage = ref("10");
const currentPage = ref(1);

// ─── Types ─────────────────────────────────────────────────────────────────────
type BadgeType = "completed" | "warning" | "critical" | "announcement" | "information";

interface Template {
  id: number;
  name: string;
  type: string;
  category: string;
  status: string;
  quality: string;
  language: string;
}

// ─── Sample data ───────────────────────────────────────────────────────────────
const templates = ref<Template[]>([
  { id: 1, name: "promo_diskon_september",    type: "Campaign",  category: "Marketing", status: "In-review", quality: "Neutral", language: "BI" },
  { id: 2, name: "promo_tanggal_kembar",      type: "Campaign",  category: "Marketing", status: "Approved",  quality: "Neutral", language: "BI" },
  { id: 3, name: "faq_update",                type: "Utility",   category: "Marketing", status: "Rejected",  quality: "Neutral", language: "BI" },
  { id: 4, name: "payment_reminder",          type: "Follow up", category: "Marketing", status: "Approved",  quality: "High",    language: "EN" },
  { id: 5, name: "anniversary_discount_promo",type: "Campaign",  category: "Marketing", status: "Disabled",  quality: "Neutral", language: "BI" },
  { id: 6, name: "flash_sale_campaign",       type: "Campaign",  category: "Marketing", status: "Approved",  quality: "Neutral", language: "BI" },
  { id: 7, name: "holiday_special_offer",     type: "Follow up", category: "Marketing", status: "Draft",     quality: "Neutral", language: "BI" },
  { id: 8, name: "customer_survey_incentive", type: "Campaign",  category: "Marketing", status: "Approved",  quality: "Medium",  language: "BI" },
  { id: 9, name: "birthday_flash_sale",       type: "Utility",   category: "Marketing", status: "Approved",  quality: "Low",     language: "BI" },
  { id: 10, name: "deleted_item_cart_sale",   type: "Campaign",  category: "Marketing", status: "Approved",  quality: "Neutral", language: "BI" },
]);

// ─── Derived ───────────────────────────────────────────────────────────────────
const filteredTemplates = computed(() => {
  return templates.value.filter((t) => {
    const matchSearch = searchQuery.value
      ? t.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      : true;
    const matchType = filterType.value ? t.type.toLowerCase().replace(" ", "_") === filterType.value : true;
    const matchCategory = filterCategory.value ? t.category.toLowerCase() === filterCategory.value : true;
    const matchStatus = filterStatus.value ? t.status.toLowerCase().replace("-", "_") === filterStatus.value : true;
    return matchSearch && matchType && matchCategory && matchStatus;
  });
});

const totalPages = computed(() =>
  Math.ceil(TOTAL_RECORDS / Number(rowsPerPage.value))
);

const paginationRange = computed(() => {
  const per = Number(rowsPerPage.value);
  const start = (currentPage.value - 1) * per + 1;
  const end = Math.min(currentPage.value * per, TOTAL_RECORDS);
  return `${start}–${end}`;
});

const isAllSelected = computed(
  () =>
    filteredTemplates.value.length > 0 &&
    filteredTemplates.value.every((t) => selectedIds.value.includes(t.id as never))
);

// ─── Helpers ───────────────────────────────────────────────────────────────────
function statusBadgeType(status: string): BadgeType {
  const map: Record<string, BadgeType> = {
    Approved: "completed",
    "In-review": "warning",
    Rejected: "critical",
    Disabled: "announcement",
    Draft: "information",
  };
  return map[status] ?? "information";
}

function qualityBadgeType(quality: string): BadgeType {
  const map: Record<string, BadgeType> = {
    High: "completed",
    Medium: "warning",
    Low: "critical",
    Neutral: "announcement",
  };
  return map[quality] ?? "announcement";
}

// ─── Actions ───────────────────────────────────────────────────────────────────
function toggleSelectAll(value: boolean) {
  selectedIds.value = value ? filteredTemplates.value.map((t) => t.id) : [];
}

function handleCreateTemplate() {
  isDrawerOpen.value = true
}

function handleDrawerSelect(_value: string) {
  isDrawerOpen.value = false
  navigateTo('/campaigns/templates/create')
}

function handleEdit(template: Template) {
  // TODO: navigate to edit form
  console.log("edit", template.name);
}

function handleDuplicate(template: Template) {
  // TODO: duplicate via API then refresh
  console.log("duplicate", template.name);
}

function handleDelete(template: Template) {
  // TODO: confirmation modal then DELETE API call
  console.log("delete", template.name);
}
</script>

<style scoped>
/* Remove Pixel's built-in 24px gap below the tab list */
:deep(.mp-tab-list__list) {
  margin-bottom: 0 !important;
}
</style>
