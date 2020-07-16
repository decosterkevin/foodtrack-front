require("dotenv").config();

export default {
  env: {
    baseUrl: process.env.BASE_URL || "http://localhost:8000/api"
  },
  dev: process.env.NODE_ENV !== "production",
  mode: "universal",
  /*
   ** Headers of the page
   */

  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    script: [
      {
        src:
          "https://pay.sandbox.datatrans.com/upp/payment/js/datatrans-2.0.0.js"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "//fonts.googleapis.com/css?family=Roboto:100,200,300,400,500,700,400italic|Material+Icons"
      },
      {
        rel: "stylesheet",
        href: "https://unpkg.com/leaflet@1.2.0/dist/leaflet.css"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: "~/components/layout/loading.vue",
  /*
   ** Global CSS
   */
  css: [
    "~/assets/css/transitions.css",
    "~/assets/css/main.css",
    { src: "vue-material/dist/vue-material.min.css", lang: "css" },
    "@fortawesome/fontawesome-svg-core/styles.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/vue-material" },
    "~/plugins/i18n.js",
    "~/plugins/default.js",
    { src: "~/plugins/leaflet", ssr: false },
    "~/plugins/fontawesome.js",
    "~/plugins/mixinCommonMethod"
  ],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    "bootstrap-vue/nuxt",
    "@nuxtjs/auth",
    "@nuxtjs/axios",
    "@nuxtjs/dotenv",
    "nuxt-leaflet",
    "@nuxtjs/toast"
  ],
  axios: {
    baseURL: process.env.BASE_URL + "/api"
  },
  toast: {
    position: "bottom-right",
    duration: "3000",
    iconPack: "fontawesome",
    action: [
      {
        text: "CLOSE",
        // icon : 'times-circle',
        onClick: (e, toastObject) => {
          toastObject.goAway(0);
        }
      }
    ]
    // register: [ // Register custom toasts
    //   {
    //     name: 'my-error',
    //     message: 'Oops...Something went wrong',
    //     options: {
    //       type: 'error'
    //     }
    //   }
    // ]
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: process.env.BASE_URL + "/api/authentication/login/",
            method: "post",
            propertyName: "token"
          },
          user: {
            url: process.env.BASE_URL + "/api/authentication/user",
            method: "get",
            propertyName: ""
          },
          logout: false
        }
      },
      facebook: {
        client_id: process.env.FACEBOOK_CLIENT_ID || "test",
        userinfo_endpoint:
          "https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday",
        scope: ["public_profile", "email", "user_birthday"]
      },
      google: {
        userinfo_endpoint: "https://www.googleapis.com/oauth2/v3/userinfo",
        client_id: process.env.GOOGLE_CLIENT_ID || "test"
      }
    }
  },
  router: {
    middleware: ["auth"]
  },
  /*
  /*
  ** Build configuration
  */
  build: {
    /*
     ** You can extend webpack config here
     */
    vendor: ["vue-material"],
    extend(config, { isDev }) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
