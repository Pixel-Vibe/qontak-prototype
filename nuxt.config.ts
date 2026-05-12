// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@mekari/pixel3-nuxt"],

  // css: ["~/assets/css/pixel.css"],
  // postcss: {
  //   plugins: {
  //     "@mekari/pixel3-postcss": {}
  //   }
  // },

  // mekariPixel: {
  //   component: true,
  //   css: true,
  //   plugin: {
  //     hideVersion: false
  //   },
  //   postcss: {
  //     include: ["./app/**/*.{js,jsx,ts,tsx,vue}"]
  //   }
  // },

  vite: {
    optimizeDeps: {
      include: ["@mekari/pixel3"]
    }
  },

  // TODO: Remove this once the vite environment variable API is stable
  experimental: {
    viteEnvironmentApi: true
  }
});
