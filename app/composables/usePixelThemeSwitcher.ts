import { computed, ref, nextTick } from "vue";
import { usePixelTheme } from "@mekari/pixel3";

// Simple localStorage-backed theme preference (no @vueuse/core needed)
const isAuto = ref(
  import.meta.client ? localStorage.getItem("pixel-auto-theme") === "true" : false
);

export function usePixelThemeSwitcher() {
  const { isDark, setDarkMode } = usePixelTheme();

  const isDarkMode = computed(() => isDark.value);
  const currentTheme = computed(() => {
    if (isAuto.value) return "auto";
    return isDark.value ? "dark" : "light";
  });

  async function toggleDarkMode(value: boolean) {
    if (isDark.value === value) return;

    const enableTransition =
      import.meta.client &&
      "startViewTransition" in document &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

    if (!enableTransition) {
      setDarkMode(value);
      return;
    }

    const x = window.innerWidth;
    const y = 0;
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px at ${x}px ${y}px)`
    ];

    // startViewTransition not yet in TS DOM types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (document as any).startViewTransition(async () => {
      setDarkMode(value);
      await nextTick();
    }).ready;

    document.documentElement.animate(
      { clipPath: isDark.value ? [...clipPath].reverse() : clipPath },
      {
        duration: 800,
        easing: "ease-in-out",
        pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`
      }
    );
  }

  async function setTheme(theme: "light" | "dark" | "auto") {
    isAuto.value = theme === "auto";
    if (import.meta.client) {
      localStorage.setItem("pixel-auto-theme", String(isAuto.value));
    }
    if (theme === "auto") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      await toggleDarkMode(prefersDark);
    } else {
      await toggleDarkMode(theme === "dark");
    }
  }

  return { isDarkMode, currentTheme, setTheme, toggleDarkMode };
}
