import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "MicroApps",
      htmlAttrs: {
        lang: "es",
      },
      meta: [
        {charset: "utf-8"},
        {name: "viewport", content: "width=device-width, initial-scale=1"},
      ]
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["@nuxt/eslint", "@nuxt/fonts", "@pinia/nuxt", "@nuxt/ui"],
})