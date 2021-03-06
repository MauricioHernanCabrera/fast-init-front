import colors from "vuetify/es5/util/colors";
import config from "./config";

export default {
  env: config,

  server: {
    port: config.port
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - fast-init-rework",
    title: "fast-init-rework",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com"
      },
      {
        href:
          "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&family=Solway:wght@300;400;500;700;800&display=swap",
        rel: "stylesheet"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/scss/styles.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/repositories.js", // siempre primero

    "@/plugins/i18n.js",

    "@/plugins/vuelidate.js",

    "@/plugins/axios.js" // siempre ultimo
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "cookie-universal-nuxt"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: config.apiUrl
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en"
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],

    defaultAssets: {
      font: false
    },

    theme: {
      dark: false,
      themes: {
        dark: {
          primary: "#1867C0",
          secondary: "#FB8C00",
          success: "#4CAF50",
          warning: "#FB8C00",
          error: "#FF5252",
          info: "#5CBBF6",
          light: "#FFFFFF",
          dark: "#212121"
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
