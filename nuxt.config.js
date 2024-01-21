export default defineNuxtConfig({
  app: {
    head: {
      title: "Nuxt App",
    },
  },
  css: [
    "primevue/resources/themes/lara-light-green/theme.css",
    "@/assets/main.css",
    "primeicons/primeicons.css",
    "~/assets/style.scss",
    "primeflex/primeflex.scss",
  ],
  modules: ['nuxt-primevue','@vueuse/nuxt',
  [
      
    "@pinia/nuxt",
    {
      autoImports: [
        "defineStore",

        ["defineStore", "definePiniaStore"],
      ],
    },
    

  ]],
  runtimeConfig: {
    public: {
      productBaseUrl: 'http://localhost:5191/api/Produits',
      categoriesBaseUrl: 'http://localhost:5191/api/Categories',
      clientBaseUrl: 'http://localhost:5191/api/Clients',
      factureBaseUrl: 'http://localhost:5191/api/Factures',
      ligneFactureBaseUrl: 'http://localhost:5191/api/LigneFacture',
      authBaseUrl: 'http://localhost:5191/api/Auth/'

    },
    
  },
  imports: {
    dirs: [
      "components/**/*",
      // ... or scan modules nested one level deep with a specific name and file extension
      'composables/*/index.{ts,js,mjs,mts}',
      // ... or scan all modules within given directory
      'composables/**',
      'store',
      'utils/**'

    ],

  },
  primevue: {
    options: {
      ripple: true
    },
    components: {
      include: '*'
    },
    directives: {
      include: '*'
  }
  }
});
