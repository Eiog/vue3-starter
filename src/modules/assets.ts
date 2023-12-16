import 'virtual:svg-icons-register'
import 'uno.css'
import '@unocss/reset/tailwind.css'
import 'vant/es/toast/style'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '~/assets/style/index.less'

export function setupAssets() {
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)
}
