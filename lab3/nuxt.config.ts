// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@vesp/nuxt-fontawesome',
    '@pinia/nuxt'
  ],
  fontawesome: {
    icons: {
      solid: ['star', 'star-half', 'star-half-stroke', 'thumbs-up', 'chevron-right', 'chevron-left'],
      regular: ['star', 'star-half','star-half-stroke']
    }
  }
})