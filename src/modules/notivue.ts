import { createNotivue } from 'notivue'
import type { App } from 'vue'

import 'notivue/notifications.css'

// Only needed if using built-in notifications
import 'notivue/animations.css'

// Only needed if using built-in animations
export function setupNotivue(app: App) {
  const notivue = createNotivue()
  app.use(notivue)
}
