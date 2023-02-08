import type { Router } from 'vue-router'
import { useChangeTitle, useNProgress } from './helps'
const useGuard = (router: Router) => {
  const { start, done } = useNProgress()
  router.beforeEach((to, from, next) => {
    start()
    next()
  })
  router.afterEach((to) => {
    useChangeTitle(to)
    done()
  })
}
export default useGuard
