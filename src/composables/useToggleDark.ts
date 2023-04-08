// eslint-disable-next-line antfu/top-level-function
export const useToggleDark = (dark: Ref<Boolean>, cb?: () => void) => {
  const { x, y } = useMouse()
  watch(() => dark.value, (dark) => {
    const endRadius = Math.hypot(
      Math.max(x.value, innerWidth - x.value),
      Math.max(y.value, innerHeight - y.value),
    )
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const transition = document.startViewTransition(() => {
      const root = document.documentElement
      root.classList.remove(dark ? 'dark' : 'light')
      root.classList.add(dark ? 'light' : 'dark')
      if (cb && isFunction(cb))
        cb()
    })
    transition.ready.then(() => {
      const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: dark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 500,
          easing: 'ease-in',
          pseudoElement: dark
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
  })
}
