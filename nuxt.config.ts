import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  /**
   * @memo App work under frame
   * Nuxt DevTools: Failed to check parent window
   * SecurityError: Failed to read a named property '__NUXT_DEVTOOLS_DISABLE__' from 'Window'
   */
  devtools: { enabled: false },

  modules: [
    '@pinia/nuxt',
    '@bitrix24/b24ui-nuxt',
    // `@bitrix24/b24jssdk-nuxt`,
    '@nuxt/eslint'
  ],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  app: {
    baseURL: '/roboREST/'  // ← имя твоего репозитория
  },
nitro: {
    preset: 'static', // указываем, что хотим статику
    output: {
      publicDir: 'docs' // ← собирать в папку docs
    }
  },
  routeRules: {
    'element/**': { prerender: true }
  },
  compatibilityDate: '2025-07-16'
})