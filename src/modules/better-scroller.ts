import { createRouterScroller } from 'vue-router-better-scroller'
import type { App } from 'vue'

export function setupScroller(app: App) {
  app.use(createRouterScroller({
    selectors: {
      'window': true,
      'body': true,
      '.scrollable': true,
    },
  }))
}
