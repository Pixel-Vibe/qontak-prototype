// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@mekari/pixel3-nuxt", "@nuxt/eslint"],

  vite: {
    optimizeDeps: {
      include: ["@mekari/pixel3"]
    }
  },

  // TODO: Remove this once this issue fixed https://github.com/nuxt/nuxt/issues/35033
  experimental: {
    viteEnvironmentApi: true
  }
});
