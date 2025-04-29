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
import PLANOS from './src/data/planos/planos.json'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env = { ...process.env, ...env }

  return {
    plugins: [
      vitePluginVersionMark({
        name: env.VITE_APP_WEB_TITLE,
        outputFile: () => ({
          path: 'googlemerchant.xml',
          content: (() => {
            const feedBuilder = new FeedBuilder();
            // https://github.com/xcommerceweb/google-merchant-feed
            feedBuilder.withTitle('ESaúde Assist')
            feedBuilder.withLink('https://esaude.online')
            feedBuilder.withDescription('Cuide da sua saúde sem sair de casa. Acesse seu histórico de consultas e exames, utilize nossa plataforma de telemedicina e acompanhe todas as suas informações de saúde conosco.')

            for (const {
              sku,
              title,
              description,
              images,
              price,
            } of Object.values(PLANOS)) {
              feedBuilder.withProduct({
                id: sku,
                title,
                description,
                link: `https://esaude.online/plano/${sku}`,
                imageLink: images[0],
                additionalImageLinks: [images[1]],
                condition: 'new',
                availability: 'in_stock',
                price: {
                  currency: 'BRL',
                  value: price / 100,
                },
                // https://www.google.com/basepages/producttype/taxonomy-with-ids.pt-BR.txt
                googleProductCategory: '491',
                productType: 'Página inicial > Planos de saúde',
                taxCategory: 'Plano de Saúde',
                customLabels: ['Plano de Saúde', 'Plano de Saúde Familiar'],
                identifierExists: 'no',
                brand: 'esaudeassist',
                ageGroup: 'adult',
                externalSellerId: 'esaudeassist',
              });
            }

            return feedBuilder.buildXml()
          })(),
        }),
        ifGitSHA: false,
        ifShortSHA: false,
        ifMeta: false,
        ifLog: false,
        ifExport: true,
        ifGlobal: true,
      }),

      Sitemap({
        hostname: 'https://esaude.online',
        dynamicRoutes: (() => {
          const SITEMAP_URLS = []

          for (const url of Object.values(URLS)) {
            SITEMAP_URLS.push(url as string);
          }

          return SITEMAP_URLS;
        })(),
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
        styles: {
          configFile: 'src/styles/settings.scss',
        },
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
      port: 8080,
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
