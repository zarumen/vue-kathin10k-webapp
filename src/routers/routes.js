import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import WatView from './views/WatView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/wat/:id', component: WatView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router