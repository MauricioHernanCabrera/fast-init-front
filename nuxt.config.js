import config from "./config";

const page = {
  title: "Fast Init",
  short_name: "Fast Init",
  description: "Inicia todos los programas que necesitas con un simple click",
  safeImg: {
    url: `${config.frontUrl}/images/safe_image.jpg`,
    alt: "Image of Fast Init"
  },
  favicon: `${config.frontUrl}/images/logo.ico`,
  author: `Mauricio Hernan Cabrera`
};

export default {
  env: config,

  server: {
    port: config.port
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: page.title,
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, user-scalable=no"
      },
      { hid: "author", name: "author", content: `${page.author}` },
      {
        hid: "description",
        name: "description",
        content: `${page.description}`
      },
      { hid: "twitter-card", name: "twitter:card", content: "summary" },
      { hid: "twitter-title", name: "twitter:title", content: `${page.title}` },
      {
        hid: "twitter-description",
        name: "twitter:description",
        content: `${page.description}`
      },

      {
        hid: "twitter-image",
        name: "twitter:image",
        content: `${page.safeImg.url}`
      },
      {
        hid: "twitter-image-alt",
        name: "twitter:image:alt",
        content: `${page.safeImg.alt}`
      },
      { hid: "og-type", property: "og:type", content: "website" },
      { hid: "og-title", property: "og:title", content: `${page.title}` },
      { hid: "og-image", property: "og:image", content: `${page.safeImg.url}` },
      {
        hid: "og-site_name",
        property: "og:site_name",
        content: `${page.title}`
      },
      {
        hid: "og-description",
        property: "og:description",
        content: `${page.description}`
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: page.favicon },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com"
      },
      {
        href:
          "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
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

    { src: "@/plugins/ga.js", mode: "client" },

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
  manifest: {
    name: page.title,
    short_name: page.short_name,
    lang: "es-AR",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#1976D2",
    theme_color: "#115293"
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
