import { createApp } from 'vue'
import App from './App.vue'
import { useModules } from '~/modules'

const app = createApp(App)
useModules(app)
app.mount('#app')
