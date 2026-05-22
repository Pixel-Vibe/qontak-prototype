import { computed } from "vue";
import { useRoute } from "vue-router";
import { APP_MENU_GROUPS, APP_MENU_ITEMS, type AppMenuChild, type AppMenuItem } from "~/data/menu";

function isRouteActive(currentPath: string, itemRoute: string) {
  return itemRoute === "/"
    ? currentPath === "/"
    : currentPath === itemRoute || currentPath.startsWith(`${itemRoute}/`);
}

function getFirstChildRoute(item: AppMenuItem | AppMenuChild) {
  if ("submenu" in item && item.submenu?.items[0]) {
    return getFirstChildRoute(item.submenu.items[0]);
  }

  if (item.children?.[0]) return getFirstChildRoute(item.children[0]);

  return item.route;
}

function findDeepChild(items: AppMenuChild[], currentPath: string): AppMenuChild | null {
  for (const item of items) {
    if (item.children) {
      const childMatch = findDeepChild(item.children, currentPath);
      if (childMatch) return childMatch;
    }

    if (isRouteActive(currentPath, item.route)) return item;
  }

  return null;
}

export function useAppMenu() {
  const route = useRoute();

  const activeTopMenu = computed(
    () => APP_MENU_ITEMS.find((item) => isRouteActive(route.path, item.route)) ?? null
  );

  const activeSubmenu = computed(() => (activeTopMenu.value?.submenu ? activeTopMenu.value : null));

  const activeChildMenu = computed(() => {
    const items = activeSubmenu.value?.submenu?.items;
    if (!items) return null;

    return findDeepChild(items, route.path);
  });

  const activePageTitle = computed(() => {
    if (activeChildMenu.value) return activeChildMenu.value.label;
    return activeTopMenu.value?.label ?? "";
  });

  return {
    menuGroups: APP_MENU_GROUPS,
    menuItems: APP_MENU_ITEMS,
    activeTopMenu,
    activeSubmenu,
    activeChildMenu,
    activePageTitle,
    getFirstChildRoute,
    isRouteActive: (itemRoute: string) => isRouteActive(route.path, itemRoute)
  };
}
