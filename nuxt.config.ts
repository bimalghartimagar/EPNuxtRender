let itemsUrl = {}
import country from './server/assets/countries.json';
country.forEach(x => {
  if (
    // Prerending is not working for all data
    // gets stuck on the middle without any error
    // so just building routes for countries that
    // start with a to m
    x.name.common.toLowerCase().startsWith('a') 
    || x.name.common.toLowerCase().startsWith('b') 
    || x.name.common.toLowerCase().startsWith('c')
    || x.name.common.toLowerCase().startsWith('d')
    || x.name.common.toLowerCase().startsWith('e')
    || x.name.common.toLowerCase().startsWith('f')
    || x.name.common.toLowerCase().startsWith('g')
    || x.name.common.toLowerCase().startsWith('h')
    || x.name.common.toLowerCase().startsWith('i')
    || x.name.common.toLowerCase().startsWith('j')
    || x.name.common.toLowerCase().startsWith('k')
    || x.name.common.toLowerCase().startsWith('l')
    || x.name.common.toLowerCase().startsWith('m')
  ) {
    let key = `/country/${x.name.common}`;
    let isrKey = `/isr/country/${x.name.common}`;
    let swrKey = `/swr/country/${x.name.common}`;
    let prerenderKey = `/prerender/country/${x.name.common}`;
    itemsUrl = {
      ...itemsUrl,
      [key]: { ssr: false },
      [isrKey]: { isr: true },
      [swrKey]: { swr: true },
      [prerenderKey]: { prerender: true },
    }
  }
})


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
  },
  modules: [
    'nuxt-primevue',
    'nuxt-icon'
  ],
  primevue: {
    components: {
      include: [
        'Menubar',
        'InputText',
        'Avatar',
        'Icon',
        'Button',
        'DataTable',
        'Card',
        'VirtualScroller',
        'Paginator'
      ]
    }
  },
  routeRules: {
    '/': { prerender: true },
    '/country': { ssr: false },
    '/university': { ssr: false },
    '/isr/country': { isr: true },
    '/isr/university': { isr: 120 },
    '/swr/country': { swr: true },
    '/swr/university': { swr: 120 },
    '/prerender/country': { prerender: true },
    '/prerender/university': { prerender: true },
    ...itemsUrl
  },
  nitro: {
    preset: 'vercel-edge',
    prerender: {
      failOnError: false,
      crawlLinks: false,
      concurrency: 50
    },
    // logLevel: +999,
  },
  // logLevel: 'verbose',
  // debug: true
  runtimeConfig:{
    region: process.env.VERCEL_REGION
  }
})
