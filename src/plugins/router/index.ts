import { createRouter, createWebHistory } from 'vue-router/auto'

import mainRouter from './documents/mainRouter'

const routes = [].concat(
  mainRouter as never[]
)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
