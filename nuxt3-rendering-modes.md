Introduction to Nuxt3 and rendering modes

## Introduction

Nuxt is free and open source framework which helps us build performant full-stack web applications and websites with Vue.js. Nuxt is build on top of Vue.js, so it is also called a meta framework. Nuxt uses conventional style ditrectory structure to streamline repetitive tasks and allow developers to focus on pushing the features. The configuration file can be used to customize the default behaviors.

## Nuxt3 features:

1. File-based routing
Nuxt generated routes based on the vue files and folder structure within the `pages/` directory. For example, if we have file `pages/contact.vue`, it will generate corresponding route at `/contact`. It also supports dynamic route which can be defined in folder structure like `pages/product/[sku].vue`, which supports the route `/product/APPLE`, where `[sku].vue` SFC will have access to value `APPLE`.

1. Auto-imports
Components, composables and helper functions have their respective directories, which can be used across the project without importing them. This feature enhances the developer experience by removing the long list of imports. Nuxt also supports auto importing of [Vue.js APIs](https://vuejs.org/api). It can be configured to import third party packages using `nuxt.config` file. Auto import can also be disabled using `nuxt.config` 

1. Server-side rendering: Nuxt has built-in SSR support, without having to configure server. It has many benifits such as loading pages quickly, improved search engine optimization, caching and many more. We will talk more about other rendering methods later below.

1. Data-fetching utilities: Nuxt provides composables to handle SSR-compatible [data fetching](https://nuxt.com/docs/getting-started/data-fetching) as well as different strategies.

1. TypeScript support: Nuxt3 fully supports typescript

1. Modules: Nuxt provides a [module system](https://nuxt.com/modules) to extend the framework core and simplify integrations.

## Rendering Modes
The process of interpreting JavaScript code to convert Vue.js components to HTML elements is called rendering. This can happen both in browser and server. Nuxt supports below rendering modes which we will discuss more:

1. Universal Rendering (SSR + CSR)
This is the default rendering mode which provides better user experience, performance and optimize search engine indexing. Rendering mode can be switched by changing [ssr](https://nuxt.com/docs/api/nuxt-config#ssr) value in `nuxt.config` file.

In this mode, server returns fully rendered HTML page to the browser on request. Nuxt runs the Vue.js code in the server, which produces HTML content. Users get the content of web application which can be displayed in browser.

After the page is loaded from server, the browser loads the JS code to make contents interactive and dynamic. The browser again interprets the Vue.js code to enable interactivity. This process of making stating page interactive in browser is challed `Hydration`.

Universal rendering provides quick page load times while preserving the benefits of client-side rendering and also enhancing SEO as HTML content is aleready present for crawling.

Pros:
- Performance: Browsers display static content faster hence users can see the page content immediately. Nuxt also preserves the interactivity of web application using hydration.
- SEO: Web crawlers can index the page's content easily as universal rendering delivers the entire HTML content of the page to the browser.

Cons:
- Development constraints: Some of the APIs don't work both in browser and server side like `window` object, it can be time consuming to write the code that run on both sides. Nuxt does provide the guidelines and variable to help with this.
- Cost: Unlike hosting a static files, this requires running a server to generate the full HTML content. Using a server adds a cost.

2. Client-Side Rendering (CSR)
A traditional Vue.js application loads the Javascript code on the browser first then interprets the code to generate the HTML elements and interface.

Pros:
- Development speed: Writing client side only code improves development speed as we don't have to worry about supporting server side compatibility.
- Cheaper: The code can sun on simple web server just for hosting the files, the code runs on the browser so it can reduce the cost.
- Offline: The code only runs on browser, so the web application can keep working even if there is no internet. 

Cons:
- Performance: As browser has to download the files first then run JavaScript files to generate the HTML document. The process can be slow depending on the network speed for downloading files and user's device for executing the JS code. This can reduce the performance and impact user's experience.
- SEO: Crawlers takes more time indexing and updating the content delivered using client-side rendering. Based on above performance drawback, the crawlwer may not wait for the interface until the interface is fully rendered.

Client-side rendering is preferred choice for interactive heavy web applications such as SaaS, back-office applications that don't require indexing.

Enabling client-side only rendering with Nuxt can be done by updating `nuxt.config`
```typescript nuxt.config.ts
export default defineNuxtConfig({
  ssr: false
})
```

3. Hybrid Rendering

Hybrid rendering allows differnt caching rules per route with Route Rules which dictates the server response for each new request.

Before all the route/page of the application used same rendering mode either universal or client-side
4. Edge-Side Rendering