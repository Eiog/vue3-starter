import { createApp } from 'vue'
import App from './App.vue'
import './assets'
import router from '@/router';
import store from '@/store'
import i18n from './i18n';
import directives from './directives';
const app = createApp(App)
app.use(store).use(router).use(directives).use(i18n).mount('#app')
