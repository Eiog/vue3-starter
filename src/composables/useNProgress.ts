import '~/assets/style/nprogress.css'
import NProgress from 'nprogress'

export function useNProgress() {
  function start() {
    if (!NProgress.isStarted())
      NProgress.start()
  }
  function done() {
    NProgress.done()
  }
  return { start, done }
}
