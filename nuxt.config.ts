// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', '@vueuse/nuxt'],
  css: ['@unocss/reset/tailwind.css', 'overlayscrollbars/styles/overlayscrollbars.css', '~/styles/vars.css', '~/styles/global.css', '~/styles/scrollbars.css'],

  postcss: {
    plugins: {
      'postcss-nested': {},
    },
  },
  imports: {
    presets: [{
      from: 'overlayscrollbars-vue',
      imports: ['useOverlayScrollbars'],
    }],
  },
})
