import type { Ref } from 'vue'
import type { Options } from '@better-scroll/core'
import BScroll from '@better-scroll/core'

export function useBScroll(option?: Options) {
  const bsOption: Options = {
    scrollX: true,
    probeType: 3,
  }
  Object.assign(bsOption, option)
  const domRef = ref<HTMLElement>()
  const bsRef = ref<BScroll>()
  const x = ref(0)
  const y = ref(0)
  const scrolling = ref(false)
  const refresh = () => {
    if (!bsRef.value)
      return
    bsRef.value.refresh()
  }
  const scrollTo = (
    x: number,
    y: number,
    time?: number,
    easing?: any,
    extraTransform?: any,
  ) => {
    if (!bsRef.value)
      return
    bsRef.value.scrollTo(x, y, time, easing, extraTransform)
  }
  const scrollBy = (x: number, y: number, time?: number, easing?: any) => {
    if (!bsRef.value)
      return
    bsRef.value.scrollBy(x, y, time, easing)
  }
  const scrollToElement = (
    el: HTMLElement | string,
    time: number,
    offsetX: number | boolean,
    offsetY: number | boolean,
    easing: any,
  ) => {
    if (!bsRef.value)
      return
    bsRef.value.scrollToElement(el, time, offsetX, offsetY, easing)
  }
  onMounted(() => {
    if (!domRef.value)
      return
    bsRef.value = new BScroll(domRef.value, bsOption)
    const { width, height } = useElementBounding(
      domRef.value?.children[0] as HTMLElement,
    )
    watch([width, height], () => {
      refresh()
    })

    bsRef.value.on('scroll', (p: { x: number; y: number }) => {
      x.value = p.x
      y.value = p.y
    })
    bsRef.value.on('scrollStart', () => {
      scrolling.value = true
    })
    bsRef.value.on('scrollEnd', () => {
      scrolling.value = false
    })
  })
  onUnmounted(() => {
    if (!bsRef.value)
      return
    bsRef.value?.destroy()
  })

  return {
    domRef,
    bsRef,
    x,
    y,
    scrolling,
    refresh,
    scrollTo,
    scrollBy,
    scrollToElement,
  }
}
export type BSRef = Ref<BScroll>
