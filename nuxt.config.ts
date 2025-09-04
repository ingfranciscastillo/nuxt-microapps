import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrlExchange: "",
    },
    private: {
      apiKeyExchange: "",
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