import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrlExchange: process.env.NUXT_PUBLIC_API_URL_EXCHANGE,
    },
    private: {
      apiKeyExchange: process.env.NUXT_PRIVATE_API_KEY_EXCHANGE,
    }
  },
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
  routeRules: {
    "/api/": {cache: {maxAge: 60 * 60}} // 1 hour
  },
  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["@nuxt/eslint", "@nuxt/fonts", "@pinia/nuxt", "@nuxt/ui"],
})