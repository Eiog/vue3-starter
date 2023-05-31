import type { RouteLocation } from 'vue-router'

export function useChangeTitle(to: RouteLocation) {
  const title = useTitle()
  const envTitle = import.meta.env.VITE_APP_TITLE || ''
  title.value = (to.meta.title ?? envTitle) as string
}
