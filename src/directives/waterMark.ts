import type { Ref } from 'vue'

type Binding = Ref<{
  text: string
  font: string
  textColor: string
}>
function renderWaterMarke(
  text: string,
  parentNode: HTMLElement,
  font: string,
  textColor: string,
) {
  // 水印文字，父元素，字体，文字颜色
  const can = document.createElement('canvas')
  parentNode.appendChild(can)
  can.width = 200
  can.height = 150
  can.style.display = 'none'
  const cans = can.getContext('2d') as CanvasRenderingContext2D
  cans.rotate((-20 * Math.PI) / 180)
  cans.font = font || '16px Microsoft JhengHei'
  cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'
  cans.textAlign = 'left'
  cans.textBaseline = 'middle'
  cans.fillText(text, can.width / 10, can.height / 2)
  parentNode.style.backgroundImage = `url(${can.toDataURL('image/png')})`
}
const waterMarke = {
  mounted(target: HTMLElement, binding: Binding) {
    renderWaterMarke(
      binding.value.text,
      target,
      binding.value.font,
      binding.value.textColor,
    )
  },
}
export default waterMarke
