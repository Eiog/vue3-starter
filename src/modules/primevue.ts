import type { App } from 'vue'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
export function setupPrimeVue(app: App) {
  app.use(PrimeVue, { /* options */ })
}
