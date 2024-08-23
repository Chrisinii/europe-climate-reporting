// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@vesp/nuxt-fontawesome',
    ['nuxt-highcharts', {
      exporting: true,
      lang: {
        decimalPoint: ',',
        thousandsSep: '.'
      },
      accessibility: {
        enabled: true
      }
    }],
    ['nuxt-svgo', {
      autoImportPath: false,
      global: false
    }]
  ],
  fontawesome: {
    component: 'fa',
    icons: {
      solid: ['faMap', 'faChartSimple', 'faInfo', 'fa-arrow-left', 'fa-xmark', 'fa-angle-down', 'faCaretLeft', 'faCaretRight']
    }
  },
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' }
      ]
    }
  },
  supabase: {
    redirect: false
  }
})