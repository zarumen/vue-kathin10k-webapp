/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import router from './routers/routes'

// Composables
import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.$router = markRaw(router)
});

registerPlugins(app)

app.use(pinia)
app.use(router)
app.mount('#app')
