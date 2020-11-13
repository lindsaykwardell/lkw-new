export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'lkw-new',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Lato|Rokkitt|Fira+Sans&display=swap',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/viewsonvue.server.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    [
      'nuxt-github-api',
      {
        token: process.env.GITHUB_API_TOKEN,
        graphQLQuery: `
          query {
            user(login:"lindsaykwardell"){
              name
              bio
              bioHTML
              isHireable
              location
              url
              avatarUrl
              repositories(first:6, orderBy:{
                field:UPDATED_AT, direction: DESC
              }){
                nodes{
                  name
                  url
                  description
                  isFork
                  licenseInfo{
                    name
                  }
                  primaryLanguage {
                    color
                    name
                  }
                }
              }
            }
          }
          `,
      },
    ],
  ],

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: {
      plugins: {
        autoprefixer: {},
        cssnano: {
          preset: 'default',
        },
        'postcss-nested': {},
      },
    },
  },
  static: {
    prefix: false,
  },
}
