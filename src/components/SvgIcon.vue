<script setup lang='ts'>
const props = withDefaults(defineProps<{ prefix?: string; name: string; color?: string; width?: number; height?: number }>(), {
  prefix: 'icon',
  color: '#333',
  width: 1,
  height: 1,
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg aria-hidden="true" v-bind="$attrs" :style="{ width: `${props.width}em`, height: `${props.height}em` }">
    <use :xlink:href="symbolId" :fill="props.color" />
  </svg>
</template>

<style scoped lang='less'>

</style>
