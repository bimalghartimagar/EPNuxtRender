let itemsUrl = {}
import country from './assets/server/countries.json';
country.forEach(x => {
  if (x.name.common.toLowerCase().startsWith('a') 
    || x.name.common.toLowerCase().startsWith('b') 
    || x.name.common.toLowerCase().startsWith('c')
    || x.name.common.toLowerCase().startsWith('d')
    || x.name.common.toLowerCase().startsWith('e')
    || x.name.common.toLowerCase().startsWith('f')
    || x.name.common.toLowerCase().startsWith('g')
    || x.name.common.toLowerCase().startsWith('h')
    || x.name.common.toLowerCase().startsWith('i')
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
        'VirtualScroller'
      ]
    }
  },
  routeRules: {
    '/': { prerender: true },
    '/country': { ssr: false, prerender: false },
    '/university': { ssr: false, prerender: false },
    '/isr/country': { isr: true, prerender: false },
    '/isr/university': { isr: 60, prerender: false },
    '/swr/country': { swr: true, prerender: false },
    '/swr/university': { swr: 60, prerender: false },
    // '/prerender/country': { prerender: true },
    // '/prerender/university': { prerender: true },
    ...itemsUrl
  },
  nitro: {
    storage: {
      dataFileSystem: {
        driver: 'fs',
        base: 'assets/server/',
      },
    },
    prerender: {
      failOnError: false,
      crawlLinks: false,
      concurrency: 50
    },
    // logLevel: +999,
  },
  // logLevel: 'verbose',
  // debug: true
})
