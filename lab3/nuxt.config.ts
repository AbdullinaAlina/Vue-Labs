// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@vesp/nuxt-fontawesome',
    '@pinia/nuxt',
    ['@nuxtjs/google-fonts', {
      families: {
        Roboto: true,
      }
    }]
    
  ],
  fontawesome: {
    icons: {
      solid: [
        'bars', 
        'user', 
        'star', 'star-half', 'star-half-stroke', 
        'thumbs-up', 
        'chevron-right', 'chevron-left',
        'heart',
        'comment',
        'arrow-down'
      ],
      regular: ['star', 'star-half','star-half-stroke']
    }
  },
  plugins: [{ src: '~/plugins/firebase.js', mode: 'client' }],

})