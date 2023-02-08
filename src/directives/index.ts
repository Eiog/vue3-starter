import type { App } from 'vue'
import waterMarke from './waterMark'
import lazyLoad from './lazyLoad'
const directives: { [key: string]: any } = {
  waterMarke,
  lazyLoad,
}
export default {
  install(app: App) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    })
  },
}
