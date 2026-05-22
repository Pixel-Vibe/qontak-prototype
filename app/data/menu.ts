import type { IconName } from "@mekari/pixel3";

export interface AppMenuChild {
  id: string;
  label: string;
  route: string;
  query?: Record<string, string>;
  count?: string | number;
  newTab?: boolean;
  children?: AppMenuChild[];
}

export interface AppMenuItem {
  id: string;
  label: string;
  icon: IconName;
  route: string;
  badge?: boolean;
  isExternal?: boolean;
  submenu?: {
    title: string;
    items: AppMenuChild[];
  };
}

export type AppMenuGroup = AppMenuItem[];

export const APP_MENU_GROUPS: AppMenuGroup[] = [
  [
    { id: "home", icon: "home", label: "Home", route: "/" },
    {
      id: "inbox",
      icon: "inbox",
      label: "Inbox",
      route: "/inbox",
      submenu: {
        title: "Inbox",
        items: [
          {
            id: "all-chats",
            label: "All chats",
            route: "/inbox",
            query: { status: "all_chats" },
            count: "99+"
          },
          {
            id: "my-chats",
            label: "My chats",
            route: "/inbox",
            query: { status: "my_chats" },
            count: 4
          },
          {
            id: "unassigned",
            label: "Unassigned",
            route: "/inbox",
            query: { status: "unassigned" },
            count: 2
          },
          {
            id: "assigned",
            label: "Assigned",
            route: "/inbox",
            query: { status: "assigned" },
            count: 10
          },
          { id: "resolved", label: "Resolved", route: "/inbox", query: { status: "resolved" } }
        ]
      }
    },
    { id: "calls", icon: "phone", label: "Calls", route: "/calls", badge: true },
    {
      id: "campaigns",
      icon: "broadcast",
      label: "Campaigns",
      route: "/campaigns",
      submenu: {
        title: "Campaigns",
        items: [
          { id: "whatsapp", label: "WhatsApp", route: "/campaigns/whatsapp" },
          { id: "email", label: "Email", route: "/campaigns/email-basic" },
          { id: "recipient-list", label: "Recipient lists", route: "/campaigns/recipient-list" },
          { id: "templates", label: "Templates", route: "/campaigns/templates" }
        ]
      }
    },
    {
      id: "bot-automation",
      icon: "chatbot",
      label: "Bot & automation",
      route: "/bot-automation",
      submenu: {
        title: "Bot & Automation",
        items: [
          { id: "conversations", label: "Conversations", route: "/bot-automation/conversations" },
          { id: "ai-agents", label: "AI agents", route: "/bot-automation/ai-agents" },
          {
            id: "knowledge-base",
            label: "Knowledge Base",
            route: "/bot-automation/knowledge-base"
          },
          {
            id: "custom-instruction",
            label: "Custom instruction",
            route: "/bot-automation/custom-instruction"
          },
          { id: "settings", label: "Settings", route: "/bot-automation/settings", newTab: true }
        ]
      }
    }
  ],
  [
    {
      id: "customers",
      icon: "team",
      label: "Customers",
      route: "/customers",
      submenu: {
        title: "Customers",
        items: [
          { id: "all-customers", label: "All customers", route: "/customers/all-customers" },
          { id: "all-companies", label: "All companies", route: "/customers/all-companies" },
          { id: "assigned-to-me", label: "Assigned to me", route: "/customers/assigned-to-me" },
          { id: "owned-by-me", label: "Owned by me", route: "/customers/owned-by-me" }
        ]
      }
    },
    {
      id: "loyalty",
      icon: "talent-management",
      label: "Loyalty",
      route: "/loyalty",
      submenu: {
        title: "Loyalty",
        items: [
          {
            id: "members",
            label: "Members",
            route: "/loyalty/members",
            children: [
              { id: "member-list", label: "Member list", route: "/loyalty/members/member-list" },
              {
                id: "member-wallets",
                label: "Member wallets",
                route: "/loyalty/members/member-wallets"
              },
              {
                id: "member-tier-status",
                label: "Member tier status",
                route: "/loyalty/members/member-tier-status"
              }
            ]
          },
          {
            id: "points-rewards",
            label: "Points & rewards",
            route: "/loyalty/points-rewards",
            children: [
              {
                id: "points-activity",
                label: "Points activity",
                route: "/loyalty/points-rewards/points-activity"
              },
              {
                id: "reward-redemption",
                label: "Reward redemption",
                route: "/loyalty/points-rewards/reward-redemption"
              }
            ]
          }
        ]
      }
    },
    {
      id: "reports",
      icon: "reports",
      label: "Reports",
      route: "/reports",
      submenu: {
        title: "Reports",
        items: [
          { id: "general-reports", label: "General reports", route: "/reports/general-reports" },
          {
            id: "business-operations",
            label: "Business operations",
            route: "/reports/business-operations"
          },
          {
            id: "customer-insights",
            label: "Customer insights",
            route: "/reports/customer-insights"
          },
          {
            id: "agent-performance",
            label: "Agent performance",
            route: "/reports/agent-performance",
            children: [
              { id: "sla", label: "SLA", route: "/reports/agent-performance/sla" },
              {
                id: "performance",
                label: "Performance",
                route: "/reports/agent-performance/performance"
              },
              {
                id: "agent-scoring",
                label: "Agent scoring",
                route: "/reports/agent-performance/agent-scoring"
              }
            ]
          },
          { id: "ticketing-report", label: "Ticketing report", route: "/reports/ticketing-report" },
          { id: "bot-performance", label: "Bot performance", route: "/reports/bot-performance" },
          { id: "export", label: "Export", route: "/reports/export" }
        ]
      }
    }
  ],
  [
    {
      id: "deals",
      icon: "sales",
      label: "Deals",
      route: "/deals",
      submenu: {
        title: "Deals",
        items: [
          { id: "all-deals", label: "All deals", route: "/deals/all-deals" },
          {
            id: "need-my-approval",
            label: "Need my approval",
            route: "/deals/need-my-approval",
            count: 2
          }
        ]
      }
    },
    {
      id: "tickets",
      icon: "voucher",
      label: "Tickets",
      route: "/tickets",
      submenu: {
        title: "Tickets",
        items: [
          { id: "all-tickets", label: "All tickets", route: "/tickets/all-tickets" },
          {
            id: "assigned-to-my-team",
            label: "Assigned to my team",
            route: "/tickets/assigned-to-my-team"
          },
          { id: "assigned-to-me", label: "Assigned to me", route: "/tickets/assigned-to-me" },
          { id: "unassigned", label: "Unassigned", route: "/tickets/unassigned" },
          { id: "report-by-me", label: "Report by me", route: "/tickets/report-by-me" }
        ]
      }
    },
    { id: "tasks", icon: "competencies", label: "Tasks", route: "/tasks" }
  ],
  [
    { id: "commerce", icon: "shop", label: "Commerce", route: "/commerce", badge: true },
    {
      id: "resources",
      icon: "book",
      label: "Resources",
      route: "/resources",
      submenu: {
        title: "Resources",
        items: [
          { id: "ai-resources", label: "AI resources", route: "/resources/ai-resources" },
          { id: "knowledge-base", label: "Knowledge Base", route: "/resources/knowledge-base" }
        ]
      }
    },
    {
      id: "documents",
      icon: "doc",
      label: "Documents",
      route: "/documents",
      submenu: {
        title: "Documents",
        items: [
          { id: "documents-list", label: "Documents list", route: "/documents/documents-list" },
          { id: "templates", label: "Templates", route: "/documents/templates" },
          { id: "short-code", label: "Short code", route: "/documents/short-code" }
        ]
      }
    },
    { id: "products", icon: "products", label: "Products", route: "/products" },
    { id: "expenses", icon: "expenses", label: "Expenses", route: "/expenses" }
  ],
  [
    {
      id: "custom-solutions",
      icon: "officeless",
      label: "Custom solutions",
      route: "/custom-solutions",
      submenu: {
        title: "Custom solutions",
        items: [
          { id: "applications", label: "Applications", route: "/custom-solutions/applications" },
          { id: "workflows", label: "Workflows", route: "/custom-solutions/workflows" },
          { id: "reports", label: "Reports", route: "/custom-solutions/reports" }
        ]
      }
    }
  ],
  [
    { id: "subscription", icon: "transfer", label: "Subscription", route: "/subscription" },
    {
      id: "settings",
      icon: "settings",
      label: "Settings",
      route: "/settings",
      submenu: {
        title: "Settings",
        items: [
          {
            id: "account",
            label: "Account",
            route: "/settings/account",
            children: [
              { id: "users", label: "Users", route: "/settings/account/users" },
              {
                id: "company-setting",
                label: "Company setting",
                route: "/settings/account/company-setting"
              },
              { id: "roles", label: "Roles", route: "/settings/account/roles" },
              { id: "teams", label: "Teams", route: "/settings/account/teams" },
              { id: "security", label: "Security", route: "/settings/account/security" }
            ]
          },
          {
            id: "bot-automation",
            label: "Bot & automation",
            route: "/settings/bot-automation",
            children: [
              {
                id: "automated-actions",
                label: "Automated actions",
                route: "/settings/bot-automation/automated-actions"
              },
              {
                id: "bot-configuration",
                label: "Bot configuration",
                route: "/settings/bot-automation/bot-configuration"
              },
              {
                id: "whatsapp-auto-message",
                label: "WhatsApp auto-message",
                route: "/settings/bot-automation/whatsapp-auto-message"
              }
            ]
          }
        ]
      }
    }
  ]
];

export const APP_MENU_ITEMS = APP_MENU_GROUPS.flat();
