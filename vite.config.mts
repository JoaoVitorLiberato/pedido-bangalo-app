// Plugins
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Fonts from 'unplugin-fonts/vite'
import Layouts from 'vite-plugin-vue-layouts-next'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import Sitemap from 'vite-plugin-sitemap'
import { vitePluginVersionMark } from 'vite-plugin-version-mark'
import { FeedBuilder } from '@xcommerceweb/google-merchant-feed'

// Utilities
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import URLS from './public/data/sitemap/urls.json'
import CONTROLE_PORTIFOLIO from './src/data/planos/ControlePortifolioEsim.json'
import { formatedPrice } from './src/helpers/formatedPrice'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env = { ...process.env, ...env }

  const VERSION_MARK_CONFIG = {
    ifGitSHA: false,
    ifShortSHA: false,
    ifMeta: false,
    ifLog: false,
    ifExport: true,
    ifGlobal: true,
  }

  return {
    plugins: [
      Sitemap({
        hostname: env.VITE_APP_WEB_LINK,
        dynamicRoutes: (() => {
          const SITEMAP_URLS = []

          for (const url of Object.values(URLS)) {
            SITEMAP_URLS.push(url as string);
          }

          return SITEMAP_URLS;
        })(),
      }),

      vitePluginVersionMark({
        name: env.VITE_APP_WEB_TITLE,
        outputFile: () => ({
          path: 'googlemerchant.xml',
          content: (() => {
            const feedBuilder = new FeedBuilder();
            // https://github.com/xcommerceweb/google-merchant-feed
            feedBuilder.withTitle(env.VITE_APP_WEB_TITLE)
            feedBuilder.withLink(env.VITE_APP_WEB_LINK)
            feedBuilder.withDescription(env.VITE_APP_WEB_DESCRIPTION)

            for (const {
              sku,
              name,
              description,
              price,
            } of Object.values(CONTROLE_PORTIFOLIO)) {
              feedBuilder.withProduct({
                id: sku,
                title: name,
                description: description.rodape,
                link: env.VITE_APP_WEB_LINK,
                // imageLink: images[0],
                // additionalImageLinks: [images[1]],
                condition: 'new',
                availability: 'in_stock',
                price: {
                  currency: 'BRL',
                  value: Number(formatedPrice((price as { fidelity: number }).fidelity, 'float')),
                },
                // https://www.google.com/basepages/producttype/taxonomy-with-ids.pt-BR.txt
                googleProductCategory: '491',
                productType: 'Página inicial > Produtos de comida japonesa',
                taxCategory: 'Planos TIM eSIM',
                customLabels: ['Sushi', 'Comida japonesa', 'Comida japonesa com qualidade', 'Bangalo Sushi', 'Bangalô Sushi Lounge'],
                identifierExists: 'no',
                brand: 'bangalosushilounge',
                ageGroup: 'adult',
                externalSellerId: 'bangalosushilounge',
              });
            }

            return feedBuilder.buildXml()
          })(),
        }),
        ...VERSION_MARK_CONFIG,
      }),

      vitePluginVersionMark({
        name: 'manifest.json',
        outputFile: version => ({
          path: 'manifest.json',
          content: JSON.stringify({
            name: env.VITE_APP_WEB_TITLE,
            short_name: env.VITE_APP_WEB_TITLE,
            theme_color: '#0026D9',
            background_color: '#0026D9',
            start_url: '/',
            display: 'standalone',
            lang: 'pt-BR',
            id: version,
            description: env.VITE_APP_WEB_DESCRIPTION,
            orientation: 'portrait',
          }),
        }),
        ...VERSION_MARK_CONFIG,
      }),

      vitePluginVersionMark({
        name: 'robots.txt',
        outputFile: () => ({
          path: 'robots.txt',
          content: `User-agent: *
            Allow: /
            Sitemap: ${env.VITE_APP_WEB_LINK}/sitemap.xml
            Sitemap: ${env.VITE_APP_WEB_LINK}/googlemerchant.xml
            Sitemap: ${env.VITE_APP_WEB_LINK}/manifest.json
            Sitemap: ${env.VITE_APP_WEB_LINK}/robots.txt
            Sitemap: ${env.VITE_APP_WEB_LINK}/googlemerchant.xml
            Sitemap: ${env.VITE_APP_WEB_LINK}/sitemap.xml
          `,
        }),
        ...VERSION_MARK_CONFIG,
      }),

      VueRouter({
        dts: 'src/types/typed-router.d.ts',
      }),

      Layouts(),

      AutoImport({
        imports: [
          'vue',
          VueRouterAutoImports,
          {
            'pinia': ['defineStore', 'storeToRefs'],
          },
        ],
        dts: 'src/types/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
        },
        vueTemplate: true,
      }),

      Components({
        dts: 'src/types/components.d.ts',
      }),

      Vue({
        template: { transformAssetUrls },
      }),

      Vuetify({
        autoImport: true,
      }),

      Fonts({
        fontsource: {
          families: [
            {
              name: 'Roboto',
              weights: [100, 300, 400, 500, 700, 900],
              styles: ['normal', 'italic'],
            },
          ],
        },
      }),
    ],

    optimizeDeps: {
      exclude: [
        'vuetify',
        'vue-router',
        'unplugin-vue-router/runtime',
        'unplugin-vue-router/data-loaders',
        'unplugin-vue-router/data-loaders/basic',
      ],
    },

    define: {
      'process.env.VITE_APP_WEB_TITLE': JSON.stringify(env.VITE_APP_WEB_TITLE),
    },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      extensions: [
        '.js',
        '.json',
        '.jsx',
        '.mjs',
        '.ts',
        '.tsx',
        '.vue',
      ],
    },

    server: {
      port: 8081,
      strictPort: true,
      open: false,
    },

    css: {
      preprocessorOptions: {
        sass: {
          api: 'modern-compiler',
        },
        scss: {
          api: 'modern-compiler',
        },
      },
    },

    build: {
      target: 'esnext',
      assetsInlineLimit: 126,
      sourcemap: 'hidden',
    },
  }
})
