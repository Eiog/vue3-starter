import type { DirectiveBinding } from 'vue'

interface BindingValue {
  url: string
  data?: Object
}
type Args = undefined | 'exposure' | 'click' | 'long-press'
function onExposure(el: HTMLElement, cb?: () => void) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio === 1) {
      cb && cb()
      observer.unobserve(el)
    }
  }, { threshold: 1 })
  return observer
}
let clickEvent: any = null
let mouseDownEvent: any = null
let mouseUpEvent: any = null
let startTime = 0
export const useTrack = {
  mounted(target: HTMLElement, binding: DirectiveBinding<BindingValue | string>) {
    const arg = binding.arg as Args
    const data = {
      target: target.outerHTML,
      timestamp: Date.now(),
      data: binding.value,
      navigator: navigator.userAgent,
    }
    if (!arg || arg === 'exposure') {
      onExposure(target, () => {
        // eslint-disable-next-line no-console
        console.log('exposured')
        post('/track/exposure', { event: 'exposure', ...data }).then((res) => {
          // eslint-disable-next-line no-console
          console.log(res)
        })
      }).observe(target)
    }
    if (arg === 'click') {
      clickEvent = target.addEventListener('click', () => {
        // eslint-disable-next-line no-console
        console.log('click')
        post('/track/click', { event: 'click', ...data }).then((res) => {
          // eslint-disable-next-line no-console
          console.log(res)
        })
      })
    }
    if (arg === 'long-press') {
      mouseDownEvent = target.addEventListener('mousedown', () => {
        startTime = Date.now()
      })
      mouseUpEvent = target.addEventListener('mouseup', () => {
        const now = Date.now()
        if ((now - startTime) > 500) {
          // eslint-disable-next-line no-console
          console.log('log-press')
          post('/track/long-press', { event: 'long-press', ...data }).then((res) => {
          // eslint-disable-next-line no-console
            console.log(res)
          })
        }
      })
    }
  },
  unmounted(target: HTMLElement) {
    onExposure(target).unobserve(target)
    target.removeEventListener('click', clickEvent)
    target.removeEventListener('mousedown', mouseDownEvent)
    target.removeEventListener('mouseup', mouseUpEvent)
  },
}
