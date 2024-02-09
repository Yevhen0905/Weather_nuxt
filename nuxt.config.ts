// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: {enabled: true},
  modules: ['@nuxtjs/color-mode'],
  css: ['~/assets/scss/main.scss'],
  app: {
    head: {
      title: 'Weather Forecast',
      // link: [{ rel: "icon", type: "image/svg+xml", href: "/travel-svgrepo-com.svg"}],
      link: [
        {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
        {rel: 'preconnect', href: 'https://fonts.gstatic.com'},
        {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap'}
      ]
    },
    baseURL: '/Weather_nuxt/'
  }
});
