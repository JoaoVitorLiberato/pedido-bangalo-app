import vuetify from '@/plugins/vuetify'
import pinia from '@/plugins/stores'
import router from '@/plugins/router'
import '@/plugins/firebase'

import type { App } from 'vue'

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
}
