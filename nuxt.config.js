require('dotenv').config()

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      {
        src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_PLACES_KEY}&libraries=places&language=en`,
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/styles.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/axios.client',
    '@/plugins/tiny-slider.client',
    '@/plugins/portal.client',
    '@/plugins/google-autocomplete.client',
    '@/plugins/datetime.client',
    '@/plugins/multiselect.client',
    '@/plugins/google-maps.client',
    '@/plugins/share.client',
    '@/plugins/toast.client',
    '@/plugins/chat-scroll.client',

    '@/plugins/filters',
  ],

  toast: {
    duration: 5000
  },

  env: {
    API_URL: process.env.API_URL,
    GOOGLE_PLACES_KEY: process.env.GOOGLE_PLACES_KEY,
    PUSHER_KEY: process.env.PUSHER_KEY,
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/auth',
    '@nuxtjs/moment',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    'nuxt-i18n'
  ],

  auth: {
    watchLoggedIn: true,
    plugins: [
      '@/plugins/laravel-echo.client',
    ],
    // rewriteRedirects: false,
    strategies: {
      password_grant: {
        _scheme: 'local',
        endpoints: {
          login: {
            url: 'token',
            method: 'post',
            propertyName: 'access_token'
          },
          user: {
            url: 'users',
            propertyName: 'data'
          }
        }
      },
      facebook: {
        _scheme: "~/auth/schemes/PassportSocialLogin.js",
        client_id: process.env.FACEBOOK_CLIENT_ID,
        provider: 'facebook',
        redirect_uri: process.env.FACEBOOK_REDIRECT,
        userinfo_endpoint: false
      },
      google: {
        _scheme: "~/auth/schemes/PassportSocialLogin.js",
        client_id: process.env.GOOGLE_CLIENT_ID,
        provider: 'google',
        redirect_uri: process.env.GOOGLE_REDIRECT,
        userinfo_endpoint: false
      },
    }
  },

  i18n: {
    locales: [
      {
        name: 'English',
        code: 'en',
        file: 'en-US.js'
      },
      {
        code: 'fr',
        file: 'fr-FR.js'
      }
    ],
    strategy: 'no_prefix',
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
    }
  },

  router: {
    middleware: ['force-guide']
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.API_URL,
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },

  serverMiddleware: [
    // API middleware
    '~/api/index.js'
  ]
}
